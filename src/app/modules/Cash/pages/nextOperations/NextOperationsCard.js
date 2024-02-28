import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { NextOperationsTable } from "./nextOperations-table/NextOperationsTable";
import {
  useNextOperationsUIContext,
  NextOperationsUIConsumer,
} from "./NextOperationsUIContext";
import { useTranslation } from "react-i18next";

export function NextOperationsCard() {
  const { t } = useTranslation();

  const nextOperationsUIContext = useNextOperationsUIContext();

  const nextOperationsUIProps = useMemo(() => {
    return {
      ids: nextOperationsUIContext.ids,
      queryParams: nextOperationsUIContext.queryParams,
      setQueryParams: nextOperationsUIContext.setQueryParams,
      newNextOperationButtonClick:
        nextOperationsUIContext.newNextOperationButtonClick,
      openDeleteNextOperationsDialog:
        nextOperationsUIContext.openDeleteNextOperationsDialog,
      openEditNextOperationPage:
        nextOperationsUIContext.openEditNextOperationPage,
      openUpdateNextOperationsStatusDialog:
        nextOperationsUIContext.openUpdateNextOperationsStatusDialog,
      openFetchNextOperationsDialog:
        nextOperationsUIContext.openFetchNextOperationsDialog,
    };
  }, [nextOperationsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("NextOperation.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={nextOperationsUIProps.newNextOperationButtonClick}
          >
            {t("NextOperation.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <NextOperationsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </NextOperationsUIConsumer>
        <NextOperationsTable />
      </CardBody>
    </Card>
  );
}
