import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/massageTypes/massageTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMassageTypesUIContext } from "../MassageTypesUIContext";
import { MassageTypeModel } from "../../../../../../core/_models/Massage/MassageTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MassageTypesTable() {
  const { t } = useTranslation();

  const massageTypesUIContext = useMassageTypesUIContext();

  const massageTypesUIProps = useMemo(() => {
    return {
      ids: massageTypesUIContext.ids,
      setIds: massageTypesUIContext.setIds,
      queryParams: massageTypesUIContext.queryParams,
      setQueryParams: massageTypesUIContext.setQueryParams,
      openEditMassageTypePage: massageTypesUIContext.openEditMassageTypePage,
      openDeleteMassageTypeDialog:
        massageTypesUIContext.openDeleteMassageTypeDialog,
    };
  }, [massageTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.massageTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MassageTypeModel);
  const fieldKey = getFields(MassageTypeModel);
  const fields = MassageTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    massageTypesUIProps.setIds([]);
    dispatch(actions.fetchMassageTypes(massageTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [massageTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MassageType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MassageType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMassageTypePage: massageTypesUIProps.openEditMassageTypePage,
        openDeleteMassageTypeDialog:
          massageTypesUIProps.openDeleteMassageTypeDialog,
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
    sizePerPage: massageTypesUIProps.queryParams.PageSize,
    page: massageTypesUIProps.queryParams.PageNumber,
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
                  massageTypesUIProps.setQueryParams
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
