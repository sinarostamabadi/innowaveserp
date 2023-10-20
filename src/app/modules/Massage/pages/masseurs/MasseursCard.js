
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MasseursTable } from "./masseurs-table/MasseursTable";
import { useMasseursUIContext, MasseursUIConsumer } from "./MasseursUIContext";
import { useTranslation } from 'react-i18next';

export function MasseursCard() {
  const { t } = useTranslation();

  const masseursUIContext = useMasseursUIContext();

  const masseursUIProps = useMemo(() => {
    return {
      ids: masseursUIContext.ids,
      queryParams: masseursUIContext.queryParams,
      setQueryParams: masseursUIContext.setQueryParams,
      newMasseurButtonClick: masseursUIContext.newMasseurButtonClick,
      openDeleteMasseursDialog: masseursUIContext.openDeleteMasseursDialog,
      openEditMasseurPage: masseursUIContext.openEditMasseurPage,
      openUpdateMasseursStatusDialog: masseursUIContext.openUpdateMasseursStatusDialog,
      openFetchMasseursDialog: masseursUIContext.openFetchMasseursDialog,
    };
  }, [masseursUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Masseur.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={masseursUIProps.newMasseurButtonClick}
          >
            {t("Masseur.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MasseursUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MasseursUIConsumer>
        <MasseursTable />
      </CardBody>
    </Card>
  );
}