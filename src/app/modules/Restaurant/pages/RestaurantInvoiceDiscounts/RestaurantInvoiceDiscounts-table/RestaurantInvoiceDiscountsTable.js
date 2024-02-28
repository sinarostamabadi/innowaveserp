import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/restaurantInvoiceDiscounts/restaurantInvoiceDiscountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantInvoiceDiscountsUIContext } from "../RestaurantInvoiceDiscountsUIContext";
import { RestaurantInvoiceDiscountModel } from "../../../../../../core/_models/Restaurant/RestaurantInvoiceDiscountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RestaurantInvoiceDiscountsTable() {
  const { t } = useTranslation();

  const restaurantInvoiceDiscountsUIContext =
    useRestaurantInvoiceDiscountsUIContext();

  const restaurantInvoiceDiscountsUIProps = useMemo(() => {
    return {
      ids: restaurantInvoiceDiscountsUIContext.ids,
      setIds: restaurantInvoiceDiscountsUIContext.setIds,
      queryParams: restaurantInvoiceDiscountsUIContext.queryParams,
      setQueryParams: restaurantInvoiceDiscountsUIContext.setQueryParams,
      openEditRestaurantInvoiceDiscountPage:
        restaurantInvoiceDiscountsUIContext.openEditRestaurantInvoiceDiscountPage,
      openDeleteRestaurantInvoiceDiscountDialog:
        restaurantInvoiceDiscountsUIContext.openDeleteRestaurantInvoiceDiscountDialog,
    };
  }, [restaurantInvoiceDiscountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantInvoiceDiscounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantInvoiceDiscountModel);
  const fieldKey = getFields(RestaurantInvoiceDiscountModel);
  const fields = RestaurantInvoiceDiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    restaurantInvoiceDiscountsUIProps.setIds([]);
    dispatch(
      actions.fetchRestaurantInvoiceDiscounts(
        restaurantInvoiceDiscountsUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantInvoiceDiscountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RestaurantInvoiceDiscount." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RestaurantInvoiceDiscount." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantInvoiceDiscountPage:
          restaurantInvoiceDiscountsUIProps.openEditRestaurantInvoiceDiscountPage,
        openDeleteRestaurantInvoiceDiscountDialog:
          restaurantInvoiceDiscountsUIProps.openDeleteRestaurantInvoiceDiscountDialog,
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
    sizePerPage: restaurantInvoiceDiscountsUIProps.queryParams.PageSize,
    page: restaurantInvoiceDiscountsUIProps.queryParams.PageNumber,
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
                  restaurantInvoiceDiscountsUIProps.setQueryParams
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
