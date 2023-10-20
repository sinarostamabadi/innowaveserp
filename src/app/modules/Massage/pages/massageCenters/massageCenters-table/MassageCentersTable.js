import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/massageCenters/massageCentersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMassageCentersUIContext } from "../MassageCentersUIContext";
import { MassageCenterModel } from "../../../../../../core/_models/Massage/MassageCenterModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MassageCentersTable() {
  const { t } = useTranslation();

  const massageCentersUIContext = useMassageCentersUIContext();

  const massageCentersUIProps = useMemo(() => {
    return {
      ids: massageCentersUIContext.ids,
      setIds: massageCentersUIContext.setIds,
      queryParams: massageCentersUIContext.queryParams,
      setQueryParams: massageCentersUIContext.setQueryParams,
      openEditMassageCenterPage: massageCentersUIContext.openEditMassageCenterPage,
      openDeleteMassageCenterDialog: massageCentersUIContext.openDeleteMassageCenterDialog,
    };
  }, [massageCentersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.massageCenters }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MassageCenterModel);
  const fieldKey = getFields(MassageCenterModel);
  const fields = MassageCenterModel;

  const dispatch = useDispatch();
  useEffect(() => {
    massageCentersUIProps.setIds([]);
    dispatch(actions.fetchMassageCenters(massageCentersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [massageCentersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MassageCenter." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MassageCenter." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMassageCenterPage: massageCentersUIProps.openEditMassageCenterPage,
        openDeleteMassageCenterDialog: massageCentersUIProps.openDeleteMassageCenterDialog,
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
    sizePerPage: massageCentersUIProps.queryParams.PageSize,
    page: massageCentersUIProps.queryParams.PageNumber,
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
                  massageCentersUIProps.setQueryParams
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