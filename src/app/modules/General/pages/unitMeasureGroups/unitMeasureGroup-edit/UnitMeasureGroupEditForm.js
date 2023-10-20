import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function UnitMeasureGroupEditForm({ unitMeasureGroup, btnRef, saveUnitMeasureGroup }) {
  const { t } = useTranslation();

  const UnitMeasureGroupEditSchema = Yup.object().shape({
    UnitGroupName: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("UnitMeasureGroup.UnitGroupName") })),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={unitMeasureGroup}
        validationSchema={UnitMeasureGroupEditSchema}
        onSubmit={(values) => {
          saveUnitMeasureGroup(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="UnitGroupName"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("UnitMeasureGroup.UnitGroupName")}
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