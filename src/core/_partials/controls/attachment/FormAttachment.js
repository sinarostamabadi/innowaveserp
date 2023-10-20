import React from "react";
import { Row, Col } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import { Input, FileInput } from "../";

export function FormAttachment({addFile}) {
  const { t } = useTranslation();

  let obj = {
        EntityAttachmentId: "",
        EntityId: "",
        EntityPKId: "",
        AttachmentId: "",
        AttachmentFile: "",
        Attachment: "",
        Title: "",
        Description: "",
        Reference1: "",
        Reference2: "",
        Reference3: "",
        Reference4: "",
        IsDeleted: false,
      };

      function clean(dirty) {
        return {
          EntityAttachmentId: !!dirty.EntityAttachmentId? dirty.EntityAttachmentId: "temp_" + Math.floor(Math.random() * 100),
          // EntityId: null,
          // EntityPKId: null,
          AttachmentId: !!dirty.AttachmentId? dirty.AttachmentId: null,
          Title: dirty.Title,
          Description: dirty.Description,
          Reference1: dirty.Reference1,
          Reference2: dirty.Reference2,
          Reference3: dirty.Reference3,
          Reference4: dirty.Reference4,
          IsDeleted: dirty.IsDeleted,
          Attachment: {
            FormFile: dirty.AttachmentFile
          }
        };
      }

    return(
        <Formik
        enableReinitialize={true}
        initialValues={obj}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          addFile(clean(values));

          setTimeout(() => {
            resetForm(obj);
          }, 200);

          setSubmitting(false);
        }}
        // {(values) => {
        //   addFile(clean(values));
        // }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <Row className="form-group mb-0">
                <Col lg={12} className="mb-3">
                  <FileInput name="Attachment" label={t("Attachment.File")} />
                </Col>
                <Col lg={12} className="mb-3">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Attachment.Title")}
                  />
                </Col>
                <Col lg={12} className="mb-3">
                  <Field
                    name="Description"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Attachment.Description")}
                  />
                </Col>
                <Col lg={12} className="mb-3">
                  <Field
                    name="Reference1"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Attachment.Reference1")}
                  />
                </Col>
                <Col lg={12} className="mb-3">
                  <Field
                    name="Reference2"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Attachment.Reference2")}
                  />
                </Col>
                <Col lg={12} className="mb-3">
                  <Field
                    name="Reference3"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Attachment.Reference3")}
                  />
                </Col>
                <Col lg={12} className="mb-0">
                  <Field
                    name="Reference4"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("Attachment.Reference4")}
                  />
                </Col>
              </Row>
              <Row>
                  <Col lg={12}>
                      <button type="button" className="btn btn-success mt-5" onClick={()=> handleSubmit()}><i className="far fa-plus"></i> {t("Common.Add")}</button>
                  </Col>
              </Row>
            </Form>
          </>
        )}
      </Formik>
    );
}