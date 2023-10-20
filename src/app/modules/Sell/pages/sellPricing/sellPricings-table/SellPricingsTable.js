import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellPricing/sellPricingActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSellPricingsUIContext } from "../SellPricingsUIContext";
import { SellPricingModel } from "../../../../../../core/_models/Sell/SellPricingModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { DateFaColumnFormatter, CheckBoxFormatter } from "../../../../../../core/_formatters";

export function SellPricingsTable() {
  const { t } = useTranslation();

  const sellPricingsUIContext = useSellPricingsUIContext();

  const sellPricingsUIProps = useMemo(() => {
    return {
      ids: sellPricingsUIContext.ids,
      setIds: sellPricingsUIContext.setIds,
      queryParams: sellPricingsUIContext.queryParams,
      setQueryParams: sellPricingsUIContext.setQueryParams,
      openEditSellPricingPage: sellPricingsUIContext.openEditSellPricingPage,
      openDeleteSellPricingDialog: sellPricingsUIContext.openDeleteSellPricingDialog,
    };
  }, [sellPricingsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.sellPricings }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SellPricingModel);
  const fieldKey = getFields(SellPricingModel);
  const fields = SellPricingModel;

  const dispatch = useDispatch();

  useEffect(() => {
    sellPricingsUIProps.setIds([]);
    dispatch(actions.fetchSellPricings(sellPricingsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellPricingsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.SellPricingNumber,
      text: t("SellPricing." + fields.SellPricingNumber.display),
      sort: fields.SellPricingNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.RegisterDate,
      text: t("SellPricing." + fields.RegisterDate.display),
      sort: fields.RegisterDate.sortable,
      formatter: DateFaColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.FromDate,
      text: t("SellPricing." + fields.FromDate.display),
      sort: fields.FromDate.sortable,
      formatter: DateFaColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.ToDate,
      text: t("SellPricing." + fields.ToDate.display),
      sort: fields.ToDate.sortable,
      formatter: DateFaColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.IsAccepted,
      text: t("SellPricing." + fields.IsAccepted.display),
      sort: fields.IsAccepted.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.CheckBoxFormatter,
      formatExtraData: { t: t, positive: t("Common.Yes"), negetive: t("Common.No") }
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSellPricingPage: sellPricingsUIProps.openEditSellPricingPage,
        openDeleteSellPricingDialog: sellPricingsUIProps.openDeleteSellPricingDialog,
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
    sizePerPage: sellPricingsUIProps.queryParams.PageSize,
    page: sellPricingsUIProps.queryParams.PageNumber,
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
                  sellPricingsUIProps.setQueryParams
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