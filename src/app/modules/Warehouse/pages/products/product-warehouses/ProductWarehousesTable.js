import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useProductWarehousesUIContext } from "./ProductWarehousesUIContext";
import { useTranslation } from "react-i18next";

export function ProductWarehousesTable() {
  const { t } = useTranslation();
  const productWarehousesUIContext = useProductWarehousesUIContext();
  const productWarehousesUIProps = useMemo(() => {
    return {
      productWarehouses: productWarehousesUIContext.productWarehouses,
      activeProductWarehouses: productWarehousesUIContext.activeProductWarehouses,
      openEditProductWarehouseDialog: productWarehousesUIContext.openEditProductWarehouseDialog,
      openSerialProductWarehouseDialog: productWarehousesUIContext.openSerialProductWarehouseDialog,
      openDeleteProductWarehouseDialog: productWarehousesUIContext.openDeleteProductWarehouseDialog,
    };
  }, [productWarehousesUIContext]);

  const columns = [
    {
      dataField: "Warehouse.Title",
      text: t("ProductWarehouse.Warehouse"),
      sort: false,
    },
    {
      dataField: "PackageType.Title",
      text: t("ProductWarehouse.PackageType"),
      sort: false,
    },
    {
      dataField: "OrderPoint",
      text: t("ProductWarehouse.OrderPoint"),
      sort: false,
    },
    {
      dataField: "MinStock",
      text: t("ProductWarehouse.MinStock"),
      sort: false,
    },
    {
      dataField: "MaxStock",
      text: t("ProductWarehouse.MaxStock"),
      sort: false,
    },
    {
      dataField: "Location",
      text: t("ProductWarehouse.Location"),
      sort: false,
    },    
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditProductWarehouseDialog: productWarehousesUIProps.openEditProductWarehouseDialog,
        openDeleteProductWarehouseDialog: productWarehousesUIProps.openDeleteProductWarehouseDialog,
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
        keyField="ProductWarehouseId"
        data={
          productWarehousesUIProps.activeProductWarehouses === null
            ? []
            : productWarehousesUIProps.activeProductWarehouses
        }
        columns={columns}
      >
        <PleaseWaitMessage entities={productWarehousesUIProps.activeProductWarehouses} />
        <NoRecordsFoundMessage entities={productWarehousesUIProps.activeProductWarehouses} />
      </BootstrapTable>
    </>
  );
}
