/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../core/_helpers";
import { ContentRoute } from "../../../../core/layout";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../core/_assets/sass/pages/users/login-1.scss";
import { useTranslation, Trans } from "react-i18next";
import moment from "jalali-moment";

export function AuthPage() {
  const { t } = useTranslation();
  const year = moment.from().locale(process.env.REACT_APP_DATE).format("yyyy");
  
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-none d-sm-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-4.jpg")})`,
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between ">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5">
                <img
                  alt="Logo"
                  className=""
                  src={toAbsoluteUrl("/media/logos/logo.png")}
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">
                  {t("App.Welcome")}
                </h3>
                {/* <p className="font-weight-lighter text-white opacity-80">
                    مجموعه تفریحی و ورزشی بزرگ جهان ساتراپ
                  </p> */}
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">
                  <a
                    className="text-white"
                    href="http://www.roshasoft.ir/"
                    target="_blank"
                  >
                    <Trans
                      i18nKey="App.CopyRight"
                      t={t}
                      values={{ year: year }}
                    />
                  </a>
                </div>
                <div className="d-flex">
                  <Link to="/privacy" className="text-white">
                    {t("App.Privacy")}
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    {t("App.Terms")}
                  </Link>
                  <Link to="/contact" className="text-white ml-10">
                    {t("App.Contact")}
                  </Link>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            {/*begin::Content header*/}
            {/* <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
                <span className="font-weight-bold text-dark-50">هنوز اکانت نداری?</span>
                <Link to="/auth/registration" className="font-weight-bold ml-2" id="kt_login_signup">دعا هم که نکردی!</Link>
              </div> */}
            {/*end::Content header*/}

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                <Trans i18nKey="App.CopyRight" t={t} values={{ year: year }} />
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <Link to="/privacy" className="text-dark-75 text-hover-primary">
                  {t("App.Privacy")}
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  {t("App.Terms")}
                </Link>
                <Link
                  to="/contact"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  {t("App.Contact")}
                </Link>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
