
import { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { TimeSetsTable } from "./TimeSets-table/TimeSetsTable";
import { useTimeSetsUIContext, TimeSetsUIConsumer } from "./TimeSetsUIContext";
import { useTranslation } from 'react-i18next';

export function TimeSetsCard() {
  const { t } = useTranslation();

  const timeSetsUIContext = useTimeSetsUIContext();

  const timeSetsUIProps = useMemo(() => {
    return {
      ids: timeSetsUIContext.ids,
      queryParams: timeSetsUIContext.queryParams,
      setQueryParams: timeSetsUIContext.setQueryParams,
      newTimeSetButtonClick: timeSetsUIContext.newTimeSetButtonClick,
      openDeleteTimeSetsDialog: timeSetsUIContext.openDeleteTimeSetsDialog,
      openEditTimeSetPage: timeSetsUIContext.openEditTimeSetPage,
      openUpdateTimeSetsStatusDialog: timeSetsUIContext.openUpdateTimeSetsStatusDialog,
      openFetchTimeSetsDialog: timeSetsUIContext.openFetchTimeSetsDialog,
    };
  }, [timeSetsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("BodyBuildingTimeSet.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={timeSetsUIProps.newTimeSetButtonClick}
          >
            <i className="fa fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TimeSetsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </TimeSetsUIConsumer>
        <TimeSetsTable />
      </CardBody>
    </Card>
  );
}