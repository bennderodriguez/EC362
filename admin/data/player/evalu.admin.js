
$(function(){
	
	// CONSTANTS (ENUMS)
	
	var InputEventsEnum = {
		MOUSE: 0,
		TOUCH: 1
	};
	
	var TimesEnum = {
		FADE: 250
	};
	
	var AppStatesEnum = {
		HOME: 0,
		SEARCH: 1,
		TESTS: 2,
		TEST: 3
	};
	
	var RunModesEnum = {
		SERVER: 0,
		LOCAL: 1	
	};
	
	// "PRIVATE" (INTERNAL) FIELDS
	var DATA = window.EVALUADMINDATA;
	var STR = DATA.Strings;
	var lastCandidateID = '';
	var inputEvent = GetInputEvent();
	var targetMobile = TargetMobile();
	var runMode = GetRunMode();
	var currentAppState = AppStatesEnum.HOME;
	var xhrPool = [];

	// JQUERY WRAPPER ELEMENTS 
	var $Document = $(document);
	var $Window = $(window);
	var $Body = $('body');
	var $AppContainer = $('#container');
	var $Home = $('#home', $AppContainer);
	var $HomeLogin = $('#home_login', $Home);
	var $HomeLoginFail = $('#home_login_fail', $HomeLogin);
	var $HomeLoginLogin = $('#home_login_login', $HomeLogin);
	var $HomeLoginPassword = $('#home_login_password', $HomeLogin);
	var $HomeLoginSubmit = $('#home_login_submit', $HomeLogin);
	var $Main = $('#main', $AppContainer);
	var $MainHeader = $('#main_header', $Main);
	var $MainHeaderTitle = $('#main_header_title', $MainHeader);
	var $MainHeaderNameText = $('#main_header_name_text', $MainHeader);
	var $MainHeaderExit = $('#main_header_exit', $MainHeader);
	var $MainContent = $('#main_content', $Main);
	var $MainFooter = $('#main_footer', $Main);
	
	// SET WINDOW TITLE
	$Document.prop('title', STR.AppTitle);
	
	// SET WEB APP TITLE
	SetWebAppTitle(STR.WebAppTitle);
	
	// SET HOME STRINGS
	$('#home_header_container_title_text', $Home).text(STR.HomeTitle);
	$HomeLoginLogin.attr('placeholder', STR.LoginLoginPlaceholder);
	$HomeLoginPassword.attr('placeholder', STR.LoginPasswordPlaceholder);
	$HomeLoginSubmit.text(STR.LoginLoginSubmitButton);
	
	// SET MAIN HEADER TITLE
	$MainHeaderTitle.text(STR.HomeTitle);
	
	// SET MAIN HEADER EXIT BUTTON
	$MainHeaderExit.text(STR.MainExitButton);
	SetButton($MainHeaderExit, Exit);
	
	// SET FOOTER TEXT
	$MainFooter.text(STR.AppCopyright);
	
	// JQUERY TRANSITIONS (ANIMATIONS) ON/OFF
	$.fx.off = !DATA.ShowAnimations || targetMobile.ANY;
	
	// CANCEL CONTEXT MENU
	$Body.on('contextmenu', function(e){ return false; });
	
	// START APP
	SetAppState(AppStatesEnum.HOME);
	
	function SetAppState(state, params){
		$MainContent.empty();
		switch(state){
			case AppStatesEnum.HOME:
				$Main.hide();
				$HomeLoginLogin.val('');
				$HomeLoginPassword.val('');
				SetButton($HomeLoginSubmit, DoLogin);
				$Home.fadeIn(TimesEnum.FADE);
				break;
			case AppStatesEnum.SEARCH:
				SetSearch();
				if(!$Main.is(":visible")) $Main.fadeIn(TimesEnum.FADE);
				break;
			case AppStatesEnum.TESTS:
				XHRPool('removeAll');
				Ajax(DATA.PHPPath, {command: 'search', candidateID: params}, SetTests);	
				break;
			case AppStatesEnum.TEST:
				XHRPool('removeAll');
				Ajax(DATA.PHPPath, {command: 'test', testID: params}, SetTest);
				break;
		}
		currentAppState = state;
	}
	
	function DoLogin(){
		XHRPool('removeAll');
		var login = $HomeLoginLogin.val().trim();
		var password = $HomeLoginPassword.val().trim();
		if (login == '' || password == ''){
			$HomeLoginFail.hide();
			$HomeLoginFail.text(STR.LoginEmpty);
			$HomeLoginFail.fadeIn(TimesEnum.FADE);
			return;
		}
		$HomeLoginLogin.blur();
		$HomeLoginPassword.blur();
		DisableButton($HomeLoginSubmit);			
		Ajax(DATA.PHPPath, {command: 'login', adminLogin: login, adminPassword: password}, CheckLogin);	
	}
	
	function CheckLogin(response){
		if(response.error){
			console.log('Login error: ' + response.errorText);
			$HomeLoginFail.hide();
			$HomeLoginFail.text(STR.LoginFail);
			$HomeLoginFail.fadeIn(TimesEnum.FADE);
			SetButton($HomeLoginSubmit, DoLogin);
			return;
		}
		$Home.fadeOut(TimesEnum.FADE, function(){
			$HomeLoginLogin.val('');
			$HomeLoginPassword.val('');
			$HomeLoginFail.text('');
			$HomeLoginFail.show();
			$MainHeaderNameText.text(response.adminName);
			SetAppState(AppStatesEnum.SEARCH);
		});	
	}
	
	function Exit(){
		lastCandidateID = '';
		SetAppState(AppStatesEnum.HOME);
	}

	function SetSearch(){
		$MainContent.css({'visibility':'hidden'});
		$MainContent.empty();
		var htmlStr = '\
			<div id="main_search">\
				<div id="main_search_fail"></div>\
				<input type="text" class="input" id="main_search_candidate_id" autocomplete="off" placeholder="' + STR.SearchPlaceholder + '">\
				<p></p>\
				<div id="main_search_submit" class="button">' + STR.SearchButton + '</div>\
			</div>';
		$MainContent.append(htmlStr);
		var $MainSearch = $('#main_search', $MainContent);
		var $Button = $MainSearch.children().last();
		SetButton($Button, function(){
			var $MainSearch = $('#main_search', $MainContent);
			var $MainSearchCandidateID = $('#main_search_candidate_id', $MainSearch);
			$MainSearchCandidateID.blur();
			var id = $MainSearchCandidateID.val().trim();
			if (id == ''){
				var $MainSearchFail = $('#main_search_fail', $MainSearch);
				$MainSearchFail.hide();
				$MainSearchFail.text(STR.SearchEmpty);
				$MainSearchFail.fadeIn(TimesEnum.FADE);
				return;
			}
			SetAppState(AppStatesEnum.TESTS, id);
		});
		$MainContent.scrollTop(0);
		$MainContent.css({'visibility':'visible'});
		$MainContent.hide();
		$MainContent.fadeIn(TimesEnum.FADE);
	}

	function SetTests(data){
		$MainContent.css({'visibility':'hidden'});
		$MainContent.empty();
		if(data.error){
			var htmlStr = '\
				<div id="tests_container">\
					<div id="tests_search_not_found">' + STR.SearchNotFound + '</div>\
					<div id="button" class="button button_large">' + STR.TestsBackButton + '</div>\
				</div>';
			$MainContent.append(htmlStr);
			var $TestsContainer = $('#tests_container', $MainContent);
			var $Button = $TestsContainer.children().last();
			SetButton($Button, function(){
				SetAppState(AppStatesEnum.SEARCH);
			});
			$MainContent.scrollTop(0);
			$MainContent.css({'visibility':'visible'});
			$MainContent.hide();
			$MainContent.fadeIn(TimesEnum.FADE);
			return;
		}		
		lastCandidateID = data.candidateID;
		var htmlStr = '\
			<div id="tests_header">\
				<div id="tests_header_icon"></div>\
				<div id="tests_header_text">' + STR.TestsTitle.replace('#', lastCandidateID) + '</div>\
			</div>\
			<div id="tests_container"></div>';				
		$MainContent.append(htmlStr);	
		var $TestsContainer = $('#tests_container', $MainContent);
		$TestsContainer.append(data.html);
		var $GosButtons = $('.tests_table_go_icon', $TestsContainer);
		$GosButtons.on(inputEvent.Start, function(){
			var $This = $(this);
			var dataID = parseInt($This.attr('data-id'));
			SetAppState(AppStatesEnum.TEST, dataID);
		});
		$TestsContainer.append('<div id="button" class="button button_large">' + STR.TestsBackButton + '</div>');
		var $Button = $TestsContainer.children().last();
		SetButton($Button, function(){
			SetAppState(AppStatesEnum.SEARCH);
		});
		$MainContent.scrollTop(0);
		$MainContent.css({'visibility':'visible'});
		$MainContent.hide();
		$MainContent.fadeIn(TimesEnum.FADE);		
	}	
	
	function SetTest(data){
		$MainContent.css({'visibility':'hidden'});
		$MainContent.empty();
		var htmlStr = '<div id="test_container"></div>';
		$MainContent.append(htmlStr);	
		var $TestContainer = $('#test_container', $MainContent);	
		if(data.error){
			htmlStr = '\
				<div id="test_fail">' + STR.TestFail + '</div>\
				<div id="button" class="button button_large">' + STR.TestBackButton + '</div>';
			$TestContainer.append(htmlStr);
			var $Button = $TestContainer.children().last();
			SetButton($Button, function(){
				SetAppState(AppStatesEnum.TESTS, lastCandidateID);
			});
			$MainContent.scrollTop(0);
			$MainContent.css({'visibility':'visible'});
			$MainContent.hide();
			$MainContent.fadeIn(TimesEnum.FADE);
			return;
		}
		$TestContainer.append(data.html);
		var $Table = $('table', $TestContainer);
		$Selects = $('select', $Table);
		$Selects.on('change', function(){
			$This = $(this);
			var value = ($This.val() === 'true');
			var questionID = parseInt($This.attr('data-question-id'));
			XHRPool('removeAll');
			Ajax(DATA.PHPPath, {command: 'update', testID: data.testID, questionID: questionID, newValue: value}, SetTest);
		});
		htmlStr = '\
				<div id="test_container_back_button" class="button test_container_buttons">' + STR.TestBackButton + '</div>\
				<div id="test_container_download_button" class="button test_container_buttons">' + STR.TestDownloadButton + '</div>\
				<div id="test_container_print_button" class="button test_container_buttons">' + STR.TestPrintButton + '</div>';
		$TestContainer.append(htmlStr);
		var $BackButton = $('#test_container_back_button', $TestContainer);
		var $DownloadButton = $('#test_container_download_button', $TestContainer);
		$DownloadButton.testID = data.testID;
		var $PrintButton = $('#test_container_print_button', $TestContainer);
		$PrintButton.testID = data.testID;
		SetButton($PrintButton, function(e){
			e.preventDefault();
			TestPrint($PrintButton.testID);
		});
		SetButton($DownloadButton, function(e){
			e.preventDefault();
			TestDownload($DownloadButton.testID);
		});		
		SetButton($BackButton, function(e){
			e.preventDefault();
			SetAppState(AppStatesEnum.TESTS, lastCandidateID);
		});		
		$MainContent.scrollTop(0);
		$MainContent.css({'visibility':'visible'});
		$MainContent.hide();
		$MainContent.fadeIn(TimesEnum.FADE);
	}
	
	function TestPrint(testID){
		var htmlStr = '\
			<form id="test_print_form" name="test_print_form" ' + (targetMobile.IOS ? '' : 'target="_blank"') + ' action="' + DATA.PHPPath + '" method="POST">\
				<input type="hidden" id="command" name="command" value="print">\
				<input type="hidden" id="testID" name="testID" value="' + testID + '">\
			</form>';
		$MainContent.append(htmlStr);
		var $Form = $MainContent.children().last();
		$Form.submit();
		$Form.remove();
	}
	
	function TestDownload(testID){
		var htmlStr = '\
			<form id="test_download_form" name="test_download_form" action="' + DATA.PHPPath + '" method="POST">\
				<input type="hidden" id="command" name="command" value="download">\
				<input type="hidden" id="testID" name="testID" value="' + testID + '">\
			</form>';
		$MainContent.append(htmlStr);
		var $Form = $MainContent.children().last();
		$Form.submit();
		$Form.remove();
	}
	
	
	//////////////////////////////////////////////////////////////////////
	///////////////////////////// TOOLBOX ////////////////////////////////
	//////////////////////////////////////////////////////////////////////
		

	// SETING BUTTONS FUNCTION 
	function SetButton($El, fnt){
		$El.on(inputEvent.Start, fnt);
	}
	
	function DisableButton($El){
		$El.off(inputEvent.Start);
	}
	
	// GET INPUT EVENT SUPPORTED
	function GetInputEvent(){
		var Event = {};
		if ('ontouchstart' in window){
			Event.Type = InputEventsEnum.TOUCH;
			Event.Start = "touchstart";
			Event.Move = "touchmove";
			Event.End = "touchend";
		}else{
			Event.Type = InputEventsEnum.MOUSE;
			Event.Start = "mousedown";
			Event.Move = "mousemove";
			Event.End = "mouseup";		
		}
		return Event;
	}

	// MOBILE TYPES
	function TargetMobile(){
		var Type = {};
		Type.IPAD = IsInUserAgent('iPad');
		Type.IPHONE = IsInUserAgent('iPhone');
		Type.IPOD = IsInUserAgent('iPod');
		Type.IOS = Type.IPAD || Type.IPHONE || Type.IPOD;
		Type.IOSSTANDALONE = Type.IOS && window.navigator.standalone;
		Type.ANDROID = IsInUserAgent('Android');
		Type.BLACKBERRY = IsInUserAgent('BlackBerry');
		Type.WINDOWSMOBILE = IsInUserAgent('IEMobile');
		Type.OPERAMOBILE = IsInUserAgent('Opera Mini|Opera Mobi');
		Type.ANY = Type.IOS || Type.ANDROID || Type.BLACKBERRY || Type.WINDOWSMOBILE || Type.OPERAMOBILE;
		return Type;
	}
	
	// GENERIC REGULAR EXPRESSION FOR FIND SUBSTRINGS IN USERAGENT
	function IsInUserAgent(str){
		if (StringIsNullOrWhiteSpace(str)) return false;
		var regEx = new RegExp("(" + str + ")", 'i');
		return regEx.test(navigator.userAgent);
	}
	
	// CHECK IF STRING IS NULL OR ONLY WHITE SPACES
	function StringIsNullOrWhiteSpace(str){
    	return str === null || str.match(/^ *$/) !== null;
	}
	
	// ENVIROMENT RUN MODE
	function GetRunMode(){
		switch(window.location.protocol) {
   			case 'http:':
  			case 'https:':
     			return RunModesEnum.SERVER;
     			break;
			case 'file:':
				return RunModesEnum.LOCAL;
				break;
   			default:
     			return RunModesEnum.LOCAL;
     			break;     			
		}
	}
	
	function Ajax(path, data, callback){
		$.ajax({
			type: "POST",
			url: path,
			data: data,
			dataType: "json",
  			success: function(data, textStatus, $XHR){
				XHRPool('remove', $XHR);
				if(callback) callback(data);
			},
			error: function($XHR){
				XHRPool('remove', $XHR);
				if(callback) callback({error:true, errorText:$XHR.statusText + ' (' + $XHR.status + ')'});
			},
			beforeSend: function($XHR){
				XHRPool('add', $XHR);
			}
		});
	}
	
	function XHRPool(type, $XHR){
		switch(type){
			case 'add': 
				xhrPool.push($XHR);
				break;
			case 'remove':
				var index = xhrPool.indexOf($XHR);
				if (index > -1) {
					xhrPool.splice(index, 1);
				}
				break;
			case 'removeAll':
				var cnt = xhrPool.length;
				for(var i = 0; i < cnt; i++){
					xhrPool[i].abort();
				}
				xhrPool = [];
				break;
		}
	}
	
	function SetWebAppTitle(title){
		var metas = document.getElementsByTagName('meta');
		for(var i = 0; i < metas.length; i++){
			if(metas[i].getAttribute('name') && metas[i].getAttribute('name') == 'apple-mobile-web-app-title') {
				metas[i].setAttribute('content', title);
				break;	
			}
		}
	}
	
	// END OF FILE
});