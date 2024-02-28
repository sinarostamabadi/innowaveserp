import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  DatePickerField,
  SuggestionField,
  Select,
} from "src/core/_partials/controls";
import { CouponTools } from "../../quick/Dependency";
import { suggest } from "../../../../_redux/coupons/couponsCrud";

export function CouponEditForm({ saveCoupon, coupon, actionsLoading, onHide }) {
  const { t } = useTranslation();

  const transactionTypes = [
    { text: "بدون انتخاب", value: null },
    { text: "دریافت", value: 1 },
    { text: "پرداخت", value: 2 },
  ];

  let cashDocument = { ...CouponTools.Model };

  const CouponEditSchema = Yup.object().shape({
    TransactionTypeId: Yup.number()
      .nullable()
      .required(t("err.IsRequired", { 0: t("CashDocument.TransactionType") })),
    Price: Yup.number().required(
      t("err.IsRequired", { 0: t("CashDocument.Price") })
    ),
  });

  const handleSuggestionCoupon = useCallback((query, fnCallback) => {
    suggest(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  return (
    <>
      {coupon != null && (
        <Formik
          key="DocumentCoupon"
          enableReinitialize={true}
          initialValues={coupon}
          validationSchema={CouponEditSchema}
          onSubmit={(values) => {
            saveCoupon(CouponTools.Clean(values));
          }}
        >
          {({ handleSubmit, setFieldValue }) => (
            <>
              <Modal.Body className="">
                {actionsLoading && (
                  <div className="overlay-layer bg-transparent">
                    <div className="spinner spinner-lg spinner-success" />
                  </div>
                )}
                <Form className="form form-label-right">
                  <div className="row mt-2">
                    <div className="col-lg-6">
                      <Select
                        name="TransactionTypeId"
                        label={t("CashDocument.TransactionType")}
                        customFeedbackLabel=""
                        type="number"
                      >
                        {transactionTypes.map((TransactionType) => (
                          <option
                            key={TransactionType.value}
                            value={TransactionType.value}
                          >
                            {TransactionType.text}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-lg-6">
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
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-light btn-elevate"
                >
                  {t("Common.Cancel")}
                </button>
                <> </>
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  {t("Common.Save")}
                </button>
              </Modal.Footer>
            </>
          )}
        </Formik>
      )}
    </>
  );
}
