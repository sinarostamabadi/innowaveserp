import React from "react";
import { ServiceAccessShow } from "../../../../core/_partials/custom/service-access-show/ServiceAccessShow";
import { ChartTopPlayer } from "./ChartTopPlayer";
import { TopPlayerMode } from "../_redux/reports/reports";
import { useTranslation } from "react-i18next";

export function BowlingDashboard() {
  const { t } = useTranslation();

  return (
    <>
      <div className="row">
        <div className="col-12" style={{ minHeight: "100%" }}>
          <div
            className="card card-custom example example-compact gutter-b"
            style={{
              backgroundImage: "url(/media/bg/bg.png)",
              backgroundSize: "300px",
              backgroundColor: "#f3f6f9",
              boxShadow: "0 0 5px #b5b5c3",
              minHeight: "100%",
            }}
          >
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label">
                  {t("Dashboard.BowlingInformation")}
                </h3>
              </div>
            </div>
            <div className="card-body">
              <ServiceAccessShow dashboardId="1011"></ServiceAccessShow>

              <img
                alt="logo"
                src="/media/modules/bowling.png"
                className="end-1rem"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  height: "300px",
                }}
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5" style={{ minHeight: "500px" }}>
        <div
          className="col-xl-4 col-lg-6 col-md-12"
          style={{ minHeight: "500px" }}
        >
          <ChartTopPlayer
            id="LastWeek"
            className="gutter-b"
            symbolShape="circle"
            baseColor="primary"
            mode={TopPlayerMode.LastWeek}
            title={t("Reports.Vars.Top10")}
            description={t("Reports.Vars.InLastWeek")}
          ></ChartTopPlayer>
        </div>
        <div
          className="col-xl-4 col-lg-6 col-md-12"
          style={{ minHeight: "500px" }}
        >
          <ChartTopPlayer
            id="LastTenDays"
            className="gutter-b"
            symbolShape="circle"
            baseColor="primary"
            mode={TopPlayerMode.LastTenDays}
            title={t("Reports.Vars.Top10")}
            description={t("Reports.Vars.InLastTenDays")}
          ></ChartTopPlayer>
        </div>
        <div
          className="col-xl-4 col-lg-6 col-md-12"
          style={{ minHeight: "500px" }}
        >
          <ChartTopPlayer
            id="LastMonth"
            className="gutter-b"
            symbolShape="circle"
            baseColor="primary"
            mode={TopPlayerMode.LastMonth}
            title={t("Reports.Vars.Top10")}
            description={t("Reports.Vars.InLastMonth")}
          ></ChartTopPlayer>
        </div>
      </div>
    </>
  );
}
