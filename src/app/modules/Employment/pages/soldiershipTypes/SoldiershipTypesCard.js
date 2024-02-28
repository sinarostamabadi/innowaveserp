import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SoldiershipTypesTable } from "./soldiershipTypes-table/SoldiershipTypesTable";
import {
  useSoldiershipTypesUIContext,
  SoldiershipTypesUIConsumer,
} from "./SoldiershipTypesUIContext";
import { useTranslation } from "react-i18next";

export function SoldiershipTypesCard() {
  const { t } = useTranslation();

  const soldiershipTypesUIContext = useSoldiershipTypesUIContext();

  const soldiershipTypesUIProps = useMemo(() => {
    return {
      ids: soldiershipTypesUIContext.ids,
      queryParams: soldiershipTypesUIContext.queryParams,
      setQueryParams: soldiershipTypesUIContext.setQueryParams,
      newSoldiershipTypeButtonClick:
        soldiershipTypesUIContext.newSoldiershipTypeButtonClick,
      openDeleteSoldiershipTypesDialog:
        soldiershipTypesUIContext.openDeleteSoldiershipTypesDialog,
      openEditSoldiershipTypePage:
        soldiershipTypesUIContext.openEditSoldiershipTypePage,
      openUpdateSoldiershipTypesStatusDialog:
        soldiershipTypesUIContext.openUpdateSoldiershipTypesStatusDialog,
      openFetchSoldiershipTypesDialog:
        soldiershipTypesUIContext.openFetchSoldiershipTypesDialog,
    };
  }, [soldiershipTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("SoldiershipType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={soldiershipTypesUIProps.newSoldiershipTypeButtonClick}
          >
            {t("SoldiershipType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SoldiershipTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SoldiershipTypesUIConsumer>
        <SoldiershipTypesTable />
      </CardBody>
    </Card>
  );
}
