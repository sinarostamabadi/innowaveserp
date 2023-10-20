import React, { useMemo, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { DetailAmountColumnFormatter } from "./column-formatters/DetailAmountColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useDetailsUIContext } from "./DetailsUIContext";
import { useTranslation } from "react-i18next";
import { DateFaColumnFormatter, RowIndexColumnFormatter } from "../../../../../../core/_formatters";

export function DetailsTable() {
  const { t } = useTranslation();
  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      details: detailsUIContext.details,
      activeDetails: detailsUIContext.activeDetails,
      openEditDetailDialog: detailsUIContext.openEditDetailDialog,
      openSerialDetailDialog: detailsUIContext.openSerialDetailDialog,
      openDeleteDetailDialog: detailsUIContext.openDeleteDetailDialog,
    };
  }, [detailsUIContext]);

  const columns = [
    {
      dataField: "ProductId",
      text: "#",
      sort: false,
      formatter: RowIndexColumnFormatter,
      style: {
        width: "30px",
        minWidth: "30px",
      },
    },
    {
      dataField: "Product.Name",
      text: t("ReceiptDtl.Product"),
      sort: false,
    },
    {
      dataField: "ProductUnit.Unit.Name",
      text: t("ReceiptDtl.ProductUnit"),
      sort: false,
    },
    {
      dataField: "Amount",
      text: t("ReceiptDtl.Amount"),
      sort: false,
      formatter: DetailAmountColumnFormatter,
      formatExtraData: {
        t: t,
      },
    },
    {
      dataField: "UseDate",
      text: t("ReceiptDtl.UseDate"),
      sort: false,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: "ExpireDate",
      text: t("ReceiptDtl.ExpireDate"),
      sort: false,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditDetailDialog: detailsUIProps.openEditDetailDialog,
        openDeleteDetailDialog: detailsUIProps.openDeleteDetailDialog,
        openSerialDetailDialog: detailsUIProps.openSerialDetailDialog,
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
    <>
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center table-striped"
        bordered={false}
        bootstrap4
        remote
        keyField="ReceiptDtlId"
        data={
          detailsUIProps.activeDetails === null
            ? []
            : detailsUIProps.activeDetails
        }
        columns={columns}
      >
        <PleaseWaitMessage entities={detailsUIProps.activeDetails} />
        <NoRecordsFoundMessage entities={detailsUIProps.activeDetails} />
      </BootstrapTable>
    </>
  );
}
