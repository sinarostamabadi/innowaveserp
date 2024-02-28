import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextArea, Select } from "src/core/_partials/controls";

export function ChequePaperEditForm({
  saveChequePaper,
  chequePaper,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();

  const ChequePaperEditSchema = Yup.object().shape({
    ChequePaperStatus: Yup.string().required(
      t("err.IsRequired", { 0: t("ChequePaper.ChequePaperStatus") })
    ),
  });

  function clean(dirty) {
    return {
      ChequePaperId: dirty.ChequePaperId,
      ChequeBookId: dirty.ChequeBookId,
      ChequePaperStatus:
        dirty.ChequePaperStatus == null || dirty.ChequePaperStatus == ""
          ? null
          : +dirty.ChequePaperStatus,
      Description: dirty.Description,
      SerialNo: dirty.SerialNo,
      ChangeDate: dirty.ChangeDate,
      IsDeleted: dirty.IsDeleted,
    };
  }

  const Status = [
    { text: "بدون انتخاب", value: null },
    { text: "موجود", value: 1 },
    { text: "صادر شده", value: 2 },
    { text: "باطل شده", value: 3 },
  ];

  return (
    <>
      {chequePaper != null && (
        <Formik
          key="ChequePaper"
          enableReinitialize={true}
          initialValues={chequePaper}
          validationSchema={ChequePaperEditSchema}
          onSubmit={(values) => {
            saveChequePaper(clean(values));
            // saveChequePaper(values);
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
                      <Select
                        name="ChequePaperStatus"
                        label={t("ChequePaper.ChequePaperStatus")}
                        customFeedbackLabel=""
                      >
                        {Status.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.text}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <Field
                        name="Description"
                        as="textarea"
                        component={TextArea}
                        label={t("ChequePaper.Description")}
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
      )}
    </>
  );
}
