import {useCallback} from "react";
import { ButtonGroup } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Input, DatePickerField, SuggestionField } from "src/core/_partials/controls";
import { suggestPerson } from "src/app/modules/Core/_redux/people/peopleCrud";
import { DebtTools } from "../Dependency";

export function Debt({ data, setData, receivable, goBack }) {
  const { t } = useTranslation();
  const CashDocumentEditSchema = Yup.object().shape({
    Price: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.Price") })
    ),
  });

  let cashDocument = {...DebtTools.Model, Price: receivable};
  function saveCashDocument(dirty) {
    let obj = {...DebtTools.Clean(dirty)};
    let tranObj = {...DebtTools.CleanTran(dirty, t)};

    setData({ ...data, Debts: [...data.Debts, obj], Transactions: [...data.Transactions, tranObj] });
    goBack();
  }

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    suggestPerson(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  return (
    <>
      <Formik
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
                {t("CashDocument.Money")}
              </h5>
              <div className="row">
                <div className="col-12">
                <SuggestionField
                                name="PersonId"
                                labelKey="FullNameFa"
                                customFeedbackLabel=""
                                label={t("CashDocument.Person")}
                                placeholder={t("msg.SelectBySuggestion")}
                                handleSearch={handleSuggestionPerson}
                                defaultValue={
                                  cashDocument && cashDocument.Person
                                    ? [cashDocument.Person]
                                    : []
                                }
                                renderMenuItemChildren={(option, props) => (
                                  <div>
                                    <h6>{option.FullNameFa}</h6>
                                    {/* <div>
                                  {t("CompanyType.Entity")}:{" "}
                                  {option.CompanyType.Title}
                                </div>
                                <div>
                                  {t("Company.OwnerName")}: {option.OwnerName}
                                </div> */}
                                  </div>
                                )}
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
                    name="DebtDateObj"
                    customFeedbackLabel=""
                    label={t("CashDocument.Date")}
                    value={cashDocument.DebtDateObj}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
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
                      <i className="fa fa-arrow-down"></i> {t("CashDocument.Creditor")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        setFieldValue("TransactionTypeId", 2);
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-arrow-up"></i> {t("CashDocument.Debtor")}
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
