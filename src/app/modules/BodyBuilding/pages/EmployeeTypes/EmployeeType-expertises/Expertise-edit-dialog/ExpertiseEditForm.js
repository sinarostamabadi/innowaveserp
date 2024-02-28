import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "src/core/_partials/controls";

export function ExpertiseEditForm({
  saveExpertise,
  expertise,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();
  const ExpertiseEditSchema = Yup.object().shape({
    Title: Yup.string().required(
      t("err.IsRequired", { 0: t("BodyBuildingEmployeeTypeExpertise.Title") })
    ),
  });

  function cleanDetail(dirtyData) {
    return {
      BodyBuildingEmployeeTypeExpertiseId:
        dirtyData.BodyBuildingEmployeeTypeExpertiseId,
      BodyBuildingEmployeeTypeId: dirtyData.BodyBuildingEmployeeTypeId,
      Title: dirtyData.Title,
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonExpertise"
        enableReinitialize={true}
        initialValues={expertise}
        validationSchema={ExpertiseEditSchema}
        onSubmit={(values) => {
          saveExpertise(cleanDetail(values));
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
                    <Field
                      name="Title"
                      component={Input}
                      label={t("BodyBuildingEmployeeTypeExpertise.Title")}
                    />
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
