import React from "react";
import { ServiceAccessShow } from "../../../../core/_partials/custom/service-access-show/ServiceAccessShow";

export function AccountingDashboard() {
  return (
    <>
      <div
        className="row"
        style={{
          minHeight: "100%",
          position: "relative",
        }}
      >
        <div className="col-12" style={{minHeight: "100%",}}>
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
                <h3 className="card-label">اطلاعات حسابداری</h3>
              </div>
            </div>
            <div className="card-body">
              <ServiceAccessShow dashboardId="1008"></ServiceAccessShow>

              <img
                alt="logo"
                src="/media/modules/accounting.png"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  height: "300px",
                }}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
