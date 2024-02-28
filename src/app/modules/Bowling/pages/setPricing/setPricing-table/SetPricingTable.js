import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/setPricing/setPricingActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSetPricingUIContext } from "../SetPricingUIContext";
import { SetPricingModel } from "../../../../../../core/_models/Bowling/SetPricingModel";

import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { DateFaColumnFormatter } from "../../../../../../core/_formatters";
export function SetPricingTable() {
  const { t } = useTranslation();
  const setPricingUIContext = useSetPricingUIContext();
  const setPricingUIProps = useMemo(() => {
    return {
      ids: setPricingUIContext.ids,
      setIds: setPricingUIContext.setIds,
      queryParams: setPricingUIContext.queryParams,
      setQueryParams: setPricingUIContext.setQueryParams,
      openEditSetPricingPage: setPricingUIContext.openEditSetPricingPage,
      openDeleteSetPricingDialog:
        setPricingUIContext.openDeleteSetPricingDialog,
    };
  }, [setPricingUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.setPricings }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SetPricingModel);
  const fieldKey = getFields(SetPricingModel);
  const fields = SetPricingModel;
  const dispatch = useDispatch();
  useEffect(() => {
    setPricingUIProps.setIds([]);
    dispatch(actions.fetchSetPricings(setPricingUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPricingUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: "Center.Title",
      text: t("SetPricing.Title"),
      /* sort: fields.CenterId.sortable,
      sortCaret: sortCaret, */
    },
    /*  {
      dataField: fieldKey.SetPricingId,
      text: t("SetPricing." + fields.SetPricingId.display),
      sort: fields.SetPricingId.sortable,
      sortCaret: sortCaret,
    }, */
    {
      dataField: fieldKey.FromDate,
      text: t("SetPricing." + fields.FromDate.display),
      sort: fields.FromDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.ToDate,
      text: t("SetPricing." + fields.ToDate.display),
      sort: fields.ToDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.DayInWeek,
      text: t("SetPricing." + fields.DayInWeek.display),
      sort: fields.DayInWeek.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Price,
      text: t("SetPricing." + fields.Price.display),
      sort: fields.Price.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.PersonCount,
      text: t("SetPricing." + fields.PersonCount.display),
      sort: fields.PersonCount.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSetPricingPage: setPricingUIProps.openEditSetPricingPage,
        openDeleteSetPricingDialog:
          setPricingUIProps.openDeleteSetPricingDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: setPricingUIProps.queryParams.PageSize,
    page: setPricingUIProps.queryParams.PageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                bordered={false}
                remote
                keyField={configs.id}
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={configs.defaultSorted}
                onTableChange={getHandlerTableChange(
                  setPricingUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
