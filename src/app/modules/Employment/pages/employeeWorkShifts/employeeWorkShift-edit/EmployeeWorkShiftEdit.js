/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeWorkShifts/employeeWorkShiftsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { EmployeeWorkShiftEditForm } from "./EmployeeWorkShiftEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function EmployeeWorkShiftEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    EmployeeWorkShiftId: undefined,
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
  const { actionsLoading, employeeWorkShiftForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.employeeWorkShifts.actionsLoading,
      employeeWorkShiftForEdit:
        state.employeeWorkShifts.employeeWorkShiftForEdit,
      error: state.employeeWorkShifts.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchEmployeeWorkShift(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("EmployeeWorkShift.Entity");

    if (employeeWorkShiftForEdit && id) {
      _title = t("Common.Edit") + " " + employeeWorkShiftForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeWorkShiftForEdit, id]);

  const saveEmployeeWorkShift = (values) => {
    if (!id) {
      dispatch(actions.createEmployeeWorkShift(values))
        .then((arg) => {
          backToEmployeeWorkShiftsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateEmployeeWorkShift(id, values))
        .then(() => backToEmployeeWorkShiftsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveEmployeeWorkShiftClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToEmployeeWorkShiftsList = () => {
    history.push(`/employment/employeeWorkShifts`);
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
            onClick={backToEmployeeWorkShiftsList}
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
            onClick={saveEmployeeWorkShiftClick}
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
            <EmployeeWorkShiftEditForm
              actionsLoading={actionsLoading}
              employeeWorkShift={employeeWorkShiftForEdit || initModel}
              btnRef={btnRef}
              saveEmployeeWorkShift={saveEmployeeWorkShift}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
