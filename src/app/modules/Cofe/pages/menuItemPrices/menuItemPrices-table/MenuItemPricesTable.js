import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/menuItemPrices/menuItemPricesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMenuItemPricesUIContext } from "../MenuItemPricesUIContext";
import { MenuItemPriceModel } from "../../../../../../core/_models/Cofe/MenuItemPriceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MenuItemPricesTable() {
  const { t } = useTranslation();

  const menuItemPricesUIContext = useMenuItemPricesUIContext();

  const menuItemPricesUIProps = useMemo(() => {
    return {
      ids: menuItemPricesUIContext.ids,
      setIds: menuItemPricesUIContext.setIds,
      queryParams: menuItemPricesUIContext.queryParams,
      setQueryParams: menuItemPricesUIContext.setQueryParams,
      openEditMenuItemPricePage:
        menuItemPricesUIContext.openEditMenuItemPricePage,
      openDeleteMenuItemPriceDialog:
        menuItemPricesUIContext.openDeleteMenuItemPriceDialog,
    };
  }, [menuItemPricesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.menuItemPrices }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MenuItemPriceModel);
  const fieldKey = getFields(MenuItemPriceModel);
  const fields = MenuItemPriceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    menuItemPricesUIProps.setIds([]);
    dispatch(actions.fetchMenuItemPrices(menuItemPricesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItemPricesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MenuItemPrice." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MenuItemPrice." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMenuItemPricePage:
          menuItemPricesUIProps.openEditMenuItemPricePage,
        openDeleteMenuItemPriceDialog:
          menuItemPricesUIProps.openDeleteMenuItemPriceDialog,
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
    sizePerPage: menuItemPricesUIProps.queryParams.PageSize,
    page: menuItemPricesUIProps.queryParams.PageNumber,
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
                  menuItemPricesUIProps.setQueryParams
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
