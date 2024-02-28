import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/restaurantMenuItemRates/restaurantMenuItemRatesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantMenuItemRatesUIContext } from "../RestaurantMenuItemRatesUIContext";
import { RestaurantMenuItemRateModel } from "../../../../../../core/_models/Restaurant/RestaurantMenuItemRateModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemRatesTable() {
  const { t } = useTranslation();

  const restaurantMenuItemRatesUIContext =
    useRestaurantMenuItemRatesUIContext();

  const restaurantMenuItemRatesUIProps = useMemo(() => {
    return {
      ids: restaurantMenuItemRatesUIContext.ids,
      setIds: restaurantMenuItemRatesUIContext.setIds,
      queryParams: restaurantMenuItemRatesUIContext.queryParams,
      setQueryParams: restaurantMenuItemRatesUIContext.setQueryParams,
      openEditRestaurantMenuItemRatePage:
        restaurantMenuItemRatesUIContext.openEditRestaurantMenuItemRatePage,
      openDeleteRestaurantMenuItemRateDialog:
        restaurantMenuItemRatesUIContext.openDeleteRestaurantMenuItemRateDialog,
    };
  }, [restaurantMenuItemRatesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantMenuItemRates }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantMenuItemRateModel);
  const fieldKey = getFields(RestaurantMenuItemRateModel);
  const fields = RestaurantMenuItemRateModel;

  const dispatch = useDispatch();
  useEffect(() => {
    restaurantMenuItemRatesUIProps.setIds([]);
    dispatch(
      actions.fetchRestaurantMenuItemRates(
        restaurantMenuItemRatesUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantMenuItemRatesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RestaurantMenuItemRate." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RestaurantMenuItemRate." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantMenuItemRatePage:
          restaurantMenuItemRatesUIProps.openEditRestaurantMenuItemRatePage,
        openDeleteRestaurantMenuItemRateDialog:
          restaurantMenuItemRatesUIProps.openDeleteRestaurantMenuItemRateDialog,
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
    sizePerPage: restaurantMenuItemRatesUIProps.queryParams.PageSize,
    page: restaurantMenuItemRatesUIProps.queryParams.PageNumber,
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
                  restaurantMenuItemRatesUIProps.setQueryParams
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
