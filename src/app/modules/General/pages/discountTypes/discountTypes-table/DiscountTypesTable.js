import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/discountTypes/discountTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useDiscountTypesUIContext } from "../DiscountTypesUIContext";
import { DiscountTypeModel } from "../../../../../../core/_models/General/DiscountTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function DiscountTypesTable() {
  const { t } = useTranslation();

  const discountTypesUIContext = useDiscountTypesUIContext();

  const discountTypesUIProps = useMemo(() => {
    return {
      ids: discountTypesUIContext.ids,
      setIds: discountTypesUIContext.setIds,
      queryParams: discountTypesUIContext.queryParams,
      setQueryParams: discountTypesUIContext.setQueryParams,
      openEditDiscountTypePage: discountTypesUIContext.openEditDiscountTypePage,
      openDeleteDiscountTypeDialog:
        discountTypesUIContext.openDeleteDiscountTypeDialog,
    };
  }, [discountTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.discountTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(DiscountTypeModel);
  const fieldKey = getFields(DiscountTypeModel);
  const fields = DiscountTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    discountTypesUIProps.setIds([]);
    dispatch(actions.fetchDiscountTypes(discountTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("DiscountType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("DiscountType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDiscountTypePage: discountTypesUIProps.openEditDiscountTypePage,
        openDeleteDiscountTypeDialog:
          discountTypesUIProps.openDeleteDiscountTypeDialog,
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
    sizePerPage: discountTypesUIProps.queryParams.PageSize,
    page: discountTypesUIProps.queryParams.PageNumber,
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
                  discountTypesUIProps.setQueryParams
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
