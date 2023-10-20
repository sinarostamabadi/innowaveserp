import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/chequeBooks/chequeBooksActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatter from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useChequeBooksUIContext } from "../ChequeBooksUIContext";
import { ChequeBookModel } from "src/core/_models/Cash/ChequeBookModel";
import {
  getConfig,
  getFields,
} from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { DataFormatter } from "src/core/_formatters/DataFormatter";

export function ChequeBooksTable() {
  const { t } = useTranslation();

  const chequeBooksUIContext = useChequeBooksUIContext();

  const chequeBooksUIProps = useMemo(() => {
    return {
      ids: chequeBooksUIContext.ids,
      setIds: chequeBooksUIContext.setIds,
      queryParams: chequeBooksUIContext.queryParams,
      setQueryParams: chequeBooksUIContext.setQueryParams,
      openEditChequeBookPage: chequeBooksUIContext.openEditChequeBookPage,
      openDeleteChequeBookDialog: chequeBooksUIContext.openDeleteChequeBookDialog,
    };
  }, [chequeBooksUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.chequeBooks }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ChequeBookModel);
  const fieldKey = getFields(ChequeBookModel);
  const fields = ChequeBookModel;

  const dispatch = useDispatch();
  useEffect(() => {
    chequeBooksUIProps.setIds([]);
    dispatch(actions.fetchChequeBooks(chequeBooksUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chequeBooksUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.BankAccount.Title,
      text: t("ChequeBook." + fields.BankAccount.display),
      sort: fields.BankAccountId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Serial,
      text: t("ChequeBook." + fields.Serial.display),
      sort: fields.Serial.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Count,
      text: t("ChequeBook." + fields.Count.display),
      sort: fields.Count.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.ChequeBookStatus,
      text: t("ChequeBook." + fields.ChequeBookStatus.display),
      sort: fields.ChequeBookStatus.sortable,
      sortCaret: sortCaret,
      formatter: DataFormatter,
      formatExtraData: {
        data: {
          t: t,
          1: t("ChequeBook.ChequeStatus.Exist"),
          2: t("ChequeBook.ChequeStatus.Completion"),
          3: t("ChequeBook.ChequeStatus.Lost"),
          4: t("ChequeBook.ChequeStatus.Blocked"),
        }
      },
    },
    {
      dataField: fieldKey.Description,
      text: t("ChequeBook." + fields.Description.display),
      sort: fields.Description.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatter.ActionsColumnFormatter,
      formatExtraData: {
        openEditChequeBookPage: chequeBooksUIProps.openEditChequeBookPage,
        openDeleteChequeBookDialog: chequeBooksUIProps.openDeleteChequeBookDialog,
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
    sizePerPage: chequeBooksUIProps.queryParams.PageSize,
    page: chequeBooksUIProps.queryParams.PageNumber,
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
                  chequeBooksUIProps.setQueryParams
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