const RegistersCount = 30000;

class BrainfuckJS {
    _inCallback =  () => 10;
    _outCallback = (msg) => console.log(msg);

    /**
     * Pointer value.
     */
    _p = 0;
    /**
     * Program counter.
     */
    _pc = -1;   // because the iteration starts with an incrementation.
    /**
     * Registers array.
     */
    _r = new Uint8Array(RegistersCount);

    interpret = (bfCode) => {
        const length = bfCode.length;
        while(this._pc < length) {
            this._pc++;
            switch(bfCode[this._pc]) {
                case "<": this._p = this._toLeft(this._p); break;
                case ">": this._p = this._toRight(this._p); break;
                case "+": this._increment(); break;
                case "-": this._decrement(); break;
                case ",": this._readTo(); break;
                case ".": this._writeTo(); break;
                case "[": this._jumpRight(bfCode); break;
                case "]": this._jumpLeft(bfCode); break;
            }
        }
    }

    onOut = (callback) => {
        this._outCallback = callback;
    }

    onRead = (callback) => {
        this._inCallback = callback;
    }

    _toLeft = (current) => {
        return this.__to(0, RegistersCount, -1, current);
    }

    _toRight = (current) => {
        return this.__to(RegistersCount, 0, 1, current);
    }

    __to = (min, max, step, current) => {
        if(current === min) return max;
        return current + step;
    }

    _increment = () => {
        this._r[this._p]++;
    }

    _decrement = () => {
        this._r[this._p]--;
    }

    _readTo = () => {
        this._r[this._p] = this.__denormalize(this.__read());
    }

    _writeTo = () => {
        this.__write(this.__normalize(this._r[this._p]));
    }

    __denormalize = (value) => {
        return value.charCodeAt(0);
    }

    __normalize = (value) => {
        return String.fromCharCode(value);
    }

    _jumpRight = (bfCode) => {
        if(this._r[this._p] !== 0) return;
        this._pc = this.__findNext(bfCode) + 1;
    }

    _jumpLeft = (bfCode) => {
        if(this._r[this._p] === 0) return;
        this._pc = this.__findPrevious(bfCode);
    }

    __findNext = (bfCode) => {
        return this.__find(bfCode, "]", "[", 1, this._pc) + 1;
    }

    __findPrevious = (bfCode) => {
        return this.__find(bfCode, "[", "]", -1, this._pc);
    }

    __find = (within, lookingFor, pair, step, current, skip = 0) => {
        current += step;
        if(within[current] === lookingFor && skip === 0) return current;
        if(within[current] === lookingFor) skip--;
        if(within[current] === pair) skip++;
        return this.__find(within, lookingFor, pair, step, current, skip);
    }

    __read = () => {
        return this._inCallback();
    }

    __write = (value) => {
        this._outCallback(value);
    }
}
