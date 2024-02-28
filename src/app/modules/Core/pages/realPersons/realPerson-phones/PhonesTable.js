// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import * as uiHelpers from "./PhonesUIHelper";
import { Pagination } from "../../../../../../core/_partials/controls";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import { usePhonesUIContext } from "./PhonesUIContext";
import { useTranslation } from "react-i18next";

export function PhonesTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const phonesUIContext = usePhonesUIContext();
  const phonesUIProps = useMemo(() => {
    return {
      activePhones: phonesUIContext.activePhones,
      addPhone: phonesUIContext.addPhone,
      totalCount: phonesUIContext.totalCount,
      actionsLoading: phonesUIContext.actionsLoading,
      queryParams: phonesUIContext.queryParams,
      setQueryParams: phonesUIContext.setQueryParams,
      openEditPhoneDialog: phonesUIContext.openEditPhoneDialog,
      openDeletePhoneDialog: phonesUIContext.openDeletePhoneDialog,
      ids: phonesUIContext.ids,
      setIds: phonesUIContext.setIds,
      personId: phonesUIContext.personId,
    };
  }, [phonesUIContext]);

  const columns = [
    {
      dataField: "PhoneType.TitleFa",
      text: t("Phone.PhoneType"),
      sort: false,
    },
    {
      dataField: "AreaCode",
      text: t("Phone.AreaCode"),
      sort: false,
    },
    {
      dataField: "PhoneNumber",
      text: t("Phone.PhoneNumber"),
      sort: false,
    },
    {
      dataField: "Extension",
      text: t("Phone.Extension"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditPhoneDialog: phonesUIProps.openEditPhoneDialog,
        openDeletePhoneDialog: phonesUIProps.openDeletePhoneDialog,
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
    totalSize: phonesUIProps.totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: phonesUIProps.queryParams.PageSize,
    page: phonesUIProps.queryParams.PageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={phonesUIProps.listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bordered={false}
                bootstrap4
                remote
                keyField="PhoneId"
                data={
                  phonesUIProps.activePhones === null
                    ? []
                    : phonesUIProps.activePhones
                }
                columns={columns}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={phonesUIProps.activePhones} />
                <NoRecordsFoundMessage entities={phonesUIProps.activePhones} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
