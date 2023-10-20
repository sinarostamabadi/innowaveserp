import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bodyBuildingDiscounts/bodyBuildingDiscountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBodyBuildingDiscountsUIContext } from "../BodyBuildingDiscountsUIContext";
import { BodyBuildingDiscountModel } from "../../../../../../core/_models/BodyBuilding/BodyBuildingDiscountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BodyBuildingDiscountsTable() {
  const { t } = useTranslation();

  const bodyBuildingDiscountsUIContext = useBodyBuildingDiscountsUIContext();

  const bodyBuildingDiscountsUIProps = useMemo(() => {
    return {
      ids: bodyBuildingDiscountsUIContext.ids,
      setIds: bodyBuildingDiscountsUIContext.setIds,
      queryParams: bodyBuildingDiscountsUIContext.queryParams,
      setQueryParams: bodyBuildingDiscountsUIContext.setQueryParams,
      openEditBodyBuildingDiscountPage: bodyBuildingDiscountsUIContext.openEditBodyBuildingDiscountPage,
      openDeleteBodyBuildingDiscountDialog: bodyBuildingDiscountsUIContext.openDeleteBodyBuildingDiscountDialog,
    };
  }, [bodyBuildingDiscountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bodyBuildingDiscounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingDiscountModel);
  const fieldKey = getFields(BodyBuildingDiscountModel);
  const fields = BodyBuildingDiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    bodyBuildingDiscountsUIProps.setIds([]);
    dispatch(actions.fetchBodyBuildingDiscounts(bodyBuildingDiscountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyBuildingDiscountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BodyBuildingDiscount." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BodyBuildingDiscount." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBodyBuildingDiscountPage: bodyBuildingDiscountsUIProps.openEditBodyBuildingDiscountPage,
        openDeleteBodyBuildingDiscountDialog: bodyBuildingDiscountsUIProps.openDeleteBodyBuildingDiscountDialog,
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
    sizePerPage: bodyBuildingDiscountsUIProps.queryParams.PageSize,
    page: bodyBuildingDiscountsUIProps.queryParams.PageNumber,
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
                  bodyBuildingDiscountsUIProps.setQueryParams
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