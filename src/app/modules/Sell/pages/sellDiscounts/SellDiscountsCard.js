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
import { SellDiscountsTable } from "./sellDiscounts-table/SellDiscountsTable";
import { useSellDiscountsUIContext, SellDiscountsUIConsumer } from "./SellDiscountsUIContext";
import moment from "jalali-moment";

export function SellDiscountsCard() {
  const { t } = useTranslation();
  const [toDate, setToDate] = useState({
    Property: "ToDate",
    Operation: 4,
    Values: [moment.from().format("YYYY-MM-DDTHH:mm:ss")],
  });

  const uiContext = useSellDiscountsUIContext();

  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      newSellDiscountButtonClick: uiContext.newSellDiscountButtonClick,
      openDeleteSellDiscountsDialog: uiContext.openDeleteSellDiscountsDialog,
      openEditSellDiscountPage: uiContext.openEditSellDiscountPage,
      openUpdateSellDiscountsStatusDialog: uiContext.openUpdateSellDiscountsStatusDialog,
      openFetchSellDiscountsDialog: uiContext.openFetchSellDiscountsDialog,
    };
  }, [uiContext]);

  const newQueryParams = { ...uiProps.queryParams };
  useEffect(() => {
    if (!!toDate && newQueryParams.Filters.length)
      newQueryParams.Filters = newQueryParams.Filters.map((x) => {
        if (x.Property == toDate.Property) return toDate;
        else return x;
      });
    else if (!!toDate && newQueryParams.Filters.length == 0)
      newQueryParams.Filters.push(toDate);

    newQueryParams.PageNumber = 1;

    uiProps.setQueryParams(newQueryParams);
  }, [toDate]);

  return (
    <Card>
      <CardHeader>
        <div className="card-title">
          <h3 className="card-label">
            {t("Common.List") + " " + t("SellDiscount.Entity")}
            <Form.Check
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
            />
          </h3>
        </div>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary mr-1"
            onClick={()=> uiProps.newSellDiscountButtonClick(1)}
          >
            {t("Common.New")} {'('}{t("Common.Factor")}{')'}
          </button>
          <button
            type="button"
            className="btn btn-primary mr-1"
            onClick={()=> uiProps.newSellDiscountButtonClick(2)}
          >
            {t("Common.New")} {'('}{t("Common.Product")}{')'}
          </button>
          <button
            type="button"
            className="btn btn-primary mr-1"
            onClick={()=> uiProps.newSellDiscountButtonClick(3)}
          >
            {t("Common.New")} {'('}{t("Common.Percent")}{')'}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SellDiscountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SellDiscountsUIConsumer>
        <SellDiscountsTable />
      </CardBody>
    </Card>
  );
}