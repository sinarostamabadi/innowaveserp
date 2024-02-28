import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { InfoAreasTable } from "./infoAreas-table/InfoAreasTable";
import {
  useInfoAreasUIContext,
  InfoAreasUIConsumer,
} from "./InfoAreasUIContext";
import { useTranslation } from "react-i18next";

export function InfoAreasCard() {
  const { t } = useTranslation();

  const infoAreasUIContext = useInfoAreasUIContext();

  const infoAreasUIProps = useMemo(() => {
    return {
      ids: infoAreasUIContext.ids,
      queryParams: infoAreasUIContext.queryParams,
      setQueryParams: infoAreasUIContext.setQueryParams,
      newInfoAreaButtonClick: infoAreasUIContext.newInfoAreaButtonClick,
      openDeleteInfoAreasDialog: infoAreasUIContext.openDeleteInfoAreasDialog,
      openEditInfoAreaPage: infoAreasUIContext.openEditInfoAreaPage,
      openUpdateInfoAreasStatusDialog:
        infoAreasUIContext.openUpdateInfoAreasStatusDialog,
      openFetchInfoAreasDialog: infoAreasUIContext.openFetchInfoAreasDialog,
    };
  }, [infoAreasUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("InfoArea.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={infoAreasUIProps.newInfoAreaButtonClick}
          >
            {t("InfoArea.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InfoAreasUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </InfoAreasUIConsumer>
        <InfoAreasTable />
      </CardBody>
    </Card>
  );
}
