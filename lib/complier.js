const { selectTokenizer } = require("./select/tokenizer")
const { attrTokenizer } = require("./attr/tokenizer")
const { parser } = require("./parser")
const { transformer } = require("./transformer")
const { codeMake } = require("./codegen")


function complier(code) {
  //  code.replace(/attr[\s]*:/, "")
 
    code = code.split(/select[\s]*:/)
 
    let attr = code[0].replace(/select[\s]*:/, "")
    let select = code[1]
  // console.log(code[1]);
    let selects = selectTokenizer(select);
   
    
 //   console.log(code);
 
    const pages = {

    }
    const pathList = []
   
    let attrToken=attrTokenizer(attr)
  
  let ast=parser(attrToken)
 // console.log(ast);
   ast = transformer(ast)
   bubbleSort(ast)
 
    ast.forEach(el => {
        
        el.class = selects[el.pointer]
    
        el.by = "A"
        el.sort = el.pointer.substring(1)

        if (pages[el.class.path]) {
          
            pages[el.class.path].push(el)
           
        } else {
            pages[el.class.path] = []
       
            pages[el.class.path].push(el)
          
            pathList.push(el.class.path)
           
        }

    });
 //   ast=bubbleSort(ast)
  
    //console.log(ast);
 //console.log(pathList);
    const returnPage = {}
    pathList.forEach(el => {
      

        if (pages[el]) {
          //  console.log(pages[el]);
            let returnCode = codeMake(pages[el])
        //    console.log(returnCode);
            returnPage[el] = returnCode
          
        }
    
    });
   

    return returnPage
}

function bubbleSort(num) {
    for (let i = num.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (num[j].sort > num[j + 1].sort) {
                let tmp = num[j]
                num[j] = num[j + 1]
                num[j + 1] = tmp;
            }
        }
    }
}

module.exports={
    complier
}