let del_btn=document.getElementById("del-btn");
del_btn.addEventListener("click",async()=>{
    let id=del_btn.getAttribute("_id");
    let res=await fetch(`/listings/${id}`,{
        method:"DELETE"
});
let r=await res.json();
if(r.status==200){
    alert(r.message);

    window.location.href='/listings'
}
else{
    document.body.innerHTML=r;
}
});