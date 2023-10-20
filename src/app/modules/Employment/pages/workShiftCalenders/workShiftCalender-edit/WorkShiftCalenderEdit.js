/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/workShiftCalenders/workShiftCalendersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { WorkShiftCalenderEditForm } from "./WorkShiftCalenderEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function WorkShiftCalenderEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    WorkShiftCalenderId: undefined,
    TitleFa: "",
    TitleEn: "",
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, workShiftCalenderForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.workShiftCalenders.actionsLoading,
      workShiftCalenderForEdit: state.workShiftCalenders.workShiftCalenderForEdit,
      error: state.workShiftCalenders.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchWorkShiftCalender(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("WorkShiftCalender.Entity");

    if (workShiftCalenderForEdit && id) {
      _title = t("Common.Edit") + " " + workShiftCalenderForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workShiftCalenderForEdit, id]);

  const saveWorkShiftCalender = (values) => {
    if (!id) {
      dispatch(actions.createWorkShiftCalender(values))
        .then((arg) => {
          backToWorkShiftCalendersList();
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updateWorkShiftCalender(id, values))
        .then(() => backToWorkShiftCalendersList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const saveWorkShiftCalenderClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToWorkShiftCalendersList = () => {
    history.push(`/employment/workShiftCalenders`);
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
            onClick={backToWorkShiftCalendersList}
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
            onClick={saveWorkShiftCalenderClick}
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
            <WorkShiftCalenderEditForm
              actionsLoading={actionsLoading}
              workShiftCalender={workShiftCalenderForEdit || initModel}
              btnRef={btnRef}
              saveWorkShiftCalender={saveWorkShiftCalender}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}