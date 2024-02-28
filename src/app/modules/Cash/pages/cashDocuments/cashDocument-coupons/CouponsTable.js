import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { NoRecordsFoundMessage, PleaseWaitMessage } from "src/core/_helpers";
import { useCouponsUIContext } from "./CouponsUIContext";
import { useTranslation } from "react-i18next";
import {
  MoneyColumnFormatter,
  DateFaColumnFormatter,
} from "src/core/_formatters";

export function CouponsTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const couponsUIContext = useCouponsUIContext();
  const couponsUIProps = useMemo(() => {
    return {
      activeCoupons: couponsUIContext.activeCoupons,
      openEditCouponDialog: couponsUIContext.openEditCouponDialog,
      openDeleteCouponDialog: couponsUIContext.openDeleteCouponDialog,
    };
  }, [couponsUIContext]);

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
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "TransactionDate",
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
        openEditCouponDialog: couponsUIProps.openEditCouponDialog,
        openDeleteCouponDialog: couponsUIProps.openDeleteCouponDialog,
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
      keyField="DocumentCouponId"
      data={
        couponsUIProps.activeCoupons === null
          ? []
          : couponsUIProps.activeCoupons
      }
      columns={columns}
    >
      <PleaseWaitMessage entities={couponsUIProps.activeCoupons} />
      <NoRecordsFoundMessage entities={couponsUIProps.activeCoupons} />
    </BootstrapTable>
  );
}
