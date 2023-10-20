import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/menuItems/menuItemsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMenuItemsUIContext } from "../MenuItemsUIContext";
import { MenuItemModel } from "../../../../../../core/_models/Cofe/MenuItemModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MenuItemsTable() {
  const { t } = useTranslation();

  const menuItemsUIContext = useMenuItemsUIContext();

  const menuItemsUIProps = useMemo(() => {
    return {
      ids: menuItemsUIContext.ids,
      setIds: menuItemsUIContext.setIds,
      queryParams: menuItemsUIContext.queryParams,
      setQueryParams: menuItemsUIContext.setQueryParams,
      openEditMenuItemPage: menuItemsUIContext.openEditMenuItemPage,
      openDeleteMenuItemDialog: menuItemsUIContext.openDeleteMenuItemDialog,
    };
  }, [menuItemsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.menuItems }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MenuItemModel);
  const fieldKey = getFields(MenuItemModel);
  const fields = MenuItemModel;

  const dispatch = useDispatch();
  useEffect(() => {
    menuItemsUIProps.setIds([]);
    dispatch(actions.fetchMenuItems(menuItemsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItemsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MenuItem." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MenuItem." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMenuItemPage: menuItemsUIProps.openEditMenuItemPage,
        openDeleteMenuItemDialog: menuItemsUIProps.openDeleteMenuItemDialog,
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
    sizePerPage: menuItemsUIProps.queryParams.PageSize,
    page: menuItemsUIProps.queryParams.PageNumber,
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
                  menuItemsUIProps.setQueryParams
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