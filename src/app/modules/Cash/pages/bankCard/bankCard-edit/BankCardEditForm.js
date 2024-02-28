import React, { useCallback, forwardRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, SuggestionField } from "src/core/_partials/controls";
import { useTranslation } from "react-i18next";
import axios from "axios";

// export function BankCardEditForm({ bankCard, btnRef, saveBankCard }) {
export const BankCardEditForm = forwardRef(
  ({ bankCard, btnRef, saveBankCard }, ref) => {
    const { t } = useTranslation();

    const BankCardEditSchema = Yup.object().shape({
      Title: Yup.string()
        .min(2, t("err.Min", { 0: 2 }))
        .max(100, t("err.Max", { 0: 100 }))
        .required(t("err.IsRequired", { 0: t("BankCard.Title") })),
      CartNumber: Yup.string()
        .min(16, t("err.Min", { 0: 16 }))
        .max(20, t("err.Max", { 0: 20 }))
        .required(t("err.IsRequired", { 0: t("BankCard.CartNumber") })),
      BankAccountId: Yup.array()
        .nullable()
        .min(1, t("err.IsRequired", { 0: t("BankCard.BankAccountId") })),
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

    const clean = (dirty) => {
      return {
        BankCardId: +dirty.ProvinceId,
        Title: dirty.Title,
        CartNumber: dirty.CartNumber,
        BankAccountId:
          Array.isArray(dirty.BankAccountId) && dirty.BankAccountId.length > 0
            ? +dirty.BankAccountId[0].BankAccountId
            : !!dirty.BankAccountId
            ? dirty.BankAccountId
            : null,
      };
    };

    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={bankCard}
          validationSchema={BankCardEditSchema}
          onSubmit={(values) => {
            saveBankCard(clean(values));
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
                      label={t("BankCard.Title")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="CartNumber"
                      component={Input}
                      customFeedbackLabel=""
                      label={t("BankCard.CartNumber")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <SuggestionField
                      name="BankAccountId"
                      labelKey="Title"
                      customFeedbackLabel=""
                      label={t("BankCard.BankAccount")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionBankAccount}
                      defaultValue={
                        !!bankCard && bankCard.BankAccount
                          ? [bankCard.BankAccount]
                          : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Title}</h6>
                          <div>
                            <strong>{t("Bank.Entity")}: </strong>
                            {option?.Bank.TitleFa}
                          </div>
                          <div>
                            <strong>{t("AccountFloating.Entity")}: </strong>
                            {option?.AccountFloating.Title}
                          </div>
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
);
