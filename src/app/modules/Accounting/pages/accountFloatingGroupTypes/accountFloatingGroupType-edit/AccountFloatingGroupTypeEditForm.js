import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function AccountFloatingGroupTypeEditForm({ accountFloatingGroupType, btnRef, saveAccountFloatingGroupType }) {
  const { t } = useTranslation();

  const AccountFloatingGroupTypeEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("AccountFloatingGroupType.Title") }))
  });

  function clean(dirty) {
    return {
      AccountFloatingGroupTypeId: dirty.AccountFloatingGroupTypeId && +dirty.AccountFloatingGroupTypeId,
      Title: dirty.Title
    };
  };


  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={accountFloatingGroupType}
        validationSchema={AccountFloatingGroupTypeEditSchema}
        onSubmit={(values) => {
          saveAccountFloatingGroupType(clean(values));
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
                    label={t("AccountFloatingGroupType.Title")}
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