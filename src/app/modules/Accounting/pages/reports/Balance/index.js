import { createRef } from "react";
import { useTranslation } from "react-i18next";
import { Filter } from "./Filter";
import { BalanceProvider } from "./Context";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { Table } from "./Table";
export function Balance({
  history,
  match: {
    params: { col },
  },
}) {
  const colName = {
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
  };
  const { t } = useTranslation();
  const events = {};
  const btnSearchRef = createRef("1");
  const searchClick = () => {
    if (btnSearchRef && btnSearchRef.current) {
      btnSearchRef.current.Search();
    }
  };

  return (
    <BalanceProvider events={events} col={{ id: col, name: colName[col] }}>
      <Card>
        <CardHeader
          title={
            t("Common.Report") +
            " " +
            t("Reports.Balance.Name", { 0: colName[col] })
          }
        >
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={searchClick}
            >
              <i class="fas fa-search"></i> {t("Common.Search")}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Filter ref={btnSearchRef} />
          <Table />
        </CardBody>
      </Card>
    </BalanceProvider>
  );
}
