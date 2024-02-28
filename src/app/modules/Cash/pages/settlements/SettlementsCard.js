import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SettlementsTable } from "./settlements-table/SettlementsTable";
import {
  useSettlementsUIContext,
  SettlementsUIConsumer,
} from "./SettlementsUIContext";
import { useTranslation } from "react-i18next";

export function SettlementsCard() {
  const { t } = useTranslation();

  const settlementsUIContext = useSettlementsUIContext();

  const settlementsUIProps = useMemo(() => {
    return {
      ids: settlementsUIContext.ids,
      queryParams: settlementsUIContext.queryParams,
      setQueryParams: settlementsUIContext.setQueryParams,
      newSettlementButtonClick: settlementsUIContext.newSettlementButtonClick,
      openDeleteSettlementsDialog:
        settlementsUIContext.openDeleteSettlementsDialog,
      openEditSettlementPage: settlementsUIContext.openEditSettlementPage,
      openUpdateSettlementsStatusDialog:
        settlementsUIContext.openUpdateSettlementsStatusDialog,
      openFetchSettlementsDialog:
        settlementsUIContext.openFetchSettlementsDialog,
    };
  }, [settlementsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Settlement.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={settlementsUIProps.newSettlementButtonClick}
          >
            {t("Settlement.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SettlementsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SettlementsUIConsumer>
        <SettlementsTable />
      </CardBody>
    </Card>
  );
}
