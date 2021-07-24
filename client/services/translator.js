export default (data) => {
	if(data === 'รุนรถ') return "model"
	else if(data === 'รถยนฅ์นั่งส่วนบุคคล') return "passenger"
	else if(data === 'รถยนฅ์เพื่อการพาณิซย์') return "commercial"
	else if(data === 'รถยนฅ์อเนกประสงค์') return "utility"
	else return "model"
}


