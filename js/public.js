function getByClassName(className){//document.getElementsByClassName浏览器兼容
	var nodes=document.body.childNodes;
	var result=[];
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].className===className){
          result.push(nodes[i]);
		}
	}
	return result;
}
function autoPlay(comment){//自动播放评论
   var tar=comment[0].parentNode;
   var flag=false;
   var out_comment=document.getElementById("out_comment");
   var in_comment=document.getElementById("in_comment");
   var totalH=in_comment.offsetHeight;
   var H=out_comment.offsetHeight;

  

   var play=setInterval(function(){
	   	if(flag===true){
	   		if((-1)*parseInt(tar.style.marginTop)>(totalH-H)){
                  clearInterval(play);
	   		}else{
	   			tar.style.marginTop=(parseInt(tar.style.marginTop)-1)+"px";	
	   	    }	   		  		
	   	}else{
	   		tar.style.marginTop=-1+"px";
	   		flag=true;
	   	}
   },30);

   var banners=document.getElementById("banners");
   point.children[0].style.backgroundColor="#ea4d3d";
   var index=1;
   console.log(point.length);
   setInterval(function(){
      banners.innerHTML="<img src='../images/guanggao"+index+".jpg'><div id='point'><span></span><span></span><span></span><span></span></div>";     
      var point=document.getElementById("point");
      point.children[index-1].style.backgroundColor="#ea4d3d";
      index++;
      if(index>4){
        index=1;
      }
   },3000);

}

window.onload=function(){
   
  	if(document.getElementsByClassName==undefined){
  	document.getElementsByClassName=getByClassName;
  	}
    loadDiv(data);
  	var comment=document.getElementsByClassName("comment");
  	autoPlay(comment);
    var content=document.getElementsByClassName("content");
    document.body.onclick=function(event){
        	var tar=event.target||event.srcElement;
        	if(tar.parentNode.id==="tab"){
        		for(var i=0;i<tar.parentNode.childNodes.length;i++){
        			tar.parentNode.childNodes[i].className="";
        		}
        		tar.className="on";
        	}else if(tar.parentNode.parentNode.className.match("header")=="header" && tar.tagName.toLowerCase()==="li"){
                for(var i=0;i<content.length;i++){
                	 content[i].style.display="none"
                }
                var liNodes=[];
        		for(var i=0;i<tar.parentNode.childNodes.length;i++){
               if(tar.parentNode.childNodes[i].nodeType!==3 && tar.parentNode.childNodes[i].tagName.toLowerCase()==="li"){
                  tar.parentNode.childNodes[i].className=""; 
                  liNodes.push(tar.parentNode.childNodes[i]);                          
               }
        		}
           
            for(var i=0;i<liNodes.length;i++){
              if(tar.getAttribute("index")==i+1){
              
                     content[i].style.display="block";
                                
                  }
            }
            
            tar.className="on";        
    	}
    }
    window.onscroll=function(){ 
            if(needLoad("articles")){
                var articles=document.getElementsById("articles");          
                var content=document.createElement("div");             
                content.className="article";
                articles.appendChild(content);
                var img=document.createElement("img");
                img.src="../images/jutou1.jpg";
            }
    }
}
function loadDiv(data){
    var content=document.getElementsByClassName("content");
    console.log(content.length);
    var addHtml="";
    for(var i=0;i<data.length;i++){
       addHtml+=addMuban(data[i]);
    }
    content[0].parentNode.innerHTML=content[0].parentNode.innerHTML+addHtml;
}
function addMuban(obj){
  var muban='<div class="content" style="display:none">'
            +'<div class="articles width830" id="articles">'
            +' <div class="content_header width830"><div><img src="../images/header_info.png"><span>'+obj.name+'</span></div></div>';
            for(var i=0;i<obj.content.length;i++){
                muban+='<div class="article">'
                +'<img src="'+obj.content[i].pic+'">'
              +'<h3><a href="#">'+obj.content[i].title+'</a></h3>'
              +'<p class="detail">'+obj.content[i].content+'</p>'
              +'<p class="article_foot"><span>'+obj.content[i].writer+'</span><span>'+obj.content[i].time+'</span><span>'+obj.content[i].read+'</span><span>'+obj.content[i].share+'</span></p>'
            +'</div> '       
          
        }
              muban+='</div><div class="info">'
              +'<div class="ranking_list ac_writer">'
              +' <div class="title">相关作家</div>'
              +' <div class="title sub">ACTIVE WRITER</div>'
              +' <div class="info_content">';
              for(var i=0;i<obj.writers.length;i++){
                muban+='<div class="writer">'
                        +'<img src="'+obj.writers[i].photo+'"> '                     
                        +'<p> <span class="active_writer">'+obj.writers[i].name+'</span><br/><span>'+obj.writers[i].detail+'</span></p>'
                    +'</div>' ;
              }
              muban+='</div>'
            +'</div>'
            +'<div class="ranking_list">'
              +'<div class="title">文章排行</div>'
             +' <div class="title sub">TOP ARTICLES</div>'
             +' <div id="tab">'
               +' <a href="javascript:;" class="on">日榜</a>'
               +' <a href="javascript:;" class="">周榜</a>'
              +'</div>'
             +' <div class="info_content">'
              +'  <ul id="ranking">';                             
                for(var i=0;i<obj.ranking.day.length;i++){
                   muban+='<li class="ranking_item"><span id="onrank">'+(i+1)+'</span>'+obj.ranking.day[i].title+'</li>';   
                }                               
                muban+='</ul>'
              +'</div>'
            +'</div>'
            +'</div>'
        +'</div>';    
    return muban; 
}

function getChildNodes(cparent){
   var result=[];
   for(var i=0;i<cparent.childNodes.length;i++){
      if(cparent.childNodes[i].className=="article"){
        result.push(cparent.childNodes[i]);
      }
   }
   return result;
}
function needLoad(cparent){
  var boxs=getChildNodes(cparent);
  var lastHeight=boxs[boxs.length-1].offsetTop;
  var scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;
  var screenHeight=document.documentElement.clientHeight;
  if(lastHeight<scrollHeight+screenHeight){
    return true;
  }else{
    return false;
  }
}