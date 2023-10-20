import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/chequePapers/chequePapersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useChequePapersUIContext } from "../ChequePapersUIContext";
import { ChequePaperModel } from "src/core/_models/Cash/ChequePaperModel";
import {
  getConfig,
  getFields,
} from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { DataFormatter } from "src/core/_formatters/DataFormatter";


export function ChequePapersTable() {
  const { t } = useTranslation();

  const chequePapersUIContext = useChequePapersUIContext();

  const chequePapersUIProps = useMemo(() => {
    return {
      ids: chequePapersUIContext.ids,
      setIds: chequePapersUIContext.setIds,
      queryParams: chequePapersUIContext.queryParams,
      setQueryParams: chequePapersUIContext.setQueryParams,
      openEditChequePaperPage: chequePapersUIContext.openEditChequePaperPage,
      openDeleteChequePaperDialog: chequePapersUIContext.openDeleteChequePaperDialog,
    };
  }, [chequePapersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.chequePapers }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ChequePaperModel);
  const fieldKey = getFields(ChequePaperModel);
  const fields = ChequePaperModel;

  const dispatch = useDispatch();
  useEffect(() => {
    chequePapersUIProps.setIds([]);
    dispatch(actions.fetchChequePapers(chequePapersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chequePapersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.ChequeBook.BankAccount.Title,
      text: t("ChequePaper." + fields.ChequeBook.BankAccount.display),
      sort: fields.ChequeBook.BankAccountId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.SerialNo,
      text: t("ChequePaper." + fields.SerialNo.display),
      sort: fields.SerialNo.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.ChequePaperStatus,
      text: t("ChequePaper." + fields.ChequePaperStatus.display),
      sort: fields.ChequePaperStatus.sortable,
      sortCaret: sortCaret,
      formatter: DataFormatter,
      formatExtraData: {
        data: {
          t: t,
          1: t("ChequePaper.ChequeStatus.Exist"),
          2: t("ChequePaper.ChequeStatus.Invalid"),
          3: t("ChequePaper.ChequeStatus.Issue")
        }
      },
    },
    {
      dataField: fieldKey.Description,
      text: t("ChequePaper." + fields.Description.display),
      sort: fields.Description.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditChequePaperPage: chequePapersUIProps.openEditChequePaperPage,
        openDeleteChequePaperDialog: chequePapersUIProps.openDeleteChequePaperDialog,
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
    sizePerPage: chequePapersUIProps.queryParams.PageSize,
    page: chequePapersUIProps.queryParams.PageNumber,
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
                  chequePapersUIProps.setQueryParams
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