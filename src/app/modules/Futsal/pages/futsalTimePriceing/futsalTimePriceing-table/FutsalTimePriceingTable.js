import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/futsalTimePriceing/futsalTimePriceingActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useFutsalTimePriceingUIContext } from "../FutsalTimePriceingUIContext";
import { FutsalTimePriceingModel } from "../../../../../../core/_models/Futsal/FutsalTimePriceingModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function FutsalTimePriceingTable() {
  const { t } = useTranslation();

  const futsalTimePriceingUIContext = useFutsalTimePriceingUIContext();

  const futsalTimePriceingUIProps = useMemo(() => {
    return {
      ids: futsalTimePriceingUIContext.ids,
      setIds: futsalTimePriceingUIContext.setIds,
      queryParams: futsalTimePriceingUIContext.queryParams,
      setQueryParams: futsalTimePriceingUIContext.setQueryParams,
      openEditFutsalTimePriceingPage: futsalTimePriceingUIContext.openEditFutsalTimePriceingPage,
      openDeleteFutsalTimePriceingDialog: futsalTimePriceingUIContext.openDeleteFutsalTimePriceingDialog,
    };
  }, [futsalTimePriceingUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.futsalTimePriceing }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(FutsalTimePriceingModel);
  const fieldKey = getFields(FutsalTimePriceingModel);
  const fields = FutsalTimePriceingModel;

  const dispatch = useDispatch();
  useEffect(() => {
    futsalTimePriceingUIProps.setIds([]);
    dispatch(actions.fetchFutsalTimePriceing(futsalTimePriceingUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [futsalTimePriceingUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("FutsalTimePriceing." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("FutsalTimePriceing." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditFutsalTimePriceingPage: futsalTimePriceingUIProps.openEditFutsalTimePriceingPage,
        openDeleteFutsalTimePriceingDialog: futsalTimePriceingUIProps.openDeleteFutsalTimePriceingDialog,
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
    sizePerPage: futsalTimePriceingUIProps.queryParams.PageSize,
    page: futsalTimePriceingUIProps.queryParams.PageNumber,
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
                  futsalTimePriceingUIProps.setQueryParams
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