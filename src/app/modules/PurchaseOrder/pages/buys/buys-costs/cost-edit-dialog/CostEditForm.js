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
import { useCostsUIContext } from "../CostsUIContext";
import { suggestProduct } from "../../../../../Warehouse/_redux/products/productsCrud";
import { getAllCostTypes } from "../../../../_redux/costTypes/costTypesCrud";
import { SuggestionField } from "../../../../../../../core/_partials/controls";

export function CostEditForm({ saveCost, cost, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const CostEditSchema = Yup.object().shape({
    CostTypeId: Yup.string().required(
      t("err.IsRequired", { 0: t("BuyCost.CostType") })
    ),
    Price: Yup.string().required(
      t("err.IsRequired", { 0: t("BuyCost.Price") })
    ),
  });

  const costsUIContext = useCostsUIContext();
  const costsUIProps = useMemo(() => {
    return {
      buySum: costsUIContext.buySum,
      selectedId: costsUIContext.selectedId,
      findCost: costsUIContext.findCost,
      addCost: costsUIContext.addCost,
      updateCost: costsUIContext.updateCost,
    };
  }, [costsUIContext]);

  const [costTypes, setCostTypes] = useState([]);
  useEffect(() => {
      getAllCostTypes().then(({ data }) => {
        setCostTypes((costTypes) => [
          { CostTypeId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ]);
      });
  }, [costTypes.length]);

  function cleanCost(dirtyData) {
    return {
      BuyCostId: dirtyData.BuyCostId,
      BuyId: dirtyData.BuyId,
      CostTypeId: +dirtyData.CostTypeId,
      CostType: !!dirtyData.CostTypeId
        ? costTypes.filter(
            (x) => x.CostTypeId == dirtyData.CostTypeId
          )[0]
        : null,
      Price: Math.ceil(dirtyData.Price && +dirtyData.Price),
      CostPercent: dirtyData.CostPercent == ""? null: +dirtyData.CostPercent,
      Describtion: dirtyData.Describtion,
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonCost"
        enableReinitialize={true}
        initialValues={cost}
        validationSchema={CostEditSchema}
        onSubmit={(values) => {
          saveCost(cleanCost(values));
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
                      name="CostTypeId"
                      label={t("BuyCost.CostType")}
                    >
                      {costTypes.map((costType) => (
                        <option
                          key={costType.CostTypeId}
                          value={costType.CostTypeId}
                        >
                          {!!costType
                            ? costType.Title
                            : ""}
                        </option>
                      ))}
                    </Select>
                  </div>
                  </div>
                <div className="form-group row">
                  <div className="col">
                    <Field
                      name="Price"
                      component={Input}
                      label={t("BuyCost.Price")}
                    />
                  </div>
                  <div className="col">
                    <Field
                      name="CostPercent"
                      component={Input}
                      label={t("BuyCost.CostPercent")}
                      onChange={(val) => {
                        setFieldValue("CostPercent", val.target.value);
                        setFieldValue(
                          "Price",
                          Math.ceil(+val.target.value > 0? (+costsUIProps.buySum.SumPayable * +val.target.value) / 100 : 0)
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col">
                    <Field
                      name="Describtion"
                      component={Input}
                      label={t("BuyCost.Describtion")}
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
