// content.js

// Author: Murray Grigo-McMahon
// License: Free Public Domian (data used may be under additional restrictions)
// Project: https://github.com/murraygm/Chrome-Read-With-A-Pinch-Of-Salt
// version: 0.5 Draft - 2019.05.05

var saltyImage = [chrome.runtime.getURL("/images/highsalt.png"), chrome.runtime.getURL("/images/medsalt.png"), chrome.runtime.getURL("/images/lowsalt.png"), chrome.runtime.getURL("/images/warning.png")]

var messageHeadStyle = '<span style="display:block; margin-top:10px; width:500px; transform: skewY(-10deg);">'

var highSaltMessage=messageHeadStyle + '<span style="padding:0px 0px; font-size:24px; line-height:32px; font-family: Impact, Charcoal, sans-serif; font-weight:bold; margin:2px 0px 10px 0px; background-color:#FFF; color:#000">WHOA!, <br>you\'re going to need a tonne of salt with this one.<br>And that\'s not good for your blood pressure.<br>Best try another news source.'  + '</span></span>';

var medSaltMessage=messageHeadStyle + '<span style="padding:0px 0px; font-size:24px; line-height:32px; font-family: Impact, Charcoal, sans-serif; font-weight:bold; margin:2px 0px 10px 0px; background-color:#FFF; color:#D00">YUCK, this needs some heavy seasoning.<br>Best balance with a couple of healthier sources.' + '</span></span>';

var lowSaltMessage=messageHeadStyle + '<span style="padding:0px 0px; font-size:24px; line-height:32px; font-family: Impact, Charcoal, sans-serif; font-weight:bold; margin:2px 0px 10px 0px; background-color:#FFF; color:#000">Careful, this needs a pinch of salt.<br>Don\'t spend too long and stick to a healthy balance of news sources.' + '</span></span>';

var satireMessage=messageHeadStyle + '<span style="padding:0px 0px; font-size:24px; line-height:32px; font-family: Impact, Charcoal, sans-serif; font-weight:bold; margin:2px 0px 10px 0px; background-color:#FFF; color:#000">😂 LOL, nothing serious in sight.<br>If you\'re looking for real news and not just a laugh, best head somewhere else.' + '</span></span>';


var siteFlaggedonload = 0;

var baddomainarr=[];

var hasbadlink =0;

