
import { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ServicesTable } from "./Services-table/ServicesTable";
import { useServicesUIContext, ServicesUIConsumer } from "./ServicesUIContext";
import { useTranslation } from 'react-i18next';

export function ServicesCard() {
  const { t } = useTranslation();

  const servicesUIContext = useServicesUIContext();

  const servicesUIProps = useMemo(() => {
    return {
      ids: servicesUIContext.ids,
      queryParams: servicesUIContext.queryParams,
      setQueryParams: servicesUIContext.setQueryParams,
      newServiceButtonClick: servicesUIContext.newServiceButtonClick,
      openDeleteServicesDialog: servicesUIContext.openDeleteServicesDialog,
      openEditServicePage: servicesUIContext.openEditServicePage,
      openUpdateServicesStatusDialog: servicesUIContext.openUpdateServicesStatusDialog,
      openFetchServicesDialog: servicesUIContext.openFetchServicesDialog,
    };
  }, [servicesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("BodyBuildingService.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={servicesUIProps.newServiceButtonClick}
          >
            <i className="fa fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ServicesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ServicesUIConsumer>
        <ServicesTable />
      </CardBody>
    </Card>
  );
}