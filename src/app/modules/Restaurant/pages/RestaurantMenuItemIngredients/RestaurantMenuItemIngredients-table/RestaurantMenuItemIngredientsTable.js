import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/restaurantMenuItemIngredients/restaurantMenuItemIngredientsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantMenuItemIngredientsUIContext } from "../RestaurantMenuItemIngredientsUIContext";
import { RestaurantMenuItemIngredientModel } from "../../../../../../core/_models/Restaurant/RestaurantMenuItemIngredientModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemIngredientsTable() {
  const { t } = useTranslation();

  const restaurantMenuItemIngredientsUIContext = useRestaurantMenuItemIngredientsUIContext();

  const restaurantMenuItemIngredientsUIProps = useMemo(() => {
    return {
      ids: restaurantMenuItemIngredientsUIContext.ids,
      setIds: restaurantMenuItemIngredientsUIContext.setIds,
      queryParams: restaurantMenuItemIngredientsUIContext.queryParams,
      setQueryParams: restaurantMenuItemIngredientsUIContext.setQueryParams,
      openEditRestaurantMenuItemIngredientPage: restaurantMenuItemIngredientsUIContext.openEditRestaurantMenuItemIngredientPage,
      openDeleteRestaurantMenuItemIngredientDialog: restaurantMenuItemIngredientsUIContext.openDeleteRestaurantMenuItemIngredientDialog,
    };
  }, [restaurantMenuItemIngredientsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantMenuItemIngredients }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantMenuItemIngredientModel);
  const fieldKey = getFields(RestaurantMenuItemIngredientModel);
  const fields = RestaurantMenuItemIngredientModel;

  const dispatch = useDispatch();
  useEffect(() => {
    restaurantMenuItemIngredientsUIProps.setIds([]);
    dispatch(actions.fetchRestaurantMenuItemIngredients(restaurantMenuItemIngredientsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantMenuItemIngredientsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RestaurantMenuItemIngredient." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RestaurantMenuItemIngredient." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantMenuItemIngredientPage: restaurantMenuItemIngredientsUIProps.openEditRestaurantMenuItemIngredientPage,
        openDeleteRestaurantMenuItemIngredientDialog: restaurantMenuItemIngredientsUIProps.openDeleteRestaurantMenuItemIngredientDialog,
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
    sizePerPage: restaurantMenuItemIngredientsUIProps.queryParams.PageSize,
    page: restaurantMenuItemIngredientsUIProps.queryParams.PageNumber,
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
                  restaurantMenuItemIngredientsUIProps.setQueryParams
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