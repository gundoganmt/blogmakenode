document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search)
    var site_id = params.get('site_id');
  
    $('.save').on('click', function(e){
     const xhr = new XMLHttpRequest();
     var form_data = new FormData();
     var current_field = $(this).attr('data-current');
     $(this).text('Saving...');
  
     if(current_field == "general"){
       var url = '/general/' + site_id;

       var ins = document.getElementById('site_logo').files.length;
       if(ins > 0) {
         var size = document.getElementById('site_logo').files[0].size;
         if(size > 2*1024*1024) {
            alert("Site logo picture size is too big 2Mb max!")
            return;
          }
       }

       var ins = document.getElementById('site_icon').files.length;
       if(ins > 0) {
         var size = document.getElementById('site_icon').files[0].size;
         if(size > 2*1024*1024) {
            alert("Site icon picture size is too big! 2Mb max")
            return;
          }
       }
  
       var twitter = document.getElementById('twitter').value;
       var facebook = document.getElementById('facebook').value;
       var instagram = document.getElementById('instagram').value;
       var github = document.getElementById('github').value;
       var youtube = document.getElementById('youtube').value;
       var linkedin = document.getElementById('linkedin').value;

       var contactSwitch = document.getElementById('contactSwitch');
  
       var seo_title = document.getElementById('main_seo_title').value;
       var seo_desc = document.getElementById('main_seo_desc').value;
  
       form_data.append("contact_enabled", contactSwitch.checked);
       form_data.append("seo_title", seo_title);
       form_data.append("seo_desc", seo_desc);
       form_data.append('twitter', twitter);
       form_data.append('facebook', facebook);
       form_data.append('instagram', instagram);
       form_data.append('github', github);
       form_data.append('youtube', youtube);
       form_data.append('linkedin', linkedin);
       form_data.append("site_logo", document.getElementById('site_logo').files[0]);
       form_data.append("site_icon", document.getElementById('site_icon').files[0]);
     }
  
     else if (current_field == 'categ') {
       var url = '/site-categ/' + site_id;
       var categ_name = document.getElementById('categ_name').value;
       var categ_parent = document.getElementById('categ_parent').value;
       var seo_title = document.getElementById('seo_title').value;
       var seo_kw = document.getElementById('seo_kw').value;
       var seo_desc = document.getElementById('seo_desc').value;

       form_data.append("categ_name", categ_name);
       form_data.append('categ_parent', categ_parent);
       form_data.append('seo_kw', seo_kw);
       form_data.append("seo_title", seo_title);
       form_data.append("seo_desc", seo_desc);
     }
  
     xhr.open('POST', url)
     xhr.onload = () =>{
       if(xhr.status == 200){
         $(this).text('Save Changes');
         const result = JSON.parse(xhr.responseText);
         if(result.success){
           if(result.current_field == 'g'){
             Swal.fire({
              title: "Good job!",
              text: "Saved successfully!",
              type: "success",
              confirmButtonClass: 'btn btn-primary',
              buttonsStyling: false,
             });
             $("html, body").animate({ scrollTop: 0 }, "slow");
           }
           else if(result.current_field == 'c'){
             saveCateg(result.categ_name, result.categ_parent);
           }
           else if(result.current_field == 'so'){
             Swal.fire({
              title: "Good job!",
              text: "Saved successfully!",
              type: "success",
              confirmButtonClass: 'btn btn-primary',
              buttonsStyling: false,
             });
             $("html, body").animate({ scrollTop: 0 }, "slow");
           }
         }
         else{
           alert(result.msg);
         }
       }
     }
     xhr.send(form_data);
     return false;
   })
  
   function saveCateg(categ_name, categ_parent){
     var categ_list = document.getElementById('categ_list');

     if(categ_parent == 'none'){
        categ_list.innerHTML += '<div class="list-group list-group-root" id="' + categ_name +'">' +
        '<a href="#" class="list-group-item">' + categ_name + '</a>' +
        '</div>';
     }
     
     else{
        var root = $('#'+categ_parent);
        var lastchild = root.children().last()

        var listgrouphtml = '<div class="list-group">' + 
        '<a href="#" class="list-group-item">' + categ_name + '</a>' + 
        '</div>';

        var childhtml = '<a href="#" class="list-group-item">' + categ_name + '</a>'

        if(!lastchild.hasClass('list-group')){
          root.append(listgrouphtml);
        }
        else{
          lastchild.append(childhtml)
        }
     }
     
     $("html, body").animate({ scrollTop: 0 }, "slow");
     return false;
   }
  
    $(".addAuthor").click(function( event ) {
     const xhr = new XMLHttpRequest();
     var username = document.getElementById('username').innerText;
     var blog_id = $(this).attr('data');
     var csrf_token = document.getElementById('csrf_token').value;
     var form_data = new FormData();
     form_data.append('username', username);
     form_data.append('blog_id', blog_id);
     url = '/add-author';
  
     $(this).text('Adding...');
  
     xhr.open('POST', url)
     xhr.setRequestHeader("X-CSRFToken", csrf_token);
     xhr.onload = () =>{
       if(xhr.status == 200){
         const result = JSON.parse(xhr.responseText);
         if(result.success){
           Swal.fire({
            title: "Good job!",
            text: result.msg,
            type: "success",
            confirmButtonClass: 'btn btn-primary',
            buttonsStyling: false,
           });
           $("html, body").animate({ scrollTop: 0 }, "slow");
           $(this).text('Added');
         }
         else {
           alert(result.msg);
           $(this).text('Add');
         }
       }
     }
     xhr.send(form_data);
   })
  
    $(".search-author").click(function( event ) {
      const xhr = new XMLHttpRequest();
      author_username = document.getElementById('author_username').value;
      var csrf_token = document.getElementById('csrf_token').value;
      var form_data = new FormData();
      form_data.append('username', author_username);
      url = '/search-author';
  
      $(this).text('Searching...');
  
      xhr.open('POST', url)
      xhr.setRequestHeader("X-CSRFToken", csrf_token);
      xhr.onload = () =>{
        if(xhr.status == 200){
          const result = JSON.parse(xhr.responseText);
          if(result.success){
            document.getElementById('search_result').style.display = "";
            document.getElementById('username').innerText = author_username;
            document.getElementById('name').innerText = result.name;
            document.getElementById('surname').innerText = result.surname;
            $(this).text('Search');
          }
          else {
            alert(result.msg);
            $(this).text('Search');
          }
        }
      }
      xhr.send(form_data);
    })
  
    $(".connect-domain").click(function( event ) {
      const xhr = new XMLHttpRequest();
      var domain = document.getElementById('domain').value;
      var csrf_token = document.getElementById('csrf_token').value;
      var form_data = new FormData();
      var site_id = $(this).attr('data-site-id');
      form_data.append('domain', domain);
      url = '/connect_blog_domain/' + site_id;
  
      $(this).text('Connecting...');
  
      xhr.open('POST', url)
      xhr.setRequestHeader("X-CSRFToken", csrf_token);
      xhr.onload = () =>{
        if(xhr.status == 200){
          const result = JSON.parse(xhr.responseText);
          if(result.success){
            document.getElementById('domain_result').style.display = "";
            document.getElementById('DomainConnected').innerText = "https://" + domain;
            document.getElementById('point').innerText = "125.112.222.20";
            Swal.fire({
             icon: 'success',
             title: "Domain Connected!",
             text: "Set A record of your domain to 125.112.222.20.",
             type: "success",
             confirmButtonClass: 'btn btn-primary',
             buttonsStyling: false,
            });
            $(this).text('Connect');
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Invalid url!',
            })
            $(this).text('Connect');
          }
        }
      }
      xhr.send(form_data);
    })
    
  })
  