/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/RestaurantMenuItemIngredients/RestaurantMenuItemIngredientsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { RestaurantMenuItemIngredientEditForm } from "./RestaurantMenuItemIngredientEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemIngredientEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    RestaurantMenuItemIngredientId: undefined,
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
  const { actionsLoading, restaurantMenuItemIngredientForEdit, error } =
    useSelector(
      (state) => ({
        actionsLoading: state.restaurantMenuItemIngredients.actionsLoading,
        restaurantMenuItemIngredientForEdit:
          state.restaurantMenuItemIngredients
            .restaurantMenuItemIngredientForEdit,
        error: state.restaurantMenuItemIngredients.error,
      }),
      shallowEqual
    );

  useEffect(() => {
    dispatch(actions.fetchRestaurantMenuItemIngredient(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("RestaurantMenuItemIngredient.Entity");

    if (restaurantMenuItemIngredientForEdit && id) {
      _title =
        t("Common.Edit") + " " + restaurantMenuItemIngredientForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantMenuItemIngredientForEdit, id]);

  const saveRestaurantMenuItemIngredient = (values) => {
    if (!id) {
      dispatch(actions.createRestaurantMenuItemIngredient(values))
        .then((arg) => {
          backToRestaurantMenuItemIngredientsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateRestaurantMenuItemIngredient(id, values))
        .then(() => backToRestaurantMenuItemIngredientsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveRestaurantMenuItemIngredientClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToRestaurantMenuItemIngredientsList = () => {
    history.push(`/restaurant/restaurantMenuItemIngredients`);
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
            onClick={backToRestaurantMenuItemIngredientsList}
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
            onClick={saveRestaurantMenuItemIngredientClick}
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
            <RestaurantMenuItemIngredientEditForm
              actionsLoading={actionsLoading}
              restaurantMenuItemIngredient={
                restaurantMenuItemIngredientForEdit || initModel
              }
              btnRef={btnRef}
              saveRestaurantMenuItemIngredient={
                saveRestaurantMenuItemIngredient
              }
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
