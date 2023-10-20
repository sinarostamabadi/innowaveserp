import React, { useState, useEffect } from "react";
import moment from "jalali-moment";
import "./PrintGame.css";
import { useTranslation } from "react-i18next";

export const PrintGame = React.forwardRef(({ data }, ref) => {
  const { t } = useTranslation();
  const [dataPrint, setDataPrint] = useState(data);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    setDataPrint(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div
      ref={ref}
      className={`print-part ${process.env.REACT_APP_DIR}`}
      style={{
        direction: `${process.env.REACT_APP_DIR}`,
        backgroundColor: "#fff",
        width: "100%",
        padding: "0",
        margin: 0,
      }}
    >
      <img
        alt={t("App.Name")}
        src="/media/logos/logo-black.png"
        style={{ height: "300px", display: "block", margin: "1rem auto" }}
      />

      <div
        style={{ borderTop: "3px solid #000", borderBottom: "3px solid #000" }}
      >
        <h3 className="text-center py-2">
          {t("App.BowlingSalon")}
        </h3>
      </div>
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <b>{t("BowlingReserve.Date")}:</b>
              </td>
              <td>
                {!!dataPrint == true
                  ? moment(dataPrint.CreationDate)
                      .locale(process.env.REACT_APP_DATE)
                      .format("YYYY/MM/DD")
                  : ""}
              </td>
            </tr>
            <tr>
              <td>
                <b>{t("BowlingReserve.Hour")}:</b>
              </td>
              <td>
                {!!dataPrint == true
                  ? moment(dataPrint.CreationDate)
                      .locale(process.env.REACT_APP_DATE)
                      .format("HH:mm") + " " + 
                    (moment(dataPrint.CreationDate).locale(process.env.REACT_APP_DATE).format("HH") >=
                    12
                      ? t("Time.PM")
                      : t("Time.AM"))
                  : ""}
              </td>
            </tr>
            <tr>
              <td>
                <b>{t("BowlingReserve.ClosetNumber")}:</b>
              </td>
              <td>{!!dataPrint == true ? dataPrint.ClosetNumber : ""}</td>
            </tr>
            <tr>
              <td>
                <b>{t("BowlingReserve.Customer")}:</b>
              </td>
              <td>
                {!!dataPrint == true && !!dataPrint.Person == true
                  ? dataPrint.Person.FullNameFa
                  : t("Common.PublicCustomer")}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                className="position-relative"
                style={{ height: "30px" }}
              ></td>
            </tr>
            <tr>
              <td colSpan="2" className="position-relative">
                <img
                  alt=""
                  src="/media/bg/back-dark.jpg"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: 0,
                    height: "100%",
                    width: "100%",
                    zIndex: 0,
                  }}
                />

                <table
                  className="table table-bordered lines m-0"
                  style={{
                    width: "100%",
                    zIndex: 10,
                    position: "relative",
                  }}
                >
                  <thead>
                    <tr className="text-white text-center">
                      <th
                        className="text-white"
                        style={{ position: "relative", height: "200px" }}
                      >
                        <div
                          style={{
                            transform: "rotate(-90deg)",
                            color: "#fff",
                            width: "195px",
                            textAlign: "left",
                            position: "absolute",
                            top: "60px",
                            right: "-6rem",
                          }}
                        >
                          Ball
                        </div>
                      </th>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <th
                            className="text-white"
                            style={{ position: "relative", height: "200px" }}
                          >
                            <div
                              style={{
                                transform: "rotate(-90deg)",
                                color: "#fff",
                                width: "195px",
                                textAlign: "left",
                                position: "absolute",
                                top: "60px",
                                right: "-6rem",
                              }}
                            >
                              {x.Person.FullNameEn}
                            </div>
                          </th>
                        ))}
                      {/* <th className="text-white" style={{position: "relative", height: "200px"}}>
                        <div style={{transform: "rotate(-90deg)", color: "#fff", width: "195px", textAlign: "left", position: "absolute", top: "60px", left: "0", right: "0"}}>تاریخ</div>
                      </th>
                      <th className="text-white" style={{position: "relative", height: "200px"}}>
                        <div style={{transform: "rotate(-90deg)", color: "#fff", width: "195px", textAlign: "left", position: "absolute", top: "60px", left: "0", right: "0"}}>از ساعت</div>
                      </th>
                      <th className="text-white" style={{position: "relative", height: "200px"}}>
                        <div style={{transform: "rotate(-90deg)", color: "#fff", width: "195px", textAlign: "left", position: "absolute", top: "60px", left: "0", right: "0"}}>تا ساعت</div>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "white" }}>
                    <tr>
                      <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                        1
                      </td>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball1Set1}</td>
                        ))}
                    </tr>
                    <tr>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball2Set1}</td>
                        ))}
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                        2
                      </td>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball1Set2}</td>
                        ))}
                    </tr>
                    <tr>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball2Set2}</td>
                        ))}
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                        3
                      </td>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball1Set3}</td>
                        ))}
                    </tr>
                    <tr>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball2Set3}</td>
                        ))}
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                        4
                      </td>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball1Set4}</td>
                        ))}
                    </tr>
                    <tr>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball2Set4}</td>
                        ))}
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                        5
                      </td>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball1Set5}</td>
                        ))}
                    </tr>
                    <tr>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball2Set5}</td>
                        ))}
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                        6
                      </td>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball1Set6}</td>
                        ))}
                    </tr>
                    <tr>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball2Set6}</td>
                        ))}
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                        7
                      </td>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball1Set7}</td>
                        ))}
                    </tr>
                    <tr>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball2Set7}</td>
                        ))}
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                        8
                      </td>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball1Set8}</td>
                        ))}
                    </tr>
                    <tr>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball2Set8}</td>
                        ))}
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                        9
                      </td>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball1Set9}</td>
                        ))}
                    </tr>
                    <tr>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball2Set9}</td>
                        ))}
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                        10
                      </td>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball1Set10}</td>
                        ))}
                    </tr>
                    <tr>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball2Set10}</td>
                        ))}
                    </tr>
                    <tr>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.Ball3Set10}</td>
                        ))}
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ verticalAlign: "middle" }}>
                        کل
                      </td>
                      {!!dataPrint == true &&
                        dataPrint.ReservePersonScores.map((x) => (
                          <td className="pl-1">{x.TotalScore}</td>
                        ))}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className="bg-black bg-dark">
              <td colSpan="2" className="text-center position-relative">
                <img
                  alt=""
                  src="/media/bg/back-dark.jpg"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: 0,
                    height: "100%",
                    width: "100%",
                    zIndex: 0,
                  }}
                />

                <table
                  className="text-white position-relative"
                  style={{ backgroundColor: "trasparent", zIndex: 10 }}
                >
                  <tbody>
                    <tr>
                      <td
                        className="text-center dark"
                        style={{ color: "#fff" }}
                      >
                        {process.env.REACT_APP_SHOWADDRESSINPRINT == "1" && (
                          <>
                            {process.env.REACT_APP_ADDRESS}
                            <br />
                            {t("Common.Phone")}: {process.env.REACT_APP_PHONE}
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="text-center">
                RoshaSoft.ir
                <br />
                We Provide way to do it
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});
