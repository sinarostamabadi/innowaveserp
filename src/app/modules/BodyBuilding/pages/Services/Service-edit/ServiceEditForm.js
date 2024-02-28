import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Input, Select, TimePickerField } from "src/core/_partials/controls";
import { getAll } from "../../../_redux/EmployeeTypes/EmployeeTypesCrud";

export function ServiceEditForm({ service, btnRef, saveService }) {
  const { t } = useTranslation();
  const schemaValidation = Yup.object().shape({
    Price: Yup.number().required(
      t("err.IsRequired", { 0: t("BodyBuildingService.Price") })
    ),
  });

  const [employeeTypes, setEmployeeTypes] = useState([]);

  useEffect(() => {
    if (employeeTypes.length == 0)
      getAll().then(({ data }) =>
        setEmployeeTypes((lines) => [
          { BodyBuildingEmployeeTypeId: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [employeeTypes.length, t]);

  function clean(dirty) {
    return {
      BodyBuildingServiceId: dirty.BodyBuildingServiceId,
      BodyBuildingEmployeeTypeId: !!dirty.BodyBuildingEmployeeTypeId
        ? +dirty.BodyBuildingEmployeeTypeId
        : null,
      Title: dirty.Title,
      UseIPAddress: dirty.UseIPAddress,
      Price: +dirty.Price,
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={service}
        validationSchema={schemaValidation}
        onSubmit={(values) => {
          saveService(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BodyBuildingService.Title")}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="UseIPAddress"
                    component={Input}
                    isLtr
                    customFeedbackLabel=""
                    label={t("BodyBuildingService.UseIPAddress")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="Price"
                    component={Input}
                    required
                    type="number"
                    isLtr
                    customFeedbackLabel=""
                    label={t("BodyBuildingService.Price")}
                  />
                </div>
                <div className="col-lg-6">
                  <Select
                    name="BodyBuildingEmployeeTypeId"
                    label={t("BodyBuildingService.BodyBuildingEmployeeType")}
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
