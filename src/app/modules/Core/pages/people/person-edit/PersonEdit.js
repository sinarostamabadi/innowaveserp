/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */  
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/people/peopleActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { PersonEditForm } from "./PersonEditForm";
import { useSubheader } from "../../../../../../core/layout";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useReactToPrint } from 'react-to-print';
const initPerson = {
  PersonId: undefined,
  TitleFa: "",
  TitleEn: "",
};
export function PersonEdit({
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
  const { actionsLoading, personForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.people.actionsLoading,
      personForEdit: state.people.personForEdit,
    }),
    shallowEqual  
  );
  useEffect(() => {
    dispatch(actions.fetchPerson(id));
  }, [id, dispatch]);
  useEffect(() => {
    let _title = id ? "" : "NewInfo";
    if (personForEdit && id) {
      _title = `Edit Info '${personForEdit.TitleFa}'`;
    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [personForEdit, id]);
  const savePerson = (values) => {
    if (!id) {
      dispatch(actions.createPerson(values)).then((arg) => {
        backTopeopleList();
      });
    } else {
      dispatch(actions.updatePerson(values)).then(() =>
        backTopeopleList()  
      );
    }
  };
  const btnRef = useRef();
  const savePersonClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const backTopeopleList = () => {
    history.push(`/Core/people`);
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button  
            type="button"  
            onClick={backTopeopleList}
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
            onClick={savePersonClick}
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
            <PersonEditForm  
              actionsLoading={actionsLoading}
              person={personForEdit || initPerson}
              btnRef={btnRef}
              savePerson={savePerson}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
