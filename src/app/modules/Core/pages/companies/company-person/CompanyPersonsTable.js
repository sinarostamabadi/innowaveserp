// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import * as uiHelpers from "./CompanyPersonsUIHelper";
import { Pagination } from "../../../../../../core/_partials/controls";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import { useCompanyPersonsUIContext } from "./CompanyPersonsUIContext";
import { useTranslation } from "react-i18next";

export function CompanyPersonsTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const companyPersonsUIContext = useCompanyPersonsUIContext();
  const companyPersonsUIProps = useMemo(() => {
    return {
      companyPersons: companyPersonsUIContext.companyPersons,
      addCompanyPerson: companyPersonsUIContext.addCompanyPerson,
      totalCount: companyPersonsUIContext.totalCount,
      actionsLoading: companyPersonsUIContext.actionsLoading,
      queryParams: companyPersonsUIContext.queryParams,
      setQueryParams: companyPersonsUIContext.setQueryParams,
      openEditCompanyPersonDialog:
        companyPersonsUIContext.openEditCompanyPersonDialog,
      openDeleteCompanyPersonDialog:
        companyPersonsUIContext.openDeleteCompanyPersonDialog,
      ids: companyPersonsUIContext.ids,
      setIds: companyPersonsUIContext.setIds,
      personId: companyPersonsUIContext.personId,
    };
  }, [companyPersonsUIContext]);

  const columns = [
    {
      dataField: "Person.FullNameFa",
      text: t("CompanyPerson.Person"),
      sort: false,
    },
    {
      dataField: "CompanyPersonType.Title",
      text: t("CompanyPerson.CompanyPersonType"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditCompanyPersonDialog:
          companyPersonsUIProps.openEditCompanyPersonDialog,
        openDeleteCompanyPersonDialog:
          companyPersonsUIProps.openDeleteCompanyPersonDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: companyPersonsUIProps.totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: companyPersonsUIProps.queryParams.PageSize,
    page: companyPersonsUIProps.queryParams.PageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={companyPersonsUIProps.listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bordered={false}
                bootstrap4
                remote
                keyField="CompanyPersonId"
                data={
                  companyPersonsUIProps.companyPersons === null
                    ? []
                    : companyPersonsUIProps.companyPersons
                }
                columns={columns}
                {...paginationTableProps}
              >
                <PleaseWaitMessage
                  entities={companyPersonsUIProps.companyPersons}
                />
                <NoRecordsFoundMessage
                  entities={companyPersonsUIProps.companyPersons}
                />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
