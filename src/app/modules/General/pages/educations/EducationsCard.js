import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EducationsTable } from "./educations-table/EducationsTable";
import {
  useEducationsUIContext,
  EducationsUIConsumer,
} from "./EducationsUIContext";
import { useTranslation } from "react-i18next";

export function EducationsCard() {
  const { t } = useTranslation();

  const educationsUIContext = useEducationsUIContext();

  const educationsUIProps = useMemo(() => {
    return {
      ids: educationsUIContext.ids,
      queryParams: educationsUIContext.queryParams,
      setQueryParams: educationsUIContext.setQueryParams,
      newEducationButtonClick: educationsUIContext.newEducationButtonClick,
      openDeleteEducationsDialog:
        educationsUIContext.openDeleteEducationsDialog,
      openEditEducationPage: educationsUIContext.openEditEducationPage,
      openUpdateEducationsStatusDialog:
        educationsUIContext.openUpdateEducationsStatusDialog,
      openFetchEducationsDialog: educationsUIContext.openFetchEducationsDialog,
    };
  }, [educationsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Education.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={educationsUIProps.newEducationButtonClick}
          >
            {t("Education.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EducationsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EducationsUIConsumer>
        <EducationsTable />
      </CardBody>
    </Card>
  );
}
