/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/accountFloatingGroupRelations/accountFloatingGroupRelationsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { AccountFloatingGroupRelationEditForm } from "./AccountFloatingGroupRelationEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function AccountFloatingGroupRelationEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    AccountFloatingGroupRelationId: undefined,
    AccountFloatingId: "",
    AccountFloatingGroupId: "",
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [obj, setObj] = useState({ ...initModel });
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, accountFloatingGroupRelationForEdit, error } =
    useSelector(
      (state) => ({
        actionsLoading: state.accountFloatingGroupRelations.actionsLoading,
        accountFloatingGroupRelationForEdit:
          state.accountFloatingGroupRelations
            .accountFloatingGroupRelationForEdit,
        error: state.accountFloatingGroupRelations.error,
      }),
      shallowEqual
    );

  useEffect(() => {
    dispatch(actions.fetchAccountFloatingGroupRelation(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("AccountFloatingGroupRelation.Entity");

    if (
      accountFloatingGroupRelationForEdit &&
      id &&
      accountFloatingGroupRelationForEdit.AccountFloatingGroupRelationId == id
    ) {
      _title =
        t("Common.Edit") +
        " " +
        accountFloatingGroupRelationForEdit.AccountFloating.Title;
      setObj(accountFloatingGroupRelationForEdit);
      setEditMode(true);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFloatingGroupRelationForEdit, id]);

  const saveAccountFloatingGroupRelation = (values) => {
    if (!id) {
      dispatch(actions.create(values))
        .then((arg) => {
          backToList();
        })
        .catch((err) => {
          console.log("err > ", err);
        });
    } else {
      dispatch(actions.update(id, values))
        .then(() => backToList())
        .catch((err) => {
          console.log("err > ", err);
        });
    }
  };

  const btnRef = useRef();
  const saveAccountFloatingGroupRelationClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToList = () => {
    history.push(`/accounting/accountFloatingGroupRelations`);
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
          <button type="button" onClick={backToList} className="btn btn-light">
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
            onClick={saveAccountFloatingGroupRelationClick}
          >
            <i className="fa fa-save"></i> {t("Common.Save")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {((!!id && editMode) || !!id == false) && (
          <AccountFloatingGroupRelationEditForm
            actionsLoading={actionsLoading}
            accountFloatingGroupRelation={obj}
            btnRef={btnRef}
            saveAccountFloatingGroupRelation={saveAccountFloatingGroupRelation}
          />
        )}
      </CardBody>
    </Card>
  );
}
