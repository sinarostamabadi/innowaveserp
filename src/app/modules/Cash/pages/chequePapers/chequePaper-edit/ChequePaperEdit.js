/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/chequePapers/chequePapersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { ChequePaperEditForm } from "./ChequePaperEditForm";
import { useSubheader } from "src/core/layout";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function ChequePaperEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    ChequePaperId: undefined,
    BankAccountId: "",
    ChequeBookId: "",
    SerialNo: "",
    ChequePaperStatus: "",
    Description: "",
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, chequePaperForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.chequePapers.actionsLoading,
      chequePaperForEdit: state.chequePapers.chequePaperForEdit,
      error: state.chequePapers.error,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchChequePaper(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("ChequePaper.Entity");
    setEditMode(true);
    if (chequePaperForEdit && id) {
      _title = t("Common.Edit") + " " + chequePaperForEdit.ChequeBook.Title;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chequePaperForEdit, id]);

  const saveChequePaper = (values) => {
    if (!id) {
      dispatch(actions.createChequePaper(values))
        .then((arg) => {
          backToChequePapersList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateChequePaper(id, values))
        .then(() => backToChequePapersList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveChequePaperClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToChequePapersList = () => {
    history.push(`/cash/chequePapers`);
  };

  return (
    <>
      {((!!id && editMode) || !!id == false) && (
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
                onClick={backToChequePapersList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>

              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>

              <button type="submit" className="btn btn-light ml-2">
                <i className="fa fa-print"></i> {t("Common.Print")}
              </button>

              <button
                type="submit"
                className="btn btn-primary ml-2"
                onClick={saveChequePaperClick}
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
                <ChequePaperEditForm
                  actionsLoading={actionsLoading}
                  chequePaper={chequePaperForEdit || initModel}
                  btnRef={btnRef}
                  saveChequePaper={saveChequePaper}
                />
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}
