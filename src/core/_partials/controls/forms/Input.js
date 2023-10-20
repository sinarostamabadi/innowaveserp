import React, { useState } from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";

const getFieldCSSClasses = (touched, errors, isLtr = false) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    //classes.push("is-valid");
  }

  if (!isLtr) {
    classes.push("dir-rtl");
    classes.push("text-left");
  } else {
    classes.push("dir-ltr");
    classes.push("text-right");
  }

  return classes.join(" ");
};

export function Input({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, dirty, isValid, status }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  required = false,
  customFeedbackLabel,
  type = "text",
  isLtr,
  ...props
}) {
  const [enableByCheck, setEnableByCheck] = useState(
    props.enableByCheck == true ? props.enableByCheckDef : false
  );

  return (
    <>
      {label && (
        <label htmlFor={field.name} className={required?'required':''}>
          {props.enableByCheck == true && (
            <input
              type="checkbox"
              value={props.enableByCheckDef}
              onChange={(e) => {
                setEnableByCheck(!e.target.checked);
                !!props.onCheck && props.onCheck(e.target.checked);
              }}
            />
          )}{" "}
          {"   "}
          {label}
        </label>
      )}
      <input
        {...(!!props.setref ? { ref: props.setref } : {})}
        type={type}
        className={getFieldCSSClasses(touched[field.name], errors[field.name], isLtr)}
        disabled={enableByCheck}
        {...field}
        {...props}
      />
      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-feedback text-red d-block">
          {errors[field.name].toString()}
        </div>
      ) : (
        <></>
        // <div className="feedback">
        //   <b>{props.label}</b> را لطفا وارد نمایید
        // </div>
      )}
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          // touched={touched[field.name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
