import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/soldiershipTypes/soldiershipTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSoldiershipTypesUIContext } from "../SoldiershipTypesUIContext";
import { SoldiershipTypeModel } from "../../../../../../core/_models/Employment/SoldiershipTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SoldiershipTypesTable() {
  const { t } = useTranslation();

  const soldiershipTypesUIContext = useSoldiershipTypesUIContext();

  const soldiershipTypesUIProps = useMemo(() => {
    return {
      ids: soldiershipTypesUIContext.ids,
      setIds: soldiershipTypesUIContext.setIds,
      queryParams: soldiershipTypesUIContext.queryParams,
      setQueryParams: soldiershipTypesUIContext.setQueryParams,
      openEditSoldiershipTypePage:
        soldiershipTypesUIContext.openEditSoldiershipTypePage,
      openDeleteSoldiershipTypeDialog:
        soldiershipTypesUIContext.openDeleteSoldiershipTypeDialog,
    };
  }, [soldiershipTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.soldiershipTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SoldiershipTypeModel);
  const fieldKey = getFields(SoldiershipTypeModel);
  const fields = SoldiershipTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    soldiershipTypesUIProps.setIds([]);
    dispatch(
      actions.fetchSoldiershipTypes(soldiershipTypesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soldiershipTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("SoldiershipType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("SoldiershipType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSoldiershipTypePage:
          soldiershipTypesUIProps.openEditSoldiershipTypePage,
        openDeleteSoldiershipTypeDialog:
          soldiershipTypesUIProps.openDeleteSoldiershipTypeDialog,
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
    sizePerPage: soldiershipTypesUIProps.queryParams.PageSize,
    page: soldiershipTypesUIProps.queryParams.PageNumber,
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
                  soldiershipTypesUIProps.setQueryParams
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
