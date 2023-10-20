import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/futsalDiscounts/futsalDiscountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useFutsalDiscountsUIContext } from "../FutsalDiscountsUIContext";
import { FutsalDiscountModel } from "../../../../../../core/_models/Futsal/FutsalDiscountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function FutsalDiscountsTable() {
  const { t } = useTranslation();

  const futsalDiscountsUIContext = useFutsalDiscountsUIContext();

  const futsalDiscountsUIProps = useMemo(() => {
    return {
      ids: futsalDiscountsUIContext.ids,
      setIds: futsalDiscountsUIContext.setIds,
      queryParams: futsalDiscountsUIContext.queryParams,
      setQueryParams: futsalDiscountsUIContext.setQueryParams,
      openEditFutsalDiscountPage: futsalDiscountsUIContext.openEditFutsalDiscountPage,
      openDeleteFutsalDiscountDialog: futsalDiscountsUIContext.openDeleteFutsalDiscountDialog,
    };
  }, [futsalDiscountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.futsalDiscounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(FutsalDiscountModel);
  const fieldKey = getFields(FutsalDiscountModel);
  const fields = FutsalDiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    futsalDiscountsUIProps.setIds([]);
    dispatch(actions.fetchFutsalDiscounts(futsalDiscountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [futsalDiscountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("FutsalDiscount." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("FutsalDiscount." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditFutsalDiscountPage: futsalDiscountsUIProps.openEditFutsalDiscountPage,
        openDeleteFutsalDiscountDialog: futsalDiscountsUIProps.openDeleteFutsalDiscountDialog,
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
    sizePerPage: futsalDiscountsUIProps.queryParams.PageSize,
    page: futsalDiscountsUIProps.queryParams.PageNumber,
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
                  futsalDiscountsUIProps.setQueryParams
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