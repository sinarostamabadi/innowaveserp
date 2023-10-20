/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDocumentDetailSerials/sellDocumentDetailSerialsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { SellDocumentDetailSerialEditForm } from "./SellDocumentDetailSerialEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function SellDocumentDetailSerialEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    SellDocumentDetailSerialId: undefined,
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
  const { actionsLoading, sellDocumentDetailSerialForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.sellDocumentDetailSerials.actionsLoading,
      sellDocumentDetailSerialForEdit: state.sellDocumentDetailSerials.sellDocumentDetailSerialForEdit,
      error: state.sellDocumentDetailSerials.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchSellDocumentDetailSerial(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("SellDocumentDetailSerial.Entity");

    if (sellDocumentDetailSerialForEdit && id) {
      _title = t("Common.Edit") + " " + sellDocumentDetailSerialForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDocumentDetailSerialForEdit, id]);

  const saveSellDocumentDetailSerial = (values) => {
    if (!id) {
      dispatch(actions.createSellDocumentDetailSerial(values))
        .then((arg) => {
          backToSellDocumentDetailSerialsList();
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updateSellDocumentDetailSerial(id, values))
        .then(() => backToSellDocumentDetailSerialsList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const saveSellDocumentDetailSerialClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToSellDocumentDetailSerialsList = () => {
    history.push(`/sell/sellDocumentDetailSerials`);
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
            onClick={backToSellDocumentDetailSerialsList}
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
            onClick={saveSellDocumentDetailSerialClick}
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
            <SellDocumentDetailSerialEditForm
              actionsLoading={actionsLoading}
              sellDocumentDetailSerial={sellDocumentDetailSerialForEdit || initModel}
              btnRef={btnRef}
              saveSellDocumentDetailSerial={saveSellDocumentDetailSerial}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}