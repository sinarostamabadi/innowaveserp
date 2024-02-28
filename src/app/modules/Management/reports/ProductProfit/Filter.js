import React, {
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  DatePickerField,
  SuggestionField,
} from "../../../../../core/_partials/controls";
import { suggestProduct } from "../../../Warehouse/_redux/products/productsCrud";
import { useProductLifeCycleContext } from "./Context";
import { FaObjToEnDateTime } from "../../../../../core/_helpers";

export const Filter = forwardRef(({ reserve, btnRef, saveReserve }, ref) => {
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    Search(fn) {
      const btnSend = document.getElementById("BtnSearchProduct");
      btnSend.click();
    },
  }));

  const context = useProductLifeCycleContext();
  const uiProps = useMemo(() => {
    return {
      filters: context.filters,
      setFilters: context.setFilters,
    };
  }, [context]);

  const BrandEditSchema = Yup.object().shape({
    ProductId: Yup.array().required(
      t("err.IsRequired", { 0: t("Reports.ProductLifeCycle.Product") })
    ),
  });

  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    suggestProduct(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          FromDate: "",
          ToDate: "",
          ProductId: "",
        }}
        validationSchema={BrandEditSchema}
        onSubmit={(values) => {
          uiProps.setFilters({
            FromDate: !!values.FromDate
              ? FaObjToEnDateTime(values.FromDate)
              : null,
            ToDate: !!values.ToDate ? FaObjToEnDateTime(values.ToDate) : null,
            ProductId:
              Array.isArray(values.ProductId) && values.ProductId.length == 1
                ? values.ProductId[0].ProductId
                : null,
          });
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <SuggestionField
                    name="ProductId"
                    labelKey="Name"
                    customFeedbackLabel=""
                    label={t("Reports.ProductLifeCycle.Product")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProduct}
                    handleOnChange={(val) => {
                      if (val == null) handleSubmit();
                    }}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Name}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-4">
                  <DatePickerField
                    name="FromDate"
                    customFeedbackLabel=""
                    label={t("Reports.ProductLifeCycle.FromDate")}
                  />
                </div>
                <div className="col-lg-4">
                  <DatePickerField
                    name="ToDate"
                    customFeedbackLabel=""
                    label={t("Reports.ProductLifeCycle.ToDate")}
                  />
                </div>
              </div>
              <button
                id="BtnSearchProduct"
                type="submit"
                style={{ display: "none" }}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
});
