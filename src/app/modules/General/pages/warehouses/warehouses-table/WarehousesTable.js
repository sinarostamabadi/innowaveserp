import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/warehouses/warehousesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useWarehousesUIContext } from "../WarehousesUIContext";
import { WarehouseModel } from "../../../../../../core/_models/General/WarehouseModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function WarehousesTable() {
  const { t } = useTranslation();

  const warehousesUIContext = useWarehousesUIContext();

  const warehousesUIProps = useMemo(() => {
    return {
      ids: warehousesUIContext.ids,
      setIds: warehousesUIContext.setIds,
      queryParams: warehousesUIContext.queryParams,
      setQueryParams: warehousesUIContext.setQueryParams,
      openEditWarehousePage: warehousesUIContext.openEditWarehousePage,
      openDeleteWarehouseDialog: warehousesUIContext.openDeleteWarehouseDialog,
    };
  }, [warehousesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.warehouses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(WarehouseModel);
  const fieldKey = getFields(WarehouseModel);
  const fields = WarehouseModel;

  const dispatch = useDispatch();
  useEffect(() => {
    warehousesUIProps.setIds([]);
    dispatch(actions.fetchWarehouses(warehousesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehousesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("Warehouse." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditWarehousePage: warehousesUIProps.openEditWarehousePage,
        openDeleteWarehouseDialog: warehousesUIProps.openDeleteWarehouseDialog,
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
    sizePerPage: warehousesUIProps.queryParams.PageSize,
    page: warehousesUIProps.queryParams.PageNumber,
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
                  warehousesUIProps.setQueryParams
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
