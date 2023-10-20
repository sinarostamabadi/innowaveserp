import { ButtonGroup } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Input } from "src/core/_partials/controls";
import { WalletTools } from "../Dependency";

export function Wallet({ data, setData, receivable, goBack }) {
  const { t } = useTranslation();
  const CashDocumentEditSchema = Yup.object().shape({
    Title: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.Title") })
    ),
    Price: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.Price") })
    ),
  });

  let cashDocument = { ...WalletTools.Model, Price: receivable };

  function saveCashDocument(dirty) {
    let obj = { ...WalletTools.Clean(dirty) };
    let tranObj = { ...WalletTools.CleanTran(dirty, t) };

    setData({ ...data, Wallets: [...data.Wallets, obj], Transactions: [...data.Transactions, tranObj] });
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
                {t("CashDocument.Wallet")}
              </h5>
              <div className="row">
                <div className="col-lg-6">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("CashDocument.Title")}
                  />
                </div>
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