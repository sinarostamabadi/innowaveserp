import React from "react";
import { useTranslation } from "react-i18next";
import { Field } from "formik";
import { Input } from "../../controls";

export function DefaultWarehouse({ ...props }) {
  const { t } = useTranslation();

  return (
    <>
      <label>{t("BuyRequest.Warehouse")}</label>
      <input
        className="form-control"
        readOnly={true}
        disabled={true}
        value={!!props.defaultWarehouse ? props.defaultWarehouse.Title : ""}
      />
      <Field
        name="WarehouseId"
        component={Input}
        disabled={true}
        readOnly={true}
        type="hidden"
        value={!!props.defaultWarehouse ? props.defaultWarehouse.WarehouseId : ""}
      />
    </>
  );
}