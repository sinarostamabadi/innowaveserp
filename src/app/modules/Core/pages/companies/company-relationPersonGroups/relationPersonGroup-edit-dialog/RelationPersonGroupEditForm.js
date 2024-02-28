import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Select, Input } from "../../../../../../../core/_partials/controls";
import { getAllPersonGroups } from "./../../../../../General/_redux/personGroups/personGroupsCrud";

export function RelationPersonGroupEditForm({
  saveRelationPersonGroup,
  relationPersonGroup,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();

  const [personGroups, setPersonGroups] = useState([]);
  useEffect(() => {
    if (personGroups.length == 0)
      getAllPersonGroups().then(({ data }) =>
        setPersonGroups((personGroups) => [
          { PersonGroupId: null, Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [personGroups.length]);

  // Validation schema
  const RelationPersonGroupEditSchema = Yup.object().shape({
    PersonGroupId: Yup.string().required(
      t("err.IsRequired", { 0: t("PersonGroup.Entity") })
    ),
  });

  return (
    <>
      <Formik
        key="CompanyRelationPersonGroup"
        enableReinitialize={true}
        initialValues={relationPersonGroup}
        validationSchema={RelationPersonGroupEditSchema}
        onSubmit={(values) => {
          console.log("Values > ", values);
          values["PersonGroup"] = {
            PersonGroupId: +values.PersonGroupId,
            Title: personGroups.find(
              (p) => p.PersonGroupId == values.PersonGroupId
            ).Title,
          };

          saveRelationPersonGroup(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Select
                      name="PersonGroupId"
                      label={t("PersonGroup.Entity")}
                    >
                      {personGroups.map((personGroup) => (
                        <option
                          key={personGroup.PersonGroupId}
                          value={personGroup.PersonGroupId}
                        >
                          {personGroup.Title}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                {t("Common.Cancel")}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                {t("Common.Save")}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
