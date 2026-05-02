const questions = [
  {
    text: '日本で最も長い川はどれですか？',
    choices: ['利根川', '信濃川', '淀川', '石狩川'],
    answer: 1,
    explanation: '信濃川は全長約367kmで、日本最長の川です。',
  },
  {
    text: '元素記号「Au」が表す元素は何ですか？',
    choices: ['銀', '銅', '鉄', '金'],
    answer: 3,
    explanation: '「Au」はラテン語の Aurum（金）に由来する、金の元素記号です。',
  },
  {
    text: '世界で最も高い山はどれですか？',
    choices: ['K2', 'モンブラン', 'エベレスト', 'マッキンリー'],
    answer: 2,
    explanation: 'エベレスト（標高約8,849m）は世界最高峰で、ヒマラヤ山脈に位置します。',
  },
  {
    text: '光が1秒間に進む距離はおよそ何kmですか？',
    choices: ['約3万km', '約30万km', '約300万km', '約3,000万km'],
    answer: 1,
    explanation: '光速は約299,792km/秒（約30万km/秒）で、物理学における最速の速さです。',
  },
  {
    text: '日本の国鳥に指定されている鳥はどれですか？',
    choices: ['ウグイス', 'ツル', 'サギ', 'キジ'],
    answer: 3,
    explanation: 'キジは1947年に日本の国鳥に指定されました。万葉集にも登場する、日本に古くから親しまれた鳥です。',
  },
];

const TOTAL = questions.length;

let currentIndex = 0;
let score = 0;
let answered = false;

const elQuizScreen   = document.getElementById('quiz-screen');
const elResultScreen = document.getElementById('result-screen');
const elQuestionNum  = document.getElementById('question-num');
const elQuestionText = document.getElementById('question-text');
const elChoices      = document.getElementById('choices');
const elFeedback     = document.getElementById('feedback');
const elBtnNext      = document.getElementById('btn-next');
const elProgressFill = document.getElementById('progress-fill');
const elProgressLabel= document.getElementById('progress-label');
const elScoreText    = document.getElementById('score-text');
const elScoreMsg     = document.getElementById('score-msg');

document.getElementById('btn-retry').addEventListener('click', startQuiz);

function startQuiz() {
  currentIndex = 0;
  score = 0;
  elResultScreen.hidden = true;
  elQuizScreen.hidden = false;
  showQuestion();
}

function showQuestion() {
  answered = false;
  elBtnNext.hidden = true;
  elFeedback.textContent = '';
  elFeedback.className = 'feedback';

  const q = questions[currentIndex];
  elQuestionNum.textContent = `問題 ${currentIndex + 1}`;
  elQuestionText.textContent = q.text;

  elProgressLabel.textContent = `${currentIndex + 1} / ${TOTAL}`;
  elProgressFill.style.width = `${((currentIndex + 1) / TOTAL) * 100}%`;

  elChoices.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleAnswer(i));
    li.appendChild(btn);
    elChoices.appendChild(li);
  });
}

function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = elChoices.querySelectorAll('.choice-btn');
  buttons.forEach(btn => (btn.disabled = true));

  const isCorrect = selectedIndex === q.answer;
  if (isCorrect) score++;

  buttons[q.answer].classList.add('correct');
  if (!isCorrect) buttons[selectedIndex].classList.add('wrong');

  elFeedback.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
  elFeedback.textContent = isCorrect
    ? `◎ 正解！　${q.explanation}`
    : `✕ 不正解。　${q.explanation}`;

  const isLast = currentIndex === TOTAL - 1;
  elBtnNext.textContent = isLast ? '結果を見る' : '次の問題へ →';
  elBtnNext.hidden = false;
  elBtnNext.onclick = isLast ? showResult : nextQuestion;
}

function nextQuestion() {
  currentIndex++;
  showQuestion();
}

function showResult() {
  elQuizScreen.hidden = true;
  elResultScreen.hidden = false;

  elScoreText.innerHTML = `${TOTAL}問中&nbsp;<span>${score}問</span>&nbsp;正解`;

  const rate = score / TOTAL;
  let msg;
  if (rate === 1)       msg = '満点です！素晴らしい！全問正解おめでとうございます🎉';
  else if (rate >= 0.8) msg = 'あと一歩で満点！よく頑張りました。';
  else if (rate >= 0.6) msg = '半分以上正解！もう少し復習してみましょう。';
  else if (rate >= 0.4) msg = 'まだまだこれから。繰り返し挑戦してみてください。';
  else                  msg = 'もう一度チャレンジして、知識を深めましょう！';

  elScoreMsg.textContent = msg;
}

startQuiz();
