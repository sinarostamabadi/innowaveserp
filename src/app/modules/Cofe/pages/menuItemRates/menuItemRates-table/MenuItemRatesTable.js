import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/menuItemRates/menuItemRatesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMenuItemRatesUIContext } from "../MenuItemRatesUIContext";
import { MenuItemRateModel } from "../../../../../../core/_models/Cofe/MenuItemRateModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MenuItemRatesTable() {
  const { t } = useTranslation();

  const menuItemRatesUIContext = useMenuItemRatesUIContext();

  const menuItemRatesUIProps = useMemo(() => {
    return {
      ids: menuItemRatesUIContext.ids,
      setIds: menuItemRatesUIContext.setIds,
      queryParams: menuItemRatesUIContext.queryParams,
      setQueryParams: menuItemRatesUIContext.setQueryParams,
      openEditMenuItemRatePage: menuItemRatesUIContext.openEditMenuItemRatePage,
      openDeleteMenuItemRateDialog:
        menuItemRatesUIContext.openDeleteMenuItemRateDialog,
    };
  }, [menuItemRatesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.menuItemRates }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MenuItemRateModel);
  const fieldKey = getFields(MenuItemRateModel);
  const fields = MenuItemRateModel;

  const dispatch = useDispatch();
  useEffect(() => {
    menuItemRatesUIProps.setIds([]);
    dispatch(actions.fetchMenuItemRates(menuItemRatesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItemRatesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MenuItemRate." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MenuItemRate." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMenuItemRatePage: menuItemRatesUIProps.openEditMenuItemRatePage,
        openDeleteMenuItemRateDialog:
          menuItemRatesUIProps.openDeleteMenuItemRateDialog,
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
    sizePerPage: menuItemRatesUIProps.queryParams.PageSize,
    page: menuItemRatesUIProps.queryParams.PageNumber,
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
                  menuItemRatesUIProps.setQueryParams
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
