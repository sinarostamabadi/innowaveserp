import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/posTransactions/posTransactionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { usePosTransactionsUIContext } from "../PosTransactionsUIContext";
import { PosTransactionModel } from "src/core/_models/Cash/PosTransactionModel";
import { getConfig, getFields } from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PosTransactionsTable() {
  const { t } = useTranslation();

  const posTransactionsUIContext = usePosTransactionsUIContext();

  const posTransactionsUIProps = useMemo(() => {
    return {
      ids: posTransactionsUIContext.ids,
      setIds: posTransactionsUIContext.setIds,
      queryParams: posTransactionsUIContext.queryParams,
      setQueryParams: posTransactionsUIContext.setQueryParams,
      openEditPosTransactionPage:
        posTransactionsUIContext.openEditPosTransactionPage,
      openDeletePosTransactionDialog:
        posTransactionsUIContext.openDeletePosTransactionDialog,
    };
  }, [posTransactionsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.posTransactions }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PosTransactionModel);
  const fieldKey = getFields(PosTransactionModel);
  const fields = PosTransactionModel;

  const dispatch = useDispatch();
  useEffect(() => {
    posTransactionsUIProps.setIds([]);
    dispatch(actions.fetchPosTransactions(posTransactionsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posTransactionsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TransactionNo,
      text: t("PosTransaction." + fields.TransactionNo.display),
      sort: fields.TransactionNo.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.PosTransactionGuid,
      text: t("PosTransaction." + fields.PosTransactionGuid.display),
      sort: fields.PosTransactionGuid.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TransactionTypeId,
      text: t("PosTransaction." + fields.TransactionTypeId.display),
      sort: fields.TransactionTypeId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.DocumentId,
      text: t("PosTransaction." + fields.DocumentId.display),
      sort: fields.DocumentId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.RequestDtlId,
      text: t("PosTransaction." + fields.RequestDtlId.display),
      sort: fields.RequestDtlId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.PosId,
      text: t("PosTransaction." + fields.PosId.display),
      sort: fields.PosId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TransactionDate,
      text: t("PosTransaction." + fields.TransactionDate.display),
      sort: fields.TransactionDate.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.BankAccountId,
      text: t("PosTransaction." + fields.BankAccountId.display),
      sort: fields.BankAccountId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Price,
      text: t("PosTransaction." + fields.Price.display),
      sort: fields.Price.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.CurrencyTypeId,
      text: t("PosTransaction." + fields.CurrencyTypeId.display),
      sort: fields.CurrencyTypeId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.CurrencyRate,
      text: t("PosTransaction." + fields.CurrencyRate.display),
      sort: fields.CurrencyRate.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.CurrencyPrice,
      text: t("PosTransaction." + fields.CurrencyPrice.display),
      sort: fields.CurrencyPrice.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.EquivalentCurrencyTypeId,
      text: t("PosTransaction." + fields.EquivalentCurrencyTypeId.display),
      sort: fields.EquivalentCurrencyTypeId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.EquivalentCurrencyPrice,
      text: t("PosTransaction." + fields.EquivalentCurrencyPrice.display),
      sort: fields.EquivalentCurrencyPrice.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Description,
      text: t("PosTransaction." + fields.Description.display),
      sort: fields.Description.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPosTransactionPage:
          posTransactionsUIProps.openEditPosTransactionPage,
        openDeletePosTransactionDialog:
          posTransactionsUIProps.openDeletePosTransactionDialog,
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
    sizePerPage: posTransactionsUIProps.queryParams.PageSize,
    page: posTransactionsUIProps.queryParams.PageNumber,
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
                  posTransactionsUIProps.setQueryParams
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
