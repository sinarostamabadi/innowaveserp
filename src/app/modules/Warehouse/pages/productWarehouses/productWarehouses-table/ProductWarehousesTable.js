import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/productWarehouses/productWarehousesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useProductWarehousesUIContext } from "../ProductWarehousesUIContext";
import { ProductWarehouseModel } from "../../../../../../core/_models/Warehouse/ProductWarehouseModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ProductWarehousesTable() {
  const { t } = useTranslation();

  const productWarehousesUIContext = useProductWarehousesUIContext();

  const productWarehousesUIProps = useMemo(() => {
    return {
      ids: productWarehousesUIContext.ids,
      setIds: productWarehousesUIContext.setIds,
      queryParams: productWarehousesUIContext.queryParams,
      setQueryParams: productWarehousesUIContext.setQueryParams,
      openEditProductWarehousePage: productWarehousesUIContext.openEditProductWarehousePage,
      openDeleteProductWarehouseDialog: productWarehousesUIContext.openDeleteProductWarehouseDialog,
    };
  }, [productWarehousesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.productWarehouses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ProductWarehouseModel);
  const fieldKey = getFields(ProductWarehouseModel);
  const fields = ProductWarehouseModel;

  const dispatch = useDispatch();
  useEffect(() => {
    productWarehousesUIProps.setIds([]);
    dispatch(actions.fetchProductWarehouses(productWarehousesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productWarehousesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ProductWarehouse." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ProductWarehouse." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditProductWarehousePage: productWarehousesUIProps.openEditProductWarehousePage,
        openDeleteProductWarehouseDialog: productWarehousesUIProps.openDeleteProductWarehouseDialog,
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
    sizePerPage: productWarehousesUIProps.queryParams.PageSize,
    page: productWarehousesUIProps.queryParams.PageNumber,
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
                  productWarehousesUIProps.setQueryParams
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