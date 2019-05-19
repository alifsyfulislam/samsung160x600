var swipe_gallery = document.querySelector('.swipe_gallery');
var swipe_box = document.querySelector('.swipe_box');



var leftData = [];
var preData = [];
for (var i = 0; i < 6; i++) {
    leftData[i] = i*160;
}
var x = 0;
var curX = 0;

var dx=1;
var myMoveHandler = (event) => {
    if(event.clientX) {
        var diff = event.clientX - curX;
        if(clicked && leftData[0]+diff<=0 && leftData[0]+diff>=-800) {
            for(var i=0; i<document.getElementsByClassName("sliderItem").length; i++) {
                document.getElementsByClassName("sliderItem")[i].style.left = (leftData[i]*1+diff)+"px";
                leftData[i]=leftData[i]*1+diff;
            }
            curX = event.clientX;
        }
        if (clicked && (event.clientX<10 || event.clientX>290)) {
            clicked = false;
            if (x + 20 < event.clientX) {
                //right
                dx = 5;
            } else if (x - 20 > event.clientX) {
                //left
                dx = -5;
            }
            scrollImage();
        }
    }

}
var scrollImage = () => {
    if (Math.abs(leftData[0])>= 665) {
        swipe_box.style.display = "none";
    }
    else {
        swipe_box.style.display = "block";
    }
    setTimeout( ()=> {
        if((dx<0 && preData[0]-160<leftData[0] && leftData[0]<=0 && leftData[0]>=-800)
            || (dx>0 && preData[0]+160>leftData[0] && leftData[0]<=0 && leftData[0]>=-800)) {
            for (var i = 0; i < document.getElementsByClassName("sliderItem").length; i++) {
                document.getElementsByClassName("sliderItem")[i].style.left = (leftData[i] * 1 + dx) + "px";
                leftData[i]=leftData[i]*1+dx;
            }
            scrollImage();
        }
    }, 5);
}
var clicked = false;
swipe_gallery.addEventListener('mousedown', (event)=> {
    if (event.clientX>10 && event.clientX<150) {
        clicked = true;
        x = Math.round(event.clientX);
        curX = x;
        for (var i = 0; i < document.getElementsByClassName("sliderItem").length; i++) {
            preData[i] = leftData[i];
        }
    }
});

swipe_gallery.addEventListener('mouseup', (event)=> {
    if (clicked &&event.clientX>10 && event.clientX<150) {
        clicked = false;
        if (x + 20 < event.clientX) {
            //right
            dx = 5;
        } else if (x - 20 > event.clientX) {
            //left
            dx = -5;
        }
        scrollImage();
    }
});
swipe_gallery.addEventListener('mousemove', myMoveHandler);
swipe_gallery.addEventListener('touchstart', function (event) {
    clicked = true;
    x = Math.round(event.touches[0].clientX);
    curX = x;
    for(var i=0; i<document.getElementsByClassName("sliderItem").length; i++) {
        preData[i] = leftData[i];
    }
});
swipe_gallery.addEventListener('touchend', function (event) {
    clicked = false;
    if(x+20<curX) {
        //right
        dx = 5;
    } else if(x-20>curX) {
        //left
        dx = -5;
    }
    scrollImage();
});



swipe_gallery.addEventListener('touchmove', function (e) {
    // stop touch event
    e.stopPropagation();
    e.preventDefault();

    // translate to mouse event
    var clkEvt = document.createEvent('MouseEvent');
    clkEvt.initMouseEvent('mousemove', true, true, window, e.detail,
        e.touches[0].screenX, e.touches[0].screenY,
        e.touches[0].clientX, e.touches[0].clientY,
        false, false, false, false,
        0, null);
    swipe_gallery.dispatchEvent(clkEvt);

    // or just handle touch event
    myMoveHandler(e);
}, false);







//call
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.querySelector('.call_now').addEventListener('click',function () {
        var link = "tel:08000300300";
        window.location.href = link;
        console.log(link);
    })
}















