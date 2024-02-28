import React, { useMemo, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useDetailsUIContext } from "./DetailsUIContext";
import { useTranslation } from "react-i18next";
import { DateFaColumnFormatter } from "../../../../../../core/_formatters";

export function DetailsTable() {
  const { t } = useTranslation();
  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      details: detailsUIContext.details,
      activeDetails: detailsUIContext.activeDetails,
      openEditDetailDialog: detailsUIContext.openEditDetailDialog,
      openDeleteDetailDialog: detailsUIContext.openDeleteDetailDialog,
    };
  }, [detailsUIContext]);

  const columns = [
    {
      dataField: "No",
      text: t("DocumentDtl.No"),
      sort: false,
    },
    {
      dataField: "Account.Title",
      text: t("DocumentDtl.Account"),
      sort: false,
    },
    {
      dataField: "AccountFloating.Title",
      text: t("DocumentDtl.AccountFloating"),
      sort: false,
    },
    {
      dataField: "AccountFloating2.Title",
      text: t("DocumentDtl.AccountFloating2"),
      sort: false,
    },
    {
      dataField: "AccountFloating3.Title",
      text: t("DocumentDtl.AccountFloating3"),
      sort: false,
    },
    {
      dataField: "Bes",
      text: t("DocumentDtl.Bes"),
      sort: false,
    },
    {
      dataField: "Bed",
      text: t("DocumentDtl.Bed"),
      sort: false,
    },
    {
      dataField: "Des",
      text: t("DocumentDtl.Des"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditDetailDialog: detailsUIProps.openEditDetailDialog,
        openDeleteDetailDialog: detailsUIProps.openDeleteDetailDialog,
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
        classes="table table-head-custom table-vertical-center"
        bordered={false}
        bootstrap4
        remote
        keyField="DocumentDtlId"
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
      <div
        className="d-flex"
        style={{
          width: "30%",
          flexDirection: "row",
          textAlign: "right",
          float: "left",
        }}
      >
        <div className="flex-grow-1">
          بدهکار:{" "}
          {!!detailsUIProps.activeDetails && detailsUIProps.activeDetails.lenght
            ? detailsUIProps.activeDetails
                .map((x) => x.Bed)
                .reduce((a, b) => a + b)
            : 0}
        </div>
        <div className="flex-grow-1">
          بستانکار:{" "}
          {!!detailsUIProps.activeDetails && detailsUIProps.activeDetails.lenght
            ? detailsUIProps.activeDetails
                .map((x) => x.Bes)
                .reduce((a, b) => a + b)
            : 0}
        </div>
      </div>
    </>
  );
}
