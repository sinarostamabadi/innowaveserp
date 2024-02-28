/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/coreTransactionses/coreTransactionsesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { CoreTransactionsEditForm } from "./CoreTransactionsEditForm";
import { useSubheader } from "../../../../../../core/layout";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
const initCoreTransactions = {
  CoreTransactionsId: undefined,
  TitleFa: "",
  TitleEn: "",
};
export function CoreTransactionsEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();
  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, coreTransactionsForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.coreTransactionses.actionsLoading,
      coreTransactionsForEdit: state.coreTransactionses.coreTransactionsForEdit,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(actions.fetchCoreTransactions(id));
  }, [id, dispatch]);
  useEffect(() => {
    let _title = id ? "" : "NewInfo";
    if (coreTransactionsForEdit && id) {
      _title = `Edit Info '${coreTransactionsForEdit.TitleFa}'`;
    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreTransactionsForEdit, id]);
  const saveCoreTransactions = (values) => {
    if (!id) {
      dispatch(actions.createCoreTransactions(values)).then((arg) => {
        backToCoreTransactionsesList();
      });
    } else {
      dispatch(actions.updateCoreTransactions(values)).then(() =>
        backToCoreTransactionsesList()
      );
    }
  };
  const btnRef = useRef();
  const saveCoreTransactionsClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const backToCoreTransactionsesList = () => {
    history.push(`/Core/coreTransactionses`);
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToCoreTransactionsesList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i> Exit
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i> ReValue
          </button>
          {`  `}
          <button type="submit" className="btn btn-light ml-2">
            <i className="fa fa-print"></i> PrintInfo
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveCoreTransactionsClick}
          >
            <i className="fa fa-save"></i> SaveInfo
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
              MenuName
            </a>
          </li>
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <CoreTransactionsEditForm
              actionsLoading={actionsLoading}
              coreTransactions={coreTransactionsForEdit || initCoreTransactions}
              btnRef={btnRef}
              saveCoreTransactions={saveCoreTransactions}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
