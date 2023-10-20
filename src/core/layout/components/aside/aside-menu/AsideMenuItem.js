/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";

export function AsideMenuItem({ element, service, root }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url)
      ? " menu-item-active menu-item-open "
      : "";
  };

  const nestedItems = (element.children || []).map((menuItem) => {
    return (
      <AsideMenuItem
        key={menuItem.ServiceId}
        element={menuItem}
        service={menuItem}
        root={root}
      ></AsideMenuItem>
    );
  });

  return (
    <li
      key={service.ServiceId}
      className={`menu-item menu-item-submenu ${getMenuItemActive(
        "/" + root + "/" + (!!service.ModelName === false && !!service.IsService ? "dashboard": service.Url || service.ServiceId)
      )}`}
      data-menu-toggle="hover"
    >
      <NavLink
        className={
          "menu-link " +
          (!!service.children && service.children.length > 0 ? (
            "menu-toggle"
          ) : (
            <></>
          ))
        }
        to={"/" + root + "/" + (!!service.ModelName === false && !!service.IsService ? "dashboard": service.Url || service.ServiceId)}
      >
        {!!service.Icon ? (
          <span className="svg-icon menu-icon">
            <i className={"fad " + service.Icon}></i>
          </span>
        ) : (
          <i className="menu-bullet menu-bullet-dot">
            <span />
          </i>
        )}
        <span className="menu-text">{service.Title}</span>
        {!!service.children && service.children.length > 0 ? (
          <i className="menu-arrow" />
        ) : (
          <></>
        )}
      </NavLink>
      {!!service.children && service.children.length > 0 ? (
        <div className="menu-submenu ">
          <i className="menu-arrow" />
          <ul className="menu-subnav">
            <li className="menu-item  menu-item-parent">
              <span className="menu-link">
                <span className="menu-text">{service.Title}</span>
              </span>
            </li>
            {nestedItems}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </li>
  );
}
