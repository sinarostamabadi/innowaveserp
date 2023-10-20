import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/massageDiscounts/massageDiscountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMassageDiscountsUIContext } from "../MassageDiscountsUIContext";
import { MassageDiscountModel } from "../../../../../../core/_models/Massage/MassageDiscountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MassageDiscountsTable() {
  const { t } = useTranslation();

  const massageDiscountsUIContext = useMassageDiscountsUIContext();

  const massageDiscountsUIProps = useMemo(() => {
    return {
      ids: massageDiscountsUIContext.ids,
      setIds: massageDiscountsUIContext.setIds,
      queryParams: massageDiscountsUIContext.queryParams,
      setQueryParams: massageDiscountsUIContext.setQueryParams,
      openEditMassageDiscountPage: massageDiscountsUIContext.openEditMassageDiscountPage,
      openDeleteMassageDiscountDialog: massageDiscountsUIContext.openDeleteMassageDiscountDialog,
    };
  }, [massageDiscountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.massageDiscounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MassageDiscountModel);
  const fieldKey = getFields(MassageDiscountModel);
  const fields = MassageDiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    massageDiscountsUIProps.setIds([]);
    dispatch(actions.fetchMassageDiscounts(massageDiscountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [massageDiscountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MassageDiscount." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MassageDiscount." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMassageDiscountPage: massageDiscountsUIProps.openEditMassageDiscountPage,
        openDeleteMassageDiscountDialog: massageDiscountsUIProps.openDeleteMassageDiscountDialog,
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
    sizePerPage: massageDiscountsUIProps.queryParams.PageSize,
    page: massageDiscountsUIProps.queryParams.PageNumber,
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
                  massageDiscountsUIProps.setQueryParams
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