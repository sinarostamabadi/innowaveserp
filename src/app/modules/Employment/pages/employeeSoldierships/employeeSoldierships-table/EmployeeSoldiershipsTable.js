import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeSoldierships/employeeSoldiershipsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeSoldiershipsUIContext } from "../EmployeeSoldiershipsUIContext";
import { EmployeeSoldiershipModel } from "../../../../../../core/_models/Employment/EmployeeSoldiershipModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeSoldiershipsTable() {
  const { t } = useTranslation();

  const employeeSoldiershipsUIContext = useEmployeeSoldiershipsUIContext();

  const employeeSoldiershipsUIProps = useMemo(() => {
    return {
      ids: employeeSoldiershipsUIContext.ids,
      setIds: employeeSoldiershipsUIContext.setIds,
      queryParams: employeeSoldiershipsUIContext.queryParams,
      setQueryParams: employeeSoldiershipsUIContext.setQueryParams,
      openEditEmployeeSoldiershipPage: employeeSoldiershipsUIContext.openEditEmployeeSoldiershipPage,
      openDeleteEmployeeSoldiershipDialog: employeeSoldiershipsUIContext.openDeleteEmployeeSoldiershipDialog,
    };
  }, [employeeSoldiershipsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeSoldierships }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeSoldiershipModel);
  const fieldKey = getFields(EmployeeSoldiershipModel);
  const fields = EmployeeSoldiershipModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeSoldiershipsUIProps.setIds([]);
    dispatch(actions.fetchEmployeeSoldierships(employeeSoldiershipsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeSoldiershipsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeSoldiership." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeSoldiership." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeSoldiershipPage: employeeSoldiershipsUIProps.openEditEmployeeSoldiershipPage,
        openDeleteEmployeeSoldiershipDialog: employeeSoldiershipsUIProps.openDeleteEmployeeSoldiershipDialog,
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
    sizePerPage: employeeSoldiershipsUIProps.queryParams.PageSize,
    page: employeeSoldiershipsUIProps.queryParams.PageNumber,
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
                  employeeSoldiershipsUIProps.setQueryParams
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