import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/timePriceing/timePriceingActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useTimePriceingUIContext } from "../TimePriceingUIContext";
import { TimePriceingModel } from "../../../../../../core/_models/Bowling/TimePriceingModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function TimePriceingTable() {
  const { t } = useTranslation();

  const timePriceingUIContext = useTimePriceingUIContext();

  const timePriceingUIProps = useMemo(() => {
    return {
      ids: timePriceingUIContext.ids,
      setIds: timePriceingUIContext.setIds,
      queryParams: timePriceingUIContext.queryParams,
      setQueryParams: timePriceingUIContext.setQueryParams,
      openEditTimePriceingPage: timePriceingUIContext.openEditTimePriceingPage,
      openDeleteTimePriceingDialog: timePriceingUIContext.openDeleteTimePriceingDialog,
    };
  }, [timePriceingUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.timePriceing }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(TimePriceingModel);
  const fieldKey = getFields(TimePriceingModel);
  const fields = TimePriceingModel;

  const dispatch = useDispatch();
  useEffect(() => {
    timePriceingUIProps.setIds([]);
    dispatch(actions.fetchTimePriceing(timePriceingUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePriceingUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("TimePriceing." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("TimePriceing." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditTimePriceingPage: timePriceingUIProps.openEditTimePriceingPage,
        openDeleteTimePriceingDialog: timePriceingUIProps.openDeleteTimePriceingDialog,
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
    sizePerPage: timePriceingUIProps.queryParams.PageSize,
    page: timePriceingUIProps.queryParams.PageNumber,
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
                  timePriceingUIProps.setQueryParams
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