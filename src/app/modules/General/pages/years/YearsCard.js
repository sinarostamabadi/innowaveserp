import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { YearsTable } from "./years-table/YearsTable";
import { useYearsUIContext, YearsUIConsumer } from "./YearsUIContext";
import { useTranslation } from "react-i18next";

export function YearsCard() {
  const { t } = useTranslation();

  const yearsUIContext = useYearsUIContext();

  const yearsUIProps = useMemo(() => {
    return {
      ids: yearsUIContext.ids,
      queryParams: yearsUIContext.queryParams,
      setQueryParams: yearsUIContext.setQueryParams,
      newYearButtonClick: yearsUIContext.newYearButtonClick,
      openDeleteYearsDialog: yearsUIContext.openDeleteYearsDialog,
      openEditYearPage: yearsUIContext.openEditYearPage,
      openUpdateYearsStatusDialog: yearsUIContext.openUpdateYearsStatusDialog,
      openFetchYearsDialog: yearsUIContext.openFetchYearsDialog,
    };
  }, [yearsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Year.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={yearsUIProps.newYearButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <YearsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </YearsUIConsumer>
        <YearsTable />
      </CardBody>
    </Card>
  );
}
