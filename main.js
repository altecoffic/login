const content = document.querySelector('#content');
const submit = document.querySelector('#submit');
const update = document.querySelector('#updateBtn');

window.addEventListener('load', () => {
   
    getUsers();

});

submit.addEventListener('click', ()=> {

    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let email = document.querySelector('#email').value;
  

    let formData = { fname, lname, email };

    fetch('http://localhost:5000/api/members', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type' : 'application/json'
        }
    });
   

});


function getUsers(){

    let html = "";

    fetch('http://localhost:5000/api/members')
    .then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        
        
        console.log(data);
        data.forEach(element => {

            html += `<li>${element.first_name} ${element.last_name} <a href="javascript:void(0)" onClick="deleteMember(${element.id})">Delete</a></li> <a href="javascript:void(0)" onClick="editMember(${element.id})">Edit</a></li>`;
             
        });

        content.innerHTML = html;


    }).catch(error => {
        console.log(error);
    });

}

function deleteMember(id){

    let formData = {id};

     fetch('http://localhost:5000/api/members/', {
         method: 'DELETE',
         body: JSON.stringify(formData),
         headers: {
            'Content-Type' : 'application/json'
        }

     }).then(response => response.text())
     .then(response => console.log(response))
     .catch(error => console.log(error));
}

function editMember(id){

    fetch(`http://localhost:5000/api/members/${id}`)
    .then(res => res.json())
    .then( (data) => {

        document.querySelector('#fname').value = data[0].first_name;
        document.querySelector('#lname').value = data[0].last_name;
        document.querySelector('#email').value = data[0].email;
       
        document.querySelector('#ID').value = data[0].id;
    });
  
}

update.addEventListener('click', ()=> {

    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let email = document.querySelector('#email').value;
  
    let id = document.querySelector('#ID').value;

    let formData = { fname, lname, email, id };

    fetch('http://localhost:5000/api/members', {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

});

