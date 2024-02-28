import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/restaurantInvoiceCosts/restaurantInvoiceCostsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantInvoiceCostsUIContext } from "../RestaurantInvoiceCostsUIContext";
import { RestaurantInvoiceCostModel } from "../../../../../../core/_models/Restaurant/RestaurantInvoiceCostModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RestaurantInvoiceCostsTable() {
  const { t } = useTranslation();

  const restaurantInvoiceCostsUIContext = useRestaurantInvoiceCostsUIContext();

  const restaurantInvoiceCostsUIProps = useMemo(() => {
    return {
      ids: restaurantInvoiceCostsUIContext.ids,
      setIds: restaurantInvoiceCostsUIContext.setIds,
      queryParams: restaurantInvoiceCostsUIContext.queryParams,
      setQueryParams: restaurantInvoiceCostsUIContext.setQueryParams,
      openEditRestaurantInvoiceCostPage:
        restaurantInvoiceCostsUIContext.openEditRestaurantInvoiceCostPage,
      openDeleteRestaurantInvoiceCostDialog:
        restaurantInvoiceCostsUIContext.openDeleteRestaurantInvoiceCostDialog,
    };
  }, [restaurantInvoiceCostsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantInvoiceCosts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantInvoiceCostModel);
  const fieldKey = getFields(RestaurantInvoiceCostModel);
  const fields = RestaurantInvoiceCostModel;

  const dispatch = useDispatch();
  useEffect(() => {
    restaurantInvoiceCostsUIProps.setIds([]);
    dispatch(
      actions.fetchRestaurantInvoiceCosts(
        restaurantInvoiceCostsUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantInvoiceCostsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RestaurantInvoiceCost." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RestaurantInvoiceCost." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantInvoiceCostPage:
          restaurantInvoiceCostsUIProps.openEditRestaurantInvoiceCostPage,
        openDeleteRestaurantInvoiceCostDialog:
          restaurantInvoiceCostsUIProps.openDeleteRestaurantInvoiceCostDialog,
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
    sizePerPage: restaurantInvoiceCostsUIProps.queryParams.PageSize,
    page: restaurantInvoiceCostsUIProps.queryParams.PageNumber,
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
                  restaurantInvoiceCostsUIProps.setQueryParams
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
