import React, { useState, useEffect } from "react";
import moment from "jalali-moment";
import "./Print.css";
import { useTranslation } from "react-i18next";

export const PrintReserve = React.forwardRef(({ data }, ref) => {
  const { t } = useTranslation();
  const [dataPrint, setDataPrint] = useState(data);
  function numberWithCommas(x) {
    if (!!x == false) return "";
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
        <h3 className="text-center py-2">{t("App.BowlingSalon")}</h3>
      </div>
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td style={{ width: "300px" }}>
                <b>{t("BowlingReserve.Number")}:</b>
              </td>
              <td>{!!dataPrint == true ? dataPrint.ReserveId : ""}</td>
            </tr>
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
                      .format("HH:mm") +
                    " " +
                    (moment(dataPrint.CreationDate)
                      .locale(process.env.REACT_APP_DATE)
                      .format("HH") >= 12
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
                      <th className="text-white">{t("BowlingReserve.Line")}</th>
                      <th className="text-white">{t("BowlingReserve.Date")}</th>
                      <th className="text-white">
                        {t("BowlingReserve.FromTime")}
                      </th>
                      <th className="text-white">
                        {t("BowlingReserve.ToTime")}
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "white" }}>
                    <tr>
                      <td className="text-center pr-3">
                        {!!dataPrint == true && !!dataPrint.Line
                          ? dataPrint.Line.Title
                          : ""}
                      </td>
                      <td className="text-center pr-3">
                        {!!dataPrint == true
                          ? moment(dataPrint.ReserveDate)
                              .locale(process.env.REACT_APP_DATE)
                              .format("YYYY/MM/DD")
                          : ""}
                      </td>
                      <td className="text-center pr-3">
                        {!!dataPrint && !!dataPrint.FromTime
                          ? dataPrint.FromTime.substring(0, 5)
                          : ""}
                      </td>
                      <td className="text-center pr-3">
                        {!!dataPrint && dataPrint.ToTime
                          ? dataPrint.ToTime.substring(0, 5)
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className="position-relative">
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
                  className="text-white "
                  style={{
                    width: "100%",
                    zIndex: 10,
                    position: "relative",
                    backgroundColor: "transparent",
                    color: "#fff",
                  }}
                >
                  <tbody>
                    <tr>
                      <td className="text-center dark">
                        {t("BowlingReserve.FactorPrice")}
                      </td>
                      <td className="text-center">
                        <strong className="dark" style={{ fontSize: "2.2rem" }}>
                          {!!dataPrint == true
                            ? numberWithCommas(dataPrint.PayablePrice) +
                              t("App.MoneySign")
                            : ""}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <br />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <br />
                {t("BowlingReserve.NoteTheAnnouncedTimeIsApproximate")}
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
