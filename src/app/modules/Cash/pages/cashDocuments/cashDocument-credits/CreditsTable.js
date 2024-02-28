import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { NoRecordsFoundMessage, PleaseWaitMessage } from "src/core/_helpers";
import { useCreditsUIContext } from "./CreditsUIContext";
import { useTranslation } from "react-i18next";
import {
  MoneyColumnFormatter,
  DateFaColumnFormatter,
} from "src/core/_formatters";

export function CreditsTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const creditsUIContext = useCreditsUIContext();
  const creditsUIProps = useMemo(() => {
    return {
      activeCredits: creditsUIContext.activeCredits,
      openEditCreditDialog: creditsUIContext.openEditCreditDialog,
      openDeleteCreditDialog: creditsUIContext.openDeleteCreditDialog,
    };
  }, [creditsUIContext]);

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
      formatter: MoneyColumnFormatter,
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
        openEditCreditDialog: creditsUIProps.openEditCreditDialog,
        openDeleteCreditDialog: creditsUIProps.openDeleteCreditDialog,
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
      keyField="DocumentCreditId"
      data={
        creditsUIProps.activeCredits === null
          ? []
          : creditsUIProps.activeCredits
      }
      columns={columns}
    >
      <PleaseWaitMessage entities={creditsUIProps.activeCredits} />
      <NoRecordsFoundMessage entities={creditsUIProps.activeCredits} />
    </BootstrapTable>
  );
}
