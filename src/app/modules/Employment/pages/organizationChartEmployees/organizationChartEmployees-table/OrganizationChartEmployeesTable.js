import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/organizationChartEmployees/organizationChartEmployeesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useOrganizationChartEmployeesUIContext } from "../OrganizationChartEmployeesUIContext";
import { OrganizationChartEmployeeModel } from "../../../../../../core/_models/Employment/OrganizationChartEmployeeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function OrganizationChartEmployeesTable() {
  const { t } = useTranslation();

  const organizationChartEmployeesUIContext =
    useOrganizationChartEmployeesUIContext();

  const organizationChartEmployeesUIProps = useMemo(() => {
    return {
      ids: organizationChartEmployeesUIContext.ids,
      setIds: organizationChartEmployeesUIContext.setIds,
      queryParams: organizationChartEmployeesUIContext.queryParams,
      setQueryParams: organizationChartEmployeesUIContext.setQueryParams,
      openEditOrganizationChartEmployeePage:
        organizationChartEmployeesUIContext.openEditOrganizationChartEmployeePage,
      openDeleteOrganizationChartEmployeeDialog:
        organizationChartEmployeesUIContext.openDeleteOrganizationChartEmployeeDialog,
    };
  }, [organizationChartEmployeesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.organizationChartEmployees }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(OrganizationChartEmployeeModel);
  const fieldKey = getFields(OrganizationChartEmployeeModel);
  const fields = OrganizationChartEmployeeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    organizationChartEmployeesUIProps.setIds([]);
    dispatch(
      actions.fetchOrganizationChartEmployees(
        organizationChartEmployeesUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationChartEmployeesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("OrganizationChartEmployee." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("OrganizationChartEmployee." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditOrganizationChartEmployeePage:
          organizationChartEmployeesUIProps.openEditOrganizationChartEmployeePage,
        openDeleteOrganizationChartEmployeeDialog:
          organizationChartEmployeesUIProps.openDeleteOrganizationChartEmployeeDialog,
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
    sizePerPage: organizationChartEmployeesUIProps.queryParams.PageSize,
    page: organizationChartEmployeesUIProps.queryParams.PageNumber,
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
                  organizationChartEmployeesUIProps.setQueryParams
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