window.onload=function(){
    var URLBits = window.location.href;
	console.log(URLBits);
	checklist.forEach(function(element, i) {
		//first check the main domain
		if(URLBits.includes(element.domain)){

			siteFlaggedonload = 1;
			
			var div=document.createElement("div"); document.body.appendChild(div);

			var salt=2;

			if(element.tags.indexOf("satire") >=0){
				div.innerHTML=satireMessage; 
				salt=2;
				div.style.backgroundColor="#fc0";
				div.style.color="#000";

				var whyMessageStyle='<p style="position:relative; font-size:14px; font-family: Impact, Charcoal, sans-serif; font-weight:bold; margin:50px 0px 10px 0px; color:#000">';



			} else {


				if(element.lists>2){
					
					div.innerHTML=highSaltMessage; 
					salt=0;
					div.style.backgroundColor="#D00";
					div.style.color="#FFF";

					var whyMessageStyle='<p style="position:relative; font-size:14px; font-family: Impact, Charcoal, sans-serif; font-weight:bold; margin:50px 0px 10px 0px; color:#fff">';

				} else if(element.lists==2){
					div.innerHTML=medSaltMessage; 
					salt=1;
					div.style.backgroundColor="#000";
					div.style.color="#000";

					var whyMessageStyle='<p style="position:relative; font-size:14px; font-family: Impact, Charcoal, sans-serif; font-weight:bold; margin:50px 0px 10px 0px; color:#fff">';

				} else {
					div.innerHTML=lowSaltMessage; 
					salt=2;
					div.style.backgroundColor="#000";
					div.style.color="#000";

					var whyMessageStyle='<p style="position:relative; font-size:14px; font-family: Impact, Charcoal, sans-serif; font-weight:bold; margin:50px 0px 10px 0px; color:#fff">';

				};
			};
			
			var whyMessage = whyMessageStyle+'Because it\'s flagged as:<br><span style="background-color:#FFF; color:#000; font-size:20px; display:inline-block; margin:4px 0px; padding:0px 6px;">'+ element.tags + '</span><br>on ' +element.lists + ' <a style="color:inherit" href="https://docs.google.com/spreadsheets/d/1ck1_FZC-97uDLIlvRJDTrGqBk0FuDe9yHkluROgpGS8/edit?usp=sharing">sources in the Unreliable News Sources list</a></p>';
			div.innerHTML+= whyMessage;
			div.innerHTML+='<br><button id="mgmClose" onclick="this.parentElement.style.display=\'none\';" style="font-size:14px; font-family: Impact, Charcoal, sans-serif; color:#000; background-color:#fff; padding:8px; margin:4px;">OK I GET IT</button>';
			div.style.backgroundImage="url('"+saltyImage[salt]+"')";
			div.style.backgroundRepeat="no-repeat";
			div.style.backgroundPosition = "bottom right";
			div.style.backgroundSize = "contain"
						div.style.position="absolute";
			div.style.left="0px";
			div.style.top="0px";
			div.style.width="600px";
			div.style.height="auto";
			div.style.fontSize="24px";
			div.style.zIndex=2147483647;
			div.style.padding="10px";
			div.style.border="4px solid #fff";
			div.style.margin="20px";
			div.style.boxShadow= "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

		}
		baddomainarr.push(element.domain);
		
		


			//console.log(element.domain);
	});

	if(!siteFlaggedonload){
			checklinks();
		}




}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function checklinks(){
	
	var allthelinks = [], l = document.links;

	//console.log(document.links);

	//NEED TO RESTRICT THE LINK TO JUST THE TOP LEVEL DOMAIN
	for(var i=0; i<l.length; i++) {
		var fullhost = l[i].host.split('.');
		var justTLD = fullhost.slice(-2).join('.');
		//console.log(l[i].host);
  		allthelinks.push(justTLD);
	};
	var allthelinksUnique = allthelinks.filter( onlyUnique );

	baddomainarr.forEach(function(domurl) {
		var badlink = allthelinksUnique.includes(domurl);
		
		if(badlink){
			//console.log(badlink + ' : ' + domurl);
			hasbadlink =1;

			var selectedHreflinks = document.querySelectorAll('a[href*="'+domurl+'"]');
			for(var h=0; h<selectedHreflinks.length; h++) {
				selectedHreflinks[h].style.backgroundColor='#F00';
				selectedHreflinks[h].style.color='#FFF';
				selectedHreflinks[h].style.padding='2px 20px';
				selectedHreflinks[h].style.backgroundImage="url('"+saltyImage[3]+"')";
				selectedHreflinks[h].style.backgroundRepeat="no-repeat";
				selectedHreflinks[h].style.backgroundPosition = "top left";
				selectedHreflinks[h].style.backgroundSize = "contain";


			};

			//console.log(selectedHreflinks);
		}
	});

	if(hasbadlink){
		var div=document.createElement("div"); document.body.appendChild(div);
		div.innerHTML='<span style="padding:0px 0px; font-size:24px; line-height:32px; font-family: Impact, Charcoal, sans-serif; font-weight:bold; margin:2px 0px 10px 0px; background-color:#FFF; color:#000">Careful. This site is OK, but there are a few links to some suspect sources.<br>Look for the <img style="width:30px" src="'+saltyImage[3]+'" > icon to avoid them</span>';
		div.style.color="#FFF";
		div.style.backgroundColor="#000";
		div.style.position="absolute";
		div.style.left="0px";
		div.style.top="0px";
		div.style.width="600px";
		div.style.height="auto";
		div.style.fontSize="24px";
		div.style.zIndex=2147483647;
		div.style.padding="10px";
		div.style.border="4px solid #fff";
		div.style.margin="20px";
		div.style.backgroundImage="url('"+saltyImage[2]+"')";
		div.style.backgroundRepeat="no-repeat";
		div.style.backgroundPosition = "bottom right";
		div.style.backgroundSize = "contain";
		div.style.boxShadow= "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
		div.innerHTML+='<br><button id="mgmClose" onclick="this.parentElement.style.display=\'none\';" style="font-size:14px; font-family: Impact, Charcoal, sans-serif; color:#000; background-color:#fff; padding:8px; margin:4px;">OK I GET IT</button>';
	};

}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {

    	var URLBits = window.location.href;
		//console.log(URLBits);


		checklinks();



		checklist.forEach(function(element, i) {
			if(URLBits.includes(element.domain)){
				console.log('ON THE LIST!');
				console.log('It is a bunch of:');
				console.log(element.tags)
			} 

  			//console.log(element.domain);
		});


		//console.log(checklist)


			
			
	
    }
  }
);