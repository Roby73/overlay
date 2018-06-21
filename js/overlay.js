/*
 * overlay.js
 *
 * Author: Roberto AGOSTINO 
 * Date: June 2018
 */

/*
 * USAGE:
 * In the main page (top level), insert a row as the following to include this script:
 * 
 *  <script type="text/javascript" src="js/overlay.js"></script>
 * 
 * Customize the function: overlay(disableOverlay) with the name of frames, and the message you want show
 *      disableOverlay=false, overlay the frames and show a message;
 *      when you call the function with disableOverlay=true, it restores the previous screen.
 * 
 * When you need to overlay the frames, call the method: [parent.]overlay(); 
 * 
 */

 /**
  * the function is called to hide and show the frames
  * 
  * @param {boolean} enable the boolean flag to show a message and all frame hidden
  * @param {msg: '', link: '', frameName: ''} alert information about the message to show, if enable=true
  */
function overlayAll(enable, alert) {
    var funcAction= (enable) ? addDivOverlay : removeDivOverlay;
    var showMessage = false;
    if ( typeof alert=="object" ) {
        // alert= {msg: '', link: '', frameName: ''}
        showMessage = ('msg' in alert && 'link' in alert && 'frameName' in alert);
    }
    var framesList= document.getElementsByTagName("frame");
    if ( framesList.length>0 ) {
        for (var i=0; i< framesList.length; i++) {
            if (showMessage && framesList[i].name==alert['frameName']) {
                funcAction( framesList[i], alertMsgDiv(alert['msg'], alert['link']) );
            } else {
                funcAction( framesList[i] );
            }
        }
    }
}

/**
 * the customizable function to call to hide and to show the frames
 * 
 * @param {boolean} action 
 */
function overlay( action ) {
    alert("aaa");
    if ( !action ) {
        // overlay all frames
        addDivOverlay( getItem("header","header") );
        addDivOverlay( getItem("menu","menu") );
        addDivOverlay( getItem("main","main"), alertMsgDiv("questo è il messaggio!", "\\") );
        addDivOverlay( getItem("footer","footer") );
    } else {
        removeDivOverlay( getItem("header","header") );
        removeDivOverlay( getItem("menu","menu") );
        removeDivOverlay( getItem("main","main") );
        removeDivOverlay( getItem("footer","footer") );
    }
}

function getItem(n,i) {
    if ( i ) {
        return document.getElementById(i);
    }
    else if ( n )
    {
        return document.getElementsByName(n)[0];
    }
}

function alertMsgDiv(msg, link) {
    var alertDiv= document.createElement("div");

    // style 
    alertDiv.style.width= "400px";
    alertDiv.style.height= "100px";
    alertDiv.style.margin= "100px auto";
    alertDiv.style.backgroundColor= "#fff";
    alertDiv.style.border= "3px solid #000";
    alertDiv.style.borderRadius= "15px";
    alertDiv.style.padding= "15px";
    alertDiv.style.textAlign= "center";
    alertDiv.style.opacity= "1";

    alertDiv.style.position= "absolute";
    //alertDiv.style.top= ( window.innerHeight + 100)/ + "px";
    alertDiv.style.top= "130px";
    alertDiv.style.left= (window.innerWidth + 400)/4 + "px";

    // 
    var alertP= document.createElement("p");
    alertP.innerText= msg;
    alertDiv.appendChild(alertP);
    if (link) {
        var lnkA= document.createElement("a");
        lnkA.href="#";
        lnkA.innerText="chiudi";
        lnkA.onclick= function() { 
            //overlay( false );  // remove overlay divs
            overlayAll( false );
            document.location = link;
        }
        alertDiv.appendChild(lnkA);
    }
    return alertDiv;
}

function createOverlayDiv() {
    var oDiv= document.createElement("div");
    oDiv.className= "overlay";
    oDiv.style.position= "absolute";
    oDiv.style.left= "0";
    oDiv.style.top= "0";
    oDiv.style.width= "100%";
    oDiv.style.height= "100%";
    oDiv.style.backgroundColor= "grey";
    oDiv.style.opacity= ".4";
    return oDiv;
}

function removeDivOverlay(fObj) {
    if ( fObj ) {
        var overLDivs= fObj.contentDocument.getElementsByClassName("overlay"); 
        if ( overLDivs.length>0 ) {
            for (var i=0; i< overLDivs.length; i++) {
                overLDivs[i].parentNode.removeChild(overLDivs[i]);
            };
        }
    }
}

function addDivOverlay(fObj, msgDiv) {
    if ( fObj ) {
        removeDivOverlay(fObj);
        var bObj= fObj.contentDocument.getElementsByTagName("body")[0];
        if ( bObj ) {
            var oDiv= createOverlayDiv()
            if ( msgDiv ) {
                oDiv.appendChild(msgDiv);
            }
            bObj.appendChild( oDiv );
        }
    }
}

