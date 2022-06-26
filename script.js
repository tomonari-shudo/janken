const imgGu = document.getElementById('imgGu');
const imgChoki = document.getElementById('imgChoki');
const imgPa = document.getElementById('imgPa');
const imgRival = document.getElementById('imgRival');
const paragraph = document.getElementById('paragraph');
const resultText = document.getElementById('result');
const reStartButton = document.getElementById('reStart');
const scoreButton = document.getElementById('score');
const gameArea = document.getElementById('gameArea');

let endFlag = false;
let win = 0;
let lose = 0;
let draw = 0;
let player = [];
let rival = [];
let result = [];
let handArray = ['グー', 'チョキ', 'パー'];
let winOrLose = ['勝ち', '負け', 'あいこ'];

function game(num){
  if(endFlag){
    return;
  }
  endFlag=true;

  paragraph.innerText = 'ポン！';

  player.push(num);

  if(num===0){
    imgChoki.classList.add('hide');
    imgPa.classList.add('hide');
  }else if(num===1){
    imgGu.classList.add('hide');
    imgPa.classList.add('hide');
  }else{
    imgChoki.classList.add('hide');
    imgGu.classList.add('hide');
  }

  const randomNum = Math.floor(Math.random()*3);
  rival.push(randomNum);

  if(randomNum === 0){
    imgRival.src = 'img/imgGu.png';
  }else if(randomNum === 1){
    imgRival.src = 'img/imgChoki.png';
  }else if(randomNum === 2){
    imgRival.src = 'img/imgPa.png';
  }

  if(num === randomNum){
    resultText.innerText = 'あいこです';
    draw++;
    result.push(2);
  }else if(num === 0 && randomNum === 1){
    resultText.innerText = 'あなたの勝ちです';
    win++;
    result.push(0);
  }else if(num === 1 && randomNum === 2){
    resultText.innerText = 'あなたの勝ちです';
    win++;
    result.push(0);
  }else if(num === 2 && randomNum === 0){
    resultText.innerText = 'あなたの勝ちです';
    win++;
    result.push(0);
  }else{
    resultText.innerText = 'あなたの負けです';
    lose++;
    result.push(1);
  }

  reStartButton.classList.remove('hide');

  scoreButton.classList.remove('hide');
}

reStartButton.onclick = () => {
  endFlag=false;

  paragraph.innerText = '最初はグー！じゃんけん・・・';

  gameArea.classList.remove('hide');

  imgRival.src = 'img/imgRival.png';
  imgGu.classList.remove('hide');
  imgChoki.classList.remove('hide');
  imgPa.classList.remove('hide');

  resultText.innerText = '';

  reStartButton.classList.add('hide');
  scoreButton.classList.add('hide');
}

scoreButton.onclick = () => {
  let text = (win + lose + draw) + '戦: ' + win + '勝 ' + lose + '敗 ' + draw + '分\n\n';
  for(let i=0;i<result.length;i++){
    text += i+1+ '戦目 ' + winOrLose[result[i]];
    text += ' [あなたの手：' + handArray[player[i]];
    text += ', 相手の手：' + handArray[rival[i]] + ']\n';
  }
  paragraph.innerText = text;

  gameArea.classList.add('hide');
  scoreButton.classList.add('hide');
}