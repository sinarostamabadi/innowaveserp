import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/workShiftCalenders/workShiftCalendersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useWorkShiftCalendersUIContext } from "../WorkShiftCalendersUIContext";
import { WorkShiftCalenderModel } from "../../../../../../core/_models/Employment/WorkShiftCalenderModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function WorkShiftCalendersTable() {
  const { t } = useTranslation();

  const workShiftCalendersUIContext = useWorkShiftCalendersUIContext();

  const workShiftCalendersUIProps = useMemo(() => {
    return {
      ids: workShiftCalendersUIContext.ids,
      setIds: workShiftCalendersUIContext.setIds,
      queryParams: workShiftCalendersUIContext.queryParams,
      setQueryParams: workShiftCalendersUIContext.setQueryParams,
      openEditWorkShiftCalenderPage:
        workShiftCalendersUIContext.openEditWorkShiftCalenderPage,
      openDeleteWorkShiftCalenderDialog:
        workShiftCalendersUIContext.openDeleteWorkShiftCalenderDialog,
    };
  }, [workShiftCalendersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.workShiftCalenders }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(WorkShiftCalenderModel);
  const fieldKey = getFields(WorkShiftCalenderModel);
  const fields = WorkShiftCalenderModel;

  const dispatch = useDispatch();
  useEffect(() => {
    workShiftCalendersUIProps.setIds([]);
    dispatch(
      actions.fetchWorkShiftCalenders(workShiftCalendersUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workShiftCalendersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("WorkShiftCalender." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("WorkShiftCalender." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditWorkShiftCalenderPage:
          workShiftCalendersUIProps.openEditWorkShiftCalenderPage,
        openDeleteWorkShiftCalenderDialog:
          workShiftCalendersUIProps.openDeleteWorkShiftCalenderDialog,
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
    sizePerPage: workShiftCalendersUIProps.queryParams.PageSize,
    page: workShiftCalendersUIProps.queryParams.PageNumber,
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
                  workShiftCalendersUIProps.setQueryParams
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
