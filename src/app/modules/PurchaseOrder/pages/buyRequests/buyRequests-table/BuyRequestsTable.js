import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/buyRequests/buyRequestsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBuyRequestsUIContext } from "../BuyRequestsUIContext";
import { BuyRequestModel } from "../../../../../../core/_models/PurchaseOrder/BuyRequestModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BuyRequestsTable() {
  const { t } = useTranslation();

  const buyRequestsUIContext = useBuyRequestsUIContext();

  const buyRequestsUIProps = useMemo(() => {
    return {
      ids: buyRequestsUIContext.ids,
      setIds: buyRequestsUIContext.setIds,
      queryParams: buyRequestsUIContext.queryParams,
      setQueryParams: buyRequestsUIContext.setQueryParams,
      openEditBuyRequestPage: buyRequestsUIContext.openEditBuyRequestPage,
      openDeleteBuyRequestDialog:
        buyRequestsUIContext.openDeleteBuyRequestDialog,
    };
  }, [buyRequestsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.buyRequests }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BuyRequestModel, "BuyRequestDate", "desc");
  const fieldKey = getFields(BuyRequestModel);
  const fields = BuyRequestModel;

  const dispatch = useDispatch();
  useEffect(() => {
    buyRequestsUIProps.setIds([]);
    dispatch(actions.fetchBuyRequests(buyRequestsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyRequestsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: "CreateBy.FullNameFa",
      text: t("BuyRequest.CreateBy"),
      sort: fields.CreateBy.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Warehouse.Title",
      text: t("BuyRequest.Warehouse"),
      sort: fields.WarehouseId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "BuyRequestStatus.Title",
      text: t("BuyRequest.BuyRequestStatus"),
      sort: fields.BuyRequestStatusId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.BuyRequestDate,
      text: t("BuyRequest." + fields.BuyRequestDate.display),
      sort: fields.BuyRequestDate.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.DateFaColumnFormatter,
    },
    {
      dataField: "Description",
      text: t("BuyRequest.Description"),
      sort: fields.Description.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBuyRequestPage: buyRequestsUIProps.openEditBuyRequestPage,
        openDeleteBuyRequestDialog:
          buyRequestsUIProps.openDeleteBuyRequestDialog,
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
    sizePerPage: buyRequestsUIProps.queryParams.PageSize,
    page: buyRequestsUIProps.queryParams.PageNumber,
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
                  buyRequestsUIProps.setQueryParams
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
