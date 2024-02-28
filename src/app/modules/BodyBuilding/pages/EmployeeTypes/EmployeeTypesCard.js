import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeTypesTable } from "./EmployeeTypes-table/EmployeeTypesTable";
import {
  useEmployeeTypesUIContext,
  EmployeeTypesUIConsumer,
} from "./EmployeeTypesUIContext";

export function EmployeeTypesCard() {
  const { t } = useTranslation();

  const uiContext = useEmployeeTypesUIContext();
  const uiProps = useMemo(() => {
    return {
      newEmployeeType: uiContext.newEmployeeTypeButtonClick,
    };
  }, [uiContext]);

  return (
    <>
      <Card>
        <CardHeader
          title={t("Common.List") + " " + t("BodyBuildingEmployeeType.Entity")}
        >
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={uiProps.newEmployeeType}
            >
              <i className="fa fa-plus"></i> {t("Common.New")}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <EmployeeTypesUIConsumer>
            {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
          </EmployeeTypesUIConsumer>
          <EmployeeTypesTable />
        </CardBody>
      </Card>
    </>
  );
}
