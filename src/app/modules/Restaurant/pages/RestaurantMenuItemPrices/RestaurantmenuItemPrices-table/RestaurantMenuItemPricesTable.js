import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/restaurantMenuItemPrices/restaurantMenuItemPricesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantMenuItemPricesUIContext } from "../RestaurantMenuItemPricesUIContext";
import { RestaurantMenuItemPriceModel } from "../../../../../../core/_models/Restaurant/RestaurantMenuItemPriceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemPricesTable() {
  const { t } = useTranslation();

  const restaurantMenuItemPricesUIContext = useRestaurantMenuItemPricesUIContext();

  const restaurantMenuItemPricesUIProps = useMemo(() => {
    return {
      ids: restaurantMenuItemPricesUIContext.ids,
      setIds: restaurantMenuItemPricesUIContext.setIds,
      queryParams: restaurantMenuItemPricesUIContext.queryParams,
      setQueryParams: restaurantMenuItemPricesUIContext.setQueryParams,
      openEditRestaurantMenuItemPricePage: restaurantMenuItemPricesUIContext.openEditRestaurantMenuItemPricePage,
      openDeleteRestaurantMenuItemPriceDialog: restaurantMenuItemPricesUIContext.openDeleteRestaurantMenuItemPriceDialog,
    };
  }, [restaurantMenuItemPricesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantMenuItemPrices }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantMenuItemPriceModel);
  const fieldKey = getFields(RestaurantMenuItemPriceModel);
  const fields = RestaurantMenuItemPriceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    restaurantMenuItemPricesUIProps.setIds([]);
    dispatch(actions.fetchRestaurantMenuItemPrices(restaurantMenuItemPricesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantMenuItemPricesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RestaurantMenuItemPrice." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RestaurantMenuItemPrice." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantMenuItemPricePage: restaurantMenuItemPricesUIProps.openEditRestaurantMenuItemPricePage,
        openDeleteRestaurantMenuItemPriceDialog: restaurantMenuItemPricesUIProps.openDeleteRestaurantMenuItemPriceDialog,
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
    sizePerPage: restaurantMenuItemPricesUIProps.queryParams.PageSize,
    page: restaurantMenuItemPricesUIProps.queryParams.PageNumber,
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
                  restaurantMenuItemPricesUIProps.setQueryParams
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