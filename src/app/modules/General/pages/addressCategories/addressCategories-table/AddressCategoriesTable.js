
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/addressCategories/addressCategoriesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useAddressCategoriesUIContext } from "../AddressCategoriesUIContext";
import { AddressCategoryModel } from "../../../../../../core/_models/General/AddressCategoryModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function AddressCategoriesTable() {
  const { t } = useTranslation();

  const addressCategoriesUIContext = useAddressCategoriesUIContext();

  const addressCategoriesUIProps = useMemo(() => {
    return {
      ids: addressCategoriesUIContext.ids,
      setIds: addressCategoriesUIContext.setIds,
      queryParams: addressCategoriesUIContext.queryParams,
      setQueryParams: addressCategoriesUIContext.setQueryParams,
      openEditAddressCategoryPage: addressCategoriesUIContext.openEditAddressCategoryPage,
      openDeleteAddressCategoryDialog: addressCategoriesUIContext.openDeleteAddressCategoryDialog,
    };
  }, [addressCategoriesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.addressCategories }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(AddressCategoryModel);
  const fieldKey = getFields(AddressCategoryModel);
  const fields = AddressCategoryModel;

  const dispatch = useDispatch();
  useEffect(() => {
    addressCategoriesUIProps.setIds([]);
    dispatch(actions.fetchAddressCategories(addressCategoriesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressCategoriesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("AddressCategory." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAddressCategoryPage: addressCategoriesUIProps.openEditAddressCategoryPage,
        openDeleteAddressCategoryDialog: addressCategoriesUIProps.openDeleteAddressCategoryDialog,
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
    sizePerPage: addressCategoriesUIProps.queryParams.PageSize,
    page: addressCategoriesUIProps.queryParams.PageNumber,
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
                  addressCategoriesUIProps.setQueryParams
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
