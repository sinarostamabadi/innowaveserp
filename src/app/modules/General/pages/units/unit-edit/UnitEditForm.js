import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { findUnitMeasureGroups } from "../../../../General/_redux/unitMeasureGroups/unitMeasureGroupsCrud";

export function UnitEditForm({ unit, btnRef, saveUnit }) {
  const { t } = useTranslation();

  const [unitGroup, setUnitGroup] = useState([]);

  useEffect(() => {
    if (unitGroup.length === 0)
      findUnitMeasureGroups({
        Filters: [],
        OrderBy: "UnitGroupName asc",
        PageNumber: 1,
        PageSize: 10,
        sortField: "UnitGroupName",
        sortOrder: "asc",
      }).then(({ data }) => {
        console.log(data);
        return setUnitGroup(() => [
          { UnitGroupId: null, UnitGroupName: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      });
  }, [unitGroup.length]);

  const UnitEditSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Unit.Name") })),
    UnitGroupId: Yup.number()
      .required(t("err.IsRequired", { 0: t("Unit.UnitGroup") })),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={unit}
        validationSchema={UnitEditSchema}
        onSubmit={(values) => {
          saveUnit(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="Name"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Unit.Name")}
                  />
                </div>
                <div className="col-lg-6">
                  <Select
                    name="UnitGroupId"
                    label={t("Unit.UnitGroupId")}
                  >
                    {unitGroup.map((item, index) => (
                      <option key={index} value={item.UnitMeasureGroupId}>
                        {item.UnitGroupName}
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