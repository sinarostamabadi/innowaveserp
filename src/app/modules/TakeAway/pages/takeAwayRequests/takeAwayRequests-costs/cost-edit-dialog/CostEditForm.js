import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  SuggestionField,
  CheckboxField,
  Input
} from "../../../../../../../core/_partials/controls";
import { suggestProduct } from "../../../../../Warehouse/_redux/products/productsCrud";
import { suggestProductGroup } from "../../../../../Warehouse/_redux/productGroups/productGroupsCrud";
import { useCostsUIContext } from "../CostsUIContext";

export function CostEditForm({ saveCost, cost, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const CostEditSchema = Yup.object().shape({});
  
  const costsUIContext = useCostsUIContext();
  const costsUIProps = useMemo(() => {
    return {
      mode: costsUIContext.mode,
    };
  }, [costsUIContext]);
console.log("cost > ", cost);
  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    suggestProduct(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const handleSuggestionProductGroup = useCallback((query, fnCallback) => {
    suggestProductGroup(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  function cleanCost(dirtyData) {
    return {
      TakeAwayRequestCostId: dirtyData.TakeAwayRequestCostId,
      TakeAwayRequestId: dirtyData.TakeAwayRequestId,
      FromAmount: dirtyData.FromAmount && +dirtyData.FromAmount,
      ToAmount: dirtyData.ToAmount && +dirtyData.ToAmount,
      FromPrice: dirtyData.FromPrice && +dirtyData.FromPrice,
      ToPrice: dirtyData.ToPrice && +dirtyData.ToPrice,
      DiscountPercent: dirtyData.DiscountPercent && +dirtyData.DiscountPercent,
      DiscountPrice: dirtyData.DiscountPrice && +dirtyData.DiscountPrice,
      RewardAmount: dirtyData.RewardAmount && +dirtyData.RewardAmount,
      IsDeleted: false,
      TakeAwayRequestCostInfos: dirtyData.TakeAwayRequestCostInfos,
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
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                {costsUIProps.mode == 1 && (
                  <>
                    <div className="col-lg-4">
                      <Field
                        name="FromPrice"
                        component={Input}
                        label={t("TakeAwayRequestCost.FromPrice")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="ToPrice"
                        component={Input}
                        label={t("TakeAwayRequestCost.ToPrice")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="DiscountPercent"
                        component={Input}
                        label={t("TakeAwayRequestCost.DiscountPercent")}
                      />
                    </div>
                  </>
                )}
                {costsUIProps.mode == 2 && (
                  <>
                    <div className="col-lg-4">
                      <Field
                        name="FromAmount"
                        component={Input}
                        label={t("TakeAwayRequestCost.FromAmount")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="ToAmount"
                        component={Input}
                        label={t("TakeAwayRequestCost.ToAmount")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="RewardAmount"
                        component={Input}
                        label={t("TakeAwayRequestCost.RewardAmount")}
                      />
                    </div>
                  </>
                )}
                {costsUIProps.mode == 3 && (
                  <>
                    <div className="col-lg-4">
                      <Field
                        name="FromAmount"
                        component={Input}
                        label={t("TakeAwayRequestCost.FromAmount")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="ToAmount"
                        component={Input}
                        label={t("TakeAwayRequestCost.ToAmount")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="DiscountPercent"
                        component={Input}
                        label={t("TakeAwayRequestCost.DiscountPercent")}
                      />
                    </div>
                  </>
                )}
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
