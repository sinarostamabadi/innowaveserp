import React, { useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationProducty, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {   Input,
  Select,
  CheckboxField,
  DatePickerField,
  SuggestionField,
  TimePickerField } from "../../../../../../core/_partials/controls";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  getSelectRow,
  getHandlerTableChange,
} from "../../../../../../core/_helpers";
import { useProductsUIContext } from "./ProductsUIContext";
import { useTranslation } from "react-i18next";
import { suggestProduct, searchProducts as FindByFilter } from "../../../../Warehouse/_redux/products/productsCrud";
import { suggestBrand } from "../../../../Warehouse/_redux/brands/brandsCrud";
import { suggestProductGroup } from "../../../../Warehouse/_redux/productGroups/productGroupsCrud";

export function ProductsTable() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);

  let productSearch = {
    ProductGroupId: "",
    BrandId: "",
    ProductId: "",
  };

  // Specs UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      products: productsUIContext.products,
      ids: productsUIContext.ids,
      setIds: productsUIContext.setIds,
      addProduct: productsUIContext.addProduct,
      totalCount: productsUIContext.totalCount,
      actionsLoading: productsUIContext.actionsLoading,
      openEditProductDialog: productsUIContext.openEditProductDialog,
      openDeleteProductDialog: productsUIContext.openDeleteProductDialog,
      sellDiscountId: productsUIContext.sellDiscountId,
      openNewProductDialog: productsUIContext.openNewProductDialog,
    };
  }, [productsUIContext]);

  const columns = [
    {
      dataField: "Product.Name",
      text: t("SellDiscountProduct.Product"),
      sort: false,
    },
  ];

  function searchProducts(params) {
    let filters = {
      ProductGroupId: null,
      BrandId: null,
      ProductId: null,
    };

    if(!!params.ProductGroupId && params.ProductGroupId.length == 1)
     filters.ProductGroupId = params.ProductGroupId[0].ProductGroupId;

    if(!!params.BrandId && params.BrandId.length == 1)
     filters.BrandId = params.BrandId[0].BrandId;

    if(!!params.ProductId && params.ProductId.length == 1)
     filters.ProductId = params.ProductId[0].ProductId;

     if(!!filters)
     FindByFilter(filters).then(({ data }) => {
      productsUIProps.addProduct(data.Items.map(x=> {return {
        ProductId: x.ProductId,
        Product: x,
        SellDiscountProductId: "temp_" + Math.floor(Math.random() * 100)
      }}));
    });
  }

  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    suggestProduct(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const handleSuggestionBrand = useCallback((query, fnCallback) => {
    suggestBrand(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  const handleSuggestionProductGroup = useCallback((query, fnCallback) => {
    suggestProductGroup(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
        <div className="col text-left margin-bottom-10-mobile">
            <h4>{t("SellDiscountProduct.Entity")}</h4>
          </div>
        </div>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={productSearch}
        onSubmit={(values) => {
          searchProducts(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <SuggestionField
                    name="ProductGroupId"
                    fieldKey="ProductGroupId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("SellDiscountProduct.ProductGroup")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProductGroup}
                    defaultValue={
                      productSearch && !!productSearch.ProductGroup
                        ? [productSearch.ProductGroup]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-6">
                  <SuggestionField
                    name="BrandId"
                    fieldKey="BrandId"
                    labelKey="Title"
                    customFeedbackLabel=""
                    label={t("SellDiscountProduct.Brand")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionBrand}
                    defaultValue={
                      productSearch && !!productSearch.Brand
                        ? [productSearch.Brand]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Title}</h6>
                      </div>
                    )}
                  />
                </div>
                <div className="col-lg-9">
                  <SuggestionField
                    name="ProductId"
                    fieldKey="ProductId"
                    labelKey="Name"
                    customFeedbackLabel=""
                    label={t("SellDiscountProduct.Product")}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProduct}
                    defaultValue={
                      productSearch && !!productSearch.RewardProduct
                        ? [productSearch.RewardProduct]
                        : []
                    }
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Name}</h6>
                        <span><strong>{t("Common.Code")}: </strong>{option.Code}</span>
                      </div>
                    )}
                  />
                </div>
                <div className="col-3">
                  <label className="w-100">&nbsp;</label>
                  <button
                    id="BtnSellDiscountSend"
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => handleSubmit()}
                  >
                    {t("Common.Add")}
                  </button>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center"
        bordered={false}
        bootstrap4
        remote
        keyField="SellDiscountProductId"
        data={productsUIProps.products === null ? [] : productsUIProps.products}
        columns={columns}
        //onTableChange={getHandlerTableChange(setQueryParams)}
        selectRow={getSelectRow({
          entities: productsUIProps.products,
          ids: productsUIProps.ids,
          setIds: productsUIProps.setIds,
          keyField: "ProductId"
        })}
      >
        <PleaseWaitMessage entities={productsUIProps.products} />
        <NoRecordsFoundMessage entities={productsUIProps.products} />
      </BootstrapTable>

    </>
  );
}
