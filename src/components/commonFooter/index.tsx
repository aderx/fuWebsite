import React from "react";
import "./style.css";
import { Row, Col } from "antd";
import { bindContext } from "basicComponents/context";
import { I18NType } from "@/types";

interface CommonFooterFuncProps {
  span: number;
  offset: number;
}

function CommonFooterFunc(props: CommonFooterFuncProps, $l: I18NType) {
  const { option, locale } = $l;
  return (
    <div className="contain-footer">
      <Row>
        <Col {...props} className="footer-option">
          <a
            onClick={() => {
              // const opsLocale = getOpsLocale(localeType.type);
              // toggleConfigure({ $l: opsLocale });
              // localStorage.setItem('default_locale_type', opsLocale.locale.type);
            }}
          >
            {locale.label}
          </a>
          <a href="mailto://aderx@qq.com">{option.contact}</a>
        </Col>
      </Row>
      <p className="footer-author">FU</p>
    </div>
  );
}

export default bindContext(CommonFooterFunc);
