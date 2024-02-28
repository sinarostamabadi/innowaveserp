import React, {
  useCallback,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  createRef,
} from "react";
import moment from "jalali-moment";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import {
  Input,
  Select,
  CheckboxField,
  DatePickerField,
  SuggestionField,
} from "../../../../../../core/_partials/controls";
import { FaObjToEnDateTime } from "../../../../../../core/_helpers";
import { suggestPerson } from "../../../../Core/_redux/people/peopleCrud";

export const BuyReturnEditForm = forwardRef(({ buyReturn }, ref) => {
  const { t } = useTranslation();
  const defaultInput = createRef();

  useEffect(() => {
    defaultInput.current.focus();
  }, [defaultInput]);

  let callBack;
  const BuyReturnEditSchema = Yup.object().shape({
    InquiryId: Yup.array().required(
      t("err.IsRequired", { 0: t("BuyReturn.Inquiry") })
    ),
    ProviderId: Yup.array().required(
      t("err.IsRequired", { 0: t("BuyReturn.Provider") })
    ),
    BuyReturnDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("BuyReturn.BuyReturnDate") }))
      .nullable(),
    BuyReturnNumber: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .nullable()
      .required(t("err.IsRequired", { 0: t("BuyReturn.BuyReturnNumber") })),
  });

  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnBuyReturnSend");
      btnSend.click();
    },
  }));

  function cleanData(data) {
    return {
      BuyReturnId: buyReturn.BuyReturnId,
      BuyReturnNumber: 0,
      FactorNumber: data.FactorNumber,
      BuyReturnSettlementTypeId: data.BuyReturnSettlementTypeId,
      ProviderId:
        !!data.ProviderId && Array.isArray(data.ProviderId)
          ? +data.ProviderId[0].PersonId
          : data.ProviderId != ""
          ? data.ProviderId
          : null,
      InquiryId:
        !!data.InquiryId && Array.isArray(data.InquiryId)
          ? +data.InquiryId[0].PersonId
          : data.InquiryId != ""
          ? data.InquiryId
          : null,
      BuyReturnDate: FaObjToEnDateTime(data.BuyReturnDateObj),
      FactorDate: FaObjToEnDateTime(data.FactorDateObj),
      IsClosed: !!data.IsClosed,
      IsTemp: !!data.IsTemp,
      BuyReturnDetails: [],
    };
  }

  const handleSuggestionProvider = useCallback((query, fnCallback) => {
    suggestPerson(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={buyReturn}
        validationSchema={BuyReturnEditSchema}
        onSubmit={(values) => {
          !!callBack && callBack(cleanData(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right py-3">
              <Row className="form-group">
                <Col>
                  <DatePickerField
                    name="BuyReturnDateObj"
                    customFeedbackLabel=""
                    label={t("BuyReturn.BuyReturnDate")}
                    value={buyReturn.BuyReturnDateObj}
                  />
                </Col>
                <Col>
                  <Field
                    name="BuyReturnNumber"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BuyReturn.BuyReturnNumber")}
                    disabled={true}
                    readOnly={true}
                    className="form-control text-muted"
                  />
                </Col>
                <Col>
                  <Field
                    name="FactorNumber"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BuyReturn.FactorNumber")}
                    setref={defaultInput}
                  />
                </Col>
                <div className="col-auto">
                  <CheckboxField
                    name="IsTemp"
                    customFeedbackLabel=""
                    label={t("BuyReturn.IsTemp")}
                  />
                </div>
              </Row>
              <Row className="form-group">
                <Col>
                  <DatePickerField
                    name="FactorDateObj"
                    customFeedbackLabel=""
                    label={t("BuyReturn.FactorDate")}
                    minimumDate={{
                      year: +moment()
                        .locale(process.env.REACT_APP_DATE)
                        .format("YYYY"),
                      month: 1,
                      day: 1,
                    }}
                    value={buyReturn.FactorDateObj}
                  />
                </Col>
                <Col>
                  <SuggestionField
                    name="InquiryId"
                    labelKey="FullNameFa"
                    customFeedbackLabel=""
                    label={t("BuyReturn.Inquiry")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProvider}
                    initOptions={
                      buyReturn && buyReturn.Inquiry
                        ? [buyReturn.Inquiry]
                        : null
                    }
                    defaultSelected={
                      buyReturn && buyReturn.Inquiry ? [buyReturn.Inquiry] : []
                    }
                    // defaultValue={buyReturn ? [buyReturn.Inquiry] : []}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.FullNameFa}</h6>
                      </div>
                    )}
                  />
                </Col>
                <Col>
                  <SuggestionField
                    name="ProviderId"
                    labelKey="FullNameFa"
                    customFeedbackLabel=""
                    label={t("BuyReturn.Provider")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProvider}
                    initOptions={
                      buyReturn && buyReturn.Provider
                        ? [buyReturn.Provider]
                        : null
                    }
                    defaultSelected={
                      buyReturn && buyReturn.Provider
                        ? [buyReturn.Provider]
                        : []
                    }
                    // defaultValue={buyReturn ? [buyReturn.Provider] : []}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.FullNameFa}</h6>
                      </div>
                    )}
                  />
                </Col>
              </Row>
              <button
                id="BtnBuyReturnSend"
                type="submit"
                style={{ display: "none" }}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
});
