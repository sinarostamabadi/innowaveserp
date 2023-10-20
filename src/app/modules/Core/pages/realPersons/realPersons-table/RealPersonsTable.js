import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/realPersons/realPersonsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRealPersonsUIContext } from "../RealPersonsUIContext";
import { RealPersonModel } from "../../../../../../core/_models/Core/RealPersonModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from 'react-i18next';
import { DateFaColumnFormatter } from "../../../../../../core/_formatters";

export default function RealPersonsTable() {
  const {t} = useTranslation();
  
  const realPersonsUIContext = useRealPersonsUIContext();
  const realPersonsUIProps = useMemo(() => {
    return {
      ids: realPersonsUIContext.ids,
      setIds: realPersonsUIContext.setIds,
      queryParams: realPersonsUIContext.queryParams,
      setQueryParams: realPersonsUIContext.setQueryParams,
      openEditRealPersonPage: realPersonsUIContext.openEditRealPersonPage,
      openDeleteRealPersonDialog:
        realPersonsUIContext.openDeleteRealPersonDialog,
    };
  }, [realPersonsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.realPersons }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const configs = getConfig(RealPersonModel);
  const fieldKey = getFields(RealPersonModel);
  const fields = RealPersonModel;

  const dispatch = useDispatch();
  useEffect(() => {
    realPersonsUIProps.setIds([]);
    dispatch(actions.fetchRealPersons(realPersonsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realPersonsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.FullNameFa,
      text: t("RealPerson." + fields.FullNameFa.display),
      sort: fields.FullNameFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.NationalCode,
      text: t("RealPerson." + fields.NationalCode.display),
      sort: fields.NationalCode.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.BirthDate,
      text: t("RealPerson." + fields.BirthDate.display),
      sort: fields.BirthDate.sortable,
      formatter: DateFaColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.FatherNameFa,
      text: t("RealPerson." + fields.FatherNameFa.display),
      sort: fields.FatherNameFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Person.WalletPrice",
      text: t("RealPerson." + fields.WalletPrice.display),
      sort: fields.WalletPrice.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Person.PointPrice",
      text: t("RealPerson." + fields.PointPrice.display),
      sort: fields.PointPrice.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Person.CreditPrice",
      text: t("RealPerson." + fields.CreditPrice.display),
      sort: fields.CreditPrice.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "عملیات",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRealPersonPage: realPersonsUIProps.openEditRealPersonPage,
        openDeleteRealPersonDialog:realPersonsUIProps.openDeleteRealPersonDialog,
        t: t
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
    sizePerPage: realPersonsUIProps.queryParams.PageSize,
    page: realPersonsUIProps.queryParams.PageNumber,
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
                  realPersonsUIProps.setQueryParams
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
