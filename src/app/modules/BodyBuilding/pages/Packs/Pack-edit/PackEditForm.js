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
import { useTranslation } from "react-i18next";
import Axios from "axios";
import moment from "jalali-moment";
import {
  Input,
  Select,
  CheckboxField,
  SuggestionField,
  DatePickerField,
  TimePickerField,
} from "src/core/_partials/controls";
import { DefaultRestaurant } from "src/core/_partials/custom/defaults/DefaultRestaurant";
import { FaObjToEnDateTime } from "src/core/_helpers";

export const PackEditForm = forwardRef(({ pack }, ref) => {
  const { t } = useTranslation();
  const defaultInput = useRef(null);
  !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

  let callBack;
  const PackEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("BodyBuildingPack.Title") })),
  });

  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnPackSend");
      btnSend.click();
    },
  }));

  function cleanData(data) {
    return {
      BodyBuildingPackId: data.BodyBuildingPackId,
      Title: data.Title,
      Description: data.Description,
    };
  }

  return (
    <div className="pt-3">
      <Formik
        enableReinitialize={true}
        initialValues={pack}
        validationSchema={PackEditSchema}
        onSubmit={(values) => {
          !!callBack && callBack(cleanData(values));
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
                    label={t("BodyBuildingPack.Title")}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="Description"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BodyBuildingPack.Description")}
                  />
                </div>
              </div>
              <button
                id="BtnPackSend"
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
