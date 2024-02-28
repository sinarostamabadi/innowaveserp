import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SoldiershipExemptionsTable } from "./soldiershipExemptions-table/SoldiershipExemptionsTable";
import {
  useSoldiershipExemptionsUIContext,
  SoldiershipExemptionsUIConsumer,
} from "./SoldiershipExemptionsUIContext";
import { useTranslation } from "react-i18next";

export function SoldiershipExemptionsCard() {
  const { t } = useTranslation();

  const soldiershipExemptionsUIContext = useSoldiershipExemptionsUIContext();

  const soldiershipExemptionsUIProps = useMemo(() => {
    return {
      ids: soldiershipExemptionsUIContext.ids,
      queryParams: soldiershipExemptionsUIContext.queryParams,
      setQueryParams: soldiershipExemptionsUIContext.setQueryParams,
      newSoldiershipExemptionButtonClick:
        soldiershipExemptionsUIContext.newSoldiershipExemptionButtonClick,
      openDeleteSoldiershipExemptionsDialog:
        soldiershipExemptionsUIContext.openDeleteSoldiershipExemptionsDialog,
      openEditSoldiershipExemptionPage:
        soldiershipExemptionsUIContext.openEditSoldiershipExemptionPage,
      openUpdateSoldiershipExemptionsStatusDialog:
        soldiershipExemptionsUIContext.openUpdateSoldiershipExemptionsStatusDialog,
      openFetchSoldiershipExemptionsDialog:
        soldiershipExemptionsUIContext.openFetchSoldiershipExemptionsDialog,
    };
  }, [soldiershipExemptionsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("SoldiershipExemption.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              soldiershipExemptionsUIProps.newSoldiershipExemptionButtonClick
            }
          >
            {t("SoldiershipExemption.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SoldiershipExemptionsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SoldiershipExemptionsUIConsumer>
        <SoldiershipExemptionsTable />
      </CardBody>
    </Card>
  );
}
