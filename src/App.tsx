import React, { useState } from "react";
import './App.css';
import { Row, Col } from "antd";
import Header from "components/header";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import WEB_ROUTES from "routes";
import CommonFooter from "components/commonFooter";
import { BaseProvider } from "basicComponents/context";
import { getLocale } from "utils/language";
import { getControlStorage } from "utils/storage";
import { NotFound } from "pages/notFound";

export default function App() {
  // 【预留字段】是否忽略缓存中的值。
  const ignoreLocalStorage = false;
  // 配置context信息
  const [localeLanguage, setLocaleLanguage] = useState(() => (
    getLocale(getControlStorage('default_locale_type', ignoreLocalStorage) || '')
  ));
  const [contentSpan, setContentSpan] = useState(14);// 内容区域宽度

  const colSpan = {
    span: contentSpan,
    offset: (24 - contentSpan) / 2,
  }

  return (
    <Router>
      <BaseProvider value={localeLanguage}>
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
            <Route path='/404' exact component={NotFound} />
            <Route component={() => <Redirect to='/404' />}/>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CommonFooter { ...colSpan }/>
          </Col>
        </Row>
      </BaseProvider>
    </Router>
  );
}