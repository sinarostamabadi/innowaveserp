import { useState, useEffect, useCallback } from "react";
import { ButtonGroup } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import {
  Input,
  SuggestionField,
  DatePickerField,
} from "src/core/_partials/controls";
import { suggest as suggestBankAccount } from "../../../../../Core/_redux/bankAccounts/bankAccountsCrud";
import { suggest as suggestBank } from "../../../../../General/_redux/banks/banksCrud";
import { BetweenBanksTools } from "../Dependency";

export function BetweenBanks({ data, setData, receivable, goBack }) {
  const { t } = useTranslation();
  const CashDocumentEditSchema = Yup.object().shape({
    BankAccountId: Yup.array().nullable().min(1, 
      t("err.IsRequired", { 0: t("CashDocument.BankAccount") })
    ),
    BankId: Yup.number().required(
      t("err.IsRequired", { 0: t("CashDocument.Bank") })
    ),
    Price: Yup.number().required(
      t("err.IsRequired", { 0: t("CashDocument.Price") })
    ),
  });

  const handleSuggestionBankAccount = useCallback((query, fnCallback) => {
    suggestBankAccount(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const handleSuggestionBank = useCallback((query, fnCallback) => {
    suggestBank(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  let cashDocument = { ...BetweenBanksTools.Model, Price: receivable };

  function saveCashDocument(dirty) {
    let obj = { ...BetweenBanksTools.Clean(dirty) };
    let tranObj = { ...BetweenBanksTools.CleanTran(dirty, t) };

    setData({ ...data, BankTransfers: [...data.BankTransfers, obj], Transactions: [...data.Transactions, tranObj] });
    goBack();
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={cashDocument}
        validationSchema={CashDocumentEditSchema}
        onSubmit={(values) => {
          saveCashDocument(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Form
              className="form form-label-right"
              style={{
                border: "1px solid #d1d3e0",
                borderRadius: ".42rem",
                padding: "1rem",
              }}
            >
              <h5
                style={{
                  display: "inline-block",
                  position: "absolute",
                  top: "-0.9rem",
                  backgroundColor: "#fff",
                  padding: "0 0.5rem",
                }}
              >
                {t("CashDocument.BetweenBanks")}
              </h5>
              <div className="row">
                <div className="col-lg-6">
                  <SuggestionField
                    name="BankAccountId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("CashDocument.BankAccount")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionBankAccount}
                    defaultValue={
                      cashDocument.BankAccount ? [cashDocument.BankAccount] : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                        <div>
                          {t("Bank.Entity")}:{" "}
                          {option.Bank ? option.Bank.TitleFa : ""}
                        </div>
                        <div>
                          {t("AccountFloating.Entity")}:{" "}
                          {!!option.AccountFloating &&
                            option.AccountFloating.Title}
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="ClientBankAccount"
                    component={Input}
                    isLtr={true}
                    customFeedbackLabel=""
                    label={t("CashDocument.ClientBankAccount")}
                  />
                </div>
                {/* <div className="col-lg-6">
                  <SuggestionField
                    name="BankId"
                    labelKey="TitleFa"
                    customFeedbackLabel=""
                    label={t("CashDocument.Bank")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionBank}
                    defaultValue={cashDocument.Bank ? [cashDocument.Bank] : []}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.TitleFa}</h6>
                      </div>
                    )}
                  />
                </div> */}
              </div>
              <div className="row mt-2">
                <div className="col-lg-6">
                  <Field
                    name="Price"
                    type="number"
                    component={Input}
                    isLtr={true}
                    customFeedbackLabel=""
                    label={t("CashDocument.Price")}
                  />
                </div>
                <div className="col-lg-6">
                  <DatePickerField
                    name="TransferDateObj"
                    customFeedbackLabel=""
                    label={t("CashDocument.Date")}
                    value={cashDocument.TransferDateObj}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <Field
                    name="Description"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("CashDocument.Description")}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col ">
                  <ButtonGroup className="mr-2" aria-label="Second group">
                    <button
                      type="button"
                      onClick={goBack}
                      className="btn btn-light"
                    >
                      <i className="fa fa-arrow-right"></i> {t("Common.Back")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        setFieldValue("TransactionTypeId", 1);
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-arrow-down"></i>{" "}
                      {t("CashDocument.Receipt")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        setFieldValue("TransactionTypeId", 2);
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-arrow-up"></i>{" "}
                      {t("CashDocument.Payment")}
                    </button>
                  </ButtonGroup>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
