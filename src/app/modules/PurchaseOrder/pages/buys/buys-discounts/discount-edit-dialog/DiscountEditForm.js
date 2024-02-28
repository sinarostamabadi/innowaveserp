import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  DatePickerField,
  Input,
  Select,
} from "../../../../../../../core/_partials/controls";
import { useDiscountsUIContext } from "../DiscountsUIContext";
import { getAll } from "../../../../../General/_redux/discountTypes/discountTypesCrud";

export function DiscountEditForm({
  saveDiscount,
  discount,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();
  const DiscountEditSchema = Yup.object().shape({
    DiscountTypeId: Yup.string().required(
      t("err.IsRequired", { 0: t("BuyDiscount.DiscountType") })
    ),
    PricePercent: Yup.string().required(
      t("err.IsRequired", { 0: t("BuyDiscount.PricePercent") })
    ),
  });

  const discountsUIContext = useDiscountsUIContext();
  const discountsUIProps = useMemo(() => {
    return {
      buySum: discountsUIContext.buySum,
      selectedId: discountsUIContext.selectedId,
      findDiscount: discountsUIContext.findDiscount,
      addDiscount: discountsUIContext.addDiscount,
      updateDiscount: discountsUIContext.updateDiscount,
    };
  }, [discountsUIContext]);

  const [discountTypes, setDiscountTypes] = useState([]);
  useEffect(() => {
    getAll().then(({ data }) => {
      setDiscountTypes((discountTypes) => [
        { DiscountTypeId: null, Title: t("Common.WithoutSelect") },
        ...data.Items,
      ]);
    });
  }, [discountTypes.length]);

  function cleanDiscount(dirtyData) {
    return {
      BuyDiscountId: dirtyData.BuyDiscountId,
      BuyId: dirtyData.BuyId,
      DiscountTypeId: +dirtyData.DiscountTypeId,
      DiscountType: !!dirtyData.DiscountTypeId
        ? discountTypes.filter(
            (x) => x.DiscountTypeId == dirtyData.DiscountTypeId
          )[0]
        : null,
      DiscountPercent:
        dirtyData.DiscountPercent == "" ? null : +dirtyData.DiscountPercent,
      PricePercent:
        dirtyData.PricePercent == "" ? null : +dirtyData.PricePercent,
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonDiscount"
        enableReinitialize={true}
        initialValues={discount}
        validationSchema={DiscountEditSchema}
        onSubmit={(values) => {
          saveDiscount(cleanDiscount(values));
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <Modal.Body className="">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col">
                    <Select
                      name="DiscountTypeId"
                      label={t("BuyDiscount.DiscountType")}
                    >
                      {discountTypes.map((discountType) => (
                        <option
                          key={discountType.DiscountTypeId}
                          value={discountType.DiscountTypeId}
                        >
                          {!!discountType ? discountType.TitleFa : ""}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col">
                    <Field
                      name="DiscountPercent"
                      component={Input}
                      type="text"
                      label={t("BuyDiscount.DiscountPercent")}
                      onChange={(val) => {
                        console.log("val.target.value > ", val.target.value);
                        setFieldValue("DiscountPercent", val.target.value);
                        setFieldValue(
                          "PricePercent",
                          Math.ceil(
                            +val.target.value > 0
                              ? (+discountsUIProps.buySum.SumPayable *
                                  +val.target.value) /
                                  100
                              : 0
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col">
                    <Field
                      name="PricePercent"
                      component={Input}
                      label={t("BuyDiscount.PricePercent")}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                {t("Common.Cancel")}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                {t("Common.Save")}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
