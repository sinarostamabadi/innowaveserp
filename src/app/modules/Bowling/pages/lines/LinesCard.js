import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { LinesTable } from "./lines-table/LinesTable";
import { useLinesUIContext, LinesUIConsumer } from "./LinesUIContext";
import { useTranslation } from "react-i18next";

export function LinesCard() {
  const { t } = useTranslation();

  const linesUIContext = useLinesUIContext();

  const linesUIProps = useMemo(() => {
    return {
      ids: linesUIContext.ids,
      queryParams: linesUIContext.queryParams,
      setQueryParams: linesUIContext.setQueryParams,
      newLineButtonClick: linesUIContext.newLineButtonClick,
      openDeleteLinesDialog: linesUIContext.openDeleteLinesDialog,
      openEditLinePage: linesUIContext.openEditLinePage,
      openUpdateLinesStatusDialog: linesUIContext.openUpdateLinesStatusDialog,
      openFetchLinesDialog: linesUIContext.openFetchLinesDialog,
    };
  }, [linesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Line.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={linesUIProps.newLineButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <LinesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </LinesUIConsumer>
        <LinesTable />
      </CardBody>
    </Card>
  );
}
