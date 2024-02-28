/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/billiardReservePrices/billiardReservePricesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { BilliardReservePriceEditForm } from "./BilliardReservePriceEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function BilliardReservePriceEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    BilliardReservePriceId: undefined,
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
  const { actionsLoading, billiardReservePriceForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.billiardReservePrices.actionsLoading,
      billiardReservePriceForEdit:
        state.billiardReservePrices.billiardReservePriceForEdit,
      error: state.billiardReservePrices.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchBilliardReservePrice(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("BilliardReservePrice.Entity");

    if (billiardReservePriceForEdit && id) {
      _title = t("Common.Edit") + " " + billiardReservePriceForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billiardReservePriceForEdit, id]);

  const saveBilliardReservePrice = (values) => {
    if (!id) {
      dispatch(actions.createBilliardReservePrice(values))
        .then((arg) => {
          backToBilliardReservePricesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateBilliardReservePrice(id, values))
        .then(() => backToBilliardReservePricesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveBilliardReservePriceClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToBilliardReservePricesList = () => {
    history.push(`/billiard/billiardReservePrices`);
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
            onClick={backToBilliardReservePricesList}
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
            onClick={saveBilliardReservePriceClick}
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
            <BilliardReservePriceEditForm
              actionsLoading={actionsLoading}
              billiardReservePrice={billiardReservePriceForEdit || initModel}
              btnRef={btnRef}
              saveBilliardReservePrice={saveBilliardReservePrice}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
