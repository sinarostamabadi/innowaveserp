
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PoolCentersTable } from "./poolCenters-table/PoolCentersTable";
import { usePoolCentersUIContext, PoolCentersUIConsumer } from "./PoolCentersUIContext";
import { useTranslation } from 'react-i18next';

export function PoolCentersCard() {
  const { t } = useTranslation();

  const poolCentersUIContext = usePoolCentersUIContext();

  const poolCentersUIProps = useMemo(() => {
    return {
      ids: poolCentersUIContext.ids,
      queryParams: poolCentersUIContext.queryParams,
      setQueryParams: poolCentersUIContext.setQueryParams,
      newPoolCenterButtonClick: poolCentersUIContext.newPoolCenterButtonClick,
      openDeletePoolCentersDialog: poolCentersUIContext.openDeletePoolCentersDialog,
      openEditPoolCenterPage: poolCentersUIContext.openEditPoolCenterPage,
      openUpdatePoolCentersStatusDialog: poolCentersUIContext.openUpdatePoolCentersStatusDialog,
      openFetchPoolCentersDialog: poolCentersUIContext.openFetchPoolCentersDialog,
    };
  }, [poolCentersUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("PoolCenter.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={poolCentersUIProps.newPoolCenterButtonClick}
          >
            {t("PoolCenter.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PoolCentersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PoolCentersUIConsumer>
        <PoolCentersTable />
      </CardBody>
    </Card>
  );
}