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
import { useDetailsUIContext } from "../DetailsUIContext";
import { suggestProduct } from "../../../../../Warehouse/_redux/products/productsCrud";
import { getByProduct } from "../../../../../Warehouse/_redux/productUnits/productUnitsCrud";
import { SuggestionField } from "../../../../../../../core/_partials/controls";
import { numberWithCommas } from "../../../../../../../core/_helpers";

export function DetailEditForm({ saveDetail, detail, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const DetailEditSchema = Yup.object().shape({
    ProductId: Yup.array().required(
      t("err.IsRequired", { 0: t("BuyReturnDetail.Product") })
    ),
    ProductUnitId: Yup.string().required(
      t("err.IsRequired", { 0: t("BuyReturnDetail.ProductUnit") })
    ),
    Amount: Yup.string().required(
      t("err.IsRequired", { 0: t("BuyReturnDetail.Amount") })
    ),
    Price: Yup.string().required(
      t("err.IsRequired", { 0: t("BuyReturnDetail.Price") })
    ),
  });

  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      selectedId: detailsUIContext.selectedId,
      findDetail: detailsUIContext.findDetail,
      addDetail: detailsUIContext.addDetail,
      updateDetail: detailsUIContext.updateDetail,
    };
  }, [detailsUIContext]);

  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    suggestProduct(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const [productSelected, setProductSelected] = useState(null);
  const [productUnits, setProductUnits] = useState([]);
  useEffect(() => {
    if (!!productSelected) {
      getByProduct(productSelected + "").then(({ data }) => {
        setProductUnits((productUnits) => [
          { ProductUnitId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ]);
      });
    }
  }, [productSelected]);

  useEffect(() => {
    if (!!detailsUIProps.selectedId && !!detail.BuyReturnDetailId) {
      setProductSelected(detail.ProductId);
    }
  }, [detail]);

  function cleanDetail(dirtyData) {
    return {
      BuyReturnDetailId: dirtyData.BuyReturnDetailId,
      BuyReturnId: dirtyData.BuyReturnId,
      BuyReturnDetailRequestDetails: dirtyData.BuyReturnDetailRequestDetails,
      Product:
        !!dirtyData.ProductId && dirtyData.ProductId.length == 1
          ? dirtyData.ProductId[0]
          : !!dirtyData.Product
          ? dirtyData.Product
          : null,
      ProductId:
        !!dirtyData.ProductId && dirtyData.ProductId.length == 1
          ? +dirtyData.ProductId[0].ProductId
          : !!dirtyData.ProductId
          ? dirtyData.ProductId
          : null,
      ProductUnitId: +dirtyData.ProductUnitId,
      ProductUnit: !!dirtyData.ProductUnitId
        ? productUnits.filter(
            (x) => x.ProductUnitId == dirtyData.ProductUnitId
          )[0]
        : null,
      Amount: dirtyData.Amount && +dirtyData.Amount,
      Price: dirtyData.Price && +dirtyData.Price,
      DiscountPrice: Math.ceil(+dirtyData.DiscountPrice),
      DiscountPercent: +dirtyData.DiscountPercent,
      CostPrice: +dirtyData.CostPrice,
      PayablePrice: Math.ceil((+dirtyData.Price * +dirtyData.Amount) - 
      +dirtyData.DiscountPrice + +dirtyData.CostPrice),
      IsDeleted: false,
      BuyReturnSerials: [],
    };
  }

  return (
    <>
      <Formik
        key="RealPersonDetail"
        enableReinitialize={true}
        initialValues={detail}
        validationSchema={DetailEditSchema}
        onSubmit={(values) => {
          saveDetail(cleanDetail(values));
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
                  <div className="col-lg-12">
                    <SuggestionField
                      name="ProductId"
                      labelKey="Name"
                      customFeedbackLabel=""
                      label={t("BuyReturnDetail.Product")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionProduct}
                      handleOnChange={(val) => setProductSelected(val)}
                      defaultValue={
                        detail && !!detail.Product ? [detail.Product] : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Name}</h6>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Select
                      name="ProductUnitId"
                      label={t("BuyReturnDetail.ProductUnit")}
                    >
                      {productUnits.map((productUnit) => (
                        <option
                          key={productUnit.ProductUnitId}
                          value={productUnit.ProductUnitId}
                        >
                          {!!productUnit && !!productUnit.Unit
                            ? productUnit.Unit.Name
                            : ""}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="Amount"
                      component={Input}
                      label={t("BuyReturnDetail.Amount")}
                      onChange={(val) => {
                        setFieldValue("Amount", val.target.value);
                        setFieldValue(
                          "DiscountPrice",
                          Math.ceil((+values.Price * +val.target.value) * +values.DiscountPercent / 100)
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="Price"
                      component={Input}
                      label={t("BuyReturnDetail.Price")}
                      onChange={(val) => {
                        setFieldValue("Price", +val.target.value);
                        setFieldValue(
                          "DiscountPrice",
                          Math.ceil((+val.target.value * +values.Amount) * +values.DiscountPercent / 100)
                        );
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>{t("BuyReturnDetail.TotalPrice")}</label>
                    <label className="form-control">
                      {numberWithCommas(Math.ceil(+values.Amount * +values.Price))}
                    </label>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="DiscountPrice"
                      component={Input}
                      label={t("BuyReturnDetail.DiscountPrice")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="DiscountPercent"
                      component={Input}
                      label={t("BuyReturnDetail.DiscountPercent")}
                      onChange={(val) => {
                        setFieldValue("DiscountPercent", val.target.value);
                        setFieldValue(
                          "DiscountPrice",
                          Math.ceil((+values.Price * +values.Amount) * +val.target.value / 100)
                        );
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label>{t("BuyReturnDetail.TotalDiscount")}</label>
                    <label className="form-control">
                      {numberWithCommas(values.DiscountPrice)}
                    </label>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="CostPrice"
                      component={Input}
                      label={t("BuyReturnDetail.CostPrice")}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>{t("BuyReturnDetail.PayablePrice")}</label>
                    <label className="form-control">
                      {numberWithCommas(Math.ceil((+values.Amount * +values.Price) - +values.DiscountPrice + +values.CostPrice))}
                    </label>
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
