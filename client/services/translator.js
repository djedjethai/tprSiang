export default (data) => {
	if(data === 'model') return "รุนรถพิเศษ"
        else if(data === 'passenger') return "รถยนฅ์นั่งส่วนบุคคล"
        else if(data === 'commercial') return "รถยนฅ์เพื่อการพาณิซย์"
        else if(data === 'utility') return "รถยนฅ์อเนกประสงค์"
        else return "รุนรถพิเศษ"	
}
