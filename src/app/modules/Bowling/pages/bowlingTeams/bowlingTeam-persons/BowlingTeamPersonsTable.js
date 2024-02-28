import React, { useMemo, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useBowlingTeamPersonsUIContext } from "./BowlingTeamPersonsUIContext";
import { useTranslation } from "react-i18next";
import { DateFaColumnFormatter } from "../../../../../../core/_formatters";

export function BowlingTeamPersonsTable() {
  const { t } = useTranslation();
  const bowlingTeamPersonsUIContext = useBowlingTeamPersonsUIContext();
  const bowlingTeamPersonsUIProps = useMemo(() => {
    return {
      bowlingTeamPersons: bowlingTeamPersonsUIContext.bowlingTeamPersons,
      activeBowlingTeamPersons:
        bowlingTeamPersonsUIContext.activeBowlingTeamPersons,
      openEditBowlingTeamPersonDialog:
        bowlingTeamPersonsUIContext.openEditBowlingTeamPersonDialog,
      openSerialBowlingTeamPersonDialog:
        bowlingTeamPersonsUIContext.openSerialBowlingTeamPersonDialog,
      openDeleteBowlingTeamPersonDialog:
        bowlingTeamPersonsUIContext.openDeleteBowlingTeamPersonDialog,
    };
  }, [bowlingTeamPersonsUIContext]);

  const columns = [
    {
      dataField: "Person.FullNameFa",
      text: t("BowlingTeamPerson.Person"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditBowlingTeamPersonDialog:
          bowlingTeamPersonsUIProps.openEditBowlingTeamPersonDialog,
        openDeleteBowlingTeamPersonDialog:
          bowlingTeamPersonsUIProps.openDeleteBowlingTeamPersonDialog,
        openSerialBowlingTeamPersonDialog:
          bowlingTeamPersonsUIProps.openSerialBowlingTeamPersonDialog,
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
        keyField="BowlingTeamPersonScoreId"
        data={
          bowlingTeamPersonsUIProps.activeBowlingTeamPersons === null
            ? []
            : bowlingTeamPersonsUIProps.activeBowlingTeamPersons
        }
        columns={columns}
      >
        <PleaseWaitMessage
          entities={bowlingTeamPersonsUIProps.activeBowlingTeamPersons}
        />
        <NoRecordsFoundMessage
          entities={bowlingTeamPersonsUIProps.activeBowlingTeamPersons}
        />
      </BootstrapTable>
    </>
  );
}
