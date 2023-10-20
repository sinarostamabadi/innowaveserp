import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { findUnits } from "./../../../_redux/units/unitsCrud";


export function UnitConversionEditForm({ unitConversion, btnRef, saveUnitConversion }) {
  const { t } = useTranslation();

  const [BaseUnit, setBaseUnit] = useState([]);

  useEffect(() => {
    if (BaseUnit.length == 0)
      findUnits({
        "Filters": [],
        "PageNumber": 1,
        "PageSize": 10
      }).then(({ data }) =>
        setBaseUnit((child) => [
          { UnitConversionId: null, Name: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [BaseUnit.length]);

  const UnitConversionEditSchema = Yup.object().shape({
    BaseUnitId: Yup.number()
      .required(t("err.IsRequired", { 0: t("UnitConversion.BaseUnit") })),
    ConvertedUnitId: Yup.number()
      .required(t("err.IsRequired", { 0: t("UnitConversion.ConvertedUnit") })),
    Amount: Yup.number()
      .required(t("err.IsRequired", { 0: t("UnitConversion.Amount") })),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={unitConversion}
        validationSchema={UnitConversionEditSchema}
        onSubmit={(values) => {
          saveUnitConversion(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Select name="BaseUnitId" label={t("UnitConversion.BaseUnitId")}>
                    {BaseUnit.map((child, index) => (
                      <option key={index} value={child.UnitId}>
                        {child.Name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-6">
                  <Select name="ConvertedUnitId" label={t("UnitConversion.ConvertedUnitId")}>
                    {BaseUnit.map((child, index) => (
                      <option key={index} value={child.UnitId}>
                        {child.Name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="Amount"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("UnitConversion.Amount")}
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