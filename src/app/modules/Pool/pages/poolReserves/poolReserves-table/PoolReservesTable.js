import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/poolReserves/poolReservesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePoolReservesUIContext } from "../PoolReservesUIContext";
import { PoolReserveModel } from "../../../../../../core/_models/Pool/PoolReserveModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PoolReservesTable() {
  const { t } = useTranslation();

  const poolReservesUIContext = usePoolReservesUIContext();

  const poolReservesUIProps = useMemo(() => {
    return {
      ids: poolReservesUIContext.ids,
      setIds: poolReservesUIContext.setIds,
      queryParams: poolReservesUIContext.queryParams,
      setQueryParams: poolReservesUIContext.setQueryParams,
      openEditPoolReservePage: poolReservesUIContext.openEditPoolReservePage,
      openDeletePoolReserveDialog: poolReservesUIContext.openDeletePoolReserveDialog,
    };
  }, [poolReservesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.poolReserves }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PoolReserveModel);
  const fieldKey = getFields(PoolReserveModel);
  const fields = PoolReserveModel;

  const dispatch = useDispatch();
  useEffect(() => {
    poolReservesUIProps.setIds([]);
    dispatch(actions.fetchPoolReserves(poolReservesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolReservesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("PoolReserve." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("PoolReserve." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPoolReservePage: poolReservesUIProps.openEditPoolReservePage,
        openDeletePoolReserveDialog: poolReservesUIProps.openDeletePoolReserveDialog,
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
    sizePerPage: poolReservesUIProps.queryParams.PageSize,
    page: poolReservesUIProps.queryParams.PageNumber,
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
                  poolReservesUIProps.setQueryParams
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