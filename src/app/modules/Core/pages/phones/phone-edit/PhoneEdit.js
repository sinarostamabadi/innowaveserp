/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/phones/phonesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { PhoneEditForm } from "./PhoneEditForm";
import { useSubheader } from "../../../../../../core/layout";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
const initPhone = {
  PhoneId: undefined,
  TitleFa: "",
  TitleEn: "",
};
export function PhoneEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();
  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, phoneForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.phones.actionsLoading,
      phoneForEdit: state.phones.phoneForEdit,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(actions.fetchPhone(id));
  }, [id, dispatch]);
  useEffect(() => {
    let _title = id ? "" : "NewInfo";
    if (phoneForEdit && id) {
      _title = `Edit Info '${phoneForEdit.TitleFa}'`;
    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneForEdit, id]);
  const savePhone = (values) => {
    if (!id) {
      dispatch(actions.createPhone(values)).then((arg) => {
        backToPhonesList();
      });
    } else {
      dispatch(actions.updatePhone(values)).then(() => backToPhonesList());
    }
  };
  const btnRef = useRef();
  const savePhoneClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const backToPhonesList = () => {
    history.push(`/Core/phones`);
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToPhonesList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i> Exit
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i> ReValue
          </button>
          {`  `}
          <button type="submit" className="btn btn-light ml-2">
            <i className="fa fa-print"></i> PrintInfo
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={savePhoneClick}
          >
            <i className="fa fa-save"></i> SaveInfo
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
              MenuName
            </a>
          </li>
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <PhoneEditForm
              actionsLoading={actionsLoading}
              phone={phoneForEdit || initPhone}
              btnRef={btnRef}
              savePhone={savePhone}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
