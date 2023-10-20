import React, { useMemo, useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { TakeAwayRequestsTable } from "./takeAwayRequests-table/TakeAwayRequestsTable";
import { useTakeAwayRequestsUIContext, TakeAwayRequestsUIConsumer } from "./TakeAwayRequestsUIContext";
import moment from "jalali-moment";

export function TakeAwayRequestsCard() {
  const { t } = useTranslation();
  const [toDate, setToDate] = useState({
    Property: "ToDate",
    Operation: 4,
    Values: [moment.from().format("YYYY-MM-DDTHH:mm:ss")],
  });

  const uiContext = useTakeAwayRequestsUIContext();

  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      newTakeAwayRequestButtonClick: uiContext.newTakeAwayRequestButtonClick,
      openDeleteTakeAwayRequestsDialog: uiContext.openDeleteTakeAwayRequestsDialog,
      openEditTakeAwayRequestPage: uiContext.openEditTakeAwayRequestPage,
      openUpdateTakeAwayRequestsStatusDialog: uiContext.openUpdateTakeAwayRequestsStatusDialog,
      openFetchTakeAwayRequestsDialog: uiContext.openFetchTakeAwayRequestsDialog,
    };
  }, [uiContext]);

  // const newQueryParams = { ...uiProps.queryParams };
  // useEffect(() => {
  //   if (!!toDate && newQueryParams.Filters.length)
  //     newQueryParams.Filters = newQueryParams.Filters.map((x) => {
  //       if (x.Property == toDate.Property) return toDate;
  //       else return x;
  //     });
  //   else if (!!toDate && newQueryParams.Filters.length == 0)
  //     newQueryParams.Filters.push(toDate);

  //   newQueryParams.PageNumber = 1;

  //   uiProps.setQueryParams(newQueryParams);
  // }, [toDate]);

  return (
    <Card>
      <CardHeader>
        <div className="card-title">
          <h3 className="card-label">
            {t("Common.List") + " " + t("TakeAwayRequest.Entity")}
            {/* <Form.Check
              type="switch"
              id="custom-switch"
              label="نمایش لیست فعال"
              defaultChecked={true}
              className="ml-5 d-inline-block opacity-90"
              style={{ fontSize: "0.9rem" }}
              onChange={(val) =>
                setToDate({
                  ...toDate,
                  Operation: val.target.checked ? 4 : 1,
                })
              }
            /> */}
          </h3>
        </div>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary mr-1"
            onClick={()=> uiProps.newTakeAwayRequestButtonClick(1)}
          >
            <i className="far fa-plus"></i> {t("SellDocument.Order")}
          </button>
          <button
            type="button"
            className="btn btn-primary mr-1"
            onClick={()=> uiProps.newTakeAwayRequestButtonClick(2)}
          >
            <i className="far fa-plus"></i> {t("RestaurantInvoice.Order")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TakeAwayRequestsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </TakeAwayRequestsUIConsumer>
        <TakeAwayRequestsTable />
      </CardBody>
    </Card>
  );
}