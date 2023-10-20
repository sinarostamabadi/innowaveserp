import { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Input, Select, SuggestionField, DatePickerField, TimePickerField } from "src/core/_partials/controls";
import { getAll } from "../../../_redux/TimeSets/TimeSetsCrud";

export function DiscountEditForm({ discount, btnRef, saveDiscount }) {
  const { t } = useTranslation();
  const schemaValidation = Yup.object().shape({
    Title: Yup.string().required(
      t("err.IsRequired", { 0: t("BodyBuildingDiscount.Title") })
    ),
  });

  const [timeSets, setTimeSets] = useState([]);
  const genders = [
    { text: t("Common.WithoutSelect"), value: null },
    { text: t("Common.Male"), value: 1 },
    { text: t("Common.Female"), value: 0 }
  ];

  useEffect(() => {
    if (timeSets.length == 0)
      getAll().then(({ data }) =>
        setTimeSets((times) => [
          { BodyBuildingTimeSetId: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [timeSets.length, t]);

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

  const handleSuggestionPersonGroup = useCallback((query, fnCallback) => {
    axios
      .post("PersonGroup/get", {
        Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
        OrderBy: "Title asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  const handleSuggestionPack = useCallback((query, fnCallback) => {
    axios
      .post("BodyBuildingPack/get", {
        Filters: [{ Property: "NameFa", Operation: 7, Values: [query] }],
        OrderBy: "NameFa asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  const handleSuggestionService = useCallback((query, fnCallback) => {
    axios
      .post("BodyBuildingService/get", {
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
      BodyBuildingDiscountId: dirty.BodyBuildingDiscountId,
      Title: dirty.Title,
      PersonId: !!dirty.PersonId? +dirty.PersonId: null,
      PersonGroupId: !!dirty.PersonGroupId? +dirty.PersonGroupId: null,
      BodyBuildingTimeSetId: !!dirty.BodyBuildingTimeSetId? +dirty.BodyBuildingTimeSetId: null,
      FromDate: dirty.FromDate,
      ToDate: dirty.ToDate,
      FromTime: dirty.FromTime,
      ToTime: dirty.ToTime,
      Gender: !!dirty.Gender? +dirty.Gender: null,
      BodyBuildingPackId: !!dirty.BodyBuildingPackId? +dirty.BodyBuildingPackId: null,
      BodyBuildingServiceId: !!dirty.BodyBuildingServiceId? +dirty.BodyBuildingServiceId: null,
      DiscountPercent: !!dirty.DiscountPercent? +dirty.DiscountPercent: null,
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={discount}
        validationSchema={schemaValidation}
        onSubmit={(values) => {
          saveDiscount(clean(values));
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
                    label={t("BodyBuildingDiscount.Title")}
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="DiscountPercent"
                    component={Input}
                    type="number"
                    customFeedbackLabel=""
                    label={t("BodyBuildingDiscount.DiscountPercent")}
                  />
                </div>
                <div className="col-lg-4">
                  <Select
                    name="Gender"
                    label={t("BodyBuildingTimeSet.Gender")}
                    customFeedbackLabel=""
                  >
                    {genders.map((gender) => (
                      <option key={gender.value} value={gender.value}>
                        {gender.text}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <SuggestionField
                    name="PersonId"
                    labelKey="FullNameFa"
                    version={2}
                    customFeedbackLabel=""
                    label={t("BodyBuildingDiscount.Person")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPerson}
                    defaultValue={
                      !!discount &&
                        !!discount.Person
                        ? [discount.Person]
                        : []
                    }
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
                <div className="col-lg-4">
                  <SuggestionField
                    name="PersonGroupId"
                    version={2}
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("BodyBuildingDiscount.PersonGroup")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPersonGroup}
                    defaultValue={
                      !!discount &&
                        !!discount.PersonGroup
                        ? [discount.PersonGroup]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-4">
                  <Select
                    name="BodyBuildingTimeSetId"
                    label={t("BodyBuildingDiscount.BodyBuildingTimeSet")}
                    customFeedbackLabel=""
                  >
                    {timeSets.map((timeSet) => (
                      <option key={timeSet.BodyBuildingTimeSetId} value={timeSet.BodyBuildingTimeSetId}>
                        {timeSet.Title}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="form-group row">
              <div className="col-lg-3">
                  <DatePickerField
                    name="FromDate"
                    version={2}
                    customFeedbackLabel=""
                    label={t("BodyBuildingDiscount.FromDate")}
                    value={discount.FromDateObj}
                  />
                </div>
                <div className="col-lg-3">
                  <DatePickerField
                    name="ToDate"
                    version={2}
                    customFeedbackLabel=""
                    label={t("BodyBuildingDiscount.ToDate")}
                    value={discount.ToDateObj}
                  />
                </div>
                <div className="col-lg-3">
                  <TimePickerField
                    name="FromTime"
                    version={2}
                    customFeedbackLabel=""
                    showSecond={false}
                    label={t("BodyBuildingDiscount.FromTime")}
                  />
                </div>
                <div className="col-lg-3">
                  <TimePickerField
                    name="ToTime"
                    version={2}
                    customFeedbackLabel=""
                    showSecond={false}
                    label={t("BodyBuildingDiscount.ToTime")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <SuggestionField
                    name="BodyBuildingPackId"
                    version={2}
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("BodyBuildingDiscount.BodyBuildingPack")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPack}
                    defaultValue={
                      !!discount &&
                        !!discount.RestaurantMenuGroup
                        ? [discount.RestaurantMenuGroup]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-4">
                  <SuggestionField
                    key="BodyBuildingServiceId"
                    name="BodyBuildingServiceId"
                    id="BodyBuildingServiceId"
                    version={2}
                    labelKey="NameFa"
                    customFeedbackLabel=""
                    label={t("BodyBuildingDiscount.BodyBuildingService")}
                    handleSearch={handleSuggestionService}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.NameFa}</h6>
                        <span>
                          {t("BodyBuildingDiscount.BodyBuildingService")}:{" "}
                          {option.RestaurantMenuGroup.Title}
                        </span>
                        <br />
                        <span>
                          {t("RestaurantMenuItem.PlaceOfPreparation")}:{" "}
                          {option.PlaceOfPreparation.Title}
                        </span>
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
