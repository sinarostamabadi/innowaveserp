import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeLeaveChanges/employeeLeaveChangesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeLeaveChangesUIContext } from "../EmployeeLeaveChangesUIContext";
import { EmployeeLeaveChangeModel } from "../../../../../../core/_models/Employment/EmployeeLeaveChangeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeLeaveChangesTable() {
  const { t } = useTranslation();

  const employeeLeaveChangesUIContext = useEmployeeLeaveChangesUIContext();

  const employeeLeaveChangesUIProps = useMemo(() => {
    return {
      ids: employeeLeaveChangesUIContext.ids,
      setIds: employeeLeaveChangesUIContext.setIds,
      queryParams: employeeLeaveChangesUIContext.queryParams,
      setQueryParams: employeeLeaveChangesUIContext.setQueryParams,
      openEditEmployeeLeaveChangePage:
        employeeLeaveChangesUIContext.openEditEmployeeLeaveChangePage,
      openDeleteEmployeeLeaveChangeDialog:
        employeeLeaveChangesUIContext.openDeleteEmployeeLeaveChangeDialog,
    };
  }, [employeeLeaveChangesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeLeaveChanges }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeLeaveChangeModel);
  const fieldKey = getFields(EmployeeLeaveChangeModel);
  const fields = EmployeeLeaveChangeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeLeaveChangesUIProps.setIds([]);
    dispatch(
      actions.fetchEmployeeLeaveChanges(employeeLeaveChangesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeLeaveChangesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeLeaveChange." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeLeaveChange." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeLeaveChangePage:
          employeeLeaveChangesUIProps.openEditEmployeeLeaveChangePage,
        openDeleteEmployeeLeaveChangeDialog:
          employeeLeaveChangesUIProps.openDeleteEmployeeLeaveChangeDialog,
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
    sizePerPage: employeeLeaveChangesUIProps.queryParams.PageSize,
    page: employeeLeaveChangesUIProps.queryParams.PageNumber,
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
                  employeeLeaveChangesUIProps.setQueryParams
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
