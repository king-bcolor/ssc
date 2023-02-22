const {    TokenTypes,
    createRootNode,
    createNameNode,
    createPointerNode,
    createAttrNode} =require('./ast');


/* function createLeftBraces(value) {
    return {
        type:TokenTypes.Braces[0],
        value
    }
}
function createLeftBraces(value) {
    return {
        type:TokenTypes.Braces[1],
        value
    }
} */






function parser(tokens) {
    // 初始化指针和节点
    let current = 0
    let rootNode = createRootNode()

    // 开始push
    while (current < tokens.length) {
        let value=walk()
        if (value == false) {
            continue
        }
        rootNode.body.push(value)
    }



    function walk() {
     


       
        let token = tokens[current]
       // console.log(rootNode.body,"token",token);
        let lastBodyEl = rootNode.body.length?rootNode.body.length-1:0
     
        let lastBodyChildEl = rootNode.body[lastBodyEl]?rootNode.body[lastBodyEl].children.length-1:0



        if (token.type!= TokenTypes.Name&&token.type!=TokenTypes.Attr&&token.type!=TokenTypes.Pointer) {
            current++
            return 0
        }

        if (token.type == "Name") {//属性名
            current++
        //   console.log(value);
            return createNameNode(token.value)
        }

        if (token.type == "Attr") {//属性值
            current++
            
         let last=rootNode.body[lastBodyEl]
         
         last=last?last:{type:0}
       
            if (last.type == TokenTypes.Name) {
               
                last.children.push(createAttrNode(token.value))
              //  console.log(rootNode.body[lastBodyEl],6);
                return 0
            }
            //  return createAttrNode(token.value)
        }


        if (token.type == TokenTypes.Pointer) {//指针
            current++
            let last=rootNode.body[lastBodyEl]?rootNode.body[lastBodyEl].children.length-1:[]
            let parent=rootNode.body[lastBodyEl].children[last]
         // console.log(rootNode.body[lastBodyEl].children.length,6);
          //  if (last.type == TokenTypes.Attr) {
            let newArr=token.value.split(",")
            parent['children']=[...parent['children'],...newArr]    // 扩展运算合并数组
            //    parent['children'].push.apply(arr, newArr)//合并数组
                return 0
            //}
           // return 
        }

current++
  //      throw new Error(`不认识的token${token}`);
    }

return rootNode

}

module.exports={
    parser
}



