import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  CheckboxField,
  DatePickerField,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { FaObjToEnDateTime } from "../../../../../../core/_helpers";

export const SellPricingEditForm = forwardRef(({ sellPricing }, ref) => {
  const { t } = useTranslation();
  const defaultInput = useRef(null);
  !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

  let callBack;
  const SellPricingEditSchema = Yup.object().shape({
    SellPricingNumber: Yup.string().required(
      t("err.IsRequired", { 0: t("SellPricing.SellPricingNumber") })
    ),
    RegisterDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("SellPricing.RegisterDate") }))
      .nullable(),
    FromDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("SellPricing.FromDate") }))
      .nullable(),
    ToDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("SellPricing.ToDate") }))
      .nullable(),
  });

  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnSellPricingSend");
      btnSend.click();
    },
  }));

  function cleanData(data) {
    console.log("cleanData(data) > > ", data);

    return {
      SellPricingId: data.SellPricingId,
      SellPricingNumber: +data.SellPricingNumber,
      RegisterDate: FaObjToEnDateTime(data.RegisterDateObj),
      FromDate: FaObjToEnDateTime(data.FromDateObj),
      ToDate: FaObjToEnDateTime(data.ToDateObj),
      IsAccepted: data.IsAccepted,
      SellPricingDetails: data.SellPricingDetails,
    };
  }

  return (
    <div className="pt-3">
      <Formik
        enableReinitialize={true}
        initialValues={sellPricing}
        validationSchema={SellPricingEditSchema}
        onSubmit={(values) => {
          console.log("Formik > ", values);
          !!callBack && callBack(cleanData(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="SellPricingNumber"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("SellPricing.SellPricingNumber")}
                    setref={defaultInput}
                  />
                </div>
                <div className="col-lg-4">
                  <CheckboxField
                    name="IsAccepted"
                    customFeedbackLabel=""
                    label={t("SellPricing.IsAccepted")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <DatePickerField
                    name="RegisterDateObj"
                    customFeedbackLabel=""
                    label={t("SellPricing.RegisterDate")}
                  />
                </div>
                <div className="col-lg-4">
                  <DatePickerField
                    name="FromDateObj"
                    customFeedbackLabel=""
                    label={t("SellPricing.FromDate")}
                  />
                </div>
                <div className="col-lg-4">
                  <DatePickerField
                    name="ToDateObj"
                    customFeedbackLabel=""
                    label={t("SellPricing.ToDate")}
                  />
                </div>
              </div>
              <button
                id="BtnSellPricingSend"
                type="submit"
                style={{ display: "none" }}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
});
