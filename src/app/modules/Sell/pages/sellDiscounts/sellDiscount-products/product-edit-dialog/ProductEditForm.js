/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Select,
  Input,
  SuggestionField,
  TextArea,
} from "../../../../../../../core/_partials/controls";

export function ProductEditForm({
  saveProduct,
  product,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();

  // Validation schema
  const ProductEditSchema = Yup.object().shape({
    ProductNumber: Yup.string()
      .min(1, t("err.Min", { 0: 1 }))
      .max(3, t("err.Max", { 0: 3 }))
      .required(t("err.IsRequired", { 0: t("SellDiscountProduct.ProductNumber") })),
    DiscountPercent: Yup.string()
      .min(1, t("err.Min", { 0: 1 }))
      .max(3, t("err.Max", { 0: 3 }))
      .required(t("err.IsRequired", { 0: t("SellDiscountProduct.DiscountPercent") })),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="ProductNumber"
                      component={Input}
                      label={t("SellDiscountProduct.ProductNumber")}
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="DiscountPercent"
                      component={Input}
                      label={t("SellDiscountProduct.DiscountPercent")}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                {t("Common.Cancel")}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                {t("Common.Save")}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
