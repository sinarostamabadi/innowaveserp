import { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { NoRecordsFoundMessage, PleaseWaitMessage } from "src/core/_helpers";
import { useEmployeeTypesUIContext } from "./EmployeeTypesUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeTypesTable() {
  const { t } = useTranslation();
  const uiContext = useEmployeeTypesUIContext();
  const uiProps = useMemo(() => {
    return {
      activeEmployeeTypes: uiContext.activeEmployeeTypes,
      openEditDialog: uiContext.openEditEmployeeTypeDialog,
      openDeleteDialog: uiContext.openDeleteEmployeeTypeDialog,
    };
  }, [uiContext]);

  const columns = [
    {
      dataField: "BodyBuildingEmployeeTypeExpertise.Title",
      text: t("BodyBuildingEmployeeExpertise.BodyBuildingEmployeeTypeExpertise"),
      sort: false,
    },
    {
      dataField: "Grade",
      text: t("BodyBuildingEmployeeExpertise.Grade"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeTypeDialog: uiProps.openEditDialog,
        openDeleteEmployeeTypeDialog: uiProps.openDeleteDialog,
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
        keyField="BodyBuildingEmployeeExpertiseId"
        data={
          uiProps.activeEmployeeTypes === null
            ? []
            : uiProps.activeEmployeeTypes
        }
        columns={columns}
      >
        <PleaseWaitMessage entities={uiProps.activeEmployeeTypes} />
        <NoRecordsFoundMessage entities={uiProps.activeEmployeeTypes} />
      </BootstrapTable>
    </>
  );
}
