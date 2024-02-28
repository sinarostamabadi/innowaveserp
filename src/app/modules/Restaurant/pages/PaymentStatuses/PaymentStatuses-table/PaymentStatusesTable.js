import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/paymentStatuses/paymentStatusesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePaymentStatusesUIContext } from "../PaymentStatusesUIContext";
import { PaymentStatusModel } from "../../../../../../core/_models//PaymentStatusModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PaymentStatusesTable() {
  const { t } = useTranslation();

  const paymentStatusesUIContext = usePaymentStatusesUIContext();

  const paymentStatusesUIProps = useMemo(() => {
    return {
      ids: paymentStatusesUIContext.ids,
      setIds: paymentStatusesUIContext.setIds,
      queryParams: paymentStatusesUIContext.queryParams,
      setQueryParams: paymentStatusesUIContext.setQueryParams,
      openEditPaymentStatusPage:
        paymentStatusesUIContext.openEditPaymentStatusPage,
      openDeletePaymentStatusDialog:
        paymentStatusesUIContext.openDeletePaymentStatusDialog,
    };
  }, [paymentStatusesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.paymentStatuses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PaymentStatusModel);
  const fieldKey = getFields(PaymentStatusModel);
  const fields = PaymentStatusModel;

  const dispatch = useDispatch();
  useEffect(() => {
    paymentStatusesUIProps.setIds([]);
    dispatch(actions.fetchPaymentStatuses(paymentStatusesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentStatusesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("PaymentStatus." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("PaymentStatus." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPaymentStatusPage:
          paymentStatusesUIProps.openEditPaymentStatusPage,
        openDeletePaymentStatusDialog:
          paymentStatusesUIProps.openDeletePaymentStatusDialog,
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
    sizePerPage: paymentStatusesUIProps.queryParams.PageSize,
    page: paymentStatusesUIProps.queryParams.PageNumber,
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
                  paymentStatusesUIProps.setQueryParams
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
