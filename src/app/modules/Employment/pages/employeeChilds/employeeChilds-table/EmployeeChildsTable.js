import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeChilds/employeeChildsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeChildsUIContext } from "../EmployeeChildsUIContext";
import { EmployeeChildModel } from "../../../../../../core/_models/Employment/EmployeeChildModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeChildsTable() {
  const { t } = useTranslation();

  const employeeChildsUIContext = useEmployeeChildsUIContext();

  const employeeChildsUIProps = useMemo(() => {
    return {
      ids: employeeChildsUIContext.ids,
      setIds: employeeChildsUIContext.setIds,
      queryParams: employeeChildsUIContext.queryParams,
      setQueryParams: employeeChildsUIContext.setQueryParams,
      openEditEmployeeChildPage:
        employeeChildsUIContext.openEditEmployeeChildPage,
      openDeleteEmployeeChildDialog:
        employeeChildsUIContext.openDeleteEmployeeChildDialog,
    };
  }, [employeeChildsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeChilds }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeChildModel);
  const fieldKey = getFields(EmployeeChildModel);
  const fields = EmployeeChildModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeChildsUIProps.setIds([]);
    dispatch(actions.fetchEmployeeChilds(employeeChildsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeChildsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeChild." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeChild." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeChildPage:
          employeeChildsUIProps.openEditEmployeeChildPage,
        openDeleteEmployeeChildDialog:
          employeeChildsUIProps.openDeleteEmployeeChildDialog,
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
    sizePerPage: employeeChildsUIProps.queryParams.PageSize,
    page: employeeChildsUIProps.queryParams.PageNumber,
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
                  employeeChildsUIProps.setQueryParams
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
