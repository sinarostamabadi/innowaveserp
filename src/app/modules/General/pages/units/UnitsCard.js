
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { UnitsTable } from "./units-table/UnitsTable";
import { useUnitsUIContext, UnitsUIConsumer } from "./UnitsUIContext";
import { useTranslation } from 'react-i18next';

export function UnitsCard() {
  const { t } = useTranslation();

  const unitsUIContext = useUnitsUIContext();

  const unitsUIProps = useMemo(() => {
    return {
      ids: unitsUIContext.ids,
      queryParams: unitsUIContext.queryParams,
      setQueryParams: unitsUIContext.setQueryParams,
      newUnitButtonClick: unitsUIContext.newUnitButtonClick,
      openDeleteUnitsDialog: unitsUIContext.openDeleteUnitsDialog,
      openEditUnitPage: unitsUIContext.openEditUnitPage,
      openUpdateUnitsStatusDialog: unitsUIContext.openUpdateUnitsStatusDialog,
      openFetchUnitsDialog: unitsUIContext.openFetchUnitsDialog,
    };
  }, [unitsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Unit.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={unitsUIProps.newUnitButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UnitsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </UnitsUIConsumer>
        <UnitsTable />
      </CardBody>
    </Card>
  );
}