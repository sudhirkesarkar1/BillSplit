// document.getElementById('user-selected').addEventListener('onchange',(e)=>{
//     console.log(e.target.value);
//     alert('asd');
// },false);

function test(e){
    console.log(e);
    const ubfdiv = document.getElementById('user-bill-form-div');
    ubfdiv.innerHTML = "";
    
    var birds = [
        {
            "ID": "001",
            "user_Name": "Eurasian"
        },
        {
            "ID": "002",
            "user_Name": "Eagle"
        },
        {
            "ID": "003",
            "user_Name": "Hawk"
        },
    ];

    // const userlist = document.createElement('option'); 
    let optionlist = '';
    for(let i=0;i<birds.length;i++){
        optionlist += `<option value ="${birds[i]['ID']}">${birds[i]['user_Name']}</option>`
    }

    for(let i=0;i<e;i++){
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
// document.forms['bill-info-form'].elements;

var bills = [
    {
        "Description": "Rent",
        "Amount": "1000",
        "SplitCount":"3",
        "Users":{"1":{"user":"Eurasian","amt":"500"},
                    "2":{"user":"aaa","amt":"200"},
                    "3":{"user":"bbb","amt":"300"}}
    },
    {
        "Description": "Dinner",
        "Amount": "12000",
        "SplitCount":"2",
        "Users":{"1":{"user":"ddd","amt":"2000"},
        "2":{"user":"zzz","amt":"10000"}}
    },
    {
        "Description": "Lunch",
        "Amount": "660",
        "SplitCount":"2",
        "Users":{"1":{"user":"ddd","amt":"140"},
        "2":{"user":"zzz","amt":"520"}}
    },
    {
        "Description": "Dinner",
        "Amount": "12000",
        "SplitCount":"2",
        "Users":{"1":{"user":"ddd","amt":"2000"},
        "2":{"user":"zzz","amt":"10000"}}
    },
    {
        "Description": "Lunch",
        "Amount": "660",
        "SplitCount":"2",
        "Users":{"1":{"user":"ddd","amt":"140"},
        "2":{"user":"zzz","amt":"520"}}
    },
    {
        "Description": "Dinner",
        "Amount": "12000",
        "SplitCount":"2",
        "Users":{"1":{"user":"ddd","amt":"2000"},
        "2":{"user":"zzz","amt":"10000"}}
    },
    {
        "Description": "Lunch",
        "Amount": "660",
        "SplitCount":"2",
        "Users":{"1":{"user":"ddd","amt":"140"},
        "2":{"user":"zzz","amt":"520"}}
    }
];


function getbill(){
    
    const bdgrid = document.getElementById('bill-details-grids');
    let billGrid = '';
    for(key in bills){
        billGrid+=`
            <div  class="col-md-3 border m-2 pb-2">
            <div class="well text-center">
              <span>Description : </span><strong>${bills[key].Description}</strong><br>
              <span>Amount : </span><strong>${bills[key].Amount}</strong><br>
              <span>Divided Between : </span><strong>${bills[key].SplitCount}</strong> <span>Users</span><br>
              <a onclick="billSelected('${key}')" class="btn btn-primary" href="#">Bill Details</a>
            </div>
            </div>
        `;
    }
    bdgrid.innerHTML=billGrid; 
}

function billSelected(param) {  
    const bdetail = document.getElementById('bill-details');
    let userlist = document.createElement('ul');
    for(let i=1;i<=bills[param].SplitCount;i++){
        var li=document.createElement('li');
        li.classList.add("list-group-item");
        li.innerHTML = `<strong>UserName:</strong> ${bills[param].Users[i].user} <strong>Owns:</strong> ${bills[param].Users[i].amt}`;
        userlist.appendChild(li); 
    }
    // userlist.appendChild(userinfo);  
    // userlist.innerHTML=  userinfo;
    // <div class="well text-center border"> </div>

    let billinfo = `
        <span>Description : </span><strong>${bills[param].Description}</strong><br>
        <span>Amount : </span><strong>${bills[param].Amount}</strong><br>
        <span>Divided Between : </span><strong>${bills[param].SplitCount}</strong> <span>Users</span><br>
        `;
        bdetail.innerHTML=billinfo;
        bdetail.appendChild(userlist);

}

window.onload = function() {
    getbill();
  };