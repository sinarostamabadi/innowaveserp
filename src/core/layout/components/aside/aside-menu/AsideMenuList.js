/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";
import { AsideMenuItem } from "./AsideMenuItem";

export function AsideMenuList({ layoutProps }) {
  const {t} = useTranslation();
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url)
      ? " menu-item-active menu-item-open "
      : "";
  };

  function list_to_tree(list) {
		var map = {}, node, roots = [], i;
		for (i = 0; i < list.length; i += 1) {
			map[list[i].ServiceId] = i; // initialize the map
			list[i]["children"] = []; // initialize the children
    }
    
		for (i = 0; i < list.length; i += 1) {
			node = list[i];
			if (node.ParentId !== null) {
        // if you have dangling branches check that map[node.parentId] exists
				list[map[node.ParentId]]["children"].push(node);
			} else {
				roots.push(node);
			}
    }
    
		return roots;
  }
  
  return (
    <>
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li
          className={`menu-item ${getMenuItemActive("/dashboard")}`}
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <i className="fas fa-tachometer-alt-fast"></i>
            </span>
            <span className="menu-text">{t("MENU.DASHBOARD")}</span>
          </NavLink>
        </li>

        <li className="menu-section ">
          <h4 className="menu-text">{t("App.SubSystems")}</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>

        {
        list_to_tree(layoutProps.accessRoutes).map((route) => {
          return (
            <AsideMenuItem key={route.ServiceId} element={route} service={route} root={route.Url}/>
          )
        })
      }
      </ul>
    </>
  );
}
