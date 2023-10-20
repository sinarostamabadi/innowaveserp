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
import { DateFaColumnFormatter, CheckBoxFormatter } from "../../../../../../core/_formatters";

export function DetailsTable() {
  const { t } = useTranslation();
  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      details: detailsUIContext.details,
      mode: detailsUIContext.mode,
      activeDetails: detailsUIContext.activeDetails,
      openEditDetailDialog: detailsUIContext.openEditDetailDialog,
      openSerialDetailDialog: detailsUIContext.openSerialDetailDialog,
      openDeleteDetailDialog: detailsUIContext.openDeleteDetailDialog,
    };
  }, [detailsUIContext]);

  let columns = [];

  switch (detailsUIProps.mode) {
    case 1:
      columns = [{
        dataField: "FromPrice",
        text: t("SellDiscountDetail.FromPrice"),
        sort: false,
      },
      {
        dataField: "ToPrice",
        text: t("SellDiscountDetail.ToPrice"),
        sort: false,
      },
      {
        dataField: "DiscountPercent",
        text: t("SellDiscountDetail.DiscountPercent"),
        sort: false,
      }]
      break;
    case 2:
      columns = [{
        dataField: "FromAmount",
        text: t("SellDiscountDetail.FromAmount"),
        sort: false,
      },
      {
        dataField: "ToAmount",
        text: t("SellDiscountDetail.ToAmount"),
        sort: false,
      },
      {
        dataField: "RewardAmount",
        text: t("SellDiscountDetail.RewardAmount"),
        sort: false,
      }]
      break;
    case 3:
      columns = [{
        dataField: "FromAmount",
        text: t("SellDiscountDetail.FromAmount"),
        sort: false,
      },
      {
        dataField: "ToAmount",
        text: t("SellDiscountDetail.ToAmount"),
        sort: false,
      },
      {
        dataField: "DiscountPercent",
        text: t("SellDiscountDetail.DiscountPercent"),
        sort: false,
      }]
      break;
  }
  columns.push({
        dataField: "action",
        text: t("Common.Action"),
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          openEditDetailDialog: detailsUIProps.openEditDetailDialog,
          openDeleteDetailDialog: detailsUIProps.openDeleteDetailDialog,
          openSerialDetailDialog: detailsUIProps.openSerialDetailDialog,
          mode: detailsUIProps.mode,
          t: t,
        },
        classes: "text-right pr-0",
        headerClasses: "text-right pr-3",
        style: {
          minWidth: "100px",
        }
      })

  return (
    <>
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center"
        bordered={false}
        bootstrap4
        remote
        keyField="SellDiscountDetailId"
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
