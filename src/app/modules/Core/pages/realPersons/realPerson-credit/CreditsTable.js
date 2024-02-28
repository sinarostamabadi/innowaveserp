// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { MoneyColumnFormatter } from "../../../../../../core/_formatters";
import * as uiHelpers from "./CreditsUIHelper";
import { Pagination } from "../../../../../../core/_partials/controls";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useCreditsUIContext } from "./CreditsUIContext";
import { useTranslation } from "react-i18next";

export function CreditsTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const uiContext = useCreditsUIContext();
  const uiProps = useMemo(() => {
    return {
      credits: uiContext.credits,
      addCredit: uiContext.addCredit,
      totalCount: uiContext.totalCount,
      actionsLoading: uiContext.actionsLoading,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditCreditDialog: uiContext.openEditCreditDialog,
      openDeleteCreditDialog: uiContext.openDeleteCreditDialog,
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      personId: uiContext.personId,
    };
  }, [uiContext]);

  const columns = [
    {
      dataField: "Title",
      text: t("Credit.Title"),
      sort: false,
    },
    {
      dataField: "Price",
      text: t("Credit.Price"),
      formatter: MoneyColumnFormatter,
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditCreditDialog: uiProps.openEditCreditDialog,
        openDeleteCreditDialog: uiProps.openDeleteCreditDialog,
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
    totalSize: uiProps.totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: uiProps.queryParams.PageSize,
    page: uiProps.queryParams.PageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={uiProps.listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bordered={false}
                bootstrap4
                remote
                keyField="CreditId"
                data={!!uiProps.credits === false ? [] : uiProps.credits}
                columns={columns}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={uiProps.credits} />
                <NoRecordsFoundMessage entities={uiProps.credits} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
