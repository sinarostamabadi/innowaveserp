import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/restaurants/restaurantsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantsUIContext } from "../RestaurantsUIContext";
import { RestaurantModel } from "../../../../../../core/_models/Restaurant/RestaurantModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RestaurantsTable() {
  const { t } = useTranslation();

  const restaurantsUIContext = useRestaurantsUIContext();

  const restaurantsUIProps = useMemo(() => {
    return {
      ids: restaurantsUIContext.ids,
      setIds: restaurantsUIContext.setIds,
      queryParams: restaurantsUIContext.queryParams,
      setQueryParams: restaurantsUIContext.setQueryParams,
      openEditRestaurantPage: restaurantsUIContext.openEditRestaurantPage,
      openDeleteRestaurantDialog:
        restaurantsUIContext.openDeleteRestaurantDialog,
    };
  }, [restaurantsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurants }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantModel);
  const fieldKey = getFields(RestaurantModel);
  const fields = RestaurantModel;

  const dispatch = useDispatch();
  useEffect(() => {
    restaurantsUIProps.setIds([]);
    dispatch(actions.fetchRestaurants(restaurantsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Restaurant." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Restaurant." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantPage: restaurantsUIProps.openEditRestaurantPage,
        openDeleteRestaurantDialog:
          restaurantsUIProps.openDeleteRestaurantDialog,
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
    sizePerPage: restaurantsUIProps.queryParams.PageSize,
    page: restaurantsUIProps.queryParams.PageNumber,
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
                  restaurantsUIProps.setQueryParams
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
