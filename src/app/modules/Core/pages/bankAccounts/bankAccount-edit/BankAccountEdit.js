/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankAccounts/bankAccountsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { BankAccountEditForm } from "./BankAccountEditForm";
import { useSubheader } from "../../../../../../core/layout";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function BankAccountEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    BankAccountId: undefined,
    Title: "",
    BankId: "",
    AccountFloatingId: "",
  };

  const suhbeader = useSubheader();
  const [bankAccountObj, setBankAccountObj] = useState(initModel);
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { actionsLoading, bankAccountForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.bankAccounts.actionsLoading,
      bankAccountForEdit: state.bankAccounts.bankAccountForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchBankAccount(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("BankAccount.Entity");
    if (bankAccountForEdit && id) {
      _title = `${t("Common.Edit")} ${bankAccountForEdit.Title}`;
      setBankAccountObj(bankAccountForEdit);
    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankAccountForEdit, id]);

  const saveBankAccount = (values) => {
    if (!id)
      dispatch(actions.createBankAccount(values)).then((arg) =>
        backToBankAccountsList()
      );
    else
      dispatch(actions.updateBankAccount(id, values)).then(() =>
        backToBankAccountsList()
      );
  };

  const btnRef = useRef();
  const saveBankAccountClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToBankAccountsList = () => {
    history.push(`/Core/bankAccounts`);
  };

  return (
    <>
      <Card>
        {actionsLoading && <ModalProgressBar />}
        <CardHeader title={title}>
          <CardHeaderToolbar>
            <button
              type="button"
              onClick={backToBankAccountsList}
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
              onClick={saveBankAccountClick}
            >
              <i className="fa fa-save"></i> {t("Common.Save")}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          {(!!id && !!bankAccountObj && bankAccountObj.BankAccountId == id) ||
          !!id == false ? (
            <BankAccountEditForm
              actionsLoading={actionsLoading}
              bankAccount={bankAccountObj}
              btnRef={btnRef}
              saveBankAccount={saveBankAccount}
            />
          ) : (
            <p>در حال بارگذاری...</p>
          )}
        </CardBody>
      </Card>
    </>
  );
}
