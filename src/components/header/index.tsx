import React, { useCallback, useEffect, useState } from "react";
import "./style.less";
import { NavLink, withRouter } from "react-router-dom";
import WEB_ROUTES from "routes";
import { Avatar, Slider } from "antd";
import { bindContext } from "basicComponents/context";
import { I18NType } from "types/common";
import { debounce, NOOP } from "utils";

interface HeaderProps {
  location: {
    pathname: string;
  };
  currentSpan: number;
  changeSpan: (span: number) => void;
}

function Header(props: HeaderProps, $l: I18NType) {
  const { location, currentSpan, changeSpan } = props;
  const [pageSpan, setPageSpan] = useState(currentSpan);
  // 获取当前路径地址，获取不到时默认使用第一个
  const pathSplit = location.pathname.split('/').filter(Boolean);
  const pathName = pathSplit[0] || WEB_ROUTES[0].name
  const pageName = pathSplit[pathSplit.length - 1] || pathName;
  // 获取当前路由地址下的标记内容
  const flag = WEB_ROUTES.find((item) => item.name === pageName)?.flagType;

  const pageWidthDebounce = useCallback(debounce(changeSpan, 800), []);
  // 组件内实时更新数据，父组件延时更新数据
  const changePageWidth = (span: number) => {
    setPageSpan(span);
    pageWidthDebounce(span);
  }

  return (
    <div className="contain-header">
      <div className="header-logo">
        <span className="logo-title">Fu-{pageName}</span>
        {flag && <span className="logo-flag">{$l.flagType[flag]}</span>}
      </div>
      <div className="header-nav">
        {WEB_ROUTES.map((item) => {
          const { img, name, child } = item;
          if(!child) {
            return (
              <NavLink
                exact
                key={name}
                className="header-nav-item"
                activeClassName="nav-active"
                isActive={() => name === pathName}
                to={`/${name === "website" ? "" : name}`}
              >
                {img ? <Avatar src={img} /> : $l.nav[name]}
              </NavLink>
            );
          }
          return <div className={`header-nav-item header-nav-child ${name === pathName ? 'nav-active' : ''}`} key={name}>
            {img ? <Avatar src={img} /> : $l.nav[name]}
            {
            <div className="nav-child-list">
              {child.map((subItem) => {
                const { type, name: subName, img } = subItem;
                switch (type) {
                  case "spanSelector":
                    return (
                      <div className="nav-span-selector">
                        <p>
                          <span>{$l.nav[subName]}</span>
                          <span>{currentSpan}</span>
                        </p>
                        <Slider
                          max={22}
                          min={10}
                          step={2}
                          key={subName}
                          value={pageSpan}
                          onChange={changePageWidth}
                        />
                      </div>
                    );
                  default:
                    return (
                      <NavLink
                        exact
                        key={subName}
                        className="header-nav-item"
                        activeClassName="nav-active"
                        isActive={() => subName === pageName}
                        to={`/${name}/${subName}`}
                      >
                        {img ? <Avatar src={img} /> : $l.nav[subName]}
                      </NavLink>
                    );
                }
              })}
            </div>
          }
          </div>
        })}
      </div>
    </div>
  );
}

// 使用withRouter高阶组件封装一下，以便获取到路由地址和路由参数
export default withRouter<any, any>(bindContext(Header));
