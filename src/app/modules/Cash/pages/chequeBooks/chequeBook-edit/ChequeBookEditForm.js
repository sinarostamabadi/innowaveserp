import React, { 
  useCallback,
  useState, 
  useEffect, 
  forwardRef, 
  useImperativeHandle } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Input, SuggestionField, Select, TextArea } from "src/core/_partials/controls";
import { useTranslation } from "react-i18next";

export const ChequeBookEditForm = forwardRef(
    ({ chequeBook, btnRef, editmode }, ref) => {
  const { t } = useTranslation();

  const ChequeBookEditSchema = Yup.object().shape({
    BankAccountId: Yup.array()
      .required(t("err.IsRequired", { 0: t("ChequeBook.BankAccountId") })),
    ChequeBookStatus: Yup.string()
      .required(t("err.IsRequired", { 0: t("ChequeBook.ChequeBookStatus") })),
    Serial: Yup.string()
      .required(t("err.IsRequired", { 0: t("ChequeBook.Serial") })),
    Count: Yup.number()
      .required(t("err.IsRequired", { 0: t("ChequeBook.Count") })),
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

  let callBack;
  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnChequeBookSend");
      btnSend.click();
    },
  }));

  const ChequeBookStatus = [
    { text: "بدون انتخاب", value: null },
    { text: "موجود", value: 1 },
    { text: "اتمام برگه‌های چک", value: 2 },
    { text: "مفقود شده", value: 3 },
    { text: "مسدود شده", value: 4 },
  ];

  function clean(dirty) {
    return {
      ChequeBookId: dirty.ChequeBookId,
      BankAccountId:
        Array.isArray(dirty.BankAccountId) && dirty.BankAccountId.length > 0
        ? +dirty.BankAccountId[0].BankAccountId
        : !!dirty.BankAccountId
          ? dirty.BankAccountId
          : null,
      Serial: +dirty.Serial,
      Count: +dirty.Count,
      Description: dirty.Description,
      ChequeBookStatus: +dirty.ChequeBookStatus
    };
  }

  return (
    <>
      <div className="mt-5">
        <Formik
          enableReinitialize={true}
          initialValues={chequeBook}
          validationSchema={ChequeBookEditSchema}
          onSubmit={(values) => {
            !!callBack && callBack(clean(values));
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4">
                    <SuggestionField
                      name="BankAccountId"
                      disabled={!!chequeBook.ChequeBookId}
                      labelKey="Title"
                      customFeedbackLabel=""
                      label={t("ChequeBook.BankAccount")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionBankAccount}
                      defaultValue={
                        !!chequeBook && chequeBook.BankAccount
                        ? [chequeBook.BankAccount] : []}
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Title}</h6>
                          <div><strong>{t("Bank.Entity")}: </strong>{option?.Bank?.TitleFa}</div>
                          <div><strong>{t("AccountFloating.Entity")}: </strong>{option?.AccountFloating?.Title}</div>
                        </div>
                      )}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="Serial"
                      disabled={!!chequeBook.ChequeBookId}
                      component={Input}
                      customFeedbackLabel=""
                      label={t("ChequeBook.Serial")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="Count"
                      type="number"
                      disabled={!!chequeBook.ChequeBookId}
                      component={Input}
                      customFeedbackLabel=""
                      label={t("ChequeBook.Count")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      name="ChequeBookStatus"
                      label={t("ChequeBook.ChequeBookStatus")}
                      customFeedbackLabel=""
                    >
                      {ChequeBookStatus.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.text}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="Description"
                      as="textarea"
                      component={TextArea}
                      customFeedbackLabel=""
                      label={t("ChequeBook.Description")}
                    />
                  </div>
                </div>
                <button
                  id="BtnChequeBookSend"
                  type="submit"
                  style={{ display: "none" }}
                  ref={btnRef}
                  onSubmit={() => handleSubmit()}
                ></button>
              </Form>
            </>
          )}
        </Formik>
      </div>
      </>
    );
  }
);
