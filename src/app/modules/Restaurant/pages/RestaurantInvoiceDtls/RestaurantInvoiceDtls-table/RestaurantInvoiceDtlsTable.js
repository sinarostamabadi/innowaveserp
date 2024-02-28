import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/restaurantInvoiceDtls/restaurantInvoiceDtlsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantInvoiceDtlsUIContext } from "../RestaurantInvoiceDtlsUIContext";
import { RestaurantInvoiceDtlModel } from "../../../../../../core/_models/Restaurant/RestaurantInvoiceDtlModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RestaurantInvoiceDtlsTable() {
  const { t } = useTranslation();

  const restaurantInvoiceDtlsUIContext = useRestaurantInvoiceDtlsUIContext();

  const restaurantInvoiceDtlsUIProps = useMemo(() => {
    return {
      ids: restaurantInvoiceDtlsUIContext.ids,
      setIds: restaurantInvoiceDtlsUIContext.setIds,
      queryParams: restaurantInvoiceDtlsUIContext.queryParams,
      setQueryParams: restaurantInvoiceDtlsUIContext.setQueryParams,
      openEditRestaurantInvoiceDtlPage:
        restaurantInvoiceDtlsUIContext.openEditRestaurantInvoiceDtlPage,
      openDeleteRestaurantInvoiceDtlDialog:
        restaurantInvoiceDtlsUIContext.openDeleteRestaurantInvoiceDtlDialog,
    };
  }, [restaurantInvoiceDtlsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantInvoiceDtls }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantInvoiceDtlModel);
  const fieldKey = getFields(RestaurantInvoiceDtlModel);
  const fields = RestaurantInvoiceDtlModel;

  const dispatch = useDispatch();
  useEffect(() => {
    restaurantInvoiceDtlsUIProps.setIds([]);
    dispatch(
      actions.fetchRestaurantInvoiceDtls(
        restaurantInvoiceDtlsUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantInvoiceDtlsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RestaurantInvoiceDtl." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RestaurantInvoiceDtl." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantInvoiceDtlPage:
          restaurantInvoiceDtlsUIProps.openEditRestaurantInvoiceDtlPage,
        openDeleteRestaurantInvoiceDtlDialog:
          restaurantInvoiceDtlsUIProps.openDeleteRestaurantInvoiceDtlDialog,
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
    sizePerPage: restaurantInvoiceDtlsUIProps.queryParams.PageSize,
    page: restaurantInvoiceDtlsUIProps.queryParams.PageNumber,
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
                  restaurantInvoiceDtlsUIProps.setQueryParams
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
