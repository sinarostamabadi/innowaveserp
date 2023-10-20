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
import { DatePickerField } from "src/core/_partials/controls";
import { useCommodityTurnoverContext } from "./Context";
import {
  useReactToPrint,
  CloneObject,
  getStorage
} from "src/core/_helpers";
import { Print } from "./Print";
import { FaObjToEnDateTime } from "src/core/_helpers";


export const Filter = forwardRef(({ reserve, btnRef, saveReserve }, ref) => {
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    Search(fn) {
      const btnSend = document.getElementById("BtnSearchProduct");
      btnSend.click();
    },
  }));
  
  const context = useCommodityTurnoverContext();
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

  const commodityTurnoverSchema = Yup.object().shape({
    ToDate: Yup.object()
      .required(t("err.IsRequired", { 0: t("Reports.CommodityTurnover.ToDate") })).nullable(),
    FromDate: Yup.object()
      .required(t("err.IsRequired", { 0: t("Reports.CommodityTurnover.FromDate") })).nullable(),
  });

  const initModel ={
    ProductId: "",
    FromDate: "",
    ToDate: "",
  }


  let copyModel = CloneObject(initModel);

  const [commodityTurnoverObj, setCommodityTurnoverObj] = useState(copyModel);
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
        initialValues={commodityTurnoverObj}
        validationSchema={commodityTurnoverSchema}
        onSubmit={(values) => {
          uiProps.setFilters({
            FromDate: !!values.FromDate
              ? FaObjToEnDateTime(values.FromDate)
              : null,
            ToDate: !!values.ToDate ? FaObjToEnDateTime(values.ToDate) : null,
          });
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-3">
                  <DatePickerField
                    name="FromDate"
                    customFeedbackLabel=""
                    label={t("Reports.CommodityTurnover.FromDate")}
                  />
                  </div>
                <div className="col-3">
                  <DatePickerField
                    name="ToDate"
                    customFeedbackLabel=""
                    label={t("Reports.CommodityTurnover.FromDate")}
                  />
                </div>
              </div>
              <button
                id="BtnSearchProduct"
                type="submit"
                style={{ display: "none" }}
                onSubmit={() => {handleSubmit()}}
              ></button>
            </Form>
          </>
        )}
      </Formik>
      <div style={{ display: "none" }}>
        <Print ref={componentRef} data={printModel} filters={uiProps.filters}/>
      </div>
    </>
  );
});
