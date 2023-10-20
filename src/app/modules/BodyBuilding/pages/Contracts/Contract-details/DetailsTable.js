import { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  ActionsColumnFormatter,
  TotalCountColumnFormatter,
} from "./column-formatters";
import { NoRecordsFoundMessage, PleaseWaitMessage } from "src/core/_helpers";
import { useDetailsUIContext } from "./DetailsUIContext";
import { useTranslation } from "react-i18next";

export function DetailsTable() {
  const { t } = useTranslation();
  const uiContext = useDetailsUIContext();
  const uiProps = useMemo(() => {
    return {
      activeDetails: uiContext.activeDetails,
      openEditDialog: uiContext.openEditDetailDialog,
      openDeleteDialog: uiContext.openDeleteDetailDialog,
    };
  }, [uiContext]);

  const columns = [
    {
      dataField: "BodyBuildingPack.Title",
      text: t("BodyBuildingContractDetail.BodyBuildingPack"),
      sort: false,
    },
    {
      dataField: "BodyBuildingService.Title",
      text: t("BodyBuildingContractDetail.BodyBuildingService"),
      sort: false,
    },
    {
      dataField: "Price",
      text: t("BodyBuildingContractDetail.Price"),
      sort: false,
    },
    {
      dataField: "DiscountPrice",
      text: t("BodyBuildingContractDetail.DiscountPrice"),
      sort: false,
    },
    {
      dataField: "RemaineCount",
      text: t("BodyBuildingContractDetail.RemaineCount"),
      sort: false,
    },
    {
      dataField: "ServiceCount",
      text: t("BodyBuildingContractDetail.ServiceCount"),
      sort: false,
    },
    {
      dataField: "TotalCount",
      text: t("BodyBuildingContractDetail.TotalCount"),
      sort: false,
      formatter: TotalCountColumnFormatter,
      formatExtraData: {
        t: t,
      },
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditDetailDialog: uiProps.openEditDialog,
        openDeleteDetailDialog: uiProps.openDeleteDialog,
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
        keyField="BodyBuildingContractDetailId"
        data={uiProps.activeDetails === null ? [] : uiProps.activeDetails}
        columns={columns}
      >
        <PleaseWaitMessage entities={uiProps.activeDetails} />
        <NoRecordsFoundMessage entities={uiProps.activeDetails} />
      </BootstrapTable>
    </>
  );
}
