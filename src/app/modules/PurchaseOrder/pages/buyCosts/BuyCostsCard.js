import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BuyCostsTable } from "./buyCosts-table/BuyCostsTable";
import { useBuyCostsUIContext, BuyCostsUIConsumer } from "./BuyCostsUIContext";
import { useTranslation } from "react-i18next";

export function BuyCostsCard() {
  const { t } = useTranslation();

  const buyCostsUIContext = useBuyCostsUIContext();

  const buyCostsUIProps = useMemo(() => {
    return {
      ids: buyCostsUIContext.ids,
      queryParams: buyCostsUIContext.queryParams,
      setQueryParams: buyCostsUIContext.setQueryParams,
      newBuyCostButtonClick: buyCostsUIContext.newBuyCostButtonClick,
      openDeleteBuyCostsDialog: buyCostsUIContext.openDeleteBuyCostsDialog,
      openEditBuyCostPage: buyCostsUIContext.openEditBuyCostPage,
      openUpdateBuyCostsStatusDialog:
        buyCostsUIContext.openUpdateBuyCostsStatusDialog,
      openFetchBuyCostsDialog: buyCostsUIContext.openFetchBuyCostsDialog,
    };
  }, [buyCostsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("BuyCost.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={buyCostsUIProps.newBuyCostButtonClick}
          >
            {t("BuyCost.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BuyCostsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BuyCostsUIConsumer>
        <BuyCostsTable />
      </CardBody>
    </Card>
  );
}
