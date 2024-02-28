import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/tableStatusTypes/tableStatusTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useTableStatusTypesUIContext } from "../TableStatusTypesUIContext";
import { TableStatusTypeModel } from "../../../../../../core/_models//TableStatusTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function TableStatusTypesTable() {
  const { t } = useTranslation();

  const tableStatusTypesUIContext = useTableStatusTypesUIContext();

  const tableStatusTypesUIProps = useMemo(() => {
    return {
      ids: tableStatusTypesUIContext.ids,
      setIds: tableStatusTypesUIContext.setIds,
      queryParams: tableStatusTypesUIContext.queryParams,
      setQueryParams: tableStatusTypesUIContext.setQueryParams,
      openEditTableStatusTypePage:
        tableStatusTypesUIContext.openEditTableStatusTypePage,
      openDeleteTableStatusTypeDialog:
        tableStatusTypesUIContext.openDeleteTableStatusTypeDialog,
    };
  }, [tableStatusTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.tableStatusTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(TableStatusTypeModel);
  const fieldKey = getFields(TableStatusTypeModel);
  const fields = TableStatusTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    tableStatusTypesUIProps.setIds([]);
    dispatch(
      actions.fetchTableStatusTypes(tableStatusTypesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableStatusTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("TableStatusType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("TableStatusType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditTableStatusTypePage:
          tableStatusTypesUIProps.openEditTableStatusTypePage,
        openDeleteTableStatusTypeDialog:
          tableStatusTypesUIProps.openDeleteTableStatusTypeDialog,
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
    sizePerPage: tableStatusTypesUIProps.queryParams.PageSize,
    page: tableStatusTypesUIProps.queryParams.PageNumber,
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
                  tableStatusTypesUIProps.setQueryParams
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
