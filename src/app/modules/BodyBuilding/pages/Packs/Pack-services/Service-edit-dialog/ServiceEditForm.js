import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "src/core/_partials/controls";
import { suggestion } from "../../../../_redux/Services/ServicesCrud";
import { SuggestionField } from "src/core/_partials/controls";
import { CleanFormikObject, CleanFormikProperty } from "src/core/_helpers";

export function ServiceEditForm({
  saveService,
  service,
  actionsLoading,
  onHide,
}) {
  const { t } = useTranslation();
  const ServiceEditSchema = Yup.object().shape({
    BodyBuildingServiceId: Yup.number().required(
      t("err.IsRequired", {
        0: t("BodyBuildingPackService.BodyBuildingService"),
      })
    ),
    ServiceCount: Yup.number().required(
      t("err.IsRequired", { 0: t("BodyBuildingService.ServiceCount") })
    ),
  });

  const handleSuggestionBodyBuildingService = useCallback(
    (query, fnCallback) => {
      suggestion(query).then(({ data }) => {
        fnCallback(data.Items);
      });
    }
  );

  function cleanDetail(dirtyData) {
    return {
      BodyBuildingPackServiceId: dirtyData.BodyBuildingPackServiceId,
      BodyBuildingPackId: dirtyData.BodyBuildingPackId,
      BodyBuildingServiceId: dirtyData.BodyBuildingServiceId,
      BodyBuildingService: dirtyData.BodyBuildingService,
      ServiceCount: +dirtyData.ServiceCount,
      IsDeleted: false,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonService"
        enableReinitialize={true}
        initialValues={service}
        validationSchema={ServiceEditSchema}
        onSubmit={(values) => {
          saveService(cleanDetail(values));
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
                  <div className="col-lg-9">
                    <SuggestionField
                      name="BodyBuildingServiceId"
                      objectName="BodyBuildingService"
                      labelKey="Title"
                      version={2}
                      customFeedbackLabel=""
                      label={t("BodyBuildingPackService.BodyBuildingService")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionBodyBuildingService}
                      defaultValue={
                        service && !!service.BodyBuildingService
                          ? [service.BodyBuildingService]
                          : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Title}</h6>
                        </div>
                      )}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Field
                      name="ServiceCount"
                      component={Input}
                      isLtr
                      type="number"
                      label={t("BodyBuildingPackService.ServiceCount")}
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
