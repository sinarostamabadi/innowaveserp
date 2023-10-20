import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/menuGroups/menuGroupsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMenuGroupsUIContext } from "../MenuGroupsUIContext";
import { MenuGroupModel } from "../../../../../../core/_models/Cofe/MenuGroupModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MenuGroupsTable() {
  const { t } = useTranslation();

  const menuGroupsUIContext = useMenuGroupsUIContext();

  const menuGroupsUIProps = useMemo(() => {
    return {
      ids: menuGroupsUIContext.ids,
      setIds: menuGroupsUIContext.setIds,
      queryParams: menuGroupsUIContext.queryParams,
      setQueryParams: menuGroupsUIContext.setQueryParams,
      openEditMenuGroupPage: menuGroupsUIContext.openEditMenuGroupPage,
      openDeleteMenuGroupDialog: menuGroupsUIContext.openDeleteMenuGroupDialog,
    };
  }, [menuGroupsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.menuGroups }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MenuGroupModel);
  const fieldKey = getFields(MenuGroupModel);
  const fields = MenuGroupModel;

  const dispatch = useDispatch();
  useEffect(() => {
    menuGroupsUIProps.setIds([]);
    dispatch(actions.fetchMenuGroups(menuGroupsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuGroupsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MenuGroup." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MenuGroup." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMenuGroupPage: menuGroupsUIProps.openEditMenuGroupPage,
        openDeleteMenuGroupDialog: menuGroupsUIProps.openDeleteMenuGroupDialog,
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
    sizePerPage: menuGroupsUIProps.queryParams.PageSize,
    page: menuGroupsUIProps.queryParams.PageNumber,
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
                  menuGroupsUIProps.setQueryParams
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