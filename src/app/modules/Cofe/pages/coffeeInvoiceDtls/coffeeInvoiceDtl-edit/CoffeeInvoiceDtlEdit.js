/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/coffeeInvoiceDtls/coffeeInvoiceDtlsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { CoffeeInvoiceDtlEditForm } from "./CoffeeInvoiceDtlEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function CoffeeInvoiceDtlEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    CoffeeInvoiceDtlId: undefined,
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
  const { actionsLoading, coffeeInvoiceDtlForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.coffeeInvoiceDtls.actionsLoading,
      coffeeInvoiceDtlForEdit: state.coffeeInvoiceDtls.coffeeInvoiceDtlForEdit,
      error: state.coffeeInvoiceDtls.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchCoffeeInvoiceDtl(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("CoffeeInvoiceDtl.Entity");

    if (coffeeInvoiceDtlForEdit && id) {
      _title = t("Common.Edit") + " " + coffeeInvoiceDtlForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeInvoiceDtlForEdit, id]);

  const saveCoffeeInvoiceDtl = (values) => {
    if (!id) {
      dispatch(actions.createCoffeeInvoiceDtl(values))
        .then((arg) => {
          backToCoffeeInvoiceDtlsList();
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updateCoffeeInvoiceDtl(id, values))
        .then(() => backToCoffeeInvoiceDtlsList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const saveCoffeeInvoiceDtlClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToCoffeeInvoiceDtlsList = () => {
    history.push(`/cofe/coffeeInvoiceDtls`);
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
            onClick={backToCoffeeInvoiceDtlsList}
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
            onClick={saveCoffeeInvoiceDtlClick}
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
            <CoffeeInvoiceDtlEditForm
              actionsLoading={actionsLoading}
              coffeeInvoiceDtl={coffeeInvoiceDtlForEdit || initModel}
              btnRef={btnRef}
              saveCoffeeInvoiceDtl={saveCoffeeInvoiceDtl}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}