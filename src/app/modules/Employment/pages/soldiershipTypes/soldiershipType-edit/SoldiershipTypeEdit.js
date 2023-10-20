/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/soldiershipTypes/soldiershipTypesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { SoldiershipTypeEditForm } from "./SoldiershipTypeEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function SoldiershipTypeEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    SoldiershipTypeId: undefined,
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
  const { actionsLoading, soldiershipTypeForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.soldiershipTypes.actionsLoading,
      soldiershipTypeForEdit: state.soldiershipTypes.soldiershipTypeForEdit,
      error: state.soldiershipTypes.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchSoldiershipType(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("SoldiershipType.Entity");

    if (soldiershipTypeForEdit && id) {
      _title = t("Common.Edit") + " " + soldiershipTypeForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soldiershipTypeForEdit, id]);

  const saveSoldiershipType = (values) => {
    if (!id) {
      dispatch(actions.createSoldiershipType(values))
        .then((arg) => {
          backToSoldiershipTypesList();
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updateSoldiershipType(id, values))
        .then(() => backToSoldiershipTypesList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const saveSoldiershipTypeClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToSoldiershipTypesList = () => {
    history.push(`/employment/soldiershipTypes`);
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
            onClick={backToSoldiershipTypesList}
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
            onClick={saveSoldiershipTypeClick}
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
            <SoldiershipTypeEditForm
              actionsLoading={actionsLoading}
              soldiershipType={soldiershipTypeForEdit || initModel}
              btnRef={btnRef}
              saveSoldiershipType={saveSoldiershipType}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}