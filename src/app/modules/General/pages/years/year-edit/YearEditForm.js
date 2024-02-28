import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  DatePickerField,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { FaObjToEnDateTime } from "../../../../../../core/_helpers";

export function YearEditForm({ year, btnRef, saveYear }) {
  const { t } = useTranslation();

  const YearEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("Year.Title") })),
    FromDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("Year.FromDate") }))
      .nullable(),
    ToDateObj: Yup.object()
      .required(t("err.IsRequired", { 0: t("Year.ToDate") }))
      .nullable(),
  });

  function clean(dirty) {
    console.log(dirty);
    return {
      YearId: dirty.YearId,
      Title: dirty.Title,
      FromDate: FaObjToEnDateTime(dirty.FromDateObj),
      ToDate: FaObjToEnDateTime(dirty.ToDateObj),
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={year}
        validationSchema={YearEditSchema}
        onSubmit={(values) => {
          saveYear(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Year.Title")}
                  />
                </div>
                <div className="col-lg-4">
                  <DatePickerField
                    name="FromDateObj"
                    customFeedbackLabel=""
                    label={t("Year.FromDate")}
                  />
                </div>
                <div className="col-lg-4">
                  <DatePickerField
                    name="ToDateObj"
                    customFeedbackLabel=""
                    label={t("Year.ToDate")}
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
