import React from "react";
import { Row, Col } from "react-bootstrap";
import { ServiceAccessShow } from "../../../../core/_partials/custom/service-access-show/ServiceAccessShow";

export function TakeAwayDashboard() {
  return (
    <>
      <Row
        className="mb-5"
        style={{
          minHeight: "500px",
          position: "relative",
        }}
      >
        <div className="col-12" style={{ minHeight: "500px" }}>
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
                <h3 className="card-label">اطلاعات بیرون‌بر</h3>
              </div>
            </div>
            <div className="card-body">
              <ServiceAccessShow dashboardId="1700"></ServiceAccessShow>

              <img
                alt="بیرون‌بر"
                src="/media/modules/takeaway.png"
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
      </Row>
    </>
  );
}
