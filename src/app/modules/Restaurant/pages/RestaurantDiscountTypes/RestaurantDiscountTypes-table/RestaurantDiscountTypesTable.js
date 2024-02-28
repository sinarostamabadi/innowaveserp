import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/RestaurantDiscountTypes/RestaurantDiscountTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantDiscountTypesUIContext } from "../RestaurantDiscountTypesUIContext";
import { RestaurantDiscountTypeModel } from "../../../../../../core/_models/Restaurant/RestaurantDiscountTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import {
  DateFaColumnFormatter,
  TimeColumnFormatter,
} from "../../../../../../core/_formatters";

export function RestaurantDiscountTypesTable() {
  const { t } = useTranslation();

  const restaurantDiscountTypesUIContext =
    useRestaurantDiscountTypesUIContext();

  const restaurantDiscountTypesUIProps = useMemo(() => {
    return {
      ids: restaurantDiscountTypesUIContext.ids,
      setIds: restaurantDiscountTypesUIContext.setIds,
      queryParams: restaurantDiscountTypesUIContext.queryParams,
      setQueryParams: restaurantDiscountTypesUIContext.setQueryParams,
      openEditRestaurantDiscountTypePage:
        restaurantDiscountTypesUIContext.openEditRestaurantDiscountTypePage,
      openDeleteRestaurantDiscountTypeDialog:
        restaurantDiscountTypesUIContext.openDeleteRestaurantDiscountTypeDialog,
    };
  }, [restaurantDiscountTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantDiscountTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantDiscountTypeModel);
  const fieldKey = getFields(RestaurantDiscountTypeModel);
  const fields = RestaurantDiscountTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    restaurantDiscountTypesUIProps.setIds([]);
    dispatch(
      actions.fetchRestaurantDiscountTypes(
        restaurantDiscountTypesUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantDiscountTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("RestaurantDiscountType." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Restaurant.Title",
      text: t("RestaurantDiscountType.Restaurant"),
      sort: fields.RestaurantId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "RestaurantMenuGroup.Title",
      text: t("RestaurantDiscountType.RestaurantMenuGroup"),
      sort: fields.RestaurantMenuGroupId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "RestaurantMenuItem.Title",
      text: t("RestaurantDiscountType.RestaurantMenuItem"),
      sort: fields.RestaurantMenuItemId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.DiscountPercent,
      text: t("RestaurantDiscountType." + fields.DiscountPercent.display),
      sort: fields.DiscountPercent.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.FromDate,
      text: t("RestaurantDiscountType." + fields.FromDate.display),
      sort: fields.FromDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.ToDate,
      text: t("RestaurantDiscountType." + fields.ToDate.display),
      sort: fields.ToDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.FromTime,
      text: t("RestaurantDiscountType." + fields.FromTime.display),
      sort: fields.FromTime.sortable,
      sortCaret: sortCaret,
      formatter: TimeColumnFormatter,
    },
    {
      dataField: fieldKey.ToTime,
      text: t("RestaurantDiscountType." + fields.ToTime.display),
      sort: fields.ToTime.sortable,
      sortCaret: sortCaret,
      formatter: TimeColumnFormatter,
    },
    {
      dataField: "Person.FullNameFa",
      text: t("RestaurantDiscountType.Person"),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "PersonGroup.Title",
      text: t("RestaurantDiscountType.PersonGroup"),
      sort: fields.PersonGroupId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantDiscountTypePage:
          restaurantDiscountTypesUIProps.openEditRestaurantDiscountTypePage,
        openDeleteRestaurantDiscountTypeDialog:
          restaurantDiscountTypesUIProps.openDeleteRestaurantDiscountTypeDialog,
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
    sizePerPage: restaurantDiscountTypesUIProps.queryParams.PageSize,
    page: restaurantDiscountTypesUIProps.queryParams.PageNumber,
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
                  restaurantDiscountTypesUIProps.setQueryParams
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
