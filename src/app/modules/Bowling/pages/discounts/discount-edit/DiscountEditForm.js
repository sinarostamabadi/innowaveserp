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
  CheckboxField,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { FaObjToEnDateTime } from "src/core/_helpers";
import { getAll } from "src/app/modules/General/_redux/discountTypes/discountTypesCrud";

export function DiscountEditForm({ discount, btnRef, saveDiscount }) {
  const { t } = useTranslation();
  const [discountTypes, setDiscountTypes] = useState([]);
  useEffect(() => {
    getAll().then(({ data }) =>
      setDiscountTypes((lines) => [
        { DiscountTypeId: "", TitleFa: t("Common.WithoutSelect") },
        ...data.Items,
      ])
    );
  }, []);

  const DiscountEditSchema = Yup.object().shape({
    FromDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("Discount.FromDate") }))
      .nullable(),
    ToDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("Discount.ToDate") }))
      .nullable(),
    FromTimeObj: Yup.string().required(
      t("err.IsRequired", { 0: t("Discount.FromTime") })
    ),
    ToTimeObj: Yup.string().required(
      t("err.IsRequired", { 0: t("Discount.ToTime") })
    ),
    DiscountTypeId: Yup.number().required(
      t("err.IsRequired", { 0: t("Discount.DiscountType") })
    ),
    Discount: Yup.string().required(
      t("err.IsRequired", { 0: t("Discount.Discount") })
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

  function cleanData(dirty) {
    return {
      DiscountId: dirty.DiscountId,
      DiscountTypeId: !!dirty.DiscountTypeId ? +dirty.DiscountTypeId : null,
      Discount: !!dirty.Discount ? +dirty.Discount : null,
      IsForSpecialDay: !!dirty.IsForSpecialDay,
      FromDate: FaObjToEnDateTime(dirty.FromDateObj),
      ToDate: FaObjToEnDateTime(dirty.ToDateObj),
      FromTime: !!dirty.FromTimeObj ? dirty.FromTimeObj.format("HH:mm") : null,
      ToTime: !!dirty.ToTimeObj ? dirty.ToTimeObj.format("HH:mm") : null,
      PersonId:
        !!dirty.PersonId && !!dirty.PersonId[0]
          ? +dirty.PersonId[0].PersonId
          : null,
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={discount}
        validationSchema={DiscountEditSchema}
        onSubmit={(values) => {
          saveDiscount(cleanData(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-md-4">
                  <Select
                    name="DiscountTypeId"
                    label={t("Discount.DiscountType")}
                  >
                    {discountTypes.map((discountType) => (
                      <option
                        key={discountType.DiscountTypeId}
                        value={discountType.DiscountTypeId}
                      >
                        {discountType.TitleFa}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
                  <Field
                    name="Discount"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Discount.Discount")}
                  />
                </div>
                <div className="col-md-4">
                  <CheckboxField
                    name="IsForSpecialDay"
                    customFeedbackLabel=""
                    isLtr={true}
                    label={t("Discount.IsForSpecialDay")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <SuggestionField
                    name="PersonId"
                    labelKey="FullNameFa"
                    customFeedbackLabel=""
                    label={t("Discount.Person")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPerson}
                    defaultValue={
                      !!discount && !!discount.Person ? [discount.Person] : []
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
                    label={t("Discount.FromDate")}
                    value={discount.FromDateObj}
                  />
                </div>
                <div className="col-lg-4">
                  <DatePickerField
                    name="ToDateObj"
                    customFeedbackLabel=""
                    label={t("Discount.ToDate")}
                    value={discount.ToDateObj}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <TimePickerField
                    name="FromTimeObj"
                    customFeedbackLabel=""
                    showSecond={false}
                    label={t("Discount.FromTime")}
                  />
                </div>
                <div className="col-lg-4">
                  <TimePickerField
                    name="ToTimeObj"
                    customFeedbackLabel=""
                    showSecond={false}
                    label={t("Discount.ToTime")}
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
