import React, { useState } from "react";
import './App.css';
import { Row, Col } from "antd";
import Header from "Components/header";
import { getLocale } from "Utils";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { WEB_ROUTES } from "Const/routes";
import CommonFooter from "Components/commonFooter";
import { Configure } from "BasicComponents/context";


function App() {
    // 是否忽略缓存中的值。之后接入接口，动态控制
    const ignoreLocalStorage = false;
    const useLocaleType = !ignoreLocalStorage && localStorage.getItem('default_locale_type') || 'CN';
    // 配置context信息
    const [configure, setConfigure] = useState({
        $l: getLocale(useLocaleType),
        toggleConfigure: value => setConfigure({ ...configure, ...value }),
    });

    // 后期提供修改页面大小功能
    const [contentSpan] = useState(14);

    const colSpan = {
        span: contentSpan,
        offset: (24 - contentSpan) / 2
    }

    return (
        <Router>
            <Configure.Provider value={configure}>
                <Row className="container">
                    <Col { ...colSpan }>
                        <Header />
                    </Col>
                </Row>
                <Row>
                    <Col { ...colSpan } className='container-content'>
                        <Route path='/' exact component={WEB_ROUTES[0].component} />
                        {
                            WEB_ROUTES.map(route =>
                                <Route key={route.name} exact path={`/${route.name}`} {...route} />)
                        }
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <CommonFooter { ...colSpan } />
                    </Col>
                </Row>
            </Configure.Provider>
        </Router>
    );
}

export default App;
