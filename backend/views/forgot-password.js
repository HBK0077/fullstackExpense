let forgotEmail = document.getElementById("forgotEmail");
let emailForgotButton = document.getElementById("forgotEmailButton");

emailForgotButton.addEventListener("click", async(e)=>{
    try{
        e.preventDefault();
        let EmailForgot={
            email: forgotEmail.value
        } 

        const forgotPassword = await axios.post("http://34.226.155.238:3500/forgotpassword", EmailForgot);

        if(forgotPassword.data.success === true){
            alert("Successfully sent Mail. Please open your Email");
        }else{
            alert("Please try Again!!");
        }

    }catch(err){
        console.log(err);
    }
})