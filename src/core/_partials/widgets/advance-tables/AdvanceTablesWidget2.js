/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import { Nav, Tab } from "react-bootstrap";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_helpers";

export function AdvanceTablesWidget2({ className }) {
  const [key, setKey] = useState("Month");

  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
          ورودی‌های جدید
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
          بیش از 400+ عضو جدید
          </span>
        </h3>
        <div className="card-toolbar">
          <Tab.Container defaultActiveKey={key}>
            <Nav
              as="ul"
              onSelect={_key => setKey(_key)}
              className="nav nav-pills nav-pills-sm nav-dark-75"
            >
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Month"
                  className={`nav-link py-2 px-4 ${
                    key === "Month" ? "active" : ""
                  }`}
                >
                  ماه
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Week"
                  className={`nav-link py-2 px-4 ${
                    key === "Week" ? "active" : ""
                  }`}
                >
                  هفته
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Day"
                  className={`nav-link py-2 px-4 ${
                    key === "Day" ? "active" : ""
                  }`}
                >
                  روز
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        </div>
      </div>
      {/* Body */}
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
          <table className="table table-borderless table-vertical-center">
            <thead>
              <tr>
                <th className="p-0" style={{ width: "50px" }} />
                <th className="p-0" style={{ minWidth: "200px" }} />
                <th className="p-0" style={{ minWidth: "100px" }} />
                <th className="p-0" style={{ minWidth: "125px" }} />
                <th className="p-0" style={{ minWidth: "110px" }} />
                <th className="p-0" style={{ minWidth: "150px" }} />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light mr-1">
                    <span className="symbol-label">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/misc/006-plurk.svg")}
                        className="h-50 align-self-center"
                      ></SVG>
                    </span>
                  </div>
                </td>
                <td className="pl-0">
                  <a
                    href="#"
                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    حامد تقی‌زاده
                  </a>
                  <div>
                    <span className="font-weight-bolder">ایمیل:</span>{" "}
                    <a
                      className="text-muted font-weight-bold text-hover-primary"
                      href="#"
                    >
                      hamiiid@gmail.com
                    </a>
                  </div>
                </td>
                <td className="text-right">
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                     ریال 2,000,000
                  </span>
                  <span className="text-muted font-weight-bold">پرداخت شده</span>
                </td>
                <td className="text-right">
                  <span className="text-muted font-weight-500">
                    ایران، تهران
                  </span>
                </td>
                <td className="text-right">
                  <span className="label label-lg label-light-primary label-inline">
                    تائید شده
                  </span>
                </td>
                <td className="text-right pr-0">
                  <a href="#" className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Settings-1.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a href="#" className="btn btn-icon btn-light btn-sm mx-3">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Write.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a href="#" className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Trash.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                </td>
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                    <span className="symbol-label">
                      <SVG
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl("/media/svg/misc/015-telegram.svg")}
                      ></SVG>
                    </span>
                  </div>
                </td>
                <td className="pl-0">
                  <a
                    href="#"
                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    ابوالفضل ایمانی
                  </a>
                  <div>
                    <span className="font-weight-bolder">ایمیل:</span>{" "}
                    <a
                      className="text-muted font-weight-bold text-hover-primary"
                      href="#"
                    >
                      ayoub@gmail.com
                    </a>
                  </div>
                </td>
                <td className="text-right">
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                     ریال 4,600,000
                  </span>
                  <span className="text-muted font-weight-bold">پرداخت شده</span>
                </td>
                <td className="text-right">
                  <span className="text-muted font-weight-500">
                    ایران، البرز
                  </span>
                </td>
                <td className="text-right">
                  <span className="label label-lg label-light-warning label-inline">
                    در حال بررسی
                  </span>
                </td>
                <td className="text-right pr-0">
                  <a href="#" className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Settings-1.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a href="#" className="btn btn-icon btn-light btn-sm mx-3">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Write.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a href="#" className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Trash.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                </td>
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                    <span className="symbol-label">
                      <SVG
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl("/media/svg/misc/003-puzzle.svg")}
                      ></SVG>
                    </span>
                  </div>
                </td>
                <td className="pl-0">
                  <a
                    href="#"
                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    زهرا نوروزی
                  </a>
                  <div>
                    <span className="font-weight-bolder">ایمیل:</span>{" "}
                    <a
                      className="text-muted font-weight-bold text-hover-primary"
                      href="#"
                    >
                      zahra@gmail.com
                    </a>
                  </div>
                </td>
                <td className="text-right">
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    ریال 560,000
                  </span>
                  <span className="text-muted font-weight-bold">پرداخت شده</span>
                </td>
                <td className="text-right">
                  <span className="text-muted font-weight-500">
                    ایران، اصفهان
                  </span>
                </td>
                <td className="text-right">
                  <span className="label label-lg label-light-success label-inline">
                    انجام شده
                  </span>
                </td>
                <td className="text-right pr-0">
                  <a href="#" className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Settings-1.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a href="#" className="btn btn-icon btn-light btn-sm mx-3">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Write.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a href="#" className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Trash.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                </td>
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                    <span className="symbol-label">
                      <SVG
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl("/media/svg/misc/005-bebo.svg")}
                      ></SVG>
                    </span>
                  </div>
                </td>
                <td className="pl-0">
                  <a
                    href="#"
                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    ساناز اوصانلو
                  </a>
                  <div>
                    <span className="font-weight-bolder">ایمیل:</span>{" "}
                    <a
                      className="text-muted font-weight-bold text-hover-primary"
                      href="#"
                    >
                      sanaz@gmail.com
                    </a>
                  </div>
                </td>
                <td className="text-right">
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    ریال 57,000
                  </span>
                  <span className="text-muted font-weight-bold">پرداخت شده</span>
                </td>
                <td className="text-right">
                  <span className="text-muted font-weight-bold">
                    ایران، شیراز
                  </span>
                </td>
                <td className="text-right">
                  <span className="label label-lg label-light-danger label-inline">
                    رد شده
                  </span>
                </td>
                <td className="text-right pr-0">
                  <a href="#" className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Settings-1.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a href="#" className="btn btn-icon btn-light btn-sm mx-3">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Write.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a href="#" className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Trash.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                </td>
              </tr>
              <tr>
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                    <span className="symbol-label">
                      <SVG
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl(
                          "/media/svg/misc/014-kickstarter.svg"
                        )}
                      ></SVG>
                    </span>
                  </div>
                </td>
                <td className="pl-0">
                  <a
                    href="#"
                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    محمدرضا اسد آبادی
                  </a>
                  <div>
                    <span className="font-weight-bolder">ایمیل:</span>{" "}
                    <a
                      className="text-muted font-weight-bold text-hover-primary"
                      href="#"
                    >
                      mohamad@gmail.com
                    </a>
                  </div>
                </td>
                <td className="text-right">
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    یورو 45,200
                  </span>
                  <span className="text-muted font-weight-bold">پرداخت شده</span>
                </td>
                <td className="text-right">
                  <span className="text-muted font-weight-500">
                    اسپانیا، مادرید
                  </span>
                </td>
                <td className="text-right">
                  <span className="label label-lg label-light-warning label-inline">
                    درحال بررسی
                  </span>
                </td>
                <td className="text-right pr-0">
                  <a href="#" className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Settings-1.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a href="#" className="btn btn-icon btn-light btn-sm mx-3">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Write.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a href="#" className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Trash.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
