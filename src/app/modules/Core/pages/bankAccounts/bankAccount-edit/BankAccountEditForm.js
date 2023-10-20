import React, { useState, useEffect, useCallback, createRef } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Input,
  Select,
  SuggestionField,
} from "../../../../../../core/_partials/controls";
import { getAllBanks } from "../../../../General/_redux/banks/banksCrud";

export function BankAccountEditForm({ bankAccount, btnRef, saveBankAccount }) {
  const { t } = useTranslation();
  const defaultInput = createRef();
  useEffect(() => {
    defaultInput.current.focus();
  }, [defaultInput]);

  const BankAccountEditSchema = Yup.object().shape({
    BankId: Yup.string().required(
      t("err.IsRequired", { 0: t("BankAccount.Bank") })
    ),
  });

  const [banks, setBanks] = useState([]);
  useEffect(() => {
    if (banks.length == 0)
      getAllBanks().then(({ data }) =>
        setBanks((banks) => [
          { BankId: "", TitleFa: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [banks.length, t]);

  const handleSuggestion = useCallback((query, fnCallback) => {
    axios
      .post("accountFloating/get", {
        Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
        OrderBy: "Title asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  function clean(dirty) {
    return {
      BankAccountId: dirty.BankAccountId,
      Title: dirty.Title,
      BankId: +dirty.BankId,
      AccountFloatingId:
        Array.isArray(dirty.AccountFloatingId) &&
        dirty.AccountFloatingId.length == 1
          ? dirty.AccountFloatingId[0].AccountFloatingId
          : !Array.isArray(dirty.AccountFloatingId) && !!dirty.AccountFloatingId
          ? dirty.AccountFloatingId
          : null,
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={bankAccount}
        validationSchema={BankAccountEditSchema}
        onSubmit={(values) => {
          saveBankAccount(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BankAccount.Title")}
                    setref={defaultInput}
                  />
                </div>
                <div className="col-md-4">
                  <Select name="BankId" label={t("BankAccount.Bank")}>
                    {banks.map((bank) => (
                      <option key={bank.BankId} value={bank.BankId}>
                        {bank.TitleFa}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
                  <SuggestionField
                    name="AccountFloatingId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("BankAccount.AccountFloating")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestion}
                    defaultValue={
                      bankAccount.AccountFloating
                        ? [bankAccount.AccountFloating]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                        <span>کد: {option.Code}</span>
                      </div>
                    )}
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