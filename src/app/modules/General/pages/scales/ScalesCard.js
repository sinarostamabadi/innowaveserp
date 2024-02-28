import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ScalesTable } from "./scales-table/ScalesTable";
import { useScalesUIContext, ScalesUIConsumer } from "./ScalesUIContext";
import { useTranslation } from "react-i18next";

export function ScalesCard() {
  const { t } = useTranslation();

  const scalesUIContext = useScalesUIContext();

  const scalesUIProps = useMemo(() => {
    return {
      ids: scalesUIContext.ids,
      queryParams: scalesUIContext.queryParams,
      setQueryParams: scalesUIContext.setQueryParams,
      newScaleButtonClick: scalesUIContext.newScaleButtonClick,
      openDeleteScalesDialog: scalesUIContext.openDeleteScalesDialog,
      openEditScalePage: scalesUIContext.openEditScalePage,
      openUpdateScalesStatusDialog:
        scalesUIContext.openUpdateScalesStatusDialog,
      openFetchScalesDialog: scalesUIContext.openFetchScalesDialog,
    };
  }, [scalesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Scale.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={scalesUIProps.newScaleButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ScalesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ScalesUIConsumer>
        <ScalesTable />
      </CardBody>
    </Card>
  );
}
