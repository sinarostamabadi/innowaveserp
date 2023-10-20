import React, { useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, SuggestionField, Select, TextArea } from "src/core/_partials/controls";
import { useTranslation } from "react-i18next";
import axios from "axios";

export function ChequePaperEditForm({ chequePaper, btnRef, saveChequePaper }) {
  const { t } = useTranslation();

  const ChequePaperEditSchema = Yup.object().shape({
    SerialNo: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("ChequePaper.SerialNo") })),
    BankAccountId: Yup.array()
      .required(t("err.IsRequired", { 0: t("ChequePaper.BankAccount") })),
    ChequeBookId: Yup.array()
      .required(t("err.IsRequired", { 0: t("ChequePaper.ChequeBook") })),
    ChequePaperStatus: Yup.string()
      .required(t("err.IsRequired", { 0: t("ChequePaper.ChequePaperStatus") })),



  });

  const handleSuggestionBankAccount = useCallback((query, fnCallback) => {
    axios
      .post("bankAccount/get", {
        Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
        OrderBy: "Title asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  const handleSuggestionChequeBook = useCallback((query, fnCallback) => {
    axios
      .post("chequeBook/get", {
        Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
        OrderBy: "Title asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  const ChequePaperStatus = [
    { text: "بدون انتخاب", value: null },
    { text: "موجود", value: 1 },
    { text: "صادر شده", value: 2 },
    { text: "باطل شده", value: 3 },
  ];

  function clean(dirty) {
    return {
      ChequePaperId: dirty.ChequePaperId,
      ChequeBookId: dirty.ChequeBookId,
      ChequePaperStatus: dirty.ChequePaperStatus,
      Description: dirty.Description,
      SerialNo: dirty.SerialNo,
      BankAccountId: dirty.BankAccountId,

    };
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={chequePaper}
        validationSchema={ChequePaperEditSchema}
        onSubmit={(values) => {
          saveChequePaper(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <SuggestionField
                    name="BankAccountId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("ChequePaper.BankAccount")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionBankAccount}
                    defaultValue={
                      chequePaper.BankAccount
                        ? [chequePaper.BankAccount]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-4">
                  <SuggestionField
                    name="ChequeBookId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("ChequePaper.ChequeBook")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionChequeBook}
                    defaultValue={
                      chequePaper.ChequeBook
                        ? [chequePaper.ChequeBook]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-4">
                  <Select
                    name="ChequePaperStatus"
                    label={t("ChequePaper.ChequePaperStatus")}
                    customFeedbackLabel=""
                  >
                    {ChequePaperStatus.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.text}
                      </option>
                    ))}
                  </Select>

                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="SerialNo"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("ChequePaper.SerialNo")}
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="Description"
                    as="textarea"
                    component={TextArea}
                    customFeedbackLabel=""
                    label={t("ChequePaper.Description")}
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