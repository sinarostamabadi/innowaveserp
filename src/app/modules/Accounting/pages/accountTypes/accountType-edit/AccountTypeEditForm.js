import React, { useCallback } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  SuggestionField,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function AccountTypeEditForm({ accountType, btnRef, saveAccountType }) {
  const { t } = useTranslation();

  const AccountTypeEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("AccountType.Title") })),
    Level: Yup.string()
      .min(1, t("err.Min", { 0: 2 }))
      .max(3, t("err.Max", { 0: 10 }))
      .required(t("err.IsRequired", { 0: t("AccountType.Level") })),
  });

  function clean(dirty) {
    return {
      AccountTypeId: dirty.AccountTypeId,
      Title: dirty.Title,
      Level: dirty.Level && +dirty.Level,
      ParentId: dirty.ParentId && +dirty.ParentId,
    };
  }

  const handleSuggestionAccountType = useCallback((query, fnCallback) => {
    axios
      .post("accountType/get", {
        Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
        OrderBy: "Title asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={accountType}
        validationSchema={AccountTypeEditSchema}
        onSubmit={(values) => {
          saveAccountType(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-md-4">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("AccountType.Title")}
                  />
                </div>
                <div className="col-md-4">
                  <SuggestionField
                    name="ParentId"
                    labelKey="Title"
                    fieldKey="AccountTypeId"
                    customFeedbackLabel=""
                    label={t("AccountType.Parent")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionAccountType}
                    defaultValue={
                      accountType && accountType.Parent
                        ? [accountType.Parent]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-md-4">
                  <Field
                    name="Level"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("AccountType.Level")}
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
