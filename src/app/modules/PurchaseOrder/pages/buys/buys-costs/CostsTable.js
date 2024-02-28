import React, { useMemo, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useCostsUIContext } from "./CostsUIContext";
import { useTranslation } from "react-i18next";
import { MoneyColumnFormatter } from "../../../../../../core/_formatters";

export function CostsTable() {
  const { t } = useTranslation();
  const costsUIContext = useCostsUIContext();
  const costsUIProps = useMemo(() => {
    return {
      costs: costsUIContext.costs,
      activeCosts: costsUIContext.activeCosts,
      openEditCostDialog: costsUIContext.openEditCostDialog,
      openSerialCostDialog: costsUIContext.openSerialCostDialog,
      openDeleteCostDialog: costsUIContext.openDeleteCostDialog,
    };
  }, [costsUIContext]);

  const columns = [
    {
      dataField: "CostType.Title",
      text: t("BuyCost.CostType"),
      sort: false,
    },
    {
      dataField: "Price",
      text: t("BuyCost.Price"),
      formatter: MoneyColumnFormatter,
      formatExtraData: {
        t: t,
      },
      sort: false,
    },
    {
      dataField: "CostPercent",
      text: t("BuyCost.CostPercent"),
      sort: false,
    },
    {
      dataField: "Describtion",
      text: t("BuyCost.Describtion"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditCostDialog: costsUIProps.openEditCostDialog,
        openDeleteCostDialog: costsUIProps.openDeleteCostDialog,
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
        keyField="BuyCostId"
        data={costsUIProps.activeCosts === null ? [] : costsUIProps.activeCosts}
        columns={columns}
      >
        <PleaseWaitMessage entities={costsUIProps.activeCosts} />
        <NoRecordsFoundMessage entities={costsUIProps.activeCosts} />
      </BootstrapTable>
    </>
  );
}
