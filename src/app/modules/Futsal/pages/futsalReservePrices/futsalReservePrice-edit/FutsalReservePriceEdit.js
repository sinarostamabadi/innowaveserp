/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/futsalReservePrices/futsalReservePricesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { FutsalReservePriceEditForm } from "./FutsalReservePriceEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function FutsalReservePriceEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    FutsalReservePriceId: undefined,
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
  const { actionsLoading, futsalReservePriceForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.futsalReservePrices.actionsLoading,
      futsalReservePriceForEdit:
        state.futsalReservePrices.futsalReservePriceForEdit,
      error: state.futsalReservePrices.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchFutsalReservePrice(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("FutsalReservePrice.Entity");

    if (futsalReservePriceForEdit && id) {
      _title = t("Common.Edit") + " " + futsalReservePriceForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [futsalReservePriceForEdit, id]);

  const saveFutsalReservePrice = (values) => {
    if (!id) {
      dispatch(actions.createFutsalReservePrice(values))
        .then((arg) => {
          backToFutsalReservePricesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateFutsalReservePrice(id, values))
        .then(() => backToFutsalReservePricesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveFutsalReservePriceClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToFutsalReservePricesList = () => {
    history.push(`/futsal/futsalReservePrices`);
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
            onClick={backToFutsalReservePricesList}
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
            onClick={saveFutsalReservePriceClick}
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
            <FutsalReservePriceEditForm
              actionsLoading={actionsLoading}
              futsalReservePrice={futsalReservePriceForEdit || initModel}
              btnRef={btnRef}
              saveFutsalReservePrice={saveFutsalReservePrice}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
