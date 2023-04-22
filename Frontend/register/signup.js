
const form=document.getElementById('form-signup');

form.addEventListener('click',signup);

async function signup(e){
        if(e.target.className=="signupButton"){
            e.preventDefault();
            const name=document.getElementById('name');
            const email=document.getElementById('email');
            const phone=document.getElementById('phone');
            const password=document.getElementById('password');
            if(name.value.length && email.value.length && phone.value.length && password.value.length){
            const newuser={
                name:name.value,
                email:email.value,
                phone:phone.value,
                password:password.value
            }
            name.value="";
            password.value='';
            phone.value="";
            email.value="";
            
            let res;
            const url='http://localhost:3000/signup';
            try {
                res=await axios.post(url,newuser);
                //console.log(res);
                
            } catch (error) {
                console.log(error);
            }

            const notif=document.getElementById('signup-notification');
            //console.log(notif)
            notif.classList.add("active");
            notif.innerHTML=`<h2>${res.data.message}</h2>`

           // console.log(notif);
            setTimeout(()=>{notif.classList.remove("active")},3000)

            }else{
                alert("Please fill all the fields");
            }
        }
}


