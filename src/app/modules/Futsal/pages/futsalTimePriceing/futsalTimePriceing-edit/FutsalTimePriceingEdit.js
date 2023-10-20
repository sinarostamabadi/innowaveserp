/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/futsalTimePriceing/futsalTimePriceingActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { FutsalTimePriceingEditForm } from "./FutsalTimePriceingEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function FutsalTimePriceingEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    FutsalTimePriceingId: undefined,
    TitleFa: "",
    TitleEn: "",
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, futsalTimePriceingForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.futsalTimePriceing.actionsLoading,
      futsalTimePriceingForEdit:
        state.futsalTimePriceing.futsalTimePriceingForEdit,
      error: state.futsalTimePriceing.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchFutsalTimePriceing(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("FutsalTimePriceing.Entity");

    if (futsalTimePriceingForEdit && id) {
      _title = t("Common.Edit") + " " + futsalTimePriceingForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [futsalTimePriceingForEdit, id]);

  const saveFutsalTimePriceing = (values) => {
    if (!id) {
      dispatch(actions.createFutsalTimePriceing(values))
        .then((arg) => {
          backToFutsalTimePriceingList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateFutsalTimePriceing(id, values))
        .then(() => backToFutsalTimePriceingList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveFutsalTimePriceingClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToFutsalTimePriceingList = () => {
    history.push(`/futsal/futsalTimePriceing`);
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
            onClick={backToFutsalTimePriceingList}
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
            onClick={saveFutsalTimePriceingClick}
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
            <FutsalTimePriceingEditForm
              actionsLoading={actionsLoading}
              futsalTimePriceing={futsalTimePriceingForEdit || initModel}
              btnRef={btnRef}
              saveFutsalTimePriceing={saveFutsalTimePriceing}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
