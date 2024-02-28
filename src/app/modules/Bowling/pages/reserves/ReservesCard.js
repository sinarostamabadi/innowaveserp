import { useMemo, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { ReservesTable } from "./reserves-table/ReservesTable";
import { useReservesUIContext, ReservesUIConsumer } from "./ReservesUIContext";
import { useTranslation } from "react-i18next";

export function ReservesCard({ history }) {
  const { t } = useTranslation();
  const [unfinished, setUnfinished] = useState({
    Property: "IsActive",
    Operation: 5,
    Values: ["1"],
  });

  const uiContext = useReservesUIContext();
  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      newReserveButtonClick: uiContext.newReserveButtonClick,
      openDeleteReservesDialog: uiContext.openDeleteReservesDialog,
      openEditReservePage: uiContext.openEditReservePage,
      openUpdateReservesStatusDialog: uiContext.openUpdateReservesStatusDialog,
      openFetchReservesDialog: uiContext.openFetchReservesDialog,
      openReportDialog: uiContext.openReportDialog,
    };
  }, [uiContext]);

  const newQueryParams = { ...uiProps.queryParams };
  useEffect(() => {
    if (!!unfinished && newQueryParams.Filters.length)
      newQueryParams.Filters = newQueryParams.Filters.map((x) => {
        if (x.Property == unfinished.Property) return unfinished;
        else return x;
      });
    else if (!!unfinished && newQueryParams.Filters.length == 0)
      newQueryParams.Filters.push(unfinished);

    newQueryParams.PageNumber = 1;

    uiProps.setQueryParams(newQueryParams);
  }, [unfinished]);

  return (
    <Card>
      <CardHeader>
        <div className="card-title">
          <h3 className="card-label">
            {t("Common.List") + " " + t("BowlingReserve.Entity")}
            <Form.Check
              type="switch"
              id="custom-switch"
              label={t("BowlingReserve.ShowUnfinishedGames")}
              defaultChecked={"1"}
              className="ml-5 d-inline-block opacity-90"
              style={{ fontSize: "0.9rem" }}
              onChange={(val) =>
                setUnfinished({
                  ...unfinished,
                  Values: val.target.checked ? ["1"] : ["0"],
                })
              }
            />
          </h3>
        </div>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={uiProps.openReportDialog}
          >
            <i className="fas fa-cash-register"></i>{" "}
            {t("Reports.RestaurantInvoiceCash")}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={uiProps.newReserveButtonClick}
          >
            <i className="fas fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ReservesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ReservesUIConsumer>
        <ReservesTable history={history} />
      </CardBody>
    </Card>
  );
}
