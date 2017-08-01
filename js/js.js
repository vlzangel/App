function cargando(status){
	if( status ){
		jQuery(".cargando").css("display", "table");
	}else{
		jQuery(".cargando").css("display", "none");
	}	
}

jQuery("#btn-menu").on("click", function(e){
	if( jQuery(".menu_container").css("left") == "0px" ){
		menu("cerrar");
	}else{
		menu("abrir");
	}
});

function menu(accion){
	switch(accion){
		case "abrir":
			jQuery(".menu_container").css({left: "0px"});
		break;
		case "cerrar":
			jQuery(".menu_container").css({left: "-100%"});
		break;
	}
}

jQuery("#btn-buscar").on("click", function(e){
	jQuery("#buscar").css("display", "block");
});

function aplicar_filtro(page){
	if( page == 0 ){
		jQuery("#perfil_box").css("z-index", "-200");
		jQuery("#listado_box").scrollTop(0);
		jQuery("#page").val(0);
	}else{
		jQuery("#cargar_mas").html("Cargando M&aacute;s...");
	}
	jQuery.post(
		SERVER+"/buscar.php",
		jQuery("#form_buscar").serialize(),
		function(data){

			if( data["cantidad"] == 0 ){
				jQuery("#cargar_mas").css("display", "none");
				jQuery("#cargar_mas").html("No hay mas resultados");
				CARGAR = false;
			}else{
				if( page == 0 ){
					CUIDADORES = data["resultados"];
				}

				var HTML = "";
				jQuery.each(data["resultados"], function( index, cuidador ) {
					if( page != 0 ){
						CUIDADORES.push(cuidador);
						var index = ( parseInt( jQuery("#page").val() )*15)+index;
					}

				  	HTML += "<div class='item' data-index='"+index+"'>";
				  	HTML += 	"<div class='item_cuidador_box'>";
				  	HTML += 		"<div class='img' style='background-image: url("+cuidador["img"]+");'></div>";
				  	HTML += 		"<div class='data'>";
				  	HTML += 			"<div class='item_nombre'>"+cuidador["titulo"]+"</div>";
				  	HTML += 			"<div class='item_favorito'><i class='fa fa-heart-o'></i></div>";
				  	HTML += 			"<div class='item_desde'><span>Desde:</span> "+cuidador["desde"]+"$</div>";
				  	HTML += 		"</div>";
				  	HTML += 	"</div>";
				  	HTML += 	"<div class='item_servicios'>"+vlz_servicios(cuidador["adicionales"])+"</div>";
				  	HTML += "</div>";
				});

				if( page == 0 ){
					jQuery("#listado").html( "" );
				}
				jQuery("#listado").append( HTML );

				jQuery("#cargar_mas").css("display", "block");

				menu("cerrar");

				initItems();

				jQuery("#buscar").css("display", "none");

				CARGAR = true;
				if( page == 0 ){
					jQuery("#page").val(1);
				}else{
					jQuery("#page").val( parseInt(jQuery("#page").val())+1 );
				}
			}

		}, "json"
	);
}
jQuery(".buscar_btn").on("click", function(e){
	aplicar_filtro(0);
});

jQuery("#cargar_mas").on("click", function(e){
	aplicar_filtro();
});

