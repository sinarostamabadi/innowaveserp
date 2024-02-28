import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/placeOfPreparations/placeOfPreparationsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePlaceOfPreparationsUIContext } from "../PlaceOfPreparationsUIContext";
import { PlaceOfPreparationModel } from "../../../../../../core/_models//PlaceOfPreparationModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PlaceOfPreparationsTable() {
  const { t } = useTranslation();

  const placeOfPreparationsUIContext = usePlaceOfPreparationsUIContext();

  const placeOfPreparationsUIProps = useMemo(() => {
    return {
      ids: placeOfPreparationsUIContext.ids,
      setIds: placeOfPreparationsUIContext.setIds,
      queryParams: placeOfPreparationsUIContext.queryParams,
      setQueryParams: placeOfPreparationsUIContext.setQueryParams,
      openEditPlaceOfPreparationPage:
        placeOfPreparationsUIContext.openEditPlaceOfPreparationPage,
      openDeletePlaceOfPreparationDialog:
        placeOfPreparationsUIContext.openDeletePlaceOfPreparationDialog,
    };
  }, [placeOfPreparationsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.placeOfPreparations }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PlaceOfPreparationModel);
  const fieldKey = getFields(PlaceOfPreparationModel);
  const fields = PlaceOfPreparationModel;

  const dispatch = useDispatch();
  useEffect(() => {
    placeOfPreparationsUIProps.setIds([]);
    dispatch(
      actions.fetchPlaceOfPreparations(placeOfPreparationsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeOfPreparationsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("PlaceOfPreparation." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("PlaceOfPreparation." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPlaceOfPreparationPage:
          placeOfPreparationsUIProps.openEditPlaceOfPreparationPage,
        openDeletePlaceOfPreparationDialog:
          placeOfPreparationsUIProps.openDeletePlaceOfPreparationDialog,
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
    sizePerPage: placeOfPreparationsUIProps.queryParams.PageSize,
    page: placeOfPreparationsUIProps.queryParams.PageNumber,
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
                  placeOfPreparationsUIProps.setQueryParams
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
