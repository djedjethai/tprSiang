class VerifForm {

	construct(){
		this.formCompleted = false;  
	}

	

	static verifImage(champ)
	{
		console.log('in verif image')
		return true
		// logic to verif image 
		// if image ok return true, else false   		
	}

	static verifFinal(f)
	{
   		// var emailOk = this.verifEmail(f.email);
   		var imageOk = this.verifImage(f.image);
   		
		if(imageOk)
   		{
			this.formCompleted = true;
			return true;
   		} 
   		else
   		{
      			alert("The image format is incorrect");
      			return false;
   		}
	}

	static eventListenerHandler()
	{
		// var word = document.querySelector('#password');
		var urlS3 = document.querySelector('#urlS3');
		var image = document.querySelector('#image');
		
		console.log('ds eventListenerHandler')
		console.log(urlS3)


		if (this.formCompleted && urlS3) {
		    this.formCompleted = false;
						
		    const formData = { 
				dat: 'just for testing'
		    }

		    fetch('http://localhost:3050/admin/picsmain',{
			    method:'POST',
			    body:JSON.stringify(formData),
			    headers: {
				    'Content-type':'application/json',
				    // Authorization: 'Bearer ' + 'bullshit' 
			    }
		    	})
			.then(res => {
				if(res){
					// here check status code of the res
					console.log('in response and ok')
					// if ok redirect to server for saving url in db
					// then the server will redirect to app page
				} else {
					// return message err ????
					console.log('err from fetch')
				}
			})
			.catch(e => console.log(e));
		} else {
			console.log('pas d envoi');	
      			alert("formCompleted incorrect or no url");
		}
	}
}

var form = document.querySelector('form');
form.addEventListener('submit', (event) => {
	console.log('has been submit')
	event.preventDefault();
	VerifForm.eventListenerHandler();
});
