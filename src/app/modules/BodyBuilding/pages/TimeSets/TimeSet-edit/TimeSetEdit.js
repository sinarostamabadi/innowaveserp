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
import { TimeSetEditForm } from "./TimeSetEditForm";
import * as actions from "../../../_redux/TimeSets/TimeSetsActions";

export function TimeSetEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const initModel = {
    TimeSetId: undefined,
    Title: "",
    DayId: null,
    FromTime: "",
    ToTime: "",
    Gender: 1,
  };

  const suhbeader = useSubheader();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { actionsLoading, timeSetForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.timeSets.actionsLoading,
      timeSetForEdit: state.timeSets.timeSetForEdit,
      error: state.timeSets.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchTimeSet(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " «" + t("BodyBuildingTimeSet.Entity") + "»";

    if (timeSetForEdit && timeSetForEdit.BodyBuildingTimeSetId == id) {
      _title = t("Common.Edit") + " «" + timeSetForEdit.Title + "»";
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSetForEdit, id]);

  const saveTimeSet = (values) => {
    if (!id) {
      dispatch(actions.createTimeSet(values))
        .then((arg) => {
          backToTimeSetsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateTimeSet(id, values))
        .then(() => backToTimeSetsList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef();
  const saveTimeSetClick = () => {
    if (btnRef && btnRef.current) 
      btnRef.current.click();
  };

  const backToTimeSetsList = () => history.push(`/BodyBuilding/timeSets`);

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
            onClick={backToTimeSetsList}
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
            onClick={saveTimeSetClick}
          >
            <i className="fa fa-save"></i> {t("Common.Save")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TimeSetEditForm
          actionsLoading={actionsLoading}
          timeSet={timeSetForEdit || initModel}
          btnRef={btnRef}
          saveTimeSet={saveTimeSet}
        />
      </CardBody>
    </Card>
  );
}
