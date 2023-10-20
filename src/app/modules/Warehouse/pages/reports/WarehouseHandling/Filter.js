import React, { useCallback, useMemo, forwardRef, useImperativeHandle, useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import BootstrapTable from "react-bootstrap-table-next";
import { useWarehouseHandlingContext } from "./Context";
import { SuggestionField } from "src/core/_partials/controls";
import { useReactToPrint, CloneObject, getStorage, NoRecordsFoundMessage, PleaseWaitMessage } from "src/core/_helpers";
import { DefaultWarehouse } from "src/core/_partials/custom/defaults/DefaultWarehouse";
import { DefaultYear } from "src/core/_partials/custom/defaults/DefaultYear";
import { suggestProduct, searchProducts as FindByFilter } from "../../../_redux/products/productsCrud";
import { suggestProductGroup } from "../../../_redux/productGroups/productGroupsCrud";
import { Print } from "./Print";

export const Filter = forwardRef(
  ({ warehouseHandling, btnRef, saveReserve }, ref) => {
    const { t } = useTranslation();
    const [selectedProducts, setSelectedProducts] = useState([]);

    const defaultWarehouse = !!getStorage("defaultWarehouse")
      ? JSON.parse(getStorage("defaultWarehouse"))
      : null;
    const defaultYear = !!getStorage("defaultYear")
      ? JSON.parse(getStorage("defaultYear"))
      : null;

    useImperativeHandle(ref, () => ({
      Search(fn) {
        const btnSend = document.getElementById("BtnSearchProduct");
        btnSend.click();
      },
    }));

    const context = useWarehouseHandlingContext();
    const uiProps = useMemo(() => {
      return {
        ids: context.ids,
        setIds: context.setIds,
        items: context.items,
        filters: context.filters,
        setFilters: context.setFilters,
        readyToPrint: context.readyToPrint,
      };
    }, [context]);

    const initModel = {
      ProductGroupId: "",
      ProductId: "",
      ProductCode: "",
      WarehouseId: !!defaultWarehouse ? defaultWarehouse.WarehouseId : "",
      Warehouse: defaultWarehouse,
      YearId: !!defaultYear ? defaultYear.YearId : "",
      Year: defaultYear,
      ProductCodes: [],
    };

    let copyModel = CloneObject(initModel);
    const [warehouseHandlingObj, setWarehouseHandlingObj] = useState(copyModel);
    const [printModel, setPrintModel] = useState(null);

    const columns = [
      {
        dataField: "Product.Code",
        text: t("Reports.WarehouseHandling.ProductCode"),
        sort: false,
      },
      {
        dataField: "Product.Name",
        text: t("Reports.WarehouseHandling.Product"),
        sort: false,
      }
    ];

    const handleSuggestionProduct = useCallback((query, fnCallback) => {
      suggestProduct(query).then(({ data }) => {
        fnCallback(data.Items);
      });
    });

    const handleSuggestionProductGroup = useCallback((query, fnCallback) => {
      suggestProductGroup(query).then(({ data }) => {
        fnCallback(data.Items);
      });
    });

    useEffect(() => {
      if (uiProps.readyToPrint) {
        setPrintModel(uiProps.items);
        Printing();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uiProps.readyToPrint]);

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

    function addToSelectedProducts(selectedProduct){
      let filters = {
        ProductGroupId: null,
        BrandId: null,
        ProductId: null,
      };
  
      if(!!selectedProduct.ProductGroupId && selectedProduct.ProductGroupId.length == 1)
       filters.ProductGroupId = selectedProduct.ProductGroupId[0].ProductGroupId;
  
      if(!!selectedProduct.ProductId && selectedProduct.ProductId.length == 1)
       filters.ProductId = selectedProduct.ProductId[0].ProductId;
  
       if(!!filters)
       FindByFilter(filters).then(({ data }) => {
        setSelectedProducts(products => [...selectedProducts, ...data.Items.map(x=> {return {
          ProductId: x.ProductId,
          Product: x,
        }})]);
      });
    }
    
    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={warehouseHandlingObj}
          onSubmit={(values) => {
            uiProps.setFilters({
              ProductCode:selectedProducts.map(x=> +x.Product.Code),
              WarehouseId: !!values.WarehouseId ? +values.WarehouseId : null,
              YearId: !!values.YearId ? +values.YearId : null,
            });
          }}
        >
          {({ handleSubmit, values }) => (
            <>
              <Form className="form form-label-right">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group row">
                      <div className="col-12">
                        <DefaultWarehouse
                          name="WarehouseId"
                          defaultWarehouse={warehouseHandlingObj.Warehouse}
                        />
                      </div>
                      <div className="col-12 mt-3">
                        <DefaultYear
                          name="YearId"
                          defaultYear={warehouseHandlingObj.Year}
                        />
                      </div>
                      
                      <div className="col-12 mt-3 pt-3" style={{ borderTop: "1px solid rgb(221, 221, 221)" }}>
                        <SuggestionField
                          name="ProductGroupId"
                          fieldKey="ProductGroupId"
                          labelKey="Title"
                          customFeedbackLabel=""
                          label={t("SellDiscountProduct.ProductGroup")}
                          placeHolder={t("msg.SelectBySuggestion")}
                          handleSearch={handleSuggestionProductGroup}
                          renderMenuItemChildren={(option, props) => (
                            <div>
                              <h6>{option.Title}</h6>
                            </div>
                          )}
                        />
                      </div>
                      <div className="col-10 mt-3">
                        <SuggestionField
                          name="ProductId"
                          fieldKey="ProductId"
                          labelKey="Name"
                          customFeedbackLabel=""
                          label={t("SellDiscountProduct.Product")}
                          placeHolder={t("msg.SelectBySuggestion")}
                          handleSearch={handleSuggestionProduct}
                          renderMenuItemChildren={(option, props) => (
                            <div>
                              <h6>{option.Name}</h6>
                              <span>
                                <strong>{t("Common.Code")}: </strong>
                                {option.Code}
                              </span>
                            </div>
                          )}
                        />
                      </div>
                      <div className="col mt-3">
                        <label className="w-100">&nbsp;</label>
                        <button
                          id="BtnSellDiscountSend"
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={() => addToSelectedProducts({ProductGroupId: values["ProductGroupId"], ProductId: values["ProductId"]})}
                        >
                          {t("Common.Add")}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <BootstrapTable
                      wrapperClasses="table-responsive"
                      classes="table table-head-custom table-vertical-center"
                      bordered={false}
                      bootstrap4
                      remote
                      keyField="ProductId"
                      data={selectedProducts}
                      columns={columns}
                    >
                      <PleaseWaitMessage entities={selectedProducts} />
                      <NoRecordsFoundMessage
                        entities={selectedProducts}
                      />
                    </BootstrapTable>
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
          <Print
            ref={componentRef}
            warehouse={
              !!warehouseHandlingObj.Warehouse.Title &&
              warehouseHandlingObj.Warehouse.Title
            }
            data={printModel}
            filters={uiProps.filters}
          />
        </div>
      </>
    );
  }
);
