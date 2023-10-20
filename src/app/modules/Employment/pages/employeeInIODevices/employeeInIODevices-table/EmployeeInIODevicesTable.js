import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeInIODevices/employeeInIODevicesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeInIODevicesUIContext } from "../EmployeeInIODevicesUIContext";
import { EmployeeInIODeviceModel } from "../../../../../../core/_models/Employment/EmployeeInIODeviceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeInIODevicesTable() {
  const { t } = useTranslation();

  const employeeInIODevicesUIContext = useEmployeeInIODevicesUIContext();

  const employeeInIODevicesUIProps = useMemo(() => {
    return {
      ids: employeeInIODevicesUIContext.ids,
      setIds: employeeInIODevicesUIContext.setIds,
      queryParams: employeeInIODevicesUIContext.queryParams,
      setQueryParams: employeeInIODevicesUIContext.setQueryParams,
      openEditEmployeeInIODevicePage: employeeInIODevicesUIContext.openEditEmployeeInIODevicePage,
      openDeleteEmployeeInIODeviceDialog: employeeInIODevicesUIContext.openDeleteEmployeeInIODeviceDialog,
    };
  }, [employeeInIODevicesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeInIODevices }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeInIODeviceModel);
  const fieldKey = getFields(EmployeeInIODeviceModel);
  const fields = EmployeeInIODeviceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeInIODevicesUIProps.setIds([]);
    dispatch(actions.fetchEmployeeInIODevices(employeeInIODevicesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeInIODevicesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeInIODevice." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeInIODevice." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeInIODevicePage: employeeInIODevicesUIProps.openEditEmployeeInIODevicePage,
        openDeleteEmployeeInIODeviceDialog: employeeInIODevicesUIProps.openDeleteEmployeeInIODeviceDialog,
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
    sizePerPage: employeeInIODevicesUIProps.queryParams.PageSize,
    page: employeeInIODevicesUIProps.queryParams.PageNumber,
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
                  employeeInIODevicesUIProps.setQueryParams
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