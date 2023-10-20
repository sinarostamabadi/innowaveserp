/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/bodyBuildingPriceing/bodyBuildingPriceingActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { BodyBuildingPriceingEditForm } from "./BodyBuildingPriceingEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function BodyBuildingPriceingEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    BodyBuildingPriceingId: undefined,
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
  const { actionsLoading, bodyBuildingPriceingForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.bodyBuildingPriceing.actionsLoading,
      bodyBuildingPriceingForEdit: state.bodyBuildingPriceing.bodyBuildingPriceingForEdit,
      error: state.bodyBuildingPriceing.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchBodyBuildingPriceing(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("BodyBuildingPriceing.Entity");

    if (bodyBuildingPriceingForEdit && id) {
      _title = t("Common.Edit") + " " + bodyBuildingPriceingForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyBuildingPriceingForEdit, id]);

  const saveBodyBuildingPriceing = (values) => {
    if (!id) {
      dispatch(actions.createBodyBuildingPriceing(values))
        .then((arg) => {
          backToBodyBuildingPriceingList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateBodyBuildingPriceing(id, values))
        .then(() => backToBodyBuildingPriceingList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveBodyBuildingPriceingClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToBodyBuildingPriceingList = () => {
    history.push(`/bodyBuilding/bodyBuildingPriceing`);
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
            onClick={backToBodyBuildingPriceingList}
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
              onClick={saveBodyBuildingPriceingClick}
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
            <BodyBuildingPriceingEditForm
              actionsLoading={actionsLoading}
              bodyBuildingPriceing={bodyBuildingPriceingForEdit || initModel}
              btnRef={btnRef}
              saveBodyBuildingPriceing={saveBodyBuildingPriceing}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}