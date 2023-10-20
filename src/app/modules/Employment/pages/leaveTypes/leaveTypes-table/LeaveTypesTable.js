import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/leaveTypes/leaveTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useLeaveTypesUIContext } from "../LeaveTypesUIContext";
import { LeaveTypeModel } from "../../../../../../core/_models/Employment/LeaveTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function LeaveTypesTable() {
  const { t } = useTranslation();

  const leaveTypesUIContext = useLeaveTypesUIContext();

  const leaveTypesUIProps = useMemo(() => {
    return {
      ids: leaveTypesUIContext.ids,
      setIds: leaveTypesUIContext.setIds,
      queryParams: leaveTypesUIContext.queryParams,
      setQueryParams: leaveTypesUIContext.setQueryParams,
      openEditLeaveTypePage: leaveTypesUIContext.openEditLeaveTypePage,
      openDeleteLeaveTypeDialog: leaveTypesUIContext.openDeleteLeaveTypeDialog,
    };
  }, [leaveTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.leaveTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(LeaveTypeModel);
  const fieldKey = getFields(LeaveTypeModel);
  const fields = LeaveTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    leaveTypesUIProps.setIds([]);
    dispatch(actions.fetchLeaveTypes(leaveTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("LeaveType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("LeaveType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditLeaveTypePage: leaveTypesUIProps.openEditLeaveTypePage,
        openDeleteLeaveTypeDialog: leaveTypesUIProps.openDeleteLeaveTypeDialog,
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
    sizePerPage: leaveTypesUIProps.queryParams.PageSize,
    page: leaveTypesUIProps.queryParams.PageNumber,
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
                  leaveTypesUIProps.setQueryParams
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