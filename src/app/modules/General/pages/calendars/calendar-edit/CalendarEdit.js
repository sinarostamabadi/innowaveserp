/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/calendars/calendarsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { CalendarEditForm } from "./CalendarEditForm";
import { useSubheader } from "../../../../../../core/layout";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
const initCalendar = {
  CalendarId: undefined,
  TitleFa: "",
  TitleEn: "",
};
export function CalendarEdit({
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
  const { actionsLoading, calendarForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.calendars.actionsLoading,
      calendarForEdit: state.calendars.calendarForEdit,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(actions.fetchCalendar(id));
  }, [id, dispatch]);
  useEffect(() => {
    let _title = id ? "" : "NewInfo";
    if (calendarForEdit && id) {
      _title = `Edit Info '${calendarForEdit.TitleFa}'`;
    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarForEdit, id]);
  const saveCalendar = (values) => {
    if (!id) {
      dispatch(actions.createCalendar(values)).then((arg) => {
        backToCalendarsList();
      });
    } else {
      dispatch(actions.updateCalendar(values)).then(() =>
        backToCalendarsList()
      );
    }
  };
  const btnRef = useRef();
  const saveCalendarClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const backToCalendarsList = () => {
    history.push(`/General/calendars`);
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToCalendarsList}
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
            onClick={saveCalendarClick}
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
            <CalendarEditForm
              actionsLoading={actionsLoading}
              calendar={calendarForEdit || initCalendar}
              btnRef={btnRef}
              saveCalendar={saveCalendar}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
