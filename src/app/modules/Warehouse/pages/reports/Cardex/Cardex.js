import React, { createRef } from "react";
import { useTranslation } from "react-i18next";
import { Filter } from "./Filter";
import { CardexProvider, CardexConsumer } from "./Context";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";

export function Cardex({ history }) {
  const { t } = useTranslation();

  const events = {};

  const btnSearchRef = createRef("1");
  const searchClick = () => {
    if (btnSearchRef && btnSearchRef.current) {
      btnSearchRef.current.Search();
    }
  };

  return (
    <CardexProvider events={events}>
      <Card>
        <CardHeader
          title={
            t("Common.Report") + " " + t("Reports.Cardex.Report")
          }
        >
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={searchClick}
            >
              <i class="fas fa-print"></i> {t("Common.Print")}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Filter ref={btnSearchRef} />
        </CardBody>
      </Card>
    </CardexProvider>
  );
}
