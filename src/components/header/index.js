import React from 'react';
import './style.css'
import { NavLink, withRouter } from "react-router-dom";
import { WEB_ROUTES } from "../../routes";
import { Avatar } from "antd";
import { bindContext } from "BasicComponents/context/index.tsx";

class Header extends React.Component {
    render() {
        const { $l } = this.context;
        const { location } = this.props;
        // 获取当前路径地址，获取不到时默认使用第一个
        const pathName = location.pathname.replace('/','') || WEB_ROUTES[0].name;
        // 获取当前路由地址下的标记内容
        const flag = WEB_ROUTES.find(item => item.name === pathName)?.flagType;
        return <div className='contain-header'>
            <div className='header-logo'>
                <span className='logo-title'>Fu-{pathName}</span>
                {
                    flag &&
                    <span className='logo-flag'>{$l.flagType[flag]}</span>
                }
            </div>
            <div className='header-nav'>
                {
                    WEB_ROUTES.map((item) => {
                        const { content, name } = item;
                        return (<NavLink
                            exact
                            key={name}
                            className='header-nav-item'
                            activeClassName='nav-active'
                            isActive={() => name === pathName}
                            to={`/${name === 'website' ? '' : name}`}
                        >
                            {
                                !content
                                    ? $l.nav[name]
                                    : <Avatar src={content} />
                            }
                        </NavLink>)
                    })
                }
            </div>
        </div>
    }
}

// 使用withRouter高阶组件封装一下，以便获取到路由地址和路由参数
export default withRouter(bindContext(Header));