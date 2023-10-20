/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/accountFloatingGroups/accountFloatingGroupsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { AccountFloatingGroupEditForm } from "./AccountFloatingGroupEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function AccountFloatingGroupEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    AccountFloatingGroupId: undefined,
    AccountFloatingGroupTypeId: "",
    Title: "",
    Code: ""
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, accountFloatingGroupForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.accountFloatingGroups.actionsLoading,
      accountFloatingGroupForEdit: state.accountFloatingGroups.accountFloatingGroupForEdit,
      error: state.accountFloatingGroups.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchAccountFloatingGroup(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("AccountFloatingGroup.Entity");

    if (accountFloatingGroupForEdit && id) {
      _title = t("Common.Edit") + " " + accountFloatingGroupForEdit.Title;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFloatingGroupForEdit, id]);

  const saveAccountFloatingGroup = (values) => {
    if (!id) {
      dispatch(actions.createAccountFloatingGroup(values))
        .then((arg) => {
          backToAccountFloatingGroupsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateAccountFloatingGroup(id, values))
        .then(() => backToAccountFloatingGroupsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveAccountFloatingGroupClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToAccountFloatingGroupsList = () => {
    history.push(`/accounting/accountFloatingGroups`);
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
            onClick={backToAccountFloatingGroupsList}
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
              onClick={saveAccountFloatingGroupClick}
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
            <AccountFloatingGroupEditForm
              actionsLoading={actionsLoading}
              accountFloatingGroup={accountFloatingGroupForEdit || initModel}
              btnRef={btnRef}
              saveAccountFloatingGroup={saveAccountFloatingGroup}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}