import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import Select from 'react-select';

const getFieldCSSClasses = (touched, errors) => {
  const classes = [];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function MultiSelectField({ ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [field] = useField(props);
  const [ selectedOption, setSelectedOption ] = useState(props.selectedOption);
  const [options, setOptions] = useState(props.initOptions);
  
  return (
    <>
      {props.label && <label htmlFor={field.name}>{props.label}</label>}

      <Select
        style={{ width: "100%" }}
        options={options}
        {...props}
        {...field}
        value={field.value || null}
        onChange={val => {
          setFieldValue(field.name, val);
          !!props.onChanges && props.onChanges(val);
        }}
        isMulti={true}
        isClearable={true}
        onInputChange={(term) => {
          props.handleSearch(term, (options) => {
            setOptions(options);
          });
        }}
        inputPlaceholder=""
        shouldHighlightWeekends
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        classNamePrefix="d-block"
      />

      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-feedback text-red d-block">
          {errors[field.name].toString()}
        </div>
      ) : (<></>
          // <div className="feedback">
          //   <b>{props.label}</b> را لطفا وارد نمایید
          // </div>
        )}
    </>
  );
}
