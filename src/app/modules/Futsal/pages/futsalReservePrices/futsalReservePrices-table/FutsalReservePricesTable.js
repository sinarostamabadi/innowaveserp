import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/futsalReservePrices/futsalReservePricesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useFutsalReservePricesUIContext } from "../FutsalReservePricesUIContext";
import { FutsalReservePriceModel } from "../../../../../../core/_models/Futsal/FutsalReservePriceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function FutsalReservePricesTable() {
  const { t } = useTranslation();

  const futsalReservePricesUIContext = useFutsalReservePricesUIContext();

  const futsalReservePricesUIProps = useMemo(() => {
    return {
      ids: futsalReservePricesUIContext.ids,
      setIds: futsalReservePricesUIContext.setIds,
      queryParams: futsalReservePricesUIContext.queryParams,
      setQueryParams: futsalReservePricesUIContext.setQueryParams,
      openEditFutsalReservePricePage: futsalReservePricesUIContext.openEditFutsalReservePricePage,
      openDeleteFutsalReservePriceDialog: futsalReservePricesUIContext.openDeleteFutsalReservePriceDialog,
    };
  }, [futsalReservePricesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.futsalReservePrices }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(FutsalReservePriceModel);
  const fieldKey = getFields(FutsalReservePriceModel);
  const fields = FutsalReservePriceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    futsalReservePricesUIProps.setIds([]);
    dispatch(actions.fetchFutsalReservePrices(futsalReservePricesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [futsalReservePricesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("FutsalReservePrice." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("FutsalReservePrice." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditFutsalReservePricePage: futsalReservePricesUIProps.openEditFutsalReservePricePage,
        openDeleteFutsalReservePriceDialog: futsalReservePricesUIProps.openDeleteFutsalReservePriceDialog,
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
    sizePerPage: futsalReservePricesUIProps.queryParams.PageSize,
    page: futsalReservePricesUIProps.queryParams.PageNumber,
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
                  futsalReservePricesUIProps.setQueryParams
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