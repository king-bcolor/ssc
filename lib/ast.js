const TokenTypes = {
    Root:"Root",
    Name: "Name",// 属性名
    Paren: ["leftParen", "rightParen"], //小括号
    Braces: ["leftBraces", "rightBraces"], // 大括号
    Colon: "Colon",//冒号
    Pointer: "Pointer",
    Attr: "Attr"//属性参数
}
function createRootNode() {
    return {
        type: TokenTypes.Root,
        body: []
    }
}
function createNameNode(value) {//创建属性名节点
    return {
        type: TokenTypes.Name,
        value,
        children: []
    }
}

function createPointerNode(value) {
    return {
        type: TokenTypes.Pointer,
        value
    }
}
function createLeftParen(value) {
    return {
        type: TokenTypes.Paren[0],
        value
    }
}
function createRightParen(value) {
    return {
        type: TokenTypes.Paren[1],
        value
    }
}
function createAttrNode(value) {
    return {
        type: TokenTypes.Attr,
        value,
        children:[]
    }
}

module.exports={
    TokenTypes,
    createRootNode,
    createNameNode,
    createPointerNode,
    createLeftParen,
    createRightParen,
    createAttrNode
}