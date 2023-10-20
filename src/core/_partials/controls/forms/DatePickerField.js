import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "./styles/DatePickerField.css";
import DatePicker from "react-modern-calendar-datepicker";
import moment from "moment";
import { EnToFaObjDate, EnToFaObjDateTime, FaObjToEnDateTime } from "src/core/_helpers";

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

const toDateTime = (dateObj) => {
  if(typeof dateObj === "string")
    return dateObj;
  else 
    return !!dateObj? FaObjToEnDateTime(dateObj): null;
}
const fromDateTime = (dateObj) => {
  if(typeof dateObj === "string")
    return !!dateObj? EnToFaObjDate(dateObj): null;
  else 
  return dateObj;
}

export function DatePickerField({ version = 1, required = false, ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [field] = useField(props);

  const showDate = (date) => {
    if(!!date == false) return "";
    if(version === 2 && !!date)
      date = fromDateTime(date);

    return !!date ? date.year + "/" + date.month + "/" + date.day: "";
  }

  useState(() => {
    version === 1 && setFieldValue(field.name, field.value || props.value || null);
    version === 2 && setFieldValue(field.name, field.value || props.value || null);
  }, [props.value]);

  const renderCustomInput = ({ ref }) => (
    <>
      <input
        readOnly
        ref={ref}
        value={showDate(field.value)}
        className={
          "form-control text-center " +
          getFieldCSSClasses(touched[field.name], errors[field.name])
        }
      />
      {!!field.value && (
        <i
        className="fas fa-times text-danger"
        style={{
          position: "absolute",
          top: "calc(50% - 8px)",
          left: "0.7rem"
        }}
        onClick={() => {
          setFieldValue(field.name, "");
          !!props.handleOnChange && props.handleOnChange("");
        }}
        ></i>
      )}
    </>
  );

  return (
    <>
      {props.label && <label htmlFor={field.name} className={required?'required':''}>{props.label}</label>}

      <DatePicker
        style={{ width: "100%" }}
        {...props}
        {...field}
        value={version === 2? fromDateTime(field.value || props.value || null): field.value || props.value || null}
        onChange={(val) => {
          console.log("toDateTime > ", toDateTime(val));
          console.log("showDate   > ", showDate(toDateTime(val)));
          version === 1 && setFieldValue(field.name, val);
          version === 2 && setFieldValue(field.name, toDateTime(val));
          !!props.handleOnChange && props.handleOnChange(val);
        }}
        locale={process.env.REACT_APP_DATE}
        inputPlaceholder=""
        renderInput={renderCustomInput}
        shouldHighlightWeekends
        wrapperClassName="d-block"
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
