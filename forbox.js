var thisob=[]; //這個頁面要放置的物件
var coo="";

var xmlhttp;
function CreateXMLHttpRequest(url, statecheck){
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=statecheck;
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}

function app(e){
  game(e);
}

function del(){document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function ge(at){//啥
  thisob=at;
  let have=getCookie("username"); //列出已擁有物件
  var now="";
  console.log(have);
  for (var i = 0; i < have.length; i++) {
    if (i%3==2) { //每三位數檢查一次
      now=now+have[i];
      var ch=0;
      for (var j = 0; j < thisob.length; j++) { //擁有對比此頁
        console.log(j);
        if (thisob[j]==now) { //命中
          //console.log(thisob[j]);
          console.log("hit");
          console.log(now);
          app(now);
          now="";
        }
        else { //miss
          console.log("miss");
          ch++;
          if (ch==3 && j==2) { //在檢查到最後一位如仍未符合則加入已存在cookie
            coo=coo+now;
            console.log(now);
            setCookie("username", coo, 1);
            create(now);
            now="";
          }
        }
      }
    }
    else{
      now=now+have[i];
    }
  }
  console.log(coo);
}

function game(e){
  var item=document.getElementById(e); //點擊物件ID
  var goal=document.getElementById("own"); //擁有的區塊ID
  goal.append(item); //把物件移到擁有區塊
  item.setAttribute("onclick","alchemy(this.id)"); //更換成煉金術函數
  coo=coo+e;

  setCookie("username", coo, 1);
  console.log(getCookie("username"));

}

var state=0;
function alchemy(ae){
  var item=document.getElementById(ae); //點擊物件ID
  if(state==0){
    item.setAttribute("onclick","remo(this.id)");
    var goal=document.getElementById("alpha"); //配方的區塊 1 ID
    goal.append(item);
    state++;
    //console.log(state);

  }
  else if (state==1) {
    item.setAttribute("onclick","remo(this.id)");
    if (document.getElementById("alpha").childNodes.length==1){
      var goal=document.getElementById("beta"); //配方的區塊 2 ID
    }
    else{
      var goal=document.getElementById("alpha"); //配方的區塊 2 ID
    }
    goal.append(item);
    state++;
  }
}

function remo(re){
  console.log("load remo success");
  var item=document.getElementById(re);
  var goal=document.getElementById("own");
  goal.append(item);
  item.setAttribute("onclick","alchemy(this.id)");
  if (state!=0){
    state--;
    //console.log(state);
  }
}


function mix(){
  console.log("success load mix");
  if (state==2){
    var FList;
    var hit=false;
    CreateXMLHttpRequest("alch.xml", function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
        console.log("suc");
        xmlDoc=xmlhttp.responseXML;
        console.log(xmlDoc);
        FList=xmlDoc.getElementsByTagName("FINGRE");
        console.log(FList);
        for (var i = 0; i < FList.length; i++) {
            if(FList[i].getAttribute('name')==document.getElementById("alpha").children[0].id){
              SList=xmlDoc.getElementsByTagName("FINGRE")[i].getElementsByTagName("SINGRE");
              console.log(SList);
              for (var j = 0; j < SList.length; j++) {
                if(SList[j].getAttribute('name')==document.getElementById("beta").children[0].id){
                  try{
                    if(document.getElementById(SList[j].childNodes[0].nodeValue).id==SList[j].childNodes[0].nodeValue){
                      hit="exit";

                    }
                  }
                  catch{
                    hit=true;
                    if(SList[j].childNodes[0].nodeValue=="fou"){
                      window.alert("企通爆掉了QQQ");
                    }
                    else if (SList[j].childNodes[0].nodeValue=="six") {
                      window.location.replace("https://youtu.be/FXg4LXsg14s?t=74")
                    }
                    else{
                      create(SList[j].childNodes[0].nodeValue);
                    console.log(coo);
                    coo=coo+SList[j].childNodes[0].nodeValue;
                    del();
                    setCookie("username", coo, 1);
                    console.log(getCookie("username"));
                    }
                    
                    
                    
                  }
                }
              }
            }

        }
        if(hit==false){
          document.getElementById("gama").setAttribute("style","background-color:white;");
          setTimeout(() => {
          document.getElementById("gama").setAttribute("style","background-color:#34a0b6;");
          }, 1000)
          var k=document.getElementById("alpha").children
          console.log(document.getElementById("alpha").children[0].id);
        }
        else if (hit=="exit") {
          document.getElementById("gama").setAttribute("style","background-color:black;");
          setTimeout(() => {
          document.getElementById("gama").setAttribute("style","background-color:#34a0b6;");
          }, 1000)
          var k=document.getElementById("alpha").children
          console.log(document.getElementById("alpha").children[0].id);
        }
      }//連線引號
    });

  }
  else {
    document.getElementById("gama").setAttribute("style","background-color:white;");
    setTimeout(() => {
    document.getElementById("gama").setAttribute("style","background-color:#34a0b6;");
    }, 1000)
    var k=document.getElementById("alpha").children
    console.log(document.getElementById("alpha").children[0].id);
      //lab尚未被填滿時會出現錯誤提示 選項會反白
  }
}



function create(newid){
  console.log(newid);
  var TList;
  CreateXMLHttpRequest("ob.xml", function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      console.log("connection success");
      xmlDoc=xmlhttp.responseXML;
      console.log(xmlDoc);
      TList=xmlDoc.getElementsByTagName("OB");
      console.log(TList);
      for (var q = 0; q < TList.length; q++) {
        if (newid==TList[q].getAttribute('name')){
          console.log(TList[q].getAttribute('name'));
          console.log(q);
          var ne = document.createElement(TList[q].getAttribute('type'));
          KList=xmlDoc.getElementsByTagName("OB")[q].getElementsByTagName("ATTR");
          for (var k = 0; k < KList.length; k++) {
            ne.setAttribute(KList[k].getAttribute('name'),KList[k].getAttribute('val'));
          }
          document.getElementById("own").append(ne) ;
          try {
            remo(document.getElementById("alpha").children[0].id);
            remo(document.getElementById("beta").children[0].id);
          } catch (e) {
            console.log("ge");
          }

        }
      }

    } //成功連線
  }
);
}
del();