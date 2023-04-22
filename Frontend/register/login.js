
const loginbtn=document.getElementById('loginbutton');


loginbtn.addEventListener('click',login);

async function login(e){
        e.preventDefault();
        const email=document.getElementById('email');
        const password=document.getElementById('password');
            if(email.value.length>0 && password.value.length>0){
            const object={
                email:email.value,
                password:password.value
            }
            email.value="";
            password.value="";
            let res;
            const url='http://localhost:3000/login';
            try {
                res=await axios.post(url,object);
                console.log("response of post ",res.data);
                localStorage.setItem('token',res.data.token);

                const notif=document.getElementById('signup-notification');

                notif.classList.add("active");
                notif.innerHTML=`<h2>${res.data.message}</h2>`
                setTimeout(()=>{
                    notif.classList.remove("active"); 
                    console.log("Notif removed");
                     window.location.href="../main/chat.html"
    
                },1000)
            } catch (err) {
                alert(err.response.data.message);
            }
         }
         else{
                alert("Please fill all the fields");
            }
}



