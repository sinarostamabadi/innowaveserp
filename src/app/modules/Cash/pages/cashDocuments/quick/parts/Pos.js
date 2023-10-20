import { useCallback, useState, useEffect } from "react";
import { ButtonGroup } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import {
  Input,
  SuggestionField,
  DatePickerField,
  Select,
} from "src/core/_partials/controls";
import { suggest as suggestBankAccount } from "src/app/modules/Core/_redux/bankAccounts/bankAccountsCrud";
import { getAllPoses } from "src/app/modules/General/_redux/poses/posesCrud";
import { PosTools } from "../Dependency";

export function Pos({ data, setData, receivable, goBack }) {
  const { t } = useTranslation();
  const CashDocumentEditSchema = Yup.object().shape({
    BankAccountId: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.BankAccount") })
    ),
    PosId: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.Pos") })
    ),
    Price: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.Price") })
    ),
  });

  const [poses, setPoses] = useState([]);
  useEffect(() => {
    getAllPoses().then(({ data }) => {
      console.log("data > ", data);
      setPoses((poses) => [
        { PosId: null, SerialNo: t("Common.WithoutSelect") },
        ...data.Items,
      ]);
    });
  }, []);

  let cashDocument = { ...PosTools.Model, Price: receivable };

  function saveCashDocument(dirty) {
    let obj = { ...PosTools.Clean(dirty) };
    let tranObj = { ...PosTools.CleanTran(dirty, t) };

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
                {t("CashDocument.Pos")}
              </h5>
              <div className="row">
                <div className="col-lg-6">
                  <Select
                    name="PosId"
                    label={t("CashDocument.Pos")}
                    customFeedbackLabel=""
                    onChange={(val) => {
                      setFieldValue("PosId", val.target.value);
                      setFieldValue("BankAccount", poses.filter(x => x.PosId == val.target.value)[0]);
                      setFieldValue("BankAccountId", poses.filter(x => x.PosId == val.target.value)[0].DefaultBankAccountId);
                    }}
                  >
                    {poses.map((cash) => (
                      <option key={cash.PosId} value={cash.PosId}>
                        {(!!cash.PosId ? cash.Bank.TitleFa + " - " : "") + cash.SerialNo}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-6">
                  <label>{t("CashDocument.BankAccount")}</label>
                  <label className="form-control">
                    {!!values.BankAccountId? values.BankAccount.DefaultBankAccount.Title: ""}
                  </label>
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
