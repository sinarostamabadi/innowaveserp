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

export function ReserveScore({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const [reserve, setReserve] = useState(null);
  const [activePerson, setActivePerson] = useState(null);
  const [activeSet, setActiveSet] = useState(1);
  const [winer, setWiner] = useState(null);
  const handle = useFullScreenHandle();

  useEffect(() => {
      getReserveById(id).then((x) => {
        setReserve(x.data);
        
        if (!!x.data && !!x.data.ReservePersonScores && x.data.ReservePersonScores.length) {
          let persons = x.data.ReservePersonScores.map(rp=> ({PersonId: rp.PersonId, Score: 0}));
          for (let index = 1; index < 11; index++) {
            persons = persons.map(p=> {
              const curScore = x.data.ReservePersonScores.filter(rp => {
                return rp.PersonId == p.PersonId
              })[0][`Set${index}Score`];
              return {PersonId: p.PersonId, Score: p.Score + (+curScore)};
            });


            if (
              index < 10 && x.data.ReservePersonScores.some(
                (x) => x["Ball2Set" + index] == null
              )
            ) {
              setActiveSet(index);
              setActivePerson(
                x.data.ReservePersonScores.filter(
                  (x) => x["Ball2Set" + index] == null
                )[0]
              );

              break;
            }

            if (
              index == 10 && x.data.ReservePersonScores.some(
                (x) => x["Ball3Set" + index] == null
              )
            ) {
              setActiveSet(index);
              setActivePerson(
                x.data.ReservePersonScores.filter(
                  (x) => x["Ball3Set" + index] == null
                )[0]
              );

              break;
            }
          }


          const maxScore = persons.reduce((p, c) => p.Score > c.Score ? p : c);
          if(!!maxScore) setWiner(maxScore.PersonId);
          else setWiner(null);
        }
        else {
          setActivePerson(null);
          setActiveSet(1);
          setWiner(null);
        }
      });
  }, []);
console.log("activePerson > ", activePerson);
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
              {t("BowlingReserve.CountingPoints")} «{!!reserve && reserve.Line.Title}»
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
                {!!activePerson? activePerson.Person.FullNameEn: ""}
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
                  {!!reserve && reserve.ReservePersonScores && reserve.ReservePersonScores.length && 
                    reserve.ReservePersonScores.map((x, i) => (
                      <tr
                        key={x.PersonId}
                        className={
                          (!!activePerson && activePerson.length > 0 &&
                            activePerson.PersonId == x.PersonId)
                            ? "active"
                            : ""
                        }
                      >
                        <td className={
                          x.Person.RealPerson.GenderId == 1 ? "man" + " box-name"
                            : "woman" + " box-name"
                        }>{winer == x.PersonId && (
                          <i className="fas fa-crown ml-2" style={{color: "yellow"}}></i>
                        )}{x.Person.FullNameEn || x.Person.FullNameFa}</td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {x.Ball1Set1}
                            </div>
                            <div className="float-right set-box-50-2">
                              {x.Ball2Set1}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set1Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {x.Ball1Set2}
                            </div>
                            <div className="float-right set-box-50-2">
                              {x.Ball2Set2}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set2Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {x.Ball1Set3}
                            </div>
                            <div className="float-right set-box-50-2">
                              {x.Ball2Set3}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set3Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {x.Ball1Set4}
                            </div>
                            <div className="float-right set-box-50-2">
                              {x.Ball2Set4}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set4Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {x.Ball1Set5}
                            </div>
                            <div className="float-right set-box-50-2">
                              {x.Ball2Set5}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set5Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {x.Ball1Set6}
                            </div>
                            <div className="float-right set-box-50-2">
                              {x.Ball2Set6}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set6Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {x.Ball1Set7}
                            </div>
                            <div className="float-right set-box-50-2">
                              {x.Ball2Set7}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set7Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {x.Ball1Set8}
                            </div>
                            <div className="float-right set-box-50-2">
                              {x.Ball2Set8}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set8Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-50">
                              {x.Ball1Set9}
                            </div>
                            <div className="float-right set-box-50-2">
                              {x.Ball2Set9}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set9Score}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block set-box">
                            <div className="float-right set-box-1">
                              {x.Ball1Set10}
                            </div>
                            <div className="float-right set-box-2">
                              {x.Ball2Set10}
                            </div>
                            <div className="float-right set-box-3">
                              {x.Ball3Set10}
                            </div>
                            <div className="clearfix"></div>
                            <div className="set-box-total">{x.Set10Score}</div>
                          </div>
                        </td>
                        <td className="total-score">
                          {x.TotalScore}
                        </td>
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
