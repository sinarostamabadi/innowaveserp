/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/coreTransactionTypes/coreTransactionTypesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { CoreTransactionTypeEditForm } from "./CoreTransactionTypeEditForm";
import { useSubheader } from "../../../../../../core/layout";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
const initCoreTransactionType = {
  CoreTransactionTypeId: undefined,
  TitleFa: "",
  TitleEn: "",
};
export function CoreTransactionTypeEdit({
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
  const { actionsLoading, coreTransactionTypeForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.coreTransactionTypes.actionsLoading,
      coreTransactionTypeForEdit:
        state.coreTransactionTypes.coreTransactionTypeForEdit,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(actions.fetchCoreTransactionType(id));
  }, [id, dispatch]);
  useEffect(() => {
    let _title = id ? "" : "NewInfo";
    if (coreTransactionTypeForEdit && id) {
      _title = `Edit Info '${coreTransactionTypeForEdit.TitleFa}'`;
    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreTransactionTypeForEdit, id]);
  const saveCoreTransactionType = (values) => {
    if (!id) {
      dispatch(actions.createCoreTransactionType(values)).then((arg) => {
        backToCoreTransactionTypesList();
      });
    } else {
      dispatch(actions.updateCoreTransactionType(values)).then(() =>
        backToCoreTransactionTypesList()
      );
    }
  };
  const btnRef = useRef();
  const saveCoreTransactionTypeClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const backToCoreTransactionTypesList = () => {
    history.push(`/Core/coreTransactionTypes`);
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToCoreTransactionTypesList}
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
            onClick={saveCoreTransactionTypeClick}
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
            <CoreTransactionTypeEditForm
              actionsLoading={actionsLoading}
              coreTransactionType={
                coreTransactionTypeForEdit || initCoreTransactionType
              }
              btnRef={btnRef}
              saveCoreTransactionType={saveCoreTransactionType}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
