import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MajorsTable } from "./majors-table/MajorsTable";
import { useMajorsUIContext, MajorsUIConsumer } from "./MajorsUIContext";
import { useTranslation } from "react-i18next";

export function MajorsCard() {
  const { t } = useTranslation();

  const majorsUIContext = useMajorsUIContext();

  const majorsUIProps = useMemo(() => {
    return {
      ids: majorsUIContext.ids,
      queryParams: majorsUIContext.queryParams,
      setQueryParams: majorsUIContext.setQueryParams,
      newMajorButtonClick: majorsUIContext.newMajorButtonClick,
      openDeleteMajorsDialog: majorsUIContext.openDeleteMajorsDialog,
      openEditMajorPage: majorsUIContext.openEditMajorPage,
      openUpdateMajorsStatusDialog:
        majorsUIContext.openUpdateMajorsStatusDialog,
      openFetchMajorsDialog: majorsUIContext.openFetchMajorsDialog,
    };
  }, [majorsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Major.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={majorsUIProps.newMajorButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MajorsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MajorsUIConsumer>
        <MajorsTable />
      </CardBody>
    </Card>
  );
}
