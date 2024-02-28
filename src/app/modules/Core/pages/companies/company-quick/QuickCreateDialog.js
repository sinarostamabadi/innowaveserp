/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import {
  Input,
  DatePickerField,
  Select,
  SuggestionField,
} from "../../../../../../core/_partials/controls";
import * as Yup from "yup";

export function QuickCreateDialog({ fnCallBack }) {
  const { t } = useTranslation();

  const initModel = {
    PersonId: undefined,
    Mobile: "",
    Company: {
      CompanyId: undefined,
      FirstNameFa: "",
      NationalCode: "",
      LastNameFa: "",
    },
  };

  const CompanyEditSchema = Yup.object().shape({
    FirstName: Yup.string()
      .min(2, t("err.Min", { 0: 3 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Company.FirstName") })),
    LastName: Yup.string()
      .min(2, t("err.Min", { 0: 3 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Company.LastName") })),
  });
  const [show, setShow] = useState(true);
  const [actionsLoading, setActionsLoading] = useState(false);

  setShow(true);

  // Create Simple Company
  function saveCompany(values) {
    axios.post("Person/post", values).then(({ data }) => {
      fnCallBack(data);
    });
  }

  return (
    <Modal
      show={show}
      onHide={setShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("Phone.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Formik
        key="CompanyPhone"
        enableReinitialize={true}
        initialValues={initModel}
        validationSchema={CompanyEditSchema}
        onSubmit={(values) => {
          saveCompany(values);
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
                      name="Company.FirstName"
                      component={Input}
                      label={t("Company.FirstName")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="Company.LastName"
                      component={Input}
                      label={t("Company.LastName")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="Company.NationalCode"
                      component={Input}
                      label={t("Company.NationalCode")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="Mobile"
                      component={Input}
                      label={t("Person.Mobile")}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={setShow(false)}
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
    </Modal>
  );
}
