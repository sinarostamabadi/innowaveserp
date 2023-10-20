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
      mode: costsUIContext.mode,
      activeCosts: costsUIContext.activeCosts,
      openEditCostDialog: costsUIContext.openEditCostDialog,
      openSerialCostDialog: costsUIContext.openSerialCostDialog,
      openDeleteCostDialog: costsUIContext.openDeleteCostDialog,
    };
  }, [costsUIContext]);

  let columns = [
    {
      dataField: "Cost.Title",
      text: t("TakeAwayRequestCost.Cost")
    },
    {
      dataField: "Price",
      text: t("TakeAwayRequestCost.Price"),
      formatter: MoneyColumnFormatter
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
        keyField="TakeAwayRequestCostId"
        data={
          costsUIProps.activeCosts === null
            ? []
            : costsUIProps.activeCosts
        }
        columns={columns}
      >
        <PleaseWaitMessage entities={costsUIProps.activeCosts} />
        <NoRecordsFoundMessage entities={costsUIProps.activeCosts} />
      </BootstrapTable>
    </>
  );
}
