/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/coffeeShopDiscountTypes/coffeeShopDiscountTypesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { CoffeeShopDiscountTypeEditForm } from "./CoffeeShopDiscountTypeEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function CoffeeShopDiscountTypeEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    CoffeeShopDiscountTypeId: undefined,
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
  const { actionsLoading, coffeeShopDiscountTypeForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.coffeeShopDiscountTypes.actionsLoading,
      coffeeShopDiscountTypeForEdit:
        state.coffeeShopDiscountTypes.coffeeShopDiscountTypeForEdit,
      error: state.coffeeShopDiscountTypes.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchCoffeeShopDiscountType(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("CoffeeShopDiscountType.Entity");

    if (coffeeShopDiscountTypeForEdit && id) {
      _title = t("Common.Edit") + " " + coffeeShopDiscountTypeForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeShopDiscountTypeForEdit, id]);

  const saveCoffeeShopDiscountType = (values) => {
    if (!id) {
      dispatch(actions.createCoffeeShopDiscountType(values))
        .then((arg) => {
          backToCoffeeShopDiscountTypesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateCoffeeShopDiscountType(id, values))
        .then(() => backToCoffeeShopDiscountTypesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveCoffeeShopDiscountTypeClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToCoffeeShopDiscountTypesList = () => {
    history.push(`/cofe/coffeeShopDiscountTypes`);
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
            onClick={backToCoffeeShopDiscountTypesList}
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
            onClick={saveCoffeeShopDiscountTypeClick}
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
            <CoffeeShopDiscountTypeEditForm
              actionsLoading={actionsLoading}
              coffeeShopDiscountType={
                coffeeShopDiscountTypeForEdit || initModel
              }
              btnRef={btnRef}
              saveCoffeeShopDiscountType={saveCoffeeShopDiscountType}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
