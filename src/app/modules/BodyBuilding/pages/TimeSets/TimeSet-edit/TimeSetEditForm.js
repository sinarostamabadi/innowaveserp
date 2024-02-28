import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Input, Select, TimePickerField } from "src/core/_partials/controls";

export function TimeSetEditForm({ timeSet, btnRef, saveTimeSet }) {
  const { t } = useTranslation();
  const schemaValidation = Yup.object().shape({
    Title: Yup.string()
      .min(2, t("err.Min", { 0: 2 }))
      .max(100, t("err.Max", { 0: 100 }))
      .required(t("err.IsRequired", { 0: t("BodyBuildingTimeSet.Title") })),
    FromTime: Yup.string().required(
      t("err.IsRequired", { 0: t("BodyBuildingTimeSet.FromTime") })
    ),
    ToTime: Yup.string().required(
      t("err.IsRequired", { 0: t("BodyBuildingTimeSet.ToTime") })
    ),
    Gender: Yup.string().required(
      t("err.IsRequired", { 0: t("BodyBuildingTimeSet.Gender") })
    ),
  });

  const genders = [
    { text: t("Common.Male"), value: 1 },
    { text: t("Common.Female"), value: 0 },
  ];

  const days = [
    { value: null, text: t("Common.WithoutSelect") },
    { value: 7, text: t("Common.Saturday") },
    { value: 1, text: t("Common.Sunday") },
    { value: 2, text: t("Common.Monday") },
    { value: 3, text: t("Common.Tuesday") },
    { value: 4, text: t("Common.Wednesday") },
    { value: 5, text: t("Common.Thursday") },
    { value: 6, text: t("Common.Friday") },
  ];

  function clean(dirty) {
    return {
      BodyBuildingTimeSetId: dirty.BodyBuildingTimeSetId,
      DayId: !!dirty.DayId ? +dirty.DayId : null,
      Title: dirty.Title,
      FromTime: dirty.FromTime,
      ToTime: dirty.ToTime,
      Gender: +dirty.Gender,
    };
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={timeSet}
        validationSchema={schemaValidation}
        onSubmit={(values) => {
          saveTimeSet(clean(values));
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="Title"
                    component={Input}
                    customFeedbackLabel=""
                    label={t("BodyBuildingTimeSet.Title")}
                  />
                </div>
                <div className="col-lg-6">
                  <Select
                    name="Gender"
                    label={t("BodyBuildingTimeSet.Gender")}
                    customFeedbackLabel=""
                  >
                    {genders.map((gender) => (
                      <option key={gender.value} value={gender.value}>
                        {gender.text}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-4">
                  <Select
                    name="DayId"
                    label={t("BodyBuildingTimeSet.Day")}
                    customFeedbackLabel=""
                  >
                    {days.map((gender) => (
                      <option key={gender.value} value={gender.value}>
                        {gender.text}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-md-4">
                  <TimePickerField
                    name="FromTime"
                    version={2}
                    customFeedbackLabel=""
                    showSecond={false}
                    label={t("BodyBuildingTimeSet.FromTime")}
                  />
                </div>
                <div className="col-md-4">
                  <TimePickerField
                    name="ToTime"
                    version={2}
                    customFeedbackLabel=""
                    showSecond={false}
                    label={t("BodyBuildingTimeSet.ToTime")}
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
