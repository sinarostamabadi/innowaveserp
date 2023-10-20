/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/warehouses/warehousesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { WarehouseEditForm } from "./WarehouseEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function WarehouseEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    WarehouseId: undefined,
    Title: "",
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, warehouseForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.warehouses.actionsLoading,
      warehouseForEdit: state.warehouses.warehouseForEdit,
      error: state.warehouses.error,
    }),
    shallowEqual
    );
    
  const dispatch = useDispatch();
  useEffect(() => {
    !!id && dispatch(actions.fetchWarehouse(id)).then((res) => setEditMode(true));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("Warehouse.Entity");

    if (warehouseForEdit && id) {
      _title = t("Common.Edit") + " " + warehouseForEdit.Title;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouseForEdit, id]);

  const saveWarehouse = (values) => {
    console.log(values)
    if (!id) {
      dispatch(actions.createWarehouse(values))
        .then((arg) => {
          backToWarehousesList();
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updateWarehouse(id, values))
        .then(() => backToWarehousesList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const saveWarehouseClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToWarehousesList = () => {
    history.push(`/general/warehouses`);
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
            onClick={backToWarehousesList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i> {t("Common.Back")}
          </button>

          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i> {t("Common.Reset")}
          </button>

          <button type="submit" className="btn btn-light ml-2">
            <i className="fa fa-print"></i> {t("Common.Print")}
          </button>

          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveWarehouseClick}
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
            <WarehouseEditForm
              actionsLoading={actionsLoading}
              warehouse={warehouseForEdit || initModel}
              btnRef={btnRef}
              saveWarehouse={saveWarehouse}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}