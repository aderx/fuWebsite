const path = require('path');

// 自定义的别名列表，路径为项目根目录 '/'
// *修改路径后需要重启项目
const aliasMap = {
    BasicComponents: 'src/components/basic',
    Components: 'src/components',
    Utils: 'src/utils',
    Const: 'src/consts',
    Pages: 'src/pages',
}

/**
 * 根据本地项目路径，替换所有目录别名的地址
 * @returns {}
 */
module.exports = function replaceAliasDir() {
    Object.keys(aliasMap).forEach(key => {
        aliasMap[key] = path.resolve(__dirname, `../${aliasMap[key]}`);
    });

    return aliasMap;
}();