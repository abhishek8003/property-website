let edit_form=document.getElementById("edit-form");
let edit_btn=document.getElementById("edit-btn");
edit_btn.addEventListener("click",async(e)=>{
    e.preventDefault();
    if(edit_form.checkValidity()){
    let id=edit_btn.getAttribute("_id");
    let title = edit_form["listing[title]"].value;
    let description = edit_form["listing[description]"].value;
    let price = edit_form["listing[price]"].value;
    let location = edit_form["listing[location]"].value;
    let country = edit_form["listing[country]"].value;
    let listing={title,description,price,location,country};
    let res=await fetch(`/listings/${id}`,{
        method:'PUT',
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify({listing})
    });
    console.log(res)
    let r=await res.text();
    console.log(r);
    if(res.status==200){
        window.location.href=`/show/${id}`;
    }
    else{
        document.body.innerHTML=r;
    }
}
edit_form.classList.add('was-validated')
});
