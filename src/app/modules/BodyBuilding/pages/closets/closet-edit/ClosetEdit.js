import { useEffect, useState, useRef } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSubheader } from "src/core/layout";
import { ModalProgressBar, Alerty } from "src/core/_partials/controls";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { ClosetEditForm } from "./ClosetEditForm";
import * as actions from "../../../_redux/closets/closetsActions";

export function ClosetEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const initModel = {
    ClosetId: undefined,
    Title: "",
    ConnectionInfo: "",
    PortInfo: "",
    InUse: false,
  };

  const suhbeader = useSubheader();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { actionsLoading, closetForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.closets.actionsLoading,
      closetForEdit: state.closets.closetForEdit,
      error: state.closets.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchCloset(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " «" + t("BodyBuildingCloset.Entity") + "»";

    if (closetForEdit && closetForEdit.BodyBuildingClosetId == id) {
      _title = t("Common.Edit") + " «" + closetForEdit.Title + "»";
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closetForEdit, id]);

  const saveCloset = (values) => {
    if (!id) {
      dispatch(actions.createCloset(values))
        .then((arg) => {
          backToClosetsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateCloset(id, values))
        .then(() => backToClosetsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveClosetClick = () => {
    if (btnRef && btnRef.current) btnRef.current.click();
  };

  const backToClosetsList = () => history.push(`/BodyBuilding/closets`);

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
            onClick={backToClosetsList}
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
            onClick={saveClosetClick}
          >
            <i className="fa fa-save"></i> {t("Common.Save")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ClosetEditForm
          actionsLoading={actionsLoading}
          closet={closetForEdit || initModel}
          btnRef={btnRef}
          saveCloset={saveCloset}
        />
      </CardBody>
    </Card>
  );
}
