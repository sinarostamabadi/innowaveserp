import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/productUnits/productUnitsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useProductUnitsUIContext } from "../ProductUnitsUIContext";
import { ProductUnitModel } from "../../../../../../core/_models/Warehouse/ProductUnitModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ProductUnitsTable() {
  const { t } = useTranslation();

  const productUnitsUIContext = useProductUnitsUIContext();

  const productUnitsUIProps = useMemo(() => {
    return {
      ids: productUnitsUIContext.ids,
      setIds: productUnitsUIContext.setIds,
      queryParams: productUnitsUIContext.queryParams,
      setQueryParams: productUnitsUIContext.setQueryParams,
      openEditProductUnitPage: productUnitsUIContext.openEditProductUnitPage,
      openDeleteProductUnitDialog: productUnitsUIContext.openDeleteProductUnitDialog,
    };
  }, [productUnitsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.productUnits }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ProductUnitModel);
  const fieldKey = getFields(ProductUnitModel);
  const fields = ProductUnitModel;

  const dispatch = useDispatch();
  useEffect(() => {
    productUnitsUIProps.setIds([]);
    dispatch(actions.fetchProductUnits(productUnitsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productUnitsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ProductUnit." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ProductUnit." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditProductUnitPage: productUnitsUIProps.openEditProductUnitPage,
        openDeleteProductUnitDialog: productUnitsUIProps.openDeleteProductUnitDialog,
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
    sizePerPage: productUnitsUIProps.queryParams.PageSize,
    page: productUnitsUIProps.queryParams.PageNumber,
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
                  productUnitsUIProps.setQueryParams
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