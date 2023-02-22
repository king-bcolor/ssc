const { TokenTypes } = require('./ast');


function traverser(rootNode, visitor) {
    // 两个功能 深度优先和visitor模式
    // 通过循环调用函数形成递归来实现深度优先
    //console.log(1);

    function traverserArray(array, parent) {
        array.forEach(node => {
            traverseNode(node, parent)
        });
    }
    function traverseNode(node, parent) {
        //console.log(parent);
        let method = visitor[node.type]//用当前遍历的节点类型去当键名拿参数，获取访问者

        // 一个访问者
        /*     {                
            Program: {
                enter(node, parent) {
                  callCounts.push(["program-enter", node.type, ""]);
                },
                exit(node, parent) {
                  callCounts.push(["program-exit", node.type, ""]);
                },
              }
            } */


        if (method) {//之后判断是否有与当前节点类型相同的数据
            // 如果有，使用内部方法
            method.enter(node, parent) // 开始当前节点
        }


        if (parent && parent.type == "Attr") {//说明在遍历指针
            method = visitor['Pointer']
            if (method.enter) {
                method.enter(node, parent)
            }
          
        }
        switch (node.type) {
            case "Root":
                traverserArray(node.body, node)
                break;
            case "Name":
                traverserArray(node.children, node)
                break;
            case "Attr":
                //       method.regroup() // 设置一个重组的方法，传入
                traverserArray(node.children, node)

                break;
            case "Pointer":
                break;

            default:
                break;
        }


        let exit = true

        if (parent && parent.type == "Attr" && method.exit) {//说明在遍历指针
            //    method=visitor['Pointer']
            method.exit(node, parent)
            exit = false
        }
        if (method && method.exit && exit) {//之后判断是否有与当前节点类型相同的数据
            // 如果有，使用内部方法
            method.exit(node, parent) // 退出当前节点
        }


    }

    traverseNode(rootNode);

}

module.exports = {
    traverser
}