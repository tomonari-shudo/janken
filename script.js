const imgGu = document.getElementById('img-gu');
const imgChoki = document.getElementById('img-choki');
const imgPa = document.getElementById('img-pa');
const imgRival = document.getElementById('imgRival');
const paragraph = document.getElementById('paragraph');
const resultText = document.getElementById('result');
const reStartButton = document.getElementById('reStart');
const scoreButton = document.getElementById('score');
const gameArea = document.getElementById('gameArea');

let win = 0;
let lose = 0;
let draw = 0;
let player = [];
let enemy = [];
let result = [];
let handMap = new Map([[0, 'グー'], [1, 'チョキ'], [2, 'パー']]);
let winOrLose = new Map([[0, '勝ち'], [1, '負け'], [2, 'あいこ']]);
let endFlag = false;

/**
 * じゃんけんゲームを実行
 * @param {int} num プレイヤーの手 0:グー 1:チョキ 2:パー
 */
function game(num){
  /**
   * 勝敗画面であればこの後の処理を行わない
   */
  if(endFlag){
    return 0;
  }
  player.push(num);
  //
  endFlag=true;
  //掛け声を画面に表示
  paragraph.innerText = 'ポン！'
  /**
   * 選択した手以外の画像を消す
   */
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

  //0~2までの乱数を作成(=> CPUの手 0:グー 1:チョキ 2:パー)
  const randomNum = Math.floor(Math.random()*3);
  enemy.push(randomNum);
  /**
   * CPUの出した手を画面に表示する
   */
  if(randomNum === 0){
    imgRival.src = 'img/img_gu.png';
  }else if(randomNum === 1){
    imgRival.src = 'img/img_choki.png';
  }else if(randomNum === 2){
    imgRival.src = 'img/img_pa.png';
  }
  /**
   * 勝敗を判定して結果を画面に表示
   */
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
  //再戦ボタンを表示する
  reStartButton.classList.remove('hide');
  //得点ボタンを表示する
  scoreButton.classList.remove('hide');
}

/**
 * 「もう一度挑戦する」ボタンを押した時の処理
 */
reStartButton.onclick = () => {
  scoreButton.classList.remove('hide');
  gameArea.classList.remove('hide');
  paragraph.innerText = '最初はグー！じゃんけん・・・';
  imgRival.src = 'img/imgRival.png';
  imgGu.classList.remove('hide');
  imgChoki.classList.remove('hide');
  imgPa.classList.remove('hide');
  resultText.innerText = '';
  reStartButton.classList.add('hide');
  scoreButton.classList.add('hide');
  endFlag=false;
}

/**
 * 「結果を表示」ボタンを押した時の処理
 */
scoreButton.onclick = () => {
  let text = (win+lose+draw) + '戦: ' + win + '勝 ' + lose + '敗 ' + draw + '分\n\n';
  for(let i=0;i<result.length;i++){
    text += i+1+ '戦目 ' + winOrLose.get(result[i]) + ' [あなたの手：' + handMap.get(player[i]) + ', 相手の手：' + handMap.get(enemy[i]) + ']\n';
  }
  gameArea.classList.add('hide');
  paragraph.innerText = text;
  scoreButton.classList.add('hide');
}