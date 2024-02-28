import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/menuItemAlbums/menuItemAlbumsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMenuItemAlbumsUIContext } from "../MenuItemAlbumsUIContext";
import { MenuItemAlbumModel } from "../../../../../../core/_models/Cofe/MenuItemAlbumModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MenuItemAlbumsTable() {
  const { t } = useTranslation();

  const menuItemAlbumsUIContext = useMenuItemAlbumsUIContext();

  const menuItemAlbumsUIProps = useMemo(() => {
    return {
      ids: menuItemAlbumsUIContext.ids,
      setIds: menuItemAlbumsUIContext.setIds,
      queryParams: menuItemAlbumsUIContext.queryParams,
      setQueryParams: menuItemAlbumsUIContext.setQueryParams,
      openEditMenuItemAlbumPage:
        menuItemAlbumsUIContext.openEditMenuItemAlbumPage,
      openDeleteMenuItemAlbumDialog:
        menuItemAlbumsUIContext.openDeleteMenuItemAlbumDialog,
    };
  }, [menuItemAlbumsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.menuItemAlbums }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MenuItemAlbumModel);
  const fieldKey = getFields(MenuItemAlbumModel);
  const fields = MenuItemAlbumModel;

  const dispatch = useDispatch();
  useEffect(() => {
    menuItemAlbumsUIProps.setIds([]);
    dispatch(actions.fetchMenuItemAlbums(menuItemAlbumsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItemAlbumsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MenuItemAlbum." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MenuItemAlbum." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMenuItemAlbumPage:
          menuItemAlbumsUIProps.openEditMenuItemAlbumPage,
        openDeleteMenuItemAlbumDialog:
          menuItemAlbumsUIProps.openDeleteMenuItemAlbumDialog,
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
    sizePerPage: menuItemAlbumsUIProps.queryParams.PageSize,
    page: menuItemAlbumsUIProps.queryParams.PageNumber,
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
                  menuItemAlbumsUIProps.setQueryParams
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
