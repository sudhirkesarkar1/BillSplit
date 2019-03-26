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

    static showAlert(message,className){
        const alertdiv = document.createElement('div');
        alertdiv.className = `mt-2 alert alert-${className}`;
        alertdiv.appendChild(document.createTextNode(message));
        document.getElementById('alert-info').appendChild(alertdiv);

        //vanish in 3 sec
        setTimeout(()=>{document.querySelector('.alert').remove()}
        ,2000);
    }
}

//Store Class : To Handle Storage
class StoreUsers{
    static getUsers(){
        let users = [];
        if(localStorage.getItem('users')===null){
            users = [];
        }else{
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }

    static addUser(user){
        const users = StoreUsers.getUsers();
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
    }

    static deleteUser(uname){
        const users = StoreUsers.getUsers();
        users.forEach((user,index)=>{
            if(user.uname===uname){
                users.splice(index,1);
            }
        });
        localStorage.setItem('users',JSON.stringify(users));
    }
}


//Event : Display Users
document.addEventListener('DOMContentLoaded',UserUI.displayUsers);

//Event : Add User
document.getElementById('user-form').addEventListener('submit',(event)=>{
    event.preventDefault();

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
})

//Event: Remove User
document.getElementById('user-list').addEventListener('click',(event)=>{
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
})