import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/EmployeeTypes/EmployeeTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { DateFaColumnFormatter } from "src/core/_formatters";
import { Pagination } from "src/core/_partials/controls";
import { useEmployeeTypesUIContext } from "../EmployeeTypesUIContext";
import { BodyBuildingEmployeeTypeModel } from "src/core/_models/BodyBuilding/BodyBuildingEmployeeTypeModel";
import { getConfig, getFields } from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeTypesTable() {
  const { t } = useTranslation();

  const uiContext = useEmployeeTypesUIContext();

  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditEmployeeTypePage: uiContext.openEditEmployeeTypePage,
      openDeleteEmployeeTypeDialog: uiContext.openDeleteEmployeeTypeDialog,
    };
  }, [uiContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingEmployeeTypeModel);
  const fieldKey = getFields(BodyBuildingEmployeeTypeModel);
  const fields = BodyBuildingEmployeeTypeModel;

  const dispatch = useDispatch();

  useEffect(() => {
    uiProps.setIds([]);
    dispatch(actions.fetchEmployeeTypes(uiProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("BodyBuildingEmployeeType." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeTypePage: uiProps.openEditEmployeeTypePage,
        openDeleteEmployeeTypeDialog: uiProps.openDeleteEmployeeTypeDialog,
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
                onTableChange={getHandlerTableChange(uiProps.setQueryParams)}
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
