#!/usr/bin/env node
const { complier } = require("./lib/complier")
const fs = require('fs');
//const path = require("path");
let argv= process.argv[2]
let data = fs.readFileSync(argv, "utf8")
let code = complier(data);
let path = Object.keys(code)


path.forEach(el => {
    let index = el.lastIndexOf(".")

    if (el.substring(index) == ".vue" ) {
        let oldFile = fs.readFileSync(el, "utf8")
        let arr = oldFile.split(/<\/style[\s]*>/)
        code[el] += `\n\r</style>`
        let newData = [arr[0], code[el], arr[1]].join("")
        //   console.log(path);
        fs.writeFileSync(el, newData);
    }
    
    if (el.substring(index) ==  ".html") {
        let oldFile = fs.readFileSync(el, "utf8")
        let arr = oldFile.split(/<\/style[\s]*>/)
        code[el] += `\n\r</style>`
        let newData = [arr[0], code[el], arr[1]].join("")
        //   console.log(path);
        fs.writeFileSync(el, newData);
    }

    if (el.substring(index) == ".wxss"  ) {
        
        let file = fs.readFileSync(el, "utf8")
        file+=code[el]
       
        fs.writeFileSync(el, file);
    }
    if (el.substring(index) == ".css"  ) {
        
        let file = fs.readFileSync(el, "utf8")
        file+=code[el]
       
        fs.writeFileSync(el, file);
    }

});




//console.log(newData,code);