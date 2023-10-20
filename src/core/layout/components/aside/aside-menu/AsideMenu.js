import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {AsideMenuList} from "./AsideMenuList";
import {useHtmlClassService} from "../../../_core/MetronicLayout";

export function AsideMenu({disableScroll}) {
  const uiService = useHtmlClassService();
  const {user} = useSelector(state => state.auth);

  const layoutProps = useMemo(() => {
    return {
      accessRoutes: user.Services,
      layoutConfig: uiService.config,
      asideMenuAttr: uiService.getAttributes("aside_menu"),
      ulClasses: uiService.getClasses("aside_menu_nav", true),
      asideClassesFromConfig: uiService.getClasses("aside_menu", true)
    };
  }, [uiService]);

  return (
    <>
      {/* begin::Menu Container */}
      <div
        id="kt_aside_menu"
        data-menu-vertical="1"
        className={`aside-menu my-4 ${layoutProps.asideClassesFromConfig}`}
        {...layoutProps.asideMenuAttr}
      >
        <AsideMenuList layoutProps={layoutProps} />
      </div>
      {/* end::Menu Container */}
    </>
  );
}

