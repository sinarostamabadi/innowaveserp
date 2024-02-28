import React, {
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
} from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  DatePickerField,
  SuggestionField,
  CheckboxField,
} from "../../../../../core/_partials/controls";
import { suggestPerson } from "../../../Core/_redux/people/peopleCrud";
import { useTotalSalesProfitContext } from "./Context";
import {
  FaObjToEnDateTime,
  useReactToPrint,
} from "../../../../../core/_helpers";
import { Print } from "./Print";

export const Filter = forwardRef(({ reserve, btnRef, saveReserve }, ref) => {
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    Search(fn) {
      const btnSend = document.getElementById("BtnSearchProduct");
      btnSend.click();
    },
  }));

  const context = useTotalSalesProfitContext();
  const uiProps = useMemo(() => {
    return {
      items: context.items,
      filters: context.filters,
      setFilters: context.setFilters,
      readyToPrint: context.readyToPrint,
    };
  }, [context]);

  useEffect(() => {
    if (uiProps.readyToPrint) {
      setPrintModel(uiProps.items);
      Printing();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.readyToPrint]);

  const sellSchema = Yup.object().shape({
    FromDate: Yup.object()
      .required(t("err.IsRequired", { 0: t("Reports.FromDate") }))
      .nullable(),
    ToDate: Yup.object()
      .required(t("err.IsRequired", { 0: t("Reports.ToDate") }))
      .nullable(),
  });

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    suggestPerson(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const handleSuggestionUser = useCallback((query, fnCallback) => {
    axios
      .post("user/get", {
        Filters: [{ Property: "UserName", Operation: 7, Values: [query] }],
        OrderBy: "UserName asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  const [printModel, setPrintModel] = useState(null);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 9pt;padding: 0;margin: 0;} @page { margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
  });
  const Printing = () => {
    handlePrint();
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          UserId: "",
          PersonId: "",
          FromDate: "",
          ToDate: "",
          HasDetail: false,
        }}
        validationSchema={sellSchema}
        onSubmit={(values) => {
          const filters = {
            UserId: null,
            PersonId: null,
            FromDate: null,
            ToDate: null,
            HasDetail: values.HasDetail,
          };

          if (Array.isArray(values.PersonId) && values.PersonId.length)
            filters.PersonId = +values.PersonId[0].PersonId;

          if (Array.isArray(values.UserId) && values.UserId.length)
            filters.UserId = +values.UserId[0].UserId;

          if (!!values.FromDate)
            filters.FromDate = FaObjToEnDateTime(values.FromDate);

          if (!!values.ToDate)
            filters.ToDate = FaObjToEnDateTime(values.ToDate);

          uiProps.setFilters(filters);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col">
                  <SuggestionField
                    name="UserId"
                    labelKey="UserName"
                    customFeedbackLabel=""
                    label={t("Reports.Sell.User")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionUser}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.UserName}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col">
                  <SuggestionField
                    name="PersonId"
                    labelKey="FullNameFa"
                    customFeedbackLabel=""
                    label={t("Reports.Sell.Person")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionPerson}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.FullNameFa}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col">
                  <DatePickerField
                    name="FromDate"
                    customFeedbackLabel=""
                    label={t("Reports.FromDate")}
                  />
                </div>
                <div className="col">
                  <DatePickerField
                    name="ToDate"
                    customFeedbackLabel=""
                    label={t("Reports.ToDate")}
                  />
                </div>
                <div className="col-auto">
                  <CheckboxField
                    name="HasDetail"
                    customFeedbackLabel=""
                    label={t("Reports.Details")}
                  />
                </div>
              </div>
              <button
                id="BtnSearchProduct"
                type="submit"
                style={{ display: "none" }}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
      <div style={{ display: "none" }}>
        <Print ref={componentRef} data={printModel} filters={uiProps.filters} />
      </div>
    </>
  );
});
