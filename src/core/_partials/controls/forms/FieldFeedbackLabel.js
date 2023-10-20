import React from "react";

const inputLabel = ({ label, touched, error, customFeedbackLabel }) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  // if (touched && !error && label) {
  //   return <div className="valid-feedback">{label} وارد شده صحیح می‌باشد</div>;
  // }

  return (<></>
    // <div className="feedback">
    //   {customFeedbackLabel && <>{customFeedbackLabel}</>}
    //   {!customFeedbackLabel && (
    //     <>
    //       <b>{label}</b> را لطفا وارد نمایید
    //     </>
    //   )}
    // </div>
  );
};

const selectLabel = ({ label, touched, error, customFeedbackLabel }) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  return (<></>
    // <div className="feedback">
    //   {customFeedbackLabel && <>{customFeedbackLabel}</>}
    //   {!customFeedbackLabel && label && (
    //     <>
    //       <b>{label}</b> را لطفا انتخاب نمایید
    //     </>
    //   )}
    // </div>
  );
};

export function FieldFeedbackLabel({
  label,
  touched,
  error,
  type,
  customFeedbackLabel
}) {
  switch (type) {
    case "text":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case "email":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case "password":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    default:
      return selectLabel({ label, touched, error, customFeedbackLabel });
  }
}
