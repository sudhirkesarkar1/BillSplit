//User Class : Represents a User
class User{
    constructor(uname){
        this.uname = uname;
    }
}

//UserUI Class : Handle Users UI tasks
class UserUI{
    static displayUsers(){
        const users = StoreUsers.getUsers();
        users.forEach((user) => UserUI.addUserRow(user));
    }

    static addUserRow(user){
        const ulist = document.getElementById('user-list');
        const urow = document.createElement('tr');
        urow.innerHTML = `
            <td>${user.uname}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a> </td>
        `;
        ulist.appendChild(urow);
    }

    static deleteUser(event){
        if(event.classList.contains('delete')){
            event.parentElement.parentElement.remove();
        }
    }

    static clearUserForm(){
        document.getElementById('uname').value='';
    }  

    static showAlert(message,className,timeOut=2000){
        const alertdiv = document.createElement('div');
        alertdiv.className = `mt-2 w-25 alert alert-${className}`;
        alertdiv.appendChild(document.createTextNode(message));
        document.getElementById('alert-info').appendChild(alertdiv);

        //vanish in 3 sec
        setTimeout(()=>{document.querySelector('.alert').remove()}
        ,timeOut);
    }
}

//Store Class : To Handle Storage
class StoreUsers{
    static getUsers(){
        // $.blockUI();
        let users = [];
        var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            // console.log(this.responseText);
            users = JSON.parse(this.responseText);
            // console.log(users);
            // $.unblockUI();
           
          }
        });
        
        xhr.open("GET", "https://splitwise-3e72.restdb.io/rest/userdetails",false);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-apikey", "5c3591fa66292476821c9dfd");
        xhr.setRequestHeader("cache-control", "no-cache");
        
        xhr.send(data);
        return users;
    }

    static addUser(user){
        // $.blockUI();
        console.log(JSON.stringify(user));
        var data = JSON.stringify(user);
                 
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              console.log(this.responseText);
             // $.unblockUI();
            }
            
          });
          
          xhr.open("POST", "https://splitwise-3e72.restdb.io/rest/userdetails",false);
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("x-apikey", "5c3591fa66292476821c9dfd");
          xhr.setRequestHeader("cache-control", "no-cache");
          
          xhr.send(data);
    }

    static deleteUser(uname){
        // $.blockUI();
        var data = null;
        let reqobj = '';
        let reqapicall = ''
        let users = StoreUsers.getUsers();
        for(let user of users){
            if(user.uname === uname){
                reqobj = user._id;
                reqapicall = `https://splitwise-3e72.restdb.io/rest/userdetails/${reqobj}`;
                break;
            }
        }

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                // $.unblockUI();
            }
            
        });

        xhr.open("DELETE", reqapicall,false);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-apikey", "5c3591fa66292476821c9dfd");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);
    }
}


//Event : Display Users
// document.addEventListener('DOMContentLoaded',UserUI.displayUsers);
document.addEventListener('DOMContentLoaded',()=>{
    UserUI.showAlert('UI Loading intitated','info');
    UserUI.displayUsers();
    BillUI.displayBills();
    BillUI.splitCountSelectList();
    UserUI.showAlert('UI Loading is Completed','info');
});

//Event : Add User
document.getElementById('user-form').addEventListener('submit',(event)=>{

    event.preventDefault();

    // $.blockUI();
    UserUI.showAlert('User Add Request is Processing ','info',3000);

    const uname = document.getElementById('uname').value;

    //Instantiate User
    const user = new User(uname);

    //Add user to UI
    UserUI.addUserRow(user);

    //Add user to store
    StoreUsers.addUser(user);
    
    //Update Bill split Number
    BillUI.splitCountSelectList();

    //Update Bill Form
    BillUI.generateDynamicUser(0);

    //show success message
    UserUI.showAlert('User Added','success');

    //Clear Fileds
    UserUI.clearUserForm();

    $.unblockUI();
})

//Event: Remove User
document.getElementById('user-list').addEventListener('click',(event)=>{

    //  $.blockUI();
    UserUI.showAlert('Delete user Request is Processing ','info',3000);
    //Remove User from UI
    UserUI.deleteUser(event.target);

    //Remove user from Store
    StoreUsers.deleteUser(event.target.parentElement.previousElementSibling.textContent);

    //Update Bill split Number
    BillUI.splitCountSelectList();

    //Update Bill Form
    BillUI.generateDynamicUser(0);

    //Show delete alert
    UserUI.showAlert('User Deleted','success');

    $.unblockUI();
})

// export {StoreUsers};