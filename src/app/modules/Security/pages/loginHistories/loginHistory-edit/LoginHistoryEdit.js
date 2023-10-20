/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/loginHistories/loginHistoriesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { LoginHistoryEditForm } from "./LoginHistoryEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function LoginHistoryEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    LoginHistoryId: undefined,
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
  const { actionsLoading, loginHistoryForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.loginHistories.actionsLoading,
      loginHistoryForEdit: state.loginHistories.loginHistoryForEdit,
      error: state.loginHistories.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchLoginHistory(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("LoginHistory.Entity");

    if (loginHistoryForEdit && id) {
      _title = t("Common.Edit") + " " + loginHistoryForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginHistoryForEdit, id]);

  const saveLoginHistory = (values) => {
    if (!id) {
      dispatch(actions.createLoginHistory(values))
        .then((arg) => {
          backToLoginHistoriesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateLoginHistory(id, values))
        .then(() => backToLoginHistoriesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveLoginHistoryClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToLoginHistoriesList = () => {
    history.push(`/security/loginHistories`);
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
            onClick={backToLoginHistoriesList}
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
            onClick={saveLoginHistoryClick}
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
            <LoginHistoryEditForm
              actionsLoading={actionsLoading}
              loginHistory={loginHistoryForEdit || initModel}
              btnRef={btnRef}
              saveLoginHistory={saveLoginHistory}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}