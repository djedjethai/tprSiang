export default (data) => {
	if(data === 'model') return "รถยนต์รุ่นพิเศษ"
        else if(data === 'passenger') return "รถยนต์นั่งส่วนบุคคล"
        else if(data === 'commercial') return "รถยนต์เพื่อการพาณิซย์"
        else if(data === 'utility') return "รถยนต์อเนกประสงค์"
        else return "รถยนต์รุ่นพิเศษ"	
}
