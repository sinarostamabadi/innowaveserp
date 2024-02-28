/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/RestaurantMenuGroups/RestaurantMenuGroupsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { RestaurantMenuGroupEditForm } from "./RestaurantMenuGroupEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function RestaurantMenuGroupEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    RestaurantMenuGroupId: undefined,
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
  const { actionsLoading, restaurantMenuGroupForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.restaurantMenuGroups.actionsLoading,
      restaurantMenuGroupForEdit:
        state.restaurantMenuGroups.restaurantMenuGroupForEdit,
      error: state.restaurantMenuGroups.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchRestaurantMenuGroup(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("RestaurantMenuGroup.Entity");

    if (restaurantMenuGroupForEdit && id) {
      _title = t("Common.Edit") + " " + restaurantMenuGroupForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantMenuGroupForEdit, id]);

  const saveRestaurantMenuGroup = (values) => {
    if (!id) {
      dispatch(actions.createRestaurantMenuGroup(values))
        .then((arg) => {
          backToRestaurantMenuGroupsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateRestaurantMenuGroup(id, values))
        .then(() => backToRestaurantMenuGroupsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveRestaurantMenuGroupClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToRestaurantMenuGroupsList = () => {
    history.push(`/restaurant/restaurantMenuGroups`);
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
            onClick={backToRestaurantMenuGroupsList}
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
            onClick={saveRestaurantMenuGroupClick}
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
            <RestaurantMenuGroupEditForm
              actionsLoading={actionsLoading}
              restaurantMenuGroup={restaurantMenuGroupForEdit || initModel}
              btnRef={btnRef}
              saveRestaurantMenuGroup={saveRestaurantMenuGroup}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
