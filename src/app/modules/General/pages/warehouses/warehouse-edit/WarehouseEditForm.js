import React, { useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function WarehouseEditForm({ warehouse, btnRef, saveWarehouse }) {
  const { t } = useTranslation();

  const WarehouseEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Warehouse.Title") }))
  });

  const clean = (dirty) => {
    return {
      WarehouseId: +dirty.WarehouseId,
      Title: dirty.Title,
    };
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={warehouse}
        validationSchema={WarehouseEditSchema}
        onSubmit={(values) => {
          saveWarehouse(clean(values));
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
                    label={t("Warehouse.Title")}
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