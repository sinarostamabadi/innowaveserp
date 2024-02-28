import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BodyBuildingPriceingTable } from "./bodyBuildingPriceing-table/BodyBuildingPriceingTable";
import {
  useBodyBuildingPriceingUIContext,
  BodyBuildingPriceingUIConsumer,
} from "./BodyBuildingPriceingUIContext";
import { useTranslation } from "react-i18next";

export function BodyBuildingPriceingCard() {
  const { t } = useTranslation();

  const bodyBuildingPriceingUIContext = useBodyBuildingPriceingUIContext();

  const bodyBuildingPriceingUIProps = useMemo(() => {
    return {
      ids: bodyBuildingPriceingUIContext.ids,
      queryParams: bodyBuildingPriceingUIContext.queryParams,
      setQueryParams: bodyBuildingPriceingUIContext.setQueryParams,
      newBodyBuildingPriceingButtonClick:
        bodyBuildingPriceingUIContext.newBodyBuildingPriceingButtonClick,
      openDeleteBodyBuildingPriceingDialog:
        bodyBuildingPriceingUIContext.openDeleteBodyBuildingPriceingDialog,
      openEditBodyBuildingPriceingPage:
        bodyBuildingPriceingUIContext.openEditBodyBuildingPriceingPage,
      openUpdateBodyBuildingPriceingStatusDialog:
        bodyBuildingPriceingUIContext.openUpdateBodyBuildingPriceingStatusDialog,
      openFetchBodyBuildingPriceingDialog:
        bodyBuildingPriceingUIContext.openFetchBodyBuildingPriceingDialog,
    };
  }, [bodyBuildingPriceingUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("BodyBuildingPriceing.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              bodyBuildingPriceingUIProps.newBodyBuildingPriceingButtonClick
            }
          >
            {t("BodyBuildingPriceing.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BodyBuildingPriceingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BodyBuildingPriceingUIConsumer>
        <BodyBuildingPriceingTable />
      </CardBody>
    </Card>
  );
}
