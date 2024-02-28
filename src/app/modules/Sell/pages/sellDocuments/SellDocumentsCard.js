import { useMemo, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Card, CardBody, CardHeader, CardHeaderToolbar } from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { SellDocumentsTable } from "./sellDocuments-table/SellDocumentsTable";
import { useSellDocumentsUIContext, SellDocumentsUIConsumer } from "./SellDocumentsUIContext";

export function SellDocumentsCard({ history }) {
  const { t } = useTranslation();
  const [isTemp, setIsTemp] = useState({
    Property: "IsTemp",
    Operation: 5,
    Values: ["true"],
  });

  const uiContext = useSellDocumentsUIContext();

  const uiProps = useMemo(() => {
    return {
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      newButtonClick: uiContext.newSellDocumentButtonClick,
    };
  }, [uiContext]);

  useEffect(() => {
    const newQueryParams = { ...uiProps.queryParams };

    if (!!isTemp && !!newQueryParams.Filters && newQueryParams.Filters.length)
      newQueryParams.Filters = newQueryParams.Filters.map((x) => {
        if (x.Property == isTemp.Property) return isTemp;
        else return x;
      });
    else if (!!isTemp && !!newQueryParams.Filters &&  newQueryParams.Filters.length == 0)
      newQueryParams.Filters.push(isTemp);

    newQueryParams.PageNumber = 1;

    uiProps.setQueryParams(newQueryParams);
  }, [isTemp]);

  return (
    <Card>
      <CardHeader>
        <div className="card-title">
          <h3 className="card-label">
            {t("Common.List") + " " + t("SellDocument.Entity")}
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Show temporary invoices"
              defaultChecked={true}
              className="ml-5 d-inline-block opacity-90"
              style={{ fontSize: "0.9rem" }}
              onChange={(val) =>
                setIsTemp({
                  ...isTemp,
                  Values: val.target.checked ? ["true"] : ["false"],
                })
              }
            />
          </h3>
        </div>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={uiProps.newButtonClick}
          >
            {t("SellDocument.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SellDocumentsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SellDocumentsUIConsumer>
        <SellDocumentsTable history={history}/>
      </CardBody>
    </Card>
  );
}
