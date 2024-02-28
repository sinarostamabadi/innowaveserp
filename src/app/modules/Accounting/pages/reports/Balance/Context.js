import { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MoneyColumnFormatter } from "src/core/_formatters";
import { BalanceModel } from "src/core/_models/Report/BalanceModel";
import { GetBalanceReport } from "../../../_api/Balance";

const BalanceContext = createContext();
export const useBalanceContext = () => useContext(BalanceContext);
export const BalanceConsumer = BalanceContext.Consumer;

export function BalanceProvider({ events, children, col }) {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [readyToPrint, setReadyToPrint] = useState(false);
  const [filters, setFilters] = useState(null);
  const [steps, setSteps] = useState([]);
  const [levelColumns, setLevelColumns] = useState([]);

  const value = {
    items,
    filters,
    setFilters,
    dataModel: BalanceModel,
    gotoEditBuy: events.gotoEditBuy,
    readyToPrint: readyToPrint,
    col: col,
    levelColumns,
    steps,
    setSteps,
  };

  const search = () => {
    GetBalanceReport(filters).then(({ data }) => {
      setItems(data.Items);
      setReadyToPrint(true);
    });
  };

  useEffect(() => {
    if (col.id == 2)
      setLevelColumns([
        {
          dataField: "SumBed_Dore",
          text: t("Reports.Balance.SumBed_Dore"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "SumBes_Dore",
          text: t("Reports.Balance.SumBes_Dore"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
      ]);

    if (col.id == 4)
      setLevelColumns([
        {
          dataField: "SumBed",
          text: t("Reports.Balance.SumBed"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "SumBes",
          text: t("Reports.Balance.SumBes"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "MandeBed",
          text: t("Reports.Balance.MandeBed"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "MandeBes",
          text: t("Reports.Balance.MandeBes"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
      ]);

    if (col.id == 6)
      setLevelColumns([
        {
          dataField: "SumBed",
          text: t("Reports.Balance.SumBed"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "SumBes",
          text: t("Reports.Balance.SumBes"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "MandeBed",
          text: t("Reports.Balance.MandeBed"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "MandeBes",
          text: t("Reports.Balance.MandeBes"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "SumBed_TaDore",
          text: t("Reports.Balance.SumBed_TaDore"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "SumBes_TaDore",
          text: t("Reports.Balance.SumBes_TaDore"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
      ]);

    if (col.id == 8)
      setLevelColumns([
        {
          dataField: "SumBed",
          text: t("Reports.Balance.SumBed"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "SumBes",
          text: t("Reports.Balance.SumBes"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "MandeBed",
          text: t("Reports.Balance.MandeBed"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "MandeBes",
          text: t("Reports.Balance.MandeBes"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "SumBed_TaDore",
          text: t("Reports.Balance.SumBed_TaDore"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "SumBes_TaDore",
          text: t("Reports.Balance.SumBes_TaDore"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "MandeBed_TaDore",
          text: t("Reports.Balance.MandeBed_TaDore"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
        {
          dataField: "MandeBes_TaDore",
          text: t("Reports.Balance.MandeBes_TaDore"),
          sort: false,
          formatter: MoneyColumnFormatter,
        },
      ]);
  }, [col.id]);

  useEffect(() => {
    if (!!filters) search();
    else {
      setItems([]);
      setSteps([]);
    }
  }, [filters, col]);

  return (
    <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>
  );
}
