import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "jalali-moment";

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

export function TimePickerField({ version = 1, required = false, ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [field] = useField(props);

  return (
    <>
      {props.label && <label htmlFor={field.name} className={required?'required':''}>{props.label}</label>}

      <TimePicker
        style={{ width: "100%" }}
        {...props}
        {...field}
        value={!!field.value? (typeof field.value === "string"? moment(field.value, 'hh:mm:ss'): field.value): null}
        onChange={(val, val2) => {
          version == 2 && setFieldValue(field.name, val.format("HH:mm"));
          version == 1 && setFieldValue(field.name, val);
        }}
        locale={process.env.REACT_APP_DATE}
        disabled={props.disabled}
        inputPlaceholder=""
        shouldHighlightWeekends
        className={
          "form-control text-right " +
          getFieldCSSClasses(touched[field.name], errors[field.name])
        }
        wrapperClassName="d-block"
        autoCompelete="off"
        clearIcon={
          <i
            className="fas fa-times text-danger"
            style={{
              top: "calc(50% - 8px)",
              position: "absolute",
              left: "0.7rem",
            }}
          ></i>
        }
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
    </>
  );
}
