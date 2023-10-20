import React, { useCallback, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import {
  Input,
  Select,
  SuggestionField,
  DatePickerField,
  TimePickerField,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { getAllRestaurants } from "./../../../../General/_redux/Restaurants/RestaurantsCrud";
import { FaObjToEnDateTime } from "../../../../../../core/_helpers";
import { DefaultRestaurant } from "../../../../../../core/_partials/custom/defaults/DefaultRestaurant";

export function RestaurantDiscountTypeEditForm({
  restaurantDiscountType,
  btnRef,
  saveRestaurantDiscountType,
}) {
  const { t } = useTranslation();
  console.log("restaurantDiscountType > ", restaurantDiscountType);
  const RestaurantDiscountTypeEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("RestaurantDiscountType.Title") })),
    FromDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("RestaurantDiscountType.FromDate") }))
      .nullable(),
    ToDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("RestaurantDiscountType.ToDate") }))
      .nullable(),
    FromTimeObj: Yup.string().required(
      t("err.IsRequired", { 0: t("RestaurantDiscountType.FromTime") })
    ),
    ToTimeObj: Yup.string().required(
      t("err.IsRequired", { 0: t("RestaurantDiscountType.ToTime") })
    ),
    RestaurantId: Yup.string().required(
      t("err.IsRequired", { 0: t("RestaurantDiscountType.Restaurant") })
    ),
  });

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

  const handleSuggestionMenuItem = useCallback((query, fnCallback) => {
    axios
      .post("RestaurantMenuItem/get", {
        Filters: [{ Property: "NameFa", Operation: 7, Values: [query] }],
        OrderBy: "NameFa asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  const handleSuggestionMenuGroup = useCallback((query, fnCallback) => {
    axios
      .post("RestaurantMenuGroup/get", {
        Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
        OrderBy: "Title asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    if (restaurants.length == 0)
      getAllRestaurants().then(({ data }) =>
        setRestaurants((restaurants) => [
          { RestaurantId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [restaurants.length]);

  function cleanData(dirtyData) {
    console.log("dirtyData > ", dirtyData);
    return {
      RestaurantDiscountTypeId: dirtyData.RestaurantDiscountTypeId,
      Title: dirtyData.Title,
      DiscountPercent: !!dirtyData.DiscountPercent
        ? +dirtyData.DiscountPercent
        : null,
      Price: !!dirtyData.Price ? +dirtyData.Price : null,
      FromDate: FaObjToEnDateTime(dirtyData.FromDateObj),
      ToDate: FaObjToEnDateTime(dirtyData.ToDateObj),
      FromTime: !!dirtyData.FromTimeObj
        ? dirtyData.FromTimeObj.format("HH:mm")
        : null,
      ToTime: !!dirtyData.ToTimeObj
        ? dirtyData.ToTimeObj.format("HH:mm")
        : null,
      PersonId:
        !!dirtyData.PersonId && !!dirtyData.PersonId[0]
          ? +dirtyData.PersonId[0].PersonId
          : null,
      PersonGroupId:
        !!dirtyData.PersonGroupId && !!dirtyData.PersonGroupId[0]
          ? +dirtyData.PersonGroupId[0].PersonGroupId
          : null,
      RestaurantId: +dirtyData.RestaurantId,
      RestaurantMenuGroupId:
        !!dirtyData.RestaurantMenuGroupId &&
        !!dirtyData.RestaurantMenuGroupId[0]
          ? +dirtyData.RestaurantMenuGroupId[0].RestaurantMenuGroupId
          : null,
      RestaurantMenuItemId:
        !!dirtyData.RestaurantMenuItemId && !!dirtyData.RestaurantMenuItemId[0]
          ? +dirtyData.RestaurantMenuItemId[0].RestaurantMenuItemId
          : null,
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={restaurantDiscountType}
        validationSchema={RestaurantDiscountTypeEditSchema}
        onSubmit={(values) => {
          saveRestaurantDiscountType(cleanData(values));
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
                    label={t("RestaurantDiscountType.Title")}
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="DiscountPercent"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("RestaurantDiscountType.DiscountPercent")}
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="Price"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("RestaurantDiscountType.Price")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <SuggestionField
                    name="PersonId"
                    labelKey="FullNameFa"
                    customFeedbackLabel=""
                    label={t("RestaurantDiscountType.Person")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPerson}
                    defaultValue={
                      !!restaurantDiscountType &&
                      !!restaurantDiscountType.Person
                        ? [restaurantDiscountType.Person]
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
                  <DatePickerField
                    name="FromDateObj"
                    customFeedbackLabel=""
                    label={t("RestaurantDiscountType.FromDate")}
                    value={restaurantDiscountType.FromDateObj}
                  />
                </div>
                <div className="col-lg-4">
                  <DatePickerField
                    name="ToDateObj"
                    customFeedbackLabel=""
                    label={t("RestaurantDiscountType.ToDate")}
                    value={restaurantDiscountType.ToDateObj}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <SuggestionField
                    name="PersonGroupId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("RestaurantDiscountType.PersonGroup")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPersonGroup}
                    defaultValue={
                      !!restaurantDiscountType &&
                      !!restaurantDiscountType.PersonGroup
                        ? [restaurantDiscountType.PersonGroup]
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
                  <TimePickerField
                    name="FromTimeObj"
                    customFeedbackLabel=""
                    showSecond={false}
                    label={t("RestaurantDiscountType.FromTime")}
                  />
                </div>
                <div className="col-lg-4">
                  <TimePickerField
                    name="ToTimeObj"
                    customFeedbackLabel=""
                    showSecond={false}
                    label={t("RestaurantDiscountType.ToTime")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <DefaultRestaurant name="RestaurantId" defaultRestaurant={restaurantDiscountType.Restaurant}
                  />
                </div>
                <div className="col-lg-4">
                  <SuggestionField
                    name="RestaurantMenuGroupId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("RestaurantDiscountType.RestaurantMenuGroup")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionMenuGroup}
                    defaultValue={
                      !!restaurantDiscountType &&
                      !!restaurantDiscountType.RestaurantMenuGroup
                        ? [restaurantDiscountType.RestaurantMenuGroup]
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
                    key="RestaurantMenuItemId"
                    name="RestaurantMenuItemId"
                    id="RestaurantMenuItemId"
                    labelKey="NameFa"
                    customFeedbackLabel=""
                    label={t("RestaurantMenuItem.Entity")}
                    handleSearch={handleSuggestionMenuItem}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.NameFa}</h6>
                        <span>
                          {t("RestaurantMenuItem.RestaurantMenuGroup")}:{" "}
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
