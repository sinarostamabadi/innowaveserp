import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function ScaleEditForm({ scale, btnRef, saveScale }) {
  const { t } = useTranslation();

  const ScaleEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Scale.Title") })),
    IpAddress: Yup.string()
      .required(t("err.IsRequired", { 0: t("Scale.IpAddress") }))
  });

  function clean(dirty) {
    return {
      ScaleId: dirty.ScaleId,
      Title: dirty.Title,
      IpAddress: dirty.IpAddress,
    };
  }
  
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={scale}
        validationSchema={ScaleEditSchema}
        onSubmit={(values) => {
          saveScale(clean(values));
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
                    label={t("Scale.Title")}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="IpAddress"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Scale.IpAddress")}
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
