import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BowlingTeamsTable } from "./bowlingTeams-table/BowlingTeamsTable";
import {
  useBowlingTeamsUIContext,
  BowlingTeamsUIConsumer,
} from "./BowlingTeamsUIContext";
import { useTranslation } from "react-i18next";

export function BowlingTeamsCard() {
  const { t } = useTranslation();

  const bowlingTeamsUIContext = useBowlingTeamsUIContext();

  const bowlingTeamsUIProps = useMemo(() => {
    return {
      ids: bowlingTeamsUIContext.ids,
      queryParams: bowlingTeamsUIContext.queryParams,
      setQueryParams: bowlingTeamsUIContext.setQueryParams,
      newBowlingTeamButtonClick:
        bowlingTeamsUIContext.newBowlingTeamButtonClick,
      openDeleteBowlingTeamsDialog:
        bowlingTeamsUIContext.openDeleteBowlingTeamsDialog,
      openEditBowlingTeamPage: bowlingTeamsUIContext.openEditBowlingTeamPage,
      openUpdateBowlingTeamsStatusDialog:
        bowlingTeamsUIContext.openUpdateBowlingTeamsStatusDialog,
      openFetchBowlingTeamsDialog:
        bowlingTeamsUIContext.openFetchBowlingTeamsDialog,
    };
  }, [bowlingTeamsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("BowlingTeam.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={bowlingTeamsUIProps.newBowlingTeamButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BowlingTeamsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BowlingTeamsUIConsumer>
        <BowlingTeamsTable />
      </CardBody>
    </Card>
  );
}
