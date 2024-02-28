import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import * as uiHelpers from "./RelationPersonGroupsUIHelper";
import { Pagination } from "../../../../../../core/_partials/controls";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import { useRelationPersonGroupsUIContext } from "./RelationPersonGroupsUIContext";
import { useTranslation } from "react-i18next";

export function RelationPersonGroupsTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const uiContext = useRelationPersonGroupsUIContext();
  const uiProps = useMemo(() => {
    return {
      relationPersonGroups: uiContext.active,
      addRelationPersonGroup: uiContext.addRelationPersonGroup,
      totalCount: uiContext.totalCount,
      actionsLoading: uiContext.actionsLoading,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditRelationPersonGroupDialog:
        uiContext.openEditRelationPersonGroupDialog,
      openDeleteRelationPersonGroupDialog:
        uiContext.openDeleteRelationPersonGroupDialog,
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      personId: uiContext.personId,
    };
  }, [uiContext]);

  const columns = [
    {
      dataField: "PersonGroup.Title",
      text: t("PersonGroup.Entity"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditRelationPersonGroupDialog:
          uiProps.openEditRelationPersonGroupDialog,
        openDeleteRelationPersonGroupDialog:
          uiProps.openDeleteRelationPersonGroupDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: uiProps.totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: uiProps.queryParams.PageSize,
    page: uiProps.queryParams.PageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={uiProps.listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bordered={false}
                bootstrap4
                remote
                keyField="RelationPersonGroupId"
                data={
                  uiProps.relationPersonGroups === null
                    ? []
                    : uiProps.relationPersonGroups
                }
                columns={columns}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={uiProps.relationPersonGroups} />
                <NoRecordsFoundMessage
                  entities={uiProps.relationPersonGroups}
                />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
