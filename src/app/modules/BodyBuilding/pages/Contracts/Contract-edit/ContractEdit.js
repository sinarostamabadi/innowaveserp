import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/Contracts/ContractsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { ContractEditForm } from "./ContractEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { CloneObject, getStorage } from "../../../../../../core/_helpers";
import { Tabs, Tab } from "react-bootstrap";
import { DetailsUIProvider } from "../Contract-details/DetailsUIContext";
import { Details } from "../Contract-details/Details";

export function ContractEdit({
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
    BodyBuildingContractId: undefined,
    PersonId: undefined,
    Weight: undefined,
    Height: undefined,
    BloodGroup: undefined,
    SensorInfo: undefined,
    FromDate: undefined,
    ToDate: undefined,
    BodyBuildingContractDetails: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [contractObj, setContractObj] = useState(copyModel);
  const [detailObj, setDetailObj] = useState(
    copyModel.BodyBuildingContractDetails
  );

  const { actionsLoading, contractForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.contracts.actionsLoading,
      contractForEdit: state.contracts.contractForEdit,
      error: state.contracts.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id) {
      dispatch(actions.fetchContract(id)).then((res) => {
        setEditMode(true);
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " «" + t("BodyBuildingContract.Entity") + "»";

    if (contractForEdit && id) {
      _title =
        t("Common.Edit") +
        " " +
        t("BodyBuildingContract.Entity") +
        " «" +
        contractForEdit.Person.FullNameFa +
        "»";
      setContractObj(contractForEdit);
      setDetailObj(contractForEdit.BodyBuildingContractDetails);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractForEdit, id]);

  const saveContract = (values) => {
    if (!id) {
      dispatch(
        actions.createContract(values, () => {
          backToContractsList();
        })
      )
        .then((arg) => {
          backToContractsList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateContract(id, values, () => {
          backToContractsList();
        })
      )
        .then(() => backToContractsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef("1");
  const btnRefDetails = useRef("2");

  const saveContractClick = () => {
    if (!!btnRef && !!btnRef.current) {
      btnRef.current.Collect((datas) => {
        let detailObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              detailObj[prop] = obj;
            }
          }
        }

        detailObj["BodyBuildingContractDetails"] = [];

        btnRefDetails.current.Collect((detailsData) => {
          detailObj.BodyBuildingContractDetails = detailsData;
        });

        setTimeout(() => {
          saveContract(detailObj);
        }, 200);
      });
    }
  };

  const backToContractsList = () => {
    history.push(`/BodyBuilding/Contracts`);
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
                onClick={backToContractsList}
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
                onClick={saveContractClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Tabs
              defaultActiveKey="contract"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="contract"
                title={t("Common.BasicInfo")}
                className="nav-item"
              >
                <ContractEditForm
                  actionsLoading={actionsLoading}
                  contract={contractObj}
                  ref={btnRef}
                />
              </Tab>
              <Tab
                eventKey="details"
                title={t("BodyBuildingContractDetail.Entity")}
                className="nav-item"
              >
                <DetailsUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  detail={detailObj}
                  ref={btnRefDetails}
                >
                  <Details />
                </DetailsUIProvider>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </>
  );
}
