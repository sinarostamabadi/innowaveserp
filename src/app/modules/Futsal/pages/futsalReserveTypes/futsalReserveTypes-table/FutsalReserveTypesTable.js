import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/futsalReserveTypes/futsalReserveTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useFutsalReserveTypesUIContext } from "../FutsalReserveTypesUIContext";
import { FutsalReserveTypeModel } from "../../../../../../core/_models/Futsal/FutsalReserveTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function FutsalReserveTypesTable() {
  const { t } = useTranslation();

  const futsalReserveTypesUIContext = useFutsalReserveTypesUIContext();

  const futsalReserveTypesUIProps = useMemo(() => {
    return {
      ids: futsalReserveTypesUIContext.ids,
      setIds: futsalReserveTypesUIContext.setIds,
      queryParams: futsalReserveTypesUIContext.queryParams,
      setQueryParams: futsalReserveTypesUIContext.setQueryParams,
      openEditFutsalReserveTypePage: futsalReserveTypesUIContext.openEditFutsalReserveTypePage,
      openDeleteFutsalReserveTypeDialog: futsalReserveTypesUIContext.openDeleteFutsalReserveTypeDialog,
    };
  }, [futsalReserveTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.futsalReserveTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(FutsalReserveTypeModel);
  const fieldKey = getFields(FutsalReserveTypeModel);
  const fields = FutsalReserveTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    futsalReserveTypesUIProps.setIds([]);
    dispatch(actions.fetchFutsalReserveTypes(futsalReserveTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [futsalReserveTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("FutsalReserveType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("FutsalReserveType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditFutsalReserveTypePage: futsalReserveTypesUIProps.openEditFutsalReserveTypePage,
        openDeleteFutsalReserveTypeDialog: futsalReserveTypesUIProps.openDeleteFutsalReserveTypeDialog,
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
    sizePerPage: futsalReserveTypesUIProps.queryParams.PageSize,
    page: futsalReserveTypesUIProps.queryParams.PageNumber,
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
                  futsalReserveTypesUIProps.setQueryParams
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