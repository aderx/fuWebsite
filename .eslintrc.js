module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "parser": '@typescript-eslint/parser',
    "extends": [
        "plugin:react/recommended",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "tsx": true,
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        '@typescript-eslint',
    ],
    "rules": {
        "eqeqeq": 2, //必须使用 === 和 !==
        "no-empty-function": 1, //禁止空函数
        "no-multi-spaces": 2, //禁止使用多个空格
        "no-trailing-spaces": 2, //禁止禁用行尾空格
        "space-infix-ops": 2, // 要求操作符周围有空格
        "space-in-parens": 2, //强制在圆括号内使用一致的空格
        "no-var": 2, //要求使用 let 或 const 而不是 var,
        "react/prop-types": 1, //防止在react组件定义中缺少props验证
        "no-mixed-spaces-and-tabs": 2, // 不允许tab和空格混用
        "object-curly-spacing": ['error', 'always'],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
    }
};