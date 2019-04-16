$(function() {

	isLogin()


	function isLogin() {
		$.get("http://localhost:3000/api/user/isLogin", function(res) {
			console.log(res);
			if (res.code) {
				$(".login").show();
				login()
			} else {
				$(".logined").show().text("hello, " + res.data.nickName)
			}
		})
	}

	function login() {
		$("#login").on("click", function() {
			var username = $("#username").val();
			var password = $("#password").val();
			if (username && password) {
				$.post("http://localhost:3000/api/user/login", {
					username: username,
					password: password
				}, function(res) {
					console.log(res);
					if(!res.code){
						alert(res.data);
						location.reload();
					}
				})
			} else {
				alert("用户名或密码为空")
			}

		})
	}
})