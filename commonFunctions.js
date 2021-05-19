class commonFunction {
    async otpGenerate(){
        let value = ''
        for(var i = 0; i < 4; i++){
            const randValue = Math.floor((Math.random() * 10) % 10);
            value += randValue;
        }
        return value;
    }
}
export default commonFunction