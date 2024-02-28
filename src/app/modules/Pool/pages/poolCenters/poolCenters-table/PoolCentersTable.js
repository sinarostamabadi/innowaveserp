import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/poolCenters/poolCentersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePoolCentersUIContext } from "../PoolCentersUIContext";
import { PoolCenterModel } from "../../../../../../core/_models/Pool/PoolCenterModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PoolCentersTable() {
  const { t } = useTranslation();

  const poolCentersUIContext = usePoolCentersUIContext();

  const poolCentersUIProps = useMemo(() => {
    return {
      ids: poolCentersUIContext.ids,
      setIds: poolCentersUIContext.setIds,
      queryParams: poolCentersUIContext.queryParams,
      setQueryParams: poolCentersUIContext.setQueryParams,
      openEditPoolCenterPage: poolCentersUIContext.openEditPoolCenterPage,
      openDeletePoolCenterDialog:
        poolCentersUIContext.openDeletePoolCenterDialog,
    };
  }, [poolCentersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.poolCenters }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PoolCenterModel);
  const fieldKey = getFields(PoolCenterModel);
  const fields = PoolCenterModel;

  const dispatch = useDispatch();
  useEffect(() => {
    poolCentersUIProps.setIds([]);
    dispatch(actions.fetchPoolCenters(poolCentersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolCentersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("PoolCenter." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("PoolCenter." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPoolCenterPage: poolCentersUIProps.openEditPoolCenterPage,
        openDeletePoolCenterDialog:
          poolCentersUIProps.openDeletePoolCenterDialog,
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
    sizePerPage: poolCentersUIProps.queryParams.PageSize,
    page: poolCentersUIProps.queryParams.PageNumber,
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
                  poolCentersUIProps.setQueryParams
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
