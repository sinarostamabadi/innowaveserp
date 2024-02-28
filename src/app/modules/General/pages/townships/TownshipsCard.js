import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { TownshipsTable } from "./townships-table/TownshipsTable";
import {
  useTownshipsUIContext,
  TownshipsUIConsumer,
} from "./TownshipsUIContext";
import { useTranslation } from "react-i18next";

export function TownshipsCard() {
  const { t } = useTranslation();

  const townshipsUIContext = useTownshipsUIContext();

  const townshipsUIProps = useMemo(() => {
    return {
      ids: townshipsUIContext.ids,
      queryParams: townshipsUIContext.queryParams,
      setQueryParams: townshipsUIContext.setQueryParams,
      newTownshipButtonClick: townshipsUIContext.newTownshipButtonClick,
      openDeleteTownshipsDialog: townshipsUIContext.openDeleteTownshipsDialog,
      openEditTownshipPage: townshipsUIContext.openEditTownshipPage,
      openUpdateTownshipsStatusDialog:
        townshipsUIContext.openUpdateTownshipsStatusDialog,
      openFetchTownshipsDialog: townshipsUIContext.openFetchTownshipsDialog,
    };
  }, [townshipsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Township.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={townshipsUIProps.newTownshipButtonClick}
          >
            {t("Township.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TownshipsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </TownshipsUIConsumer>
        <TownshipsTable />
      </CardBody>
    </Card>
  );
}
