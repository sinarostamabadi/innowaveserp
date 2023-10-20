import React, {useState, useEffect} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  DatePickerField,
  Select,
  SuggestionField,
  CheckboxField,
  TimePickerField,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { getAllDocumentTypes } from "../../../_redux/documentTypes/documentTypesCrud";

export function DocumentEditForm({ document, btnRef, saveDocument }) {
  const { t } = useTranslation();
  const DocumentEditSchema = Yup.object().shape({});

  const [documentTypes, setDocumentTypes] = useState([]);
  useEffect(() => {
    getAllDocumentTypes().then(({ data }) => {
      setDocumentTypes((documentTypes) => [
        { DocumentTypeId: null, Title: t("Common.WithoutSelect") },
        ...data.Items,
      ]);
    });
  }, [documentTypes.length]);

  return (
    <>
      <Formik
        name="Master"
        enableReinitialize={true}
        initialValues={document}
        validationSchema={DocumentEditSchema}
        onSubmit={(values) => {
          saveDocument({...values, DocumentId: !!values.DocumentId? +values.DocumentId: null});
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="DocumentNo"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Document.DocumentNo")}
                    disabled={true}
                    readOnly={true}
                  />
                </div>
                <div className="col-lg-3">
                  <DatePickerField
                    name="DocumentDateObj"
                    customFeedbackLabel=""
                    label={t("Document.DocumentDate")}
                    />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="DocumentTypeId"
                    value={document?.DocumentType?.Title}
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Document.DocumentType")}
                    disabled={true}
                    readOnly={true}
                  />
                </div>
                <div className="col">
                  <CheckboxField
                    name="Archive"
                    customFeedbackLabel=""
                    label={t("Document.Archive")}
                  />
                </div>
                <div className="col">
                  <CheckboxField
                    name="IsDraft"
                    customFeedbackLabel=""
                    label={t("Document.IsDraft")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="CreatedBy"
                    value={document?.Creator?.UserName}
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Document.CreatedBy")}
                    disabled={true}
                    readOnly={true}
                  />
                </div>
                <div className="col">
                  <Field
                    name="DocumentDes"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Document.DocumentDes")}
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
