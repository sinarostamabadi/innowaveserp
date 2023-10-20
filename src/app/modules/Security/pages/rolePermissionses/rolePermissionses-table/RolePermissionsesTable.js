import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rolePermissionses/rolePermissionsesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRolePermissionsesUIContext } from "../RolePermissionsesUIContext";
import { RolePermissionsModel } from "../../../../../../core/_models/Security/RolePermissionsModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RolePermissionsesTable() {
  const { t } = useTranslation();

  const rolePermissionsesUIContext = useRolePermissionsesUIContext();

  const rolePermissionsesUIProps = useMemo(() => {
    return {
      ids: rolePermissionsesUIContext.ids,
      setIds: rolePermissionsesUIContext.setIds,
      queryParams: rolePermissionsesUIContext.queryParams,
      setQueryParams: rolePermissionsesUIContext.setQueryParams,
      openEditRolePermissionsPage: rolePermissionsesUIContext.openEditRolePermissionsPage,
      openDeleteRolePermissionsDialog: rolePermissionsesUIContext.openDeleteRolePermissionsDialog,
    };
  }, [rolePermissionsesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.rolePermissionses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RolePermissionsModel);
  const fieldKey = getFields(RolePermissionsModel);
  const fields = RolePermissionsModel;

  const dispatch = useDispatch();
  useEffect(() => {
    rolePermissionsesUIProps.setIds([]);
    dispatch(actions.fetchRolePermissionses(rolePermissionsesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolePermissionsesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RolePermissions." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RolePermissions." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRolePermissionsPage: rolePermissionsesUIProps.openEditRolePermissionsPage,
        openDeleteRolePermissionsDialog: rolePermissionsesUIProps.openDeleteRolePermissionsDialog,
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
    sizePerPage: rolePermissionsesUIProps.queryParams.PageSize,
    page: rolePermissionsesUIProps.queryParams.PageNumber,
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
                  rolePermissionsesUIProps.setQueryParams
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