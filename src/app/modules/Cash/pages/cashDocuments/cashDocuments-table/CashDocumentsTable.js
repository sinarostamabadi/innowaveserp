import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashDocuments/cashDocumentsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useCashDocumentsUIContext } from "../CashDocumentsUIContext";
import { CashDocumentModel } from "src/core/_models/Cash/CashDocumentModel";
import { getConfig, getFields } from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import {
  DateFaColumnFormatter,
  MoneyColumnFormatter,
} from "src/core/_formatters";

export function CashDocumentsTable() {
  const { t } = useTranslation();

  const cashDocumentsUIContext = useCashDocumentsUIContext();

  const cashDocumentsUIProps = useMemo(() => {
    return {
      ids: cashDocumentsUIContext.ids,
      setIds: cashDocumentsUIContext.setIds,
      queryParams: cashDocumentsUIContext.queryParams,
      setQueryParams: cashDocumentsUIContext.setQueryParams,
      openEditCashDocumentPage: cashDocumentsUIContext.openEditCashDocumentPage,
      openDeleteCashDocumentDialog:
        cashDocumentsUIContext.openDeleteCashDocumentDialog,
    };
  }, [cashDocumentsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.cashDocuments }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CashDocumentModel);
  const fieldKey = getFields(CashDocumentModel);
  const fields = CashDocumentModel;

  const dispatch = useDispatch();
  useEffect(() => {
    cashDocumentsUIProps.setIds([]);
    dispatch(actions.fetchCashDocuments(cashDocumentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashDocumentsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.DocumentDate,
      text: t("CashDocument." + fields.DocumentDate.display),
      sort: fields.DocumentDate.sortable,
      formatter: DateFaColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.DocumentNo,
      text: t("CashDocument." + fields.DocumentNo.display),
      sort: fields.DocumentNo.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.CashTransactionType.Title,
      text: t("CashDocument." + fields.TransactionTypeId.display),
      sort: fields.TransactionTypeId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Person.FullNameFa,
      text: t("CashDocument." + fields.Person.display),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Cash.Title,
      text: t("CashDocument." + fields.Cash.display),
      sort: fields.CashId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.ContractNumber,
      text: t("CashDocument." + fields.ContractNumber.display),
      sort: fields.ContractNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Added,
      text: t("CashDocument." + fields.Added.display),
      sort: fields.Added.sortable,
      sortCaret: sortCaret,
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: fieldKey.Deficit,
      text: t("CashDocument." + fields.Deficit.display),
      sort: fields.Deficit.sortable,
      sortCaret: sortCaret,
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCashDocumentPage: cashDocumentsUIProps.openEditCashDocumentPage,
        openDeleteCashDocumentDialog:
          cashDocumentsUIProps.openDeleteCashDocumentDialog,
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
    sizePerPage: cashDocumentsUIProps.queryParams.PageSize,
    page: cashDocumentsUIProps.queryParams.PageNumber,
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
                  cashDocumentsUIProps.setQueryParams
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