function initItems(){
	jQuery(".item").unbind( "click", function(e){} );
	jQuery(".item").bind("click", function(e){
		jQuery("#perfil_box .img_fondo_cuidador").css("background-image", "url("+CUIDADORES[ jQuery(this).attr("data-index") ]["img"]+")");
		jQuery("#perfil_box .img_cuidador").css("background-image", "url("+CUIDADORES[ jQuery(this).attr("data-index") ]["img"]+")");
		jQuery("#perfil_box .nom_cuidador").html( CUIDADORES[ jQuery(this).attr("data-index") ]["titulo"] );
		jQuery("#perfil_box .cuidador_descripcion").html( CUIDADORES[ jQuery(this).attr("data-index") ]["descripcion"] );
		jQuery("#perfil_box").css("z-index", "20");

		if( CUIDADORES[ jQuery(this).attr("data-index") ]["imgs"].length > 0 ){
			var imagenes = "";
			jQuery.each( CUIDADORES[ jQuery(this).attr("data-index") ]["imgs"], function( index, imagen ) {
				imagenes += "<div class='img_item' style='background-image: url("+imagen+")'></div>";
			});

			jQuery(".galeria_box").css("width", (CUIDADORES[ jQuery(this).attr("data-index") ]["imgs"].length*25)+"%" );
			jQuery(".galeria_box").html( imagenes );

			initImgsGalria();

			jQuery("#galeria_box").css("display", "block");
		}else{
			jQuery("#galeria_box").css("display", "none");
		}

		jQuery("#perfil_box #tipo_propiedad").html( CUIDADORES[ jQuery(this).attr("data-index") ]["tipo_propiedad"] );
		jQuery("#perfil_box #tamanos_aceptados").html( CUIDADORES[ jQuery(this).attr("data-index") ]["tamanos_aceptados"] );
		jQuery("#perfil_box #edades_aceptadas").html( CUIDADORES[ jQuery(this).attr("data-index") ]["edades_aceptadas"] );
		jQuery("#perfil_box #experiencia").html( CUIDADORES[ jQuery(this).attr("data-index") ]["experiencia"] );

		jQuery("#perfil_box #mascotas_en_casa").html( CUIDADORES[ jQuery(this).attr("data-index") ]["mascotas_en_casa"] );
		jQuery("#perfil_box #patio").html( CUIDADORES[ jQuery(this).attr("data-index") ]["patio"] );
		jQuery("#perfil_box #areas_verdes").html( CUIDADORES[ jQuery(this).attr("data-index") ]["areas_verdes"] );
		jQuery("#perfil_box #cantidad_mascotas").html( CUIDADORES[ jQuery(this).attr("data-index") ]["cantidad_mascotas"] );

		LATITUD = parseFloat( CUIDADORES[ jQuery(this).attr("data-index") ]["latitud"] );
		LONGITUD = parseFloat( CUIDADORES[ jQuery(this).attr("data-index") ]["longitud"] );

		setPosicion();

		jQuery("#perfil_box #cantidad_mascotas").html( CUIDADORES[ jQuery(this).attr("data-index") ]["cantidad_mascotas"] );

		jQuery("#perfil_box").scrollTop(0);
		jQuery(".galeria_container").scrollLeft(0);
	});
}

function setPosicion(){
	var posi = new google.maps.LatLng(
		LATITUD, 
		LONGITUD
	); 
	map.setCenter(posi);
	marker.setPosition(posi);
	map.setZoom(15);
}

function initImgsGalria(){
	jQuery(".galeria_box .img_item").unbind( "click", function(e){} );
	jQuery(".galeria_box .img_item").bind("click", function(e){

		jQuery("#perfil_box .img_fondo_cuidador").css("background-image", jQuery(this).css("background-image") );
		jQuery("#perfil_box .img_cuidador").css("background-image", jQuery(this).css("background-image") );

	});
}

jQuery("#close_cuidador").bind("click", function(e){
	jQuery("#perfil_box").css("z-index", "-200");
});

