import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/billiardDiscounts/billiardDiscountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBilliardDiscountsUIContext } from "../BilliardDiscountsUIContext";
import { BilliardDiscountModel } from "../../../../../../core/_models/Billiard/BilliardDiscountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BilliardDiscountsTable() {
  const { t } = useTranslation();

  const billiardDiscountsUIContext = useBilliardDiscountsUIContext();

  const billiardDiscountsUIProps = useMemo(() => {
    return {
      ids: billiardDiscountsUIContext.ids,
      setIds: billiardDiscountsUIContext.setIds,
      queryParams: billiardDiscountsUIContext.queryParams,
      setQueryParams: billiardDiscountsUIContext.setQueryParams,
      openEditBilliardDiscountPage:
        billiardDiscountsUIContext.openEditBilliardDiscountPage,
      openDeleteBilliardDiscountDialog:
        billiardDiscountsUIContext.openDeleteBilliardDiscountDialog,
    };
  }, [billiardDiscountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.billiardDiscounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BilliardDiscountModel);
  const fieldKey = getFields(BilliardDiscountModel);
  const fields = BilliardDiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    billiardDiscountsUIProps.setIds([]);
    dispatch(
      actions.fetchBilliardDiscounts(billiardDiscountsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billiardDiscountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BilliardDiscount." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BilliardDiscount." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBilliardDiscountPage:
          billiardDiscountsUIProps.openEditBilliardDiscountPage,
        openDeleteBilliardDiscountDialog:
          billiardDiscountsUIProps.openDeleteBilliardDiscountDialog,
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
    sizePerPage: billiardDiscountsUIProps.queryParams.PageSize,
    page: billiardDiscountsUIProps.queryParams.PageNumber,
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
                  billiardDiscountsUIProps.setQueryParams
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
