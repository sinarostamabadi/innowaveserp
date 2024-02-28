import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/settlements/settlementsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSettlementsUIContext } from "../SettlementsUIContext";
import { SettlementModel } from "../../../../../../core/_models/Cash/SettlementModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SettlementsTable() {
  const { t } = useTranslation();

  const settlementsUIContext = useSettlementsUIContext();

  const settlementsUIProps = useMemo(() => {
    return {
      ids: settlementsUIContext.ids,
      setIds: settlementsUIContext.setIds,
      queryParams: settlementsUIContext.queryParams,
      setQueryParams: settlementsUIContext.setQueryParams,
      openEditSettlementPage: settlementsUIContext.openEditSettlementPage,
      openDeleteSettlementDialog:
        settlementsUIContext.openDeleteSettlementDialog,
    };
  }, [settlementsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.settlements }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SettlementModel);
  const fieldKey = getFields(SettlementModel);
  const fields = SettlementModel;

  const dispatch = useDispatch();
  useEffect(() => {
    settlementsUIProps.setIds([]);
    dispatch(actions.fetchSettlements(settlementsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settlementsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Settlement." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Settlement." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSettlementPage: settlementsUIProps.openEditSettlementPage,
        openDeleteSettlementDialog:
          settlementsUIProps.openDeleteSettlementDialog,
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
    sizePerPage: settlementsUIProps.queryParams.PageSize,
    page: settlementsUIProps.queryParams.PageNumber,
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
                  settlementsUIProps.setQueryParams
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
