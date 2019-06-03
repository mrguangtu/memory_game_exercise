/*
 * 创建一个包含所有卡片的数组
 */

//卡片数组
let cardArray = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bomb","fa-bicycle","fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bomb","fa-bicycle"];

//基本功能按键
let starSection = document.querySelector('.stars');
let restartBtn = document.querySelector('.restart');
let movesText = document.querySelector('.moves');
let timerText = document.querySelector('.timer');
restartBtn.addEventListener('click',cardsInit);

// app states
let moves = 0;
let watch = new StopWatch();
let click1 = '';
let click2 = '';
let isFirstMove = true;
let openCards = [];//当前判断应打开的卡片
let flippedCards = [];//已确定正确的卡片
let starCount = 3;


//开始计时
function startTimer(){
	watch.startTimer(function(){
		timerText.innerText = watch.getTimeString();
	})
}

//结束计时
function stopTimer(){
	watch.stopTimer();
}

//初始化游戏
function cardsInit(){
	// shuffle
	cardArray = shuffle(cardArray);
	// generate html
	// html = generateGameborad(cardArray);
	// remove origin
	let deck = document.querySelector(".deck")
	deck.innerHTML = ''
	// add new html
	generateGameborad(cardArray);
	moves = 0;
	showMoves();
	watch = new StopWatch();
	isFirstMove = true;
	click1 = '';
	click2 = '';
	timerText.innerText = '0:00:00';
	flippedCards = [];
	openCards = [];
	starCount = 3;
	generateStar();
}

//根据星星数量绘制星星评级
function generateStar(){
	starSection.innerHTML = '';	
	for (let counti = starCount - 1; counti >= 0; counti--) {
		let li = document.createElement('li');
		let i = document.createElement('i');
		i.className = 'fa fa-star';
		li.appendChild(i);
		starSection.appendChild(li);	
	}	
}

//减少游戏评级
function removeStar(){
	child = starSection.children[0];	
	starSection.removeChild(child);	
}

//评估游戏评分难度，展示步数
function showMoves(){
	movesText.innerText = moves;
	if (moves === 8 || moves ===12 || moves ===18 ) {
		removeStar();
	}
}

// function createCard(className){
// 	shuffle(cardArray);
	
// 	var element = document.createElement(tagname","options);
// }

//初始化卡片
cardsInit();

//计数并在页面上显示步数
function addMoveCount(){
	moves+=1;
	showMoves();
}


//将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
function addToOpenCard(card){
	openCards.push(card);
	console.log(openCards);
}

//*    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
function lockOpen(){
	flippedCards.push(openCards[0]);
	flippedCards.push(openCards[1]);
	openCards = [];
}

/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
function click(){
	//第一次点击，开始计时。
	if (isFirstMove) {
		isFirstMove = false;
		startTimer();		
	}

	//防止双击bug
	if (this === openCards[0]) { return;}

	alterCard(this,true,true);	
	
	addToOpenCard(this);	

	//如果数组中已有另一张卡，请检查两张卡片是否匹配
	if (openCards.length>1){
		
		if(isMatch()){
			lockOpen();
		}
		//如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
		else{	
			//为啥这里等待时间成功，但是不能在页面中显示呢？
			sleep(100);		
			openCards.forEach(function(item){
				sleep(100);
				window.setTimeout(alterCard(item,false,false),100);
			})
			openCards = [];						
		}
		addMoveCount();
		if(isWin()){
				stopTimer();
				showCongratulations();
			}
	}
	
}

//判断是否已经赢得比赛
function isWin(){
	if (flippedCards.length>=16){
		return true;
	}
	else{
		return false;
	}
}

//显示提示游戏信息
function showCongratulations(){
	stopTimer();
	writePopupStats();
	togglePopPanel();
}

//填写弹出提示
function writePopupStats()
{
  let timeStats = document.querySelector('.pop-time');
  let clockTime = timerText.innerHTML;
  let movesStats = document.querySelector('.pop-moves');
  let starsStats = document.querySelector('.pop-stars');
  let exit = document.querySelector('.pop-close');
  let replay = document.querySelector('.pop-replay');
  exit.addEventListener('click',restartGame);
  replay.addEventListener('click',restartGame);

  timeStats.innerHTML = `Time = ${clockTime}`; 
  starsStats.innerHTML = `Stars = ${starSection.querySelectorAll('li').length}`;
  movesStats.innerHTML = `Moves = ${moves}`;
}

//重新开始游戏
function restartGame(){
	cardsInit();
	togglePopPanel();
}

//判断是否匹配
function isMatch(){
	if (openCards[0].querySelector('i').className === openCards[1].querySelector('i').className){
		return  true;
	} 
	else {
		return false;
	}
}

//显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
function alterCard(card,open,show){	
	if (open) {
		card.classList.add('open');	
		console.log('open');
	}
	else{
		card.classList.remove('open');
	}
	if(show){
		card.classList.add('show');	
	}
	else{
		card.classList.remove('show');
	}
	console.log('card alterd  ' + new Date().toTimeString());
}

//显示或隐藏积分结果
function togglePopPanel()
{
  const pop = document.querySelector('.pop');
  pop.classList.toggle('hide');
}

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// 填充ul deck
function generateGameborad(array){

	let deck = document.querySelector('.deck');

	let result = "";
	array.forEach(function(item){
		
		let li = document.createElement('li');
		li.className = 'card';
		let i = document.createElement('i');
		i.className = 'fa '+item;

		li.appendChild(i);
		deck.appendChild(li);
		li.addEventListener('click',click);		
	})	
}

//等待一段时间的函数
function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds) {
            // console.log(new Date().getTime());
        }//暂停一段时间 1000ms=1s
    }   