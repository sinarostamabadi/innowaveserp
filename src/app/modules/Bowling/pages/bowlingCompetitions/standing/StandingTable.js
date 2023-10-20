import React, { useEffect, useState, useRef } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { getBowlingCompetitionById } from "../../../_redux/bowlingCompetitions/bowlingCompetitionsCrud";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { useSubheader } from "../../../../../../core/layout";
import { useTranslation } from "react-i18next";
import "./StandingTable.css";

export function StandingTable({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [bowlingCompetitionObj, setBowlingCompetitionObj] = useState(null);
  const [grouped, setGrouped] = useState(null);

  useEffect(() => {
    if (id)
      getBowlingCompetitionById(id).then(({ data }) => {
        setBowlingCompetitionObj(data);
        setGrouped(
          _.groupBy(
            data.BowlingCompetitionNationalCups,
            (x) => x.CompetitionLevel
          )
        );

        let _title = data.Title;

        setTitle(_title);
        suhbeader.setTitle(_title);
      });
  }, [id, dispatch]);

  const backToBowlingCompetitionsList = () => {
    history.push(`/bowling/bowlingCompetitions`);
  };

  function showGroups() {
      let levels = [];

    for (const key in grouped) {
      if (Object.hasOwnProperty.call(grouped, key)) {
        const group = grouped[key];
        levels.push(
            <Tab eventKey={"Level" + (+key)} title={"مرحله " + (+key + 1)} className="nav-item">
                {
                    group.map(g => 
                <Row className="my-3">
                    <Col className="col text-right">
                        {!!g.BowlingCompetitionGroupTeamA && g.BowlingCompetitionGroupTeamA.BowlingTeam.Title} - {g.ScoreA}
                    </Col>
                    <Col className="col-auto text-center"> X </Col>
                    <Col className="col text-left">
                    {g.ScoreB} - {!!g.BowlingCompetitionGroupTeamB && g.BowlingCompetitionGroupTeamB.BowlingTeam.Title}
                    </Col>
                </Row>  
                        )
                }
            </Tab>
        )
      }
    }

    return levels;
  }

  return (
    <>
      <Card>
        <CardHeader title={title}>
          <CardHeaderToolbar>
            <button
              type="button"
              onClick={backToBowlingCompetitionsList}
              className="btn btn-light"
            >
              <i className="fa fa-arrow-left"></i> {t("Common.Back")}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Tabs
            defaultActiveKey="groupStage"
            transition={false}
            className="nav nav-tabs nav-tabs-line"
          >
            <Tab eventKey="groupStage" title="مرحله گروهی" className="nav-item">
              <div className="row mt-3">
                {bowlingCompetitionObj &&
                  bowlingCompetitionObj.BowlingCompetitionGroups.map((x) => (
                    <div className="col">
                      <table className="table table-bordered table-striped">
                        <caption>{x.Title}</caption>
                        <thead>
                          <tr>
                            <th>رتبه</th>
                            <th>تیم</th>
                            <th>{t("Common.Score")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {x.BowlingCompetitionGroupTeams.map((t, i) => 
                            <tr>
                              <td>{i + 1}</td>
                              <td>{t.BowlingTeam.Title}</td>
                              <td>{t.Score}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ))}
              </div>
            </Tab>
            {showGroups()}
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}
