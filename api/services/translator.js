module.exports = (data) => {
	if(data === 'model') return "รุนรถ"
        else if(data === 'passenger') return "รถยนฅ์นั่งส่วนบุคคล"
        else if(data === 'commercial') return "รถยนฅ์เพื่อการพาณิซย์"
        else if(data === 'utility') return "รถยนฅ์อเนกประสงค์"
        else return "รุนรถ"	
}
