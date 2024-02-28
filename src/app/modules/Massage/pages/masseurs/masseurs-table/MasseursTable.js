import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/masseurs/masseursActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMasseursUIContext } from "../MasseursUIContext";
import { MasseurModel } from "../../../../../../core/_models/Massage/MasseurModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MasseursTable() {
  const { t } = useTranslation();

  const masseursUIContext = useMasseursUIContext();

  const masseursUIProps = useMemo(() => {
    return {
      ids: masseursUIContext.ids,
      setIds: masseursUIContext.setIds,
      queryParams: masseursUIContext.queryParams,
      setQueryParams: masseursUIContext.setQueryParams,
      openEditMasseurPage: masseursUIContext.openEditMasseurPage,
      openDeleteMasseurDialog: masseursUIContext.openDeleteMasseurDialog,
    };
  }, [masseursUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.masseurs }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MasseurModel);
  const fieldKey = getFields(MasseurModel);
  const fields = MasseurModel;

  const dispatch = useDispatch();
  useEffect(() => {
    masseursUIProps.setIds([]);
    dispatch(actions.fetchMasseurs(masseursUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masseursUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Masseur." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Masseur." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMasseurPage: masseursUIProps.openEditMasseurPage,
        openDeleteMasseurDialog: masseursUIProps.openDeleteMasseurDialog,
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
    sizePerPage: masseursUIProps.queryParams.PageSize,
    page: masseursUIProps.queryParams.PageNumber,
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
                  masseursUIProps.setQueryParams
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
