import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coupons/couponsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useCouponsUIContext } from "../CouponsUIContext";
import { CouponModel } from "src/core/_models/Cash/CouponModel";
import {
  getConfig,
  getFields,
} from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { CheckBoxFormatter } from "src/core/_formatters";

export function CouponsTable() {
  const { t } = useTranslation();

  const couponsUIContext = useCouponsUIContext();

  const couponsUIProps = useMemo(() => {
    return {
      ids: couponsUIContext.ids,
      setIds: couponsUIContext.setIds,
      queryParams: couponsUIContext.queryParams,
      setQueryParams: couponsUIContext.setQueryParams,
      openEditCouponPage: couponsUIContext.openEditCouponPage,
      openDeleteCouponDialog: couponsUIContext.openDeleteCouponDialog,
    };
  }, [couponsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.coupons }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CouponModel);
  const fieldKey = getFields(CouponModel);
  const fields = CouponModel;

  const dispatch = useDispatch();
  useEffect(() => {
    couponsUIProps.setIds([]);
    dispatch(actions.fetchCoupons(couponsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.CouponNumber,
      text: t("Coupon." + fields.CouponNumber.display),
      sort: fields.CouponNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Price,
      text: t("Coupon." + fields.Price.display),
      sort: fields.Price.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.IsUsed,
      text: t("Coupon." + fields.IsUsed.display),
      sort: fields.IsUsed.sortable,
      sortCaret: sortCaret,
      formatter: CheckBoxFormatter,
      formatExtraData: {
        t: t,
        positive: t("Common.Yes"),
        negetive: t("Common.No")
      }
    },
    {
      dataField: fieldKey.UseLocation.Title,
      text: t("Coupon.UseLocation"),
      sort: fields.UseLocationId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCouponPage: couponsUIProps.openEditCouponPage,
        openDeleteCouponDialog: couponsUIProps.openDeleteCouponDialog,
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
    sizePerPage: couponsUIProps.queryParams.PageSize,
    page: couponsUIProps.queryParams.PageNumber,
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
                  couponsUIProps.setQueryParams
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