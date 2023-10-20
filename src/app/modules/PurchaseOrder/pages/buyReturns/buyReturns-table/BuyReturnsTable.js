import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/buyReturns/buyReturnsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBuyReturnsUIContext } from "../BuyReturnsUIContext";
import { BuyReturnModel } from "../../../../../../core/_models/PurchaseOrder/BuyReturnModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BuyReturnsTable() {
  const { t } = useTranslation();
  const buyReturnsUIContext = useBuyReturnsUIContext();

  const buyReturnsUIProps = useMemo(() => {
    return {
      ids: buyReturnsUIContext.ids,
      setIds: buyReturnsUIContext.setIds,
      queryParams: buyReturnsUIContext.queryParams,
      setQueryParams: buyReturnsUIContext.setQueryParams,
      openEditBuyReturnPage: buyReturnsUIContext.openEditBuyReturnPage,
      openDeleteBuyReturnDialog: buyReturnsUIContext.openDeleteBuyReturnDialog,
      openCancelAndReturnDialog: buyReturnsUIContext.openCancelAndReturnDialog,
      openAttachmentsDialog: buyReturnsUIContext.openAttachmentsDialog
    };
  }, [buyReturnsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.buyReturns }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BuyReturnModel, "BuyReturnDate", "desc");
  const fieldKey = getFields(BuyReturnModel);
  const fields = BuyReturnModel;

  const dispatch = useDispatch();
  useEffect(() => {
    buyReturnsUIProps.setIds([]);
    dispatch(actions.fetchBuyReturns(buyReturnsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyReturnsUIProps.queryParams, dispatch]);

  function openBuyReturnProfit(buyReturnId) {
    window.open(process.env.REACT_APP_API_URL + `ProductManagement/buyReturnprofit/${buyReturnId}`);
  }

  const columns = [
    {
      dataField: fieldKey.BuyReturnNumber,
      text: t("BuyReturn." + fields.BuyReturnNumber.display),
      sort: fields.BuyReturnNumber.sortable,
      sortCaret: sortCaret,
    },  
    {
      dataField: fieldKey.FactorNumber,
      text: t("BuyReturn." + fields.FactorNumber.display),
      sort: fields.FactorNumber.sortable,
      sortCaret: sortCaret,
    },   
    {
      dataField: fieldKey.BuyReturnDate,
      text: t("BuyReturn." + fields.BuyReturnDate.display),
      sort: fields.BuyReturnDate.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.FactorDate,
      text: t("BuyReturn." + fields.FactorDate.display),
      sort: fields.FactorDate.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.DateFaColumnFormatter,
    },
    {
      dataField: "Provider.FullNameFa",
      text: t("BuyReturn.Provider"),
      sort: fields.ProviderId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Inquiry.FullNameFa",
      text: t("BuyReturn.Inquiry"),
      sort: fields.InquiryId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBuyReturnPage: buyReturnsUIProps.openEditBuyReturnPage,
        openDeleteBuyReturnDialog: buyReturnsUIProps.openDeleteBuyReturnDialog,
        openCancelAndReturnDialog: buyReturnsUIProps.openCancelAndReturnDialog,
        openAttachmentsDialog: buyReturnsUIProps.openAttachmentsDialog,
        openBuyReturnProfit: openBuyReturnProfit,
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
    sizePerPage: buyReturnsUIProps.queryParams.PageSize,
    page: buyReturnsUIProps.queryParams.PageNumber,
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
                  buyReturnsUIProps.setQueryParams
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