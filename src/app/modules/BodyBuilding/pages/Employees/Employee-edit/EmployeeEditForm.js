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
import axios from "axios";
import { useTranslation } from "react-i18next";
import Axios from "axios";
import moment from "jalali-moment";
import { Select, SuggestionField } from "src/core/_partials/controls";
import { getAll } from "../../../_redux/EmployeeTypes/EmployeeTypesCrud";

export const EmployeeEditForm = forwardRef(
  ({ employee, employeeType, setEmployeeType }, ref) => {
    const { t } = useTranslation();
    const defaultInput = useRef(null);
    !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

    let callBack;
    const EmployeeEditSchema = Yup.object().shape({
      BodyBuildingEmployeeTypeId: Yup.number()
        .nullable()
        .required(
          t("err.IsRequired", {
            0: t("BodyBuildingEmployee.BodyBuildingEmployeeType"),
          })
        ),
      RealPersonId: Yup.number()
        .nullable()
        .required(
          t("err.IsRequired", { 0: t("BodyBuildingEmployee.RealPerson") })
        ),
    });

    const cooperationTypes = [
      { text: t("Common.WithoutSelect"), value: null },
      { text: t("Common.Male"), value: 1 },
      { text: t("Common.Female"), value: 0 },
    ];

    const [employeeTypes, setEmployeeTypes] = useState([]);
    useEffect(() => {
      if (employeeTypes.length == 0)
        getAll().then(({ data }) =>
          setEmployeeTypes((lines) => [
            {
              BodyBuildingEmployeeTypeId: "",
              Title: t("Common.WithoutSelect"),
            },
            ...data.Items,
          ])
        );
    }, [employeeTypes.length, t]);

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

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        callBack = fn;

        const btnSend = document.getElementById("BtnEmployeeSend");
        btnSend.click();
      },
    }));

    function cleanData(data) {
      return {
        BodyBuildingEmployeeId: data.BodyBuildingEmployeeId,
        BodyBuildingEmployeeTypeId: data.BodyBuildingEmployeeTypeId,
        RealPersonId: data.RealPersonId,
        CooperationType: !!data.CooperationType ? +data.CooperationType : null,
        BodyBuildingEmployeeExpertises: data.BodyBuildingEmployeeExpertises,
      };
    }

    return (
      <div className="pt-3">
        <Formik
          enableReinitialize={true}
          initialValues={employee}
          validationSchema={EmployeeEditSchema}
          onSubmit={(values) => {
            !!callBack && callBack(cleanData(values));
          }}
        >
          {({ handleSubmit, setFieldValue }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      name="BodyBuildingEmployeeTypeId"
                      label={t("BodyBuildingEmployee.BodyBuildingEmployeeType")}
                      onChange={(val) => {
                        setFieldValue(
                          "BodyBuildingEmployeeTypeId",
                          !!val.target.value ? +val.target.value : null
                        );
                        setEmployeeType(
                          !!val.target.value ? +val.target.value : null
                        );
                      }}
                    >
                      {employeeTypes.map((employeeType) => (
                        <option
                          key={employeeType.BodyBuildingEmployeeTypeId}
                          value={employeeType.BodyBuildingEmployeeTypeId}
                        >
                          {employeeType.Title}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Select
                      name="CooperationType"
                      label={t("BodyBuildingEmployee.CooperationType")}
                      customFeedbackLabel=""
                    >
                      {cooperationTypes.map((cooperationType) => (
                        <option
                          key={cooperationType.value}
                          value={cooperationType.value}
                        >
                          {cooperationType.text}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <SuggestionField
                      name="RealPersonId"
                      labelKey="FullNameFa"
                      fieldKey="PersonId"
                      objectName="RealPerson"
                      version={2}
                      customFeedbackLabel=""
                      label={t("BodyBuildingEmployee.RealPerson")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionRealperson}
                      defaultValue={
                        !!employee && !!employee.RealPerson
                          ? [employee.RealPerson]
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
                </div>
                <button
                  id="BtnEmployeeSend"
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
