import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashs/cashsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCashsUIContext } from "../CashsUIContext";
import { CashModel } from "../../../../../../core/_models/General/CashModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CashsTable() {
  const { t } = useTranslation();

  const cashsUIContext = useCashsUIContext();

  const cashsUIProps = useMemo(() => {
    return {
      ids: cashsUIContext.ids,
      setIds: cashsUIContext.setIds,
      queryParams: cashsUIContext.queryParams,
      setQueryParams: cashsUIContext.setQueryParams,
      openEditCashPage: cashsUIContext.openEditCashPage,
      openDeleteCashDialog: cashsUIContext.openDeleteCashDialog,
    };
  }, [cashsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.cashs }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CashModel);
  const fieldKey = getFields(CashModel);
  const fields = CashModel;

  const dispatch = useDispatch();
  useEffect(() => {
    cashsUIProps.setIds([]);
    dispatch(actions.fetchCashs(cashsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("Cash." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.AccountFloatingId,
      text: t("Cash." + fields.AccountFloatingId.display),
      sort: fields.AccountFloatingId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCashPage: cashsUIProps.openEditCashPage,
        openDeleteCashDialog: cashsUIProps.openDeleteCashDialog,
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
    sizePerPage: cashsUIProps.queryParams.PageSize,
    page: cashsUIProps.queryParams.PageNumber,
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
                  cashsUIProps.setQueryParams
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
