import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Employees/EmployeesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { DataFormatter, DateFaColumnFormatter } from "src/core/_formatters";
import { Pagination } from "src/core/_partials/controls";
import { useEmployeesUIContext } from "../EmployeesUIContext";
import { BodyBuildingEmployeeModel } from "src/core/_models/BodyBuilding/BodyBuildingEmployeeModel";
import {
  getConfig,
  getFields,
} from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeesTable() {
  const { t } = useTranslation();

  const uiContext = useEmployeesUIContext();

  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditEmployeePage: uiContext.openEditEmployeePage,
      openDeleteEmployeeDialog: uiContext.openDeleteEmployeeDialog,
    };
  }, [uiContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employees }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingEmployeeModel);
  const fieldKey = getFields(BodyBuildingEmployeeModel);
  const fields = BodyBuildingEmployeeModel;

  const dispatch = useDispatch();

  useEffect(() => {
    uiProps.setIds([]);
    dispatch(
      actions.fetchEmployees(uiProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.queryParams, dispatch]);

  const cooperationTypes = {
    1: t("Common.Male"),
    2: t("Common.Female")
  };

  const columns = [
    {
      dataField: "RealPerson.FullNameFa",
      text: t("BodyBuildingEmployee.RealPerson"),
      sort: fields.RealPersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "BodyBuildingEmployeeType.Title",
      text: t("BodyBuildingEmployee.BodyBuildingEmployeeType"),
      sort: fields.BodyBuildingEmployeeTypeId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "CooperationType",
      text: t("BodyBuildingEmployee.CooperationType"),
      sort: fields.CooperationType.sortable,
      sortCaret: sortCaret,
      formatter: DataFormatter,
      formatExtraData: {data: cooperationTypes}
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeePage: uiProps.openEditEmployeePage,
        openDeleteEmployeeDialog: uiProps.openDeleteEmployeeDialog,
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
    sizePerPage: uiProps.queryParams.PageSize,
    page: uiProps.queryParams.PageNumber,
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
                  uiProps.setQueryParams
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
