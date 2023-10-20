import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeMonthlyCalculateds/employeeMonthlyCalculatedsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeMonthlyCalculatedsUIContext } from "../EmployeeMonthlyCalculatedsUIContext";
import { EmployeeMonthlyCalculatedModel } from "../../../../../../core/_models/Employment/EmployeeMonthlyCalculatedModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeMonthlyCalculatedsTable() {
  const { t } = useTranslation();

  const employeeMonthlyCalculatedsUIContext = useEmployeeMonthlyCalculatedsUIContext();

  const employeeMonthlyCalculatedsUIProps = useMemo(() => {
    return {
      ids: employeeMonthlyCalculatedsUIContext.ids,
      setIds: employeeMonthlyCalculatedsUIContext.setIds,
      queryParams: employeeMonthlyCalculatedsUIContext.queryParams,
      setQueryParams: employeeMonthlyCalculatedsUIContext.setQueryParams,
      openEditEmployeeMonthlyCalculatedPage: employeeMonthlyCalculatedsUIContext.openEditEmployeeMonthlyCalculatedPage,
      openDeleteEmployeeMonthlyCalculatedDialog: employeeMonthlyCalculatedsUIContext.openDeleteEmployeeMonthlyCalculatedDialog,
    };
  }, [employeeMonthlyCalculatedsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeMonthlyCalculateds }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeMonthlyCalculatedModel);
  const fieldKey = getFields(EmployeeMonthlyCalculatedModel);
  const fields = EmployeeMonthlyCalculatedModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeMonthlyCalculatedsUIProps.setIds([]);
    dispatch(actions.fetchEmployeeMonthlyCalculateds(employeeMonthlyCalculatedsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeMonthlyCalculatedsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeMonthlyCalculated." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeMonthlyCalculated." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeMonthlyCalculatedPage: employeeMonthlyCalculatedsUIProps.openEditEmployeeMonthlyCalculatedPage,
        openDeleteEmployeeMonthlyCalculatedDialog: employeeMonthlyCalculatedsUIProps.openDeleteEmployeeMonthlyCalculatedDialog,
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
    sizePerPage: employeeMonthlyCalculatedsUIProps.queryParams.PageSize,
    page: employeeMonthlyCalculatedsUIProps.queryParams.PageNumber,
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
                  employeeMonthlyCalculatedsUIProps.setQueryParams
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