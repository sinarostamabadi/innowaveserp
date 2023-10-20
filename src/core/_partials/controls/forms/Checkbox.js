import { useField, useFormikContext } from "formik";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function CheckboxField({ ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [field] = useField(props);

  return (
    <>
      <div style={{ paddingTop: props.inline == true ? props.noTop? "0": "14px" : "32px" }}>
        <input type="checkbox" style={{ display: "none" }} />
        <label className={`checkbox checkbox-${props.size || "lg"} checkbox-single`}>
          <input
            id={field.name}
            type="checkbox"
            checked={field.value}
            onChange={(val) => {
              setFieldValue(field.name, val.target.checked);
              !!props.onChange && props.onChange(val.target.checked);
            }}
          />
          <span />
        </label>
        {!!props.label && props.label.length > 0 && (
          <label
            htmlFor={field.name}
            className="ml-8"
            style={{
              display: "block",
              marginTop: props.inline == true ? "-19px": "-26px",
            }}
          >
            {props.label}
          </label>
        )}
      </div>
    </>
  );
}
