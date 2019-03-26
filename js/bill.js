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
        //    let bgrid = document.getElementById('bill-grids') ;
       
       let billdetail = document.createElement('div');
       billdetail.className = 'well text-center'
    //    if(bgrid === null){
            let bgrid = document.createElement('div');
            bgrid.className = 'col-md-3 border m-2 pb-2';
            bgrid.id ='bill-grids';
            bdgrid.appendChild(bgrid);
    //    }
       
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
        const users = StoreBill.getUsers();
        for(let i =1 ; i<=users.length;i++){
            let splitoption = document.createElement("option");
            splitoption.value = i;
            splitoption.text = i;
            splitcountelem.appendChild(splitoption);
        };
    }

    static generateDynamicUser(ucount){
        const ubfdiv = document.getElementById('user-bill-form-div');
        const users = StoreBill.getUsers();
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
        let bills = [];
        if(localStorage.getItem('bills')===null){
            bills = [];
        }else{
            bills = JSON.parse(localStorage.getItem('bills'));
        }
        return bills;
    }

    static addBill(bill){
        const bills = StoreBill.getBills();
        bills.push(bill);
        localStorage.setItem('bills',JSON.stringify(bills));
    }

    static getUsers(){
        let users = [];
        if(localStorage.getItem('users')===null){
            users = [];
        }else{
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }

}


//Event : Display Bills
window.onload = function() {
    BillUI.displayBills();
    BillUI.splitCountSelectList();
};

//Event: Add a bill
document.getElementById('bill-info-form').addEventListener('submit',(event)=>{
    event.preventDefault();

    // const billFormInfo = document.forms['bill-info-form'].elements;
    // console.log(billFormInfo);
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



})