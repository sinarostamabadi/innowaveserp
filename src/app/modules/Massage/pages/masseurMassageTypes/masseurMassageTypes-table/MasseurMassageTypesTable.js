import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/masseurMassageTypes/masseurMassageTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMasseurMassageTypesUIContext } from "../MasseurMassageTypesUIContext";
import { MasseurMassageTypeModel } from "../../../../../../core/_models/Massage/MasseurMassageTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MasseurMassageTypesTable() {
  const { t } = useTranslation();

  const masseurMassageTypesUIContext = useMasseurMassageTypesUIContext();

  const masseurMassageTypesUIProps = useMemo(() => {
    return {
      ids: masseurMassageTypesUIContext.ids,
      setIds: masseurMassageTypesUIContext.setIds,
      queryParams: masseurMassageTypesUIContext.queryParams,
      setQueryParams: masseurMassageTypesUIContext.setQueryParams,
      openEditMasseurMassageTypePage:
        masseurMassageTypesUIContext.openEditMasseurMassageTypePage,
      openDeleteMasseurMassageTypeDialog:
        masseurMassageTypesUIContext.openDeleteMasseurMassageTypeDialog,
    };
  }, [masseurMassageTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.masseurMassageTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MasseurMassageTypeModel);
  const fieldKey = getFields(MasseurMassageTypeModel);
  const fields = MasseurMassageTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    masseurMassageTypesUIProps.setIds([]);
    dispatch(
      actions.fetchMasseurMassageTypes(masseurMassageTypesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masseurMassageTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MasseurMassageType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MasseurMassageType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMasseurMassageTypePage:
          masseurMassageTypesUIProps.openEditMasseurMassageTypePage,
        openDeleteMasseurMassageTypeDialog:
          masseurMassageTypesUIProps.openDeleteMasseurMassageTypeDialog,
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
    sizePerPage: masseurMassageTypesUIProps.queryParams.PageSize,
    page: masseurMassageTypesUIProps.queryParams.PageNumber,
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
                  masseurMassageTypesUIProps.setQueryParams
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
