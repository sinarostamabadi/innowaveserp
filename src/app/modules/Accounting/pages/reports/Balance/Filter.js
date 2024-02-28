import { useMemo, forwardRef, useImperativeHandle } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { CheckboxField, DatePickerField } from "src/core/_partials/controls";
import { useBalanceContext } from "./Context";
import { getStorage } from "src/core/_helpers";
import { DefaultYear } from "src/core/_partials/custom/defaults/DefaultYear";

export const Filter = forwardRef(({ reserve, btnRef, saveReserve }, ref) => {
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    Search(fn) {
      const btnSend = document.getElementById("BtnSearchProduct");
      btnSend.click();
    },
  }));

  const context = useBalanceContext();
  const { setFilters, steps } = useMemo(
    () => ({ setFilters: context.setFilters, steps: context.steps }),
    [context]
  );

  const balanceSchema = Yup.object().shape({
    FromDate: Yup.date()
      .required(t("err.IsRequired", { 0: t("Reports.Balance.FromDate") }))
      .nullable(),
    ToDate: Yup.date()
      .required(t("err.IsRequired", { 0: t("Reports.Balance.ToDate") }))
      .nullable(),
  });

  const defaultYear = !!getStorage("defaultYear")
    ? JSON.parse(getStorage("defaultYear"))
    : null;

  const initModel = {
    FromDate: null,
    ToDate: null,
    YearId: !!defaultYear ? defaultYear.YearId : "",
    Year: defaultYear,
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initModel}
        validationSchema={balanceSchema}
        onSubmit={(values) => {
          setFilters(null);
          setFilters({
            YearId: !!values.YearId ? +values.YearId : null,
            FromDate: values.FromDate,
            ToDate: values.ToDate,
            FromAccountId: null,
            ToAccountId: null,
            FromAccountFloatingId: null,
            ToAccountFloatingId: null,
            CurrencyId: 1,
            ShowZeroBalance: values.ShowZeroBalance,
            ShowZeroTurnover: values.ShowZeroTurnover,
            ReportLevel: 1,
            FromDocumentNo: 0,
            ToDocumentNo: 0,
            ReportColumnCount: 8,
            OnlyBalance: values.OnlyBalance,
          });
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="row">
                <div className="col-auto">
                  <DefaultYear name="YearId" defaultYear={initModel.Year} />
                </div>
                <div className="col-3">
                  <DatePickerField
                    name="FromDate"
                    customFeedbackLabel=""
                    version={2}
                    label={t("Reports.Balance.FromDate")}
                  />
                </div>
                <div className="col-3">
                  <DatePickerField
                    name="ToDate"
                    customFeedbackLabel=""
                    version={2}
                    label={t("Reports.Balance.FromDate")}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-auto">
                  <CheckboxField
                    name="ShowZeroBalance"
                    version={2}
                    customFeedbackLabel=""
                    label={t("Reports.Balance.ShowZeroBalance")}
                  />
                </div>
                <div className="col-auto">
                  <CheckboxField
                    name="ShowZeroTurnover"
                    version={2}
                    customFeedbackLabel=""
                    label={t("Reports.Balance.ShowZeroTurnover")}
                  />
                </div>
                <div className="col-auto">
                  <CheckboxField
                    name="OnlyBalance"
                    version={2}
                    customFeedbackLabel=""
                    label={t("Reports.Balance.OnlyBalance")}
                  />
                </div>
              </div>
              <hr />
              <button
                id="BtnSearchProduct"
                type="submit"
                style={{ display: "none" }}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
            {steps && steps.length > 0 && (
              <div className="alert alert-info">
                <strong>کد: </strong>{" "}
                {steps && steps.length > 0 && steps[0].FullCode}
                <strong className="ml-5 pl-2">Title :</strong>{" "}
                {steps && steps.length > 0 && steps[0].FullTitle}
              </div>
            )}
          </>
        )}
      </Formik>
    </>
  );
});
