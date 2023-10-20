
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { FutsalTimingTable } from "./futsalTiming-table/FutsalTimingTable";
import { useFutsalTimingUIContext, FutsalTimingUIConsumer } from "./FutsalTimingUIContext";
import { useTranslation } from 'react-i18next';

export function FutsalTimingCard() {
  const { t } = useTranslation();

  const futsalTimingUIContext = useFutsalTimingUIContext();

  const futsalTimingUIProps = useMemo(() => {
    return {
      ids: futsalTimingUIContext.ids,
      queryParams: futsalTimingUIContext.queryParams,
      setQueryParams: futsalTimingUIContext.setQueryParams,
      newFutsalTimingButtonClick: futsalTimingUIContext.newFutsalTimingButtonClick,
      openDeleteFutsalTimingDialog: futsalTimingUIContext.openDeleteFutsalTimingDialog,
      openEditFutsalTimingPage: futsalTimingUIContext.openEditFutsalTimingPage,
      openUpdateFutsalTimingStatusDialog: futsalTimingUIContext.openUpdateFutsalTimingStatusDialog,
      openFetchFutsalTimingDialog: futsalTimingUIContext.openFetchFutsalTimingDialog,
    };
  }, [futsalTimingUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("FutsalTiming.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={futsalTimingUIProps.newFutsalTimingButtonClick}
          >
            {t("FutsalTiming.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FutsalTimingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </FutsalTimingUIConsumer>
        <FutsalTimingTable />
      </CardBody>
    </Card>
  );
}