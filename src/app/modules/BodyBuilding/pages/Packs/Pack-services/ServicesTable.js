import { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { NoRecordsFoundMessage, PleaseWaitMessage } from "src/core/_helpers";
import { useServicesUIContext } from "./ServicesUIContext";
import { useTranslation } from "react-i18next";

export function ServicesTable() {
  const { t } = useTranslation();
  const uiContext = useServicesUIContext();
  const uiProps = useMemo(() => {
    return {
      activeServices: uiContext.activeServices,
      openEditDialog: uiContext.openEditServiceDialog,
      openDeleteDialog: uiContext.openDeleteServiceDialog,
    };
  }, [uiContext]);

  const columns = [
    {
      dataField: "BodyBuildingService.Title",
      text: t("BodyBuildingService.Title"),
      sort: false,
    },
    {
      dataField: "BodyBuildingService.UseIPAddress",
      text: t("BodyBuildingService.UseIPAddress"),
      sort: false,
    },
    {
      dataField: "BodyBuildingService.Price",
      text: t("BodyBuildingService.Price"),
      sort: false,
    },
    {
      dataField: "ServiceCount",
      text: t("BodyBuildingPackService.ServiceCount"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditServiceDialog: uiProps.openEditDialog,
        openDeleteServiceDialog: uiProps.openDeleteDialog,
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
        keyField="BodyBuildingPackServiceId"
        data={uiProps.activeServices === null ? [] : uiProps.activeServices}
        columns={columns}
      >
        <PleaseWaitMessage entities={uiProps.activeServices} />
        <NoRecordsFoundMessage entities={uiProps.activeServices} />
      </BootstrapTable>
    </>
  );
}
