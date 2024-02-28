import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RewardOrPenaltyTypesTable } from "./rewardOrPenaltyTypes-table/RewardOrPenaltyTypesTable";
import {
  useRewardOrPenaltyTypesUIContext,
  RewardOrPenaltyTypesUIConsumer,
} from "./RewardOrPenaltyTypesUIContext";
import { useTranslation } from "react-i18next";

export function RewardOrPenaltyTypesCard() {
  const { t } = useTranslation();

  const rewardOrPenaltyTypesUIContext = useRewardOrPenaltyTypesUIContext();

  const rewardOrPenaltyTypesUIProps = useMemo(() => {
    return {
      ids: rewardOrPenaltyTypesUIContext.ids,
      queryParams: rewardOrPenaltyTypesUIContext.queryParams,
      setQueryParams: rewardOrPenaltyTypesUIContext.setQueryParams,
      newRewardOrPenaltyTypeButtonClick:
        rewardOrPenaltyTypesUIContext.newRewardOrPenaltyTypeButtonClick,
      openDeleteRewardOrPenaltyTypesDialog:
        rewardOrPenaltyTypesUIContext.openDeleteRewardOrPenaltyTypesDialog,
      openEditRewardOrPenaltyTypePage:
        rewardOrPenaltyTypesUIContext.openEditRewardOrPenaltyTypePage,
      openUpdateRewardOrPenaltyTypesStatusDialog:
        rewardOrPenaltyTypesUIContext.openUpdateRewardOrPenaltyTypesStatusDialog,
      openFetchRewardOrPenaltyTypesDialog:
        rewardOrPenaltyTypesUIContext.openFetchRewardOrPenaltyTypesDialog,
    };
  }, [rewardOrPenaltyTypesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("RewardOrPenaltyType.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              rewardOrPenaltyTypesUIProps.newRewardOrPenaltyTypeButtonClick
            }
          >
            {t("RewardOrPenaltyType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RewardOrPenaltyTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RewardOrPenaltyTypesUIConsumer>
        <RewardOrPenaltyTypesTable />
      </CardBody>
    </Card>
  );
}
