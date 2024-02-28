/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/companyTypes/companyTypesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { CompanyTypeEditForm } from "./CompanyTypeEditForm";
import { useSubheader } from "../../../../../../core/layout";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
const initCompanyType = {
  CompanyTypeId: undefined,
  TitleFa: "",
  TitleEn: "",
};
export function CompanyTypeEdit({
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
  const { actionsLoading, companyTypeForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.companyTypes.actionsLoading,
      companyTypeForEdit: state.companyTypes.companyTypeForEdit,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(actions.fetchCompanyType(id));
  }, [id, dispatch]);
  useEffect(() => {
    let _title = id ? "" : "NewInfo";
    if (companyTypeForEdit && id) {
      _title = `Edit Info '${companyTypeForEdit.TitleFa}'`;
    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyTypeForEdit, id]);
  const saveCompanyType = (values) => {
    if (!id) {
      dispatch(actions.createCompanyType(values)).then((arg) => {
        backToCompanyTypesList();
      });
    } else {
      dispatch(actions.updateCompanyType(values)).then(() =>
        backToCompanyTypesList()
      );
    }
  };
  const btnRef = useRef();
  const saveCompanyTypeClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const backToCompanyTypesList = () => {
    history.push(`/Core/companyTypes`);
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToCompanyTypesList}
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
            onClick={saveCompanyTypeClick}
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
            <CompanyTypeEditForm
              actionsLoading={actionsLoading}
              companyType={companyTypeForEdit || initCompanyType}
              btnRef={btnRef}
              saveCompanyType={saveCompanyType}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
