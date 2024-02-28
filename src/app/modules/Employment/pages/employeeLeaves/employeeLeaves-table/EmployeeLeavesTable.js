import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeLeaves/employeeLeavesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeLeavesUIContext } from "../EmployeeLeavesUIContext";
import { EmployeeLeaveModel } from "../../../../../../core/_models/Employment/EmployeeLeaveModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeLeavesTable() {
  const { t } = useTranslation();

  const employeeLeavesUIContext = useEmployeeLeavesUIContext();

  const employeeLeavesUIProps = useMemo(() => {
    return {
      ids: employeeLeavesUIContext.ids,
      setIds: employeeLeavesUIContext.setIds,
      queryParams: employeeLeavesUIContext.queryParams,
      setQueryParams: employeeLeavesUIContext.setQueryParams,
      openEditEmployeeLeavePage:
        employeeLeavesUIContext.openEditEmployeeLeavePage,
      openDeleteEmployeeLeaveDialog:
        employeeLeavesUIContext.openDeleteEmployeeLeaveDialog,
    };
  }, [employeeLeavesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeLeaves }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeLeaveModel);
  const fieldKey = getFields(EmployeeLeaveModel);
  const fields = EmployeeLeaveModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeLeavesUIProps.setIds([]);
    dispatch(actions.fetchEmployeeLeaves(employeeLeavesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeLeavesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeLeave." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeLeave." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeLeavePage:
          employeeLeavesUIProps.openEditEmployeeLeavePage,
        openDeleteEmployeeLeaveDialog:
          employeeLeavesUIProps.openDeleteEmployeeLeaveDialog,
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
    sizePerPage: employeeLeavesUIProps.queryParams.PageSize,
    page: employeeLeavesUIProps.queryParams.PageNumber,
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
                  employeeLeavesUIProps.setQueryParams
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
