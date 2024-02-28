/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/importAccountFloatingTemps/importAccountFloatingTempsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { ImportAccountFloatingTempEditForm } from "./ImportAccountFloatingTempEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function ImportAccountFloatingTempEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    ImportAccountFloatingTempId: undefined,
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
  const { actionsLoading, importAccountFloatingTempForEdit, error } =
    useSelector(
      (state) => ({
        actionsLoading: state.importAccountFloatingTemps.actionsLoading,
        importAccountFloatingTempForEdit:
          state.importAccountFloatingTemps.importAccountFloatingTempForEdit,
        error: state.importAccountFloatingTemps.error,
      }),
      shallowEqual
    );

  useEffect(() => {
    dispatch(actions.fetchImportAccountFloatingTemp(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("ImportAccountFloatingTemp.Entity");

    if (importAccountFloatingTempForEdit && id) {
      _title =
        t("Common.Edit") + " " + importAccountFloatingTempForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importAccountFloatingTempForEdit, id]);

  const saveImportAccountFloatingTemp = (values) => {
    if (!id) {
      dispatch(actions.createImportAccountFloatingTemp(values))
        .then((arg) => {
          backToImportAccountFloatingTempsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateImportAccountFloatingTemp(id, values))
        .then(() => backToImportAccountFloatingTempsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveImportAccountFloatingTempClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToImportAccountFloatingTempsList = () => {
    history.push(`/accounting/importAccountFloatingTemps`);
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
            onClick={backToImportAccountFloatingTempsList}
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
            onClick={saveImportAccountFloatingTempClick}
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
            <ImportAccountFloatingTempEditForm
              actionsLoading={actionsLoading}
              importAccountFloatingTemp={
                importAccountFloatingTempForEdit || initModel
              }
              btnRef={btnRef}
              saveImportAccountFloatingTemp={saveImportAccountFloatingTemp}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
