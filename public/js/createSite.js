document.addEventListener('DOMContentLoaded', () => {
    var createButton = document.getElementById('createsite');
    var chooseButton = document.getElementsByName('choose');
    var template;
  
    chooseButton.forEach(function(btn){
      btn.onclick = () =>{
        template = btn.getAttribute('data-template');
        createButton.setAttribute('data-template', template);
      }
    })
  
    createButton.addEventListener('click', function(e){
     const xhr = new XMLHttpRequest();
     var site_name = document.getElementById('site_name');
     template = createButton.getAttribute('data-template');
     var url = '/create-site';
     var p = document.getElementById('error');

     const json = {
       'site_name': site_name.value.trim(),
       'template': template
     }
  
     xhr.open('POST', url)
     xhr.setRequestHeader("Content-type", "application/json");
  
     if(xhr.readyState){
       createButton.innerText = "Creating...";
     }
  
     xhr.onload = () =>{
       if(xhr.status == 200){
         const result = JSON.parse(xhr.responseText);
         if(result.success){
           window.location.href = result.msg;
         }
         else {
           p.innerText = result.msg;
           p.style.color = 'red';
           createButton.innerText = "Create";
         }
       }
     }
  
     xhr.onerror = () =>{
       p.innerText = "Something went wrong! Connection might lost.";
       p.style.color = 'red';
       createButton.innerText = "Create";
     }
  
     xhr.send(JSON.stringify(json));
     return false;
    })
  
    createButton.disabled = true;
  
    site_name.addEventListener('input', function(e){
      if(site_name.value.trim().length > 2 && site_name.value.trim().length < 30){
        createButton.disabled = false;
      }
      else{
        createButton.disabled = true;
      }
    })
  
  })
  