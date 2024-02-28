import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PersonSpecialDaysTable } from "./personSpecialDays-table/PersonSpecialDaysTable";
import {
  usePersonSpecialDaysUIContext,
  PersonSpecialDaysUIConsumer,
} from "./PersonSpecialDaysUIContext";
export function PersonSpecialDaysCard() {
  const personSpecialDaysUIContext = usePersonSpecialDaysUIContext();
  const personSpecialDaysUIProps = useMemo(() => {
    return {
      ids: personSpecialDaysUIContext.ids,
      queryParams: personSpecialDaysUIContext.queryParams,
      setQueryParams: personSpecialDaysUIContext.setQueryParams,
      newPersonSpecialDayButtonClick:
        personSpecialDaysUIContext.newPersonSpecialDayButtonClick,
      openDeletePersonSpecialDaysDialog:
        personSpecialDaysUIContext.openDeletePersonSpecialDaysDialog,
      openEditPersonSpecialDayPage:
        personSpecialDaysUIContext.openEditPersonSpecialDayPage,
      openUpdatePersonSpecialDaysStatusDialog:
        personSpecialDaysUIContext.openUpdatePersonSpecialDaysStatusDialog,
      openFetchPersonSpecialDaysDialog:
        personSpecialDaysUIContext.openFetchPersonSpecialDaysDialog,
    };
  }, [personSpecialDaysUIContext]);
  return (
    <Card>
      <CardHeader title="EntityTitle">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={personSpecialDaysUIProps.newPersonSpecialDayButtonClick}
          >
            EntityTitle
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PersonSpecialDaysUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PersonSpecialDaysUIConsumer>
        <PersonSpecialDaysTable />
      </CardBody>
    </Card>
  );
}
