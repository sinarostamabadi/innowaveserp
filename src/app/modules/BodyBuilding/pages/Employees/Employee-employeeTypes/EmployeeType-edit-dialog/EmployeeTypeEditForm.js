import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "src/core/_partials/controls";
import { getAllExpertises } from "../../../../_redux/EmployeeTypes/EmployeeTypesCrud";

export function EmployeeTypeEditForm({
  saveEmployeeType,
  employeeType,
  selectedEmployeeType,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();
  const EmployeeTypeEditSchema = Yup.object().shape({
    BodyBuildingEmployeeTypeExpertiseId: Yup.number().required(
      t("err.IsRequired", { 0: t("BodyBuildingEmployeeExpertise.BodyBuildingEmployeeTypeExpertise") })
    ),
  });

  const [employeeTypes, setEmployeeTypes] = useState([]);
  useEffect(() => {
    if (employeeTypes.length == 0)
    getAllExpertises(selectedEmployeeType).then(({ data }) =>
        setEmployeeTypes((expertises) => [
          { BodyBuildingEmployeeTypeExpertiseId: "", Title: t("Common.WithoutSelect") },
          ...data.Items,
        ])
      );
  }, [employeeTypes.length, t]);

  function cleanDetail(dirtyData) {
    return {
      BodyBuildingEmployeeExpertiseId: dirtyData.BodyBuildingEmployeeExpertiseId,
      BodyBuildingEmployeeTypeExpertiseId: !!dirtyData.BodyBuildingEmployeeTypeExpertiseId? +dirtyData.BodyBuildingEmployeeTypeExpertiseId: null,
      BodyBuildingEmployeeTypeExpertise: !!dirtyData.BodyBuildingEmployeeTypeExpertiseId? employeeTypes.find(x=> x.BodyBuildingEmployeeTypeExpertiseId == dirtyData.BodyBuildingEmployeeTypeExpertiseId): null,
      Grade: dirtyData.Grade,
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonEmployeeType"
        enableReinitialize={true}
        initialValues={employeeType}
        validationSchema={EmployeeTypeEditSchema}
        onSubmit={(values) => {
          saveEmployeeType(cleanDetail(values));
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
              <div className="col-lg-6">
                    <Select
                      name="BodyBuildingEmployeeTypeExpertiseId"
                      label={t("BodyBuildingEmployeeExpertise.BodyBuildingEmployeeTypeExpertise")}
                      customFeedbackLabel=""
                    >
                      {employeeTypes.map((employeeType) => (
                        <option key={employeeType.BodyBuildingEmployeeTypeExpertiseId} value={employeeType.BodyBuildingEmployeeTypeExpertiseId}>
                          {employeeType.Title}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="Grade"
                      component={Input}
                      label={t("BodyBuildingEmployeeExpertise.Grade")}
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
