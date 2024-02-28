import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/poses/posesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { PosEditForm } from "./PosEditForm";
import { useSubheader } from "src/core/layout";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";
import { CloneObject } from "src/core/_helpers";

export function PosEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();

  const initModel = {
    PosId: undefined,
    BankId: "",
    Bank: null,
    SerialNo: "",
    DefaultBankAccountId: "",
    DefaultBankAccount: null,
    PosIpAddress: "",
    TerminalId: "",
  };

  const suhbeader = useSubheader();
  const [posObj, setPosObj] = useState(CloneObject(initModel));
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, posForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.poses.actionsLoading,
      posForEdit: state.poses.posForEdit,
      error: state.poses.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchPos(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("Pos.Entity");

    if (posForEdit && id && posForEdit.PosId == id) {
      _title = t("Common.Edit") + " " + posForEdit.SerialNo;

      setPosObj(posForEdit);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posForEdit, id]);

  const savePos = (values) => {
    if (!id) {
      dispatch(actions.createPos(values))
        .then((arg) => {
          backToPosesList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updatePos(id, values))
        .then(() => backToPosesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const savePosClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToPosesList = () => {
    history.push(`/general/poses`);
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
            onClick={backToPosesList}
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
            onClick={savePosClick}
          >
            <i className="fa fa-save"></i> {t("Common.Save")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {(!!id && !!posObj && posObj.PosId == id) || !!id == false ? (
          <PosEditForm
            actionsLoading={actionsLoading}
            pos={posObj}
            btnRef={btnRef}
            savePos={savePos}
          />
        ) : (
          <p>در حال بارگذاری...</p>
        )}
      </CardBody>
    </Card>
  );
}
