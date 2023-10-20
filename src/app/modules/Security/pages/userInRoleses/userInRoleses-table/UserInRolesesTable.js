import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/userInRoleses/userInRolesesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useUserInRolesesUIContext } from "../UserInRolesesUIContext";
import { UserInRolesModel } from "../../../../../../core/_models/Security/UserInRolesModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function UserInRolesesTable() {
  const { t } = useTranslation();

  const userInRolesesUIContext = useUserInRolesesUIContext();

  const userInRolesesUIProps = useMemo(() => {
    return {
      ids: userInRolesesUIContext.ids,
      setIds: userInRolesesUIContext.setIds,
      queryParams: userInRolesesUIContext.queryParams,
      setQueryParams: userInRolesesUIContext.setQueryParams,
      openEditUserInRolesPage: userInRolesesUIContext.openEditUserInRolesPage,
      openDeleteUserInRolesDialog: userInRolesesUIContext.openDeleteUserInRolesDialog,
    };
  }, [userInRolesesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.userInRoleses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(UserInRolesModel);
  const fieldKey = getFields(UserInRolesModel);
  const fields = UserInRolesModel;

  const dispatch = useDispatch();
  useEffect(() => {
    userInRolesesUIProps.setIds([]);
    dispatch(actions.fetchUserInRoleses(userInRolesesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInRolesesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("UserInRoles." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("UserInRoles." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUserInRolesPage: userInRolesesUIProps.openEditUserInRolesPage,
        openDeleteUserInRolesDialog: userInRolesesUIProps.openDeleteUserInRolesDialog,
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
    sizePerPage: userInRolesesUIProps.queryParams.PageSize,
    page: userInRolesesUIProps.queryParams.PageNumber,
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
                  userInRolesesUIProps.setQueryParams
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