import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { CheckboxField, Input } from "src/core/_partials/controls";

export function ClosetEditForm({ closet, btnRef, saveCloset }) {
  const { t } = useTranslation();
  const schemaValidation = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("BodyBuildingCloset.Title") })),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={closet}
        validationSchema={schemaValidation}
        onSubmit={(values) => saveCloset(values)}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BodyBuildingCloset.Title")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="ConnectionInfo"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BodyBuildingCloset.ConnectionInfo")}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="PortInfo"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BodyBuildingCloset.PortInfo")}
                  />
                </div>
                <div className="col-lg-3">
                  <CheckboxField
                    name="InUse"
                    version={2}
                    customFeedbackLabel=""
                    label={t("BodyBuildingCloset.InUse")}
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
