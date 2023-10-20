import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function SellDiscountFactorEditForm({ sellDiscountFactor, btnRef, saveSellDiscountFactor }) {
  const { t } = useTranslation();

  const SellDiscountFactorEditSchema = Yup.object().shape({
    FactorNumber: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("SellDiscountFactor.FactorNumber") })),
    DiscountPercent: Yup.string()
      .min(1, t("err.Min", { 0: 1 }))
      .max(3, t("err.Max", { 0: 3 }))
      .required(t("err.IsRequired", { 0: t("SellDiscountFactor.DiscountPercent") }))
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={sellDiscountFactor}
        validationSchema={SellDiscountFactorEditSchema}
        onSubmit={(values) => {
          saveSellDiscountFactor(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="FactorNumber"
                    type="number"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("SellDiscountFactor.FactorNumber")}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="DiscountPercent"
                    type="number"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("SellDiscountFactor.DiscountPercent")}
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