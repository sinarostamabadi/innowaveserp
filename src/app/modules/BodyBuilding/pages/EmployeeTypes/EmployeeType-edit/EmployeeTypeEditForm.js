import { useRef, forwardRef, useImperativeHandle } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Input } from "src/core/_partials/controls";

export const EmployeeTypeEditForm = forwardRef(({ employeeType }, ref) => {
  const { t } = useTranslation();
  const defaultInput = useRef(null);
  !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

  let callBack;
  const EmployeeTypeEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(
        t("err.IsRequired", { 0: t("BodyBuildingEmployeeType.Title") })
      ),
  });

  useImperativeHandle(ref, () => ({
    Collect(fn) {
      callBack = fn;

      const btnSend = document.getElementById("BtnEmployeeTypeSend");
      btnSend.click();
    },
  }));

  function cleanData(data) {
    return {
      BodyBuildingEmployeeTypeId: data.BodyBuildingEmployeeTypeId,
      Title: data.Title,
      Description: data.Description,
    };
  }

  return (
    <div className="pt-3">
      <Formik
        enableReinitialize={true}
        initialValues={employeeType}
        validationSchema={EmployeeTypeEditSchema}
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
                    label={t("BodyBuildingEmployeeType.Title")}
                  />
                </div>
              </div>
              <button
                id="BtnEmployeeTypeSend"
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
