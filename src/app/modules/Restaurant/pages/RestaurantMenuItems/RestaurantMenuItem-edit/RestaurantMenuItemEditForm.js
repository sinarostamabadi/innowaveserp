import React, {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Axios from "axios";
import moment from "jalali-moment";
import {
  Input,
  Select,
  CheckboxField,
  SuggestionField,
  DatePickerField,
  TimePickerField,
} from "../../../../../../core/_partials/controls";
import { getAllRestaurants } from "./../../../../General/_redux/Restaurants/RestaurantsCrud";
import { getAllPlaceOfPreparations } from "./../../../_redux/PlaceOfPreparations/PlaceOfPreparationsCrud";
import { DefaultRestaurant } from "../../../../../../core/_partials/custom/defaults/DefaultRestaurant";
import { FaObjToEnDateTime } from "../../../../../../core/_helpers";

export const RestaurantMenuItemEditForm = forwardRef(
  ({ restaurantMenuItem }, ref) => {
    const { t } = useTranslation();
    const defaultInput = useRef(null);
    !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

    let callBack;
    const RestaurantMenuItemEditSchema = Yup.object().shape({
      RestaurantId: Yup.string().required(
        t("err.IsRequired", { 0: t("RestaurantMenuItem.Restaurant") })
      ),
      RestaurantMenuGroupId: Yup.array().required(
        t("err.IsRequired", { 0: t("RestaurantMenuItem.RestaurantMenuGroup") })
      ),
      PlaceOfPreparationId: Yup.string().required(
        t("err.IsRequired", { 0: t("RestaurantMenuItem.PlaceOfPreparation") })
      ),
      NameFa: Yup.string()
        .min(2, t("err.Min", { 0: 2 }))
        .max(100, t("err.Max", { 0: 100 }))
        .required(t("err.IsRequired", { 0: t("RestaurantMenuItem.NameFa") })),
    });

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        callBack = fn;

        const btnSend = document.getElementById("BtnRestaurantMenuItemSend");
        btnSend.click();
      },
    }));

    const handleSuggestionRestaurantMenuGroup = useCallback(
      (query, fnCallback) => {
        Axios.post("RestaurantMenuGroup/Get", {
          Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
          OrderBy: "Title asc",
          PageNumber: 1,
          PageSize: 10,
        }).then(({ data }) => {
          fnCallback(data.Items);
        });
      }
    );

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

    const [placeOfPreparations, setPlaceOfPreparations] = useState([]);
    useEffect(() => {
      if (placeOfPreparations.length == 0)
        getAllPlaceOfPreparations().then(({ data }) =>
          setPlaceOfPreparations((placeOfPreparations) => [
            { PlaceOfPreparationId: null, Title: t("Common.WithoutSelect") },
            ...data.Items,
          ])
        );
    }, [placeOfPreparations.length]);

    function cleanData(data) {
      return {
        RestaurantMenuItemId: data.RestaurantMenuItemId,
        RestaurantId: +data.RestaurantId,
        RestaurantMenuGroupId:
          Array.isArray(data.RestaurantMenuGroupId) &&
          data.RestaurantMenuGroupId.length
            ? +data.RestaurantMenuGroupId[0].RestaurantMenuGroupId
            : !!data.RestaurantMenuGroupId
            ? +data.RestaurantMenuGroupId
            : null,
        PlaceOfPreparationId: +data.PlaceOfPreparationId,
        NameFa: data.NameFa,
        NameEn: data.NameEn,
        PrepTime: !!data.PrepTimeObj ? data.PrepTimeObj.format("HH:mm") : null,
        CookTime: !!data.CookTimeObj ? data.CookTimeObj.format("HH:mm") : null,
        WaitTime: !!data.WaitTimeObj ? data.WaitTimeObj.format("HH:mm") : null,
        IsAccepted: data.IsAccepted,
        Barcode: data.Barcode,
        AcceptedDate: !!data.AcceptedDateObj
          ? FaObjToEnDateTime(data.AcceptedDateObj)
          : null,
      };
    }

    return (
      <div className="pt-3">
        <Formik
          enableReinitialize={true}
          initialValues={restaurantMenuItem}
          validationSchema={RestaurantMenuItemEditSchema}
          onSubmit={(values) => {
            !!callBack && callBack(cleanData(values));
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4">
                    <DefaultRestaurant
                      name="RestaurantId"
                      defaultRestaurant={restaurantMenuItem.Restaurant}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select
                      key="PlaceOfPreparationId"
                      name="PlaceOfPreparationId"
                      label={t("RestaurantMenuItem.PlaceOfPreparation")}
                      customFeedbackLabel=""
                    >
                      {placeOfPreparations.map((type) => (
                        <option
                          key={type.PlaceOfPreparationId}
                          value={type.PlaceOfPreparationId}
                        >
                          {type.Title}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <SuggestionField
                      name="RestaurantMenuGroupId"
                      labelKey="Title"
                      customFeedbackLabel=""
                      label={t("RestaurantMenuItem.RestaurantMenuGroup")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionRestaurantMenuGroup}
                      defaultValue={
                        !!restaurantMenuItem &&
                        !!restaurantMenuItem.RestaurantMenuGroup
                          ? [restaurantMenuItem.RestaurantMenuGroup]
                          : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{!!option ? option.Title : ""}</h6>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="NameFa"
                      component={Input}
                      customFeedbackLabel=""
                      label={t("RestaurantMenuItem.NameFa")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="NameEn"
                      component={Input}
                      customFeedbackLabel=""
                      label={t("RestaurantMenuItem.NameEn")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="Barcode"
                      component={Input}
                      customFeedbackLabel=""
                      label={t("RestaurantMenuItem.Barcode")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <TimePickerField
                      name="PrepTimeObj"
                      customFeedbackLabel=""
                      showSecond={false}
                      label={t("RestaurantMenuItem.PrepTime")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TimePickerField
                      name="CookTimeObj"
                      customFeedbackLabel=""
                      showSecond={false}
                      label={t("RestaurantMenuItem.CookTime")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TimePickerField
                      name="WaitTimeObj"
                      customFeedbackLabel=""
                      showSecond={false}
                      label={t("RestaurantMenuItem.WaitTime")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <CheckboxField
                      name="IsAccepted"
                      customFeedbackLabel=""
                      label={t("RestaurantMenuItem.IsAccepted")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <DatePickerField
                      name="AcceptedDateObj"
                      customFeedbackLabel=""
                      label={t("RestaurantMenuItem.AcceptedDate")}
                    />
                  </div>
                </div>
                <button
                  id="BtnRestaurantMenuItemSend"
                  type="submit"
                  style={{ display: "none" }}
                  onSubmit={() => handleSubmit()}
                ></button>
              </Form>
            </>
          )}
        </Formik>
      </div>
    );
  }
);
