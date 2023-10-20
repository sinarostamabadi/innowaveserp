import { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ClosetsTable } from "./closets-table/ClosetsTable";
import { useClosetsUIContext, ClosetsUIConsumer } from "./ClosetsUIContext";
import { useTranslation } from "react-i18next";

export function ClosetsCard() {
  const { t } = useTranslation();

  const closetsUIContext = useClosetsUIContext();

  const { newCloset } = useMemo(() => {
    return {
      newCloset: closetsUIContext.newClosetButtonClick,
    };
  }, [closetsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("BodyBuildingCloset.Entity")}
      >
        <CardHeaderToolbar>
          <button type="button" className="btn btn-primary" onClick={newCloset}>
            <i className="fa fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ClosetsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ClosetsUIConsumer>
        <ClosetsTable />
      </CardBody>
    </Card>
  );
}
