import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/phones/phonesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePhonesUIContext } from "../PhonesUIContext";
import { PhoneModel } from "../../../../../../core/_models/Core/PhoneModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
export function PhonesTable() {
  const phonesUIContext = usePhonesUIContext();
  const phonesUIProps = useMemo(() => {
    return {
      ids: phonesUIContext.ids,
      setIds: phonesUIContext.setIds,
      queryParams: phonesUIContext.queryParams,
      setQueryParams: phonesUIContext.setQueryParams,
      openEditPhonePage: phonesUIContext.openEditPhonePage,
      openDeletePhoneDialog: phonesUIContext.openDeletePhoneDialog,
    };
  }, [phonesUIContext]);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.phones }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PhoneModel);
  const fieldKey = getFields(PhoneModel);
  const fields = PhoneModel;
  const dispatch = useDispatch();
  useEffect(() => {
    phonesUIProps.setIds([]);
    dispatch(actions.fetchPhones(phonesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phonesUIProps.queryParams, dispatch]);
  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: fields.TitleFa.display,
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: fields.TitleEn.display,
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "??????",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPhonePage: phonesUIProps.openEditPhonePage,
        openDeletePhoneDialog: phonesUIProps.openDeletePhoneDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  console.log("configs ^>^> ", configs);
  console.log("fieldKey ^>^> ", fieldKey);
  console.log("columns ^> ", columns);
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: phonesUIProps.queryParams.PageSize,
    page: phonesUIProps.queryParams.PageNumber,
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
                  phonesUIProps.setQueryParams
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
