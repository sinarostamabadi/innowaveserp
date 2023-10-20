import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/buySerials/buySerialsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBuySerialsUIContext } from "../BuySerialsUIContext";
import { BuySerialModel } from "../../../../../../core/_models/PurchaseOrder/BuySerialModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BuySerialsTable() {
  const { t } = useTranslation();

  const buySerialsUIContext = useBuySerialsUIContext();

  const buySerialsUIProps = useMemo(() => {
    return {
      ids: buySerialsUIContext.ids,
      setIds: buySerialsUIContext.setIds,
      queryParams: buySerialsUIContext.queryParams,
      setQueryParams: buySerialsUIContext.setQueryParams,
      openEditBuySerialPage: buySerialsUIContext.openEditBuySerialPage,
      openDeleteBuySerialDialog: buySerialsUIContext.openDeleteBuySerialDialog,
    };
  }, [buySerialsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.buySerials }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BuySerialModel);
  const fieldKey = getFields(BuySerialModel);
  const fields = BuySerialModel;

  const dispatch = useDispatch();
  useEffect(() => {
    buySerialsUIProps.setIds([]);
    dispatch(actions.fetchBuySerials(buySerialsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buySerialsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BuySerial." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BuySerial." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBuySerialPage: buySerialsUIProps.openEditBuySerialPage,
        openDeleteBuySerialDialog: buySerialsUIProps.openDeleteBuySerialDialog,
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
    sizePerPage: buySerialsUIProps.queryParams.PageSize,
    page: buySerialsUIProps.queryParams.PageNumber,
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
                  buySerialsUIProps.setQueryParams
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