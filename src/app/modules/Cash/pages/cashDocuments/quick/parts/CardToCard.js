import { useCallback, useState, useEffect } from "react";
import { ButtonGroup } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import moment from "jalali-moment";
import {
  Input,
  SuggestionField,
  DatePickerField,
  Select,
} from "src/core/_partials/controls";
import { suggest as suggestBankAccount } from "../../../../../Core/_redux/bankAccounts/bankAccountsCrud";
import { getAll } from "../../../../../Cash/_redux/bankCards/bankCardsCrud";
import { CardToCardTools } from "../Dependency";

export function CardToCard({ data, setData, receivable, goBack }) {
  const { t } = useTranslation();
  const CashDocumentEditSchema = Yup.object().shape({
    BankCardId: Yup.number().required(
      t("err.IsRequired", { 0: t("CashDocument.BankCard") })
    ),
    Price: Yup.number().required(
      t("err.IsRequired", { 0: t("CashDocument.Price") })
    ),
  });
  const [bankCards, setBankCards] = useState([]);
  useEffect(() => {
    getAll().then(({ data }) => {
      setBankCards((poses) => [
        { BankCardId: null, Title: t("Common.WithoutSelect") },
        ...data.Items,
      ]);
    });
  }, []);

  let cashDocument = { ...CardToCardTools.Model, Price: receivable };

  function saveCashDocument(dirty) {
    let obj = { ...CardToCardTools.Clean(dirty) };
    let tranObj = { ...CardToCardTools.CleanTran(dirty, t) };

    setData({
      ...data,
      BankTransfers: [...data.BankTransfers, obj],
      Transactions: [...data.Transactions, tranObj],
    });
    goBack();
  }

  return (
    <>
      <Formik
        initialValues={cashDocument}
        validationSchema={CashDocumentEditSchema}
        onSubmit={(values) => {
          saveCashDocument(values);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
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
                {t("CashDocument.CardToCard")}
              </h5>
              <div className="row">
                <div className="col-lg-6">
                  <Select
                    name="BankCardId"
                    label={t("CashDocument.BankCard")}
                    customFeedbackLabel=""
                    onChange={(val) => {
                      console.log(
                        "bankCards.filter(x => x.BankCardId == val.target.value)[0] > ",
                        bankCards.filter(
                          (x) => x.BankCardId == val.target.value
                        )[0]
                      );
                      setFieldValue("BankCardId", val.target.value);
                      setFieldValue(
                        "BankAccount",
                        bankCards.filter(
                          (x) => x.BankCardId == val.target.value
                        )[0]
                      );
                      setFieldValue(
                        "BankAccountId",
                        bankCards.filter(
                          (x) => x.BankCardId == val.target.value
                        )[0].BankAccountId
                      );
                    }}
                  >
                    {bankCards.map((cash) => (
                      <option key={cash.BankCardId} value={cash.BankCardId}>
                        {cash.Title}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-6">
                  <Field
                    name="ClientBankAccount"
                    component={Input}
                    isLtr={true}
                    customFeedbackLabel=""
                    label={t("CashDocument.ClientCard")}
                  />
                </div>
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
                    {/* <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        setFieldValue("TransactionTypeId", 1);
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-arrow-down"></i> {t("CashDocument.Receipt")}
                    </button> */}
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
