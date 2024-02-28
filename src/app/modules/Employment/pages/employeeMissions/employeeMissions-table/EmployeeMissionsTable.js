import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeMissions/employeeMissionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeMissionsUIContext } from "../EmployeeMissionsUIContext";
import { EmployeeMissionModel } from "../../../../../../core/_models/Employment/EmployeeMissionModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeMissionsTable() {
  const { t } = useTranslation();

  const employeeMissionsUIContext = useEmployeeMissionsUIContext();

  const employeeMissionsUIProps = useMemo(() => {
    return {
      ids: employeeMissionsUIContext.ids,
      setIds: employeeMissionsUIContext.setIds,
      queryParams: employeeMissionsUIContext.queryParams,
      setQueryParams: employeeMissionsUIContext.setQueryParams,
      openEditEmployeeMissionPage:
        employeeMissionsUIContext.openEditEmployeeMissionPage,
      openDeleteEmployeeMissionDialog:
        employeeMissionsUIContext.openDeleteEmployeeMissionDialog,
    };
  }, [employeeMissionsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeMissions }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeMissionModel);
  const fieldKey = getFields(EmployeeMissionModel);
  const fields = EmployeeMissionModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeMissionsUIProps.setIds([]);
    dispatch(
      actions.fetchEmployeeMissions(employeeMissionsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeMissionsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeMission." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeMission." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeMissionPage:
          employeeMissionsUIProps.openEditEmployeeMissionPage,
        openDeleteEmployeeMissionDialog:
          employeeMissionsUIProps.openDeleteEmployeeMissionDialog,
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
    sizePerPage: employeeMissionsUIProps.queryParams.PageSize,
    page: employeeMissionsUIProps.queryParams.PageNumber,
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
                  employeeMissionsUIProps.setQueryParams
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
