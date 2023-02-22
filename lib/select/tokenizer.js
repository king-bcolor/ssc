
//selectTokenizer(code)
function selectTokenizer(code) {
   // console.log(code);
    code = code.split("\n")
    //  console.log(code);
    let current = 0
    let selectTokens = {}
    let path = ""
   
    while (current < code.length) {

 
        const POINTER = /[A]\d+/
        //   const SPACE = /\s/
        const PATH = /[~][p][a][t][h]/
        
        if (!code[current]) {
            current++
            
            continue
        }
        if (PATH.test(code[current])) {
            code[current] = code[current].replace("~path", "")
            code[current] = code[current].trim()
            path = code[current]
            // console.log(code[current]);
           
            current++
            continue
        }
        if (POINTER.test(code[current])) {
            let pointer = code[current].split("=>")
           
            pointer[0] = pointer[0].trim()
            pointer[1] = pointer[1].trim()
           
            selectTokens[pointer[0]]={              
                select: pointer[1],
                path
            }
           
            current++
            continue
        }

       
current++

    }
    
    return selectTokens
}

module.exports={
    selectTokenizer
}