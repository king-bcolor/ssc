const { TokenTypes } = require("./ast")


function codeMake(node) {
   // console.log(node);
    let code = ` ${node[0].class.select}{`

    if (node) {

        for (let index = 0; index < node.length; index++) {
          
            const el = node[index];
           
            const pre = node[index - 1] ? node[index - 1].sort : 1
            const next = node[index + 1] ? node[index + 1].sort : -1
           
            if (el.sort == pre) {
                code += `${el.name}:${el.value};`
            /*     if (node[index-1].class.path==el.class.path) {
                    console.log(el);
                
                } */
      
              
            } else {
              
                if (next != -1) {
                 
                    code += `} ${el.class.select}{${el.name}:${el.value};`
                } else {
                    code += `} ${el.class.select}{${el.name}:${el.value};`
                }
            }



        }
           code += "}"

    }

    return code

}


module.exports = {
    codeMake
}