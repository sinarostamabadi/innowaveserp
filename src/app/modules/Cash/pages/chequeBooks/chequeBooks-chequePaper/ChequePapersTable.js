import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import * as columnFormatters from "./column-formatters";
import * as uiHelpers from "./ChequePapersUIHelper";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useChequePapersUIContext } from "./ChequePapersUIContext";
import { useTranslation } from "react-i18next";
import { DataFormatter } from "src/core/_formatters/DataFormatter";

export function ChequePapersTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const chequePapersUIContext = useChequePapersUIContext();
  const chequePapersUIProps = useMemo(() => {
    return {
      activeChequePapers: chequePapersUIContext.activeChequePapers,
      openEditChequePaperDialog:
        chequePapersUIContext.openEditChequePaperDialog,
      openDeleteChequePaperDialog:
        chequePapersUIContext.openDeleteChequePaperDialog,
    };
  }, [chequePapersUIContext]);

  const columns = [
    {
      dataField: "SerialNo",
      text: t("ChequePaper.SerialNo"),
      sort: false,
    },
    {
      dataField: "ChequePaperStatus",
      text: t("ChequePaper.ChequePaperStatus"),
      sort: false,
      formatter: DataFormatter,
      formatExtraData: {
        data: {
          t: t,
          1: t("ChequePaper.ChequeStatus.Exist"),
          2: t("ChequePaper.ChequeStatus.Invalid"),
          3: t("ChequePaper.ChequeStatus.Issue"),
        },
      },
    },
    {
      dataField: "Description",
      text: t("ChequePaper.Description"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditChequePaperDialog:
          chequePapersUIProps.openEditChequePaperDialog,
        openDeleteChequePaperDialog:
          chequePapersUIProps.openDeleteChequePaperDialog,
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
    <BootstrapTable
      wrapperClasses="table-responsive"
      classes="table table-head-custom table-vertical-center"
      bordered={false}
      bootstrap4
      remote
      keyField="ChequePaperId"
      data={
        chequePapersUIProps.activeChequePapers === null
          ? []
          : chequePapersUIProps.activeChequePapers
      }
      columns={columns}
    >
      <PleaseWaitMessage entities={chequePapersUIProps.activeChequePapers} />
      <NoRecordsFoundMessage
        entities={chequePapersUIProps.activeChequePapers}
      />
    </BootstrapTable>
  );
}
