import React from "react";
import './style.css'
import { Row, Col } from "antd";
import { Configure } from "BasicComponents/context";
import { getOpsLocale } from "Utils";

export default function CommonFooter (props) {
    return <Configure.Consumer>
        {
            ({ $l, toggleConfigure }) => {
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
                </div>
            }
        }
    </Configure.Consumer>
}