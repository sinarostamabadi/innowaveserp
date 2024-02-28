import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/poolTimePriceing/poolTimePriceingActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePoolTimePriceingUIContext } from "../PoolTimePriceingUIContext";
import { PoolTimePriceingModel } from "../../../../../../core/_models/Pool/PoolTimePriceingModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PoolTimePriceingTable() {
  const { t } = useTranslation();

  const poolTimePriceingUIContext = usePoolTimePriceingUIContext();

  const poolTimePriceingUIProps = useMemo(() => {
    return {
      ids: poolTimePriceingUIContext.ids,
      setIds: poolTimePriceingUIContext.setIds,
      queryParams: poolTimePriceingUIContext.queryParams,
      setQueryParams: poolTimePriceingUIContext.setQueryParams,
      openEditPoolTimePriceingPage:
        poolTimePriceingUIContext.openEditPoolTimePriceingPage,
      openDeletePoolTimePriceingDialog:
        poolTimePriceingUIContext.openDeletePoolTimePriceingDialog,
    };
  }, [poolTimePriceingUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.poolTimePriceing }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PoolTimePriceingModel);
  const fieldKey = getFields(PoolTimePriceingModel);
  const fields = PoolTimePriceingModel;

  const dispatch = useDispatch();
  useEffect(() => {
    poolTimePriceingUIProps.setIds([]);
    dispatch(
      actions.fetchPoolTimePriceing(poolTimePriceingUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolTimePriceingUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("PoolTimePriceing." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("PoolTimePriceing." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPoolTimePriceingPage:
          poolTimePriceingUIProps.openEditPoolTimePriceingPage,
        openDeletePoolTimePriceingDialog:
          poolTimePriceingUIProps.openDeletePoolTimePriceingDialog,
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
    sizePerPage: poolTimePriceingUIProps.queryParams.PageSize,
    page: poolTimePriceingUIProps.queryParams.PageNumber,
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
                  poolTimePriceingUIProps.setQueryParams
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
