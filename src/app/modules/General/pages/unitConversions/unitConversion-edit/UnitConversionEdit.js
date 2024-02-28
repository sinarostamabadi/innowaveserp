/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/unitConversions/unitConversionsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { UnitConversionEditForm } from "./UnitConversionEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function UnitConversionEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    UnitConversionId: undefined,
    BaseUnitId: undefined,
    ConvertedUnitId: undefined,
    Amount: undefined,
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, unitConversionForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.unitConversions.actionsLoading,
      unitConversionForEdit: state.unitConversions.unitConversionForEdit,
      error: state.unitConversions.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchUnitConversion(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("UnitConversion.Entity");

    if (unitConversionForEdit && id) {
      _title = t("Common.Edit") + " " + unitConversionForEdit.BaseUnitId;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitConversionForEdit, id]);

  const saveUnitConversion = (values) => {
    const newValues = {
      UnitConversionId: Number(values.UnitConversionId),
      Amount: Number(values.Amount),
      BaseUnitId: Number(values.BaseUnitId),
      ConvertedUnitId: Number(values.ConvertedUnitId),
    };
    if (!id) {
      dispatch(actions.createUnitConversion(newValues))
        .then((arg) => {
          backToUnitConversionsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateUnitConversion(id, newValues))
        .then(() => backToUnitConversionsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveUnitConversionClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToUnitConversionsList = () => {
    history.push(`/general/unitConversions`);
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
            onClick={backToUnitConversionsList}
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
            onClick={saveUnitConversionClick}
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
            <UnitConversionEditForm
              actionsLoading={actionsLoading}
              unitConversion={unitConversionForEdit || initModel}
              btnRef={btnRef}
              saveUnitConversion={saveUnitConversion}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
