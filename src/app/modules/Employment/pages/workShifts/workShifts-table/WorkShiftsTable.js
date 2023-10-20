import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/workShifts/workShiftsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useWorkShiftsUIContext } from "../WorkShiftsUIContext";
import { WorkShiftModel } from "../../../../../../core/_models/Employment/WorkShiftModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function WorkShiftsTable() {
  const { t } = useTranslation();

  const workShiftsUIContext = useWorkShiftsUIContext();

  const workShiftsUIProps = useMemo(() => {
    return {
      ids: workShiftsUIContext.ids,
      setIds: workShiftsUIContext.setIds,
      queryParams: workShiftsUIContext.queryParams,
      setQueryParams: workShiftsUIContext.setQueryParams,
      openEditWorkShiftPage: workShiftsUIContext.openEditWorkShiftPage,
      openDeleteWorkShiftDialog: workShiftsUIContext.openDeleteWorkShiftDialog,
    };
  }, [workShiftsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.workShifts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(WorkShiftModel);
  const fieldKey = getFields(WorkShiftModel);
  const fields = WorkShiftModel;

  const dispatch = useDispatch();
  useEffect(() => {
    workShiftsUIProps.setIds([]);
    dispatch(actions.fetchWorkShifts(workShiftsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workShiftsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("WorkShift." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("WorkShift." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditWorkShiftPage: workShiftsUIProps.openEditWorkShiftPage,
        openDeleteWorkShiftDialog: workShiftsUIProps.openDeleteWorkShiftDialog,
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
    sizePerPage: workShiftsUIProps.queryParams.PageSize,
    page: workShiftsUIProps.queryParams.PageNumber,
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
                  workShiftsUIProps.setQueryParams
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