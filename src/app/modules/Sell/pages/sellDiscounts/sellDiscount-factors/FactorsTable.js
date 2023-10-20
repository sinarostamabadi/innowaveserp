import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { Pagination } from "../../../../../../core/_partials/controls";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useFactorsUIContext } from "./FactorsUIContext";
import { useTranslation } from "react-i18next";

export function FactorsTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const factorsUIContext = useFactorsUIContext();
  const factorsUIProps = useMemo(() => {
    return {
      factors: factorsUIContext.factors,
      addFactor: factorsUIContext.addFactor,
      totalCount: factorsUIContext.totalCount,
      actionsLoading: factorsUIContext.actionsLoading,
      openEditFactorDialog: factorsUIContext.openEditFactorDialog,
      openDeleteFactorDialog: factorsUIContext.openDeleteFactorDialog,
      sellDiscountId: factorsUIContext.sellDiscountId,
      openNewFactorDialog: factorsUIContext.openNewFactorDialog,
    };
  }, [factorsUIContext]);

  const columns = [
    {
      dataField: "FactorNumber",
      text: t("SellDiscountFactor.FactorNumber"),
      sort: false,
    },
    {
      dataField: "DiscountPercent",
      text: t("SellDiscountFactor.DiscountPercent"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditFactorDialog: factorsUIProps.openEditFactorDialog,
        openDeleteFactorDialog: factorsUIProps.openDeleteFactorDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: factorsUIProps.totalCount,
    sizePerPageList: [
      { text: "10", value: 10 },
      { text: "50", value: 50 },
      { text: "100", value: 100 },
    ],
    sizePerPage: 50,
    page: 1,
  };
  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
        <div className="col text-left margin-bottom-10-mobile">
            <h4>{t("SellDiscountFactor.Entity")}</h4>
          </div>
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => factorsUIProps.openNewFactorDialog()}
            >
              {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center"
        bordered={false}
        bootstrap4
        remote
        keyField="SellDiscountFactorId"
        sort={false}
        data={factorsUIProps.factors === null ? [] : factorsUIProps.factors}
        columns={columns}
      >
        <PleaseWaitMessage entities={factorsUIProps.factors} />
        <NoRecordsFoundMessage entities={factorsUIProps.factors} />
      </BootstrapTable>

    </>
  );
}
