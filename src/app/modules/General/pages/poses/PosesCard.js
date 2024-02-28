import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { PosesTable } from "./poses-table/PosesTable";
import { usePosesUIContext, PosesUIConsumer } from "./PosesUIContext";
import { useTranslation } from "react-i18next";

export function PosesCard() {
  const { t } = useTranslation();

  const posesUIContext = usePosesUIContext();

  const posesUIProps = useMemo(() => {
    return {
      ids: posesUIContext.ids,
      queryParams: posesUIContext.queryParams,
      setQueryParams: posesUIContext.setQueryParams,
      newPosButtonClick: posesUIContext.newPosButtonClick,
      openDeletePosesDialog: posesUIContext.openDeletePosesDialog,
      openEditPosPage: posesUIContext.openEditPosPage,
      openUpdatePosesStatusDialog: posesUIContext.openUpdatePosesStatusDialog,
      openFetchPosesDialog: posesUIContext.openFetchPosesDialog,
    };
  }, [posesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Pos.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={posesUIProps.newPosButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PosesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PosesUIConsumer>
        <PosesTable />
      </CardBody>
    </Card>
  );
}
