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
import { DateTimeFaColumnFormatter } from "../../../../../../core/_formatters";
import {
  MainWarehouseStatuses,
  ManagerApproveStatuses,
} from "./DetailsUIHelper";
import { IdToTitleColumnFormatter } from "./column-formatters/IdToTitleColumnFormatter";

export function DetailsTable() {
  const { t } = useTranslation();
  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      mode: detailsUIContext.mode,
      details: detailsUIContext.details,
      activeDetails: detailsUIContext.activeDetails,
      openEditDetailDialog: detailsUIContext.openEditDetailDialog,
      openSerialDetailDialog: detailsUIContext.openSerialDetailDialog,
      openDeleteDetailDialog: detailsUIContext.openDeleteDetailDialog,
    };
  }, [detailsUIContext]);

  let columns = [
    {
      dataField: "Product.Name",
      text: t("BuyRequestDetail.Product"),
      sort: false,
    },
    {
      dataField: "ProductUnit.Unit.Name",
      text: t("BuyRequestDetail.ProductUnit"),
      sort: false,
    },
    {
      dataField: "Amount",
      text: t("BuyRequestDetail.Amount"),
      sort: false,
    },
  ];

  if (detailsUIProps.mode >= 3)
    columns.push(
      ...[
        {
          dataField: "ManagerApproveStatusId",
          text: t("BuyRequestDetail.ManagerApproveStatus"),
          sort: false,
          formatter: IdToTitleColumnFormatter,
          formatExtraData: {
            array: ManagerApproveStatuses,
          },
        },
        {
          dataField: "ManagerDescription",
          text: t("BuyRequestDetail.ManagerDescription"),
          sort: false,
        },
        {
          dataField: "ApproveStatuseChangeDate",
          text: t("BuyRequestDetail.ApproveStatuseChangeDate"),
          sort: false,
          formatter: DateTimeFaColumnFormatter,
        },
      ]
    );

  if (detailsUIProps.mode >= 4)
    columns.push(
      ...[
        {
          dataField: "MainWarehouseStatusId",
          text: t("BuyRequestDetail.MainWarehouseStatus"),
          sort: false,
          formatter: IdToTitleColumnFormatter,
          formatExtraData: {
            array: MainWarehouseStatuses,
          },
        },
        {
          dataField: "MainWarehouseAmount",
          text: t("BuyRequestDetail.MainWarehouseAmount"),
          sort: false,
        },
        {
          dataField: "MainWarehouseProductUnit.Unit.Name",
          text: t("BuyRequestDetail.MainWarehouseProductUnit"),
          sort: false,
        },
        {
          dataField: "MainWarehouseDescription",
          text: t("BuyRequestDetail.MainWarehouseDescription"),
          sort: false,
        },
        {
          dataField: "MainWarehouseChangeDate",
          text: t("BuyRequestDetail.MainWarehouseChangeDate"),
          sort: false,
          formatter: DateTimeFaColumnFormatter,
        },
      ]
    );

  columns.push({
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
  });

  return (
    <>
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center"
        bordered={false}
        bootstrap4
        remote
        keyField="BuyRequestDetailId"
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
