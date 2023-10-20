import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useReservePersonsUIContext } from "./ReservePersonsUIContext";
import { useTranslation } from "react-i18next";

export function ReservePersonsTable() {
  const { t } = useTranslation();
  const uiContext = useReservePersonsUIContext();
  const uiProps = useMemo(() => {
    return {
      reservePersons: uiContext.reservePersons,
      activeReservePersons: uiContext.activeReservePersons,
      openEditReservePersonDialog: uiContext.openEditReservePersonDialog,
      openSerialReservePersonDialog: uiContext.openSerialReservePersonDialog,
      openDeleteReservePersonDialog: uiContext.openDeleteReservePersonDialog,
    };
  }, [uiContext]);

  const columns = [
    {
      dataField: "Person.FullNameFa",
      text: t("ReservePerson.Person"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditReservePersonDialog: uiProps.openEditReservePersonDialog,
        openDeleteReservePersonDialog: uiProps.openDeleteReservePersonDialog,
        openSerialReservePersonDialog: uiProps.openSerialReservePersonDialog,
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
        keyField="ReservePersonScoreId"
        data={
          uiProps.activeReservePersons === null
            ? []
            : uiProps.activeReservePersons
        }
        columns={columns}
      >
        <PleaseWaitMessage entities={uiProps.activeReservePersons} />
        <NoRecordsFoundMessage entities={uiProps.activeReservePersons} />
      </BootstrapTable>
    </>
  );
}
