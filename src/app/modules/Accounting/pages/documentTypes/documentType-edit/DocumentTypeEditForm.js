import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, CheckboxField } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function DocumentTypeEditForm({ documentType, btnRef, saveDocumentType }) {
  const { t } = useTranslation();

  const DocumentTypeEditSchema = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("DocumentType.Title") }))
  });

  const [isEftetahie, setIsEftetahie] = useState(null);
  const [isEkhtetamie, setIsEkhtetamie] = useState(null);
  
  function clean(dirty) {
    return {
      DocumentTypeId: dirty.DocumentTypeId,
      Title: dirty.Title,
      IsEftetahie: dirty.IsEftetahie,
      IsEkhtetamie: dirty.IsEkhtetamie
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={documentType}
        validationSchema={DocumentTypeEditSchema}
        onSubmit={(values) => {
          saveDocumentType(clean(values));
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
                    label={t("DocumentType.Title")}
                  />
                  </div>
                <div className="col-md-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <CheckboxField
                          name="IsEftetahie"
                          customFeedbackLabel=""
                          onChange={(val) => setIsEftetahie(val)}
                          label={t("DocumentType.IsEftetahie")}
                        />
                    </div>
                    <div className="col-lg-6">
                      <CheckboxField
                        name="IsEkhtetamie"
                        customFeedbackLabel=""
                        onChange={(val) => setIsEkhtetamie(val)}
                        label={t("DocumentType.IsEkhtetamie")}
                      />
                    </div>
                  </div>
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