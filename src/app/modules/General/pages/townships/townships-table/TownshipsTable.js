import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/townships/townshipsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useTownshipsUIContext } from "../TownshipsUIContext";
import { TownshipModel } from "../../../../../../core/_models/General/TownshipModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function TownshipsTable() {
  const { t } = useTranslation();

  const townshipsUIContext = useTownshipsUIContext();

  const townshipsUIProps = useMemo(() => {
    return {
      ids: townshipsUIContext.ids,
      setIds: townshipsUIContext.setIds,
      queryParams: townshipsUIContext.queryParams,
      setQueryParams: townshipsUIContext.setQueryParams,
      openEditTownshipPage: townshipsUIContext.openEditTownshipPage,
      openDeleteTownshipDialog: townshipsUIContext.openDeleteTownshipDialog,
    };
  }, [townshipsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.townships }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(TownshipModel);
  const fieldKey = getFields(TownshipModel);
  const fields = TownshipModel;

  const dispatch = useDispatch();
  useEffect(() => {
    townshipsUIProps.setIds([]);
    dispatch(actions.fetchTownships(townshipsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [townshipsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Township." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Township." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditTownshipPage: townshipsUIProps.openEditTownshipPage,
        openDeleteTownshipDialog: townshipsUIProps.openDeleteTownshipDialog,
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
    sizePerPage: townshipsUIProps.queryParams.PageSize,
    page: townshipsUIProps.queryParams.PageNumber,
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
                  townshipsUIProps.setQueryParams
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