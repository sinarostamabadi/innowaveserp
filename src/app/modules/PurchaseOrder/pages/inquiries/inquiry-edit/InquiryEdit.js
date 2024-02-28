/* eslint-disable eqeqeq */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/inquiries/inquiriesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { InquiryEditForm } from "./InquiryEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function InquiryEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    InquiryId: undefined,
    PersonId: "",
    InquiryStatusId: "",
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  let copyModel = Object.create(initModel);
  const [InquiryObj, setInquiryObj] = useState(copyModel);

  const { actionsLoading, inquiryForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.inquiries.actionsLoading,
      inquiryForEdit: state.inquiries.inquiryForEdit,
      error: state.inquiries.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id) {
      dispatch(actions.fetchInquiry(id)).then((res) => {
        setEditMode(true);
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("Inquiry.Entity");

    if (inquiryForEdit && id) {
      _title = t("Common.Edit") + " " + inquiryForEdit.Person.FullNameFa;
      setInquiryObj(inquiryForEdit);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inquiryForEdit, id]);

  const saveInquiry = (values) => {
    const PersonId = values.PersonId[0]
      ? values.PersonId[0].PersonId
      : values.Person.PersonId;
    const InquiryStatusId = values.InquiryStatusId[0]
      ? values.InquiryStatusId[0].InquiryStatusId
      : values.InquiryStatus.InquiryStatusId;
    const newValue = {
      InquiryId: values.InquiryId,
      PersonId,
      InquiryStatusId,
    };

    if (!id) {
      dispatch(actions.createInquiry(newValue))
        .then((arg) => {
          backToInquiriesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateInquiry(id, newValue))
        .then(() => backToInquiriesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveInquiryClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToInquiriesList = () => {
    history.push(`/purchaseOrder/inquiries`);
  };

  return (
    <React.Fragment>
      {((!!id && editMode) || !!id == false) && (
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
                onClick={backToInquiriesList}
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
                onClick={saveInquiryClick}
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
                <InquiryEditForm
                  actionsLoading={actionsLoading}
                  inquiry={InquiryObj}
                  btnRef={btnRef}
                  saveInquiry={saveInquiry}
                />
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  );
}
