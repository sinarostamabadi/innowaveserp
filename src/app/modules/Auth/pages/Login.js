import { useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Input } from "../../../../core/_partials/controls";
import * as auth from "../_redux/authRedux";
import { login, loginWithPassword, requestVerfyCode } from "../_redux/authCrud";
import { useTranslation, Trans } from "react-i18next";

function Login(props) {
  const { t } = useTranslation();
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const defaultInput = createRef();
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    !!defaultInput.current && defaultInput.current.focus();
  }, [defaultInput]);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (meta, fieldname) => {
    let result = "form-control form-control-solid h-auto py-5 px-6 ";
    if (meta.touched && meta.error) {
      result += " is-invalid";
    }

    if (meta.touched && !meta.error) {
      result += " is-valid";
    }

    return result;
  };

  return (
    <div className="login-form login-signin">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        {/* https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage */}
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">{t("App.SystemName")}</p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}

      <Formik
        initialValues={{
          mobileNo: "",
          verifyCode: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.mobileNo) {
            // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
            errors.mobileNo = intl.formatMessage({
              id: "AUTH.VALIDATION.REQUIRED_FIELD",
            });
          } else if (
            values.mobileNo.length <= 3
            /*!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.mobileNo)*/
          ) {
            errors.mobileNo = intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_FIELD",
            });
          }

          return errors;
        }}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          enableLoading();
          setLoginError(null);

          if (step == 1 && process.env.REACT_APP_LOGIN == "0") {
            requestVerfyCode(values.mobileNo)
              .then((response) => {
                if (response.data == true) {
                  setStep(2);

                  setLoginError(null);
                  disableLoading();
                  setSubmitting(false);
                }
              })
              .catch((err) => {
                setStep(1);
                !!err && !!err.response && setLoginError(err.response.data);
                disableLoading();
                setSubmitting(false);
              });
          } else {
            (process.env.REACT_APP_LOGIN == "1"
              ? loginWithPassword(values.mobileNo, values.verifyCode)
              : login(values.mobileNo, values.verifyCode)
            )
              .then((response) => {
                return response;
              })
              .then(
              
                ({
                  data: {
                    CurrentLogin,
                    UserId,
                    UserName,
                    Services,
                    RealPerson,
                  },
                }) => {
                  setLoginError(null);
                  disableLoading();
                  console.log("menuuuuuuuuuuuuu",Services)
                  props.login(CurrentLogin.Token, {
                    UserId,
                    UserName,
                    fullname: RealPerson.FullName,
                    Services,
                    RealPerson,
                  });
                }
              )
              .catch((err) => {
                !!err && !!err.response && setLoginError(err.response.data);

                disableLoading();
                setSubmitting(false);
                setStatus(
                  intl.formatMessage({
                    id: "AUTH.VALIDATION.INVALID_LOGIN",
                  })
                );
              });
          }
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            className="form"
            noValidate={true}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {status ? (
              <div
                role="alert"
                className="mb-10 alert alert-custom alert-light-danger alert-dismissible"
              >
                <div className="alert-text font-weight-bold">{status}</div>
              </div>
            ) : (
              <>
                {process.env.REACT_APP_LOGIN == "1" ? (
                  <div
                    role="alert"
                    className="mb-10 alert alert-custom alert-light-info alert-dismissible"
                  >
                    <div className="alert-text ">
                      <Trans i18nKey="App.Login.EnterUserPass" t={t} />
                    </div>
                  </div>
                ) : (
                  <div
                    role="alert"
                    className="mb-10 alert alert-custom alert-light-info alert-dismissible"
                  >
                    <div className="alert-text ">
                      <Trans i18nKey="App.Login.EnterMobileNo" t={t} />
                    </div>
                  </div>
                )}
              </>
            )}
            {process.env.REACT_APP_LOGIN == "1" ? (
              <>
                <div className="form-group">
                  <Field
                    name="mobileNo"
                    component={Input}
                    withFeedbackLabel={false}
                    placeholder={t("App.Login.Username")}
                    label={t("App.Login.Username")}
                  >
                    {({ field, form, meta }) => (
                      <div>
                        <input
                          type="text"
                          {...field}
                          className={`${getInputClasses(meta)}`}
                          placeholder={t("App.Login.Username")}
                          ref={defaultInput}
                        />
                        {meta.touched && meta.error && (
                          <div className="error invalid-feedback">
                            {meta.error}
                          </div>
                        )}
                        {!!loginError && (
                          <div className="error invalid-feedback d-block">
                            {loginError}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <div className="form-group">
                  <Field
                    name="verifyCode"
                    component={Input}
                    withFeedbackLabel={false}
                    placeholder={t("App.Login.Password")}
                    label={t("App.Login.Password")}
                  >
                    {({ field, form, meta }) => (
                      <div>
                        <input
                          type="password"
                          {...field}
                          className={`${getInputClasses(meta)}`}
                          placeholder={t("App.Login.Password")}
                          ref={defaultInput}
                        />
                        {meta.touched && meta.error && (
                          <div className="error invalid-feedback">
                            {meta.error}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </>
            ) : (
              <>
                {step == 1 && (
                  <div className="form-group">
                    <Field
                      name="mobileNo"
                      component={Input}
                      withFeedbackLabel={false}
                      placeholder={t("App.Login.MobileNo")}
                      label={t("App.Login.MobileNo")}
                    >
                      {({ field, form, meta }) => (
                        <div>
                          <input
                            type="text"
                            {...field}
                            className={`${getInputClasses(meta)}`}
                            placeholder={t("App.Login.MobileNo")}
                            ref={defaultInput}
                          />
                          {meta.touched && meta.error && (
                            <div className="error invalid-feedback">
                              {meta.error}
                            </div>
                          )}
                          {!!loginError && (
                            <div className="error invalid-feedback d-block">
                              {loginError}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                )}
                {step == 2 && (
                  <div className="form-group">
                    <Field
                      name="verifyCode"
                      component={Input}
                      withFeedbackLabel={false}
                      placeholder={t("App.Login.VerifyCode")}
                      label={t("App.Login.VerifyCode")}
                    >
                      {({ field, form, meta }) => (
                        <div>
                          <input
                            type="password"
                            {...field}
                            className={`${getInputClasses(meta)}`}
                            placeholder={t("App.Login.VerifyCode")}
                            ref={defaultInput}
                          />
                          {meta.touched && meta.error && (
                            <div className="error invalid-feedback">
                              {meta.error}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                )}
              </>
            )}

            {/* begin::Actions */}
            <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
              {/* <Link
                to="/auth/forgot-password"
                className="text-dark-50 text-hover-primary my-3 mr-2"
                id="kt_login_forgot"
              >
                <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
              </Link> */}

              <button
                id="kt_login_signin_submit"
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
              >
                <span className={`${loading ? "pr-3" : ""}`}>
                  {step == 1 ? (
                    <FormattedMessage id="AUTH.VERIFY.BUTTON" />
                  ) : (
                    <FormattedMessage id="AUTH.LOGIN.BUTTON" />
                  )}
                </span>
                {loading && <span className="spinner-border text-light"></span>}
              </button>
              {/* OLD ONE: <button
                    id="kt_login_signin_submit"
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary shadow px-10 py-5 ${clsx({
                      "spinner spinner--right spinner--md spinner--light": loading
                    })}`}
                    style={loadingButtonStyle}
                  >
                    Sign In
                  </button> */}
            </div>
            {/* end::Actions */}
          </form>
        )}
      </Formik>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
