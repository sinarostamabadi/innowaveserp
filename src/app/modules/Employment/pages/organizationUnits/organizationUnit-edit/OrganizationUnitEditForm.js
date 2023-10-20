import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function OrganizationUnitEditForm({ organizationUnit, btnRef, saveOrganizationUnit }) {
  const { t } = useTranslation();

  const OrganizationUnitEditSchema = Yup.object().shape({
    TitleFa: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("OrganizationUnit.TitleFa") })),
    TitleEn: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={organizationUnit}
        validationSchema={OrganizationUnitEditSchema}
        onSubmit={(values) => {
          saveOrganizationUnit(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="TitleFa"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("OrganizationUnit.TitleFa")}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="TitleEn"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("OrganizationUnit.TitleEn")}
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