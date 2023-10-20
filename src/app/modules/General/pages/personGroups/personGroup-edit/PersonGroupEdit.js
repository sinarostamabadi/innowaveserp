/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/personGroups/personGroupsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { PersonGroupEditForm } from "./PersonGroupEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export function PersonGroupEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    PersonGroupId: undefined,
    Title: ""
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, personGroupForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.personGroups.actionsLoading,
      personGroupForEdit: state.personGroups.personGroupForEdit,
      error: state.personGroups.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchPersonGroup(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("PersonGroup.Entity");

    if (personGroupForEdit && id) {
      _title = t("Common.Edit") + " " + personGroupForEdit.Title;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personGroupForEdit, id]);

  const savePersonGroup = (values) => {
    const newValues = {
      Title: values.Title,
      PersonGroupId: values.PersonGroupId
    }
    console.log(values)
    if (!id) {
      dispatch(actions.createPersonGroup(newValues))
        .then((arg) => {
          backToPersonGroupsList();
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updatePersonGroup(id, newValues))
        .then(() => backToPersonGroupsList())
        .catch((err) => { });
    }
  };

  const btnRef = useRef();
  const savePersonGroupClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToPersonGroupsList = () => {
    history.push(`/general/personGroups`);
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
            onClick={backToPersonGroupsList}
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
            onClick={savePersonGroupClick}
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
            <PersonGroupEditForm
              actionsLoading={actionsLoading}
              personGroup={personGroupForEdit || initModel}
              btnRef={btnRef}
              savePersonGroup={savePersonGroup}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}