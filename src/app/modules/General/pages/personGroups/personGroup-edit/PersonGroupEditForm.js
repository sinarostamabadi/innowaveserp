import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function PersonGroupEditForm({ personGroup, btnRef, savePersonGroup }) {
  const { t } = useTranslation();

  const PersonGroupEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("PersonGroup.Title") }))
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={personGroup}
        validationSchema={PersonGroupEditSchema}
        onSubmit={(values) => {
          savePersonGroup(values);
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
                    label={t("PersonGroup.Title")}
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