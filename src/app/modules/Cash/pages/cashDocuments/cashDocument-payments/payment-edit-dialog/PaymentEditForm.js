import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, DatePickerField, Select } from "src/core/_partials/controls";
import { PaymentTools } from "../../quick/Dependency";

export function PaymentEditForm({
  savePayment,
  payment,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();

  const transactionTypes = [
    { text: "بدون انتخاب", value: null },
    { text: "دریافت", value: 1 },
    { text: "پرداخت", value: 2 },
  ];

  const PaymentEditSchema = Yup.object().shape({
    TransactionTypeId: Yup.number()
      .nullable()
      .required(t("err.IsRequired", { 0: t("CashDocument.TransactionType") })),
    Price: Yup.string().required(
      t("err.IsRequired", { 0: t("CashDocument.Price") })
    ),
  });

  return (
    <>
      {payment != null && (
        <Formik
          key="DocumentPayment"
          enableReinitialize={true}
          initialValues={payment}
          validationSchema={PaymentEditSchema}
          onSubmit={(values) => {
            savePayment(PaymentTools.Clean(values));
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Modal.Body className="">
                {actionsLoading && (
                  <div className="overlay-layer bg-transparent">
                    <div className="spinner spinner-lg spinner-success" />
                  </div>
                )}
                <Form className="form form-label-right">
                  <div className="row">
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
                        name="PaymentDateObj"
                        customFeedbackLabel=""
                        label={t("CashDocument.Date")}
                        value={payment.PaymentDateObj}
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
