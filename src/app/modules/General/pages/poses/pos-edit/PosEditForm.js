import React, { useState, useEffect, useCallback, createRef } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Input, Select, SuggestionField } from "src/core/_partials/controls";
import { getAllBanks } from "../../../../General/_redux/banks/banksCrud";

export function PosEditForm({ pos, btnRef, savePos }) {
  const { t } = useTranslation();

  const PosEditSchema = Yup.object().shape({
    SerialNo: Yup.string().required(t("err.IsRequired", { 0: t("Pos.SerialNo") })),
    PosIpAddress: Yup.string().required(t("err.IsRequired", { 0: t("Pos.PosIpAddress") })),
    TerminalId: Yup.string().required(t("err.IsRequired", { 0: t("Pos.TerminalId") })),
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

  function clean(dirty) {
    return {
      PosId: dirty.PosId,
      BankId: +dirty.BankId,
      SerialNo: dirty.SerialNo,
      DefaultBankAccountId: Array.isArray(dirty.DefaultBankAccountId) &&
      dirty.DefaultBankAccountId.length == 1
        ? dirty.DefaultBankAccountId[0].BankAccountId
        : !Array.isArray(dirty.DefaultBankAccountId) && !!dirty.DefaultBankAccountId
        ? dirty.DefaultBankAccountId
        : null,
      PosIpAddress: dirty.PosIpAddress,
      TerminalId: dirty.TerminalId        
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={pos}
        validationSchema={PosEditSchema}
        onSubmit={(values) => {
          console.log("values > ", values);
          console.log("clean(values) > ", clean(values));
          savePos(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-md-4">
                  <Field
                    name="SerialNo"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Pos.SerialNo")}
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
                <div className="col-md-4">
                  <SuggestionField
                    name="DefaultBankAccountId"
                    labelKey="Title"
                    keyField="BankAccountId"
                    customFeedbackLabel=""
                    label={t("Pos.DefaultBankAccount")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestion}
                    defaultValue={
                      pos.DefaultBankAccount
                        ? [pos.DefaultBankAccount]
                        : []
                    }
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-4">
                  <Field
                    name="PosIpAddress"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Pos.PosIpAddress")}
                  />
                </div>
                <div className="col-md-4">
                  <Field
                    name="TerminalId"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Pos.TerminalId")}
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
