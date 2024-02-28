/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/costTypes/costTypesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { CostTypeEditForm } from "./CostTypeEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function CostTypeEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    CostTypeId: undefined,
    Title: "",
    Describtion: "",
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, costTypeForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.costTypes.actionsLoading,
      costTypeForEdit: state.costTypes.costTypeForEdit,
      error: state.costTypes.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchCostType(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("CostType.Entity");

    if (costTypeForEdit && id) {
      _title = t("Common.Edit") + " " + costTypeForEdit.Title;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costTypeForEdit, id]);

  const saveCostType = (values) => {
    const newValues = {
      CostTypeId: values.CostTypeId,
      Describtion: values.Describtion,
      Title: values.Title,
    };
    if (!id) {
      dispatch(actions.createCostType(newValues))
        .then((arg) => {
          backToCostTypesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateCostType(id, newValues))
        .then(() => backToCostTypesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveCostTypeClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToCostTypesList = () => {
    history.push(`/purchaseOrder/costTypes`);
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
            onClick={backToCostTypesList}
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
            onClick={saveCostTypeClick}
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
            <CostTypeEditForm
              actionsLoading={actionsLoading}
              costType={costTypeForEdit || initModel}
              btnRef={btnRef}
              saveCostType={saveCostType}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
