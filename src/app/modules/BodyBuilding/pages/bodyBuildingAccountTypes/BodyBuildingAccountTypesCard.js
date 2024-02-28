import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BodyBuildingAccountTypesTable } from "./bodyBuildingAccountTypes-table/BodyBuildingAccountTypesTable";
import {
  useBodyBuildingAccountTypesUIContext,
  BodyBuildingAccountTypesUIConsumer,
} from "./BodyBuildingAccountTypesUIContext";
import { useTranslation } from "react-i18next";

export function BodyBuildingAccountTypesCard() {
  const { t } = useTranslation();

  const bodyBuildingAccountTypesUIContext =
    useBodyBuildingAccountTypesUIContext();

  const bodyBuildingAccountTypesUIProps = useMemo(() => {
    return {
      ids: bodyBuildingAccountTypesUIContext.ids,
      queryParams: bodyBuildingAccountTypesUIContext.queryParams,
      setQueryParams: bodyBuildingAccountTypesUIContext.setQueryParams,
      newBodyBuildingAccountTypeButtonClick:
        bodyBuildingAccountTypesUIContext.newBodyBuildingAccountTypeButtonClick,
      openDeleteBodyBuildingAccountTypesDialog:
        bodyBuildingAccountTypesUIContext.openDeleteBodyBuildingAccountTypesDialog,
      openEditBodyBuildingAccountTypePage:
        bodyBuildingAccountTypesUIContext.openEditBodyBuildingAccountTypePage,
      openUpdateBodyBuildingAccountTypesStatusDialog:
        bodyBuildingAccountTypesUIContext.openUpdateBodyBuildingAccountTypesStatusDialog,
      openFetchBodyBuildingAccountTypesDialog:
        bodyBuildingAccountTypesUIContext.openFetchBodyBuildingAccountTypesDialog,
    };
  }, [bodyBuildingAccountTypesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("BodyBuildingAccountType.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              bodyBuildingAccountTypesUIProps.newBodyBuildingAccountTypeButtonClick
            }
          >
            {t("BodyBuildingAccountType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BodyBuildingAccountTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BodyBuildingAccountTypesUIConsumer>
        <BodyBuildingAccountTypesTable />
      </CardBody>
    </Card>
  );
}
