import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/operations/operationsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useOperationsUIContext } from "../OperationsUIContext";
import { OperationModel } from "../../../../../../core/_models/Cash/OperationModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function OperationsTable() {
  const { t } = useTranslation();

  const operationsUIContext = useOperationsUIContext();

  const operationsUIProps = useMemo(() => {
    return {
      ids: operationsUIContext.ids,
      setIds: operationsUIContext.setIds,
      queryParams: operationsUIContext.queryParams,
      setQueryParams: operationsUIContext.setQueryParams,
      openEditOperationPage: operationsUIContext.openEditOperationPage,
      openDeleteOperationDialog: operationsUIContext.openDeleteOperationDialog,
    };
  }, [operationsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.operations }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(OperationModel);
  const fieldKey = getFields(OperationModel);
  const fields = OperationModel;

  const dispatch = useDispatch();
  useEffect(() => {
    operationsUIProps.setIds([]);
    dispatch(actions.fetchOperations(operationsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Operation." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Operation." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditOperationPage: operationsUIProps.openEditOperationPage,
        openDeleteOperationDialog: operationsUIProps.openDeleteOperationDialog,
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
    sizePerPage: operationsUIProps.queryParams.PageSize,
    page: operationsUIProps.queryParams.PageNumber,
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
                  operationsUIProps.setQueryParams
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