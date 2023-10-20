import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useProductUnitsUIContext } from "./ProductUnitsUIContext";
import { useTranslation } from "react-i18next";

export function ProductUnitsTable() {
  const { t } = useTranslation();
  const productUnitsUIContext = useProductUnitsUIContext();
  const productUnitsUIProps = useMemo(() => {
    return {
      productUnits: productUnitsUIContext.productUnits,
      activeProductUnits: productUnitsUIContext.activeProductUnits,
      openEditProductUnitDialog: productUnitsUIContext.openEditProductUnitDialog,
      openSerialProductUnitDialog: productUnitsUIContext.openSerialProductUnitDialog,
      openDeleteProductUnitDialog: productUnitsUIContext.openDeleteProductUnitDialog,
    };
  }, [productUnitsUIContext]);

  const columns = [
    {
      dataField: "Unit.Name",
      text: t("ProductUnit.Unit"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditProductUnitDialog: productUnitsUIProps.openEditProductUnitDialog,
        openDeleteProductUnitDialog: productUnitsUIProps.openDeleteProductUnitDialog,
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
        keyField="ProductUnitId"
        data={
          productUnitsUIProps.activeProductUnits === null
            ? []
            : productUnitsUIProps.activeProductUnits
        }
        columns={columns}
      >
        <PleaseWaitMessage entities={productUnitsUIProps.activeProductUnits} />
        <NoRecordsFoundMessage entities={productUnitsUIProps.activeProductUnits} />
      </BootstrapTable>
    </>
  );
}
