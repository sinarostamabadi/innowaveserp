import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/operationTypes/operationTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useOperationTypesUIContext } from "../OperationTypesUIContext";
import { OperationTypeModel } from "../../../../../../core/_models/Cash/OperationTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function OperationTypesTable() {
  const { t } = useTranslation();

  const operationTypesUIContext = useOperationTypesUIContext();

  const operationTypesUIProps = useMemo(() => {
    return {
      ids: operationTypesUIContext.ids,
      setIds: operationTypesUIContext.setIds,
      queryParams: operationTypesUIContext.queryParams,
      setQueryParams: operationTypesUIContext.setQueryParams,
      openEditOperationTypePage: operationTypesUIContext.openEditOperationTypePage,
      openDeleteOperationTypeDialog: operationTypesUIContext.openDeleteOperationTypeDialog,
    };
  }, [operationTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.operationTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(OperationTypeModel);
  const fieldKey = getFields(OperationTypeModel);
  const fields = OperationTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    operationTypesUIProps.setIds([]);
    dispatch(actions.fetchOperationTypes(operationTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("OperationType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("OperationType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditOperationTypePage: operationTypesUIProps.openEditOperationTypePage,
        openDeleteOperationTypeDialog: operationTypesUIProps.openDeleteOperationTypeDialog,
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
    sizePerPage: operationTypesUIProps.queryParams.PageSize,
    page: operationTypesUIProps.queryParams.PageNumber,
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
                  operationTypesUIProps.setQueryParams
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