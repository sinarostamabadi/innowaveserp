import React from "react";
import {useField} from "formik";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import { useTranslation } from "react-i18next";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    //classes.push("is-valid");
  }

  return classes.join(" ");
};

export function Select({
  label,
  withFeedbackLabel = true,
  type = "text",
  customFeedbackLabel,
  children,
  ...props
}) {
  const {t} = useTranslation();
  
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  return (
    <>
      {label && <label htmlFor={field.name}>{t("Common.Select")} {label}</label>}
      <select
        ref={props.setref}
        className={getFieldCSSClasses(touched, error)}
        {...field}
        {...props}
      >
        {children}
      </select>
      {
      error && touched ? (
        <div className="invalid-feedback text-red d-block">
          {error.toString()}
        </div>
      ) : (<></>
          // <div className="feedback">
          //   <b>{props.label}</b> را لطفا وارد نمایید
          // </div>
        )
    }
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          erros={error}
          touched={touched}
          label={label}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
