import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./ServiceAccessShow.css";

export function ServiceAccessShow({ dashboardId }) {
  const { user } = useSelector((state) => state.auth);
  const [serviceId, setServiceId] = useState(dashboardId);

  if (dashboardId === 0) dashboardId = null;

  const listItems = !!user.Services
    ? user.Services.filter((model) => model.ParentId == serviceId).map(
        (model) => (
          <div className="item-box col-xl-2 col-md-3 mb-10" key={model.ServiceId + "dash"}>
            {!!model.ModelName === false && model.IsService === false ? (
              <div
                className="app-box p-5 rounded-xl mx-5 d-block cursor-pointer"
                style={{ backgroundColor: "#fff", boxShadow: "0 0 8px #fff" }}
                to={model.Url}
                onClick={() => {
                  setServiceId(model.ServiceId);
                }}
              >
                <span
                  className="svg-icon svg-icon-3x svg-icon-danger d-block my-2 text-center"
                  style={{ height: "70px" }}
                >
                  <i
                    className={model.Icon || "fad fa-sitemap"}
                    style={{ fontSize: "5rem" }}
                  ></i>
                </span>
                <h3
                  href="#"
                  className="text-black-50 font-weight-bold font-size-h6 mt-2 text-center d-block h-50px d-flex align-items-center justify-content-center"
                >
                  {model.Title}
                </h3>
              </div>
            ) : (
              <NavLink
                className="app-box p-5 rounded-xl mx-5 d-block cursor-pointer"
                style={{ backgroundColor: "#fff", boxShadow: "0 0 8px #fff" }}
                to={model.Url}
              >
                <span
                  className="svg-icon svg-icon-3x svg-icon-danger d-block my-2 text-center"
                  style={{ height: "70px" }}
                >
                  <i
                    className={model.Icon || "fad fa-info-circle"}
                    style={{ fontSize: "5rem" }}
                  ></i>
                </span>
                <h3 className="text-black-50 font-weight-bold font-size-h6 mt-2 text-center d-block h-50px d-flex align-items-center justify-content-center">
                  {model.Title}
                </h3>
              </NavLink>
            )}
          </div>
        )
      )
    : [];

  return (
    <>
      <div className="row">{listItems}</div>
    </>
  );
}
