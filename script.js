let currentStep = 1;
let userCourse = '';
let logs = [];

// 動物の10段階進化データ
const evolutionMap = {
    study:    ['🥚', '🐣', '🐤', '🐥', '🦉', '🦉', '📜🦉', '🎓🦉', '📖🦉', '🦉✨'],
    sport:    ['🥚', '🐣', '🐱', '🐈', '🐆', '🐆', '🐅', '🐅', '🦁', '👑🦁'],
    art:      ['🥚', '🐣', '🐦', '🕊️', '🦜', '🦜', '🦚', '🦚', '🦚🌈', '🦚✨'],
    business: ['🥚', '🐣', '🐍', '🐍', '🦎', '🐊', '🐉', '🐉', '🐲', '🐲✨'],
    saving:   ['🥚', '🐣', '🐿️', '🐿️', '🐿️🌰', '🐿️🥜', '🐿️🧺', '🐿️💰', '🐿️💎', '🐿️👑'],
    love:     ['🥚', '🐣', '🐧', '🐧', '🐧❄️', '🐧💙', '🐧💖', '🐧🐚', '🐧💎', '🐧✨'],
    beauty:   ['🥚', '🐣', '🐈', '🐈', '🐈🐾', '🐈🎀', '🐈💅', '🐈✨', '🐈🌙', '🐈💎']
};

const stageNames = ["卵", "孵化", "幼少期", "成長期", "青年期", "成熟期", "開花期", "熟練期", "超越期", "守護獣（完成）"];

// おみくじデータ
const fortuneData = [
    { rank: "大大吉", color: "#FFD700", msg: "天からの絶大なる加護があります。" },
    { rank: "大吉", color: "#ef4444", msg: "素晴らしい運気です。" },
    { rank: "中吉", color: "#f97316", msg: "安定した良い運勢です。" },
    { rank: "小吉", color: "#fbbf24", msg: "控えめな幸せが訪れます。" },
    { rank: "吉", color: "#34d399", msg: "まずまずの運勢です。" },
    { rank: "末吉", color: "#94a3b8", msg: "今は耐える時ですが、光は見えています。" },
    { rank: "凶後吉", color: "#818cf8", msg: "最初は苦労しますが、最後には報われます。" }
];

// 初期設定
function initGame(course, label) {
    userCourse = course;
    document.getElementById('goal-selector').classList.add('hidden');
    document.getElementById('action-panel').classList.remove('hidden');
    document.getElementById('animal-name').innerText = label;
    updateUI();
}

// おみくじを引く
const drawBtn = document.getElementById('simple-draw-btn');
if (drawBtn) {
    drawBtn.addEventListener('click', () => {
        drawBtn.innerText = "運命を待つ...";
        drawBtn.disabled = true;

        // 🏮を揺らす演出（簡易）
        const box = document.getElementById('omikuji-box');
        box.style.animation = "shake 0.5s infinite";

        setTimeout(() => {
            box.style.animation = "none";
            const f = fortuneData[Math.floor(Math.random() * fortuneData.length)];
            
            const adviceMap = {
                study: `${f.msg} 基礎を3つだけ見直すと知恵が定着します。`,
                sport: `${f.msg} 深呼吸をして、いつもより遠くまで歩いてみましょう。`,
                art: `${f.msg} 目に映る色の変化を心に留めて。`,
                business: `${f.msg} 丁寧な一言が大きな成功へ繋がります。`,
                saving: `${f.msg} 固定費を一つ精査する好機です。`,
                love: `${f.msg} 大切な人に今の気持ちを伝えて。`,
                beauty: `${f.msg} お気に入りの香りで心を潤しましょう。`
            };

            const rankBadge = document.getElementById('rank-badge');
            rankBadge.innerText = f.rank;
            rankBadge.style.color = f.color;
            
            document.getElementById('ai-action').innerText = adviceMap[userCourse];
            
            // 画面切り替え
            document.getElementById('draw-view').classList.add('hidden');
            document.getElementById('result-view').classList.remove('hidden');
            
            drawBtn.innerText = "おみくじを引く";
            drawBtn.disabled = false;
        }, 1200);
    });
}

// 完了報告
const completeBtn = document.getElementById('complete-btn');
if (completeBtn) {
    completeBtn.addEventListener('click', () => {
        if (currentStep < 10) {
            const action = document.getElementById('ai-action').innerText;
            const rank = document.getElementById('rank-badge').innerText;
            logs.push(`${new Date().toLocaleTimeString()} [${rank}] ${action}`);
            
            currentStep++;
            updateUI();
            refreshLog();
            
            // 画面を戻す
            document.getElementById('result-view').classList.add('hidden');
            document.getElementById('draw-view').classList.remove('hidden');
        } else {
            alert("最終進化達成！");
        }
    });
}

function updateUI() {
    document.getElementById('step-counter').innerText = `LV. ${currentStep}`;
    document.getElementById('progress-bar').style.width = `${currentStep * 10}%`;
    document.getElementById('animal-sprite').innerText = evolutionMap[userCourse][currentStep - 1];
    document.getElementById('animal-message').innerText = `第 ${currentStep} 形態: ${stageNames[currentStep - 1]}`;
}

function refreshLog() {
    const list = document.getElementById('log-list');
    if (list) {
        list.innerHTML = logs.map(l => `<li style="margin-bottom:5px; border-bottom:1px solid #333; padding-bottom:5px;">${l}</li>`).reverse().join('');
    }
}

// ログの開閉
const toggleBtn = document.getElementById('toggle-log');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const logList = document.getElementById('log-list');
        logList.classList.toggle('hidden');
    });
}