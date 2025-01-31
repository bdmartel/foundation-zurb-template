/*-----------------------------------------------------------------------------------*/
/* TUMBLR 'PHOTOSET' STYLE PROTO GALLERY
/*-----------------------------------------------------------------------------------*/ 

if(!Util)
{
	var Util={}
}
Util.windowDimensions=function(){
	if( window.innerWidth!==undefined )
	{
		return { width:window.innerWidth,height:window.innerHeight }
	} else {
		if ( document.documentElement )
		{
			return { width:document.documentElement.clientWidth, height:document.documentElement.clientHeight }
		} else {
			return { width:document.body.clientWidth, height:document.body.clientHeight }
		}
	}
};
Util.Lightbox= (function(){
	var _initialized=false;
	var _original_onkeydown=false;
	var _original_onresize=false;
	var _image_urls=[];
	var _just_clicked_photo=false;
	var _position=false;
	var _cas=false;
	var _show_vignette_timeout=false;
	var _images={left:false,center:false,right:false};
	function init(image_urls,position){
		if (document.getElementById("Util_lightbox"))
		{
			return
		}
		if (!position)
		{
			position=1
		}
		_image_urls=image_urls;
		if(navigator&&navigator.userAgent.indexOf("Firefox")!=-1)
		{
			var focus_input=document.createElement("input");
			focus_input.setAttribute("id","Util_Lightbox_focus_input");
			focus_input.setAttribute("type","text");
			focus_input.style.position="fixed";
			focus_input.style.top=0;
			focus_input.style.left=0;
			document.body.appendChild(focus_input);
			focus_input.focus();
			document.body.removeChild(focus_input)
		} else {
			window.focus()
		} 
		if ( !_initialized )
		{
			if ( window.onkeydown )
			{
				_original_onkeydown=window.onkeydown
			}
			window.onkeydown = function(e){
				if ( document.getElementById("Util_lightbox") )
				{
					if ( !e )
					{
						e=window.event
					}
					var code=e.charCode?e.charCode:e.keyCode;
					if( !e.shiftKey&&!e.ctrlKey&&!e.altKey&&!e.metaKey )
					{
						if(code==37)
						{
							if(_position>1)
							{
								setPosition(_position-1)
							}
						}
						else {
							if( code==39 )
							{
								if(_position<_image_urls.length)
								{
									setPosition(_position+1)}
								}
								else {
									if(code==27||code==32||code==74||code==75)
									{
										close()
									}
							}
						}
					} else {
						if( (e.ctrlKey||e.metaKey)&&code==87 )
						{
							close();
							return false
						}
					}
				}
				if(_original_onkeydown){
					_original_onkeydown()
				}
			};
			if(window.onresize){
				_original_onresize=window.onresize
			}
			window.onresize=function(){
				if(document.getElementById("vignette"))
				{
					document.getElementById("vignette").style.display="none";
					if(_show_vignette_timeout)
					{
						clearTimeout(_show_vignette_timeout)
					}
					_show_vignette_timeout=setTimeout( 
						function()
						{
							document.getElementById("vignette").style.display="inline-block"
						},100)
				}
				draw();
				if(_original_onresize)
				{
					_original_onresize()
				}
			};
			if(navigator&&navigator.userAgent.search("iPad")!=-1 || navigator&&navigator.userAgent.search("iPhone")!=-1)
			{
				var initX;
				document.addEventListener("touchstart", function(e){
					var touch = e.changedTouches[0];
					initX = touch.pageX; 
				},false);
				document.addEventListener("touchmove",function(e){
					if ( document.getElementById("Util_lightbox") )
					{
						
						var touch = e.changedTouches[0];
						var curX = touch.pageX;
						if ( curX - initX > 20 )
						{
							if(_position>1)
							{
								setPosition(_position-1);
								initX = 0;
							}
						}
						if ( curX - initX < -20 )
						{
							if(_position<_image_urls.length)
							{
								setPosition(_position+1);
								initX = 0;
							}
						
						}
					}
				},false);
				
				document.addEventListener("touchend", function(e){
					initX = 0;
				},false)

			}
			_initialized=true
		}
		document.body.style.overflow="hidden";
		var container=document.createElement("div");container.setAttribute("id","Util_lightbox");
		if(navigator&&navigator.userAgent.search("iPad")!=-1)
		{
			container.style.position="absolute";
			container.style.top=document.body.scrollTop+"px";container.style.height=window.innerHeight+"px"
		} else {
			container.style.position="fixed";
			container.style.top="0px";
			container.style.bottom="0px"
		}
		container.style.left="0px";
		container.style.right="0px";
		container.style.zIndex=4294967294;
		container.style.overflow="hidden";
		container.style.backgroundColor=( navigator&&navigator.userAgent.indexOf("MSIE")!=-1)?"#222":"rgba(15,15,15,0.95)";
		container.onclick=function(){
			if(_just_clicked_photo)
			{
				_just_clicked_photo=false
			} else {
				close()
			}
		};
		if(!(navigator&&navigator.userAgent.search("iPad")!=-1)&&!(navigator&&navigator.userAgent.search("MSIE")!=-1))
		{
			var vignette=document.createElement("img");
			vignette.setAttribute("id","vignette");
			vignette.setAttribute("src","img/fullPageBG.png");
			vignette.style.position="absolute";
			vignette.style.width="100%";
			vignette.style.height="100%";
			vignette.style.left="0px";
			vignette.style.top="0px";
			container.appendChild(vignette);
			var vignette_cover=document.createElement("div");
			vignette_cover.style.position="absolute";
			vignette_cover.style.width="100%";
			vignette_cover.style.height="100%";
			vignette_cover.style.left="0px";
			vignette_cover.style.top="0px";
			container.appendChild(vignette_cover)
		}
		var center_container=document.createElement("div");
		center_container.style.position="absolute";
		center_container.style.left="50%";
		center_container.style.top="50%";
		container.appendChild(center_container);
		var stages=["left","center","right"];
		while(stage_name=stages.pop())
		{
			var link=document.createElement("a");
			link.setAttribute("id","Util_lightbox_"+stage_name+"_link");
			link.setAttribute("href","#");
			if(_image_urls.length<2){
				link.style.cursor="default"
			}
			center_container.appendChild(link);
			var img=document.createElement("img");
			img.setAttribute("id","Util_lightbox_"+stage_name+"_image");
			img.setAttribute("src","http://assets.Util.com/images/x.gif");
			img.style.mozBorderRadius="3px";
			img.style.webkitBorderRadius="3px";
			img.style.borderRadius="3px";
			if(navigator&&navigator.userAgent.indexOf("Chrome")!=-1)
			{
				img.style.moxBoxShadow="0 4px 30px rgba(0,0,0,1)";
				img.style.webkitBoxShadow="0 4px 30px rgba(0,0,0,1)";
				img.style.boxShadow="0 4px 30px rgba(0,0,0,1)"
			}
			img.style.borderWidth="0px";
			img.style.position="absolute";
			if(stage_name=="center")
			{
				img.style.zIndex=4294967295
			}
			link.appendChild(img)
		}
		var caption=document.createElement("div");
		caption.setAttribute("id","Util_lightbox_caption");
		caption.style.position="absolute";
		caption.style.textAlign="center";
		caption.style.font="bold 17px 'HelveticaNeue','Helvetica','Arial',sans-serif";
		caption.style.color="#fff";
		caption.style.paddingTop="20px";
		caption.style.textShadow="0 4px 30px rgba(0,0,0,1)";
		caption.style.display="inline-block";
		caption.style.textRendering="optimizeLegibility";
		center_container.appendChild(caption);
		document.body.appendChild(container);
		setPosition(position);
		draw()
	} //End lightbox Init
	function close(){
		document.body.style.overflow="";
		document.getElementById("Util_lightbox").style.display="none";
		document.body.removeChild(document.getElementById("Util_lightbox"))
	}
	function setPosition(position){
		_position=position;
		_cas=Math.round(Math.random()*1000000000000);
		document.getElementById("Util_lightbox_left_link").onclick=function(){
			_just_clicked_photo=true;
			setPosition(position-1);
			return false
		};
		if( _image_urls.length==1 )
		{
			document.getElementById("Util_lightbox_center_link").onclick=function(){return false}
		}  else {
			if(position<_image_urls.length)
			{
				document.getElementById("Util_lightbox_center_link").onclick=function(){
					_just_clicked_photo=true;
					setPosition(position+1);
					return false
				}
			} else { 
				document.getElementById("Util_lightbox_center_link").onclick=function(){
					_just_clicked_photo=true;
					setPosition(1);
					return false
				}
			}
		}
		document.getElementById("Util_lightbox_right_link").onclick=document.getElementById("Util_lightbox_center_link").onclick;
		_images.left=false;
		_images.center=false;
		_images.right=false;
		loadImage("center",position-1);
		if( position>1 )
		{
			loadImage("left",position-2)
		}
		if ( position<_image_urls.length )
		{
			loadImage("right",position)
		}
		if ( position+1<_image_urls.length )
		{
			var preload_img=new Image();
			preload_img.src=_image_urls[position+1].low_res
		}
	}
	function loadImage(stage,image_offset)
	{
		var high_res_img=new Image();
		var low_res_img=false;
		high_res_img.className=_cas;
		high_res_img.onload=function(){
			if(this.className==_cas)
			{
				this.className="high-res";
				_images[stage]=this;draw()
			}
		};
		high_res_img.src=_image_urls[image_offset].high_res;
		if ( !high_res_img.complete )
		{
			low_res_img=new Image();
			low_res_img.className=_cas;
			low_res_img.onload=function(){
				if (this.className==_cas&&(!_images[stage]||_images[stage].className=="placeholder"))
				{
					this.className="low-res";
					_images[stage]=this;
					draw()
				}
			};
			low_res_img.src=_image_urls[image_offset].low_res;
			if(_image_urls[image_offset].width&&_image_urls[image_offset].height)
			{
				if(low_res_img)
				{
					low_res_img.style.maxWidth=_image_urls[image_offset].width+"px";
					low_res_img.style.maxHeight=_image_urls[image_offset].height+"px"
				}
				high_res_img.style.maxWidth=_image_urls[image_offset].width+"px";
				high_res_img.style.maxHeight=_image_urls[image_offset].height+"px"
			}
			if(!low_res_img.complete&&(_image_urls[image_offset].width&&_image_urls[image_offset].height))
			{
				_images[stage]=new Image(_image_urls[image_offset].width,_image_urls[image_offset].height);
				_images[stage].style.maxWidth=_image_urls[image_offset].width+"px";
				_images[stage].style.maxHeight=_image_urls[image_offset].height+"px";
				_images[stage].src="http://assets.Util.com/images/x.gif";
				_images[stage].className="placeholder"
			}
		}
	}
	function draw()
	{
		var stages=["right","left","center"];
		while(stage_name=stages.pop())
		{
			var stage=document.getElementById("Util_lightbox_"+stage_name+"_image");
			if(!stage)
			{
				continue
			}
			var image=_images[stage_name];
			if(!image){stage.style.display="none";
				continue
			} else {
				stage.style.display="inline-block"
			}
			var image_width=image.style.maxWidth?parseInt(image.style.maxWidth,10):image.width;
			var image_height=image.style.maxHeight?parseInt(image.style.maxHeight,10):image.height;
			if(Util.windowDimensions().width/Util.windowDimensions().height<image_width/image_height)
			{
				var scale=(_image_urls.length==1)?0.85:0.75;
				if(Util.windowDimensions().width*scale>image_width&&(image.className=="high-res"||image.style.maxWidth))
				{
					stage.style.width=image_width+"px";
					stage.style.height=image_height+"px"
				} else {
					stage.style.height=(image_height*((Util.windowDimensions().width*scale)/image_width))+"px";
					stage.style.width=(Util.windowDimensions().width*scale)+"px"
				}
			} else {
				if ( Util.windowDimensions().height*0.85>image_height&&(image.className=="high-res"||image.style.maxHeight) )
				{
					stage.style.width=image_width+"px";
					stage.style.height=image_height+"px" 
				} else { 
					stage.style.width=(image_width*((Util.windowDimensions().height*0.85)/image_height))+"px";
					stage.style.height=(Util.windowDimensions().height*0.85)+"px"
				}
			}
			if ( stage_name=="center" )
			{
				stage.style.left= (0-parseInt(stage.style.width,10)/2)+"px";
				stage.style.top=(0-parseInt(stage.style.height,10)/2)+"px"
			} else {
				stage.style[stage_name]=(0-(parseInt(stage.style.width,10)+Util.windowDimensions().width*0.42))+"px";
				stage.style.top=(0-parseInt(stage.style.height,10)/2)+"px"
			}
			stage.src=image.src;
			stage.style.backgroundColor=(image.className=="placeholder")?((navigator&&navigator.userAgent.indexOf("MSIE")!=-1)?"#444":"rgba(255,255,255,0.05)"):"transparent";
			if ( stage_name=="center"&&_image_urls[_position-1].caption )
			{
				document.getElementById("Util_lightbox_caption").innerHTML=_image_urls[_position-1].caption;
				document.getElementById("Util_lightbox_caption").style.width=(Util.windowDimensions().width*0.7)+"px";
				document.getElementById("Util_lightbox_caption").style.top=(parseInt(stage.style.height,10)*0.5)+"px";
				document.getElementById("Util_lightbox_caption").style.left=(0-Util.windowDimensions().width*0.35)+"px";
				document.getElementById("Util_lightbox_caption").style.display="block"
			} else {
				if (stage_name=="center")
				{
					document.getElementById("Util_lightbox_caption").style.display="none"
				}
			}
		}
	}
	return{init:init}
})();





