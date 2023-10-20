import { useEffect, useState, useRef } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSubheader } from "src/core/layout";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { ServiceEditForm } from "./ServiceEditForm";
import * as actions from "../../../_redux/Services/ServicesActions";

export function ServiceEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const initModel = {
    ServiceId: undefined,
    Title: "",
    BodyBuildingEmployeeTypeId: null,
    UseIPAddress: "",
    Price: ""
  };

  const suhbeader = useSubheader();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { actionsLoading, serviceForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.services.actionsLoading,
      serviceForEdit: state.services.serviceForEdit,
      error: state.services.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchService(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " «" + t("BodyBuildingService.Entity") + "»";

    if (serviceForEdit && serviceForEdit.BodyBuildingServiceId == id) {
      _title = t("Common.Edit") + " «" + serviceForEdit.Title + "»";
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceForEdit, id]);

  const saveService = (values) => {
    if (!id) {
      dispatch(actions.createService(values, ()=> backToServicesList()));
    } else {
      dispatch(actions.updateService(id, values, ()=> backToServicesList()));
    }
  };

  const btnRef = useRef();
  const saveServiceClick = () => {
    if (btnRef && btnRef.current) 
      btnRef.current.click();
  };

  const backToServicesList = () => history.push(`/BodyBuilding/services`);

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      {!actionsLoading && error != null && (
        <>
          <ModalProgressBar variant="danger" />
          <Alerty
            variant="danger"
            title={t("err.Error")}
            description={error}
          ></Alerty>
        </>
      )}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToServicesList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i> {t("Common.Back")}
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i> {t("Common.Reset")}
          </button>
          {`  `}
          <button type="submit" className="btn btn-light ml-2">
            <i className="fa fa-print"></i> {t("Common.Print")}
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveServiceClick}
          >
            <i className="fa fa-save"></i> {t("Common.Save")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ServiceEditForm
          actionsLoading={actionsLoading}
          service={serviceForEdit || initModel}
          btnRef={btnRef}
          saveService={saveService}
        />
      </CardBody>
    </Card>
  );
}
