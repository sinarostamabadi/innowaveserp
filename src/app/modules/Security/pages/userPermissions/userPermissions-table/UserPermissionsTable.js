import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/userPermissions/userPermissionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useUserPermissionsUIContext } from "../UserPermissionsUIContext";
import { UserPermissionModel } from "../../../../../../core/_models/Security/UserPermissionModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function UserPermissionsTable() {
  const { t } = useTranslation();

  const userPermissionsUIContext = useUserPermissionsUIContext();

  const userPermissionsUIProps = useMemo(() => {
    return {
      ids: userPermissionsUIContext.ids,
      setIds: userPermissionsUIContext.setIds,
      queryParams: userPermissionsUIContext.queryParams,
      setQueryParams: userPermissionsUIContext.setQueryParams,
      openEditUserPermissionPage: userPermissionsUIContext.openEditUserPermissionPage,
      openDeleteUserPermissionDialog: userPermissionsUIContext.openDeleteUserPermissionDialog,
    };
  }, [userPermissionsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.userPermissions }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(UserPermissionModel);
  const fieldKey = getFields(UserPermissionModel);
  const fields = UserPermissionModel;

  const dispatch = useDispatch();
  useEffect(() => {
    userPermissionsUIProps.setIds([]);
    dispatch(actions.fetchUserPermissions(userPermissionsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPermissionsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("UserPermission." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("UserPermission." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUserPermissionPage: userPermissionsUIProps.openEditUserPermissionPage,
        openDeleteUserPermissionDialog: userPermissionsUIProps.openDeleteUserPermissionDialog,
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
    sizePerPage: userPermissionsUIProps.queryParams.PageSize,
    page: userPermissionsUIProps.queryParams.PageNumber,
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
                  userPermissionsUIProps.setQueryParams
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