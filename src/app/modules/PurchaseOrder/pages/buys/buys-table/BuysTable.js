import { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useHistory } from "react-router-dom";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/buys/buysActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useBuysUIContext } from "../BuysUIContext";
import { BuyModel } from "src/core/_models/PurchaseOrder/BuyModel";
import { getConfig, getFields } from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { createCashRequest } from "src/app/modules/Cash/_redux/cashDocuments/cashDocumentsCrud";

export function BuysTable() {
  const { t } = useTranslation();
  let history = useHistory();

  const buysUIContext = useBuysUIContext();

  const buysUIProps = useMemo(() => {
    return {
      ids: buysUIContext.ids,
      setIds: buysUIContext.setIds,
      queryParams: buysUIContext.queryParams,
      setQueryParams: buysUIContext.setQueryParams,
      openEditBuyPage: buysUIContext.openEditBuyPage,
      openDeleteBuyDialog: buysUIContext.openDeleteBuyDialog,
      openCancelAndReturnDialog: buysUIContext.openCancelAndReturnDialog,
      openAttachmentsDialog: buysUIContext.openAttachmentsDialog,
    };
  }, [buysUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.buys }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BuyModel, "BuyDate", "desc");
  const fieldKey = getFields(BuyModel);
  const fields = BuyModel;

  const dispatch = useDispatch();
  useEffect(() => {
    buysUIProps.setIds([]);
    dispatch(actions.fetchBuys(buysUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buysUIProps.queryParams, dispatch]);

  function openBuyProfit(buyId) {
    window.open(
      process.env.REACT_APP_API_URL + `ProductManagement/buyprofit/${buyId}`
    );
  }

  const columns = [
    {
      dataField: fieldKey.BuyNumber,
      text: t("Buy." + fields.BuyNumber.display),
      sort: fields.BuyNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.FactorNumber,
      text: t("Buy." + fields.FactorNumber.display),
      sort: fields.FactorNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.BuyDate,
      text: t("Buy." + fields.BuyDate.display),
      sort: fields.BuyDate.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.FactorDate,
      text: t("Buy." + fields.FactorDate.display),
      sort: fields.FactorDate.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.DateFaColumnFormatter,
    },
    {
      dataField: "Provider.FullNameFa",
      text: t("Buy.Provider"),
      sort: fields.ProviderId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Inquiry.FullNameFa",
      text: t("Buy.Inquiry"),
      sort: fields.InquiryId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBuyPage: buysUIProps.openEditBuyPage,
        openDeleteBuyDialog: buysUIProps.openDeleteBuyDialog,
        openCancelAndReturnDialog: buysUIProps.openCancelAndReturnDialog,
        openAttachmentsDialog: buysUIProps.openAttachmentsDialog,
        openBuyProfit: openBuyProfit,
        pay: (buyId) => {
          createCashRequest(buyId, 4).then(({ data }) =>
            history.push(`/cash/cashDocuments/quick/${data}`)
          );
        },
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
    sizePerPage: buysUIProps.queryParams.PageSize,
    page: buysUIProps.queryParams.PageNumber,
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
                  buysUIProps.setQueryParams
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
