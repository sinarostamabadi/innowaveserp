import { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { NoRecordsFoundMessage, PleaseWaitMessage } from "src/core/_helpers";
import { useExpertisesUIContext } from "./ExpertisesUIContext";
import { useTranslation } from "react-i18next";

export function ExpertisesTable() {
  const { t } = useTranslation();
  const uiContext = useExpertisesUIContext();
  const uiProps = useMemo(() => {
    return {
      activeExpertises: uiContext.activeExpertises,
      openEditDialog: uiContext.openEditExpertiseDialog,
      openDeleteDialog: uiContext.openDeleteExpertiseDialog,
    };
  }, [uiContext]);

  const columns = [
    {
      dataField: "Title",
      text: t("BodyBuildingEmployeeTypeExpertise.Title"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditExpertiseDialog: uiProps.openEditDialog,
        openDeleteExpertiseDialog: uiProps.openDeleteDialog,
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
        keyField="BodyBuildingEmployeeTypeExpertiseId"
        data={uiProps.activeExpertises === null ? [] : uiProps.activeExpertises}
        columns={columns}
      >
        <PleaseWaitMessage entities={uiProps.activeExpertises} />
        <NoRecordsFoundMessage entities={uiProps.activeExpertises} />
      </BootstrapTable>
    </>
  );
}
