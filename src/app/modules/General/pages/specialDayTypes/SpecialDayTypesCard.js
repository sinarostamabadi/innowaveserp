import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SpecialDayTypesTable } from "./specialDayTypes-table/SpecialDayTypesTable";
import {
  useSpecialDayTypesUIContext,
  SpecialDayTypesUIConsumer,
} from "./SpecialDayTypesUIContext";
import { useTranslation } from "react-i18next";

export function SpecialDayTypesCard() {
  const { t } = useTranslation();

  const specialDayTypesUIContext = useSpecialDayTypesUIContext();

  const specialDayTypesUIProps = useMemo(() => {
    return {
      ids: specialDayTypesUIContext.ids,
      queryParams: specialDayTypesUIContext.queryParams,
      setQueryParams: specialDayTypesUIContext.setQueryParams,
      newSpecialDayTypeButtonClick:
        specialDayTypesUIContext.newSpecialDayTypeButtonClick,
      openDeleteSpecialDayTypesDialog:
        specialDayTypesUIContext.openDeleteSpecialDayTypesDialog,
      openEditSpecialDayTypePage:
        specialDayTypesUIContext.openEditSpecialDayTypePage,
      openUpdateSpecialDayTypesStatusDialog:
        specialDayTypesUIContext.openUpdateSpecialDayTypesStatusDialog,
      openFetchSpecialDayTypesDialog:
        specialDayTypesUIContext.openFetchSpecialDayTypesDialog,
    };
  }, [specialDayTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("SpecialDayType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={specialDayTypesUIProps.newSpecialDayTypeButtonClick}
          >
            {t("SpecialDayType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SpecialDayTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SpecialDayTypesUIConsumer>
        <SpecialDayTypesTable />
      </CardBody>
    </Card>
  );
}
