import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/RestaurantMenuItems/RestaurantMenuItemsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { DateFaColumnFormatter } from "../../../../../../core/_formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantMenuItemsUIContext } from "../RestaurantMenuItemsUIContext";
import { RestaurantMenuItemModel } from "../../../../../../core/_models/Restaurant/RestaurantMenuItemModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemsTable() {
  const { t } = useTranslation();

  const restaurantMenuItemsUIContext = useRestaurantMenuItemsUIContext();

  const restaurantMenuItemsUIProps = useMemo(() => {
    return {
      ids: restaurantMenuItemsUIContext.ids,
      setIds: restaurantMenuItemsUIContext.setIds,
      queryParams: restaurantMenuItemsUIContext.queryParams,
      setQueryParams: restaurantMenuItemsUIContext.setQueryParams,
      openEditRestaurantMenuItemPage:
        restaurantMenuItemsUIContext.openEditRestaurantMenuItemPage,
      openDeleteRestaurantMenuItemDialog:
        restaurantMenuItemsUIContext.openDeleteRestaurantMenuItemDialog,
    };
  }, [restaurantMenuItemsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantMenuItems }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantMenuItemModel);
  const fieldKey = getFields(RestaurantMenuItemModel);
  const fields = RestaurantMenuItemModel;

  const dispatch = useDispatch();

  useEffect(() => {
    restaurantMenuItemsUIProps.setIds([]);
    dispatch(
      actions.fetchRestaurantMenuItems(restaurantMenuItemsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantMenuItemsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: "Restaurant.Title",
      text: t("RestaurantMenuItem.Restaurant"),
      sort: fields.RestaurantId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "PlaceOfPreparation.Title",
      text: t("RestaurantMenuItem.PlaceOfPreparation"),
      sort: fields.PlaceOfPreparationId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "RestaurantMenuGroup.Title",
      text: t("RestaurantMenuItem." + fields.RestaurantMenuGroupId.display),
      sort: fields.RestaurantMenuGroupId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.NameFa,
      text: t("RestaurantMenuItem." + fields.NameFa.display),
      sort: fields.NameFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.NameEn,
      text: t("RestaurantMenuItem." + fields.NameEn.display),
      sort: fields.NameEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.PrepTime,
      text: t("RestaurantMenuItem." + fields.PrepTime.display),
      sort: fields.PrepTime.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.CookTime,
      text: t("RestaurantMenuItem." + fields.CookTime.display),
      sort: fields.CookTime.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.WaitTime,
      text: t("RestaurantMenuItem." + fields.WaitTime.display),
      sort: fields.WaitTime.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.IsAccepted,
      text: t("RestaurantMenuItem." + fields.IsAccepted.display),
      sort: fields.IsAccepted.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.CheckBoxFormatter,
      formatExtraData: {
        t: t,
      },
    },
    {
      dataField: fieldKey.AcceptedDate,
      text: t("RestaurantMenuItem." + fields.AcceptedDate.display),
      sort: fields.AcceptedDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantMenuItemPage:
          restaurantMenuItemsUIProps.openEditRestaurantMenuItemPage,
        openDeleteRestaurantMenuItemDialog:
          restaurantMenuItemsUIProps.openDeleteRestaurantMenuItemDialog,
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
    sizePerPage: restaurantMenuItemsUIProps.queryParams.PageSize,
    page: restaurantMenuItemsUIProps.queryParams.PageNumber,
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
                  restaurantMenuItemsUIProps.setQueryParams
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
