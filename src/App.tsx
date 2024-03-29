import React, { useEffect, useState } from "react";
import "./App.css";
import { Row, Col } from "antd";
import Header from "components/header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WEB_ROUTES from "routes";
import { CommonFooter } from "@/components";
import { getLocale } from "utils";
import { NotFound } from "pages/notFound";
import { Context } from "@/context";

export default function App() {
  // 【预留字段】是否忽略缓存中的值。
  const ignoreLocalStorage = false;
  // 配置context信息
  const [localeLanguage, setLocaleLanguage] = useState(() => getLocale());

  const [contentSpan, setContentSpan] = useState(14); // 内容区域宽度

  useEffect(() => {
    setLocaleLanguage(getLocale());
  }, []);

  const colSpan = {
    span: contentSpan,
    offset: (24 - contentSpan) / 2,
  };
  const changeLocale = (type: "cn" | "en") => {
    setLocaleLanguage(getLocale(false, type));
  };

  return (
    <Router>
      <Context value={localeLanguage}>
        <Row className="container">
          <Col {...colSpan}>
            <Header
              currentSpan={contentSpan}
              changeSpan={setContentSpan}
              changeLocale={changeLocale}
            />
          </Col>
        </Row>
        <Row>
          <Col {...colSpan} className="container-content">
            <Route path="/" exact component={WEB_ROUTES[0].component} />
            {WEB_ROUTES.map((route) => (
              <Route
                key={route.name}
                exact
                path={`/${route.name}`}
                {...route}
              />
            ))}
            <Route path="/404" exact component={NotFound} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CommonFooter {...colSpan} />
          </Col>
        </Row>
      </Context>
    </Router>
  );
}
