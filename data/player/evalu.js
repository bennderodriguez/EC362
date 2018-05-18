
$(function(){

	// CONSTANTS (ENUMS)
	
	var QuestionTypesEnum = {
		MULTICHOICE: 'MULTICHOICE',
		MATCHING: 'MATCHING',
		FILL: 'FILL',
		SIM: 'SIM',
		URL: 'URL'
	};
	
	var QuestionSimItemTypesEnum = {
		BUTTON: 'BUTTON',
		TEXT: 'TEXT',
		DRAG: 'DRAG'
	};
	
	var InputEventsEnum = {
		MOUSE: 0,
		TOUCH: 1
	};
	
	var TimesEnum = {
		FADE: 250,
		LOADING: 1000,
		SENDINGRESULT: 7000
	};
	
	var AppStatesEnum = {
		LOADING: 0,
		HOME: 1,
		INTRO: 2,
		TEST: 3,
		REMAINING: 4,
		END: 5
	};
	
	var RunModesEnum = {
		SERVER: 0,
		LOCAL: 1	
	};
	
	// "PRIVATE" (INTERNAL) FIELDS
	var DATA = window.EVALUDATA;
	var TEST = DATA.Test;
	var STR = DATA.Strings;
	var RESULT;
	var questionsCnt = TEST.Questions.length;
	var currentQuestion = -1;
	var introsCnt = TEST.Intros.length;
	var currentIntro = -1;
	var inputEvent = GetInputEvent();
	var targetMobile = TargetMobile();
	var runMode = GetRunMode();
	var currentAppState = AppStatesEnum.LOADING;
	var xhrPool = [];
	var simData = {};
	var timer = TimerCountdown();
	
	// UI IMAGES
	var uiImages = [
		'data/player/home_image.png',
		'data/player/home_logo.png',
		'data/player/main_header_logo.png',
		'data/player/main_header_questions.png',
		'data/player/mian_header_time.png',
		'data/player/question_header_icon.png',
		'data/player/item_triangle.png',
		'data/player/item_multichoice_off.png',
		'data/player/item_multichoice_on.png',
		'data/player/item_multichoice_multiselect_off.png',
		'data/player/item_multichoice_multiselect_on.png'
	];
	
	// JQUERY WRAPPER ELEMENTS 
	var $Document = $(document);
	var $Window = $(window);
	var $Body = $('body');
	var $AppContainer = $('#container');
	var $Splash = $('#splash', $AppContainer);
	var $Home = $('#home', $AppContainer);
	var $HomeLogin = $('#home_login', $Home);
	var $HomeLoginFail = $('#home_login_fail', $HomeLogin);
	var $HomeLoginLogin = $('#home_login_login', $HomeLogin);
	var $HomeLoginSubmit = $('#home_login_submit', $HomeLogin);
	var $Main = $('#main', $AppContainer);
	var $MainHeader = $('#main_header', $Main);
	var $MainHeaderTitle = $('#main_header_title', $MainHeader);
	var $MainHeaderQuestions = $('#main_header_questions', $MainHeader);
	var $MainHeaderQuestionsText = $('#main_header_questions_text', $MainHeaderQuestions);
	var $MainHeaderTime = $('#main_header_time', $MainHeader);
	var $MainHeaderTimeText = $('#main_header_time_text', $MainHeaderTime);
	var $MainContent = $('#main_content', $Main);
	var $MainFooter = $('#main_footer', $Main);
	var $Modal = $('#modal', $AppContainer);
	var $ModalWindowMessage = $('#modal_window_message', $Modal);
	var $ModalWindowMessageBoxText = $('#modal_window_message_box_text', $ModalWindowMessage);
	var $ModalWindowMessageLoader = $('#modal_window_message_loader', $ModalWindowMessage);
	var $ModalWindowMessageLoaderBar = $('#modal_window_message_loader_bar', $ModalWindowMessageLoader);
	
	// SET WINDOW TITLE
	$Document.prop('title', STR.AppTitle);
	
	// SET WEB APP TITLE
	SetWebAppTitle(STR.WebAppTitle);
	
	// SET HOME STRINGS
	$('#home_header_container_title_text', $Home).text(TEST.Title);
	$('#home_header_container_title_id', $Home).text(TEST.ID);
	$HomeLoginLogin.attr('placeholder', STR.LoginPlaceholder);
	$HomeLoginSubmit.text(STR.LoginButton);
	
	// SET MAIN HEADER TITLE
	$MainHeaderTitle.text(TEST.Title);
	
	// SET FOOTER TEXT
	$MainFooter.text(STR.AppCopyright);
	
	// JQUERY TRANSITIONS (ANIMATIONS) ON/OFF
	$.fx.off = !DATA.ShowAnimations || targetMobile.ANY;
	
	// CANCEL CONTEXT MENU
	$Body.on('contextmenu', function(e){return false;});
	
	// CANCEL F5 (REFRESH) KEY
	$Document.on("keydown", function(e){if((e.which || e.keyCode) == 116){e.preventDefault(); return;}});
	
	// PROMP USER BEFORE CLOSE APP 
	$Window.on('beforeunload', function(){
		if(STR){ return STR.AppClose; }
		return "";
	})
	
	
	// PRELOAD UI IMAGES THEN START APP
	PreloadImages(uiImages, function(ok){
		if(!ok) console.log('Preload images error');
		Startup();
	});
	
	// STARTUP APP
	function Startup(){
		setTimeout(function(){
			$Splash.fadeOut(TimesEnum.FADE, function(){
				$Splash.hide();
				SetAppState(AppStatesEnum.HOME);
			});	
		}, TimesEnum.LOADING);
	}
	
	function SetAppState(state){
		$MainContent.empty();
		switch(state){
			case AppStatesEnum.HOME:
				$Main.hide();
				$HomeLoginLogin.val('');
				SetButton($HomeLoginSubmit, DoLogin);
				$Home.fadeIn(TimesEnum.FADE);
				break;
			case AppStatesEnum.INTRO:
				$Main.hide();
				currentIntro = -1;
				SetIntro();
				//LoadHTML(TEST.Intro, $MainContent, STR.StartTest, function(){SetAppState(AppStatesEnum.TEST)});
				$Main.fadeIn(TimesEnum.FADE);
				break;
			case AppStatesEnum.TEST:
				timer.Set(TEST.Duration, $MainHeaderTimeText, function(){
					XHRPool('removeAll');
					$MainContent.empty();
					ShowModalWindow(false);
					ShowModalWindow(true, STR.TimeEnded, function(){
						SetAppState(AppStatesEnum.END);
					});
				});
				currentQuestion = -1;
				DoQuestion();
				$MainHeaderQuestions.fadeIn(TimesEnum.FADE);
				$MainHeaderTime.fadeIn(TimesEnum.FADE, function(){
					timer.Start();
				});
				break;
			case AppStatesEnum.REMAINING:
				var remainingQuestions = GetRemainingQuestions();
				if(remainingQuestions.length > 0){
					SetRemainingQuestions(remainingQuestions);
					break;
				}
			case AppStatesEnum.END:
				timer.Stop();
				$MainHeaderQuestions.hide();
				$MainHeaderTime.hide();
				SaveResult();
				break;
		}
		currentAppState = state;
	}
	
	function DoLogin(){
		XHRPool('removeAll');
		var login = $HomeLoginLogin.val().trim();
		if (login == ''){
			$HomeLoginFail.hide();
			$HomeLoginFail.text(STR.LoginEmpty);
			$HomeLoginFail.fadeIn(TimesEnum.FADE);
			return;
		}
		$HomeLoginLogin.blur();
		DisableButton($HomeLoginSubmit);			
		Ajax(DATA.PHPPath, {command: 'login', userLogin: login}, CheckLogin);	
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
		InitResult(parseInt(response.userID));
		$Home.fadeOut(TimesEnum.FADE, function(){
			$HomeLoginLogin.val('');
			$HomeLoginFail.text('');
			$HomeLoginFail.show();
			SetAppState(AppStatesEnum.INTRO);
		});	
	}
	
	function InitResult(userID){
		RESULT = JSON.parse(JSON.stringify(TEST));
		RESULT.UserID = userID;
		for(var i = 0, cnt = RESULT.Questions.length; i < cnt; i++){
			RESULT.Questions[i].Order = i;
			RESULT.Questions[i].Answered = false;
			RESULT.Questions[i].Correct = false;
			if(RESULT.Questions[i].Type === QuestionTypesEnum.URL){
				if(!RESULT.Questions[i].Valued) RESULT.Questions[i].Value = 0.0;
			}
		}
	}
	
	function SetIntro(){
		currentIntro++;
		var intro = TEST.Intros[currentIntro];
		if(currentIntro >= introsCnt - 1){
			LoadHTML(intro.html, $MainContent, intro.button, function(e){
				e.preventDefault();
				e.stopPropagation();
				SetAppState(AppStatesEnum.TEST);
			});	
		}else{
			LoadHTML(intro.html, $MainContent, intro.button, function(e){
				e.preventDefault();
				e.stopPropagation();
				SetIntro();
			});
		}
	}
	
	function LoadHTML(path, $Container, buttonTitle, callback){
		$Container.css({'visibility':'hidden'});
		$Container.empty();
		var frame = '<iframe id="frame" frameborder="0" style="width:100%" seamless="seamless" scrolling="no"></iframe>';
		$Container.append(frame);
		var $Frame = $('#frame', $Container);
		$Frame.load(function(){
			$Frame.height($Frame[0].contentWindow.document.body.scrollHeight);
			$Container.append('<div id="button" class="button button_html">' + buttonTitle + '</div>');
			var $Button = $Container.children().last();
			SetButton($Button, callback);
			setTimeout(function(){
				$Container.scrollTop(0);
				$Container.css({'visibility':'visible'});
				$Container.hide();
				$Container.fadeIn(TimesEnum.FADE);			
			}, 500);
		});		
		$Frame.attr('src', GetAssetsPath(path));		
	}
	
	function DoQuestion(id){ // id JUST IN CASE REMAINING QUESTIONS
		$MainContent.css({'visibility':'hidden'});
		$MainContent.empty();
		if(typeof id === 'undefined'){
			currentQuestion++;
		}else{
			currentQuestion = id;
		}
		if(currentQuestion === questionsCnt){
			SetAppState(AppStatesEnum.REMAINING);
			return;
		};
		$MainHeaderQuestions.show();
		$MainHeaderQuestionsText.text((currentQuestion + 1) + ' de ' + questionsCnt);
		var question = TEST.Questions[currentQuestion];
		// CHECK FOR QUESTIONS WITH RESOURCES
		if(question.Type === QuestionTypesEnum.FILL || question.Type === QuestionTypesEnum.SIM){
			LoadQuestionResources(question);
			return;
		}
		SetQuestion(question);
		$MainContent.scrollTop(0);
		$MainContent.css({'visibility':'visible'});
		$MainContent.hide();
		$MainContent.fadeIn(TimesEnum.FADE);
	}
	
	function LoadQuestionResources(question){
		var images = [];
		switch(question.Type){
			case QuestionTypesEnum.SIM:
				var cnt = question.Data.Screens.length;
				for(var i = 0; i < cnt; i++){
					var scr = question.Data.Screens[i];
					images.push(GetAssetsPath(scr.Image));
					var itemsCnt = scr.Items.length;
					for(var j = 0; j < itemsCnt; j++){
						var itm = scr.Items[j];
						if(itm.Type === QuestionSimItemTypesEnum.DRAG){
							images.push(GetAssetsPath(itm.Data.Image));
						}
					}
				}
				break;	
			case QuestionTypesEnum.FILL:
				images.push(GetAssetsPath(question.Data.Image));
				break;
		}
		timer.Stop();
		ShowModalWindowLoader(true, STR.LoadingResources);
		PreloadImages(images, LoadedQuestionResources, LoaderProgress);	
	}
	
	function LoadedQuestionResources(ok, resources){
		var question = TEST.Questions[currentQuestion];
		SetQuestion(question, resources);
		$MainContent.scrollTop(0);
		$MainContent.css({'visibility':'visible'});
		$MainContent.hide();
		$MainContent.fadeIn(TimesEnum.FADE);
		ShowModalWindowLoader(false);
		timer.Start();
	}
	
	function SetQuestion(question, resources){
		// QUESTION HEADER
		var htmlStr = '\
			<div id="question_header">\
				<div id="question_header_icon"></div>\
				<div id="question_header_text">' + question.Text + '</div>\
			</div>\
			<div id="question_container">\
				<div id="question_instruction_text">' + question.Instruction + '</div>\
			</div>';				
		$MainContent.append(htmlStr);	
		var $QuestionContainer = $('#question_container', $MainContent);
		// SET QUESTION BY TYPE
		switch(question.Type){
			case QuestionTypesEnum.MULTICHOICE:
				var cnt = question.Data.Answers.length;
				var multiselect = question.Data.MultiSelect;
				var classOff = 'multichoice_rect_icon_off';
				var classOn = 'multichoice_rect_icon_on';
				var classMultiOff = 'multichoice_rect_icon_multiselect_off';
				var classMultiOn = 'multichoice_rect_icon_multiselect_on';
				htmlStr = '';
				for(var i = 0; i < cnt; i++){
					var itm = '\
						<div class="item" data-selected="' + false + '">\
							<div class="item_rect">\
								<div class="' + (multiselect ? classMultiOff : classOff) + '"></div>\
								<div class="item_rect_triangle"></div>\
							</div>\
							<div class="item_text">' + question.Data.Answers[i].Text + '</div>\
						</div>';
					htmlStr += itm;
				}
				$QuestionContainer.append(htmlStr);
				var $Qestions = $('.item', $QuestionContainer);
				$Qestions.on(inputEvent.Start, function(e){
					e.preventDefault();
					e.stopPropagation();
					var $This = $(this);
					if(multiselect) {
						var $Icon = $('.' + classMultiOff, $This);
						if($This.attr('data-selected') === 'true'){
							$This.attr('data-selected', false);
							$Icon.removeClass(classMultiOn);
						}else{
							$This.attr('data-selected', true);
							$Icon.addClass(classMultiOn);
						}						
					}else{
						$Qestions.attr('data-selected', false);
						$('.' + classOff, $Qestions).removeClass(classOn);
						$This.attr('data-selected', true);
						var $Icon = $('.' + classOff, $This);
						$Icon.addClass(classOn);
					}
				});
				break;
			case QuestionTypesEnum.MATCHING:
				var cnt = question.Data.Left.length;
				var chars = [];
				htmlStr = '<div class="matching_colum_left">';
				for(var i = 0; i < cnt; i++){
					var left = question.Data.Left[i];
					chars.push(left.Key);
					var itm = '\
						<div class="item matching_item">\
							<div class="item_rect">\
								<div class="matching_rect_left_text">' + left.Key + '</div>\
								<div class="item_rect_triangle"></div>\
							</div>\
							<div class="item_text matching_item_text">' + left.Text + '</div>\
						</div>';
					htmlStr += itm;
				}
				htmlStr +=  '</div>';
				cnt = question.Data.Right.length;
				htmlStr += '<div class="matching_colum_right">'; 
				for(var i = 0; i < cnt; i++){
					var right = question.Data.Right[i];
					var itm = '\
						<div class="item matching_item">\
							<div class="item_rect matching_rect_right">\
								<select class="matching_select">';
					for(var j = 0, charsCnt = chars.length; j < charsCnt; j++){
						itm += '<option>' + chars[j] + '</option>';
					}
						itm +=	'</select>\
							</div>\
							<div class="item_text matching_item_text">' + right.Text + '</div>\
						</div>';
					htmlStr += itm;
				}
				htmlStr +=  '</div>';
				$QuestionContainer.append(htmlStr);
				var $Selects = $('.matching_select', $QuestionContainer);
				$Selects.prop("selectedIndex", -1);				
				break;
			case QuestionTypesEnum.FILL:
				htmlStr = '\
					<div class="fill_container">\
						<div class="fill_container_box"></div>\
					</div>';
				$QuestionContainer.append(htmlStr);
				var $FillContainer = $('.fill_container', $QuestionContainer);
				var $FillContainerBox = $('.fill_container_box', $FillContainer);
				var img = resources[0];
				$FillContainer.css({height:img.height});
				$FillContainerBox.css({height:img.height});
				$FillContainerBox.append(img);
				$FillContainerBox.children().last().on(inputEvent.Start, function(e){
					e.preventDefault();
					e.stopPropagation();
				});
				htmlStr = '';
				var cnt = question.Data.Fields.length;
				for(var i = 0; i < cnt; i++){
					var field = question.Data.Fields[i];
					htmlStr += (field.Multiline ? '<textarea class="fill_textarea" spellcheck="false" style="resize:none;padding:10px;' : '<input type="text" class="fill_field" style="padding-left:10px;');
					htmlStr += '\
						position: absolute;\
						border-style: solid;\
						border-width: 1px;\
						left:' + field.X + 'px;\
						top:' + field.Y + 'px;\
						width:' + field.Width + 'px;\
						height:' + field.Height + 'px;\
						border-color:' + question.Data.BorderColor + '">';
					htmlStr += (field.Multiline ? '</textarea>' : '</input>');
				}						
				$FillContainerBox.append(htmlStr);
				break;
			case QuestionTypesEnum.SIM:
				htmlStr = '\
					<div class="sim_container">\
						<div class="sim_container_box"></div>\
					</div>';
				$QuestionContainer.append(htmlStr);	
				// SET SIM DATA
				simData = {};
				simData.question = question;
				simData.answered = false;
				simData.correct = false;
				simData.resources = resources;
				simData.$Container = $('.sim_container', $QuestionContainer);
				simData.$ContainerBox = $('.sim_container_box', simData.$Container);
				simData.screensCnt = question.Data.Screens.length;
				simData.$Instruction = $('#question_instruction_text', $QuestionContainer);
				// SET FIRST SIM SCREEN
				SetSimScreen(question.Data.Screens[0].ScreenID);
				break;
			case QuestionTypesEnum.URL:
				if(!question.Hidden){
					htmlStr = '\
						<input type="text" class="url_input_field" id="url_input" autocomplete="off" placeholder="' + question.Data.Text + '">\
						<br>\
						<br>\
						<input type="text" class="url_input_field" id="url_input_verify" autocomplete="off" placeholder="' + question.Data.Verify + '">';
					$QuestionContainer.append(htmlStr);
				}
				break;
		}
		// ADD NEXT QUESTION BUTTON
		var nextLabel = STR.NextQuestion;
		if(currentAppState === AppStatesEnum.REMAINING){
			if(GetRemainingQuestions().length > 1){
				nextLabel = STR.GoToRemainingQuestions;
			}else{
				nextLabel = STR.EndTest;
			}
		}else{
			if(currentQuestion >= questionsCnt - 1){
				if(GetRemainingQuestions().length > 1){
					nextLabel = STR.GoToRemainingQuestions;
				}else{
					nextLabel = STR.EndTest;
				}
			}
		}
		$QuestionContainer.append('<div id="button" class="button button_test">' + nextLabel + '</div>');
		var $Button = $QuestionContainer.children().last();
		SetButton($Button, function(e){
			e.preventDefault();
			e.stopPropagation();
			ValidateAnswer();
		});
	}
	
	function SetSimScreen(id){
		var screens = simData.question.Data.Screens;
		var scr;
		var scrNum;
		for(var i = 0; i < simData.screensCnt; i++){
			if(screens[i].ScreenID === id){
				scr = screens[i];
				scrNum = i;
				break;
			}
		}
		simData.$Instruction.css({'visibility':'visible'});
		simData.$Instruction.text(scr.Instruction);
		simData.$Instruction.hide();
		simData.$Instruction.fadeIn(TimesEnum.FADE);
		var img = GetPreloadedImage(simData.resources, scr.Image);
		simData.$Container.css({height:img.height});
		simData.$ContainerBox.css({height:img.height});
		simData.$ContainerBox.empty();
		simData.$ContainerBox.append(img);
		var $BackImage = simData.$ContainerBox.children().last();
		SetButton($BackImage,  function(e){
			e.preventDefault();
			return false;
		});
		if(scr.Final){
			simData.correct = true;
			setTimeout(function(){
				SimConfirmAnswer();
			}, 1000);
			return;
		}
		var htmlStr = '';
		var itemsCnt = scr.Items.length;
		for(var i = 0; i < itemsCnt; i++){
			var itm = scr.Items[i];
			var itmData = itm.Data;
			switch(itm.Type){
				case QuestionSimItemTypesEnum.BUTTON:
					htmlStr = '\
						<div class="' + (DATA.ShowSimHotspots ? 'sim_item_debug' : 'sim_item') + '" style="\
							position: absolute;\
							left: ' + itmData.X + 'px;\
							top: ' + itmData.Y + 'px;\
							width: ' + itmData.Width + 'px;\
							height: ' + itmData.Height + 'px;\
							background-color: rgba(255,255,255,0);">\
						</div>';
					simData.$ContainerBox.append(htmlStr);	
					var $Button = simData.$ContainerBox.children().last();
					$Button.data('itmData', itmData);
					$Button.data('lastClickTime', Date.now());
					$Button.on(inputEvent.Start, function(e){
						e.preventDefault();
						e.stopPropagation();
						var $This = $(this);
						var data = $This.data('itmData');
						var buttonNumOk = (inputEvent.Type === InputEventsEnum.TOUCH ? true : (e.which === data.MouseButton));
						if(buttonNumOk){
							if(data.DoubleClick){
								var now = Date.now();
								if(now - $This.data('lastClickTime') > 500){ // 500 MILLISECONDS IS THE WINDOWS DEFAULT FOR DOUBLE CLICK
									$This.data('lastClickTime', now);
									return;
								}
							}
							SetSimScreen(data.GotoScreenID);
							return;
						}else{
							SimConfirmAnswer();
						}
					})
					break;
				case QuestionSimItemTypesEnum.TEXT:
					htmlStr = '\
						<input type="text" class="' + (DATA.ShowSimHotspots ? 'sim_item_debug' : 'sim_item') + '" style="\
							position: absolute;\
							left: ' + itmData.X + 'px;\
							top: ' + itmData.Y + 'px;\
							width: ' + itmData.Width + 'px;\
							height: ' + itmData.Height + 'px;\
							font-size: ' + itmData.FontSize + 'px;\
							color: ' + itmData.FontColor + ';">\
						</input>';				
					simData.$ContainerBox.append(htmlStr);
					var $Text = simData.$ContainerBox.children().last();
					$Text.data('itmData', itmData);
					$Text.on('keydown', function(e){
						if((e.which || e.keyCode) == 13){
							e.preventDefault();
							var $This = $(this);
							var data = $This.data('itmData');
							if(data.CompareWith != ''){
								var targetStr = data.CompareWith.toLowerCase();
								var sourceStr = $This.val().trim().toLowerCase();								
								if(targetStr === sourceStr){
									SetSimScreen(data.GotoScreenID);
									return;
								}else{
									SimConfirmAnswer();
								}
							}else{
								SetSimScreen(data.GotoScreenID);
								return;
							}
						}
					})
					break;
				case QuestionSimItemTypesEnum.DRAG:
					htmlStr = '\
						<div class="' + (DATA.ShowSimHotspots ? 'sim_item_debug' : 'sim_item') + '" style="\
							position: absolute;\
							left: ' + itmData.TargetX + 'px;\
							top: ' + itmData.TargetY + 'px;\
							width: ' + itmData.TargetWidth + 'px;\
							height: ' + itmData.TargetHeight + 'px;">\
						</div>\
						<div class="' + (DATA.ShowSimHotspots ? 'sim_item_debug' : 'sim_item') + '" style="\
							position: absolute;\
							left: ' + itmData.X + 'px;\
							top: ' + itmData.Y + 'px;\
							width: ' + itmData.Width + 'px;\
							height: ' + itmData.Height + 'px;\
							background-color: rgba(255,255,255,0);">\
						</div>';
					simData.$ContainerBox.append(htmlStr);
					var $Drag = simData.$ContainerBox.children().last();
					var $Target = $Drag.prev();
					$Target.on(inputEvent.Start, function(e){e.preventDefault(); return false;});
					var img = GetPreloadedImage(simData.resources, itmData.Image);
					simData.$ContainerBox.append(img);
					var $DragImage = simData.$ContainerBox.children().last();
					$DragImage.css({'position':'absolute'});
					$DragImage.on('dragstart', function(e){e.preventDefault(); return false;});
					$DragImage.hide();
					$Drag.data('itmData', itmData);
					$Drag.data('dragImage', $DragImage);
					$Drag.on(inputEvent.Start, function(e){
						e.preventDefault();
						e.stopPropagation();
						var $This = $(this);
						var data = $This.data('itmData');
						var buttonNumOk = (inputEvent.Type === InputEventsEnum.TOUCH ? true : (e.which === data.MouseButton));
						if(buttonNumOk){
							$Image = $This.data('dragImage');
							function SimDragMove(e, pos){
								var offset = simData.$ContainerBox.offset();
								var x = 0;
								var y = 0;
								if(inputEvent.Type === InputEventsEnum.TOUCH){
									if(e.originalEvent.touches.length < 1){
										x = e.originalEvent.changedTouches[0].pageX - offset.left;
										y = e.originalEvent.changedTouches[0].pageY - offset.top;										
									}else{
										x = e.originalEvent.touches[0].pageX - offset.left;
										y = e.originalEvent.touches[0].pageY - offset.top;
									}
								}else{
									x = e.pageX - offset.left;
									y = e.pageY - offset.top;									
								}
								if(pos) return {x: x | 0, y: y | 0};			
								x -= $Image.width() * .5;
								y -= $Image.height() * .5;
								$Image.css({left: x | 0, top: y | 0});									
							}
							SimDragMove(e);
							$Image.show();
							$Window.on(inputEvent.End, function(e){				
								$Window.off(inputEvent.Move);
								$Window.off(inputEvent.End);
								$Image.hide();								
								var pos = SimDragMove(e, true);
								if(
									pos.x >= data.TargetX && 
									pos.x <= data.TargetX + data.TargetWidth &&
									pos.y >= data.TargetY &&
									pos.y <= data.TargetY + data.TargetHeight
								){	
									SetSimScreen(data.GotoScreenID);
								}else{
								 	SimConfirmAnswer();
								}
							});
							$Window.on(inputEvent.Move, function(e){
								SimDragMove(e);
							});							
							return;
						}else{
							SimConfirmAnswer();
						}
					})
					break;
			}
		}
		// SET FOCUS ON FIRST INPUT TEXT (IF ANY)
		var $Inputs = $('input[type=text]', simData.$ContainerBox);
		if ($Inputs.length > 0) {
			setTimeout(function(){
				$Inputs[0].focus();
			}, 500);
		}
	}
	
	function SimConfirmAnswer(){
		ShowModalWindow(true, STR.ConfirmAnswer, 
			function(){
				ShowModalWindow(false);
				simData.answered = true;
				ValidateAnswer();		
			},
			function(){
				ShowModalWindow(false);
				SetSimScreen(simData.question.Data.Screens[0].ScreenID);
			}
		);
	}
	
	function GetRemainingQuestions(){
		var remainingQuestions = [];
		for(var i = 0, cnt = RESULT.Questions.length; i < cnt; i++){
			var question = RESULT.Questions[i];
			if(!question.Answered) remainingQuestions.push(question);
		}
		return remainingQuestions;
	}
	
	function SetRemainingQuestions(remainingQuestions){
		$MainHeaderQuestions.hide();
		$MainContent.css({'visibility':'hidden'});
		$MainContent.empty();
		// REMAINING QUESTION HEADER
		var htmlStr = '\
			<div id="remaining_questions_header">\
				<div id="remaining_questions_header_icon"></div>\
				<div id="remaining_questions_header_text">' + STR.RemainingQuestions + '</div>\
			</div>\
			<div id="remaining_questions_container">\
				<div id="remaining_questions_instruction_text">' + STR.RemainingQuestionsInstruction + '</div>\
			</div>';				
		$MainContent.append(htmlStr);	
		var $RemainingQuestionsContainer = $('#remaining_questions_container', $MainContent);
		htmlStr = '';
		for(var i = 0, cnt = remainingQuestions.length; i < cnt; i++){
			var question = remainingQuestions[i];
			var itm = '\
				<div class="remaining_questions_item" data-id="' + question.Order + '">\
					<div class="remaining_questions_item_rect">\
						<div class="remaining_questions_item_rect">\
							<div class="remaining_questions_item_rect_number">' + (question.Order + 1) + '</div>\
						</div>\
					</div>\
					<div class="remaining_questions_item_icon"></div>\
					<div class="remaining_questions_item_text">' + question.Text + '</div>\
				</div>';
			htmlStr += itm;
		}
		$RemainingQuestionsContainer.append(htmlStr);
		var $Qestions = $('.remaining_questions_item', $RemainingQuestionsContainer);
		$Qestions.on(inputEvent.Start, function(e){
			e.preventDefault();
			e.stopPropagation();
			var $This = $(this);
			var id = parseInt($This.attr('data-id'));
			DoQuestion(id);
		});		
		// ADD SKIP REMAINING QUESTIONS BUTTON
		$RemainingQuestionsContainer.append('<div id="button" class="button button_test">' + STR.RemainingQuestionsSkipButton + '</div>');
		var $Button = $RemainingQuestionsContainer.children().last();
		SetButton($Button, function(e){
			e.preventDefault();
			e.stopPropagation();
			ShowModalWindow(true, STR.RemainingQuestionsSkipWarning, 
				function(){
					ShowModalWindow(false);
					SetAppState(AppStatesEnum.END);
				},
				function(){
					ShowModalWindow(false);
				}
			);
		});
		$MainContent.scrollTop(0);
		$MainContent.css({'visibility':'visible'});
		$MainContent.hide();
		$MainContent.fadeIn(TimesEnum.FADE);
	}	
	
	function ValidateAnswer(){
		var question = TEST.Questions[currentQuestion];
		var $QuestionContainer = $('#question_container', $MainContent);
		var answered = false;
		var correct = true;		
		switch(question.Type){
			case QuestionTypesEnum.MULTICHOICE:
				var $Items = $('.item', $QuestionContainer);
				$Items.each(function(index){
					var $This = $(this);
					var answerValue =  question.Data.Answers[index].Correct;
					var userValue = $This.attr('data-selected') === 'true';
					if(answerValue !== userValue) correct = false;
					if(userValue) answered = true;
				});
				break;
			case QuestionTypesEnum.MATCHING:
				var $Selects = $('.matching_select', $QuestionContainer);
				$Selects.each(function(index){
					var $This = $(this);
					var answerValue =  question.Data.Right[index].Key;
					var userValue = $This.val();
					if(answerValue !== userValue) correct = false;
					if($This.prop('selectedIndex') > -1) answered = true;
				});
				break;
			case QuestionTypesEnum.FILL:
				var $FillContainerBox = $('.fill_container_box', $QuestionContainer);
				var $Fields = $('.fill_textarea, .fill_field', $QuestionContainer);
				$Fields.each(function(index){
					var $This = $(this);
					var answerValue =  question.Data.Fields[index].CompareWith;
					var userValue = $This.val();
					if(answerValue != ''){
						if(answerValue.toLowerCase() !== userValue.trim().toLowerCase()) correct = false;
					}
					if(userValue != '') answered = true;
				});
				$Fields.blur();
				break;
			case QuestionTypesEnum.SIM:
				answered = simData.answered;
				correct = simData.correct;
				break;
			case QuestionTypesEnum.URL:
				if(!question.Hidden){
					var $URL = $('#url_input', $QuestionContainer);
					var $Verify = $('#url_input_verify', $QuestionContainer);
					$URL.blur();
					$Verify.blur();
					var url = $URL.val().trim();
					var verify = $Verify.val().trim();
					if(url !== ''){
						if(url !== verify){
							ShowModalWindow(true, STR.URLMismatch, function(){ShowModalWindow(false);});
							return;
						}
						answered = true;
						correct = false;
						// UNIQUE MEMBER FOR THIS KIND OF QUESTION
						RESULT.Questions[currentQuestion].URL = url;
					}
				}else{
					answered = true;
					correct = false;
					RESULT.Questions[currentQuestion].URL = '';				
				}				
				break;
		}
		if(!answered) correct = false;
		RESULT.Questions[currentQuestion].Answered = answered;
		RESULT.Questions[currentQuestion].Correct = correct;
		if(currentAppState === AppStatesEnum.REMAINING){
			SetAppState(AppStatesEnum.REMAINING);
		}else{
			DoQuestion();
		}
	}
	
	function ShowModalWindowLoader(bool, text){
		if(bool){
			$ModalWindowMessageLoaderBar.css({'width':'0%'});
			$ModalWindowMessageLoader.show();
			$ModalWindowMessageBoxText.text(text);
			$Modal.show();
		}else{
			$Modal.hide();
			$ModalWindowMessageLoaderBar.css({'width':'0%'});
			$ModalWindowMessageLoader.hide();
			$ModalWindowMessageBoxText.text('');
		}
	}
	
	function LoaderProgress(percentage){
		$ModalWindowMessageLoaderBar.css({'width': (percentage * 100) + '%'});
	}
	
	function ShowModalWindow(bool, text, okCallback, noCallback){
		if(bool){
			$ModalWindowMessageLoader.hide();
			var htmlStr = '\
				<div id="modal_window_message_button_ok" class="button button_ok">' + STR.MessageWindowOK + '</div>\
				<div id="modal_window_message_button_no" class="button button_no">' + STR.MessageWindowNo + '</div>';
			$ModalWindowMessage.append(htmlStr);
			var $ButtonOK = $('#modal_window_message_button_ok', $ModalWindowMessage);
			var $ButtonNo = $('#modal_window_message_button_no', $ModalWindowMessage);
			$ButtonOK.on(inputEvent.Start, function(e){
				e.preventDefault();
				e.stopPropagation();
				okCallback();
			});
			
			if(typeof noCallback === 'undefined'){
				$ButtonNo.hide();
			}else{
				$ButtonNo.show();
				$ButtonNo.on(inputEvent.Start, function(e){
					e.preventDefault();
					e.stopPropagation();
					noCallback();
				});				
			}
			$ModalWindowMessageBoxText.text(text);
			$Modal.show();
		}else{
			$Modal.hide();
			$('#modal_window_message_button_ok', $ModalWindowMessage).remove();
			$('#modal_window_message_button_no', $ModalWindowMessage).remove();
		}
	}
	
	function ShowModalWindowSaveResult(bool, text){
		if(bool){
			$ModalWindowMessageLoaderBar.css({'width':'0%'});
			$ModalWindowMessageLoader.show();
			$ModalWindowMessageBoxText.text(text);
			$ModalWindowMessageLoaderBar.animate({width: '100%'}, TimesEnum.SENDINGRESULT);
			$Modal.show();
		}else{
			$Modal.hide();
			$ModalWindowMessageLoaderBar.stop();
			$ModalWindowMessageLoaderBar.css({'width':'0%'});
			$ModalWindowMessageLoader.hide();
			$ModalWindowMessageBoxText.text('');
		}
	}
	
	function SaveResult(){
		ShowModalWindowSaveResult(true, STR.SavingResults);
		SendResult();
	}
	
	function SendResult(){
		XHRPool('removeAll');
		Ajax(DATA.PHPPath, {command: 'save', userID: RESULT.UserID, testID: RESULT.ID, data: JSON.stringify(RESULT)}, SendResultResponse);	
	}
	
	function SendResultResponse(response){
		if(response.error){
			console.log(response.errorText);
			ShowModalWindowSaveResult(false);
			ShowModalWindow(true, STR.SavingResultsFail, 
				function(){
					ShowModalWindow(false);
					SaveResult();
				}, 
				function(){
					ShowModalWindow(false);
					Finished();
				}
			);
			return;
		}
		ShowModalWindowSaveResult(false);
		Finished();
	}
	
	function Finished(){
		$MainContent.css({'visibility':'hidden'});
		$MainContent.empty();
		var htmlStr = '\
			<div id="finished_container">\
				<div id="finished_box_text">' + STR.FinishedMessage + '</div>\
				<div id="button" class="button button_test">' + STR.Finished + '</div>\
			</div>';				
		$MainContent.append(htmlStr);	
		var $FinishedContainer = $('#finished_container', $MainContent);
		var $Button = $FinishedContainer.children().last();
		SetButton($Button, function(e){
			e.preventDefault();
			e.stopPropagation();
			SetAppState(AppStatesEnum.HOME);
		});
		$MainContent.scrollTop(0);
		$MainContent.css({'visibility':'visible'});
		$MainContent.hide();
		$MainContent.fadeIn(TimesEnum.FADE);
	}	
	
	function GetPreloadedImage(images, path){
		var fileName = path.split('/').pop();
		for(var i = 0, cnt = images.length; i < cnt; i++){
			var imageFileName = images[i].src.split('/').pop();
			if(fileName === imageFileName) return images[i];			
		}
		return '';
	}
	
	// COMBINE PATHS
	function GetAssetsPath(path){
		return DATA.AssetsPath + path;
	}
	
	//////////////////////////////////////////////////////////////////////
	///////////////////////////// TOOLBOX ////////////////////////////////
	//////////////////////////////////////////////////////////////////////
		
	// GENERIC FUNCTION FOR PRELOAD IMAGES
	function PreloadImages(images, callback, progress) {
		var preload = [];
		var cnt = images.length;
		var current = 0;
		var ok = true;
		if(typeof progress !== 'undefined') progress(0.0);
		function OnLoaded(e){
			current++;
			if(e.type === 'error') ok = false;
			if(typeof progress !== 'undefined') progress(current/cnt);
			if(current === cnt && typeof callback !== 'undefined') callback(ok, preload);
		}
		for(var i = 0; i < cnt; i++) { 
			preload[i] = new Image();
			preload[i].onload = OnLoaded;
			preload[i].onerror = OnLoaded;
			preload[i].src = images[i];
		}
	}
	
	// SETING BUTTONS FUNCTION 
	function SetButton($El, fnt){
		$El.on(inputEvent.Start, fnt);
	}
	
	function DisableButton($El){
		$El.off(inputEvent.Start);
	}
	
	// GET INPUT EVENT SUPPORTED
	function GetInputEvent()
	{
		var Event = {};
		if ('ontouchstart' in window)
		{
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
	
	function TimerCountdown(){
		var t = {};
		t.intervalDelay = 500;
		t.interval = 0;
		t.totalTime;
		t.currentTime;
		t.target;
		t.callback;
		t.Set = function(minutes, $Target, callback){
			clearInterval(t.interval);
			t.totalTime = minutes * 60 * 1000;
			t.currentTime = t.totalTime;
			t.target = $Target;
			t.callback = callback;
			t.target.text(t.MSToString(t.currentTime));
		}
		t.Start = function(){
			clearInterval(t.interval);
			t.interval = setInterval(t.Update, t.intervalDelay);
		}
		t.Stop = function(){
			clearInterval(t.interval);
		}		
		t.Update = function(){	
			t.currentTime -= t.intervalDelay;
			if(t.currentTime > 0){
				t.target.text(t.MSToString(t.currentTime));
				return;
			}
			clearInterval(t.interval);
			t.target.text(t.MSToString(0));
			t.callback();
		}
		t.MSToString = function(ms){
			var hours = parseInt((ms / (1000 * 60 * 60)) % 24);
			var minutes = parseInt((ms / (1000 * 60)) % 60);
			var seconds = parseInt((ms / 1000) % 60);		
			return hours + ':' + (minutes < 10 ? '0' + minutes : minutes.toString()) + ':' + (seconds < 10 ? '0' + seconds : seconds.toString());			
		}
		return t;
	}
	
	// END OF FILE
});