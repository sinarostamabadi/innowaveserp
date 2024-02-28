import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { FutsalCentersTable } from "./futsalCenters-table/FutsalCentersTable";
import {
  useFutsalCentersUIContext,
  FutsalCentersUIConsumer,
} from "./FutsalCentersUIContext";
import { useTranslation } from "react-i18next";

export function FutsalCentersCard() {
  const { t } = useTranslation();

  const futsalCentersUIContext = useFutsalCentersUIContext();

  const futsalCentersUIProps = useMemo(() => {
    return {
      ids: futsalCentersUIContext.ids,
      queryParams: futsalCentersUIContext.queryParams,
      setQueryParams: futsalCentersUIContext.setQueryParams,
      newFutsalCenterButtonClick:
        futsalCentersUIContext.newFutsalCenterButtonClick,
      openDeleteFutsalCentersDialog:
        futsalCentersUIContext.openDeleteFutsalCentersDialog,
      openEditFutsalCenterPage: futsalCentersUIContext.openEditFutsalCenterPage,
      openUpdateFutsalCentersStatusDialog:
        futsalCentersUIContext.openUpdateFutsalCentersStatusDialog,
      openFetchFutsalCentersDialog:
        futsalCentersUIContext.openFetchFutsalCentersDialog,
    };
  }, [futsalCentersUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("FutsalCenter.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={futsalCentersUIProps.newFutsalCenterButtonClick}
          >
            {t("FutsalCenter.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FutsalCentersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </FutsalCentersUIConsumer>
        <FutsalCentersTable />
      </CardBody>
    </Card>
  );
}
