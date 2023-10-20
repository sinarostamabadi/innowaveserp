import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/userServiceItems/userServiceItemsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useUserServiceItemsUIContext } from "../UserServiceItemsUIContext";
import { UserServiceItemModel } from "../../../../../../core/_models/Security/UserServiceItemModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function UserServiceItemsTable() {
  const { t } = useTranslation();

  const userServiceItemsUIContext = useUserServiceItemsUIContext();

  const userServiceItemsUIProps = useMemo(() => {
    return {
      ids: userServiceItemsUIContext.ids,
      setIds: userServiceItemsUIContext.setIds,
      queryParams: userServiceItemsUIContext.queryParams,
      setQueryParams: userServiceItemsUIContext.setQueryParams,
      openEditUserServiceItemPage: userServiceItemsUIContext.openEditUserServiceItemPage,
      openDeleteUserServiceItemDialog: userServiceItemsUIContext.openDeleteUserServiceItemDialog,
    };
  }, [userServiceItemsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.userServiceItems }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(UserServiceItemModel);
  const fieldKey = getFields(UserServiceItemModel);
  const fields = UserServiceItemModel;

  const dispatch = useDispatch();
  useEffect(() => {
    userServiceItemsUIProps.setIds([]);
    dispatch(actions.fetchUserServiceItems(userServiceItemsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userServiceItemsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("UserServiceItem." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("UserServiceItem." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUserServiceItemPage: userServiceItemsUIProps.openEditUserServiceItemPage,
        openDeleteUserServiceItemDialog: userServiceItemsUIProps.openDeleteUserServiceItemDialog,
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
    sizePerPage: userServiceItemsUIProps.queryParams.PageSize,
    page: userServiceItemsUIProps.queryParams.PageNumber,
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
                  userServiceItemsUIProps.setQueryParams
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