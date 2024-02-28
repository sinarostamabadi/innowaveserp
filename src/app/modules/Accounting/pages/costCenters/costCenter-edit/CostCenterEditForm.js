import React, { createRef, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../core/_partials/controls";
import { getAllCostCenters } from "./../../../_redux/costCenters/costCentersCrud";
import { useTranslation } from "react-i18next";

export function CostCenterEditForm({ costCenter, btnRef, saveCostCenter }) {
  console.log(costCenter);
  const { t } = useTranslation();
  const defaultInput = createRef();

  useEffect(() => {
    defaultInput.current.focus();
  }, [defaultInput]);

  const CostCenterEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("CostCenter.Title") })),
    Code: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .nullable()
      .required(t("err.IsRequired", { 0: t("CostCenter.Code") })),
    level: Yup.string()
      .min(1, t("err.Min", { 0: 1 }))
      .max(3, t("err.Max", { 0: 3 })),
  });
  const [parents, setParents] = useState([]);

  useEffect(() => {
    if (parents.length == 0) {
      console.log("costCenter -> ", costCenter);
      getAllCostCenters().then(({ data }) =>
        setParents((parents) => [
          { CostCenterId: "", Title: t("Common.WithoutSelect") },
          ...data.Items.filter(
            (x) => x.CostCenterId != costCenter.CostCenterId
          ),
        ])
      );
    }
  }, [parents.length, costCenter.CostCenterId]);

  function clean(values) {
    return {
      CostCenterId: values.CostCenterId,
      Title: values.Title,
      Code: values.Code,
      ParentId: +values.ParentId,
      Level: values.Level && +values.Level,
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={costCenter}
        validationSchema={CostCenterEditSchema}
        onSubmit={(values) => {
          saveCostCenter(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="Title"
                    setref={defaultInput}
                    component={Input}
                    customFeedbackLabel=""
                    label={t("CostCenter.Title")}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="Code"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("CostCenter.Code")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="Level"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("CostCenter.Level")}
                  />
                </div>
                <div className="col-lg-6">
                  <Select
                    name="ParentId"
                    label={t("CostCenter.ParentId")}
                    setref={defaultInput}
                  >
                    {parents.map((parent) => (
                      <option
                        key={parent.CostCenterId}
                        value={parent.CostCenterId}
                      >
                        {parent.Title}
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
