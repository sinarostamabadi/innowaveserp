import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { OrganizationPostModel } from "../../../../../core/_models/Employment/OrganizationPostModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const OrganizationPostsUIContext = createContext();

export function useOrganizationPostsUIContext() {
  return useContext(OrganizationPostsUIContext);
}

export const OrganizationPostsUIConsumer = OrganizationPostsUIContext.Consumer;

export function OrganizationPostsUIProvider({
  organizationPostsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(OrganizationPostModel).initialFilter
  );

  const [ids, setIds] = useState([]);

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

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    dataModel: OrganizationPostModel,
    newOrganizationPostButtonClick:
      organizationPostsUIEvents.newOrganizationPostButtonClick,
    openEditOrganizationPostPage:
      organizationPostsUIEvents.openEditOrganizationPostPage,
    openDeleteOrganizationPostDialog:
      organizationPostsUIEvents.openDeleteOrganizationPostDialog,
    openDeleteOrganizationPostsDialog:
      organizationPostsUIEvents.openDeleteOrganizationPostsDialog,
    openFetchOrganizationPostsDialog:
      organizationPostsUIEvents.openFetchOrganizationPostsDialog,
    openUpdateOrganizationPostsStatusDialog:
      organizationPostsUIEvents.openUpdateOrganizationPostsStatusDialog,
  };
  return (
    <OrganizationPostsUIContext.Provider value={value}>
      {children}
    </OrganizationPostsUIContext.Provider>
  );
}
