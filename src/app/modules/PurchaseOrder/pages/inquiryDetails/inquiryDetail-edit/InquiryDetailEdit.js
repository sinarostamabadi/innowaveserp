/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/inquiryDetails/inquiryDetailsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { InquiryDetailEditForm } from "./InquiryDetailEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function InquiryDetailEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    InquiryDetailId: undefined,
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
  const { actionsLoading, inquiryDetailForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.inquiryDetails.actionsLoading,
      inquiryDetailForEdit: state.inquiryDetails.inquiryDetailForEdit,
      error: state.inquiryDetails.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchInquiryDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("InquiryDetail.Entity");

    if (inquiryDetailForEdit && id) {
      _title = t("Common.Edit") + " " + inquiryDetailForEdit.TitleFa;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inquiryDetailForEdit, id]);

  const saveInquiryDetail = (values) => {
    if (!id) {
      dispatch(actions.createInquiryDetail(values))
        .then((arg) => {
          backToInquiryDetailsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateInquiryDetail(id, values))
        .then(() => backToInquiryDetailsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveInquiryDetailClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToInquiryDetailsList = () => {
    history.push(`/purchaseOrder/inquiryDetails`);
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
            onClick={backToInquiryDetailsList}
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
            onClick={saveInquiryDetailClick}
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
            <InquiryDetailEditForm
              actionsLoading={actionsLoading}
              inquiryDetail={inquiryDetailForEdit || initModel}
              btnRef={btnRef}
              saveInquiryDetail={saveInquiryDetail}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}