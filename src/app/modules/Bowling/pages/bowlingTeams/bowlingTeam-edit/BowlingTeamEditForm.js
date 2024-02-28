import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  createRef,
} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Input } from "../../../../../../core/_partials/controls";

export const BowlingTeamEditForm = forwardRef(
  ({ bowlingTeam, btnRef, saveBowlingTeam }, ref) => {
    const { t } = useTranslation();
    const defaultInput = createRef();

    useEffect(() => {
      defaultInput.current.focus();
    }, [defaultInput]);

    let callBack;
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        callBack = fn;

        const btnSend = document.getElementById("BtnBowlingTeamSend");
        btnSend.click();
      },
    }));

    const BowlingTeamEditSchema = Yup.object().shape({
      Title: Yup.string().required(
        t("err.IsRequired", { 0: t("BowlingTeam.Title") })
      ),
    });

    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={bowlingTeam}
          validationSchema={BowlingTeamEditSchema}
          onSubmit={(values) => {
            !!callBack && callBack(values);
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-md-4">
                    <Field
                      name="Title"
                      component={Input}
                      customFeedbackLabel=""
                      setref={defaultInput}
                      label={t("BowlingTeam.Title")}
                    />
                  </div>
                </div>
                <button
                  id="BtnBowlingTeamSend"
                  type="submit"
                  style={{ display: "none" }}
                  onSubmit={() => handleSubmit()}
                ></button>
              </Form>
            </>
          )}
        </Formik>
      </>
    );
  }
);
