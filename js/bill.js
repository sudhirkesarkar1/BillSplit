// import {StoreUsers} from 'user';

class Bill{
    constructor(description,amount,splitcount,splitdetails){
        this.Description = description;
        this.Amount = amount;
        this.SplitCount = splitcount;
        this.Users = splitdetails;
    }
}

class BillUI{
    static displayBills(){
        const bills = StoreBill.getBills();
        document.getElementById('bill-details-grids').innerHTML='';
        bills.forEach((bill,index) => BillUI.addBillToGrid(bill,index));
    }

    static addBillToGrid(bill,index){
       const bdgrid = document.getElementById('bill-details-grids') ;
       
       let billdetail = document.createElement('div');
       billdetail.className = 'well text-center'
    
            let bgrid = document.createElement('div');
            bgrid.className = 'col-md-3 border m-2 pb-2';
            bgrid.id ='bill-grids';
            bdgrid.appendChild(bgrid);
       
        let billinfo = `
            <span>Description : </span><strong>${bill.Description}</strong><br>
            <span>Amount : </span><strong>${bill.Amount}</strong><br>
            <span>Divided Between : </span><strong>${bill.SplitCount}</strong> <span>Users</span><br>
            <a onclick="BillUI.displayBillDetails('${index}')" class="btn btn-primary" href="#">Bill Details</a>
        `;
       billdetail.innerHTML=billinfo;
       bgrid.appendChild(billdetail);
       bdgrid.appendChild(bgrid);
       
    }

    static clearBillForm(){
        document.getElementById('description').value='';
        document.getElementById('amount').value='';
        document.getElementById('user-bill-form-div').innerHTML='';
    }

    static displayBillDetails(id){
        const bills = StoreBill.getBills();
        const bdetail = document.getElementById('bill-details');
        let userlist = document.createElement('ul');
        for(let i=1;i<=bills[id].SplitCount;i++){
            var li=document.createElement('li');
            li.classList.add("list-group-item");
            li.innerHTML = `<strong>UserName:</strong> ${bills[id].Users[i].user} <strong>Owns:</strong> ${bills[id].Users[i].amt}`;
            userlist.appendChild(li); 
        }

        let billinfo = `
            <span>Description : </span><strong>${bills[id].Description}</strong><br>
            <span>Amount : </span><strong>${bills[id].Amount}</strong><br>
            <span>Divided Between : </span><strong>${bills[id].SplitCount}</strong> <span>Users</span><br>
            `;
            bdetail.innerHTML=billinfo;
            bdetail.appendChild(userlist);
    }

    static splitCountSelectList(){
        const splitcountelem = document.getElementById('user-selected');
        splitcountelem.innerHTML='';
        // const users = StoreBill.getUsers();
        const users = StoreUsers.getUsers();
        for(let i =1 ; i<=users.length;i++){
            let splitoption = document.createElement("option");
            splitoption.value = i;
            splitoption.text = i;
            splitcountelem.appendChild(splitoption);
        };
    }

    static generateDynamicUser(ucount){
        const ubfdiv = document.getElementById('user-bill-form-div');
        // const users = StoreBill.getUsers();
        const users = StoreUsers.getUsers();
        ubfdiv.innerHTML = "";
        let optionlist = '';
        for(let i=0;i<users.length;i++){
            optionlist += `<option value ="${users[i]['uname']}">${users[i]['uname']}</option>`
        }

        for(let i=1;i<=ucount;i++){
            const udiv = document.createElement('div'); 
            udiv.classList.add("mt-2");
            udiv.innerHTML = `
                <label for="user${i}">UserName:</label>
                <select class="custom-select" id="user${i}" >
                <option value="">-- Select --</option>
                ${optionlist}
        </select>
                <label for="useramt${i}">SplitAmount:</label>
                <input type="text" name="useramt${i}" id="useramt${i}" required>

            `;
            
        ubfdiv.appendChild(udiv);
        }
    }
}

class StoreBill{
    static getBills(){
        // $.blockUI();
        let bills = [];

        var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            // console.log(this.responseText);
            bills = JSON.parse(this.responseText);
            // console.log(bills);
            // $.unblockUI();
        }
        });

        xhr.open("GET", "https://splitwise-3e72.restdb.io/rest/billinfo",false);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-apikey", "5c3591fa66292476821c9dfd");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);

        return bills;
    }

    static addBill(bill){
        // $.blockUI();
        console.log(JSON.stringify(bill));
        var data = JSON.stringify(bill);
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              console.log(this.responseText);
            //   $.unblockUI();
            }
          });
          
          xhr.open("POST", "https://splitwise-3e72.restdb.io/rest/billinfo",false);
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("x-apikey", "5c3591fa66292476821c9dfd");
          xhr.setRequestHeader("cache-control", "no-cache");
          
          xhr.send(data);

    }

}


//Event : Display Bills
// window.onload = function() {
//     BillUI.displayBills();
//     BillUI.splitCountSelectList();
// };

//Event: Add a bill
document.getElementById('bill-info-form').addEventListener('submit',(event)=>{
    event.preventDefault();

    $.blockUI();

    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const userselected = document.getElementById('user-selected').value;
    let users = {};
    for(let i = 1; i<=userselected;i++){
        users[i] = {
            'user':document.getElementById('user'+i).value,
            'amt' :document.getElementById('useramt'+i).value
        }
    }

    const bill = new Bill(description,amount,userselected,users);

    StoreBill.addBill(bill);

    BillUI.displayBills();

    UserUI.showAlert('Bill Added','success');

    BillUI.clearBillForm();

    $.unblockUI();

})