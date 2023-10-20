/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, SuggestionField } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import Axios from "axios";

export function ProductGroupEditForm({ productGroup, btnRef, saveProductGroup }) {
  const { t } = useTranslation();

  const [routeId] = useState(useParams().id)

  const ProductGroupEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("ProductGroup.Title") })),
    Code: Yup.string()
      .required(t("err.IsRequired", { 0: t("ProductGroup.Code") })),      
  });

  const handleSuggestionProductGroup = useCallback((query, fnCallback) => {
    Axios
      .post("ProductGroup/Get", {
        Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
        OrderBy: "Title asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items.filter((item) => item.ProductGroupId != routeId));
      });
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={productGroup}
        validationSchema={ProductGroupEditSchema}
        onSubmit={(values) => {
          saveProductGroup(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("ProductGroup.Title")}
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="Code"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("ProductGroup.Code")}
                  />
                </div>
                <div className="col-lg-4">
                  <SuggestionField
                    name="ParentId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("ProductGroup.ParentId")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProductGroup}
                    defaultValue={productGroup.Parent ? [productGroup.Parent] : []}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}