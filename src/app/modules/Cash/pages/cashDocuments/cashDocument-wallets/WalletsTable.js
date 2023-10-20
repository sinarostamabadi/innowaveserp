import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { NoRecordsFoundMessage, PleaseWaitMessage } from "src/core/_helpers";
import { useWalletsUIContext } from "./WalletsUIContext";
import { useTranslation } from "react-i18next";
import { MoneyColumnFormatter, DateFaColumnFormatter } from "src/core/_formatters";

export function WalletsTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const walletsUIContext = useWalletsUIContext();
  const walletsUIProps = useMemo(() => {
    return {
      activeWallets: walletsUIContext.activeWallets,
      openEditWalletDialog: walletsUIContext.openEditWalletDialog,
      openDeleteWalletDialog: walletsUIContext.openDeleteWalletDialog
    };
  }, [walletsUIContext]);

  const columns = [
    {
      dataField: "CashTransactionType.Title",
      text: t("CashDocument.TransactionType"),
      sort: false,
    },
    {
      dataField: "Title",
      text: t("CashDocument.Title"),
      sort: false,
    },
    {
      dataField: "Price",
      text: t("CashDocument.Price"),
      sort: false,
      formatter: MoneyColumnFormatter
    },
    {
      dataField: "Description",
      text: t("CashDocument.Description"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditWalletDialog: walletsUIProps.openEditWalletDialog,
        openDeleteWalletDialog: walletsUIProps.openDeleteWalletDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  return (
    <BootstrapTable
      wrapperClasses="table-responsive"
      classes="table table-head-custom table-vertical-center"
      bordered={false}
      bootstrap4
      remote
      keyField="DocumentWalletId"
      data={
        walletsUIProps.activeWallets === null
          ? []
          : walletsUIProps.activeWallets
      }
      columns={columns}
    >
      <PleaseWaitMessage entities={walletsUIProps.activeWallets} />
      <NoRecordsFoundMessage entities={walletsUIProps.activeWallets} />
    </BootstrapTable>
  );
}
