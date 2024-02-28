import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PlaceOfPreparationsTable } from "./placeOfPreparations-table/PlaceOfPreparationsTable";
import {
  usePlaceOfPreparationsUIContext,
  PlaceOfPreparationsUIConsumer,
} from "./PlaceOfPreparationsUIContext";
import { useTranslation } from "react-i18next";

export function PlaceOfPreparationsCard() {
  const { t } = useTranslation();

  const placeOfPreparationsUIContext = usePlaceOfPreparationsUIContext();

  const placeOfPreparationsUIProps = useMemo(() => {
    return {
      ids: placeOfPreparationsUIContext.ids,
      queryParams: placeOfPreparationsUIContext.queryParams,
      setQueryParams: placeOfPreparationsUIContext.setQueryParams,
      newPlaceOfPreparationButtonClick:
        placeOfPreparationsUIContext.newPlaceOfPreparationButtonClick,
      openDeletePlaceOfPreparationsDialog:
        placeOfPreparationsUIContext.openDeletePlaceOfPreparationsDialog,
      openEditPlaceOfPreparationPage:
        placeOfPreparationsUIContext.openEditPlaceOfPreparationPage,
      openUpdatePlaceOfPreparationsStatusDialog:
        placeOfPreparationsUIContext.openUpdatePlaceOfPreparationsStatusDialog,
      openFetchPlaceOfPreparationsDialog:
        placeOfPreparationsUIContext.openFetchPlaceOfPreparationsDialog,
    };
  }, [placeOfPreparationsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("PlaceOfPreparation.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              placeOfPreparationsUIProps.newPlaceOfPreparationButtonClick
            }
          >
            {t("PlaceOfPreparation.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PlaceOfPreparationsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PlaceOfPreparationsUIConsumer>
        <PlaceOfPreparationsTable />
      </CardBody>
    </Card>
  );
}
