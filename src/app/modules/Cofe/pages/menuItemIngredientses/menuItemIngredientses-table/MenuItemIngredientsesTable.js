import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/menuItemIngredientses/menuItemIngredientsesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMenuItemIngredientsesUIContext } from "../MenuItemIngredientsesUIContext";
import { MenuItemIngredientsModel } from "../../../../../../core/_models/Cofe/MenuItemIngredientsModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MenuItemIngredientsesTable() {
  const { t } = useTranslation();

  const menuItemIngredientsesUIContext = useMenuItemIngredientsesUIContext();

  const menuItemIngredientsesUIProps = useMemo(() => {
    return {
      ids: menuItemIngredientsesUIContext.ids,
      setIds: menuItemIngredientsesUIContext.setIds,
      queryParams: menuItemIngredientsesUIContext.queryParams,
      setQueryParams: menuItemIngredientsesUIContext.setQueryParams,
      openEditMenuItemIngredientsPage: menuItemIngredientsesUIContext.openEditMenuItemIngredientsPage,
      openDeleteMenuItemIngredientsDialog: menuItemIngredientsesUIContext.openDeleteMenuItemIngredientsDialog,
    };
  }, [menuItemIngredientsesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.menuItemIngredientses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MenuItemIngredientsModel);
  const fieldKey = getFields(MenuItemIngredientsModel);
  const fields = MenuItemIngredientsModel;

  const dispatch = useDispatch();
  useEffect(() => {
    menuItemIngredientsesUIProps.setIds([]);
    dispatch(actions.fetchMenuItemIngredientses(menuItemIngredientsesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItemIngredientsesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MenuItemIngredients." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MenuItemIngredients." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMenuItemIngredientsPage: menuItemIngredientsesUIProps.openEditMenuItemIngredientsPage,
        openDeleteMenuItemIngredientsDialog: menuItemIngredientsesUIProps.openDeleteMenuItemIngredientsDialog,
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
    sizePerPage: menuItemIngredientsesUIProps.queryParams.PageSize,
    page: menuItemIngredientsesUIProps.queryParams.PageNumber,
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
                  menuItemIngredientsesUIProps.setQueryParams
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