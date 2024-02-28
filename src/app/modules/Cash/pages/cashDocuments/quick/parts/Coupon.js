import { useState, useEffect, useCallback } from "react";
import { ButtonGroup } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import {
  Input,
  DatePickerField,
  SuggestionField,
} from "src/core/_partials/controls";
import { getAll } from "../../../../_redux/cashTransactionTypes/cashTransactionTypesCrud";
import { suggest } from "../../../../_redux/coupons/couponsCrud";
import { CouponTools } from "../Dependency";

export function Coupon({ data, setData, receivable, goBack }) {
  const { t } = useTranslation();
  const CashDocumentEditSchema = Yup.object().shape({
    CouponId: Yup.array().required(
      t("err.IsRequired", { 0: t("CashDocument.Coupon") })
    ),
  });

  const [transactionTypes, setTransactionTypes] = useState([]);
  useEffect(() => {
    if (transactionTypes.length == 0)
      getAll().then(({ data }) =>
        setTransactionTypes((transactionTypes) => [
          { TransactionTypeId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [transactionTypes.length]);

  const handleSuggestionCoupon = useCallback((query, fnCallback) => {
    suggest(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  let cashDocument = { ...CouponTools.Model, Price: receivable };

  function saveCashDocument(dirty) {
    let obj = { ...CouponTools.Clean(dirty) };
    let tranObj = { ...CouponTools.CleanTran(dirty, t) };

    setData({
      ...data,
      CouponTransactions: [...data.CouponTransactions, obj],
      Transactions: [...data.Transactions, tranObj],
    });
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
                {t("CashDocument.Coupon")}
              </h5>
              <div className="row">
                <div className="col-lg-12">
                  <SuggestionField
                    name="CouponId"
                    labelKey="CouponNumber"
                    customFeedbackLabel=""
                    label={t("CashDocument.Coupon")}
                    placeholder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionCoupon}
                    handleOnChange={(val, obj) => {
                      if (!!obj) setFieldValue("Price", obj.Price);
                      else setFieldValue("Price", null);
                    }}
                    defaultValue={
                      cashDocument && cashDocument.Coupon
                        ? [cashDocument.Coupon]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.CouponNumber}</h6>
                        <div>
                          {t("CashDocument.Price")}: {option.Price}
                        </div>
                        <div>
                          {t("CashDocument.UseLocation")}:{" "}
                          {!!option.UseLocation && option.UseLocation.Title}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-6">
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
                    name="TransactionDateObj"
                    customFeedbackLabel=""
                    label={t("CashDocument.Date")}
                    value={cashDocument.TransactionDateObj}
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
                      <i className="fa fa-arrow-down"></i>{" "}
                      {t("CashDocument.Receipt")}
                    </button>
                    {/* <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        setFieldValue("TransactionTypeId", 2);
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-arrow-up"></i> {t("CashDocument.Payment")}
                    </button> */}
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
