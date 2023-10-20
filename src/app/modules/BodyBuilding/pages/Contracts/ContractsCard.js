import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { ContractsTable } from "./Contracts-table/ContractsTable";
import { useContractsUIContext, ContractsUIConsumer } from "./ContractsUIContext";

export function ContractsCard() {
  const { t } = useTranslation();

  const uiContext = useContractsUIContext();
  const uiProps = useMemo(() => {
    return {
      newContract: uiContext.newContractButtonClick,
    };
  }, [uiContext]);

  return (
    <>
      <Card>
        <CardHeader
          title={t("Common.List") + " " + t("BodyBuildingContract.Entity")}
        >
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={uiProps.newContract}
            >
              <i className="fa fa-plus"></i> {t("Common.New")}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <ContractsUIConsumer>
            {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
          </ContractsUIConsumer>
          <ContractsTable />
        </CardBody>
      </Card>
    </>
  );
}
