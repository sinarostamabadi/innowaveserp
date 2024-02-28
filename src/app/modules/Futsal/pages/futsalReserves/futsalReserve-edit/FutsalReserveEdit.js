/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/futsalReserves/futsalReservesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { FutsalReserveEditForm } from "./FutsalReserveEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function FutsalReserveEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    FutsalReserveId: undefined,
    FutsalReserveTypeId: undefined,
    PersonId: undefined,
    ReserveNumber: null,
    FromDate: null,
    ToDate: null,
    PersonCount: null,
    FutsalReserveDates: [],
    Price: null,
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, futsalReserveForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.futsalReserves.actionsLoading,
      futsalReserveForEdit: state.futsalReserves.futsalReserveForEdit,
      error: state.futsalReserves.error,
    }),
    shallowEqual
  );

  const [futsalReserveDatesObj, setFutsalReserveDatesObj] = useState(
    initModel.FutsalReserveDates
  );
  useEffect(() => {
    dispatch(actions.fetchFutsalReserve(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("FutsalReserve.Entity");

    if (futsalReserveForEdit && id) {
      _title = t("Common.Edit") + " " + t("FutsalReserve.Entity");
      setFutsalReserveDatesObj(futsalReserveForEdit.FutsalReserveDates);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [futsalReserveForEdit, id]);

  const saveFutsalReserve = (values) => {
    if (!id) {
      dispatch(actions.createFutsalReserve(values))
        .then((arg) => {
          backToFutsalReservesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateFutsalReserve(id, values))
        .then(() => backToFutsalReservesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef("1");

  const saveFutsalReserveClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToFutsalReservesList = () => {
    history.push(`/futsal/futsalReserves`);
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
            onClick={backToFutsalReservesList}
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
            onClick={saveFutsalReserveClick}
          >
            <i className="fa fa-save"></i> {t("Common.Save")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody className="pt-5">
        <FutsalReserveEditForm
          actionsLoading={actionsLoading}
          futsalReserve={futsalReserveForEdit || initModel}
          btnRef={btnRef}
          saveFutsalReserve={saveFutsalReserve}
        />
      </CardBody>
    </Card>
  );
}
