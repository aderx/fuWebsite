import React from 'react';
import {createContext} from "react";
import {NOOP} from "Utils";

/**
 * 创建一个context区域
 */
export const Configure = createContext({
    $l: {},
    toggleConfigure: NOOP,
})

export function bindContext(Component: any){
    // 判断传递的组件是函数形式调用的还是class形式调用的
    if(Component.prototype.isReactComponent){
        Component.contextType = Configure;
        return Component;
    }else{
        return function contextFunc (props: any) {
            return <Configure.Consumer>
                { (configureArgs: any) => Component(props, configureArgs) }
            </Configure.Consumer>
        }
    }

}

export function BaseProvider(props: any) {
    return <Configure.Provider value={props.value}>
        {props.children}
    </Configure.Provider>
}