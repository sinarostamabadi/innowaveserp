
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PromissoryNotesTable } from "./promissoryNotes-table/PromissoryNotesTable";
import { usePromissoryNotesUIContext, PromissoryNotesUIConsumer } from "./PromissoryNotesUIContext";
import { useTranslation } from 'react-i18next';

export function PromissoryNotesCard() {
  const { t } = useTranslation();

  const promissoryNotesUIContext = usePromissoryNotesUIContext();

  const promissoryNotesUIProps = useMemo(() => {
    return {
      ids: promissoryNotesUIContext.ids,
      queryParams: promissoryNotesUIContext.queryParams,
      setQueryParams: promissoryNotesUIContext.setQueryParams,
      newPromissoryNoteButtonClick: promissoryNotesUIContext.newPromissoryNoteButtonClick,
      openDeletePromissoryNotesDialog: promissoryNotesUIContext.openDeletePromissoryNotesDialog,
      openEditPromissoryNotePage: promissoryNotesUIContext.openEditPromissoryNotePage,
      openUpdatePromissoryNotesStatusDialog: promissoryNotesUIContext.openUpdatePromissoryNotesStatusDialog,
      openFetchPromissoryNotesDialog: promissoryNotesUIContext.openFetchPromissoryNotesDialog,
    };
  }, [promissoryNotesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("PromissoryNote.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={promissoryNotesUIProps.newPromissoryNoteButtonClick}
          >
            {t("PromissoryNote.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PromissoryNotesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PromissoryNotesUIConsumer>
        <PromissoryNotesTable />
      </CardBody>
    </Card>
  );
}