import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { getStorage } from "src/core/_helpers";
import { RestaurantInvoicesTable } from "./RestaurantInvoices-table/RestaurantInvoicesTable";
import {
  useRestaurantInvoicesUIContext,
  RestaurantInvoicesUIConsumer,
} from "./RestaurantInvoicesUIContext";

export function RestaurantInvoicesCard() {
  const { t } = useTranslation();
  const [openOrder, setOpenOrder] = useState({
    Property: "RestaurantInvoiceStatusId",
    Operation: 5,
    Values: ["1", "2", "4"],
  });

  const defaultRestaurant = !!getStorage("defaultRestaurant")
    ? JSON.parse(getStorage("defaultRestaurant"))
    : null;

  const restaurantInvoicesUIContext = useRestaurantInvoicesUIContext();
  const restaurantInvoicesUIProps = useMemo(() => {
    return {
      newClick: restaurantInvoicesUIContext.newClick,
      openReportDialog: restaurantInvoicesUIContext.openReportDialog,
      queryParams: restaurantInvoicesUIContext.queryParams,
      setQueryParams: restaurantInvoicesUIContext.setQueryParams,
    };
  }, [restaurantInvoicesUIContext]);

  const newQueryParams = { ...restaurantInvoicesUIProps.queryParams };
  useEffect(() => {
    if (!!openOrder && newQueryParams.Filters.length)
      newQueryParams.Filters = newQueryParams.Filters.map((x) => {
        if (x.Property == openOrder.Property) return openOrder;
        else return x;
      });
    else if (!!openOrder && newQueryParams.Filters.length == 0)
      newQueryParams.Filters.push(openOrder);

    newQueryParams.PageNumber = 1;

    restaurantInvoicesUIProps.setQueryParams(newQueryParams);
  }, [openOrder]);

  return (
    <>
      {!!defaultRestaurant ? (
        <Card>
          <CardHeader>
            <div className="card-title">
              <h3 className="card-label">
                {t("Common.List") + " " + t("RestaurantInvoice.Entity")}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Show open orders"
                  defaultChecked={true}
                  className="ml-5 d-inline-block opacity-90"
                  style={{ fontSize: "0.9rem" }}
                  onChange={(val) =>
                    setOpenOrder({
                      ...openOrder,
                      Values: val.target.checked ? ["1", "2", "4"] : ["3", "5"],
                    })
                  }
                />
              </h3>
            </div>
            <CardHeaderToolbar>
              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={restaurantInvoicesUIProps.openReportDialog}
              >
                {t("Reports.RestaurantInvoiceCash")}
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={restaurantInvoicesUIProps.newClick}
              >
                {t("RestaurantInvoice.Entity")} {t("Common.New")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <RestaurantInvoicesUIConsumer>
              {(dataUI) => (
                <AdvancedFilter uiActions={dataUI} extraFilter={openOrder} />
              )}
            </RestaurantInvoicesUIConsumer>
            <RestaurantInvoicesTable />
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <Link className="btn btn-danger" to="/restaurant/dashboard">
              Please click this button to go to the dashboard and select the default restaurant
            </Link>
          </CardBody>
        </Card>
      )}
    </>
  );
}
