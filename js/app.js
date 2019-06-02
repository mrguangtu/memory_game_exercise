/*
 * 创建一个包含所有卡片的数组
 */


let cardArray = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bomb","fa-bicycle","fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bomb","fa-bicycle"];

let starSection = document.querySelector('.stars');
let restartBtn = document.querySelector('.restart');
let movesText = document.querySelector('.moves');

// app states
let moves = 0;

function cardsInit(){
	// shuffle
	cardArray = shuffle(cardArray);
	// generate html
	html = generateGameborad(cardArray);
	// remove origin
	let deck = document.querySelector(".deck")
	deck.innerHTML = ''
	// add new html
	generateGameborad(cardArray);
	
	showMoves();
	
}

function removeStar(){
	child = starSection.children[0];	
	starSection.removeChild(child);	
}


function showMoves(){
	movesText.innerText = moves;
}

// function createCard(className){
// 	shuffle(cardArray);
	
// 	var element = document.createElement(tagname","options);
// }


cardsInit();

function addMoveCount(){
	moves+=1;
	showMoves();
}



// $(".card").on('click',function(){
// 	moves ++;
// 	moves == 1 ? setInterval(setTime, 1000) : '';
// 	$(this).attr('disabled','disabled');
// 	matcher(this);
// })



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


// 翻转卡片

// 匹配卡片
// 



// 填充ul
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
	})	
}

// function compareCards(cardA","cardB){

// }

// function gameOver(){

// }
