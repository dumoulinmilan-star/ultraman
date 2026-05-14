function validateParentheses (input) {
    
    let parentheses = []

    for (let i = 0; i < input.length; i++) {
        
        let char = input[i];
       
        if (char === "(" || char === "[" || char === "{") {
            parentheses.push(char);
        
        }
        
        if (char === ")" || char === "]" || char === "}") {

            let last = parentheses.at(-1)
            if (
                (char === ")" && last === "(") ||
                (char === "]" && last === "[") ||
                (char === "}" && last === "{")) {
                    parentheses.pop();
                } else return false
        }
    }
}