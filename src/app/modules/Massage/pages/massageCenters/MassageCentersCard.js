
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MassageCentersTable } from "./massageCenters-table/MassageCentersTable";
import { useMassageCentersUIContext, MassageCentersUIConsumer } from "./MassageCentersUIContext";
import { useTranslation } from 'react-i18next';

export function MassageCentersCard() {
  const { t } = useTranslation();

  const massageCentersUIContext = useMassageCentersUIContext();

  const massageCentersUIProps = useMemo(() => {
    return {
      ids: massageCentersUIContext.ids,
      queryParams: massageCentersUIContext.queryParams,
      setQueryParams: massageCentersUIContext.setQueryParams,
      newMassageCenterButtonClick: massageCentersUIContext.newMassageCenterButtonClick,
      openDeleteMassageCentersDialog: massageCentersUIContext.openDeleteMassageCentersDialog,
      openEditMassageCenterPage: massageCentersUIContext.openEditMassageCenterPage,
      openUpdateMassageCentersStatusDialog: massageCentersUIContext.openUpdateMassageCentersStatusDialog,
      openFetchMassageCentersDialog: massageCentersUIContext.openFetchMassageCentersDialog,
    };
  }, [massageCentersUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("MassageCenter.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={massageCentersUIProps.newMassageCenterButtonClick}
          >
            {t("MassageCenter.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MassageCentersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MassageCentersUIConsumer>
        <MassageCentersTable />
      </CardBody>
    </Card>
  );
}