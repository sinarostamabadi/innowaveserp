import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import "./styles/FileInput.css";
import { getById } from "../../../../app/modules/Core/_redux/attachment/attachmentsCrud";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["custom-file-input"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    //classes.push("is-valid");
  }

  return classes.join(" ");
};

export function FileInput({ ...props }) {
  const {
    setFieldValue,
    values,
    errors,
    touched,
    setErrors,
    validateField,
    setFieldTouched,
    setFieldError,
  } = useFormikContext();
  const [field] = useField(props);

  const [value, setValue] = useState(field.value);
  const [valueId, setValueId] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    if (values[field.name + "Id"]){
      readService(values[field.name + "Id"]);
    }
    else if(values[field.name + "File"] && values[field.name + "File"].name){
      readURL(values[field.name + "File"]);
      setValue(values[field.name + "File"]);
      setFieldValue(field.name, values[field.name + "File"].name);
      setFieldValue(field.name + "File", values[field.name + "File"]);
      setFieldValue(field.name + "Id", null);
      setValue(values[field.name + "File"]);
    } else {
      setValue(null);
      setFieldValue(field.name, null);
      setFieldValue(field.name + "File", null);
      setFieldValue(field.name + "Id", null);
    }
  }, [value, values]);

  function readURL(input) {
    if (input) {
      var reader = new FileReader();

      reader.onload = function(e) {
        setImgPreview(e.target.result);
      };

      reader.readAsDataURL(input);
    }
  }

  function readService(input) {
    if (input && !!props.getImage) {
      props.getImage(input).then(({ data }) => {
        setValueId(data);
        setImgPreview(`data:${data.FileExtension};base64,` + data.ContentText);
      });
    } else if (input && !!props.getImage == false) {
      getById(input).then(({ data }) => {
        setValueId(data);
        setImgPreview(`data:${data.FileExtension};base64,` + data.ContentText);
        setFieldValue(field.name, data.FileName);
      });
    }
  }

  return (
    <>
      {value || valueId ? (
        <>
          <label htmlFor={field.name}>{props.label}</label>
          <div className="card card-border-dark">
            <div className="card-body p-2 d-flex">
              <div
                style={{ flex: "0", position: "relative" }}
                className="flex-1"
              >
                <input
                  type="file"
                  name={field.name + "File"}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    bottom: "0",
                    right: "0",
                    width: "100%",
                    opacity: "0",
                  }}
                />
                <img
                  src={imgPreview}
                  style={{
                    height: "78px",
                    width: "78px",
                    border: "2px solid #d1d3e0",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div
                style={{ flex: "2", position: "relative" }}
                className="flex-1 pl-3"
              >
                <div className="py-2">
                  <b>نام: </b>{" "}
                  {(value && value.name) || (valueId && valueId.FileName)}
                </div>
                <div className="pb-2">
                  <b>نوع: </b>{" "}
                  {(value && value.type) || (valueId && valueId.FileExtension)}
                </div>
                <div>
                  <b>حجم: </b>{" "}
                  {Math.ceil(
                    ((value && value.size) || (valueId && valueId.FileSize)) /
                      1024
                  )}{" "}
                  کیلوبایت
                </div>
                <div
                  onClick={() => {
                    setFieldValue(field.name, "", true);
                    setFieldValue(field.name + "File", null);
                    setFieldValue(field.name + "Id", null);
                    setValue(null);
                    setValueId(null);
                    validateField(field.name);
                    setFieldTouched(field.name, true);
                }}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    cursor: "pointer",
                  }}
                >
                  <i className="fa fa-times text-danger"></i>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <label htmlFor={field.name}>{props.label}</label>
          <div className="custom-file">
            <input
              {...(!!props.setref ? { ref: props.setref } : {})}
              type="file"
              value={field.value || props.value || null}
              className={getFieldCSSClasses(
                touched[field.name],
                errors[field.name]
              )}
              {...field}
              {...props}
              onChange={(event) => {
                if (event.target.files[0].size / 1024 > 512) {
                  errors[field.name] = "حجم فایل بیش از 512 کیلوبایت می‌باشد";
                  setErrors(errors);
                  setFieldError(
                    field.name,
                    "حجم فایل بیش از 512 کیلوبایت می‌باشد"
                  );
                } else {
                  setFieldValue(field.name, event.target.files[0].name);
                  setFieldValue(field.name + "File", event.target.files[0]);
                  setFieldValue(field.name + "Id", null);
                  setValue(event.target.files[0]);
                  readURL(event.target.files[0]);
                  validateField(field.name);
                }
              }}
            />
            <label className="custom-file-label" htmlFor={field.name}>
              {/* {props.label} */}
            </label>
          </div>
        </div>
      )}

      {!!values[field.name] == false &&
      errors[field.name] &&
      touched[field.name] ? (
        <div className="invalid-feedback text-red d-block">
          {errors[field.name].toString()}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
