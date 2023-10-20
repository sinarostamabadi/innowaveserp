/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeWorkExperiences/employeeWorkExperiencesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { EmployeeWorkExperienceEditForm } from "./EmployeeWorkExperienceEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function EmployeeWorkExperienceEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    EmployeeWorkExperienceId: undefined,
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
  const { actionsLoading, employeeWorkExperienceForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.employeeWorkExperiences.actionsLoading,
      employeeWorkExperienceForEdit: state.employeeWorkExperiences.employeeWorkExperienceForEdit,
      error: state.employeeWorkExperiences.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchEmployeeWorkExperience(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("EmployeeWorkExperience.Entity");

    if (employeeWorkExperienceForEdit && id) {
      _title = t("Common.Edit") + " " + employeeWorkExperienceForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeWorkExperienceForEdit, id]);

  const saveEmployeeWorkExperience = (values) => {
    if (!id) {
      dispatch(actions.createEmployeeWorkExperience(values))
        .then((arg) => {
          backToEmployeeWorkExperiencesList();
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updateEmployeeWorkExperience(id, values))
        .then(() => backToEmployeeWorkExperiencesList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const saveEmployeeWorkExperienceClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToEmployeeWorkExperiencesList = () => {
    history.push(`/employment/employeeWorkExperiences`);
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
            onClick={backToEmployeeWorkExperiencesList}
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
            onClick={saveEmployeeWorkExperienceClick}
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
            <EmployeeWorkExperienceEditForm
              actionsLoading={actionsLoading}
              employeeWorkExperience={employeeWorkExperienceForEdit || initModel}
              btnRef={btnRef}
              saveEmployeeWorkExperience={saveEmployeeWorkExperience}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}