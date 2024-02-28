/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/chequeBooks/chequeBooksActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { ChequeBookEditForm } from "./ChequeBookEditForm";
import { useSubheader } from "src/core/layout";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import { Tabs, Tab } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";
import { ChequePapersUIProvider } from "../chequeBooks-chequePaper/ChequePapersUIContext";
import { ChequePapers } from "../chequeBooks-chequePaper/ChequePapers";

export function ChequeBookEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    ChequeBookId: undefined,
    BankAccountId: "",
    Serial: "",
    Count: "",
    Description: "",
    ChequeBookStatus: "",
    ChequePapers: [],
  };

  // Subheader
  const subheader = useSubheader();

  // Tabs
  // const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, chequeBookForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.chequeBooks.actionsLoading,
      chequeBookForEdit: state.chequeBooks.chequeBookForEdit,
      error: state.chequeBooks.error,
    }),
    shallowEqual
  );

  const [chequeBookObj, setChequeBookObj] = useState(initModel);
  const [chequePapersObj, setChequePapersObj] = useState(
    initModel.ChequePapers
  );
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    !!id &&
      dispatch(actions.fetchChequeBook(id)).then((res) => setEditMode(true));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("ChequeBook.Entity");

    if (chequeBookForEdit && id && chequeBookForEdit.ChequeBookId == id) {
      _title = t("Common.Edit") + " " + chequeBookForEdit.BankAccount.Title;

      setChequeBookObj(chequeBookForEdit);
      setChequePapersObj(chequeBookForEdit.ChequePapers);
    }
    setTitle(_title);
    subheader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chequeBookForEdit, id]);

  const SaveChequeBook = (data) => {
    if (!id) {
      dispatch(
        actions.create(data, () => {
          backToChequeBooksList();
        })
      )
        .then(() => {
          backToChequeBooksList();
        })
        .catch(() => {
          //backToChequeBooksList();
        });
    } else {
      dispatch(actions.update(id, data))
        .then(() => {
          backToChequeBooksList();
        })
        .catch(() => {
          //backToChequeBooksList();
        });
    }
  };

  const btnRefChequeBook = useRef("1");
  const btnRefChequePaper = useRef("2");

  const saveChequeBookClick = () => {
    let ChequeBookObj = {};

    btnRefChequeBook.current.Collect((datas) => {
      ChequeBookObj = datas;
      if (btnRefChequePaper.current != null && !!chequeBookObj.ChequeBookId) {
        btnRefChequePaper.current.Collect((datas) => {
          ChequeBookObj["ChequePapers"] = datas;
        });
      }

      SaveChequeBook(ChequeBookObj);
    });
  };
  const backToChequeBooksList = () => {
    history.push(`/cash/chequeBooks`);
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
                onClick={backToChequeBooksList}
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
                onClick={saveChequeBookClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Tabs
              defaultActiveKey="chequeBook"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="chequeBook"
                title={t("Common.BasicInfo")}
                className="nav-item"
              >
                <ChequeBookEditForm
                  actionsLoading={actionsLoading}
                  chequeBook={chequeBookObj}
                  ref={btnRefChequeBook}
                />
              </Tab>
              {!!chequeBookObj.ChequeBookId && (
                <Tab
                  eventKey="chequePapers"
                  title={t("ChequePaper.Plural")}
                  className="nav-item"
                >
                  <ChequePapersUIProvider
                    currentChequeBookId={id}
                    actionsLoading={actionsLoading}
                    chequePaper={chequePapersObj}
                    ref={btnRefChequePaper}
                  >
                    <ChequePapers />
                  </ChequePapersUIProvider>
                </Tab>
              )}
            </Tabs>
          </CardBody>
        </Card>
      )}
    </>
  );
}
