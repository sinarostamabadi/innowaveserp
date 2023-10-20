import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeContracts/employeeContractsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeContractsUIContext } from "../EmployeeContractsUIContext";
import { EmployeeContractModel } from "../../../../../../core/_models/Employment/EmployeeContractModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeContractsTable() {
  const { t } = useTranslation();

  const employeeContractsUIContext = useEmployeeContractsUIContext();

  const employeeContractsUIProps = useMemo(() => {
    return {
      ids: employeeContractsUIContext.ids,
      setIds: employeeContractsUIContext.setIds,
      queryParams: employeeContractsUIContext.queryParams,
      setQueryParams: employeeContractsUIContext.setQueryParams,
      openEditEmployeeContractPage: employeeContractsUIContext.openEditEmployeeContractPage,
      openDeleteEmployeeContractDialog: employeeContractsUIContext.openDeleteEmployeeContractDialog,
    };
  }, [employeeContractsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeContracts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeContractModel);
  const fieldKey = getFields(EmployeeContractModel);
  const fields = EmployeeContractModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeContractsUIProps.setIds([]);
    dispatch(actions.fetchEmployeeContracts(employeeContractsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeContractsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeContract." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeContract." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeContractPage: employeeContractsUIProps.openEditEmployeeContractPage,
        openDeleteEmployeeContractDialog: employeeContractsUIProps.openDeleteEmployeeContractDialog,
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
    sizePerPage: employeeContractsUIProps.queryParams.PageSize,
    page: employeeContractsUIProps.queryParams.PageNumber,
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
                  employeeContractsUIProps.setQueryParams
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