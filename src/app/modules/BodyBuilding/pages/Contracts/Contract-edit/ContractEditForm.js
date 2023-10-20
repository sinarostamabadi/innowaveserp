import { useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Input,
  Select,
  SuggestionField,
  DatePickerField,
} from "src/core/_partials/controls";
import axios from "axios";

export const ContractEditForm = forwardRef(({ contract }, ref) => {
  const { t } = useTranslation();
  const defaultInput = useRef(null);
  const bloodGroups = [
    { value: null, text: t("Common.WithoutSelect") },
    { value: 1, text: "A+" },
    { value: 2, text: "A-" },
    { value: 3, text: "B+" },
    { value: 4, text: "B-" },
    { value: 5, text: "AB+" },
    { value: 6, text: "AB-" },
    { value: 7, text: "O+" },
    { value: 8, text: "O-" },
  ];
  !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

  let callBack;
  const ContractEditSchema = Yup.object().shape({
    Weight: Yup.number().required(
      t("err.IsRequired", { 0: t("BodyBuildingContract.Weight") })
    ),
    Height: Yup.number().required(
      t("err.IsRequired", { 0: t("BodyBuildingContract.Height") })
    ),
  });

  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnContractSend");
      btnSend.click();
    },
  }));

  const handleSuggestionRealperson = useCallback((query, fnCallback) => {
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
      BodyBuildingContractId: data.BodyBuildingContractId,
      PersonId: !!data.PersonId ? +data.PersonId : null,
      Weight: data.Weight,
      Height: data.Height,
      BloodGroup: !!data.BloodGroup ? +data.BloodGroup : null,
      SensorInfo: data.SensorInfo,
      FromDate: data.FromDate,
      ToDate: data.ToDate,
    };
  }

  return (
    <div className="pt-3">
      <Formik
        enableReinitialize={true}
        initialValues={contract}
        validationSchema={ContractEditSchema}
        onSubmit={(values) => {
          !!callBack && callBack(cleanData(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-3">
                  <SuggestionField
                    name="PersonId"
                    labelKey="FullNameFa"
                    objectName="Person"
                    version={2}
                    customFeedbackLabel=""
                    label={t("BodyBuildingContract.Person")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionRealperson}
                    defaultValue={
                      !!contract && !!contract.Person ? [contract.Person] : []
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
                <div className="col-lg-3">
                  <Field
                    name="Weight"
                    type="number"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BodyBuildingContract.Weight")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="Height"
                    type="number"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BodyBuildingContract.Height")}
                  />
                </div>
                <div className="col-lg-3">
                  <Select
                    name="BloodGroup"
                    label={t("BodyBuildingContract.BloodGroup")}
                    customFeedbackLabel=""
                  >
                    {bloodGroups.map((cooperationType) => (
                      <option
                        key={cooperationType.value}
                        value={cooperationType.value}
                      >
                        {cooperationType.text}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <Field
                    name="SensorInfo"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BodyBuildingContract.SensorInfo")}
                  />
                </div>
                <div className="col-lg-3">
                  <DatePickerField
                    name="FromDate"
                    version={2}
                    customFeedbackLabel=""
                    label={t("BodyBuildingDiscount.FromDate")}
                    value={contract.FromDateObj}
                  />
                </div>
                <div className="col-lg-3">
                  <DatePickerField
                    name="ToDate"
                    version={2}
                    customFeedbackLabel=""
                    label={t("BodyBuildingDiscount.ToDate")}
                    value={contract.ToDateObj}
                  />
                </div>
              </div>
              <button
                id="BtnContractSend"
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
});
