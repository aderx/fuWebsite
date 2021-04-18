import { StarList } from "./pages/starList";
import { FastAnswer } from "./pages/fastAnswer";

export const WEB_ROUTES = [
    {
        name: 'website',
        flagType: 'off',
        type: 'normal',
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
        flagType: 'off',
        open: 'banned',
    },
    {
        name: 'me',
        flagType: 'hide',
        content: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        open: 'key',
    },
]