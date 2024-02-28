import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./RestaurantInvoicesTable.css";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import { Pagination } from "../../../../../../core/_partials/controls";
import * as columnFormatters from "./column-formatters";
import {
  DateFaColumnFormatter,
  DateTimeFaColumnFormatter,
  MoneyColumnFormatter,
} from "../../../../../../core/_formatters";
import { useRestaurantInvoicesUIContext } from "../RestaurantInvoicesUIContext";
import { RestaurantInvoiceModel } from "../../../../../../core/_models/Restaurant/RestaurantInvoiceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import * as actions from "../../../_redux/RestaurantInvoices/RestaurantInvoicesActions";

export function RestaurantInvoicesTable() {
  const { t } = useTranslation();
  const restaurantInvoicesUIContext = useRestaurantInvoicesUIContext();

  const invoicesUIProps = useMemo(() => {
    return {
      queryParams: restaurantInvoicesUIContext.queryParams,
      setQueryParams: restaurantInvoicesUIContext.setQueryParams,

      openDisplayPage: restaurantInvoicesUIContext.openDisplayPage,
      openEditPage: restaurantInvoicesUIContext.openEditPage,
      openDeleteDialog: restaurantInvoicesUIContext.openDeleteDialog,
      openCheckoutDialog: restaurantInvoicesUIContext.openCheckoutDialog,
      openDeliveryDialog: restaurantInvoicesUIContext.openDeliveryDialog,
      openrelocationDialog: restaurantInvoicesUIContext.openrelocationDialog,
      openReleaseDialog: restaurantInvoicesUIContext.openReleaseDialog,
      openCancelOrderDialog: restaurantInvoicesUIContext.openCancelOrderDialog,
      openCancelAndReorderDialog:
        restaurantInvoicesUIContext.openCancelAndReorderDialog,
    };
  }, [restaurantInvoicesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantInvoices }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantInvoiceModel, "InvoiceNumber", "desc");
  const fieldKey = getFields(RestaurantInvoiceModel);
  const fields = RestaurantInvoiceModel;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchRestaurantInvoices(invoicesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoicesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.InvoiceNumber,
      text: t("RestaurantInvoice." + fields.InvoiceNumber.display),
      sort: fields.InvoiceNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "RestaurantTable.Title",
      text: t("RestaurantInvoice.RestaurantTable"),
      sort: fields.RestaurantTableId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Person.FullNameFa",
      text: t("RestaurantInvoice.Person"),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "RestaurantInvoiceStatus.Title",
      text: t("RestaurantInvoice.RestaurantInvoiceStatus"),
      sort: fields.RestaurantInvoiceStatusId.sortable,
      sortCaret: sortCaret,
      classes: "position-relative p-0",
    },
    {
      dataField: "Settlement.Title",
      text: t("RestaurantInvoice.Settlement"),
      sort: fields.SettlementId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.InvoiceDate,
      text: t("RestaurantInvoice." + fields.InvoiceDate.display),
      formatter: DateFaColumnFormatter,
      sort: fields.InvoiceDate.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "CreationDate",
      text: t("RestaurantInvoice.CreationDate"),
      formatter: DateTimeFaColumnFormatter,
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.InvoicePrice,
      text: t("RestaurantInvoice." + fields.InvoicePrice.display),
      sort: fields.InvoicePrice.sortable,
      sortCaret: sortCaret,
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openDisplayPage: invoicesUIProps.openDisplayPage,
        openEditPage: invoicesUIProps.openEditPage,
        openDeleteDialog: invoicesUIProps.openDeleteDialog,
        openCheckoutDialog: invoicesUIProps.openCheckoutDialog,
        openDeliveryDialog: invoicesUIProps.openDeliveryDialog,
        openrelocationDialog: invoicesUIProps.openrelocationDialog,
        openReleaseDialog: invoicesUIProps.openReleaseDialog,
        openCancelOrderDialog: invoicesUIProps.openCancelOrderDialog,
        openCancelAndReorderDialog: invoicesUIProps.openCancelAndReorderDialog,
        t: t,
      },
      classes: "text-right",
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
    sizePerPage: invoicesUIProps.queryParams.PageSize,
    page: invoicesUIProps.queryParams.PageNumber,
  };

  const rowClasses = (row, rowIndex) => {
    return "row-status row-status-" + row["RestaurantInvoiceStatusId"];
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
                rowClasses={rowClasses}
                bootstrap4
                bordered={false}
                remote
                keyField={configs.id}
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={configs.defaultSorted}
                onTableChange={getHandlerTableChange(
                  invoicesUIProps.setQueryParams
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
