import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeSpecialDates/employeeSpecialDatesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeSpecialDatesUIContext } from "../EmployeeSpecialDatesUIContext";
import { EmployeeSpecialDateModel } from "../../../../../../core/_models/Employment/EmployeeSpecialDateModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeSpecialDatesTable() {
  const { t } = useTranslation();

  const employeeSpecialDatesUIContext = useEmployeeSpecialDatesUIContext();

  const employeeSpecialDatesUIProps = useMemo(() => {
    return {
      ids: employeeSpecialDatesUIContext.ids,
      setIds: employeeSpecialDatesUIContext.setIds,
      queryParams: employeeSpecialDatesUIContext.queryParams,
      setQueryParams: employeeSpecialDatesUIContext.setQueryParams,
      openEditEmployeeSpecialDatePage: employeeSpecialDatesUIContext.openEditEmployeeSpecialDatePage,
      openDeleteEmployeeSpecialDateDialog: employeeSpecialDatesUIContext.openDeleteEmployeeSpecialDateDialog,
    };
  }, [employeeSpecialDatesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeSpecialDates }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeSpecialDateModel);
  const fieldKey = getFields(EmployeeSpecialDateModel);
  const fields = EmployeeSpecialDateModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeSpecialDatesUIProps.setIds([]);
    dispatch(actions.fetchEmployeeSpecialDates(employeeSpecialDatesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeSpecialDatesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeSpecialDate." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeSpecialDate." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeSpecialDatePage: employeeSpecialDatesUIProps.openEditEmployeeSpecialDatePage,
        openDeleteEmployeeSpecialDateDialog: employeeSpecialDatesUIProps.openDeleteEmployeeSpecialDateDialog,
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
    sizePerPage: employeeSpecialDatesUIProps.queryParams.PageSize,
    page: employeeSpecialDatesUIProps.queryParams.PageNumber,
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
                  employeeSpecialDatesUIProps.setQueryParams
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