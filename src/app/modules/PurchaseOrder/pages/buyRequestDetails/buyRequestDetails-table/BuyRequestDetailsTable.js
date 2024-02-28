import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/buyRequestDetails/buyRequestDetailsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBuyRequestDetailsUIContext } from "../BuyRequestDetailsUIContext";
import { BuyRequestDetailModel } from "../../../../../../core/_models/PurchaseOrder/BuyRequestDetailModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BuyRequestDetailsTable() {
  const { t } = useTranslation();

  const buyRequestDetailsUIContext = useBuyRequestDetailsUIContext();

  const buyRequestDetailsUIProps = useMemo(() => {
    return {
      ids: buyRequestDetailsUIContext.ids,
      setIds: buyRequestDetailsUIContext.setIds,
      queryParams: buyRequestDetailsUIContext.queryParams,
      setQueryParams: buyRequestDetailsUIContext.setQueryParams,
      openEditBuyRequestDetailPage:
        buyRequestDetailsUIContext.openEditBuyRequestDetailPage,
      openDeleteBuyRequestDetailDialog:
        buyRequestDetailsUIContext.openDeleteBuyRequestDetailDialog,
    };
  }, [buyRequestDetailsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.buyRequestDetails }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BuyRequestDetailModel);
  const fieldKey = getFields(BuyRequestDetailModel);
  const fields = BuyRequestDetailModel;

  const dispatch = useDispatch();
  useEffect(() => {
    buyRequestDetailsUIProps.setIds([]);
    dispatch(
      actions.fetchBuyRequestDetails(buyRequestDetailsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyRequestDetailsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BuyRequestDetail." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BuyRequestDetail." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBuyRequestDetailPage:
          buyRequestDetailsUIProps.openEditBuyRequestDetailPage,
        openDeleteBuyRequestDetailDialog:
          buyRequestDetailsUIProps.openDeleteBuyRequestDetailDialog,
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
    sizePerPage: buyRequestDetailsUIProps.queryParams.PageSize,
    page: buyRequestDetailsUIProps.queryParams.PageNumber,
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
                  buyRequestDetailsUIProps.setQueryParams
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
