/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/errorHandlers/errorHandlersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { ErrorHandlerEditForm } from "./ErrorHandlerEditForm";
import { useSubheader } from "../../../../../../core/layout";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
const initErrorHandler = {
  ErrorHandlerId: undefined,
  TitleFa: "",
  TitleEn: "",
};
export function ErrorHandlerEdit({
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
  const { actionsLoading, errorHandlerForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.errorHandlers.actionsLoading,
      errorHandlerForEdit: state.errorHandlers.errorHandlerForEdit,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(actions.fetchErrorHandler(id));
  }, [id, dispatch]);
  useEffect(() => {
    let _title = id ? "" : "NewInfo";
    if (errorHandlerForEdit && id) {
      _title = `Edit Info '${errorHandlerForEdit.TitleFa}'`;
    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorHandlerForEdit, id]);
  const saveErrorHandler = (values) => {
    if (!id) {
      dispatch(actions.createErrorHandler(values)).then((arg) => {
        backToErrorHandlersList();
      });
    } else {
      dispatch(actions.updateErrorHandler(values)).then(() =>
        backToErrorHandlersList()
      );
    }
  };
  const btnRef = useRef();
  const saveErrorHandlerClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const backToErrorHandlersList = () => {
    history.push(`/Core/errorHandlers`);
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToErrorHandlersList}
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
            onClick={saveErrorHandlerClick}
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
            <ErrorHandlerEditForm
              actionsLoading={actionsLoading}
              errorHandler={errorHandlerForEdit || initErrorHandler}
              btnRef={btnRef}
              saveErrorHandler={saveErrorHandler}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
