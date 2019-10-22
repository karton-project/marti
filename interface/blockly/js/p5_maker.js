class Blockp5 {
    constructor(code) {
        this.p5_obj = {};
        this.code = code;
    }

    runCode() {
        try {
            let s = new Function("p", this.code);
            this.p5_obj = new p5(s);
        } catch (e) {
            alert(e);
        }
    }
}