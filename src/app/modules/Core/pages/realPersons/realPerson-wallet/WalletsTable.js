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
import * as uiHelpers from "./WalletsUIHelper";
import { Pagination } from "../../../../../../core/_partials/controls";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useWalletsUIContext } from "./WalletsUIContext";
import { useTranslation } from "react-i18next";

export function WalletsTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const uiContext = useWalletsUIContext();
  const uiProps = useMemo(() => {
    return {
      wallets: uiContext.wallets,
      addWallet: uiContext.addWallet,
      totalCount: uiContext.totalCount,
      actionsLoading: uiContext.actionsLoading,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditWalletDialog: uiContext.openEditWalletDialog,
      openDeleteWalletDialog: uiContext.openDeleteWalletDialog,
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      personId: uiContext.personId,
    };
  }, [uiContext]);

  const columns = [
    {
      dataField: "Title",
      text: t("Wallet.Title"),
      sort: false,
    },
    {
      dataField: "Price",
      text: t("Wallet.Price"),
      formatter: MoneyColumnFormatter,
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditWalletDialog: uiProps.openEditWalletDialog,
        openDeleteWalletDialog: uiProps.openDeleteWalletDialog,
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
                keyField="WalletId"
                data={!!uiProps.wallets === false ? [] : uiProps.wallets}
                columns={columns}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={uiProps.wallets} />
                <NoRecordsFoundMessage entities={uiProps.wallets} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
