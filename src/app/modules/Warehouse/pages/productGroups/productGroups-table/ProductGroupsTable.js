import React, { useState, useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/productGroups/productGroupsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useProductGroupsUIContext } from "../ProductGroupsUIContext";
import { ProductGroupModel } from "../../../../../../core/_models/Warehouse/ProductGroupModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import SortableTree from "react-cat-tree";
import "react-cat-tree/style.css";
import PublicNodeRenderer from "../../../../../../core/_partials/controls/tree/PublicNodeRenderer";

export function ProductGroupsTable({history}) {
  const { t } = useTranslation();
  const uiContext = useProductGroupsUIContext();
console.log(uiContext);
  const uiProps = useMemo(() => {
    return {
      tree: uiContext.tree,
      setTree: uiContext.setTree,
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openNewProductGroupDialog: uiContext.openNewProductGroupDialog,
      openEditProductGroupDialog: uiContext.openEditProductGroupDialog,
      openEditProductGroupPage: uiContext.openEditProductGroupPage,
      openDeleteProductGroupDialog: uiContext.openDeleteProductGroupDialog,
    };
  }, [uiContext]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchProductGroupsTree(uiProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.queryParams, dispatch]);

  let buttons = [
    {
      cond: (node) => true ,
      btn: (node)=> <button className="btn btn-xs btn-link p-0 mr-2" onClick={(n)=> uiProps.openDeleteProductGroupDialog(node.id)}><i className="p-0 fas fa-times text-danger"></i></button>
    },
    {
      cond: (node) => true ,
      btn: (node)=> <button className="btn btn-xs btn-link p-0 mr-2" onClick={(n)=> uiProps.openEditProductGroupDialog(null, node.id)}><i className="p-0 fas fa-plus text-primary"></i></button>
    },
    {
      cond: (node) => true ,
      btn: (node)=> <button className="btn btn-xs btn-link p-0 mr-2" onClick={(n)=> uiProps.openEditProductGroupDialog(node.id)}><i className="p-0 fas fa-pen text-primary"></i></button>
    },
    {
      cond: (node) => true ,
      btn: (node)=> <button className="btn btn-xs btn-link p-0 mr-2" onClick={(n)=> history.push(`/Warehouse/products/group/${node.id}`)}><i className="p-0 fas fa-list text-primary"></i></button>
    },
  ];
  
  return (
    <>
        <SortableTree
          treeData={uiProps.tree}
          rowHeight={50}
          canDrag={false}
          rowDirection="ltr"
          isVirtualized={false}
          nodeContentRenderer={(props) => (
            <PublicNodeRenderer {...props} buttons={buttons}/>
          )}
          //key="id"
          onChange={(e) => {
            uiProps.setTree(e);
          }}
        />
    </>
  );
}