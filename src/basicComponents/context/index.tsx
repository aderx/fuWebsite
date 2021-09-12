import React, { useContext } from "react";
import { createContext } from "react";

/**
 * 创建一个context区域
 */
export const Configure = createContext({});

export function bindContext(ReactComponent: any) {
  // 判断传递的组件是函数形式调用的还是class形式调用的
  if (ReactComponent?.prototype.isReactComponent) {
    ReactComponent.contextType = Configure;
    return ReactComponent;
  } else {
    // hooks
    return function contextHook(props: any) {
      return ReactComponent(props, useContext(Configure));
    };
    // func
    // return function contextFunc (props: any) {
    //     return <Configure.Consumer>
    //         { (configureArgs: any) => ReactComponent(props, configureArgs) }
    //     </Configure.Consumer>
    // }
  }
}

export function BaseProvider(props: any) {
  return (
    <Configure.Provider value={props.value}>
      {props.children}
    </Configure.Provider>
  );
}
