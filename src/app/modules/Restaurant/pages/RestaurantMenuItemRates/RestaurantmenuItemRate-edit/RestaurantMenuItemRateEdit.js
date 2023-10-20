/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/RestaurantMenuItemRates/RestaurantMenuItemRatesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { RestaurantMenuItemRateEditForm } from "./RestaurantMenuItemRateEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemRateEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    RestaurantMenuItemRateId: undefined,
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
  const { actionsLoading, restaurantMenuItemRateForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.restaurantMenuItemRates.actionsLoading,
      restaurantMenuItemRateForEdit: state.restaurantMenuItemRates.restaurantMenuItemRateForEdit,
      error: state.restaurantMenuItemRates.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchRestaurantMenuItemRate(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("RestaurantMenuItemRate.Entity");

    if (restaurantMenuItemRateForEdit && id) {
      _title = t("Common.Edit") + " " + restaurantMenuItemRateForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantMenuItemRateForEdit, id]);

  const saveRestaurantMenuItemRate = (values) => {
    if (!id) {
      dispatch(actions.createRestaurantMenuItemRate(values))
        .then((arg) => {
          backToRestaurantMenuItemRatesList();
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updateRestaurantMenuItemRate(id, values))
        .then(() => backToRestaurantMenuItemRatesList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const saveRestaurantMenuItemRateClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToRestaurantMenuItemRatesList = () => {
    history.push(`/restaurant/restaurantMenuItemRates`);
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
            onClick={backToRestaurantMenuItemRatesList}
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
            onClick={saveRestaurantMenuItemRateClick}
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
            <RestaurantMenuItemRateEditForm
              actionsLoading={actionsLoading}
              restaurantMenuItemRate={restaurantMenuItemRateForEdit || initModel}
              btnRef={btnRef}
              saveRestaurantMenuItemRate={saveRestaurantMenuItemRate}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}