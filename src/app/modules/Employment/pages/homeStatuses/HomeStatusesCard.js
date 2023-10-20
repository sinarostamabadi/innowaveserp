
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { HomeStatusesTable } from "./homeStatuses-table/HomeStatusesTable";
import { useHomeStatusesUIContext, HomeStatusesUIConsumer } from "./HomeStatusesUIContext";
import { useTranslation } from 'react-i18next';

export function HomeStatusesCard() {
  const { t } = useTranslation();

  const homeStatusesUIContext = useHomeStatusesUIContext();

  const homeStatusesUIProps = useMemo(() => {
    return {
      ids: homeStatusesUIContext.ids,
      queryParams: homeStatusesUIContext.queryParams,
      setQueryParams: homeStatusesUIContext.setQueryParams,
      newHomeStatusButtonClick: homeStatusesUIContext.newHomeStatusButtonClick,
      openDeleteHomeStatusesDialog: homeStatusesUIContext.openDeleteHomeStatusesDialog,
      openEditHomeStatusPage: homeStatusesUIContext.openEditHomeStatusPage,
      openUpdateHomeStatusesStatusDialog: homeStatusesUIContext.openUpdateHomeStatusesStatusDialog,
      openFetchHomeStatusesDialog: homeStatusesUIContext.openFetchHomeStatusesDialog,
    };
  }, [homeStatusesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("HomeStatus.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={homeStatusesUIProps.newHomeStatusButtonClick}
          >
            {t("HomeStatus.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <HomeStatusesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </HomeStatusesUIConsumer>
        <HomeStatusesTable />
      </CardBody>
    </Card>
  );
}