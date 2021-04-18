import React from "react";
import './style.css'
import { Row, Col } from "antd";
import { Configure, bindContext } from "BasicComponents/context/index.tsx";
import { getOpsLocale } from "Utils";

function CommonFooterFunc (props, context) {
    const { $l, toggleConfigure } = context;
    const localeOption = $l.option;
    const localeType = $l.locale;
    return <div className='contain-footer'>
        <Row>
            <Col { ...props } className='footer-option' >
                <a
                    onClick={() => {
                        const opsLocale = getOpsLocale(localeType.type);
                        toggleConfigure({ $l: opsLocale });
                        localStorage.setItem('default_locale_type', opsLocale.locale.type);
                    }}
                >{localeType.label}</a>
                <a href="mailto://aderx@qq.com">{localeOption.contact}</a>
            </Col>
        </Row>
        <p className='footer-author'>FU</p>
    </div>;
}

export default bindContext(CommonFooterFunc);