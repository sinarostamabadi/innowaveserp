/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { Dropdown } from "react-bootstrap";
import { DropdownCustomToggler, DropdownMenu1 } from "../../dropdowns";
import {toAbsoluteUrl} from "../../../_helpers";

export function ListsWidget9({ className }) {
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">فعالیت‌های اخیر</span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">
              890,344 فروش
            </span>
          </h3>
          <div className="card-toolbar">
            <Dropdown className="dropdown-inline" alignRight>
              <Dropdown.Toggle
                id="dropdown-toggle-top"
                as={DropdownCustomToggler}
              >
                <i className="ki ki-bold-more-hor" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                <DropdownMenu1 />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {/* Body */}
        <div className="card-body pt-4">
          <div className="timeline timeline-6 mt-3">
            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                08:42
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-warning icon-xl"></i>
              </div>

              <div className="font-weight-mormal font-size-lg timeline-content text-muted pl-3">
              خلاصه فعالیت‌های اخیر هفته گذشته است
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                10:00
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-success icon-xl"></i>
              </div>

              <div className="timeline-content d-flex">
                <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                جلسه اسکایپی با
                </span>

                <div className="d-flex align-items-start mt-n2">
                  <a
                    href="#"
                    className="symbol symbol-35 symbol-light-success mr-2"
                  >
                    <span className="symbol-label">
                      <SVG
                        className="h-75 align-self-end"
                        src={toAbsoluteUrl("/media/svg/avatars/004-boy-1.svg")}
                      ></SVG>
                    </span>
                  </a>

                  <a href="#" className="symbol symbol-35 symbol-light-success">
                    <span className="symbol-label">
                      <SVG
                        className="h-75 align-self-end"
                        src={toAbsoluteUrl("/media/svg/avatars/002-girl.svg")}
                      ></SVG>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                14:37
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-danger icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
              انتقال وجه -
                <a href="#" className="text-primary">
                دلار 700
                </a>
                . به دکتر دستغیب
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                16:50
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-primary icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-mormal font-size-lg text-muted pl-3">
              جلسه با صاحب محصول
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                21:03
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-danger icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-bolder text-dark-75 pl-3 font-size-lg">
                New order placed{` `}
                <a href="#" className="text-primary">
                برآورد پروژه با ذینفعان
                </a>
                .
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                23:07
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-info icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-mormal font-size-lg text-muted pl-3">
              ثبت سفارش جدید {" "}
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                16:50
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-primary icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-mormal font-size-lg text-muted pl-3">
              مراسم افتتاحیه شرکت بازرگانی شاپرک و پروانه‌های نوین
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                21:03
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-danger icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
              برنامه‌ریزی تبلیغات بازاریابی برای مشتری
                <a href="#" className="text-primary">
                  #XF-2356
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
