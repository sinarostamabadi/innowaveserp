// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
  const relationPersonGroupsUIContext = useRelationPersonGroupsUIContext();
  const relationPersonGroupsUIProps = useMemo(() => {
    return {
      relationPersonGroups: relationPersonGroupsUIContext.relationPersonGroups,
      addRelationPersonGroup:
        relationPersonGroupsUIContext.addRelationPersonGroup,
      totalCount: relationPersonGroupsUIContext.totalCount,
      actionsLoading: relationPersonGroupsUIContext.actionsLoading,
      queryParams: relationPersonGroupsUIContext.queryParams,
      setQueryParams: relationPersonGroupsUIContext.setQueryParams,
      openEditRelationPersonGroupDialog:
        relationPersonGroupsUIContext.openEditRelationPersonGroupDialog,
      openDeleteRelationPersonGroupDialog:
        relationPersonGroupsUIContext.openDeleteRelationPersonGroupDialog,
      ids: relationPersonGroupsUIContext.ids,
      setIds: relationPersonGroupsUIContext.setIds,
      personId: relationPersonGroupsUIContext.personId,
    };
  }, [relationPersonGroupsUIContext]);

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
          relationPersonGroupsUIProps.openEditRelationPersonGroupDialog,
        openDeleteRelationPersonGroupDialog:
          relationPersonGroupsUIProps.openDeleteRelationPersonGroupDialog,
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
    totalSize: relationPersonGroupsUIProps.totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: relationPersonGroupsUIProps.queryParams.PageSize,
    page: relationPersonGroupsUIProps.queryParams.PageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={relationPersonGroupsUIProps.listLoading}
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
                  relationPersonGroupsUIProps.relationPersonGroups === null
                    ? []
                    : relationPersonGroupsUIProps.relationPersonGroups
                }
                columns={columns}
                {...paginationTableProps}
              >
                <PleaseWaitMessage
                  entities={relationPersonGroupsUIProps.relationPersonGroups}
                />
                <NoRecordsFoundMessage
                  entities={relationPersonGroupsUIProps.relationPersonGroups}
                />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
