/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/accountTypes/accountTypesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { AccountTypeEditForm } from "./AccountTypeEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function AccountTypeEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    AccountTypeId: undefined,
    Title: "",
    ParentId: "",
    Parent: ""
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, accountTypeForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.accountTypes.actionsLoading,
      accountTypeForEdit: state.accountTypes.accountTypeForEdit,
      error: state.accountTypes.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchAccountType(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("AccountType.Entity");

    if (accountTypeForEdit && id) {
      _title = t("Common.Edit") + " " + accountTypeForEdit.Title;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountTypeForEdit, id]);

  const saveAccountType = (values) => {
    if (!id) {
      dispatch(actions.createAccountType(values))
        .then((arg) => {
          backToAccountTypesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateAccountType(id, values))
        .then(() => backToAccountTypesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveAccountTypeClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToAccountTypesList = () => {
    history.push(`/accounting/accountTypes`);
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
            onClick={backToAccountTypesList}
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
            onClick={saveAccountTypeClick}
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
            <AccountTypeEditForm
              actionsLoading={actionsLoading}
              accountType={accountTypeForEdit || initModel}
              btnRef={btnRef}
              saveAccountType={saveAccountType}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}