/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../../core/_partials/controls";
import { getAllSpecialDayTypes } from "../../../../../General/_redux/specialDayTypes/specialDayTypesCrud";
import { FaObjToEnDateTime } from "../../../../../../../core/_helpers";

export function CreditEditForm({ saveCredit, credit, actionsLoading, onHide }) {
  const { t } = useTranslation();

  // Validation schema
  const CreditEditSchema = Yup.object().shape({
    Title: Yup.string().required(t("err.IsRequired", { 0: t("Credit.Title") })),
    Price: Yup.string()
      .nullable()
      .required(t("err.IsRequired", { 0: t("Credit.Price") })),
  });

  function clean(dirty) {
    return {
      CreditId: dirty.CreditId,
      PersonId: +credit.PersonId,
      Title: dirty.Title,
      Price: dirty.Price,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonCredit"
        enableReinitialize={true}
        initialValues={credit}
        validationSchema={CreditEditSchema}
        onSubmit={(values) => {
          saveCredit(clean(values));
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
                  <div className="col-lg-12">
                    <Field
                      name="Title"
                      component={Input}
                      customFeedbackLabel=""
                      label={t("Credit.Title")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="Price"
                      component={Input}
                      type="number"
                      customFeedbackLabel=""
                      label={t("Credit.Price")}
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
