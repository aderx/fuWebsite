import "./style.css";
import { Row, Col } from "antd";
import { getContext } from "@/context";

interface CommonFooterProps {
  span: number;
  offset: number;
}

export function CommonFooter(props: CommonFooterProps) {
  const { option, locale } = getContext();
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
