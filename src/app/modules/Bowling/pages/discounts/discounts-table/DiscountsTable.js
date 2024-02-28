import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/discounts/discountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useDiscountsUIContext } from "../DiscountsUIContext";
import { DiscountModel } from "../../../../../../core/_models/Bowling/DiscountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import {
  DateFaColumnFormatter,
  TimeColumnFormatter,
} from "../../../../../../core/_formatters";

export function DiscountsTable() {
  const { t } = useTranslation();

  const discountsUIContext = useDiscountsUIContext();

  const discountsUIProps = useMemo(() => {
    return {
      ids: discountsUIContext.ids,
      setIds: discountsUIContext.setIds,
      queryParams: discountsUIContext.queryParams,
      setQueryParams: discountsUIContext.setQueryParams,
      openEditDiscountPage: discountsUIContext.openEditDiscountPage,
      openDeleteDiscountDialog: discountsUIContext.openDeleteDiscountDialog,
    };
  }, [discountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.discounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(DiscountModel);
  const fieldKey = getFields(DiscountModel);
  const fields = DiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    discountsUIProps.setIds([]);
    dispatch(actions.fetchDiscounts(discountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: "DiscountType.TitleFa",
      text: t("Discount.DiscountType"),
      sort: fields.DiscountTypeId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Discount,
      text: t("Discount.Discount"),
      sort: fields.Discount.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Person.FullNameFa",
      text: t("Discount.Person"),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.FromDate,
      text: t("Discount." + fields.FromDate.display),
      sort: fields.FromDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.ToDate,
      text: t("Discount." + fields.ToDate.display),
      sort: fields.ToDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.FromTime,
      text: t("Discount." + fields.FromTime.display),
      sort: fields.FromTime.sortable,
      sortCaret: sortCaret,
      formatter: TimeColumnFormatter,
    },
    {
      dataField: fieldKey.ToTime,
      text: t("Discount." + fields.ToTime.display),
      sort: fields.ToTime.sortable,
      sortCaret: sortCaret,
      formatter: TimeColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDiscountPage: discountsUIProps.openEditDiscountPage,
        openDeleteDiscountDialog: discountsUIProps.openDeleteDiscountDialog,
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
    sizePerPage: discountsUIProps.queryParams.PageSize,
    page: discountsUIProps.queryParams.PageNumber,
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
                  discountsUIProps.setQueryParams
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
