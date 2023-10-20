import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, CheckboxField } from "src/core/_partials/controls";
import { useTranslation } from "react-i18next";
import { getUseLocations } from "../../../_redux/coupons/couponsCrud";

export function CouponEditForm({ coupon, btnRef, saveCoupon }) {
  const { t } = useTranslation();

  const CouponEditSchema = Yup.object().shape({
    CouponNumber: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Coupon.CouponNumber") })),
  });

  const [isUsed, setIsUsed] = useState(null);

  const [useLocations, setUseLocations] = useState([]);
  useEffect(() => {
    if (useLocations.length == 0)
    getUseLocations().then(({ data }) =>
    setUseLocations((useLocations) => [
          { UseLocationId: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [useLocations.length, t]);

  function clean(dirty) {
    return {
      CouponId: dirty.CouponId,
      CouponNumber: dirty.CouponNumber,
      Price: +dirty.Price,
      UseLocationId: +dirty.UseLocationId,
      IsUsed: dirty.IsUsed
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={coupon}
        validationSchema={CouponEditSchema}
        onSubmit={(values) => {
          saveCoupon(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="CouponNumber"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Coupon.CouponNumber")}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="Price"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Coupon.Price")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                    <Select name="UseLocationId" label={t("Coupon.UseLocation")}>
                      {useLocations.map((useLocation) => (
                        <option key={useLocation.EntityId} value={useLocation.EntityId}>
                          {useLocation.Title}
                        </option>
                      ))}
                  </Select>
                </div>
                <div className="col-lg-6">
                  <CheckboxField
                    name="IsUsed"
                    customFeedbackLabel=""
                    onChange={(val) => setIsUsed(val)}
                    label={t("Coupon.IsUsed")}
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