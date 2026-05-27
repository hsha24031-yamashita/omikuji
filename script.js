let currentStep = 1;
let userCourse = '';
let logs = [];

const evolutionMap = {
    study:    ['🥚', '🐣', '🐤', '🐥', '🦉', '🦉', '📜🦉', '🎓🦉', '📖🦉', '🦉✨'],
    sport:    ['🥚', '🐣', '🐱', '🐈', '🐆', '🐆', '🐅', '🐅', '🦁', '👑🦁'],
    art:      ['🥚', '🐣', '🐦', '🕊️', '🦜', '🦜', '🦚', '🦚', '🦚🌈', '🦚✨'],
    business: ['🥚', '🐣', '🐍', '🐍', '🦎', '🐊', '🐉', '🐉', '🐲', '🐲✨'],
    saving:   ['🥚', '🐣', '🐿️', '🐿️', '🐿️🌰', '🐿️🥜', '🐿️🧺', '🐿️💰', '🐿️💎', '🐿️👑'],
    love:     ['🥚', '🐣', '🐧', '🐧', '🐧❄️', '🐧💙', '🐧💖', '🐧🐚', '🐧💎', '🐧✨'],
    beauty:   ['🥚', '🐣', '🐈', '🐈', '🐈🐾', '🐈🎀', '🐈💅', '🐈✨', '🐈🌙', '🐈💎']
};

const stageNames = ["卵", "孵化", "幼少", "成長", "青年", "成熟", "開花", "熟練", "超越", "守護"];

const fortuneData = [
    { rank: "大大吉", color: "#FFD700", msg: "最高の運気！" },
    { rank: "大吉", color: "#ef4444", msg: "素晴らしい運勢。" },
    { rank: "中吉", color: "#f97316", msg: "安定しています。" },
    { rank: "小吉", color: "#fbbf24", msg: "小さな幸せ。" },
    { rank: "吉", color: "#34d399", msg: "まずまずです。" },
    { rank: "末吉", color: "#94a3b8", msg: "光は見えます。" },
    { rank: "凶後吉", color: "#818cf8", msg: "最後は報われる。" }
];

function initGame(course, label) {
    userCourse = course;
    document.getElementById('goal-selector').classList.add('hidden');
    document.getElementById('action-panel').classList.remove('hidden');
    document.getElementById('animal-name').innerText = label;
    updateUI();
}

const drawBtn = document.getElementById('simple-draw-btn');
drawBtn.addEventListener('click', () => {
    drawBtn.innerText = "運命を待つ...";
    drawBtn.disabled = true;
    document.getElementById('omikuji-box').classList.add('shake');

    setTimeout(() => {
        document.getElementById('omikuji-box').classList.remove('shake');
        const f = fortuneData[Math.floor(Math.random() * fortuneData.length)];
        const rankBadge = document.getElementById('rank-badge');
        rankBadge.innerText = f.rank;
        rankBadge.style.color = f.color;
        document.getElementById('ai-action').innerText = f.msg + " 準備は整いました。";
        
        document.getElementById('draw-view').classList.add('hidden');
        document.getElementById('result-view').classList.remove('hidden');
        drawBtn.innerText = "おみくじを引く";
        drawBtn.disabled = false;
    }, 1000);
});

document.getElementById('complete-btn').addEventListener('click', () => {
    if (currentStep < 10) {
        logs.push(`${new Date().toLocaleTimeString()} [${document.getElementById('rank-badge').innerText}] 成長`);
        currentStep++;
        updateUI();
        refreshLog();
        document.getElementById('result-view').classList.add('hidden');
        document.getElementById('draw-view').classList.remove('hidden');
    } else {
        alert("最終進化達成！");
    }
});

function updateUI() {
    document.getElementById('step-counter').innerText = `LV. ${currentStep}`;
    document.getElementById('progress-bar').style.width = `${currentStep * 10}%`;
    document.getElementById('animal-sprite').innerText = evolutionMap[userCourse][currentStep - 1];
    document.getElementById('animal-message').innerText = `形態: ${stageNames[currentStep - 1]}`;
}

function refreshLog() {
    const list = document.getElementById('log-list');
    list.innerHTML = logs.map(l => `<li>${l}</li>`).reverse().join('');
}

document.getElementById('toggle-log').addEventListener('click', () => {
    const logList = document.getElementById('log-list');
    logList.classList.toggle('hidden');
});