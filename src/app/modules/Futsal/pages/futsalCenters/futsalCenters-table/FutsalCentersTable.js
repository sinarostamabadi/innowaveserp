import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/futsalCenters/futsalCentersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useFutsalCentersUIContext } from "../FutsalCentersUIContext";
import { FutsalCenterModel } from "../../../../../../core/_models/Futsal/FutsalCenterModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function FutsalCentersTable() {
  const { t } = useTranslation();

  const futsalCentersUIContext = useFutsalCentersUIContext();

  const futsalCentersUIProps = useMemo(() => {
    return {
      ids: futsalCentersUIContext.ids,
      setIds: futsalCentersUIContext.setIds,
      queryParams: futsalCentersUIContext.queryParams,
      setQueryParams: futsalCentersUIContext.setQueryParams,
      openEditFutsalCenterPage: futsalCentersUIContext.openEditFutsalCenterPage,
      openDeleteFutsalCenterDialog:
        futsalCentersUIContext.openDeleteFutsalCenterDialog,
    };
  }, [futsalCentersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.futsalCenters }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(FutsalCenterModel);
  const fieldKey = getFields(FutsalCenterModel);
  const fields = FutsalCenterModel;

  const dispatch = useDispatch();
  useEffect(() => {
    futsalCentersUIProps.setIds([]);
    dispatch(actions.fetchFutsalCenters(futsalCentersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [futsalCentersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("FutsalCenter." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("FutsalCenter." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditFutsalCenterPage: futsalCentersUIProps.openEditFutsalCenterPage,
        openDeleteFutsalCenterDialog:
          futsalCentersUIProps.openDeleteFutsalCenterDialog,
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
    sizePerPage: futsalCentersUIProps.queryParams.PageSize,
    page: futsalCentersUIProps.queryParams.PageNumber,
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
                  futsalCentersUIProps.setQueryParams
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
