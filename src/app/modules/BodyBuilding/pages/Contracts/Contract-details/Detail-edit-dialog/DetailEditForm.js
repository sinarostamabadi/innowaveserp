import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "src/core/_partials/controls";
import { suggestion } from "../../../../_redux/Services/ServicesCrud";
import { suggestion as PackSuggestion } from "../../../../_redux/Packs/PacksCrud";
import { SuggestionField } from "src/core/_partials/controls";

export function DetailEditForm({ saveDetail, detail, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const DetailEditSchema = Yup.object().shape({
    // BodyBuildingServiceId: Yup.number().required(
    //   t("err.IsRequired", {
    //     0: t("BodyBuildingContractDetail.BodyBuildingService"),
    //   })
    // ),
    ServiceCount: Yup.number().required(
      t("err.IsRequired", { 0: t("BodyBuildingContractDetail.ServiceCount") })
    ),
  });

  const handleSuggestionBodyBuildingService = useCallback(
    (query, fnCallback) => {
      suggestion(query).then(({ data }) => {
        fnCallback(data.Items);
      });
    }
  );

  const handleSuggestionBodyBuildingPack = useCallback((query, fnCallback) => {
    PackSuggestion(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  function cleanDetail(dirtyData) {
    return {
      BodyBuildingContractDetailId: dirtyData.BodyBuildingContractDetailId,
      BodyBuildingContractId: dirtyData.BodyBuildingContractId,
      BodyBuildingServiceId: dirtyData.BodyBuildingServiceId,
      BodyBuildingService: dirtyData.BodyBuildingService,
      BodyBuildingPackId: dirtyData.BodyBuildingPackId,
      BodyBuildingPack: dirtyData.BodyBuildingPack,
      ServiceCount: +dirtyData.ServiceCount || 0,
      RemaineCount:
        (typeof detail.BodyBuildingContractDetailId === "number"
          ? +dirtyData.RemaineCount
          : +dirtyData.ServiceCount) || 0,
      Price:
        (typeof detail.BodyBuildingContractDetailId === "number"
          ? +dirtyData.Price
          : +(
              (!!dirtyData.BodyBuildingService &&
                dirtyData.BodyBuildingService.Price) ||
              0
            )) || 0,
      DiscountPrice:
        (typeof detail.BodyBuildingContractDetailId === "number"
          ? +dirtyData.DiscountPrice
          : +dirtyData.DiscountPrice) || 0,
      PayablePrice:
        (typeof detail.BodyBuildingContractDetailId === "number"
          ? +dirtyData.PayablePrice
          : +dirtyData.PayablePrice) || 0,
      IsDeleted: dirtyData.IsDeleted,
    };
  }

  return (
    <>
      <Formik
        key="RealPersonDetail"
        enableReinitialize={true}
        initialValues={detail}
        validationSchema={DetailEditSchema}
        onSubmit={(values) => {
          // if(!!values.BodyBuildingPackId)
          //   for (let index = 0; index < values.BodyBuildingPack.BodyBuildingPackServices.length; index++) {
          //     const s = values.BodyBuildingPack.BodyBuildingPackServices[index];
          //     saveDetail(cleanDetail({...values, BodyBuildingServiceId: s.BodyBuildingServiceId, BodyBuildingService: s}));
          //   }
          // else
          saveDetail(cleanDetail(values));
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
                    <SuggestionField
                      name="BodyBuildingServiceId"
                      objectName="BodyBuildingService"
                      labelKey="Title"
                      version={2}
                      customFeedbackLabel=""
                      label={t(
                        "BodyBuildingContractDetail.BodyBuildingService"
                      )}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionBodyBuildingService}
                      defaultValue={
                        detail && !!detail.BodyBuildingService
                          ? [detail.BodyBuildingService]
                          : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Title}</h6>
                        </div>
                      )}
                    />
                  </div>
                  <div className="col-lg-6">
                    <SuggestionField
                      name="BodyBuildingPackId"
                      objectName="BodyBuildingPack"
                      labelKey="Title"
                      version={2}
                      customFeedbackLabel=""
                      label={t("BodyBuildingContractDetail.BodyBuildingPack")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionBodyBuildingPack}
                      defaultValue={
                        detail && !!detail.BodyBuildingPack
                          ? [detail.BodyBuildingPack]
                          : []
                      }
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Title}</h6>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-3">
                    <Field
                      name="ServiceCount"
                      component={Input}
                      isLtr
                      type="number"
                      label={t("BodyBuildingContractDetail.ServiceCount")}
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
