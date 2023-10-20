import React, { useEffect, useState, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  SuggestionField,
  DatePickerField,
  MultiSelectField,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { getAllFutsalReserveTypes } from "./../../../_redux/futsalReserveTypes/futsalReserveTypesCrud";
import axios from "axios";
import { FutsalReserveDatesUIProvider } from "../futsalReserves-timeSheet/FutsalReserveTimeSheetContext";
import FutsalReserveTimeSheet from "../futsalReserves-timeSheet/FutsalReserveTimeSheet";
import { futsalReservesSlice } from "../../../_redux/futsalReserves/futsalReservesSlice";

export function FutsalReserveEditForm({
  futsalReserve,
  btnRef,
  saveFutsalReserve,
}) {
  const { t } = useTranslation();
  const [futsalReserveTypes, setFutsalReserveTypes] = useState([]);

  const FutsalReserveEditSchema = Yup.object().shape({
    TitleFa: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("FutsalReserve.TitleFa") })),
    TitleEn: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 })),
  });

  useEffect(() => {
    if (futsalReserveTypes.length == 0)
      getAllFutsalReserveTypes().then(({ data }) =>
        setFutsalReserveTypes((futsalReserveTypes) => [
          { FutsalReserveTypeId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [futsalReserveTypes.length]);

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    axios
      .post("person/get", {
        Filters: [{ Property: "FullNameFa", Operation: 7, Values: [query] }],
        OrderBy: "FullNameFa asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  const [timingObj, setTimingObj] = useState({
    toDate: null,
    fromDate: null,
    days: [],
  });
  const days = [
    { label: "شنبه", value: 6 },
    { label: "یک‌شنبه", value: 0 },
    { label: "دوشنبه", value: 1 },
    { label: "سه‌شنبه", value: 2 },
    { label: "چهارشنبه", value: 3 },
    { label: "پنج‌شنبه", value: 4 },
    { label: "جمعه", value: 5 },
  ];

  return (
    <>
      <Formik
        key="futsalReserve"
        enableReinitialize={true}
        initialValues={futsalReserve}
        validationSchema={FutsalReserveEditSchema}
        onSubmit={(values) => {
          saveFutsalReserve(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="ReserveNumber"
                    component={Input}
                    type="number"
                    customFeedbackLabel=""
                    label={t("FutsalReserve.ReserveNumber")}
                    disabled={true}
                    readOnly={true}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="Price"
                    component={Input}
                    type="number"
                    customFeedbackLabel=""
                    label={t("FutsalReserve.Price")}
                    disabled={true}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Select
                    key="FutsalReserveTypeId"
                    name="FutsalReserveTypeId"
                    label={t("FutsalReserve.FutsalReserveType")}
                    customFeedbackLabel=""
                  >
                    {futsalReserveTypes.map((type) => (
                      <option
                        key={type.FutsalReserveTypeId}
                        value={type.FutsalReserveTypeId}
                      >
                        {type.Title}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-3">
                  <Field
                    name="PersonCount"
                    component={Input}
                    type="number"
                    customFeedbackLabel=""
                    label={t("FutsalReserve.PersonCount")}
                  />
                </div>
                <div className="col-lg-6">
                  <SuggestionField
                    key="PersonId"
                    name="PersonId"
                    labelKey="FullNameFa"
                    customFeedbackLabel=""
                    label={t("FutsalReserve.Person")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPerson}
                    defaultValue={
                      !!futsalReserve && !!futsalReserve.Person
                        ? [futsalReserve.Person]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.FullNameFa}</h6>
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <DatePickerField
                    name="FromDateObj"
                    customFeedbackLabel=""
                    label={t("FutsalReserve.FromDate")}
                    handleOnChange={(val) => {
                      console.log("val >> ", val);
                      
                      setTimingObj({
                        toDate: timingObj.toDate,
                        fromDate: val,
                        days: timingObj.days,
                      });
                    }}
                  />
                </div>
                <div className="col-lg-3">
                  <DatePickerField
                    name="ToDate"
                    customFeedbackLabel=""
                    label={t("FutsalReserve.ToDate")}
                    handleOnChange={(val) => {
                      console.log("val >> ", val);
                      setTimingObj({
                        toDate: val,
                        fromDate: timingObj.fromDate,
                        days: timingObj.days,
                      });
                    }}
                  />
                </div>
                <div className="col-lg-6">
                  <MultiSelectField
                    name="PersonCount"
                    customFeedbackLabel=""
                    label={t("FutsalReserve.PersonCount")}
                    initOptions={days}
                    placeholder=""
                    handleSearch={(term, ops) => ops([
                      { label: "سه‌شنبه", value: 2 },
                      { label: "چهارشنبه", value: 3 },
                      { label: "پنج‌شنبه", value: 4 },
                      { label: "جمعه", value: 5 },
                    ])}
                    onChanges={(val) => {
                      setTimingObj({
                        toDate: timingObj.toDate,
                        fromDate: timingObj.fromDate,
                        days: val,
                      });
                    }}
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
      <FutsalReserveDatesUIProvider
        currentPersonId={futsalReserve.FutsalReserveIf}
        // actionsLoading={actionsLoading}
        personSpecialDays={futsalReserve.FutsalReserveDates}
        timing={timingObj}
      >
        <FutsalReserveTimeSheet />
      </FutsalReserveDatesUIProvider>
    </>
  );
}
