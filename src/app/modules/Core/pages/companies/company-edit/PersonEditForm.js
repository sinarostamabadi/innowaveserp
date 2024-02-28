import React, { forwardRef, useImperativeHandle } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export const PersonEditForm = forwardRef(({ person, btnRef }, ref) => {
  const { t } = useTranslation();

  const PersonEditSchema = Yup.object().shape({
    // Email: Yup.string()
    //   .min(2, t("err.Min", { 0: 2 }))
    //   .max(100, t("err.Max", { 0: 100 }))
    //   .required(t("err.IsRequired", { 0: t("Person.Email") })),
    // WebSite: Yup.string()
    //   .min(5, t("err.Min", { 0: 5 }))
    //   .max(250, t("err.Max", { 0: 250 }))
    //   .required(t("err.IsRequired", { 0: t("Person.WebSite") })),
    // Mobile: Yup.string().required(t("err.IsRequired", { 0: t("Person.Mobile") })),
  });

  let callBack;
  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnPersonSend");
      btnSend.click();
    },
  }));

  return (
    <div className="mt-5">
      <Formik
        enableReinitialize={true}
        initialValues={person}
        validationSchema={PersonEditSchema}
        onSubmit={(values) => {
          !!callBack && callBack(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="Email"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Person.Email")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="WebSite"
                    component={Input}
                    autoComplete="off"
                    customFeedbackLabel=""
                    label={t("Person.WebSite")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="Mobile"
                    component={Input}
                    autoComplete="off"
                    customFeedbackLabel=""
                    label={t("Person.Mobile")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="DiscountMax"
                    component={Input}
                    autoComplete="off"
                    type="number"
                    customFeedbackLabel=""
                    label={t("Person.DiscountMax")}
                  />
                </div>
              </div>
              <button
                id="BtnPersonSend"
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
});
