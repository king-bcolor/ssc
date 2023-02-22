const { TokenTypes } = require('./ast');
const { traverser } = require("./traverser")

/* function reverseAst(params) {
    
} */

function transformer(ast) {
    const newAst = { // 1.预设新的ast树
        type: TokenTypes.Root,
        body: [

        ]
    }
    let sAst = []
    //let pointerList=[]
    // 2.新旧两树建立软连接
    ast.context = newAst.body
    //    ast.select=sAst



    //3.遍历ast树，并修改
    traverser(ast, {
        "Name": {
            enter(node, parent) {


                if (node.type == "Name") {
                    let name = {
                        type: node.type,
                        name: node.value,
                        arguments: []
                    }
                    // 旧的ast上连接新的ast

                    node.context = name.arguments
                    parent.context.push(name)
                 
                }
            }
        },

        "Attr": {
            enter(node, parent) {
                if (node.type == "Attr") {
                    let attr = {
                        type: node.type,
                        //  name: [...parent.value],

                        arguments: []
                    }
                    //    console.log(parent.value);
                    node.context = attr.arguments

                    node.parent = parent.value,
                        parent.context.push(attr)

                }
            }
        },


        "Pointer": {
            enter(node, parent) {
                //    console.log(parent);
                if (parent.type == "Attr") {
                    const select = {
                        pointer: node,
                        name: parent.parent,
                        value: parent.value,
                        sort:node.substring(1)

                    }
                    sAst.push(select)
                    parent.context.push(node)
                    //   sAst.push(parent);
//console.log(sAst);

                }
            }
        }



    })




    //   newAst

    return  sAst

}
module.exports = {
    transformer
}