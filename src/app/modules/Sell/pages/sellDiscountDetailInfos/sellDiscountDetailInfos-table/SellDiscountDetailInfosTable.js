import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDiscountDetailInfos/sellDiscountDetailInfosActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSellDiscountDetailInfosUIContext } from "../SellDiscountDetailInfosUIContext";
import { SellDiscountDetailInfoModel } from "../../../../../../core/_models/Sell/SellDiscountDetailInfoModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SellDiscountDetailInfosTable() {
  const { t } = useTranslation();

  const sellDiscountDetailInfosUIContext = useSellDiscountDetailInfosUIContext();

  const sellDiscountDetailInfosUIProps = useMemo(() => {
    return {
      ids: sellDiscountDetailInfosUIContext.ids,
      setIds: sellDiscountDetailInfosUIContext.setIds,
      queryParams: sellDiscountDetailInfosUIContext.queryParams,
      setQueryParams: sellDiscountDetailInfosUIContext.setQueryParams,
      openEditSellDiscountDetailInfoPage: sellDiscountDetailInfosUIContext.openEditSellDiscountDetailInfoPage,
      openDeleteSellDiscountDetailInfoDialog: sellDiscountDetailInfosUIContext.openDeleteSellDiscountDetailInfoDialog,
    };
  }, [sellDiscountDetailInfosUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.sellDiscountDetailInfos }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SellDiscountDetailInfoModel);
  const fieldKey = getFields(SellDiscountDetailInfoModel);
  const fields = SellDiscountDetailInfoModel;

  const dispatch = useDispatch();
  useEffect(() => {
    sellDiscountDetailInfosUIProps.setIds([]);
    dispatch(actions.fetchSellDiscountDetailInfos(sellDiscountDetailInfosUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDiscountDetailInfosUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("SellDiscountDetailInfo." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("SellDiscountDetailInfo." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSellDiscountDetailInfoPage: sellDiscountDetailInfosUIProps.openEditSellDiscountDetailInfoPage,
        openDeleteSellDiscountDetailInfoDialog: sellDiscountDetailInfosUIProps.openDeleteSellDiscountDetailInfoDialog,
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
    sizePerPage: sellDiscountDetailInfosUIProps.queryParams.PageSize,
    page: sellDiscountDetailInfosUIProps.queryParams.PageNumber,
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
                  sellDiscountDetailInfosUIProps.setQueryParams
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