var title = document.querySelector('.title');
var counter = document.querySelector('.counter');
var sehriSet = [
    "0:0","3:39","3:39","3:39","3:39","3:39","3:39",
    "3:52","3:51","3:50","3:50","3:49",
    "3:49","3:48","3:48","3:47","3:47",
    "3:46","3:46","3:45","3:44","3:44",
    "3:43","3:43","3:42","3:42","3:41",
    "3:41","3:40","3:40","3:40","3:39",
    "3:39"
];
var iftarSet = [
    "0:0","18:46","18:46","18:46","18:47","18:47",
    "18:47","18:34","18:34","18:35","18:35",
    "18:36","18:36","18:36","18:37","18:37",
    "18:38","18:38","18:39","18:39","18:40",
    "18:40","18:41","18:42","18:42","18:42",
    "18:43","18:43","18:44","18:44","18:45",
    "18:45"
];
setInterval(function () {
    var today = new Date();
    var curDate = today.getDate();
    var curDate2 = Number(curDate);
    var curTime = today.getHours()*60*60+ today.getMinutes()*60+today.getSeconds();

    var checkIftar = iftarSet[curDate].split(":");
    var checkSehri = sehriSet[curDate].split(":");
    var timeIftar = checkIftar[0]*60*60 + checkIftar[1]*60;
    var timeSehri = checkSehri[0]*60*60 + checkSehri[1]*60;



    if (timeSehri<timeIftar && timeSehri>curTime && timeSehri>=0){
        checkSehriTime(curDate, curTime);
    }
    else if (timeSehri<timeIftar && timeIftar<curTime) {
        checkSehriTime(curDate, curTime);
    }
    else {
        checkIftarTime(curDate, curTime);
    }

},1000);

function checkIftarTime(todayDate, curTime) {
    var time = iftarSet[todayDate].split(":");
    var setTime = time[0]*60*60 + time[1]*60;
    var diffTime = setTime - curTime;
    if (diffTime<setTime && diffTime>=0){
        title.innerHTML = " à¦‡à¦«à¦¤à¦¾à¦°à§‡à¦° à¦¸à¦®à§Ÿ à¦¬à¦¾à¦•à¦¿ ";
        counter.innerHTML = printTimer(diffTime);
    }
}

function checkSehriTime(todayDate, curTime) {
    var time = sehriSet[todayDate].split(":");
    var setTime = time[0]*60*60 + time[1]*60;
    var diffTime = setTime - curTime;

    if (diffTime<setTime && diffTime>=0){
        title.innerHTML = " à¦¸à§‡à¦¹à§‡à¦°à§€à¦° à¦¸à¦®à§Ÿ à¦¬à¦¾à¦•à¦¿ ";
        counter.innerHTML = printTimer(diffTime);
    }
    else {
        var lastTime = setTime+24*60*60;
        var sehriEnd = lastTime - curTime;
        title.innerHTML = " à¦¸à§‡à¦¹à§‡à¦°à§€à¦° à¦¸à¦®à§Ÿ à¦¬à¦¾à¦•à¦¿ ";
        counter.innerHTML = printTimer(sehriEnd);
    }
}

function printTimer(sec) {
    hr = Math.floor(sec / 3600) % 24;
    mm = Math.floor(sec / 60) % 60;
    ss = sec % 60;

    var x = hr < 10? "0"+hr : hr;
    var y = mm < 10? "0"+mm : mm;
    var z = ss < 10? "0"+ss : ss;
    return ( x+":"+y+":"+z)
}





var submitted=false;
let number_submit = document.querySelector(".number_submit .btn");
let number_submit_area = document.querySelector(".number_submit");
let label_box = document.querySelector(".label_box");
let input_box = document.querySelector(".input_box");
let mobile_num =document.querySelector(".mobile_num");

mobile_num.onkeyup=function(){
    mobValue= this.value.replace(/([^0-9\+]+)?(\+88)?([^0-9\+]+)?/ig, '');
    var res= /^(\+88)?(01[3-9]{1})([0-9]{8})+$/.test(mobValue);
    if(res){
        mobile_num.style.border="2px solid #008000";
        label_box.style.color="#05509e";
        mobileOk=res;
        label_box.innerHTML ="It's valid number ";
    }else{
        mobile_num.style.border="2px solid #f00";
        label_box.style.color="#f00";
        label_box.innerHTML ="Give a valid BD Number";
        mobileOk=null;
    }
    setTimeout(()=>mobile_num.style.borderWidth="1px",3e3);
}


number_submit.addEventListener("click",submitNumber);
// window.top.location.href

function submitNumber(){
    var xhttp = new XMLHttpRequest();
    if(!submitted && mobileOk){
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhttp.responseText);
                submitted=true;
                label_box.style.display="none";
                number_submit_area.innerHTML='<b>Thank You.</b>';
            }
        };
        xhttp.open("POST", '//srpp.cubex.tech/samsung/ramadan/info/index.php', true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send('info='+[mobValue, window.top.location.href]);
    }
}

document.querySelector(".learnmore").addEventListener("click",function(){
    window.open("https://www.facebook.com/watch/?v=427786334666392&utm_source=wizards&utm_medium=cpc&utm_campaign=ce%20tv&utm_term=lpv&utm_content=CETV_samsung","_blank");
});
