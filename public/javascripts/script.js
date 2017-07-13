var App = (function () {
	let coun = 0;
	let home=location.origin;
	home='';
	function _bindEvent(){
        console.log('_bindEvent')
        $('#').on('click',_handleAddTask);
        $('#taskContainer').on('click','.taskItem .btn-delTask',_handleDeTask);
		//送出登入資料
		$('#login').on('click',function(){
			$('#login-sub').on('click',loginSub);
			$( ":input" ).keypress(function(event){
				if(event.which == 13){
					loginSub();
					return;
				}
			});
		});
		$('#logout').on('click',postLogout);
		$("#addSomething").on('click',function(){
			$('#senPost').on('click',senPost);
			$( ":input" ).keypress(function(event){
				if(event.which == 13){
					senPost();
					return;
				}
			});
		});
	}
	function loginSub(){
		console.log('loginSub');
		var username = $('#account').val();
		var password = $('#password').val();
		$.ajax({
		  type: 'POST',
		  url: home+'/login',
		  data: {
			  username:$('#account').val(),
			  password:$('#password').val()
		  },
		  success: function(data){
			  console.log(data);
			  $('#Modalogin').modal('hide');
			  $('#logout').removeClass('hidden');
			  $('#userinfo').removeClass('hidden');
			  $('#login').addClass('hidden');
			  $('#username').html(data.username);
			  $('#Name').html(data.name);
			  $('#Gender').html(data.gender);
			  $('#Address').html(data.address);
			  //location.replace('');
		  },
		  error: function(e,xhr,options){
			  console.log(e.status);
			  if(e.status==401)
				  alert('帳號或密碼錯誤');
			  else if(e.status==404)
				  alert('找不到此網頁');
		  },
		  dataType: "json"
		});
	}
	function senPost(){
		console.log('senPost');
		var title = $('#newTitle').val();
		var content = $('#newContent').val();
		var tags = $('#newTags').val();
		$.ajax({
		  type: 'POST',
		  url: home+'/posts',
		  data:{
			  title : $('#newTitle').val(),
			  content : $('#newContent').val(),
			  tags : $('#newTags').val()
		  },
		  success: function(data){
			  console.log(data);
			  listMainGet();
			  alert('成功惹喵');
			  $('#Modalpost').modal('hide');
		  },
		  error: function(e,xhr,options){
			  console.log(e.status);
			  alert(e.status+' 出現錯誤!');
		  },
		  dataType: "json"
		});
	}
	function listGet(){
		console.log('listGet');
		$.ajax({
		  type: 'GET',
		  url: home+'/posts',
		  success: function(data){
			  console.log(data);
			  for(i in data){
				  $('#listTxt').prepend(`<div class="row">
            <div class="col-md-7">
                <a href="#">
                    <img class="img-responsive" src="http://media.viralcham.com/wp-content/uploads/2015/05/dui.jpg" alt="">
                </a>
            </div>              
            <div class="col-md-5">
                <h3>${data[i].title}</h3>
                <h4>作者:${data[i].author.name}</h4>
				<h5>${moment(data[i].created_at).format('YYYY/MM/DD HH:mm:ss')}</h5>
				<div>${data[i].tags}</div>
                <p>${data[i].content}</p>
                <a class="btn btn-primary" href="#">完整內容<span class="glyphicon glyphicon-chevron-right"></span></a>
            </div>
        </div>`);
			  }
			  
		  },
		  error: function(e,xhr,options){
			  console.log(e.status);
		  },
		  dataType: "json"
		});
	}
	function listMainGet(){
		console.log('listMainGet');
		$.ajax({
		  type: 'GET',
		  url: home+'/posts',
		  success: function(data){
			  console.log(data);
			  for(i in data){
				  $('#mainlist').prepend(`<div class="row">
            <div class="col-md-7">
                <a href="#">
                    <img class="img-responsive" src="http://media.viralcham.com/wp-content/uploads/2015/05/dui.jpg" alt="">
                </a>
            </div>              
            <div class="col-md-5">
                <h3>${data[i].title}</h3>
                <h4>作者:${data[i].author.name}</h4>
				<h5>${moment(data[i].created_at).format('YYYY/MM/DD HH:mm:ss')}</h5>
				<div>${data[i].tags.map(function(value,j){
					return `<span class=""></span>`
				})}</div>
                <p>${data[i].content}</p>
                <a class="btn btn-primary" href="#">完整內容<span class="glyphicon glyphicon-chevron-right"></span></a>
            </div>
        </div>`);
			  }
			  
		  },
		  error: function(e,xhr,options){
			  console.log(e.status);
		  },
		  dataType: "json"
		});
	}
	function postLogout(){
		console.log('postLogout');
		$.ajax({
			type:'POST',
			url:home+'/logout',
			success:function(){
			    $('#logout').addClass('hidden');
			    $('#userinfo').addClass('hidden');
			    $('#login').removeClass('hidden');
				alert('您已成功登出!!');
			},
			error:function(e,xhr,options){
				console.log(e.status);
			},
			dataType:"json"
		});
	}
	function getLogin(){
		console.log('getLogin');
		$.ajax({
			type:'GET',
			url:home+'/login',
			success:function(){
			    $('#logout').removeClass('hidden');
			    $('#userinfo').removeClass('hidden');
			    $('#login').addClass('hidden');
			},
			error:function(e,xhr,options){
				console.log(e.status);
				//alert('您還沒登入喔\n');
			},
			dataType:"json"
		});
	}
	
	function _handleAddTask(){
		console.log('button clicked');
		var taskName = $('#input-taskName').val();
		var taskDesc = $('#input-taskDesc').val();
		$('#taskContainer').prepend(`<div class="row">
            <div class="col-md-7">
                <a href="#">
                    <img class="img-responsive" src="http://media.viralcham.com/wp-content/uploads/2015/05/dui.jpg" alt="">
                </a>
            </div>
            <div class="col-md-5">
                <h3>${editTitle}</h3>
                <h4>{{Author}}</h4>
				<h5>{{Time}}</h5>
				<div>${editTags}</div>
                <p>${editContent}</p>
                <a class="btn btn-primary" href="#">完整內容<span class="glyphicon glyphicon-chevron-right"></span></a>
            </div>
        </div>`);
		$('#editTitle').val('');
		$('#editTags').val('');
		$('#editContent').val('');
	}

	function _handleDeTask(){
		console.log('del');
		$(this).parents('.taskItem').remove();
	}

	function init() {
		console.log(home+'/post');
		var w = $( '#bored' ).width();
		var h = $( document ).height()-$('#navbar-top').height();
		$('#QQUGLY').width(w);
		$('#QQUGLY').height(h);
		console.log('init');
		listGet();
		//getLogin();
		listMainGet();
		_bindEvent();
	}

	return {
		init
	}
})();