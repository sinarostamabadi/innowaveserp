import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/bowlingCompetitions/bowlingCompetitionsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { BowlingCompetitionEditForm } from "./BowlingCompetitionEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "../../../../../../core/_helpers/Print";
import { useTranslation } from "react-i18next";
import { GroupsUIProvider } from "../bowlingCompetitions-groups/GroupsUIContext";
import { Groups } from "../bowlingCompetitions-groups/Groups";
import {
  EnToFaObjDate,
  CloneObject,
  getStorage,
} from "../../../../../../core/_helpers";
import moment from "jalali-moment";

export function BowlingCompetitionEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const initModel = {
    BowlingCompetitionId: undefined,
    Title: "",
    BowlingCompetitionGroups: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [bowlingCompetitionObj, setBowlingCompetitionObj] = useState(copyModel);
  const [bowlingCompetitionDtlObj, setBowlingCompetitionGroupObj] = useState(
    copyModel.BowlingCompetitionGroups
  );

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, bowlingCompetitionForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.bowlingCompetitions.actionsLoading,
      bowlingCompetitionForEdit:
        state.bowlingCompetitions.bowlingCompetitionForEdit,
      error: state.bowlingCompetitions.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchBowlingCompetition(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("BowlingCompetition.Entity");

    if (
      bowlingCompetitionForEdit &&
      id &&
      bowlingCompetitionForEdit.BowlingCompetitionId == id
    ) {
      _title =
        t("Common.Edit") +
        " " +
        t("BowlingCompetition.Entity") +
        " «" +
        bowlingCompetitionForEdit.Title +
        "»";

      setBowlingCompetitionObj(bowlingCompetitionForEdit);
      setBowlingCompetitionGroupObj(
        bowlingCompetitionForEdit.BowlingCompetitionGroups
      );
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bowlingCompetitionForEdit, id]);

  const saveBowlingCompetition = (values) => {
    if (!id) {
      dispatch(
        actions.createBowlingCompetition(values, () => {
          backToBowlingCompetitionsList();
        })
      )
        .then((arg) => {
          backToBowlingCompetitionsList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateBowlingCompetition(id, values, () => {
          backToBowlingCompetitionsList();
        })
      )
        .then(() => backToBowlingCompetitionsList())
        .catch((err) => {});
    }
  };

  const btnRefBowlingCompetition = useRef("1");
  const btnRefGroups = useRef("2");

  const saveBowlingCompetitionClick = () => {
    if (btnRefBowlingCompetition && btnRefBowlingCompetition.current) {
      btnRefBowlingCompetition.current.Collect((datas) => {
        let bowlingCompetitionObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              bowlingCompetitionObj[prop] = obj;
            }
          }
        }
        bowlingCompetitionObj["BowlingCompetitionGroups"] = [];

        btnRefGroups.current.Collect((groupsData) => {
          bowlingCompetitionObj.BowlingCompetitionGroups = groupsData;
          saveBowlingCompetition(bowlingCompetitionObj);
        });
      });
    }
  };

  const backToBowlingCompetitionsList = () => {
    history.push(`/bowling/bowlingCompetitions`);
  };

  return (
    <>
      {((!!id && !!bowlingCompetitionObj.BowlingCompetitionId) ||
        !!id == false) && (
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
                onClick={backToBowlingCompetitionsList}
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
                onClick={saveBowlingCompetitionClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <BowlingCompetitionEditForm
              actionsLoading={actionsLoading}
              bowlingCompetition={bowlingCompetitionObj}
              ref={btnRefBowlingCompetition}
            />
            <GroupsUIProvider
              currentBowlingCompetitionId={id}
              actionsLoading={actionsLoading}
              group={bowlingCompetitionDtlObj}
              ref={btnRefGroups}
            >
              <Groups />
            </GroupsUIProvider>
          </CardBody>
        </Card>
      )}
    </>
  );
}
