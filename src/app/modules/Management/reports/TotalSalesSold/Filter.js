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
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  DatePickerField,
  SuggestionField,
} from "../../../../../core/_partials/controls";
import { suggestProduct } from "../../../Warehouse/_redux/products/productsCrud";
import { useTotalSalesSoldContext } from "./Context";
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

  const context = useTotalSalesSoldContext();
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

  const BrandEditSchema = Yup.object().shape({});

  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    suggestProduct(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const [printModel, setPrintModel] = useState(null);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: false,
    pageStyle:
      "html{font-size: 7pt;padding: 0;margin: 0;} @page { margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
  });
  const Printing = () => {
    handlePrint();
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          FromDate: "",
          ToDate: "",
          OrderBy: "Amount",
        }}
        validationSchema={BrandEditSchema}
        onSubmit={(values) => {
          uiProps.setFilters({
            FromDate: !!values.FromDate
              ? FaObjToEnDateTime(values.FromDate)
              : null,
            ToDate: !!values.ToDate ? FaObjToEnDateTime(values.ToDate) : null,
            OrderBy: "Amount",
          });
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <DatePickerField
                    name="FromDate"
                    customFeedbackLabel=""
                    label={t("Reports.FromDate")}
                  />
                </div>
                <div className="col-lg-4">
                  <DatePickerField
                    name="ToDate"
                    customFeedbackLabel=""
                    label={t("Reports.ToDate")}
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
      <div style={{ display:"none" }}>
        <Print ref={componentRef} data={printModel} />
      </div>
    </>
  );
});
