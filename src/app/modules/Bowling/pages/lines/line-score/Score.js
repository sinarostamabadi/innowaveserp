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

export function Score({
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
  const [wallpaper, setWallpaper] = useState();
  const [banner, setBanner] = useState();
  const handle = useFullScreenHandle();

  //   https://murreybowling.com/products/amazing-full-color-digital-graphics/

  // Salvaged
  // Bowling Club
  // One Man Band
  // Paints
  // Pins
  // Signs
  // Sleeper
  // Stencil 1
  // Sugar Skulls
  // Totally Rad
  // Urban Art
  // Wall
  // Wallpaper
  // Wings

  const backgrounds = [
    "bowling-score.jpg",
    "Salvaged.jpg",
    "Bowling-Club.jpg",
    "One-Man-Band.jpg",
    "Paints.jpg",
    "Pins.jpg",
    "Signs.jpg",
    "Sleeper.jpg",
    "Stencil.jpg",
    "Sugar-Skulls.jpg",
    "Totally-rad.jpg",
    "Urban-Art.jpg",
    "Wall.jpg",
    "Wallpaper.jpg",
    "Wings.jpg",
  ];
  
  const intros = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    // "05.jpg",
    // "06.jpg",
    // "07.jpg",
    // "08.jpg",
    // "09.jpg",
    // "10.jpg",
  ];

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getWallpaper(type) {
    return !!type? 
    "/media/bg/" + backgrounds[getRandomInt(0, backgrounds.length-1)]: 
    "/media/modules/bowling/sliders/" + intros[getRandomInt(0, intros.length-1)];
  }
  
  useEffect(() => {
    setWallpaper(getWallpaper(1));
    setBanner(getWallpaper(0));
    
    const interval2 = setInterval(() => {
      setWallpaper(getWallpaper(1));
      setBanner(getWallpaper(0));
    }, 30000);
    
    return () => {
      clearInterval(interval2);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getActiveReserveByLine(id).then((x) => {
        setReserve(x.data.Items[0] ?? null);

        if (!!x.data.Items[0]) {
          let persons = x.data.Items[0].ReservePersonScores.map((rp) => ({
            PersonId: rp.PersonId,
            Score: 0,
          }));
          for (let index = 1; index < 11; index++) {
            persons = persons.map((p) => {
              const curScore = x.data.Items[0].ReservePersonScores.filter(
                (rp) => {
                  return rp.PersonId == p.PersonId;
                }
              )[0][`Set${index}Score`];
              return { PersonId: p.PersonId, Score: p.Score + +curScore };
            });

            if (
              x.data.Items[0].ReservePersonScores.some(
                (x) =>
                  (index == 10
                    ? x["Ball3Set" + index]
                    : x["Ball2Set" + index]) == null
              )
            ) {
              setActiveSet(index);
              setActivePerson(
                x.data.Items[0].ReservePersonScores.filter(
                  (x) =>
                    (index == 10
                      ? x["Ball3Set" + index]
                      : x["Ball2Set" + index]) == null
                )
              );

              break;
            }
          }
          

          const maxScore = x.data.Items[0].ReservePersonScores.filter((x) => x.IsMaxScore);

          if (!!maxScore && maxScore.length > 0) setWiner(maxScore[0].PersonId);
          else setWiner(null);
        } else {
          setActivePerson(0);
          setActiveSet(1);
          setWiner(null);
        }
      });
    }, 3000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // const [background]

  return (
    <FullScreen handle={handle}>
      <Card
        style={{
          height: "100%",
          backgroundImage: `url(${!!reserve? wallpaper: banner})`,
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
                {!!reserve && t("BowlingReserve.CountingPoints") + " «" + reserve.Line.Title + "»"}
                <br />
                <div style={{ fontSize: "1.1rem", marginTop: "1rem" }}>
                  {!!reserve && (
                    <>
                      <b>{t("BowlingReserve.FromTime")}: </b>
                      {reserve.FromTime.substr(0, 5)}
                    </>
                  )}
                </div>
                <div style={{ fontSize: "1.1rem" }}>
                  {!!reserve && (
                    <>
                      <b>{t("BowlingReserve.ToTime")}: </b>
                      {!!reserve && reserve.ToTime.substr(0, 5)}
                    </>
                  )}
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
        {reserve != null && (
          <>
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
                          <div className={1 == activeSet ? "active" : ""}>
                            1
                          </div>
                        </th>
                        <th className="text-center" style={{ width: "70px" }}>
                          <div className={2 == activeSet ? "active" : ""}>
                            2
                          </div>
                        </th>
                        <th className="text-center" style={{ width: "70px" }}>
                          <div className={3 == activeSet ? "active" : ""}>
                            3
                          </div>
                        </th>
                        <th className="text-center" style={{ width: "70px" }}>
                          <div className={4 == activeSet ? "active" : ""}>
                            4
                          </div>
                        </th>
                        <th className="text-center" style={{ width: "70px" }}>
                          <div className={5 == activeSet ? "active" : ""}>
                            5
                          </div>
                        </th>
                        <th className="text-center" style={{ width: "70px" }}>
                          <div className={6 == activeSet ? "active" : ""}>
                            6
                          </div>
                        </th>
                        <th className="text-center" style={{ width: "70px" }}>
                          <div className={7 == activeSet ? "active" : ""}>
                            7
                          </div>
                        </th>
                        <th className="text-center" style={{ width: "70px" }}>
                          <div className={8 == activeSet ? "active" : ""}>
                            8
                          </div>
                        </th>
                        <th className="text-center" style={{ width: "70px" }}>
                          <div className={9 == activeSet ? "active" : ""}>
                            9
                          </div>
                        </th>
                        <th className="text-center" style={{ width: "105px" }}>
                          <div className={10 == activeSet ? "active" : ""}>
                            10
                          </div>
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
                                <i className="crown fas fa-crown ml-2"></i>
                              )}
                              {x.Person.FullNameEn || x.Person.FullNameFa}
                            </td>
                            <td>
                              <div className="d-inline-block set-box">
                                <div className="float-right set-box-50">
                                  {x.Ball1Set1}
                                </div>
                                <div className="float-right set-box-50-2">
                                  {x.Ball2Set1}
                                </div>
                                <div className="clearfix"></div>
                                <div className="set-box-total">
                                  {x.Set1Score}
                                </div>
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
                                <div className="set-box-total">
                                  {x.Set2Score}
                                </div>
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
                                <div className="set-box-total">
                                  {x.Set3Score}
                                </div>
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
                                <div className="set-box-total">
                                  {x.Set4Score}
                                </div>
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
                                <div className="set-box-total">
                                  {x.Set5Score}
                                </div>
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
                                <div className="set-box-total">
                                  {x.Set6Score}
                                </div>
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
                                <div className="set-box-total">
                                  {x.Set7Score}
                                </div>
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
                                <div className="set-box-total">
                                  {x.Set8Score}
                                </div>
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
                                <div className="set-box-total">
                                  {x.Set9Score}
                                </div>
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
                                <div className="set-box-total">
                                  {x.Set10Score}
                                </div>
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
          </>
        )}
      </Card>
    </FullScreen>
  );
}
