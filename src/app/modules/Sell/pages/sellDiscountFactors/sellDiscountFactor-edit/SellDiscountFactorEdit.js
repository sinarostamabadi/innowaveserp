/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDiscountFactors/sellDiscountFactorsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { SellDiscountFactorEditForm } from "./SellDiscountFactorEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function SellDiscountFactorEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    SellDiscountFactorId: undefined,
    FactorNumber: "",
    DiscountPercent: "",
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, sellDiscountFactorForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.sellDiscountFactors.actionsLoading,
      sellDiscountFactorForEdit: state.sellDiscountFactors.sellDiscountFactorForEdit,
      error: state.sellDiscountFactors.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchSellDiscountFactor(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("SellDiscountFactor.Entity");

    if (sellDiscountFactorForEdit && id) {
      _title = t("Common.Edit") + " " + sellDiscountFactorForEdit.FactorNumber;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDiscountFactorForEdit, id]);

  const saveSellDiscountFactor = (values) => {
    if (!id) {
      dispatch(actions.createSellDiscountFactor(values))
        .then((arg) => {
          backToSellDiscountFactorsList();
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updateSellDiscountFactor(id, values))
        .then(() => backToSellDiscountFactorsList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const saveSellDiscountFactorClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToSellDiscountFactorsList = () => {
    history.push(`/sell/sellDiscountFactors`);
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
            onClick={backToSellDiscountFactorsList}
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
            onClick={saveSellDiscountFactorClick}
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
            <SellDiscountFactorEditForm
              actionsLoading={actionsLoading}
              sellDiscountFactor={sellDiscountFactorForEdit || initModel}
              btnRef={btnRef}
              saveSellDiscountFactor={saveSellDiscountFactor}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}