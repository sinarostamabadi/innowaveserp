import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../core/_partials/controls";
const PhoneEditSchema = Yup.object().shape({
  TitleFa: Yup.string()
    .min(2, "Min2")
    .max(100, "Max100")
    .required("IsRequired"),
  TitleEn: Yup.string().min(2, "Min2").max(100, "Max100"),
});
export function PhoneEditForm({ phone, btnRef, savePhone }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={phone}
        validationSchema={PhoneEditSchema}
        onSubmit={(values) => {
          savePhone(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="TitleFa"
                    component={Input}
                    customFeedbackLabel=""
                    label="Title"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="TitleEn"
                    component={Input}
                    customFeedbackLabel=""
                    label="ENTitle"
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
