/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React from "react";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_helpers";

export function QuickUser() {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const logoutClick = () => {
    const toggle = document.getElementById("kt_quick_user_toggle");
    if (toggle) {
      toggle.click();
    }
    history.push("/logout");
  };

  return (
    <div
      id="kt_quick_user"
      className="offcanvas offcanvas-right offcanvas p-10"
    >
      <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
        <h3 className="font-weight-bold m-0">
        پروفایل کاربر
          <small className="text-muted font-size-sm ml-2">12 پیام</small>
        </h3>
        <a
          className="btn btn-xs btn-icon btn-light btn-hover-primary cursor-pointer"
          id="kt_quick_user_close"
        >
          <i className="ki ki-close icon-xs text-muted" />
        </a>
      </div>

      <div className="offcanvas-content pr-5 mr-n5">
        <div className="d-flex align-items-center mt-5">
          <div className="symbol symbol-100 mr-5">
            <div
              className="symbol-label"
              style={{
                backgroundImage: `url(${toAbsoluteUrl(
                    "/media/users/300_21.jpg"
                )})`
              }}
            />
            <i className="symbol-badge bg-success" />
          </div>
          <div className="d-flex flex-column">
            <a
              href="#"
              className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
              {user.RealPerson.FirstNameFa + " " + user.RealPerson.LastNameFa}
            </a>
            <div className="text-muted mt-1">کارشناس ارشد توسعه</div>
            <div className="navi mt-2">
              <a className="navi-item cursor-pointer">
                <span className="navi-link p-0 pb-2">
                  <span className="navi-icon mr-1">
                    <span className="svg-icon-lg svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Mail-notification.svg"
                        )}
                      ></SVG>
                    </span>
                  </span>
                  <span className="navi-text text-muted text-hover-primary">
                    {user.email}
                  </span>
                </span>
              </a>
            </div>
            {/* <Link to="/logout" className="btn btn-light-primary btn-bold">
                Sign Out
              </Link> */}
            <button
              className="btn btn-light-primary btn-bold"
              onClick={logoutClick}
            >
              خروج
            </button>
          </div>
        </div>

        <div className="separator separator-dashed mt-8 mb-5" />

        <div className="navi navi-spacer-x-0 p-0">
          <Link to="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-success">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/General/Notification2.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">پروفایل من</div>
                <div className="text-muted">
                تنظیمات اکانت و بیشتر{" "}
                  <span className="label label-light-danger label-inline font-weight-bold">
                  بروزرسانی
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-warning">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Shopping/Chart-bar1.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">پیام‌های من</div>
                <div className="text-muted">صندوق و وظایف</div>
              </div>
            </div>
          </Link>

          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-danger">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Files/Selected-file.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">فعالیت‌های من</div>
                <div className="text-muted">تاریخچه و اعلانات</div>
              </div>
            </div>
          </a>

          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-primary">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Communication/Mail-opened.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">وظایف من</div>
                <div className="text-muted">آخرین وظایف و کمپین‌ها</div>
              </div>
            </div>
          </a>
        </div>

        <div className="separator separator-dashed my-7"></div>

        <div>
          <h5 className="mb-5">اعلانات اخیر</h5>

          <div className="d-flex align-items-center bg-light-warning rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-warning mr-5">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                بررسی سایر اهداف
              </a>
              <span className="text-muted font-size-sm">موعد تا 2 روز</span>
            </div>

            <span className="font-weight-bolder text-warning py-1 font-size-lg">
              +28%
            </span>
          </div>

          <div className="d-flex align-items-center bg-light-success rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-success mr-5">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                اطلاع رسانی به مسافران
              </a>
              <span className="text-muted font-size-sm">موعد تا 2 روز</span>
            </div>

            <span className="font-weight-bolder text-success py-1 font-size-lg">
              +50%
            </span>
          </div>

          <div className="d-flex align-items-center bg-light-danger rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-danger mr-5">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Group-chat.svg"
                )}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                گزارش پایان دوره
              </a>
              <span className="text-muted font-size-sm">موعد تا 1 روز</span>
            </div>

            <span className="font-weight-bolder text-danger py-1 font-size-lg">
              -27%
            </span>
          </div>

          <div className="d-flex align-items-center bg-light-info rounded p-5">
            <span className="svg-icon svg-icon-info mr-5">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/General/Attachment2.svg")}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                تحلیل روش‌های خروج از بحران
              </a>
              <span className="text-muted font-size-sm">موعد تا 5 روز</span>
            </div>

            <span className="font-weight-bolder text-info py-1 font-size-lg">
              +8%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
