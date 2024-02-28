/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/employmentStatuses/employmentStatusesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { EmploymentStatusEditForm } from "./EmploymentStatusEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function EmploymentStatusEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    EmploymentStatusId: undefined,
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
  const { actionsLoading, employmentStatusForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.employmentStatuses.actionsLoading,
      employmentStatusForEdit: state.employmentStatuses.employmentStatusForEdit,
      error: state.employmentStatuses.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchEmploymentStatus(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("EmploymentStatus.Entity");

    if (employmentStatusForEdit && id) {
      _title = t("Common.Edit") + " " + employmentStatusForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employmentStatusForEdit, id]);

  const saveEmploymentStatus = (values) => {
    if (!id) {
      dispatch(actions.createEmploymentStatus(values))
        .then((arg) => {
          backToEmploymentStatusesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateEmploymentStatus(id, values))
        .then(() => backToEmploymentStatusesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveEmploymentStatusClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToEmploymentStatusesList = () => {
    history.push(`/employment/employmentStatuses`);
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
            onClick={backToEmploymentStatusesList}
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
            onClick={saveEmploymentStatusClick}
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
            <EmploymentStatusEditForm
              actionsLoading={actionsLoading}
              employmentStatus={employmentStatusForEdit || initModel}
              btnRef={btnRef}
              saveEmploymentStatus={saveEmploymentStatus}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
