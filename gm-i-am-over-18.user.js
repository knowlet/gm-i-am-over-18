// ==UserScript==
// @name          I am over 18
// @namespace     http://tsai.it/project/gmscripts/i-am-over-18/
// @homepageURL   https://github.com/tsaiid/gm-i-am-over-18
// @version       0.2.20160930
// @description   Automatically agrees the "I'm over 18" declaration. The current supported sites are primarily in Taiwan.
// @icon          https://github.com/tsaiid/gm-i-am-over-18/raw/master/icon48.png
// @icon64        https://github.com/tsaiid/gm-i-am-over-18/raw/master/icon64.png
// @license       MIT License (Expat)
// @copyright     2016, I-Ta Tsai (http://tsai.it/)
// @include       https://www.ptt.cc/*
// @include       http://www.ettoday.net/*
// @include       http://star.ettoday.net/*
// @include       http://*.playno1.com/*
// @include       http://*.eyny.com/*
// @include       http://ck101.com/*
// @include       http://www.mycould.com/*
// @include       http://kickass.socialtorrent.net/*
// @include       http://katproxy.com/*
// @include       http://www.xvideos.com/*
// @include       http://video.jav101.com/*
// @include       /^https?://.*\.blogspot\.tw/.*$/
// @include       http://www.appledaily.com.tw/*
// @include       http://www.kocpc.com.tw/*
// @include       http://www.myfreecams.com/*
// @include       http://www.ibeauty.tw/*
// @include       https://www.up01.cc/post/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require       https://gist.githubusercontent.com/BrockA/2625891/raw/waitForKeyElements.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

window.addEventListener('load', function() { // wait until page loaded

  var url = window.location.href;

  function clickToContinue (jNodes) {
      console.log(jNodes);
      console.log(jNodes.context);
      console.log(jNodes.selector);
      jNodes[0].click();
  }

  // for ptt
  if (url.match(/www\.ptt\.cc/) && $('button:contains("我同意，我已年滿十八歲")').length) {
    $('button:contains("我同意，我已年滿十八歲")').click();
  }

  // for ettoday
  if (url.match(/www|star\.ettoday\.net/) && $('.adult-box').length && $('.adult-box').is(':visible')) {
    $('.adult-box').hide();
  }

  // for playno1
  if (url.match(/\.playno1\.com/)) {
    console.log("play01");
    waitForKeyElements (
      'button:contains("我已滿18歲 進入")', 
          clickToContinue
    );
  }

  // for eyny, mycould
  if (url.match(/\.eyny\.com|www\.mycould\.com/) && $('input[value*="是，我已年滿18歲。"]').length) {
    console.log(url);
    $('input[value*="是，我已年滿18歲。"]').click();
  }

  // for ck101
  if (url.match(/ck101\.com/)) {
      console.log("ck101");
      waitForKeyElements (
      "#fwin_dialog_submit", 
          clickToContinue
      );
  }

  // for kickass
  if (url.match(/kickass\.socialtorrent\.net|katproxy\.com/) && $('button:contains("Yes, let me see it")').length) {
    $('button:contains("Yes, let me see it")').click();
  }

  // for xvideos
  if ($('#disclamer_message').length) {
    $('#disclamer_message span:contains("ENTER")').parent().click();
  }

  // for jav101
  if (url.match(/video\.jav101\.com/) && $('a.agreeBtn').length) {
    $('a.agreeBtn').click();
  }

  // blogspot
  // from https://gist.github.com/obeattie/362589
  if (url.match(/\.blogspot\.tw/)) {
    var overlay = document.getElementById('injected-iframe');
    if (overlay) {
      var nextSibling = overlay.nextElementSibling;
      if (nextSibling.tagName == 'STYLE') nextSibling.parentElement.removeChild(nextSibling);
      overlay.parentElement.removeChild(overlay);
    }
  }

  // appledaily
  if (url.match(/www\.appledaily\.com\.tw/)) {
      console.log("appledaily");
      waitForKeyElements (
      "#popup_18 a.yes", 
          clickToContinue
      );
  }

  // www.kocpc.com.tw
  if (url.match(/www\.kocpc\.com\.tw/)) {
      console.log("kocpc");
      waitForKeyElements (
      "button.ox18B", 
          clickToContinue
      );
  }

  // myfreecams
  if (url.match(/www\.myfreecams\.com/)) {
      console.log("myfreecams");
      waitForKeyElements (
      "#enter_desktop", 
          clickToContinue
      );
  }

  // ibeauty
  if (url.match(/www\.ibeauty\.tw/)) {
      console.log("ibeauty");
      waitForKeyElements (
        ".warningWp .warningBtn .btnYes", 
        clickToContinue
      );
  }

  // up01
  if (url.match(/www\.up01\.cc/)) {
      console.log("up01");
      waitForKeyElements (
        'a:contains("我已滿18歲 進入")',
        clickToContinue
      );
  }

}, false);
