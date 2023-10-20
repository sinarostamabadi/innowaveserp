/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankCards/bankCardsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { BankCardEditForm } from "./BankCardEditForm";
import { useSubheader } from "src/core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "src/core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function BankCardEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    BankCardId: undefined,
    Title: "",
    CartNumber: "",
    BankAccountId: "",
  };

  // Subheader
  const subheader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [obj, setobj] = useState(initModel);

  
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, bankCardForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.bankCards.actionsLoading,
      bankCardForEdit: state.bankCards.bankCardForEdit,
      error: state.bankCards.error,
    }),
    shallowEqual
    );
    console.log("bankCardForEdit ", bankCardForEdit)
    const dispatch = useDispatch();
  useEffect(() => {
    !!id && dispatch(actions.fetchBankCard(id)).then((res) => setEditMode(true));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("BankCard.Entity");

    if (bankCardForEdit && id && bankCardForEdit.BankCardId == id) {
      _title = t("Common.Edit") + " " + bankCardForEdit.Title;
      setobj(bankCardForEdit);
    }

    setTitle(_title);
    subheader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankCardForEdit, id]);

  const saveBankCard = (values) => {
    if (!id) {
      dispatch(actions.create(values))
        .then((arg) => {
          backToBankCardsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.update(id, values))
        .then(() => backToBankCardsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveBankCardClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToBankCardsList = () => {
    history.push(`/cash/bankCards`);
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
                onClick={backToBankCardsList}
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
                onClick={saveBankCardClick}
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
                <BankCardEditForm
                  actionsLoading={actionsLoading}
                  bankCard={obj}
                  btnRef={btnRef}
                  saveBankCard={saveBankCard}
                />
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}