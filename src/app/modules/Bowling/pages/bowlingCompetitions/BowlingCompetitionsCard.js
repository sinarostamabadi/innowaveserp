
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BowlingCompetitionsTable } from "./bowlingCompetitions-table/BowlingCompetitionsTable";
import { useBowlingCompetitionsUIContext, BowlingCompetitionsUIConsumer } from "./BowlingCompetitionsUIContext";
import { useTranslation } from 'react-i18next';

export function BowlingCompetitionsCard() {
  const { t } = useTranslation();

  const uiContext = useBowlingCompetitionsUIContext();

  const uiProps = useMemo(() => {
    return {
      new: uiContext.newBowlingCompetitionButtonClick,
    };
  }, [uiContext]);

  return (
    <Card>
      <CardHeader title={t("BowlingCompetition.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={uiProps.new}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BowlingCompetitionsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BowlingCompetitionsUIConsumer>
        <BowlingCompetitionsTable />
      </CardBody>
    </Card>
  );
}