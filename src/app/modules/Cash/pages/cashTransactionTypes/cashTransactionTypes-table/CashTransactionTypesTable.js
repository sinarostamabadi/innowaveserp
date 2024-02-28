import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashTransactionTypes/cashTransactionTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCashTransactionTypesUIContext } from "../CashTransactionTypesUIContext";
import { CashTransactionTypeModel } from "../../../../../../core/_models/Cash/CashTransactionTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CashTransactionTypesTable() {
  const { t } = useTranslation();

  const cashTransactionTypesUIContext = useCashTransactionTypesUIContext();

  const cashTransactionTypesUIProps = useMemo(() => {
    return {
      ids: cashTransactionTypesUIContext.ids,
      setIds: cashTransactionTypesUIContext.setIds,
      queryParams: cashTransactionTypesUIContext.queryParams,
      setQueryParams: cashTransactionTypesUIContext.setQueryParams,
      openEditCashTransactionTypePage:
        cashTransactionTypesUIContext.openEditCashTransactionTypePage,
      openDeleteCashTransactionTypeDialog:
        cashTransactionTypesUIContext.openDeleteCashTransactionTypeDialog,
    };
  }, [cashTransactionTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.cashTransactionTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CashTransactionTypeModel);
  const fieldKey = getFields(CashTransactionTypeModel);
  const fields = CashTransactionTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    cashTransactionTypesUIProps.setIds([]);
    dispatch(
      actions.fetchCashTransactionTypes(cashTransactionTypesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashTransactionTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("CashTransactionType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("CashTransactionType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCashTransactionTypePage:
          cashTransactionTypesUIProps.openEditCashTransactionTypePage,
        openDeleteCashTransactionTypeDialog:
          cashTransactionTypesUIProps.openDeleteCashTransactionTypeDialog,
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
    sizePerPage: cashTransactionTypesUIProps.queryParams.PageSize,
    page: cashTransactionTypesUIProps.queryParams.PageNumber,
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
                  cashTransactionTypesUIProps.setQueryParams
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
