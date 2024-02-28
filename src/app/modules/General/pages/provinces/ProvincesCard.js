import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ProvincesTable } from "./provinces-table/ProvincesTable";
import {
  useProvincesUIContext,
  ProvincesUIConsumer,
} from "./ProvincesUIContext";
import { useTranslation } from "react-i18next";

export function ProvincesCard() {
  const { t } = useTranslation();

  const provincesUIContext = useProvincesUIContext();

  const provincesUIProps = useMemo(() => {
    return {
      ids: provincesUIContext.ids,
      queryParams: provincesUIContext.queryParams,
      setQueryParams: provincesUIContext.setQueryParams,
      newProvinceButtonClick: provincesUIContext.newProvinceButtonClick,
      openDeleteProvincesDialog: provincesUIContext.openDeleteProvincesDialog,
      openEditProvincePage: provincesUIContext.openEditProvincePage,
      openUpdateProvincesStatusDialog:
        provincesUIContext.openUpdateProvincesStatusDialog,
      openFetchProvincesDialog: provincesUIContext.openFetchProvincesDialog,
    };
  }, [provincesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Province.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={provincesUIProps.newProvinceButtonClick}
          >
            {t("Province.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProvincesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ProvincesUIConsumer>
        <ProvincesTable />
      </CardBody>
    </Card>
  );
}
