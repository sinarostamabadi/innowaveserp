import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDocumentDiscounts/sellDocumentDiscountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSellDocumentDiscountsUIContext } from "../SellDocumentDiscountsUIContext";
import { SellDocumentDiscountModel } from "../../../../../../core/_models/Sell/SellDocumentDiscountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SellDocumentDiscountsTable() {
  const { t } = useTranslation();

  const sellDocumentDiscountsUIContext = useSellDocumentDiscountsUIContext();

  const sellDocumentDiscountsUIProps = useMemo(() => {
    return {
      ids: sellDocumentDiscountsUIContext.ids,
      setIds: sellDocumentDiscountsUIContext.setIds,
      queryParams: sellDocumentDiscountsUIContext.queryParams,
      setQueryParams: sellDocumentDiscountsUIContext.setQueryParams,
      openEditSellDocumentDiscountPage: sellDocumentDiscountsUIContext.openEditSellDocumentDiscountPage,
      openDeleteSellDocumentDiscountDialog: sellDocumentDiscountsUIContext.openDeleteSellDocumentDiscountDialog,
    };
  }, [sellDocumentDiscountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.sellDocumentDiscounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SellDocumentDiscountModel);
  const fieldKey = getFields(SellDocumentDiscountModel);
  const fields = SellDocumentDiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    sellDocumentDiscountsUIProps.setIds([]);
    dispatch(actions.fetchSellDocumentDiscounts(sellDocumentDiscountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDocumentDiscountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("SellDocumentDiscount." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("SellDocumentDiscount." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSellDocumentDiscountPage: sellDocumentDiscountsUIProps.openEditSellDocumentDiscountPage,
        openDeleteSellDocumentDiscountDialog: sellDocumentDiscountsUIProps.openDeleteSellDocumentDiscountDialog,
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
    sizePerPage: sellDocumentDiscountsUIProps.queryParams.PageSize,
    page: sellDocumentDiscountsUIProps.queryParams.PageNumber,
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
                  sellDocumentDiscountsUIProps.setQueryParams
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