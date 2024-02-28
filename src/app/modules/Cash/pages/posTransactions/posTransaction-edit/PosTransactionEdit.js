/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/posTransactions/posTransactionsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { PosTransactionEditForm } from "./PosTransactionEditForm";
import { useSubheader } from "src/core/layout";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function PosTransactionEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    PosTransactionId: undefined,
    PosTransactionGuid: "",
    TransactionTypeId: "",
    DocumentId: "",
    RequestDtlId: "",
    PosId: "",
    TransactionNo: "",
    TransactionDate: "",
    BankAccountId: "",
    Price: "",
    CurrencyTypeId: "",
    CurrencyRate: "",
    CurrencyPrice: "",
    EquivalentCurrencyTypeId: "",
    EquivalentCurrencyPrice: "",
    Description: "",
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, posTransactionForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.posTransactions.actionsLoading,
      posTransactionForEdit: state.posTransactions.posTransactionForEdit,
      error: state.posTransactions.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchPosTransaction(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("PosTransaction.Entity");

    if (posTransactionForEdit && id) {
      _title = t("Common.Edit") + " " + posTransactionForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posTransactionForEdit, id]);

  const savePosTransaction = (values) => {
    if (!id) {
      dispatch(actions.createPosTransaction(values))
        .then((arg) => {
          backToPosTransactionsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updatePosTransaction(id, values))
        .then(() => backToPosTransactionsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const savePosTransactionClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToPosTransactionsList = () => {
    history.push(`/cash/posTransactions`);
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
            onClick={backToPosTransactionsList}
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
            onClick={savePosTransactionClick}
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
            <PosTransactionEditForm
              actionsLoading={actionsLoading}
              posTransaction={posTransactionForEdit || initModel}
              btnRef={btnRef}
              savePosTransaction={savePosTransaction}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
