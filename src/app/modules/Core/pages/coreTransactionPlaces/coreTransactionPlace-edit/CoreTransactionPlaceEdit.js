/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */  
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/coreTransactionPlaces/coreTransactionPlacesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { CoreTransactionPlaceEditForm } from "./CoreTransactionPlaceEditForm";
import { useSubheader } from "../../../../../../core/layout";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useReactToPrint } from 'react-to-print';
const initCoreTransactionPlace = {
  CoreTransactionPlaceId: undefined,
  TitleFa: "",
  TitleEn: "",
};
export function CoreTransactionPlaceEdit({
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
  const { actionsLoading, coreTransactionPlaceForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.coreTransactionPlaces.actionsLoading,
      coreTransactionPlaceForEdit: state.coreTransactionPlaces.coreTransactionPlaceForEdit,
    }),
    shallowEqual  
  );
  useEffect(() => {
    dispatch(actions.fetchCoreTransactionPlace(id));
  }, [id, dispatch]);
  useEffect(() => {
    let _title = id ? "" : "NewInfo";
    if (coreTransactionPlaceForEdit && id) {
      _title = `Edit Info '${coreTransactionPlaceForEdit.TitleFa}'`;
    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [coreTransactionPlaceForEdit, id]);
  const saveCoreTransactionPlace = (values) => {
    if (!id) {
      dispatch(actions.createCoreTransactionPlace(values)).then((arg) => {
        backToCoreTransactionPlacesList();
      });
    } else {
      dispatch(actions.updateCoreTransactionPlace(values)).then(() =>
        backToCoreTransactionPlacesList()  
      );
    }
  };
  const btnRef = useRef();
  const saveCoreTransactionPlaceClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const backToCoreTransactionPlacesList = () => {
    history.push(`/Core/coreTransactionPlaces`);
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button  
            type="button"  
            onClick={backToCoreTransactionPlacesList}
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
            onClick={saveCoreTransactionPlaceClick}
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
            <CoreTransactionPlaceEditForm  
              actionsLoading={actionsLoading}
              coreTransactionPlace={coreTransactionPlaceForEdit || initCoreTransactionPlace}
              btnRef={btnRef}
              saveCoreTransactionPlace={saveCoreTransactionPlace}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
