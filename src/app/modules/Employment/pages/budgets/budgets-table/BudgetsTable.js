import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/budgets/budgetsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBudgetsUIContext } from "../BudgetsUIContext";
import { BudgetModel } from "../../../../../../core/_models/Employment/BudgetModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BudgetsTable() {
  const { t } = useTranslation();

  const budgetsUIContext = useBudgetsUIContext();

  const budgetsUIProps = useMemo(() => {
    return {
      ids: budgetsUIContext.ids,
      setIds: budgetsUIContext.setIds,
      queryParams: budgetsUIContext.queryParams,
      setQueryParams: budgetsUIContext.setQueryParams,
      openEditBudgetPage: budgetsUIContext.openEditBudgetPage,
      openDeleteBudgetDialog: budgetsUIContext.openDeleteBudgetDialog,
    };
  }, [budgetsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.budgets }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BudgetModel);
  const fieldKey = getFields(BudgetModel);
  const fields = BudgetModel;

  const dispatch = useDispatch();
  useEffect(() => {
    budgetsUIProps.setIds([]);
    dispatch(actions.fetchBudgets(budgetsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgetsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Budget." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Budget." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBudgetPage: budgetsUIProps.openEditBudgetPage,
        openDeleteBudgetDialog: budgetsUIProps.openDeleteBudgetDialog,
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
    sizePerPage: budgetsUIProps.queryParams.PageSize,
    page: budgetsUIProps.queryParams.PageNumber,
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
                  budgetsUIProps.setQueryParams
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