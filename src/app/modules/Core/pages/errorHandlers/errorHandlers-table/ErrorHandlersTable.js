import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/errorHandlers/errorHandlersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useErrorHandlersUIContext } from "../ErrorHandlersUIContext";
import { ErrorHandlerModel } from "../../../../../../core/_models/Core/ErrorHandlerModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
export function ErrorHandlersTable() {
  const errorHandlersUIContext = useErrorHandlersUIContext();
  const errorHandlersUIProps = useMemo(() => {
    return {
      ids: errorHandlersUIContext.ids,
      setIds: errorHandlersUIContext.setIds,
      queryParams: errorHandlersUIContext.queryParams,
      setQueryParams: errorHandlersUIContext.setQueryParams,
      openEditErrorHandlerPage: errorHandlersUIContext.openEditErrorHandlerPage,
      openDeleteErrorHandlerDialog:
        errorHandlersUIContext.openDeleteErrorHandlerDialog,
    };
  }, [errorHandlersUIContext]);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.errorHandlers }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ErrorHandlerModel);
  const fieldKey = getFields(ErrorHandlerModel);
  const fields = ErrorHandlerModel;
  const dispatch = useDispatch();
  useEffect(() => {
    errorHandlersUIProps.setIds([]);
    dispatch(actions.fetchErrorHandlers(errorHandlersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorHandlersUIProps.queryParams, dispatch]);
  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: fields.TitleFa.display,
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: fields.TitleEn.display,
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "??????",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditErrorHandlerPage: errorHandlersUIProps.openEditErrorHandlerPage,
        openDeleteErrorHandlerDialog:
          errorHandlersUIProps.openDeleteErrorHandlerDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  console.log("configs ^>^> ", configs);
  console.log("fieldKey ^>^> ", fieldKey);
  console.log("columns ^> ", columns);
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: errorHandlersUIProps.queryParams.PageSize,
    page: errorHandlersUIProps.queryParams.PageNumber,
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
                  errorHandlersUIProps.setQueryParams
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
