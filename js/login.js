jQuery(document).ready(function(){

	function login(){
		cargando(true);
		jQuery.post(
			SERVER+"/login/login.php",
			jQuery("#form_login").serialize(),
			function(data){

				if( data.login ){

					jQuery(".menu ul").css("display", "none");

					switch( data.user.tipo ){

						case "subscriber":
							jQuery("#user_cliente").css("display", "block");
						break;

						case "administrator":
							jQuery("#user_cliente").css("display", "block");
						break;

						case "vendor":
							jQuery("#user_cuidador").css("display", "block");
						break;

					}

					app.onSetLogin( JSON.stringify( data ) );
					inicialiceSesion();

				}else{

					alert( data.men );
					cargando(false);

				}

			}, "json"
		);
	}

	jQuery("#form_login").submit(function(e){
		login();
		e.preventDefault();
		return false;
	});

	jQuery("#submit_login").on("click", function(e){
		login();
	});

	jQuery("#login_menu").on("click", function(e){
		jQuery("#login").css("display", "table");
		menu("cerrar");
	});
	
	jQuery("#cerrar_login").on("click", function(e){
		jQuery("#login").css("display", "none");
	});
	
	jQuery("#log_login").on("click", function(e){
		console.log( app.onGetLogin() );
	});

	function inicialiceSesion(){
		var sesion = app.onGetLogin();

		jQuery(".menu ul").css("display", "none");

		if( sesion != undefined ){

			switch( sesion.user.tipo ){

				case "subscriber":
					jQuery("#user_cliente").css("display", "block");
				break;

				case "administrator":
					jQuery("#user_cliente").css("display", "block");
				break;

				case "vendor":
					jQuery("#user_cuidador").css("display", "block");
				break;

			}

			if( sesion.user.img != "" && sesion.user.img != undefined ){
				jQuery(".img_portada div").css("background-image", "url("+sesion.user.img+")");
				jQuery(".img_portada").css("display", "block");
			}
			
			jQuery("#login").css("display", "none");
			jQuery("#login input").val("");
			menu("cerrar");
			cargando(false);

		}else{

			jQuery(".img_portada").css("display", "none");
			menu("cerrar");
			jQuery("#menu_no_logeado").css("display", "block");

		}
	}
	inicialiceSesion();
	
	function salir(){
		var confirmed = confirm("Esta seguro que desea cerrar sesi\u00F3n.?");
        if (confirmed == true) {
            window.localStorage.removeItem("login");
            inicialiceSesion();
        }
	}

	jQuery("#salir_cliente").on("click", function(e){
		salir();
	});

	jQuery("#salir_cuidador").on("click", function(e){
		salir();
	});

});