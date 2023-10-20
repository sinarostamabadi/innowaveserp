/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/costCenters/costCentersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { CostCenterEditForm } from "./CostCenterEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function CostCenterEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    CostCenterId: undefined,
    Title: "",
    Level: null,
    ParentId: null,
    Code: null
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  let copyModel = {...initModel};
  const [costCenterObj, setCostCenterObj] = useState(copyModel);
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, costCenterForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.costCenters.actionsLoading,
      costCenterForEdit: state.costCenters.costCenterForEdit,
      error: state.costCenters.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchCostCenter(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("CostCenter.Entity");

    if (costCenterForEdit && id) {
      _title = t("Common.Edit") + " " + costCenterForEdit.Title;
      setCostCenterObj(costCenterForEdit);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costCenterForEdit, id]);

  const saveCostCenter = (values) => {
    if (!id) {
      dispatch(actions.createCostCenter(values))
        .then((arg) => {
          backToCostCentersList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateCostCenter(id, values))
        .then(() => backToCostCentersList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveCostCenterClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToCostCentersList = () => {
    history.push(`/accounting/costCenters`);
  };

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
            onClick={backToCostCentersList}
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
            onClick={saveCostCenterClick}
          >
            <i className="fa fa-save"></i> {t("Common.Save")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("basic")}>
            <a
              className={`nav-link ${tab === "basic" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "basic").toString()}
            >
              {t("Common.BasicInfo")}
            </a>
          </li>
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <CostCenterEditForm
              actionsLoading={actionsLoading}
              costCenter={costCenterObj}
              btnRef={btnRef}
              saveCostCenter={saveCostCenter}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}