import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellPricingDetails/sellPricingDetailsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSellPricingDetailsUIContext } from "../SellPricingDetailsUIContext";
import { SellPricingDetailModel } from "../../../../../../core/_models/Sell/SellPricingDetailModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SellPricingDetailsTable() {
  const { t } = useTranslation();

  const sellPricingDetailsUIContext = useSellPricingDetailsUIContext();

  const sellPricingDetailsUIProps = useMemo(() => {
    return {
      ids: sellPricingDetailsUIContext.ids,
      setIds: sellPricingDetailsUIContext.setIds,
      queryParams: sellPricingDetailsUIContext.queryParams,
      setQueryParams: sellPricingDetailsUIContext.setQueryParams,
      openEditSellPricingDetailPage: sellPricingDetailsUIContext.openEditSellPricingDetailPage,
      openDeleteSellPricingDetailDialog: sellPricingDetailsUIContext.openDeleteSellPricingDetailDialog,
    };
  }, [sellPricingDetailsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.sellPricingDetails }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SellPricingDetailModel);
  const fieldKey = getFields(SellPricingDetailModel);
  const fields = SellPricingDetailModel;

  const dispatch = useDispatch();
  useEffect(() => {
    sellPricingDetailsUIProps.setIds([]);
    dispatch(actions.fetchSellPricingDetails(sellPricingDetailsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellPricingDetailsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("SellPricingDetail." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("SellPricingDetail." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSellPricingDetailPage: sellPricingDetailsUIProps.openEditSellPricingDetailPage,
        openDeleteSellPricingDetailDialog: sellPricingDetailsUIProps.openDeleteSellPricingDetailDialog,
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
    sizePerPage: sellPricingDetailsUIProps.queryParams.PageSize,
    page: sellPricingDetailsUIProps.queryParams.PageNumber,
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
                  sellPricingDetailsUIProps.setQueryParams
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