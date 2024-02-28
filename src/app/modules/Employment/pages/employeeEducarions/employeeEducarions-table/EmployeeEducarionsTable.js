import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeEducarions/employeeEducarionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeEducarionsUIContext } from "../EmployeeEducarionsUIContext";
import { EmployeeEducarionModel } from "../../../../../../core/_models/Employment/EmployeeEducarionModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeEducarionsTable() {
  const { t } = useTranslation();

  const employeeEducarionsUIContext = useEmployeeEducarionsUIContext();

  const employeeEducarionsUIProps = useMemo(() => {
    return {
      ids: employeeEducarionsUIContext.ids,
      setIds: employeeEducarionsUIContext.setIds,
      queryParams: employeeEducarionsUIContext.queryParams,
      setQueryParams: employeeEducarionsUIContext.setQueryParams,
      openEditEmployeeEducarionPage:
        employeeEducarionsUIContext.openEditEmployeeEducarionPage,
      openDeleteEmployeeEducarionDialog:
        employeeEducarionsUIContext.openDeleteEmployeeEducarionDialog,
    };
  }, [employeeEducarionsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeEducarions }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeEducarionModel);
  const fieldKey = getFields(EmployeeEducarionModel);
  const fields = EmployeeEducarionModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeEducarionsUIProps.setIds([]);
    dispatch(
      actions.fetchEmployeeEducarions(employeeEducarionsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeEducarionsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeEducarion." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeEducarion." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeEducarionPage:
          employeeEducarionsUIProps.openEditEmployeeEducarionPage,
        openDeleteEmployeeEducarionDialog:
          employeeEducarionsUIProps.openDeleteEmployeeEducarionDialog,
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
    sizePerPage: employeeEducarionsUIProps.queryParams.PageSize,
    page: employeeEducarionsUIProps.queryParams.PageNumber,
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
                  employeeEducarionsUIProps.setQueryParams
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
