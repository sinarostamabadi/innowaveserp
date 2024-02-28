import React, { useMemo, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useDiscountsUIContext } from "./DiscountsUIContext";
import { useTranslation } from "react-i18next";
import { MoneyColumnFormatter } from "../../../../../../core/_formatters";

export function DiscountsTable() {
  const { t } = useTranslation();
  const discountsUIContext = useDiscountsUIContext();
  const discountsUIProps = useMemo(() => {
    return {
      discounts: discountsUIContext.discounts,
      activeDiscounts: discountsUIContext.activeDiscounts,
      openEditDiscountDialog: discountsUIContext.openEditDiscountDialog,
      openSerialDiscountDialog: discountsUIContext.openSerialDiscountDialog,
      openDeleteDiscountDialog: discountsUIContext.openDeleteDiscountDialog,
    };
  }, [discountsUIContext]);

  const columns = [
    {
      dataField: "DiscountType.TitleFa",
      text: t("BuyDiscount.DiscountType"),
      sort: false,
    },
    {
      dataField: "DiscountPercent",
      text: t("BuyDiscount.DiscountPercent"),
      sort: false,
    },
    {
      dataField: "PricePercent",
      text: t("BuyDiscount.PricePercent"),
      formatter: MoneyColumnFormatter,
      formatExtraData: {
        t: t,
      },
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditDiscountDialog: discountsUIProps.openEditDiscountDialog,
        openDeleteDiscountDialog: discountsUIProps.openDeleteDiscountDialog,
        openSerialDiscountDialog: discountsUIProps.openSerialDiscountDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  console.log(
    "discountsUIProps.activeDiscounts > ",
    discountsUIProps.activeDiscounts
  );
  return (
    <>
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center"
        bordered={false}
        bootstrap4
        remote
        keyField="BuyDiscountId"
        data={
          discountsUIProps.activeDiscounts === null
            ? []
            : discountsUIProps.activeDiscounts
        }
        columns={columns}
      >
        <PleaseWaitMessage entities={discountsUIProps.activeDiscounts} />
        <NoRecordsFoundMessage entities={discountsUIProps.activeDiscounts} />
      </BootstrapTable>
    </>
  );
}
