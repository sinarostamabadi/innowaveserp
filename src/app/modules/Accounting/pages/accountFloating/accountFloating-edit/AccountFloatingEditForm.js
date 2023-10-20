import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { getAllAccountFloatingGroups } from "./../../../_redux/accountFloatingGroups/accountFloatingGroupsCrud";


export function AccountFloatingEditForm({ accountFloating, btnRef, saveAccountFloating }) {
  const { t } = useTranslation();
  const [codes, setCodes] = useState([]);

  const AccountFloatingEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("AccountFloating.Title") })),
    Code: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("AccountFloating.Title") })),
    Des: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
  });

  useEffect(() => {
    if (codes.length === 0)
    getAllAccountFloatingGroups().then(({ data }) =>
    setCodes((lines) => [
          { Code: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [codes.length, t]);
  
  function clean(dirty) {
    return {
      AccountFloatingId: dirty.AccountFloatingId,
      Des: dirty.Des,
      Code: dirty.Code,
      Title: dirty.Title
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={accountFloating}
        validationSchema={AccountFloatingEditSchema}
        onSubmit={(values) => {
          saveAccountFloating(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="Code"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("AccountFloating.Code")}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("AccountFloating.Title")}
                  />
                  <Field
                    name="Des"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("AccountFloating.Des")}
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