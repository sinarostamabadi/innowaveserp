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
import { SuggestionField, Select } from "src/core/_partials/controls";
import { useCardexContext } from "./Context";
import {
  useReactToPrint,
  CloneObject,
  getStorage
} from "src/core/_helpers";
import { Print } from "./Print";
import { DefaultWarehouse } from "src/core/_partials/custom/defaults/DefaultWarehouse";
import { DefaultYear } from "src/core/_partials/custom/defaults/DefaultYear";
import { getAllWarehouses } from "../../../../General/_redux/warehouses/warehousesCrud";

export const Filter = forwardRef(({ reserve, btnRef, saveReserve }, ref) => {
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    Search(fn) {
      const btnSend = document.getElementById("BtnSearchProduct");
      btnSend.click();
    },
  }));
  
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    getAllWarehouses().then(({ data }) => {
      setWarehouses((warehouses) => [
        { WarehouseId: "0", Title: t("Common.All") },
        ...data.Items,
      ]);
    });
  }, []);
  
  const context = useCardexContext();
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

  const cardexSchema = Yup.object().shape({
    ProductId: Yup.array()
      .required(t("err.IsRequired", { 0: t("Reports.Product") })).nullable(),
  });

  const defaultWarehouse = !!getStorage("defaultWarehouse")
    ? JSON.parse(getStorage("defaultWarehouse"))
    : null;

    const defaultYear = !!getStorage("defaultYear")
    ? JSON.parse(getStorage("defaultYear"))
    : null;

  const initModel ={
    ProductId: "",
    WarehouseId: !!defaultWarehouse ? defaultWarehouse.WarehouseId : "",
    Warehouse: !!defaultWarehouse ? warehouses.filter(x=>x.WarehouseId == defaultWarehouse.WarehouseId) : "",
    YearId: !!defaultYear ? defaultYear.YearId : "",
    Year: defaultYear,
  }

  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    axios
      .post("product/get", {
        Filters: [{ Property: "Name", Operation: 7, Values: [query] }],
        OrderBy: "Name asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  let copyModel = CloneObject(initModel);

  const [product, setProduct] = useState();
  const [cardexObj, setCardexObj] = useState(copyModel);
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
        initialValues={cardexObj}
        validationSchema={cardexSchema}
        onSubmit={(values) => {
          uiProps.setFilters({
            ProductId:
              Array.isArray(values.ProductId) && values.ProductId.length
                ? values.ProductId[0].ProductId
                : null,
            WarehouseId: !!values.WarehouseId ? +values.WarehouseId : null,
            YearId: !!values.YearId ? +values.YearId : null,
          });
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
              <div className="col">
                  <SuggestionField
                    name="ProductId"
                    labelKey="Name"
                    customFeedbackLabel=""
                    label={t("Reports.Cardex.Product")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProduct}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Name}</h6>
                        {setProduct(option.Name)}
                      </div>
                    )}
                  />
                </div>
                <div className="col">
                <div className="col">
                    <Select
                      name="WarehouseId"
                      label={t("Reports.Warehouse")}
                    >
                      {warehouses.map((warehouse) => (
                        <option
                          key={warehouse.WarehouseId}
                          value={warehouse.WarehouseId}
                        >
                          {warehouse.Title}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="col">
                <DefaultYear
                    name="YearId"
                    defaultYear={cardexObj.Year} />
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
        <Print ref={componentRef} data={printModel} product={product} filters={uiProps.filters}/>
      </div>
    </>
  );
});
