import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/nextOperations/nextOperationsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useNextOperationsUIContext } from "../NextOperationsUIContext";
import { NextOperationModel } from "../../../../../../core/_models/Cash/NextOperationModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function NextOperationsTable() {
  const { t } = useTranslation();

  const nextOperationsUIContext = useNextOperationsUIContext();

  const nextOperationsUIProps = useMemo(() => {
    return {
      ids: nextOperationsUIContext.ids,
      setIds: nextOperationsUIContext.setIds,
      queryParams: nextOperationsUIContext.queryParams,
      setQueryParams: nextOperationsUIContext.setQueryParams,
      openEditNextOperationPage:
        nextOperationsUIContext.openEditNextOperationPage,
      openDeleteNextOperationDialog:
        nextOperationsUIContext.openDeleteNextOperationDialog,
    };
  }, [nextOperationsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.nextOperations }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(NextOperationModel);
  const fieldKey = getFields(NextOperationModel);
  const fields = NextOperationModel;

  const dispatch = useDispatch();
  useEffect(() => {
    nextOperationsUIProps.setIds([]);
    dispatch(actions.fetchNextOperations(nextOperationsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextOperationsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("NextOperation." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("NextOperation." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditNextOperationPage:
          nextOperationsUIProps.openEditNextOperationPage,
        openDeleteNextOperationDialog:
          nextOperationsUIProps.openDeleteNextOperationDialog,
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
    sizePerPage: nextOperationsUIProps.queryParams.PageSize,
    page: nextOperationsUIProps.queryParams.PageNumber,
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
                  nextOperationsUIProps.setQueryParams
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