function vlz_servicios(adicionales){
    var r = ""; 
    adiestramiento = false;

    r += '<span><i title="Hospedaje" class="icon-hospedaje"></i></span>';
   
    if( Object.keys(adicionales).length > 0 ){
    	jQuery.each( adicionales, function( key, valor ) {
            switch (key) {
                case 'guarderia':
                    r += '<span><i title="Guardería" class="icon-guarderia"></i></span>';
                break;
                case 'adiestramiento_basico':
                    adiestramiento = true;
                break;
                case 'adiestramiento_intermedio':
                    adiestramiento = true;
                break;
                case 'adiestramiento_avanzado':
                    adiestramiento = true;
                break;
                case 'corte':
                    r += '<span><i title="Corte de pelo y uñas" class="icon-peluqueria"></i></span>';
                break;
                case 'bano':
                    r += '<span><i title="Baño y secado" class="icon-bano"></i></span>';
                break;
                case 'transportacion_sencilla':
                    r += '<span><i title="Transporte Sencillo" class="icon-transporte"></i></span>';
                break;
                case 'transportacion_redonda':
                    r += '<span><i title="Transporte Redondo" class="icon-transporte2"></i></span>';
                break;
                case 'visita_al_veterinario':
                    r += '<span><i title="Visita al Veterinario" class="icon-veterinario"></i></span>';
                break;
                case 'limpieza_dental':
                    r += '<span><i title="Limpieza dental" class="icon-limpieza"></i></span>';
                break;
                case 'acupuntura':
                    r += '<span><i title="Acupuntura" class="icon-acupuntura"></i></span>';
                break;
            }
		});
    }

    if(adiestramiento){
        r += '<span><i title="Adiestramiento de Obediencia" class="icon-adiestramiento"></i></span>';
    }
    return r;
}

jQuery(document).ready(function(){
	jQuery("#listado_box").scroll(function(){
		var curScroll = jQuery(this)[0].scrollTop,
            maxScroll = jQuery(this)[0].scrollHeight - jQuery(this).height();

        if ((curScroll >= maxScroll - 100) && CARGAR) {
            CARGAR = false;
			aplicar_filtro();
        }
	});

	jQuery("#reservar").on("click", function(e){
		jQuery("#perfil_box").scrollTop(0);
		jQuery(".galeria_container").scrollLeft(0);
	});

	jQuery("#form_buscar").submit(function(e){
		aplicar_filtro();
		e.preventDefault();
		return false;
	});

	jQuery('.boton_servicio > input').on('change',function(e){
        var activo = jQuery(this).prop('checked');
        if(activo) jQuery( this ).parent().addClass('check_select');
        else jQuery( this ).parent().removeClass('check_select');
    });

    jQuery('label > input').on('change',function(e){
        var activo = jQuery(this).prop('checked');
        jQuery( ".por_ubicacion" ).removeClass('input_select');
        if(activo) jQuery( this ).parent().addClass('input_select');

        switch( jQuery(this).parent().attr("for") ){
            case "mi-ubicacion":
                jQuery(".selects_ubicacion_container").hide();
            break;
            case "otra-localidad":
                jQuery(".selects_ubicacion_container").show();
            break;
        }

    });

    jQuery('.adicionales_button').on('click', function(){
        if( jQuery('.modal_servicios').css('display') == 'none' ){
            jQuery('.modal_servicios').css('display', 'table');
        }else{
            jQuery('.modal_servicios').css('display', 'none');
        }
    });

    jQuery('#close_mas_servicios').on('click', function(){
        jQuery('.modal_servicios').css('display', 'none');
    });

    jQuery('#menu_close').on('click', function(){
        menu("cerrar");
    });

    jQuery('#camara').on('click', function(){
        navigator.camera.getPicture(
        	function(imageData) {

			    jQuery(".img_portada div").css("background-image", "url("+"data:image/jpeg;base64,"+imageData+")");

			}, 
			function(message) {
			    alert('Failed because: ' + message);
			}, 
			{ 
				quality: 50,
		    	destinationType: Camera.DestinationType.DATA_URL
			}
		);
    });

    jQuery('#galeria').on('click', function(){
        navigator.camera.getPicture(
        	function(imageData) {

			    // jQuery("#prueba_img_2").attr("src", "data:image/jpeg;base64,"+imageData);
			    jQuery(".img_portada div").css("background-image", "url("+"data:image/jpeg;base64,"+imageData+")");

			}, 
			function(message) {
			    alert('Failed because: ' + message);
			}, 
			{ 
				quality: 50,
		    	destinationType: Camera.DestinationType.DATA_URL,
        		sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
			}
		);
    });

});