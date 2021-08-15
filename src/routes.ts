import { StarList } from "./pages/starList";
import { FastAnswer } from "./pages/fastAnswer";
import React from "react";

interface RouteType {
    // 页面标题
    name: string;
    // 页面标记。off：非正式内容，lock：加密内容，fail：无法加载或加载失败，hide：不显示内容
    flagType?: 'off' | 'lock' | 'fail' | 'hide';
    // 页面组件
    component?: React.ComponentType,
    // 展示的图片，不填将展示导航名称
    img?: string;
    child?: ({
        type?: 'spanSelector' | 'select' | 'toggle';
    } & RouteType)[];
}

const WEB_ROUTES: RouteType[] = [
    {
        name: 'website',
        flagType: 'off',
        component: StarList,
    },
    {
        name: 'fast',
        flagType: 'off',
        component: FastAnswer,
    },
    {
        name: 'blog',
        flagType: 'off',
    },
    {
        name: 'composition',
        flagType: 'lock',
    },
    {
        name: 'me',
        flagType: 'lock',
        img: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        child: [
            {
                name: 'info',
                flagType: 'lock',
                component: StarList,
            },
            {
                name: 'detail',
                flagType: 'lock',
                component: StarList,
            },
            {
                name: 'span',
                flagType: 'hide',
                type: 'spanSelector',
            }
        ]
    },
]

export default WEB_ROUTES;