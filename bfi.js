function interpret(bfCode) {
    let outBuffer = "";
    let programCounter = 0;

    const pointer = 0;
    const registers = new Uint8Array(3 * 10 * 1000); // 30k

    while(programCounter < bfCode.length) {
        programCounter++;
        switch(bfCode[programCounter]) {
            case "<": pointer++; break;
            case ">": pointer--; break;
            case "+": registers[pointer]++; break;
            case "-": registers[pointer]--; break;
            case ",": registers[pointer] = _in(); break;
            case ".": outBuffer += String.fromCharCode(registers[pointer]); break;
            case "[": if(!registers[pointer]) { programCounter = _end(programCounter); } break;
            case "]": if(registers[pointer]) { programCounter = _start(programCounter); } break;
        }
    }
    
    return outBuffer;

    function _in() {
        const prompt = prompt("Input (empty = enter)", 0);
        return prompt | 10;
    }

    function _end(index) {
        let c = 0;
        for(let i = index + 1; i < bfCode.length; i++) {
            const p = bfCode[i];
            if(p === "[") {
                c++;
            } else if(p === "]" && c > 0) {
                c--
            } else if(p === "]" && c === 0) {
                return i++;
            }
        }
    }

    function _start(index) {
        let c = 0;
        for(let i = index - 1; i > -1; i--) {
            const p = bfCode[i];
            if(p === "]") {
                c++;
            } else if(p === "[" && c > 0) {
                c--
            } else if(p === "[" && c === 0) {
                return i;
            }
        }

    }
}
