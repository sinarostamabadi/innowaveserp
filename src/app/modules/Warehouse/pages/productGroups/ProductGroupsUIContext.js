import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { isEqual, isFunction } from "lodash";
import { ProductGroupModel } from "../../../../../core/_models/Warehouse/ProductGroupModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
import * as actions from "../../_redux/productGroups/productGroupsActions";
import { getProductGroupById } from "../../_redux/productGroups/productGroupsCrud";
import { CloneObject, CloneArray } from "../../../../../core/_helpers";

const ProductGroupsUIContext = createContext();

export function useProductGroupsUIContext() {
  return useContext(ProductGroupsUIContext);
}

export const ProductGroupsUIConsumer = ProductGroupsUIContext.Consumer;

export function ProductGroupsUIProvider({ productGroupsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ProductGroupModel).initialFilter
  );

  const { currentState } = useSelector(
    (state) => ({ currentState: state.productGroups }),
    shallowEqual
  );

  const { entities } = currentState;
  const [items, setItems] = useState([]);
  const [tree, setTree] = useState([]);
  const [ids, setIds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const initProductGroup = {
    ProductGroupId: undefined,
    Title: "",
    ParentId: "",
    Parent: "",
    Code: "",
  };

  useEffect(() => {
    if (!!entities && entities.length) {
      setItems(entities);
    }
  }, [entities]);

  useEffect(() => {
    if (!!items && items.length && tree.length == 0) {
      setTree(list_to_tree(items));
    }
  }, [items.length]);

  function list_to_tree(list) {
    //let xx = [...list];
    let xx = JSON.parse(JSON.stringify(list));
    xx = xx.map((x) => {
      const model = {
        id: x.Id,
        ParentId: x.ParentId,
        title: x.Title,
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
      map[xx[i].id] = i; // initialize the map

      xx[i]["children"] = []; // initialize the children
    }

    for (i = 0; i < xx.length; i += 1) {
      node = xx[i];
      if (!!node.ParentId) {
        // if you have dangling branches check that map[node.parentId] exists
        xx[map[node.ParentId]]["children"].push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }

  function addRecursive(treeData, node, ok) {
    if (ok == false)
      treeData.children.forEach((nodeObj) => {
        if (ok == false)
          if (nodeObj.id == node.ParentId) {
            ok = true;
            if (!!nodeObj["children"] == false) nodeObj["children"] = [];

            nodeObj["children"].push(node);
            nodeObj.expanded = true;
          } else {
            nodeObj = addRecursive(nodeObj, node, false);
          }
      });

    return treeData;
  }

  function addNodeToTree(node) {
    let clone = CloneArray(tree);

    if (node.ParentId == null) clone.push(node);
    else {
      addRecursive({ children: clone }, node, false);
    }

    setTree(clone);
  }

  function removeRecursive(treeData, productGroupId) {
    var res = treeData.filter(function f(o) {
      if (o.children) o.children = o.children.filter(f)
      
      if (o.id != productGroupId) return true
    });

    return res;
  }

  function removeNodeFromTree(productGroupId) {
    let clone = CloneArray(tree);
    setTree(removeRecursive(clone, productGroupId));
  }

  function updateRecursive(treeData, productGroup) {
    var res = treeData.map(function f(o) {
      if (o.children) o.children = o.children.map(f)
      
      if (o.id == productGroup.id)
        o.title = productGroup.title;

      return o
    });

    return res;
  }

  function updateNodeFromTree(productGroup) {
    let clone = CloneArray(tree);
    setTree(updateRecursive(clone, productGroup));
  }

  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }
      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }
      return nextQueryParams;
    });
  }, []);

  const findProductGroup = (productGroupId, fnCallBack) => {
    getProductGroupById(productGroupId).then((x) => {
      fnCallBack(x.data);
    });
  };

  const dispatch = useDispatch();
  const addProductGroup = (productGroup) => {
    dispatch(
      actions.createProductGroup(productGroup, (res) => {
        //let shadowTree = CloneObject(tree);

        addNodeToTree({
          id: res.ProductGroupId,
          ParentId: res.ParentId,
          title: res.Code + " - " + res.Title,
        });

        closeEditProductGroupDialog();
      })
    );
  };

  const removeProductGroup = (productGroupId, fnCallback) => {
    dispatch(actions.deleteProductGroup(productGroupId)).then((arg) => {
      removeNodeFromTree(productGroupId);
      fnCallback();
    })
    .catch((err) => {})
  };

  const updateProductGroup = (productGroup) => {
    dispatch(
      actions.updateProductGroup(productGroup.ProductGroupId, productGroup)
    )
      .then((arg) => {
        updateNodeFromTree({
          id: productGroup.ProductGroupId,
          ParentId: productGroup.ParentId,
          title: productGroup.Code + " - " + productGroup.Title,
        });
        closeEditProductGroupDialog();
      })
      .catch((err) => {});
  };

  const [showEditProductGroupDialog, setShowEditProductGroupDialog] = useState(
    false
  );
  const openNewProductGroupDialog = () => {
    setSelectedId(undefined);
    setShowEditProductGroupDialog(true);
  };
  const openEditProductGroupDialog = (id, parent, level) => {
    setSelectedItem({
      id,
      parent,
      level,
    });
    setSelectedId(id);
    setShowEditProductGroupDialog(true);
  };
  const closeEditProductGroupDialog = () => {
    setSelectedId(undefined);
    setShowEditProductGroupDialog(false);

    // dispatch(actions.fetchProductGroupsTree(queryParams));
  };

  const value = {
    entities,
    tree,
    setTree,
    selectedId,
    selectedItem,
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    dataModel: ProductGroupModel,
    initProductGroup: CloneObject(initProductGroup),
    findProductGroup,
    addProductGroup,
    removeProductGroup,
    updateProductGroup,
    showEditProductGroupDialog,
    openEditProductGroupDialog,
    openNewProductGroupDialog,
    closeEditProductGroupDialog,
    newProductGroupButtonClick:
      productGroupsUIEvents.newProductGroupButtonClick,
    openEditProductGroupPage: productGroupsUIEvents.openEditProductGroupPage,
    openDeleteProductGroupDialog:
      productGroupsUIEvents.openDeleteProductGroupDialog,
    openDeleteProductGroupsDialog:
      productGroupsUIEvents.openDeleteProductGroupsDialog,
    openFetchProductGroupsDialog:
      productGroupsUIEvents.openFetchProductGroupsDialog,
    openUpdateProductGroupsStatusDialog:
      productGroupsUIEvents.openUpdateProductGroupsStatusDialog,
  };
  return (
    <ProductGroupsUIContext.Provider value={value}>
      {children}
    </ProductGroupsUIContext.Provider>
  );
}
