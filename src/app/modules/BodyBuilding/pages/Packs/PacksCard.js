import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { PacksTable } from "./Packs-table/PacksTable";
import { usePacksUIContext, PacksUIConsumer } from "./PacksUIContext";

export function PacksCard() {
  const { t } = useTranslation();

  const uiContext = usePacksUIContext();
  const uiProps = useMemo(() => {
    return {
      newPack: uiContext.newPackButtonClick,
    };
  }, [uiContext]);

  return (
    <>
      <Card>
        <CardHeader
          title={t("Common.List") + " " + t("BodyBuildingPack.Entity")}
        >
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={uiProps.newPack}
            >
              <i className="fa fa-plus"></i> {t("Common.New")}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <PacksUIConsumer>
            {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
          </PacksUIConsumer>
          <PacksTable />
        </CardBody>
      </Card>
    </>
  );
}
