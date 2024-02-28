import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/restaurantTables/restaurantTablesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantTablesUIContext } from "../RestaurantTablesUIContext";
import { RestaurantTableModel } from "../../../../../../core/_models/Restaurant/RestaurantTableModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RestaurantTablesTable() {
  const { t } = useTranslation();

  const restaurantTablesUIContext = useRestaurantTablesUIContext();

  const restaurantTablesUIProps = useMemo(() => {
    return {
      ids: restaurantTablesUIContext.ids,
      setIds: restaurantTablesUIContext.setIds,
      queryParams: restaurantTablesUIContext.queryParams,
      setQueryParams: restaurantTablesUIContext.setQueryParams,
      openEditRestaurantTablePage:
        restaurantTablesUIContext.openEditRestaurantTablePage,
      openDeleteRestaurantTableDialog:
        restaurantTablesUIContext.openDeleteRestaurantTableDialog,
    };
  }, [restaurantTablesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantTables }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantTableModel);
  const fieldKey = getFields(RestaurantTableModel);
  const fields = RestaurantTableModel;

  const dispatch = useDispatch();
  useEffect(() => {
    restaurantTablesUIProps.setIds([]);
    dispatch(
      actions.fetchRestaurantTables(restaurantTablesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantTablesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RestaurantTable." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RestaurantTable." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantTablePage:
          restaurantTablesUIProps.openEditRestaurantTablePage,
        openDeleteRestaurantTableDialog:
          restaurantTablesUIProps.openDeleteRestaurantTableDialog,
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
    sizePerPage: restaurantTablesUIProps.queryParams.PageSize,
    page: restaurantTablesUIProps.queryParams.PageNumber,
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
                  restaurantTablesUIProps.setQueryParams
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
