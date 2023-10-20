import React, { useEffect, useState, createRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSubheader } from "../../../../../../core/layout";
import { Card, CardBody, CardHeader, CardHeaderToolbar, ModalProgressBar, Alerty } from "../../../../../../core/_partials/controls";
import { CloneObject } from "../../../../../../core/_helpers";
import * as actions from "../../../_redux/bowlingTeams/bowlingTeamsActions";
import { BowlingTeamEditForm } from "./BowlingTeamEditForm";
import { BowlingTeamPersonsUIProvider } from "../bowlingTeam-persons/BowlingTeamPersonsUIContext";
import { BowlingTeamPersons } from "../bowlingTeam-persons/BowlingTeamPersons";

export function BowlingTeamEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const initModel = {
    BowlingTeamId: undefined,
    Title: "",
    BowlingTeamPersons: [],
  };

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [printModel, setPrintModel] = useState(null);
  let copyModel = CloneObject(initModel);
  const [bowlingTeamObj, setBowlingTeamObj] = useState(copyModel);
  const [bowlingTeamPersonObj, setBowlingTeamPersonObj] = useState(
    copyModel.BowlingTeamPersons
  );
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  copyModel.BowlingTeamDateObj = initModel.BowlingTeamDateObj;

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, bowlingTeamForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.bowlingTeams.actionsLoading,
      bowlingTeamForEdit: state.bowlingTeams.bowlingTeamForEdit,
      error: state.bowlingTeams.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id) dispatch(actions.fetchBowlingTeam(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = !!id ? "" : t("Common.Create") + " " + t("BowlingTeam.Entity");

    if (bowlingTeamForEdit && id) {
      _title = t("Common.Edit") + " " + t("BowlingTeam.Entity");
      setBowlingTeamObj(bowlingTeamForEdit);
      setBowlingTeamPersonObj(bowlingTeamForEdit.BowlingTeamPersons || []);
      setEditMode(true);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bowlingTeamForEdit, id]);

  const saveBowlingTeam = (values) => {
    if (!id) {
      dispatch(actions.createBowlingTeam(values, (arg) => { }))
        .then((arg) => {
          backToBowlingTeamsList();
        })
        .catch((err) => { });
    } else {
      dispatch(actions.updateBowlingTeam(id, values))
        .then(() => backToBowlingTeamsList())
        .catch((err) => { });
    }
  };

  const btnPrintRef = createRef("1");
  const btnRefBowlingTeamPersons = createRef("2");
  const btnRef = createRef();

  const saveBowlingTeamClick = () => {
    if (btnPrintRef && btnPrintRef.current) {
      btnPrintRef.current.Collect((datas) => {
        let bowlingTeamObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              bowlingTeamObj[prop] = obj;
            }
          }
        }

        bowlingTeamObj["BowlingTeamPersons"] = [];

        btnRefBowlingTeamPersons.current.Collect((personsData) => {
          bowlingTeamObj.BowlingTeamPersons = personsData;
          saveBowlingTeam(bowlingTeamObj);
        });
      });
    }
  };

  const backToBowlingTeamsList = () => {
    history.push(`/bowling/bowlingTeams`);
  };

  return (
    <>
      {((!!id && editMode) || !!id == false) && (
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
                onClick={backToBowlingTeamsList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>
              {`  `}
              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>
              {`  `}
              <button
                type="submit"
                disabled={!!id == false}
                className="btn btn-light ml-2"
              >
                <i className="fa fa-print"></i> {t("Common.Print")}
              </button>
              {`  `}
              <button
                type="submit"
                className="btn btn-primary ml-2"
                onClick={saveBowlingTeamClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <BowlingTeamEditForm
              actionsLoading={actionsLoading}
              bowlingTeam={bowlingTeamObj}
              saveBowlingTeam={saveBowlingTeam}
              ref={btnPrintRef}
            />
            <BowlingTeamPersonsUIProvider
              currentBowlingTeamId={id}
              actionsLoading={actionsLoading}
              bowlingTeamPerson={bowlingTeamPersonObj}
              ref={btnRefBowlingTeamPersons}
            >
              <BowlingTeamPersons />
            </BowlingTeamPersonsUIProvider>
          </CardBody>
        </Card>
      )}
    </>
  );
}
