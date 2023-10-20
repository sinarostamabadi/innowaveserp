/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */  
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/addresses/addressesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { AddressEditForm } from "./AddressEditForm";
import { useSubheader } from "../../../../../../core/layout";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useReactToPrint } from 'react-to-print';
const initAddress = {
  AddressId: undefined,
  TitleFa: "",
  TitleEn: "",
};
export function AddressEdit({
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
  const { actionsLoading, addressForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.addresses.actionsLoading,
      addressForEdit: state.addresses.addressForEdit,
    }),
    shallowEqual  
  );
  useEffect(() => {
    dispatch(actions.fetchAddress(id));
  }, [id, dispatch]);
  useEffect(() => {
    let _title = id ? "" : "NewInfo";
    if (addressForEdit && id) {
      _title = `Edit Info '${addressForEdit.TitleFa}'`;
    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [addressForEdit, id]);
  const saveAddress = (values) => {
    if (!id) {
      dispatch(actions.createAddress(values)).then((arg) => {
        backToAddressesList();
      });
    } else {
      dispatch(actions.updateAddress(values)).then(() =>
        backToAddressesList()  
      );
    }
  };
  const btnRef = useRef();
  const saveAddressClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const backToAddressesList = () => {
    history.push(`/Core/addresses`);
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button  
            type="button"  
            onClick={backToAddressesList}
            className="btn btn-light"  
          >
            <i className="fa fa-arrow-left"></i> Exit  
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i> ReValue  
          </button>
          {`  `}
          <button  
            type="submit"  
            className="btn btn-light ml-2"  
          >
            <i className="fa fa-print"></i> PrintInfo  
          </button>
          {`  `}
          <button  
            type="submit"  
            className="btn btn-primary ml-2"  
            onClick={saveAddressClick}
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
            <AddressEditForm  
              actionsLoading={actionsLoading}
              address={addressForEdit || initAddress}
              btnRef={btnRef}
              saveAddress={saveAddress}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
