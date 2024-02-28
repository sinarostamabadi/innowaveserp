import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/companyTypes/companyTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCompanyTypesUIContext } from "../CompanyTypesUIContext";
import { CompanyTypeModel } from "../../../../../../core/_models/Core/CompanyTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
export function CompanyTypesTable() {
  const companyTypesUIContext = useCompanyTypesUIContext();
  const companyTypesUIProps = useMemo(() => {
    return {
      ids: companyTypesUIContext.ids,
      setIds: companyTypesUIContext.setIds,
      queryParams: companyTypesUIContext.queryParams,
      setQueryParams: companyTypesUIContext.setQueryParams,
      openEditCompanyTypePage: companyTypesUIContext.openEditCompanyTypePage,
      openDeleteCompanyTypeDialog:
        companyTypesUIContext.openDeleteCompanyTypeDialog,
    };
  }, [companyTypesUIContext]);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.companyTypes }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CompanyTypeModel);
  const fieldKey = getFields(CompanyTypeModel);
  const fields = CompanyTypeModel;
  const dispatch = useDispatch();
  useEffect(() => {
    companyTypesUIProps.setIds([]);
    dispatch(actions.fetchCompanyTypes(companyTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyTypesUIProps.queryParams, dispatch]);
  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: fields.TitleFa.display,
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: fields.TitleEn.display,
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "??????",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCompanyTypePage: companyTypesUIProps.openEditCompanyTypePage,
        openDeleteCompanyTypeDialog:
          companyTypesUIProps.openDeleteCompanyTypeDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  console.log("configs ^>^> ", configs);
  console.log("fieldKey ^>^> ", fieldKey);
  console.log("columns ^> ", columns);
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: companyTypesUIProps.queryParams.PageSize,
    page: companyTypesUIProps.queryParams.PageNumber,
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
                  companyTypesUIProps.setQueryParams
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
