import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/setting/settingActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSettingUIContext } from "../SettingUIContext";
import { SettingModel } from "../../../../../../core/_models/General/SettingModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SettingTable() {
  const { t } = useTranslation();

  const settingUIContext = useSettingUIContext();

  const settingUIProps = useMemo(() => {
    return {
      ids: settingUIContext.ids,
      setIds: settingUIContext.setIds,
      queryParams: settingUIContext.queryParams,
      setQueryParams: settingUIContext.setQueryParams,
      openEditSettingPage: settingUIContext.openEditSettingPage,
      openDeleteSettingDialog: settingUIContext.openDeleteSettingDialog,
    };
  }, [settingUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.setting }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SettingModel);
  const fieldKey = getFields(SettingModel);
  const fields = SettingModel;

  const dispatch = useDispatch();
  useEffect(() => {
    settingUIProps.setIds([]);
    dispatch(actions.fetchSetting(settingUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Setting." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Setting." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSettingPage: settingUIProps.openEditSettingPage,
        openDeleteSettingDialog: settingUIProps.openDeleteSettingDialog,
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
    sizePerPage: settingUIProps.queryParams.PageSize,
    page: settingUIProps.queryParams.PageNumber,
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
                  settingUIProps.setQueryParams
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
