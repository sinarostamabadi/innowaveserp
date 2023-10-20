import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/products/productsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useProductsUIContext } from "../ProductsUIContext";
import { ProductModel } from "../../../../../../core/_models/Warehouse/ProductModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ProductsTable() {
  const { t } = useTranslation();

  const productsUIContext = useProductsUIContext();

  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      setIds: productsUIContext.setIds,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      openEditProductPage: productsUIContext.openEditProductPage,
      openDeleteProductDialog: productsUIContext.openDeleteProductDialog,
    };
  }, [productsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.products }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ProductModel);
  const fieldKey = getFields(ProductModel);
  const fields = ProductModel;

  const dispatch = useDispatch();

  useEffect(() => {
    productsUIProps.setIds([]);
    dispatch(actions.fetchProducts(productsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Code,
      text: t("Product." + fields.Code.display),
      sort: fields.Code.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Name,
      text: t("Product." + fields.Name.display),
      sort: fields.Name.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "ProductGroup.Title",
      text: t("Product.ProductGroup"),
      sort: fields.ProductGroupId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Brand.Title",
      text: t("Product.Brand"),
      sort: fields.BrandId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Country.TitleFa",
      text: t("Product.Country"),
      sort: fields.CountryId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.HasSerial,
      text: t("Product." + fields.HasSerial.display),
      sort: fields.HasSerial.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.CheckBoxFormatter,
      formatExtraData: { t: t }
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditProductPage: productsUIProps.openEditProductPage,
        openDeleteProductDialog: productsUIProps.openDeleteProductDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: productsUIProps.queryParams.PageSize,
    page: productsUIProps.queryParams.PageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                bordered={false}
                remote
                keyField={configs.id}
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={configs.defaultSorted}
                onTableChange={getHandlerTableChange(
                  productsUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}