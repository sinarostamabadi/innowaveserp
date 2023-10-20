import React, {
  useEffect,
  forwardRef,
  useCallback,
  useState,
  useImperativeHandle } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Input,
  SuggestionField,
  DatePickerField,
  TextArea,
  Select,
} from "src/core/_partials/controls";
import { ToValue } from "src/core/_helpers";
import { useTranslation } from "react-i18next";
import { suggestPerson } from "../../../../Core/_redux/people/peopleCrud";
import { getAll } from "../../../../General/_redux/cashs/cashsCrud";

  export const CashDocumentEditForm = forwardRef(
    ({ cashDocument, btnRef, editmode }, ref) => {
  const { t } = useTranslation();

  const CashDocumentEditSchema = Yup.object().shape({
    DocumentNo: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.DocumentNo") })
    ),
    DocumentDate: Yup.object().required(
      t("err.IsRequired", { 0: t("CashDocument.DocumentDate") })
    ),
    PersonId: Yup.array().nullable().min(1,
      t("err.IsRequired", { 0: t("CashDocument.Account") })
    ),
    CashId: Yup.number().required(
      t("err.IsRequired", { 0: t("CashDocument.Cash") })
    ),
    Added: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.Added") })
    ),
    Deficit: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.Deficit") })
    ),
  });

  const [cashs, setCashs] = useState([]);
  useEffect(() => {
    if (cashs.length == 0)
      getAll().then(({ data }) =>
        setCashs((cashs) => [
          { CashId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [cashs.length]);

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    suggestPerson(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  let callBack;
  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnCashDocumentSend");
      btnSend.click();
    },
  }));

  function clean(dirty) {
    return {
      CashDocumentId: dirty.CashDocumentId,
      PersonId: ToValue(dirty, "PersonId"),
      CashId: +dirty.CashId,
      TransactionTypeId: dirty.TransactionTypeId,
      AccDocumentId: dirty.AccDocumentId,
      DocumentNo: +dirty.DocumentNo,
      DocumentDate: dirty.DocumentDate,
      Description: dirty.Description,
      NoNeedAcc: dirty.NoNeedAcc,
      ContractNumber: dirty.ContractNumber,
      Deficit: +dirty.Deficit,
      Added: +dirty.Added,
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={cashDocument}
        validationSchema={CashDocumentEditSchema}
        onSubmit={(values) => {
          console.log("values > ", clean(values));
          !!callBack && callBack(clean(values));;
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Form className="form form-label-right mt-3">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="DocumentNo"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("CashDocument.DocumentNo")}
                  />
                </div>
                <div className="col-lg-4">
                  <Select
                    name="CashId"
                    label={t("CashDocument.Cash")}
                    customFeedbackLabel=""
                    onChange={(val) => {
                      setFieldValue("CashId", val.target.value);
                    }}
                  >
                    {cashs.map((cash) => (
                      <option key={cash.CashId} value={cash.CashId}>
                        {cash.Title}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
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

              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="ContractNumber"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("CashDocument.ContractNumber")}
                  />
                </div>
                <div className="col-lg-3">
                  <DatePickerField
                    name="DocumentDateObj"
                    customFeedbackLabel=""
                    label={t("CashDocument.DocumentDate")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="Added"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("CashDocument.Added")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="Deficit"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("CashDocument.Deficit")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <Field
                    name="Description"
                    component={TextArea}
                    customFeedbackLabel=""
                    label={t("CashDocument.Description")}
                  />
                </div>
              </div>
              <button
                id="BtnCashDocumentSend"
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => {
                  console.log("Submit");
                  handleSubmit();
                }}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
});
