import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/buyDiscounts/buyDiscountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBuyDiscountsUIContext } from "../BuyDiscountsUIContext";
import { BuyDiscountModel } from "../../../../../../core/_models/PurchaseOrder/BuyDiscountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BuyDiscountsTable() {
  const { t } = useTranslation();

  const buyDiscountsUIContext = useBuyDiscountsUIContext();

  const buyDiscountsUIProps = useMemo(() => {
    return {
      ids: buyDiscountsUIContext.ids,
      setIds: buyDiscountsUIContext.setIds,
      queryParams: buyDiscountsUIContext.queryParams,
      setQueryParams: buyDiscountsUIContext.setQueryParams,
      openEditBuyDiscountPage: buyDiscountsUIContext.openEditBuyDiscountPage,
      openDeleteBuyDiscountDialog:
        buyDiscountsUIContext.openDeleteBuyDiscountDialog,
    };
  }, [buyDiscountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.buyDiscounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BuyDiscountModel);
  const fieldKey = getFields(BuyDiscountModel);
  const fields = BuyDiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    buyDiscountsUIProps.setIds([]);
    dispatch(actions.fetchBuyDiscounts(buyDiscountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyDiscountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BuyDiscount." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BuyDiscount." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBuyDiscountPage: buyDiscountsUIProps.openEditBuyDiscountPage,
        openDeleteBuyDiscountDialog:
          buyDiscountsUIProps.openDeleteBuyDiscountDialog,
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
    sizePerPage: buyDiscountsUIProps.queryParams.PageSize,
    page: buyDiscountsUIProps.queryParams.PageNumber,
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
                  buyDiscountsUIProps.setQueryParams
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
