import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeInsurances/employeeInsurancesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeInsurancesUIContext } from "../EmployeeInsurancesUIContext";
import { EmployeeInsuranceModel } from "../../../../../../core/_models/Employment/EmployeeInsuranceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeInsurancesTable() {
  const { t } = useTranslation();

  const employeeInsurancesUIContext = useEmployeeInsurancesUIContext();

  const employeeInsurancesUIProps = useMemo(() => {
    return {
      ids: employeeInsurancesUIContext.ids,
      setIds: employeeInsurancesUIContext.setIds,
      queryParams: employeeInsurancesUIContext.queryParams,
      setQueryParams: employeeInsurancesUIContext.setQueryParams,
      openEditEmployeeInsurancePage: employeeInsurancesUIContext.openEditEmployeeInsurancePage,
      openDeleteEmployeeInsuranceDialog: employeeInsurancesUIContext.openDeleteEmployeeInsuranceDialog,
    };
  }, [employeeInsurancesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeInsurances }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeInsuranceModel);
  const fieldKey = getFields(EmployeeInsuranceModel);
  const fields = EmployeeInsuranceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeInsurancesUIProps.setIds([]);
    dispatch(actions.fetchEmployeeInsurances(employeeInsurancesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeInsurancesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeInsurance." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeInsurance." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeInsurancePage: employeeInsurancesUIProps.openEditEmployeeInsurancePage,
        openDeleteEmployeeInsuranceDialog: employeeInsurancesUIProps.openDeleteEmployeeInsuranceDialog,
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
    sizePerPage: employeeInsurancesUIProps.queryParams.PageSize,
    page: employeeInsurancesUIProps.queryParams.PageNumber,
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
                  employeeInsurancesUIProps.setQueryParams
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