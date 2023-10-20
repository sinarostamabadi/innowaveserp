/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  DatePickerField,
  Select,
  SuggestionField,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { FaObjToEnDateTime } from "../../../../../../core/_helpers";
import { digitsFaToEn } from "persian-tools2";

export const RealPersonEditForm = forwardRef(
  ({ realPerson, btnRef, editmode }, ref) => {
    const { t } = useTranslation();

    const RealPersonEditSchema = Yup.object().shape({
      FirstNameFa: Yup.string()
        .min(2, t("err.Min", { 0: 2 }))
        .max(100, t("err.Max", { 0: 100 }))
        .required(t("err.IsRequired", { 0: t("RealPerson.FirstNameFa") })),
      LastNameFa: Yup.string()
        .min(2, t("err.Min", { 0: 2 }))
        .max(100, t("err.Max", { 0: 100 }))
        .required(t("err.IsRequired", { 0: t("RealPerson.LastNameFa") })),
      NationalCode: Yup.string()
        .min(10, t("err.Min", { 0: "10" }))
        .max(10, t("err.Max", { 0: "10" })),
    });

    const [datares, setRes] = useState(realPerson);
    useEffect(() => {
      setRes(realPerson);
    }, [realPerson]);

    const Genders = [
      { text: "بدون انتخاب", value: null },
      { text: "مرد", value: 1 },
      { text: "زن", value: 0 },
    ];

    let callBack;

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        callBack = fn;

        const btnSend = document.getElementById("BtnRealPersonSend");
        btnSend.click();
      },
    }));

    const handleSuggestion = useCallback((query, fnCallback) => {
      axios
        .post("city/get", {
          Filters: [{ Property: "TitleFa", Operation: 7, Values: [query] }],
          OrderBy: "TitleFa asc",
          PageNumber: 1,
          PageSize: 10,
        })
        .then(({ data }) => {
          fnCallback(data.Items);
        });
    });

    function clean(data) {
      return {
        RealPersonId: data.RealPersonId,
        FirstNameFa: data.FirstNameFa,
        NationalCode: digitsFaToEn(data.NationalCode),
        LastNameFa: data.LastNameFa,
        BirthDate: !!data.BirthDateObj? FaObjToEnDateTime(data.BirthDateObj): null,
        GenderId: data.GenderId == null || data.GenderId == ""? null: +data.GenderId,
        FatherNameFa: data.FatherNameFa,
        PlaceOfBirthId: Array.isArray(data.PlaceOfBirthId) && data.PlaceOfBirthId.length == 1? data.PlaceOfBirthId[0].CityId: !!data.PlaceOfBirthId? data.PlaceOfBirthId: null,
        IssueCityId: Array.isArray(data.IssueCityId) && data.IssueCityId.length == 1? data.IssueCityId[0].CityId: !!data.IssueCityId? data.IssueCityId: null,
        IODeviceId: data.IODeviceId == null || data.IODeviceId == ""? null: +data.IODeviceId,
      };
    }

    return (
      <>
        <div className="mt-5">
          <Formik
            enableReinitialize={true}
            initialValues={datares}
            validationSchema={RealPersonEditSchema}
            onSubmit={(values) => {
              !!callBack && callBack(clean(values));
            }}
          >
            {({ handleSubmit }) => (
              <>
                <Form id="Formik" className="form form-label-right">
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="FirstNameFa"
                        component={Input}
                        customFeedbackLabel=""
                        label={t("RealPerson.FirstNameFa")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="LastNameFa"
                        component={Input}
                        autoComplete="off"
                        customFeedbackLabel=""
                        label={t("RealPerson.LastNameFa")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="IODeviceId"
                        component={Input}
                        type="number"
                        autoComplete="off"
                        customFeedbackLabel=""
                        label={t("RealPerson.IODeviceId")}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="NationalCode"
                        component={Input}
                        autoComplete="off"
                        customFeedbackLabel=""
                        label={t("RealPerson.NationalCode")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Select
                        name="GenderId"
                        label={t("RealPerson.Gender")}
                        customFeedbackLabel=""
                      >
                        {Genders.map((gender) => (
                          <option key={gender.value} value={gender.value}>
                            {gender.text}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="FatherNameFa"
                        component={Input}
                        customFeedbackLabel=""
                        label={t("RealPerson.FatherNameFa")}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <SuggestionField
                        name="PlaceOfBirthId"
                        labelKey="TitleFa"
                        customFeedbackLabel=""
                        label={t("RealPerson.PlaceOfBirth")}
                        placeHolder={t("msg.SelectBySuggestion")}
                        handleSearch={handleSuggestion}
                        defaultValue={
                          datares.PlaceOfBirth ? [datares.PlaceOfBirth] : []
                        }
                        renderMenuItemChildren={(option, props) => (
                          <div>
                            <h6>{option.TitleFa}</h6>
                            <span>
                              {t("Township.Entity")}: {option.Township.TitleFa}
                            </span>
                            <br />
                            <span>
                              {t("Province.Entity")}:{" "}
                              {option.Township.Province.TitleFa}
                            </span>
                          </div>
                        )}
                      />
                    </div>
                    <div className="col-lg-4">
                      {console.log("data............",datares)}
                      <DatePickerField
                        name="BirthDateObj"
                        customFeedbackLabel=""
                        label={t("RealPerson.BirthDate")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <SuggestionField
                        name="IssueCityId"
                        labelKey="TitleFa"
                        customFeedbackLabel=""
                        label={t("RealPerson.IssueCity")}
                        placeHolder={t("msg.SelectBySuggestion")}
                        handleSearch={handleSuggestion}
                        defaultValue={
                          datares.IssueCity ? [datares.IssueCity] : []
                        }
                        renderMenuItemChildren={(option, props) => (
                          <div>
                            <h6>{option.TitleFa}</h6>
                            <span>
                              {t("Township.Entity")}: {option.Township.TitleFa}
                            </span>
                            <br />
                            <span>
                              {t("Province.Entity")}:{" "}
                              {option.Township.Province.TitleFa}
                            </span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <button
                    id="BtnRealPersonSend"
                    type="submit"
                    style={{ display: "none" }}
                    ref={btnRef}
                    onSubmit={() => handleSubmit()}
                  ></button>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </>
    );
  }
);
