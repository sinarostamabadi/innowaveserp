import React from "react";
import { useTranslation } from "react-i18next";
import { Field } from "formik";
import { Input } from "../../controls";

export function DefaultRestaurant({ ...props }) {
  const { t } = useTranslation();

  return (
    <>
      <label>{t("Restaurant.Entity")}</label>
      <input
        className="form-control"
        readOnly={true}
        disabled={true}
        value={!!props.defaultRestaurant ? props.defaultRestaurant.Title : ""}
      />
      <Field
        name="RestaurantId"
        component={Input}
        disabled={true}
        readOnly={true}
        type="hidden"
        value={!!props.defaultRestaurant ? props.defaultRestaurant.RestaurantId : ""}
      />
    </>
  );
}