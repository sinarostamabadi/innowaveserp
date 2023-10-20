import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/billiardReservePrices/billiardReservePricesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBilliardReservePricesUIContext } from "../BilliardReservePricesUIContext";
import { BilliardReservePriceModel } from "../../../../../../core/_models/Billiard/BilliardReservePriceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BilliardReservePricesTable() {
  const { t } = useTranslation();

  const billiardReservePricesUIContext = useBilliardReservePricesUIContext();

  const billiardReservePricesUIProps = useMemo(() => {
    return {
      ids: billiardReservePricesUIContext.ids,
      setIds: billiardReservePricesUIContext.setIds,
      queryParams: billiardReservePricesUIContext.queryParams,
      setQueryParams: billiardReservePricesUIContext.setQueryParams,
      openEditBilliardReservePricePage: billiardReservePricesUIContext.openEditBilliardReservePricePage,
      openDeleteBilliardReservePriceDialog: billiardReservePricesUIContext.openDeleteBilliardReservePriceDialog,
    };
  }, [billiardReservePricesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.billiardReservePrices }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BilliardReservePriceModel);
  const fieldKey = getFields(BilliardReservePriceModel);
  const fields = BilliardReservePriceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    billiardReservePricesUIProps.setIds([]);
    dispatch(actions.fetchBilliardReservePrices(billiardReservePricesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billiardReservePricesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BilliardReservePrice." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BilliardReservePrice." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBilliardReservePricePage: billiardReservePricesUIProps.openEditBilliardReservePricePage,
        openDeleteBilliardReservePriceDialog: billiardReservePricesUIProps.openDeleteBilliardReservePriceDialog,
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
    sizePerPage: billiardReservePricesUIProps.queryParams.PageSize,
    page: billiardReservePricesUIProps.queryParams.PageNumber,
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
                  billiardReservePricesUIProps.setQueryParams
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