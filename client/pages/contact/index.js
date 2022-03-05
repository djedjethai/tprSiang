import Title from '../../components/ui/title' 
import DisplayImage from '../../components/ui/displayImage' 



export default() => {
	// <img src="/contact/qrcode.jpg" className="contact__qrcode" />

	return (
		<div className="contact">
			<Title 
				classname="title"
				classtitle="heading-primary"
				title="Contact"
			/>
			<div className="contact__bloc">	
				<DisplayImage
					classname=""
					imgsrc="/contact/qrcode.jpg"
					imgalt="image qr-code"
					imgsrcClassname="contact__qrcode"
				/>
				<h2 className="heading-2 heading-2-light contact__bloc--info">Line</h2>
			</div>
			<div className="contact__bloc">	
				<DisplayImage
					classname=""
					imgsrc="/contact/facebook.png"
					imgalt="image facebook"
					imgsrcClassname="contact__facebook"
				/>
				<h2 className="heading-2 heading-2-light contact__bloc--info"><a href="https://m.facebook.com/Toyota.Rama4.Sales/">Go to facebook</a></h2>
			</div>

			<div className="contact__bloc">	
				<DisplayImage
					classname=""
					imgsrc="/contact/mail.jpeg"
					imgalt="image mail"
					imgsrcClassname="contact__mail"
				/>
				<h2 className="heading-2 heading-2-light contact__bloc--info">siangtoyota@gmail.com</h2>
			</div>
		</div>
	)
}
