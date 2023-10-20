/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeePromissoryNotes/employeePromissoryNotesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { EmployeePromissoryNoteEditForm } from "./EmployeePromissoryNoteEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function EmployeePromissoryNoteEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    EmployeePromissoryNoteId: undefined,
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
  const { actionsLoading, employeePromissoryNoteForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.employeePromissoryNotes.actionsLoading,
      employeePromissoryNoteForEdit: state.employeePromissoryNotes.employeePromissoryNoteForEdit,
      error: state.employeePromissoryNotes.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchEmployeePromissoryNote(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("EmployeePromissoryNote.Entity");

    if (employeePromissoryNoteForEdit && id) {
      _title = t("Common.Edit") + " " + employeePromissoryNoteForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeePromissoryNoteForEdit, id]);

  const saveEmployeePromissoryNote = (values) => {
    if (!id) {
      dispatch(actions.createEmployeePromissoryNote(values))
        .then((arg) => {
          backToEmployeePromissoryNotesList();
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updateEmployeePromissoryNote(id, values))
        .then(() => backToEmployeePromissoryNotesList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const saveEmployeePromissoryNoteClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToEmployeePromissoryNotesList = () => {
    history.push(`/employment/employeePromissoryNotes`);
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
            onClick={backToEmployeePromissoryNotesList}
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
            onClick={saveEmployeePromissoryNoteClick}
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
            <EmployeePromissoryNoteEditForm
              actionsLoading={actionsLoading}
              employeePromissoryNote={employeePromissoryNoteForEdit || initModel}
              btnRef={btnRef}
              saveEmployeePromissoryNote={saveEmployeePromissoryNote}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}