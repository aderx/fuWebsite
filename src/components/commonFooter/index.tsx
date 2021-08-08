import React from "react";
import './style.css'
import { Row, Col } from "antd";
import { bindContext } from 'basicComponents/context';
import { I18NType } from "types/common";

interface CommonFooterFuncProps {
    span: number;
    offset: number;
}

function CommonFooterFunc (props: CommonFooterFuncProps, $l: I18NType) {
    const localeOption = $l.option;
    const localeType = $l.locale;
    return <div className='contain-footer'>
        <Row>
            <Col { ...props } className='footer-option' >
                <a
                    onClick={() => {
                        // const opsLocale = getOpsLocale(localeType.type);
                        // toggleConfigure({ $l: opsLocale });
                        // localStorage.setItem('default_locale_type', opsLocale.locale.type);
                    }}
                >{localeType.label}</a>
                <a href="mailto://aderx@qq.com">{localeOption.contact}</a>
            </Col>
        </Row>
        <p className='footer-author'>FU</p>
    </div>;
}

export default bindContext(CommonFooterFunc);