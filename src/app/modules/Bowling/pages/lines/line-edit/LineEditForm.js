import React, { useState, useEffect, createRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { getAllCenters } from "./../../../_redux/centers/centersCrud";

export function LineEditForm({ line, btnRef, saveLine }) {
  const defaultInput = createRef();
  const { t } = useTranslation();
  const [centers, setCenters] = useState([]);

  const LineEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Line.Title") })),
    CenterId: Yup.number()
      .nullable()
      .required(t("err.IsRequired", { 0: t("Line.Center") })),
  });

  useEffect(() => {
    if (centers.length === 0)
      getAllCenters().then(({ data }) =>
        setCenters((lines) => [
          { CenterId: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [centers.length, t]);

  const clean = (values) => {
    return {
      LineId: values.LineId,
      CenterId: +values.CenterId,
      Title: values.Title,
    };
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={line}
        validationSchema={LineEditSchema}
        onSubmit={(values) => {
          saveLine(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-md-4">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Line.Title")}
                  />
                </div>
                <div className="col-md-4">
                  <Select
                    name="CenterId"
                    label={t("Line.Center")}
                    setref={defaultInput}
                  >
                    {centers.map((center) => (
                      <option key={center.CenterId} value={center.CenterId}>
                        {center.Title}
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
