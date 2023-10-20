import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/Packs/PacksActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { PackEditForm } from "./PackEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { CloneObject, getStorage } from "../../../../../../core/_helpers";
import { Tabs, Tab } from "react-bootstrap";
import { ServicesUIProvider } from "../Pack-services/ServicesUIContext";
import { Services } from "../Pack-services/Services";


export function PackEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const defaultRestaurant = !!getStorage("defaultRestaurant")
  ? JSON.parse(getStorage("defaultRestaurant"))
  : null;

  const initModel = {
		BodyBuildingPackId: undefined,
    Title: "",
    Description: "",
    BodyBuildingPackServices: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [packObj, setPackObj] = useState(copyModel);
  const [serviceObj, setServiceObj] = useState(
    copyModel.BodyBuildingPackServices
  );

  const { actionsLoading, packForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.packs.actionsLoading,
      packForEdit: state.packs.packForEdit,
      error: state.packs.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id) {
      dispatch(actions.fetchPack(id)).then((res) => {
        setEditMode(true);
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " «" + t("BodyBuildingPack.Entity") + "»";

    if (packForEdit && id) {
      _title = t("Common.Edit") + " «" + packForEdit.Title + "»";
      setPackObj(packForEdit);
      setServiceObj(packForEdit.BodyBuildingPackServices);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packForEdit, id]);

  const savePack = (values) => {
    if (!id) {
      dispatch(
        actions.createPack(values, () => {
          backToPacksList();
        })
      )
        .then((arg) => {
          backToPacksList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updatePack(id, values, () => {
          backToPacksList();
        })
      )
        .then(() => backToPacksList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef("1");
  const btnRefServices = useRef("2");

  const savePackClick = () => {
    if (!!btnRef && !!btnRef.current) {
      btnRef.current.Collect((datas) => {
        let serviceObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              serviceObj[prop] = obj;
            }
          }
        }

        serviceObj["BodyBuildingPackServices"] = [];

        btnRefServices.current.Collect((servicesData) => {
          serviceObj.BodyBuildingPackServices = servicesData;
        });

        setTimeout(() => {
          savePack(serviceObj);
        }, 200);
      });
    }
  };

  const backToPacksList = () => {
    history.push(`/BodyBuilding/Packs`);
  };

  return (
    <>
      {((!!id && editMode) || !!id == false) && (
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
                onClick={backToPacksList}
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
                onClick={savePackClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Tabs
              defaultActiveKey="pack"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="pack"
                title={t("Common.BasicInfo")}
                className="nav-item"
              >
                <PackEditForm
                  actionsLoading={actionsLoading}
                  pack={packObj}
                  ref={btnRef}
                />
              </Tab>
              <Tab
                eventKey="services"
                title={t("BodyBuildingPackService.Entity")}
                className="nav-item"
                >
                <ServicesUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  service={serviceObj}
                  ref={btnRefServices}
                  >
                  <Services />
                </ServicesUIProvider>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </>
  );
}
