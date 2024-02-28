import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/accounts/accountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useAccountsUIContext } from "../AccountsUIContext";
import { AccountModel } from "../../../../../../core/_models/Accounting/AccountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import SortableTree from "react-cat-tree";
import { CloneObject } from "../../../../../../core/_helpers/CloneObjectHelpers";
import "react-cat-tree/style.css";
import NodeRendererDefault from "../../../../../../core/_partials/controls/tree/CostumNodeRenderer";

export function AccountsTable() {
  const { t } = useTranslation();

  const accountsUIContext = useAccountsUIContext();
  const accountsUIProps = useMemo(() => {
    return {
      ids: accountsUIContext.ids,
      setIds: accountsUIContext.setIds,
      queryParams: accountsUIContext.queryParams,
      setQueryParams: accountsUIContext.setQueryParams,
      openEditAccountPage: accountsUIContext.openEditAccountPage,
      openDeleteAccountDialog: accountsUIContext.openDeleteAccountDialog,
      openEditDetailDialog: accountsUIContext.openEditDetailDialog,
    };
  }, [accountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.accounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const [tree, setTree] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    accountsUIProps.queryParams.PageSize = 200;

    accountsUIProps.setIds([]);
    dispatch(actions.fetchAccounts(accountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountsUIProps.queryParams, dispatch]);

  useEffect(() => {
    if (!!entities && entities.length) setTree(list_to_tree(entities));
  }, [entities]);

  function list_to_tree(list) {
    //let xx = [...list];
    let xx = JSON.parse(JSON.stringify(list));
    xx = xx.map((x) => {
      const model = {
        AccountId: x.AccountId,
        ParentId: x.ParentId,
        title: x.Code + " - " + x.Title,
        children: [],
        object: x,
      };

      return model;
    });
    var map = {},
      node,
      roots = [],
      i;
    for (i = 0; i < xx.length; i += 1) {
      map[xx[i].AccountId] = i; // initialize the map

      xx[i]["children"] = []; // initialize the children
    }

    for (i = 0; i < xx.length; i += 1) {
      node = xx[i];
      if (node.ParentId !== null) {
        // if you have dangling branches check that map[node.parentId] exists

        xx[map[node.ParentId]]["children"].push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }

  let buttons = [
    {
      Level: 1,
      cond: (node) => node.children.length == 0,
      btn: (node) => (
        <button
          className="btn btn-link p-0 mr-2" /* onClick={()=>accountsUIProps.openDeleteAccountDialog(node.object.AccountId)} */
        >
          <i className="p-0 fas fa-times text-danger"></i>
        </button>
      ),
    },
    {
      Level: 1,
      cond: (node) => node.children.length == 0,
      btn: (node) => (
        <button
          className="btn btn-link p-0 mr-2" /* onClick={()=>accountsUIProps.openEditDetailDialog(node.object)} */
        >
          <i className="p-0 fas fa-pen text-info"></i>
        </button>
      ),
    },
    {
      Level: 1,
      cond: (node) => true,
      btn: (node) => (
        <button
          className="btn btn-link p-0 mr-2" /* onClick={()=>accountsUIProps.openEditDetailDialog(null, node.object.AccountId, 2)} */
        >
          <i className="p-0 fas fa-plus text-success"></i>
        </button>
      ),
    },
    {
      Level: 2,
      cond: (node) => node.children.length == 0,
      btn: (node) => (
        <button
          className="btn btn-link p-0 mr-2" /* onClick={()=>accountsUIProps.openDeleteAccountDialog(node.object.AccountId)} */
        >
          <i className="p-0 fas fa-times text-danger"></i>
        </button>
      ),
    },
    {
      Level: 2,
      cond: (node) => node.children.length == 0,
      btn: (node) => (
        <button
          className="btn btn-link p-0 mr-2" /* onClick={()=>accountsUIProps.openEditDetailDialog(node.object)} */
        >
          <i className="p-0 fas fa-pen text-info"></i>
        </button>
      ),
    },
    {
      Level: 2,
      cond: (node) => true,
      btn: (node) => (
        <button
          className="btn btn-link p-0 mr-2" /* onClick={()=>accountsUIProps.openEditDetailDialog(null, node.object.AccountId, 3)} */
        >
          <i className="p-0 fas fa-plus text-success"></i>
        </button>
      ),
    },
    {
      Level: 3,
      cond: (node) => node.children.length == 0,
      btn: (node) => (
        <button
          className="btn btn-link p-0 mr-2" /* onClick={()=>accountsUIProps.openDeleteAccountDialog(node.object.AccountId)} */
        >
          <i className="p-0 fas fa-times text-danger"></i>
        </button>
      ),
    },
    {
      Level: 3,
      cond: (node) => node.children.length == 0,
      btn: (node) => (
        <button
          className="btn btn-link p-0 mr-2" /* onClick={()=>accountsUIProps.openEditDetailDialog(node.object)} */
        >
          <i className="p-0 fas fa-pen text-info"></i>
        </button>
      ),
    },
  ];

  return (
    <>
      {!!totalCount && (
        <SortableTree
          treeData={tree}
          rowHeight={50}
          canDrag={false}
          rowDirection="ltr"
          isVirtualized={false}
          nodeContentRenderer={(props) => (
            <NodeRendererDefault {...props} buttons={buttons} />
          )}
          //key="AccountId"
          onChange={(e) => setTree(e)}
        />
      )}
    </>
  );
}
