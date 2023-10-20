
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BilliardCentersTable } from "./billiardCenters-table/BilliardCentersTable";
import { useBilliardCentersUIContext, BilliardCentersUIConsumer } from "./BilliardCentersUIContext";
import { useTranslation } from 'react-i18next';

export function BilliardCentersCard() {
  const { t } = useTranslation();

  const billiardCentersUIContext = useBilliardCentersUIContext();

  const billiardCentersUIProps = useMemo(() => {
    return {
      ids: billiardCentersUIContext.ids,
      queryParams: billiardCentersUIContext.queryParams,
      setQueryParams: billiardCentersUIContext.setQueryParams,
      newBilliardCenterButtonClick: billiardCentersUIContext.newBilliardCenterButtonClick,
      openDeleteBilliardCentersDialog: billiardCentersUIContext.openDeleteBilliardCentersDialog,
      openEditBilliardCenterPage: billiardCentersUIContext.openEditBilliardCenterPage,
      openUpdateBilliardCentersStatusDialog: billiardCentersUIContext.openUpdateBilliardCentersStatusDialog,
      openFetchBilliardCentersDialog: billiardCentersUIContext.openFetchBilliardCentersDialog,
    };
  }, [billiardCentersUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("BilliardCenter.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={billiardCentersUIProps.newBilliardCenterButtonClick}
          >
            {t("BilliardCenter.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BilliardCentersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BilliardCentersUIConsumer>
        <BilliardCentersTable />
      </CardBody>
    </Card>
  );
}