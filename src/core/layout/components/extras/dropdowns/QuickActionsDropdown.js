/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";

export function QuickActionsDropdown() {
  const bgImage = toAbsoluteUrl("/media/misc/bg-2.jpg");
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, "extras.quick-actions.layout") ===
        "offcanvas",
    };
  }, [uiService]);

  return (
    <>
      {layoutProps.offcanvas && (
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id="quick-actions-tooltip">Quick actions</Tooltip>}
        >
          <div className="topbar-item">
            <div
              className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1"
              id="kt_quick_actions_toggle"
            >
              <span className="svg-icon svg-icon-xl svg-icon-primary">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Media/Equalizer.svg")}
                />
              </span>
            </div>
          </div>
        </OverlayTrigger>
      )}
      {!layoutProps.offcanvas && (
        <Dropdown drop="down" alignRight>
          <Dropdown.Toggle
            as={DropdownTopbarItemToggler}
            id="kt_quick_actions_panel_toggle"
          >
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="quick-actions-tooltip">Quick actions</Tooltip>
              }
            >
              <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
                <span className="svg-icon svg-icon-xl svg-icon-primary">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Media/Equalizer.svg")}
                  />
                </span>
              </div>
            </OverlayTrigger>
          </Dropdown.Toggle>

          <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-lg">
            <form>
              {/* begin: Head */}
              <div
                className="d-flex flex-column align-items-center justify-content-center pt-10 pb-10 bgi-size-cover bgi-no-repeat rounded-top"
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <h3 className="text-white font-weight-bold font-size-5">
                دسترسی سریع
                </h3>
                <span className="btn btn-success btn-sm btn-bold btn-font-md mt-2">
                12 تسک به شما تخصیص شده
                </span>
              </div>
              {/* end: Head */}

              <div className="row row-paddingless">
                <div className="col-6">
                  <a
                    href="#"
                    className="d-block py-10 px-5 text-center bg-hover-light border-right border-bottom"
                  >
                    <span className="svg-icon svg-icon-3x svg-icon-success">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Shopping/Euro.svg"
                        )}
                      ></SVG>
                    </span>
                    <span className="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">
                    حسابداری
                    </span>
                    <span className="d-block text-dark-50 font-size-lg">
                    مالی
                    </span>
                  </a>
                </div>

                <div className="col-6">
                  <a
                    href="#"
                    className="d-block py-10 px-5 text-center bg-hover-light border-bottom"
                  >
                    {" "}
                    <span className="svg-icon svg-icon-3x svg-icon-success">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Mail-attachment.svg"
                        )}
                      ></SVG>
                    </span>
                    <span className="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">
                    مدیریت
                    </span>
                    <span className="d-block text-dark-50 font-size-lg">
                    کاربران
                    </span>
                  </a>
                </div>

                <div className="col-6">
                  <a
                    href="#"
                    className="d-block py-10 px-5 text-center bg-hover-light border-right"
                  >
                    <span className="svg-icon svg-icon-3x svg-icon-success">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Shopping/Box2.svg"
                        )}
                      ></SVG>
                    </span>
                    <span className="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">
                    کافی‌شاپ‌ها
                    </span>
                    <span className="d-block text-dark-50 font-size-lg">
                    کافه
                    </span>
                  </a>
                </div>

                <div className="col-6">
                  <a
                    href="#"
                    className="d-block py-10 px-5 text-center bg-hover-light"
                  >
                    <span className="svg-icon svg-icon-3x svg-icon-success">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Group.svg"
                        )}
                      ></SVG>
                    </span>
                    <span className="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">
                    مشتریان
                    </span>
                    <span className="d-block text-dark-50 font-size-lg">
                    فعالیت‌ها
                    </span>
                  </a>
                </div>
              </div>
            </form>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}
