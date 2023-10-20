import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { NoRecordsFoundMessage, PleaseWaitMessage } from "src/core/_helpers";
import { usePromissoryNotesUIContext } from "./PromissoryNotesUIContext";
import { useTranslation } from "react-i18next";
import { MoneyColumnFormatter, DateFaColumnFormatter } from "src/core/_formatters";

export function PromissoryNotesTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const promissoryNotesUIContext = usePromissoryNotesUIContext();
  const promissoryNotesUIProps = useMemo(() => {
    return {
      activePromissoryNotes: promissoryNotesUIContext.activePromissoryNotes,
      openEditPromissoryNoteDialog: promissoryNotesUIContext.openEditPromissoryNoteDialog,
      openDeletePromissoryNoteDialog: promissoryNotesUIContext.openDeletePromissoryNoteDialog
    };
  }, [promissoryNotesUIContext]);

  const columns = [
    {
      dataField: "CashTransactionType.Title",
      text: t("CashDocument.TransactionType"),
      sort: false,
    },
    {
      dataField: "Price",
      text: t("CashDocument.Price"),
      sort: false,
      formatter: MoneyColumnFormatter
    },
    {
      dataField: "MaxPrice",
      text: t("CashDocument.MaxPrice"),
      sort: false,
      formatter: MoneyColumnFormatter
    },
    {
      dataField: "PromissoryNumber",
      text: t("CashDocument.PromissoryNumber"),
      sort: false,
      formatter: MoneyColumnFormatter
    },
    {
      dataField: "PromissoryDate",
      text: t("CashDocument.Date"),
      sort: false,
      formatter: DateFaColumnFormatter,
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
        openEditPromissoryNoteDialog: promissoryNotesUIProps.openEditPromissoryNoteDialog,
        openDeletePromissoryNoteDialog: promissoryNotesUIProps.openDeletePromissoryNoteDialog,
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
      keyField="DocumentPromissoryNoteId"
      data={
        promissoryNotesUIProps.activePromissoryNotes === null
          ? []
          : promissoryNotesUIProps.activePromissoryNotes
      }
      columns={columns}
    >
      <PleaseWaitMessage entities={promissoryNotesUIProps.activePromissoryNotes} />
      <NoRecordsFoundMessage entities={promissoryNotesUIProps.activePromissoryNotes} />
    </BootstrapTable>
  );
}
