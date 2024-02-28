import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import {
  Input,
  DatePickerField,
  SuggestionField,
  Select,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import {
  FaObjToEnDateTime,
  FaToFaObjDate,
} from "../../../../../../core/_helpers";
import { getRealPersonById } from "../../../../Core/_redux/realPersons/realPersonsCrud";
import { getAllPersonGroups } from "src/app/modules/General/_redux/personGroups/personGroupsCrud";

export const SellDocumentEditForm = forwardRef(({ sellDocument }, ref) => {
  const { t } = useTranslation();
  let callBack;

  const Genders = [
    { text: "No select", value: null },
    { text: "Male", value: 1 },
    { text: "Female", value: 0 },
  ];

  const SellDocumentEditSchema = Yup.object().shape({
    SellDocumentDateObj: Yup.object().required(
      t("err.IsRequired", { 0: t("SellDocument.SellDocumentDate") })
    ),
    FirstNameFa: Yup.string().required(
      t("err.IsRequired", { 0: t("RealPerson.FirstNameFa") })
    ),
    LastNameFa: Yup.string().required(
      t("err.IsRequired", { 0: t("RealPerson.LastNameFa") })
    ),
    Mobile: Yup.string().required(
      t("err.IsRequired", { 0: t("Person.Mobile") })
    ),
  });

  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnSellDocumentSend");
      btnSend.click();
    },
  }));

  const [personGroups, petPersonGroups] = useState([]);

  useEffect(() => {
    if (personGroups.length == 0)
      getAllPersonGroups().then(({ data }) =>
      petPersonGroups((personGroups) => [
          { PersonGroupId: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [personGroups.length, t]);

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

  function cleanData(data) {
    return {
      SellDocumentId: !!sellDocument.SellDocumentId? sellDocument.SellDocumentId: null,
      SellDocumentDate: FaObjToEnDateTime(data.SellDocumentDateObj),
      SellDocumentDateObj: data.SellDocumentDateObj,
      IsCanceled: data.IsCanceled,
      PersonId: !!data.PersonId ? +data.PersonId[0].PersonId : null,
      Person: {
        FirstNameFa: data.FirstNameFa,
        LastNameFa: data.LastNameFa,
        FullNameEn: data.FullNameEn,
        BirthDate: data.BirthDateObj && FaObjToEnDateTime(data.BirthDateObj),
        NationalCode: data.NationalCode,
        Mobile: data.Mobile,
        GenderId: data.GenderId,
        CreditPrice: !!data.PersonId ? +data.PersonId[0].CreditPrice : null,
        PointPrice: !!data.PersonId ? +data.PersonId[0].PointPrice : null,
        RelationPersonGroups: !!data.PersonGroupId? [{PersonGroupId: +data.PersonGroupId}]: [],
      },
      IsTemp: true,
      SettlementTypeId: undefined,
      Description: data.Description,
      Price: 0,
      DiscountPrice: 0,
      PayablePrice: 0,
      CanceledSellDocumentId: !!data.CanceledSellDocumentId? +data.CanceledSellDocumentId: null,
      PaymentTrackingCode: undefined,
      PaymentInfo: undefined,
      SellDocumentDetails: [],
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={sellDocument}
        validationSchema={SellDocumentEditSchema}
        onSubmit={(values) => {
          !!callBack && callBack(cleanData(values));
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Form className="form form-label-right" onSubmit={handleSubmit}>
              <div className="form-group row">
                <div className="col-md-4">
                  <Field
                    name="SellDocumentId"
                    component={Input}
                    customFeedbackLabel=""
                    readOnly
                    disable="disable"
                    placeholder={t("SellDocument.FillByNext")}
                    label={t("SellDocument.SellDocumentId")}
                  />
                </div>
                <div className="col-lg-4">
                  <DatePickerField
                    name="SellDocumentDateObj"
                    customFeedbackLabel=""
                    label={t("SellDocument.SellDocumentDate")}
                  />
                </div>
                <div className="col-md-4">
                  <Field
                    name="Description"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("SellDocument.Description")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-4">
                  <SuggestionField
                    name="PersonId"
                    labelKey="FullNameFa"
                    customFeedbackLabel=""
                    label={t("SellDocument.Person")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPerson}
                    handleOnChange={(val) => {
                      if (!!val) {
                        getRealPersonById(val).then(({ data }) => {
                          setFieldValue(
                            "FirstNameFa",
                            data.RealPerson.FirstNameFa
                          );
                          setFieldValue(
                            "LastNameFa",
                            data.RealPerson.LastNameFa
                          );
                          setFieldValue("Mobile", data.Mobile);
                          setFieldValue(
                            "NationalCode",
                            data.RealPerson.NationalCode
                          );
                          setFieldValue("GenderId", data.RealPerson.GenderId);
                          setFieldValue(
                            "BirthDateObj",
                            FaToFaObjDate(data.RealPerson.BirthDate)
                          );
                        });
                      }
                    }}
                    defaultValue={
                      !!sellDocument && !!sellDocument.Person
                        ? [sellDocument.Person]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.FullNameFa}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-auto">
                  <div className="alert alert-warning mt-8 py-2">
                    <i className="fas fa-exclamation-triangle text-white mr-2"></i>
                    Search for the customer or complete the fields below
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <Field
                    name="FirstNameFa"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("RealPerson.FirstNameFa")}
                  />
                </div>
                <div className="col-md-3">
                  <Field
                    name="LastNameFa"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("RealPerson.LastNameFa")}
                  />
                </div>
                <div className="col-md-3">
                  <DatePickerField
                    name="BirthDateObj"
                    customFeedbackLabel=""
                    label={t("RealPerson.BirthDate")}
                  />
                </div>
                <div className="col-md-3">
                    <Select
                      name="PersonGroupId"
                      label={t("PersonGroup.Entity")}
                    >
                      {personGroups.map((personGroup) => (
                        <option key={personGroup.PersonGroupId} value={personGroup.PersonGroupId}>
                          {personGroup.Title}
                        </option>
                      ))}
                    </Select>
                  </div>
              </div>
              <div className="form-group row">
              <div className="col-md-4">
                  <Field
                    name="FullNameEn"
                    isLtr
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Person.FullNameEn")}
                  />
                </div>
                <div className="col-md-3">
                  <Field
                    name="NationalCode"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("RealPerson.NationalCode")}
                  />
                </div>
                <div className="col-md-3">
                  <Field
                    name="Mobile"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Person.Mobile")}
                  />
                </div>
                <div className="col-md-2">
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
              </div>
              <button
                id="BtnSellDocumentSend"
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
