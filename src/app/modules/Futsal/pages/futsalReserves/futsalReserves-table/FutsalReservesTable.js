import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/futsalReserves/futsalReservesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useFutsalReservesUIContext } from "../FutsalReservesUIContext";
import { FutsalReserveModel } from "../../../../../../core/_models/Futsal/FutsalReserveModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function FutsalReservesTable() {
  const { t } = useTranslation();

  const futsalReservesUIContext = useFutsalReservesUIContext();

  const futsalReservesUIProps = useMemo(() => {
    return {
      ids: futsalReservesUIContext.ids,
      setIds: futsalReservesUIContext.setIds,
      queryParams: futsalReservesUIContext.queryParams,
      setQueryParams: futsalReservesUIContext.setQueryParams,
      openEditFutsalReservePage:
        futsalReservesUIContext.openEditFutsalReservePage,
      openDeleteFutsalReserveDialog:
        futsalReservesUIContext.openDeleteFutsalReserveDialog,
    };
  }, [futsalReservesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.futsalReserves }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(FutsalReserveModel);
  const fieldKey = getFields(FutsalReserveModel);
  const fields = FutsalReserveModel;

  const dispatch = useDispatch();
  useEffect(() => {
    futsalReservesUIProps.setIds([]);
    dispatch(actions.fetchFutsalReserves(futsalReservesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [futsalReservesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.ReserveNumber,
      text: t("FutsalReserve." + fields.ReserveNumber.display),
      sort: fields.ReserveNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Person.FullNameFa",
      text: t("FutsalReserve." + fields.PersonId.display),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "FutsalReserveType.Title",
      text: t("FutsalReserve." + fields.FutsalReserveTypeId.display),
      sort: fields.FutsalReserveTypeId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.FromDate,
      text: t("FutsalReserve." + fields.FromDate.display),
      sort: fields.FromDate.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.DateFaColumnFormatter,
      formatExtraData: { field: "FromDate" },
    },
    {
      dataField: fieldKey.ToDate,
      text: t("FutsalReserve." + fields.ToDate.display),
      sort: fields.ToDate.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.DateFaColumnFormatter,
      formatExtraData: { field: "ToDate" },
    },
    {
      dataField: fieldKey.PersonCount,
      text: t("FutsalReserve." + fields.PersonCount.display),
      sort: fields.PersonCount.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Price,
      text: t("FutsalReserve." + fields.Price.display),
      sort: fields.Price.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditFutsalReservePage:
          futsalReservesUIProps.openEditFutsalReservePage,
        openDeleteFutsalReserveDialog:
          futsalReservesUIProps.openDeleteFutsalReserveDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: { minWidth: "100px" },
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: futsalReservesUIProps.queryParams.PageSize,
    page: futsalReservesUIProps.queryParams.PageNumber,
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
                  futsalReservesUIProps.setQueryParams
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
