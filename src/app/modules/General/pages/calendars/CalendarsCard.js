import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CalendarsTable } from "./calendars-table/CalendarsTable";
import {
  useCalendarsUIContext,
  CalendarsUIConsumer,
} from "./CalendarsUIContext";
export function CalendarsCard() {
  const calendarsUIContext = useCalendarsUIContext();
  const calendarsUIProps = useMemo(() => {
    return {
      ids: calendarsUIContext.ids,
      queryParams: calendarsUIContext.queryParams,
      setQueryParams: calendarsUIContext.setQueryParams,
      newCalendarButtonClick: calendarsUIContext.newCalendarButtonClick,
      openDeleteCalendarsDialog: calendarsUIContext.openDeleteCalendarsDialog,
      openEditCalendarPage: calendarsUIContext.openEditCalendarPage,
      openUpdateCalendarsStatusDialog:
        calendarsUIContext.openUpdateCalendarsStatusDialog,
      openFetchCalendarsDialog: calendarsUIContext.openFetchCalendarsDialog,
    };
  }, [calendarsUIContext]);
  return (
    <Card>
      <CardHeader title="EntityTitle">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={calendarsUIProps.newCalendarButtonClick}
          >
            EntityTitle
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CalendarsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CalendarsUIConsumer>
        <CalendarsTable />
      </CardBody>
    </Card>
  );
}
