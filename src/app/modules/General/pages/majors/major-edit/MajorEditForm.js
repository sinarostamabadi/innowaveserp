import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function MajorEditForm({ major, btnRef, saveMajor }) {
  const { t } = useTranslation();

  const MajorEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Major.Title") })),
    MajorBranch: Yup.string()
      .min(1, t("err.Min", { 0: 1 }))
      .max(100, t("err.Max", { 0: 100 })),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={major}
        validationSchema={MajorEditSchema}
        onSubmit={(values) => {
          saveMajor(values);
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
                    label={t("Major.Title")}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="MajorBranch"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Major.MajorBranch")}
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
