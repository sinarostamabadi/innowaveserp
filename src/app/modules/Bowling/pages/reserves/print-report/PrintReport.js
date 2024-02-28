import React, { useState, useEffect } from "react";
import _ from "lodash";
import { numberWithCommas } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";

export const PrintReport = React.forwardRef(({ data }, ref) => {
  const { t } = useTranslation();
  const [dataPrint, setDataPrint] = useState(data);

  useEffect(() => {
    if (!!data) {
      setDataPrint(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div ref={ref}>
        <div
          className="bill rtl"
          style={{
            direction: "rtl",
            backgroundColor: "#fff",
            width: "100%",
            padding: "0",
            margin: "0",
            paddingTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          <h4
            className="text-center"
            style={{
              borderTop: "3px solid #000",
              borderBottom: "3px solid #000",
            }}
          >
            {t("Reports.BowlingInvoiceCash") + " "}
            {!!dataPrint && !!dataPrint.Param ? dataPrint.Param.Title : ""}
          </h4>
          <div>
            <table className="table" style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td className="head" style={{ textAlign: "center" }}>
                    <b>{t("Reports.FromDate")}:</b>{" "}
                    {!!dataPrint && !!dataPrint.Param
                      ? !!dataPrint.Param.FromDate
                        ? dataPrint.Param.FromDate
                        : " "
                      : ""}
                  </td>
                  <td className="head">
                    <b>{t("Reports.FromDate")}:</b>{" "}
                    {!!dataPrint && !!dataPrint.Param
                      ? !!dataPrint.Param.ToDate
                        ? dataPrint.Param.ToDate
                        : ""
                      : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {!!dataPrint && dataPrint.FactorItems.length > 0 && (
          <div
            className="bill rtl"
            style={{
              direction: "rtl",
              backgroundColor: "#fff",
              width: "100%",
              padding: "0",
              margin: "0",
              paddingTop: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <table className="table" style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td colSpan="3" className="bg-black">
                      <table
                        className="table table-bordered lines m-0"
                        style={{
                          width: "100%",
                          zIndex: 10,
                          position: "relative",
                        }}
                      >
                        <thead>
                          <tr className="text-center bg-black">
                            <th>{t("Reports.BowlingInvoice.Line")}</th>
                            <th>
                              {t("Reports.BowlingInvoice.CountOfPlayers")}
                            </th>
                            <th>{t("Reports.BowlingInvoice.WorkTimes")}</th>
                            <th>{t("Reports.BowlingInvoice.CountOfGames")}</th>
                            <th>{t("Reports.BowlingInvoice.TotalPrice")}</th>
                          </tr>
                        </thead>
                        <tbody style={{ backgroundColor: "white" }}>
                          {!!dataPrint == true ? (
                            dataPrint.FactorItems.map((model) => (
                              <tr key={model.RestaurantInvoiceDtlId}>
                                <td className="text-center pr-3">
                                  {model.Line.Title}
                                </td>
                                <td className="text-center pr-3">
                                  {model.PersonCount}
                                </td>
                                <td className="text-center pr-3">
                                  {model.SumTime}
                                </td>
                                <td className="text-center pr-3">
                                  {model.SumReserve}
                                </td>
                                <td className="text-center pr-3">
                                  {numberWithCommas(model.SumPrice)}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <></>
                          )}
                          <tr>
                            <td className="text-center pr-3" colSpan="5">
                              {t("Reports.BowlingInvoice.SumPrice")}:{" "}
                              {numberWithCommas(
                                dataPrint.FactorItems.map(
                                  (x) => x.SumPrice
                                ).reduce((a, b) => a + b)
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
});
