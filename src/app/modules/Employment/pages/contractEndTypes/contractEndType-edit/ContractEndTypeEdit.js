/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/contractEndTypes/contractEndTypesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { ContractEndTypeEditForm } from "./ContractEndTypeEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function ContractEndTypeEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    ContractEndTypeId: undefined,
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
  const { actionsLoading, contractEndTypeForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.contractEndTypes.actionsLoading,
      contractEndTypeForEdit: state.contractEndTypes.contractEndTypeForEdit,
      error: state.contractEndTypes.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchContractEndType(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("ContractEndType.Entity");

    if (contractEndTypeForEdit && id) {
      _title = t("Common.Edit") + " " + contractEndTypeForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractEndTypeForEdit, id]);

  const saveContractEndType = (values) => {
    if (!id) {
      dispatch(actions.createContractEndType(values))
        .then((arg) => {
          backToContractEndTypesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateContractEndType(id, values))
        .then(() => backToContractEndTypesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveContractEndTypeClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToContractEndTypesList = () => {
    history.push(`/employment/contractEndTypes`);
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
            onClick={backToContractEndTypesList}
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
            onClick={saveContractEndTypeClick}
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
            <ContractEndTypeEditForm
              actionsLoading={actionsLoading}
              contractEndType={contractEndTypeForEdit || initModel}
              btnRef={btnRef}
              saveContractEndType={saveContractEndType}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
