import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeRelations/employeeRelationsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeRelationsUIContext } from "../EmployeeRelationsUIContext";
import { EmployeeRelationModel } from "../../../../../../core/_models/Employment/EmployeeRelationModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeRelationsTable() {
  const { t } = useTranslation();

  const employeeRelationsUIContext = useEmployeeRelationsUIContext();

  const employeeRelationsUIProps = useMemo(() => {
    return {
      ids: employeeRelationsUIContext.ids,
      setIds: employeeRelationsUIContext.setIds,
      queryParams: employeeRelationsUIContext.queryParams,
      setQueryParams: employeeRelationsUIContext.setQueryParams,
      openEditEmployeeRelationPage: employeeRelationsUIContext.openEditEmployeeRelationPage,
      openDeleteEmployeeRelationDialog: employeeRelationsUIContext.openDeleteEmployeeRelationDialog,
    };
  }, [employeeRelationsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeRelations }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeRelationModel);
  const fieldKey = getFields(EmployeeRelationModel);
  const fields = EmployeeRelationModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeRelationsUIProps.setIds([]);
    dispatch(actions.fetchEmployeeRelations(employeeRelationsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeRelationsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeRelation." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeRelation." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeRelationPage: employeeRelationsUIProps.openEditEmployeeRelationPage,
        openDeleteEmployeeRelationDialog: employeeRelationsUIProps.openDeleteEmployeeRelationDialog,
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
    sizePerPage: employeeRelationsUIProps.queryParams.PageSize,
    page: employeeRelationsUIProps.queryParams.PageNumber,
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
                  employeeRelationsUIProps.setQueryParams
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