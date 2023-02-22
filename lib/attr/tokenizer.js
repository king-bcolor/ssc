const { TokenTypes, RootNode, ChildNode, CallExpressionNode, NumberLiteralNode, StringLiteralNode } =require('../ast');
/* const token={
    type:TokenTypes,
    value:""
} */
/* 
attr :
    width
        (100px):A001
    
/(select)\s*[:]{1}/
select :
body{
    let A001
}
 


*/

function attrTokenizer(code) {
    const tokens = [];//token数组
    let current = 0
    let char = code[current];//当前字符串
    //let current = 0

  

    while (current < code.length) {
        char = code[current]
       
        const SPACE = /\s/
        if (SPACE.test(char)) {
            current++
            continue
        }

        // 2.符号
        if (char == ":") {
            tokens.push({
                type: TokenTypes.Colon,
                value: char
            });
            current++
            continue;
        }

        if (char == "(") {
            tokens.push({
                type: TokenTypes.Paren[0],
                value: char
            });
            current++
            continue;
        }



        if (char == ")") {
            tokens.push({
                type: TokenTypes.Paren[1],
                value: char
            });

            current++
            continue;
        }

      /*   if (char == "{") {
            tokens.push({
                type: TokenTypes.Braces[0],
                value: char
            });

            current++
            continue;
        }

        if (char == "}") {
            tokens.push({
                type: TokenTypes.Braces[1],
                value: char
            });
            current++
            continue;
        } */





        //3.字符
        const LETTERS = /[a-z]/
        if (LETTERS.test(char)) {

            let pev = tokens[tokens.length-1]?tokens[tokens.length-1]:{value:""}//通过上一个token是否为(来判是否为Attr
        //    console.log(pev)

            if (pev.value == "(") {// 防止属性值是字母而被错误标记类型
                let value = char
                while (!/[:]|[)]/.test(code[++current])) {
                    value += code[current]

                }

                tokens.push({
                    type: TokenTypes.Attr,
                    value
                });
                continue

            }
            let value = ""
            while (LETTERS.test(char) && current < code.length) {
                value += char
                char = code[++current]
                // console.log(value)
            }
            tokens.push({
                type: TokenTypes.Name,
                value,
            })
        }


        //4. 指针
        //  匹配大写字母
        const POINTER = /^[A-Z]+$/
        const NUMBER = /[0-9]/
        if (POINTER.test(char)) {
            let value = char
            
            char = code[++current]
            while ((NUMBER.test(char)||/,/.test(char)||POINTER.test(char)) && current < code.length) {
             //   console.log(char);
                value += char
                char = code[++current]
                // console.log(value)
              //  console.log(value);
            }
            tokens.push({
                type: TokenTypes.Pointer,
                value,
            })
        }




        //数字是参数，属于属性的一部分
        //  char = code[++current]
        //  let pev = current - 1
        //   
        if (/[0-9]/.test(char)) {
            let value = char
            while (!/[:]|[)]/.test(code[++current])) {
                value += code[current]

            }

            tokens.push({
                type: TokenTypes.Attr,
                value
            });

        }







    }


    return tokens
}

module.exports = {
    attrTokenizer
}