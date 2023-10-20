import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useGroupsUIContext } from "./GroupsUIContext";
import { useTranslation } from "react-i18next";
import { RowIndexColumnFormatter } from "../../../../../../core/_formatters";

export function GroupsTable() {
  const { t } = useTranslation();
  const groupsUIContext = useGroupsUIContext();
  const groupsUIProps = useMemo(() => {
    return {
      groups: groupsUIContext.groups,
      activeGroups: groupsUIContext.activeGroups,
      openEditGroupDialog: groupsUIContext.openEditGroupDialog,
      openTeamGroupDialog: groupsUIContext.openTeamGroupDialog,
      openDeleteGroupDialog: groupsUIContext.openDeleteGroupDialog,
    };
  }, [groupsUIContext]);

  const columns = [
    {
      dataField: "BowlingCompetitionGroupId",
      text: "#",
      sort: false,
      formatter: RowIndexColumnFormatter,
      style: {
        width: "30px",
        minWidth: "30px",
      },
    },
    {
      dataField: "Title",
      text: t("BowlingCompetitionGroup.Title"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditGroupDialog: groupsUIProps.openEditGroupDialog,
        openDeleteGroupDialog: groupsUIProps.openDeleteGroupDialog,
        openTeamGroupDialog: groupsUIProps.openTeamGroupDialog,
        t: t,
      },
      classes: "text-right pl-0",
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
        classes="table table-head-custom table-vertical-center table-striped"
        bordered={false}
        bootstrap4
        remote
        keyField="BowlingCompetitionGroupId"
        data={
          groupsUIProps.activeGroups === null
            ? []
            : groupsUIProps.activeGroups
        }
        columns={columns}
      >
        <PleaseWaitMessage entities={groupsUIProps.activeGroups} />
        <NoRecordsFoundMessage entities={groupsUIProps.activeGroups} />
      </BootstrapTable>
    </>
  );
}
