import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/brands/brandsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBrandsUIContext } from "../BrandsUIContext";
import { BrandModel } from "../../../../../../core/_models/Warehouse/BrandModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BrandsTable() {
  const { t } = useTranslation();

  const brandsUIContext = useBrandsUIContext();

  const brandsUIProps = useMemo(() => {
    return {
      ids: brandsUIContext.ids,
      setIds: brandsUIContext.setIds,
      queryParams: brandsUIContext.queryParams,
      setQueryParams: brandsUIContext.setQueryParams,
      openEditBrandPage: brandsUIContext.openEditBrandPage,
      openDeleteBrandDialog: brandsUIContext.openDeleteBrandDialog,
    };
  }, [brandsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.brands }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BrandModel);
  const fieldKey = getFields(BrandModel);
  const fields = BrandModel;

  const dispatch = useDispatch();
  useEffect(() => {
    brandsUIProps.setIds([]);
    dispatch(actions.fetchBrands(brandsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("Brand." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBrandPage: brandsUIProps.openEditBrandPage,
        openDeleteBrandDialog: brandsUIProps.openDeleteBrandDialog,
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
    sizePerPage: brandsUIProps.queryParams.PageSize,
    page: brandsUIProps.queryParams.PageNumber,
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
                  brandsUIProps.setQueryParams
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