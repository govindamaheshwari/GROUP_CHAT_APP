function shownotification(message){
    const container=document.getElementById("notification-container");
    const notification=document.createElement('div');
    notification.classList.add("notification");
    notification.innerHTML=`<h4>${message}</h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },3000);
}



//For showing users on the screen!

async function getUsers(){
    const url='http://localhost:3000/users';
    try {
        const response=await axios.get(url,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
        showUsers(response.data.users);
    } catch (error) {
        console.log(error);
    }
}

function showUsers(users){
    let singlecontacts=document.getElementById('single__contacts');
    singlecontacts.innerHTML='';
    if (users.length>0){
        users.forEach(user=>{
            let newDiv=`<div class="single__contact" id=${user.id}>
            <h5>${user.name}</h5>
        </div>`
            singlecontacts.innerHTML+=newDiv;
        })
    }
}

window.addEventListener('DOMContentLoaded',screenready);

function screenready(){
    getUsers();
    const chatSection=document.getElementsByClassName('chat__section')[0];
    const form=document.getElementById("send__message__form");
    form.addEventListener('submit',sendMessage);

    const newgroupform=document.getElementById("form__newGroup");
    newgroupform.addEventListener('submit',createnewgroup);
    getAllgroups();
}


async function createnewgroup(e){
    e.preventDefault();

    const newgroupdata={
        groupname:document.getElementById('newGroup__input').value
    }
    console.log(newgroupdata);
    const url='http://localhost:3000/newgroup';
    try {
        const response=await axios.post(url,newgroupdata,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
        shownotification(response.data.message);
    } catch (error) {
        console.log(error);
    }
}

async function getAllgroups(){
    const url="http://localhost:3000/getallgroups";
    try {
        const response= await axios.get(url,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
        console.log(response.data.groups);
        showAllgroups(response.data.groups);
    } catch (error) {
        console.log(error);
    }
}

function showAllgroups(groups){
    let groupscontainer=document.getElementById('groups');
    
    groupscontainer.innerHTML='';
    groupscontainer.innerHTML+='<h4>Groups</h4>'
    if (groups.length>0){
        groups.forEach(group=>{
            let newDiv=`<div class="single__group" id=${group.id}>
            <h5>${group.groupname}</h5>
        </div>`
            groupscontainer.innerHTML+=newDiv;
        })
    }

    groupscontainer.addEventListener('click',(e)=>{
        const groupid=e.target.id;
        const groupname=e.target.textContent;
        const chat_section=document.getElementsByClassName("chat__section")[0];
        chat_section.innerHTML=`<div class="display__chat" id="display__chat">
                                <h4 id=${groupid} class="group__name">${groupname}</h4>
                                    <div class="actual__chat">
                                       
                                    </div>
                                </div>
                                <div class="send__message">
                                <form action="" method="post" id="send__message__form">
                                  <input type="text" id=${groupid} class="msgText" placeholder="Write Your Mesaage">
                                  <button type="submit">➤</button>
                                </form>
                                </div>
                                <div class="send__media">
                                <form action="" method="post"  enctype="multipart/form-data" id="send__media__form">
                                    <input type="file" id=${groupid} class="msgFile">
                                    <button type="submit">Upload</button>
                                </form>
                                </div>`
        getgroupmessages(groupid);
        
        const messageform=document.getElementById('send__message__form');
        messageform.addEventListener('submit',sendMessage);
        
        const inputfile = document.querySelector('.msgFile');
        var fileToUpload;
        inputfile.addEventListener("change", (e) => {
            fileToUpload = e.target.files[0];
        });
        const mediaform=document.getElementById('send__media__form');
            
        mediaform.addEventListener('submit',sendMedia);
    

        const display__chat=document.getElementById('display__chat');
        display__chat.addEventListener('click',showGroupInformation);
    })
}


async function sendMessage(e){
    e.preventDefault();

    const messagedata={
        message_text:document.getElementsByClassName('msgText')[0].value,
        receiverid:document.getElementsByClassName('msgText')[0].id
    }
    //document.getElementsByClassName('msgText')[0].id='';
    if(messagedata.message_text.length>0){
    document.getElementsByClassName('msgText')[0].value='';
    console.log(messagedata);
    const url='http://localhost:3000/sendmessage';
        try {
        const response=await axios.post(url,messagedata,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
        console.log(response.data.message);
        //shownotification(response.data.message);
        } 
        catch (error) {
        console.log(error);
        }
    }
    
    else{
       alert('Message Can not be empty');
    }
}





async function sendMedia(e){
    e.preventDefault();
    //const fileToUpload = e.target.files[0];
    console.log("media message!");
}

function showGroupInformation(e){
    if (e.target.classList.contains("group__name")){
        const groupid=e.target.id;
        document.getElementsByClassName('actual__chat')[0].style.display='none';
        let displaychatarea=e.target.parentElement;
        let area=document.getElementById('groupDetail__section');
        if(area){
            area.innerHTML='';
        }
        let detailsarea=`<div id="groupDetail__section">
                            <div class="groupMembers">
                                <h4>Members of the Group</h4>
                            </div>
                            <div class="add_new_member">
                                <form action="" method="POST" enctype="multipart/form-data" id="add_new_memberForm">
                                    <input type="text" id=${groupid} class="add_member_mobile" placeholder="Enter valid Email id">
                                    <input type="submit"  value="Add Member">
                                </form>
                                <button class="leave__group">Leave Group</button>
                            </div>
                        
                        </div>`;
        displaychatarea.innerHTML+=detailsarea;
        
        //Showing members to the group
        const URL=`http://localhost:3000/getmembers/${groupid}`;
        axios.get(URL,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}})
            .then(response=>{
                const Members=response.data.groupMembers;
    
                Members.forEach(member=>{
                    let groupMembers=document.getElementsByClassName('groupMembers')[0];
                    let newMember=`<div class="groupMember">
                                        <h5> User Id:${member.userId}</h5>
                                        <button class="adminBtn  ${member.isadmin}" id="${member.userId}">${member.isadmin? "Admin":"Make Admin"} </button>
                                        <button class="removeUser" id="${member.userId}" > Remove User</button>
                                    </div>`;
                    groupMembers.innerHTML+=newMember;
                })
            })
            .catch(err=>console.log(err));
        //


        const addmemberform=document.getElementById("add_new_memberForm");
        addmemberform.addEventListener('submit',async (e)=>{
            e.preventDefault();
            const url="http://localhost:3000/addmember"
            const email=document.getElementsByClassName("add_member_mobile")[0].value;
            const groupID=document.getElementsByClassName("add_member_mobile")[0].id;

            const memberdata={
                email:email,
                groupID:groupID
            }
            console.log(memberdata);

            try {
                const response=await axios.post(url,memberdata,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
                console.log(response.data.message);
                shownotification(response.data.message);    
            } catch (error) {
                console.log(error);
            }
            console.log("submit is working");
        })

        const groupDetailBtns=document.getElementById("groupDetail__section");
        groupDetailBtns.addEventListener('click',async (e)=>{
            console.log(e.target.className);

            if(e.target.classList.contains("adminBtn") && e.target.classList.contains("false") ){
                try {
                    const response=await axios.post("http://localhost:3000/makeadmin",{targetId:e.target.id,groupId:groupid},{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
                    shownotification(response.data.message);
                } catch (error) {
                    console.log(error);
                }
            }
            if(e.target.classList.contains("adminBtn") && e.target.classList.contains("true") ){
                try {
                    const response=await axios.post("http://localhost:3000/removeadmin",{targetId:e.target.id,groupId:groupid},{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
                    shownotification(response.data.message);
                } catch (error) {
                    console.log(error);
                }
            }
            if(e.target.classList.contains("removeUser")){
                try {
                    const response=await axios.post("http://localhost:3000/removeuser",{targetId:e.target.id,groupId:groupid},{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
                    shownotification(response.data.message);
                } catch (error) {
                    console.log(error);
                }
            }
            if(e.target.classList.contains("leave__group")){
                try {
                    const response=await axios.post("http://localhost:3000/leavegroup",{groupId:groupid},{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
                    shownotification(response.data.message);
                } catch (error) {
                    console.log(error);
                }
            }

        })
    }


}

 function getgroupmessages(groupid){
    let response;
    const oldMessagesinLS=JSON.parse(localStorage.getItem(`${groupid}`) || "[]");
    console.log("%^&*(*$%^&",oldMessagesinLS)
    const lastMessageId= oldMessagesinLS.length===0?0: oldMessagesinLS[oldMessagesinLS.length-1].id;
    const url=`http://localhost:3000/allmessages/${groupid}?lastMessageId=${lastMessageId}`;
    
            axios.get(url,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}})
           .then(response=>{
           const newMessages=response.data.messages;
           console.log("newmessage", newMessages);
           const allMessages=[...oldMessagesinLS,...newMessages];
           localStorage.setItem(`${groupid}`,JSON.stringify(allMessages));
            displayingChat(response,allMessages); 
        }).catch(err=> {
            console.log(error);
        })
       


    // try {
    //   response=await axios.get(url,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
    // } catch (error) {
    //     shownotification(error);
    // }

    function displayingChat(response,Messages){
        //shownotification(response.data.message);
        const senderid=response.data.userId;
        //const Messages=response.data.messages;
        let actual__chat=document.getElementsByClassName("actual__chat")[0];
        actual__chat.innerHTML="";
        Messages.forEach(message=>{
            if(message.userId!=senderid){
                let receiversmessage =`<div class="others__message msgs">
                                        <h5>${message.sendername}</h5>
                                        <h4>${message.message}</h4>
                                        <p>${message.createdAt}</p>
                                    </div>`
                actual__chat.innerHTML+=receiversmessage;
            }
            else{
                let sendersmessage =`<div class="my__message msgs">
                                        <h4>${message.message}</h4>
                                        <p>${message.createdAt}</p>
                                    </div>`
                actual__chat.innerHTML+=sendersmessage;
            }
        })
    }
}