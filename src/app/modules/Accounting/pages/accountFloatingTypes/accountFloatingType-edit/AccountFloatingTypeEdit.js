/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/accountFloatingTypes/accountFloatingTypesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { AccountFloatingTypeEditForm } from "./AccountFloatingTypeEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function AccountFloatingTypeEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    AccountFloatingTypeId: undefined,
    Title: "",
    ParentId: ""
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, accountFloatingTypeForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.accountFloatingTypes.actionsLoading,
      accountFloatingTypeForEdit: state.accountFloatingTypes.accountFloatingTypeForEdit,
      error: state.accountFloatingTypes.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchAccountFloatingType(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("AccountFloatingType.Entity");

    if (accountFloatingTypeForEdit && id) {
      _title = t("Common.Edit") + " " + accountFloatingTypeForEdit.Title;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFloatingTypeForEdit, id]);

  const saveAccountFloatingType = (values) => {
    if (!id) {
      dispatch(actions.createAccountFloatingType(values))
        .then((arg) => {
          backToAccountFloatingTypesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateAccountFloatingType(id, values))
        .then(() => backToAccountFloatingTypesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveAccountFloatingTypeClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToAccountFloatingTypesList = () => {
    history.push(`/accounting/accountFloatingTypes`);
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
            onClick={backToAccountFloatingTypesList}
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
              onClick={saveAccountFloatingTypeClick}
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
            <AccountFloatingTypeEditForm
              actionsLoading={actionsLoading}
              accountFloatingType={accountFloatingTypeForEdit || initModel}
              btnRef={btnRef}
              saveAccountFloatingType={saveAccountFloatingType}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}