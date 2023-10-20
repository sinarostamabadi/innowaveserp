import React from "react";
import { useTranslation } from "react-i18next";
import { Field } from "formik";
import { Input } from "../../controls";

export function DefaultYear({ ...props }) {
  const { t } = useTranslation();

  return (
    <>
      <label>{t("BuyRequest.Year")}</label>
      <input
        className="form-control"
        readOnly={true}
        disabled={true}
        value={!!props.defaultYear ? props.defaultYear.Title : ""}
      />
      <Field
        name="YearId"
        component={Input}
        disabled={true}
        readOnly={true}
        type="hidden"
        value={!!props.defaultYear ? props.defaultYear.YearId : ""}
      />
    </>
  );
}
