import React, { createRef, useCallback, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { getAllCenters } from "./../../../_redux/centers/centersCrud";
import * as Yup from "yup";
import {
  DatePickerField,
  Input,
  Select,
  SuggestionField,
  TimePickerField,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import axios from "axios";
export function SetPricingEditForm({ setPricing, btnRef, saveSetPricing }) {
  const { t } = useTranslation();
  const defaultInput = createRef();
  const SetPricingEditSchema = Yup.object().shape({
    /*  Title: Yup.string().required(
      t("err.IsRequired", { 0: t("SetPricing.Title") })
    ), */
    CenterId: Yup.number().required(
      t("err.IsRequired", { 0: t("SetPricing.CenterId") })
    ),
    PersonId: Yup.number().required(
      t("err.IsRequired", { 0: t("SetPricing.PersonId") })
    ),
    DayInWeek: Yup.number().required(
      t("err.IsRequired", { 0: t("SetPricing.DayInWeek") })
    ),
    PersonCount: Yup.number().required(
      t("err.IsRequired", { 0: t("SetPricing.PersonCount") })
    ),
    Price: Yup.number().required(
      t("err.IsRequired", { 0: t("SetPricing.Price") })
    ),
    FromDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("SetPricing.FromDateObj") }))
      .nullable(),
    ToDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("SetPricing.ToDateObj") }))
      .nullable(),
    ForMinuts: Yup.string().required(
      t("err.IsRequired", { 0: t("SetPricing.ForMinuts") })
    ),
    FromTime: Yup.string().required(
      t("err.IsRequired", { 0: t("SetPricing.FromTime") })
    ),
    ToTime: Yup.string().required(
      t("err.IsRequired", { 0: t("SetPricing.ToTime") })
    ),
  });
  const [centers, setCenters] = useState([]);

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
  useEffect(() => {
    if (centers.length === 0)
      getAllCenters().then(({ data }) =>
        setCenters((lines) => [
          { CenterId: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [centers.length, t]);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={setPricing}
        validationSchema={SetPricingEditSchema}
        onSubmit={(values) => {
          saveSetPricing(values);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-3">
                  <Select
                    name="CenterId"
                    label={t("Line.Center")}
                    setref={defaultInput}
                  >
                    {centers.map((center) => (
                      <option key={center.CenterId} value={center.CenterId}>
                        {center.Title}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-3">
                  <SuggestionField
                    name="PersonId"
                    labelKey="FullNameFa"
                    objectName="Person"
                    version={2}
                    customFeedbackLabel=""
                    label={t("BowlingReserve.Person")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPerson}
                    defaultValue={setPricing && setPricing.Person? [setPricing.Person] : []}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.FullNameFa}</h6>
                      </div>
                    )}
                    extraAction={[
                      {
                        icon: "far fa-plus",
                        title: t("RealPerson.Entity"),
                        url: "/Core/realPersons/new",
                      },
                    ]}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="DayInWeek"
                    type="number"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("SetPricing.DayInWeek")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="PersonCount"
                    component={Input}
                    type="number"
                    customFeedbackLabel=""
                    label={t("SetPricing.PersonCount")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <DatePickerField
                    name="FromDateObj"
                    customFeedbackLabel=""
                    label={t("SetPricing.FromDate")}
                  />
                </div>
                <div className="col-lg-3">
                  <DatePickerField
                    name="ToDateObj"
                    customFeedbackLabel=""
                    label={t("SetPricing.ToDate")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="Price"
                    component={Input}
                    type="number"
                    customFeedbackLabel=""
                    label={t("SetPricing.Price")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="ForMinuts"
                    component={Input}
                    type="number"
                    customFeedbackLabel=""
                    label={t("SetPricing.ForMinuts")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <TimePickerField
                    name="FromTime"
                    version={2}
                    customFeedbackLabel=""
                    showSecond={false}
                    label={t("SetPricing.FromTime")}
                  />
                </div>
                <div className="col-lg-3">
                  <TimePickerField
                    name="ToTime"
                    version={2}
                    customFeedbackLabel=""
                    showSecond={false}
                    label={t("SetPricing.ToTime")}
                  />
                </div>
                <div className="col-lg-3">
                  <Select name="IsHoliday" label={t("SetPricing.IsHoliday")}>
                    <option value={true}>بله</option>
                    <option value={false}>خیر</option>
                  </Select>
                </div>
                <div className="col-lg-3">
                  <Select
                    name="IsForSpecialDays"
                    label={t("SetPricing.IsForSpecialDays")}
                  >
                    <option value={true}>بله</option>
                    <option value={false}>خیر</option>
                  </Select>
                </div>
              </div>
              <div className="form-group row">
              
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
