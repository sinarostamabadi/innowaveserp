import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/majors/majorsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMajorsUIContext } from "../MajorsUIContext";
import { MajorModel } from "../../../../../../core/_models/General/MajorModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MajorsTable() {
  const { t } = useTranslation();

  const majorsUIContext = useMajorsUIContext();

  const majorsUIProps = useMemo(() => {
    return {
      ids: majorsUIContext.ids,
      setIds: majorsUIContext.setIds,
      queryParams: majorsUIContext.queryParams,
      setQueryParams: majorsUIContext.setQueryParams,
      openEditMajorPage: majorsUIContext.openEditMajorPage,
      openDeleteMajorDialog: majorsUIContext.openDeleteMajorDialog,
    };
  }, [majorsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.majors }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MajorModel);
  const fieldKey = getFields(MajorModel);
  const fields = MajorModel;

  const dispatch = useDispatch();
  useEffect(() => {
    majorsUIProps.setIds([]);
    dispatch(actions.fetchMajors(majorsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [majorsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("Major." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.MajorBranch,
      text: t("Major." + fields.MajorBranch.display),
      sort: fields.MajorBranch.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMajorPage: majorsUIProps.openEditMajorPage,
        openDeleteMajorDialog: majorsUIProps.openDeleteMajorDialog,
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
    sizePerPage: majorsUIProps.queryParams.PageSize,
    page: majorsUIProps.queryParams.PageNumber,
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
                  majorsUIProps.setQueryParams
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
