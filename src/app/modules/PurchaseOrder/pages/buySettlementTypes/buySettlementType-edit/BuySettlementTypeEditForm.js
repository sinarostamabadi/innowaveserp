import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, TextArea } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function BuySettlementTypeEditForm({ buySettlementType, btnRef, saveBuySettlementType }) {
  const { t } = useTranslation();

  const BuySettlementTypeEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("BuySettlementType.Title") })),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={buySettlementType}
        validationSchema={BuySettlementTypeEditSchema}
        onSubmit={(values) => {
          saveBuySettlementType(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BuySettlementType.Title")}
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