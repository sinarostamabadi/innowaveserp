/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import moment from "jalali-moment";
import { useTranslation } from "react-i18next";
import {
  getActiveReserveByLine,
  getReserveById,
} from "../../../_redux/reserves/reservesCrud";
import { Row, Col, Card } from "react-bootstrap";
import "./Score.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import axios from "axios";

export function ReserveEditScore({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const [reserve, setReserve] = useState(null);
  const [activePerson, setActivePerson] = useState(0);
  const [activeSet, setActiveSet] = useState(1);
  const [winer, setWiner] = useState(null);
  const [lastShoot, setLastShoot] = useState({
    ReservePersonScoreId: -1,
    personId: -1,
    set: 0,
    ball: 0,
    roll: 0,
    value: -1,
  });
  const handle = useFullScreenHandle();

  useEffect(() => {
    getReserveById(id).then((x) => {
      setReserve(x.data);

      if (!!x.data) {
        let lastShot = {
          personId: -1,
          set: 0,
          ball: 0,
          roll: 0,
          value: -1,
        };
        let loger = x.data.ReservePersonScores.map((rp, i) => {
          for (let index = 1; index < 11; index++) {
            let ball1 = {
              ReservePersonScoreId: rp.ReservePersonScoreId,
              personId: -1,
              set: 0,
              ball: 1,
              roll: 0,
              value: -1,
            };
            let ball2 = {
              ReservePersonScoreId: rp.ReservePersonScoreId,
              personId: -1,
              set: 0,
              ball: 2,
              roll: 0,
              value: -1,
            };
            ball1.personId = rp.PersonId;
            ball1.set = index;
            ball1.roll = (index - 1) * 2 + ball1.ball;
            ball1.value = rp[`Ball${ball1.ball}Set${ball1.set}`];

            ball2.personId = rp.PersonId;
            ball2.set = index;
            ball2.roll = (index - 1) * 2 + ball2.ball;
            ball2.value = rp[`Ball${ball2.ball}Set${ball2.set}`];

            if (
              (ball1.value != null && lastShot.roll < ball1.roll) ||
              (ball1.value != null &&
                lastShot.roll == ball1.roll &&
                lastShot.ReservePersonScoreId < ball1.ReservePersonScoreId)
            )
              lastShot = ball1;
            if (
              (ball2.value != null && lastShot.roll < ball2.roll) ||
              (ball2.value != null &&
                lastShot.roll == ball2.roll &&
                lastShot.ReservePersonScoreId < ball2.ReservePersonScoreId)
            )
              lastShot = ball2;
          }
        });
        setLastShoot(lastShot);

        let persons = x.data.ReservePersonScores.map((rp) => ({
          PersonId: rp.PersonId,
          Score: 0,
        }));
        for (let index = 1; index < 11; index++) {
          persons = persons.map((p) => {
            const curScore = x.data.ReservePersonScores.filter((rp) => {
              return rp.PersonId == p.PersonId;
            })[0][`Set${index}Score`];
            return { PersonId: p.PersonId, Score: p.Score + +curScore };
          });

          if (
            x.data.ReservePersonScores.some(
              (x) => x["Ball2Set" + index] == null
            )
          ) {
            setActiveSet(index);
            setActivePerson(
              x.data.ReservePersonScores.filter(
                (x) => x["Ball2Set" + index] == null
              )
            );

            break;
          }
        }

        const maxScore = persons.reduce((p, c) => (p.Score > c.Score ? p : c));
        if (!!maxScore) setWiner(maxScore.PersonId);
        else setWiner(null);
      } else {
        setActivePerson(0);
        setActiveSet(1);
        setWiner(null);
      }
    });
  }, []);

  function updateScore(values) {
    axios.post("/Reserve/UpdateScore", {
      ReservePersonScoreId: lastShoot.ReservePersonScoreId,
      RollId: lastShoot.roll,
      Score: +values.target.value,
    });
  }

  function getEditShow(obj, set, ball) {
    if (lastShoot.personId == -1) return "";

    if (
      lastShoot.personId == obj.PersonId &&
      lastShoot.set == set &&
      lastShoot.ball == ball
    )
      return (
        <select defaultValue={lastShoot.value} onChange={updateScore}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      );
    else return obj[`Ball${ball}Set${set}`];
  }

  return (
    <FullScreen handle={handle}>
      <Card
        style={{
          height: "100%",
          backgroundImage: "url(/media/bg/bowling-score.jpg)",
          backgroundSize: "cover",
        }}
      >
        <Card.Header
          className="p-5 text-white"
          style={{ background: "transparent" }}
        >
          <Row>
            <Col xs="3">
              <Card.Title className="m-0">
                {t("BowlingReserve.CountingPoints")} «
                {!!reserve && reserve.Line.Title}»
                <br />
                <div style={{ fontSize: "1.1rem", marginTop: "1rem" }}>
                  <b>{t("BowlingReserve.FromTime")}: </b>
                  {!!reserve && reserve.FromTime.substr(0, 5)}
                </div>
                <div style={{ fontSize: "1.1rem" }}>
                  <b>{t("BowlingReserve.ToTime")}: </b>
                  {!!reserve && reserve.ToTime.substr(0, 5)}
                </div>
              </Card.Title>
            </Col>
            <Col xs="6" className="pt-5 text-center">
              <h1>
                {(!!activePerson &&
                  activePerson.length &&
                  activePerson[0].Person.FullNameEn) ||
                  (!!activePerson == false &&
                    !!reserve &&
                    reserve.ReservePersonScores[0].Person.FullNameEn)}
              </h1>
            </Col>
            <Col xs="3">
              {!handle.active && (
                <button
                  className="btn btn-outline-primary"
                  style={{ float: "left" }}
                  onClick={handle.enter}
                >
                  <i className="fas fa-window-maximize p-0"></i>
                </button>
              )}
              {handle.active && (
                <button
                  className="btn btn-outline-primary"
                  style={{ float: "left" }}
                  onClick={handle.exit}
                >
                  <i className="fas fa-window-minimize p-0"></i>
                </button>
              )}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-5">
          <Row>
            <Col xs={12}>
              <table className="table scores ltr">
                <thead className="">
                  <tr>
                    <th className="text-center">
                      <div>Player</div>
                    </th>
                    <th className="text-center" style={{ width: "70px" }}>
                      <div className={1 == activeSet ? "active" : ""}>1</div>
                    </th>
                    <th className="text-center" style={{ width: "70px" }}>
                      <div className={2 == activeSet ? "active" : ""}>2</div>
                    </th>
                    <th className="text-center" style={{ width: "70px" }}>
                      <div className={3 == activeSet ? "active" : ""}>3</div>
                    </th>
                    <th className="text-center" style={{ width: "70px" }}>
                      <div className={4 == activeSet ? "active" : ""}>4</div>
                    </th>
                    <th className="text-center" style={{ width: "70px" }}>
                      <div className={5 == activeSet ? "active" : ""}>5</div>
                    </th>
                    <th className="text-center" style={{ width: "70px" }}>
                      <div className={6 == activeSet ? "active" : ""}>6</div>
                    </th>
                    <th className="text-center" style={{ width: "70px" }}>
                      <div className={7 == activeSet ? "active" : ""}>7</div>
                    </th>
                    <th className="text-center" style={{ width: "70px" }}>
                      <div className={8 == activeSet ? "active" : ""}>8</div>
                    </th>
                    <th className="text-center" style={{ width: "70px" }}>
                      <div className={9 == activeSet ? "active" : ""}>9</div>
                    </th>
                    <th className="text-center" style={{ width: "105px" }}>
                      <div className={10 == activeSet ? "active" : ""}>10</div>
                    </th>
                    <th className="text-center" style={{ width: "70px" }}>
                      <div>Total</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {!!reserve &&
                    reserve.ReservePersonScores.map((x, i) => (
                      <tr
                        key={x.PersonId}
                        className={
                          (!!activePerson &&
                            activePerson.length &&
                            activePerson[0].PersonId == x.PersonId) ||
                          (!!activePerson == false && i == 0)
                            ? "active"
                            : ""
                        }
                      >
                        <td
                          className={
                            x.Person.RealPerson.GenderId == 1
                              ? "man" + " box-name"
                              : "woman" + " box-name"
                          }
                        >
                          {winer == x.PersonId && (
                            <i
                              className="fas fa-crown ml-2"
                              style={{ color: "yellow" }}
                            ></i>
                          )}
                          {x.Person.FullNameEn || x.Person.FullNameFa}
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {getEditShow(x, 1, 1)}
                            </div>
                            <div className="float-right set-box-50-2">
                              {getEditShow(x, 1, 2)}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set1Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {getEditShow(x, 2, 1)}
                            </div>
                            <div className="float-right set-box-50-2">
                              {getEditShow(x, 2, 2)}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set2Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {getEditShow(x, 3, 1)}
                            </div>
                            <div className="float-right set-box-50-2">
                              {getEditShow(x, 3, 2)}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set3Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {getEditShow(x, 4, 1)}
                            </div>
                            <div className="float-right set-box-50-2">
                              {getEditShow(x, 4, 2)}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set4Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {getEditShow(x, 5, 1)}
                            </div>
                            <div className="float-right set-box-50-2">
                              {getEditShow(x, 5, 2)}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set5Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {getEditShow(x, 6, 1)}
                            </div>
                            <div className="float-right set-box-50-2">
                              {getEditShow(x, 6, 2)}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set6Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {getEditShow(x, 7, 1)}
                            </div>
                            <div className="float-right set-box-50-2">
                              {getEditShow(x, 7, 2)}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set7Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {getEditShow(x, 8, 1)}
                            </div>
                            <div className="float-right set-box-50-2">
                              {getEditShow(x, 8, 2)}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set8Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {getEditShow(x, 9, 1)}
                            </div>
                            <div className="float-right set-box-50-2">
                              {getEditShow(x, 9, 2)}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set9Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-1">
                              {getEditShow(x, 10, 1)}
                            </div>
                            <div className="float-right set-box-2">
                              {getEditShow(x, 10, 2)}
                            </div>
                            <div className="float-right set-box-3">
                              {getEditShow(x, 10, 3)}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set10Score}</div>
                          </div>
                        </td>
                        <td className="total-score">{x.TotalScore}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FullScreen>
  );
}
