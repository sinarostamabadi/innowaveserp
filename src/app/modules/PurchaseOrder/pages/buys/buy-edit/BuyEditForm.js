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

export const BuyEditForm = forwardRef(({ buy }, ref) => {
  const { t } = useTranslation();
  const defaultInput = createRef();

  useEffect(() => {
    defaultInput.current.focus();
  }, [defaultInput]);

  let callBack;
  const BuyEditSchema = Yup.object().shape({
    InquiryId: Yup.array().required(
      t("err.IsRequired", { 0: t("Buy.Inquiry") })
    ),
    ProviderId: Yup.array()
      .nullable()
      .required(t("err.IsRequired", { 0: t("Buy.Provider") })),
    BuyDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("Buy.BuyDate") }))
      .nullable(),
    BuyNumber: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .nullable()
      .required(t("err.IsRequired", { 0: t("Buy.BuyNumber") })),
  });

  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnBuySend");
      btnSend.click();
    },
  }));

  function cleanData(data) {
    return {
      BuyId: buy.BuyId,
      BuyNumber: 0,
      FactorNumber: data.FactorNumber,
      BuySettlementTypeId: data.BuySettlementTypeId,
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
      BuyDate: FaObjToEnDateTime(data.BuyDateObj),
      FactorDate: FaObjToEnDateTime(data.FactorDateObj),
      IsClosed: !!data.IsClosed,
      IsTemp: !!data.IsTemp,
      BuyDetails: [],
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
        initialValues={buy}
        validationSchema={BuyEditSchema}
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
                    name="BuyDateObj"
                    customFeedbackLabel=""
                    label={t("Buy.BuyDate")}
                    value={buy.BuyDateObj}
                  />
                </Col>
                <Col>
                  <Field
                    name="BuyNumber"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Buy.BuyNumber")}
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
                    label={t("Buy.FactorNumber")}
                    setref={defaultInput}
                  />
                </Col>
                <div className="col-auto">
                  <CheckboxField
                    name="IsTemp"
                    customFeedbackLabel=""
                    label={t("Buy.IsTemp")}
                  />
                </div>
              </Row>
              <Row className="form-group">
                <Col>
                  <DatePickerField
                    name="FactorDateObj"
                    customFeedbackLabel=""
                    label={t("Buy.FactorDate")}
                    minimumDate={{
                      year: +moment()
                        .locale(process.env.REACT_APP_DATE)
                        .format("YYYY"),
                      month: 1,
                      day: 1,
                    }}
                    value={buy.FactorDateObj}
                  />
                </Col>
                <Col>
                  <SuggestionField
                    name="InquiryId"
                    labelKey="FullNameFa"
                    customFeedbackLabel=""
                    label={t("Buy.Inquiry")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProvider}
                    initOptions={buy && buy.Inquiry ? [buy.Inquiry] : null}
                    defaultSelected={buy && buy.Inquiry ? [buy.Inquiry] : []}
                    // defaultValue={buy ? [buy.Inquiry] : []}
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
                    label={t("Buy.Provider")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProvider}
                    initOptions={buy && buy.Provider ? [buy.Provider] : null}
                    defaultSelected={buy && buy.Provider ? [buy.Provider] : []}
                    // defaultValue={buy ? [buy.Provider] : []}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.FullNameFa}</h6>
                      </div>
                    )}
                  />
                </Col>
              </Row>
              <button
                id="BtnBuySend"
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
