import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/iOTransactions/iOTransactionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useIOTransactionsUIContext } from "../IOTransactionsUIContext";
import { IOTransactionModel } from "../../../../../../core/_models/Employment/IOTransactionModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function IOTransactionsTable() {
  const { t } = useTranslation();

  const iOTransactionsUIContext = useIOTransactionsUIContext();

  const iOTransactionsUIProps = useMemo(() => {
    return {
      ids: iOTransactionsUIContext.ids,
      setIds: iOTransactionsUIContext.setIds,
      queryParams: iOTransactionsUIContext.queryParams,
      setQueryParams: iOTransactionsUIContext.setQueryParams,
      openEditIOTransactionPage: iOTransactionsUIContext.openEditIOTransactionPage,
      openDeleteIOTransactionDialog: iOTransactionsUIContext.openDeleteIOTransactionDialog,
    };
  }, [iOTransactionsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.iOTransactions }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(IOTransactionModel);
  const fieldKey = getFields(IOTransactionModel);
  const fields = IOTransactionModel;

  const dispatch = useDispatch();
  useEffect(() => {
    iOTransactionsUIProps.setIds([]);
    dispatch(actions.fetchIOTransactions(iOTransactionsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iOTransactionsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("IOTransaction." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("IOTransaction." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditIOTransactionPage: iOTransactionsUIProps.openEditIOTransactionPage,
        openDeleteIOTransactionDialog: iOTransactionsUIProps.openDeleteIOTransactionDialog,
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
    sizePerPage: iOTransactionsUIProps.queryParams.PageSize,
    page: iOTransactionsUIProps.queryParams.PageNumber,
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
                  iOTransactionsUIProps.setQueryParams
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