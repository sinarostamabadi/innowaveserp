import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ServiceAccessShow } from "../../core/_partials/custom/service-access-show/ServiceAccessShow";

export function DashboardPage() {
  const { t } = useTranslation();
  const [system, setSystem] = useState(t("Common.AllSubSystems"));
  return (
    <>
      <div
        className="card card-custom example example-compact gutter-b"
        style={{
          backgroundImage: "url(/media/bg/bg.png)",
          backgroundSize: "300px",
          backgroundColor: "#f3f6f9",
          boxShadow: "0 0 5px #b5b5c3",
        }}
      >
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label">
              <span>{t("App.Name")}</span>
              {"  "}
              <i className="far fa-angle-right text-dark mx-2"></i>
              {"  "}
              <span>{system}</span>
            </h3>
          </div>
        </div>
        <div className="card-body">
          <div>{ServiceAccessShow(0, setSystem)}</div>
          <img
            alt="logo"
            src="/media/logos/logo-gold.png"
            className="end-1rem"
            style={{
              position: "absolute",
              bottom: "1rem",
              height: "130px",
            }}
          ></img>
        </div>
      </div>
    </>
  );
}
