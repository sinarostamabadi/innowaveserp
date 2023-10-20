import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { NoRecordsFoundMessage, PleaseWaitMessage } from "src/core/_helpers";
import { usePaymentsUIContext } from "./PaymentsUIContext";
import { useTranslation } from "react-i18next";
import { MoneyColumnFormatter, DateFaColumnFormatter } from "src/core/_formatters";

export function PaymentsTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const paymentsUIContext = usePaymentsUIContext();
  const paymentsUIProps = useMemo(() => {
    return {
      activePayments: paymentsUIContext.activePayments,
      openEditPaymentDialog: paymentsUIContext.openEditPaymentDialog,
      openDeletePaymentDialog: paymentsUIContext.openDeletePaymentDialog
    };
  }, [paymentsUIContext]);

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
      dataField: "PaymentDate",
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
        openEditPaymentDialog: paymentsUIProps.openEditPaymentDialog,
        openDeletePaymentDialog: paymentsUIProps.openDeletePaymentDialog,
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
      keyField="DocumentPaymentId"
      data={
        paymentsUIProps.activePayments === null
          ? []
          : paymentsUIProps.activePayments
      }
      columns={columns}
    >
      <PleaseWaitMessage entities={paymentsUIProps.activePayments} />
      <NoRecordsFoundMessage entities={paymentsUIProps.activePayments} />
    </BootstrapTable>
  );
}
