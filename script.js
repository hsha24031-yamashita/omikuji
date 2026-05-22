document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('draw-btn');
    const consultBtn = document.getElementById('consult-btn');
    const reportArea = document.getElementById('report-area');
    const reportBtn = document.getElementById('report-btn');
    const actionInput = document.getElementById('action-input');
    const messageBubble = document.getElementById('message-bubble');
    const omikujiText = document.getElementById('omikuji-text');
    const charElement = document.getElementById('character');
    const growthLog = document.getElementById('growth-log');
    const evolutionText = document.getElementById('evolution-stage');

    let experience = 0;
    let day = 1;

    const fortunes = ["大吉", "中吉", "小吉", "吉"];
    const advices = [
        "今日は小さな成功を自分自身で褒めてあげましょう。",
        "焦らず、自分のペースを守ることが目標達成への近道です。",
        "新しい視点を取り入れると、視界が開けるかもしれません。",
        "感謝の気持ちを言葉にすると、運気がさらに上がります。",
        "まずは5分だけ、一番やりたくないことから手をつけてみて。"
    ];

    function showMessage(text) {
        omikujiText.innerText = text;
        messageBubble.classList.remove('hidden');
        // 自動で消えるアニメーション
        setTimeout(() => {
            messageBubble.classList.add('hidden');
        }, 6000);
    }

    function updateEvolution() {
        if (experience >= 10) {
            charElement.className = 'character grown';
            evolutionText.innerText = '成長した姿';
        } else if (experience >= 3) {
            charElement.className = 'character baby';
            evolutionText.innerText = '赤ちゃんの状態';
        }
    }

    drawBtn.addEventListener('click', () => {
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        const advice = advices[Math.floor(Math.random() * advices.length)];
        showMessage(`【${fortune}】\n${advice}`);
        reportArea.classList.remove('hidden');
        
        // 演出：手紙を持ってきたような動き
        charElement.style.transform = 'translateY(-10px)';
        setTimeout(() => charElement.style.transform = '', 300);
    });

    consultBtn.addEventListener('click', () => {
        const quickAdvices = [
            "君ならできるって信じてるよ！",
            "無理しすぎないで、少し休んでもいいんだよ。",
            "一歩ずつ進んでいこう。僕が見守ってるからね。",
            "深呼吸してみて。大丈夫、うまくいくよ。"
        ];
        const randomQuick = quickAdvices[Math.floor(Math.random() * quickAdvices.length)];
        showMessage(randomQuick);
    });

    reportBtn.addEventListener('click', () => {
        const action = actionInput.value.trim();
        if (action) {
            experience += 1;
            
            // ログの追加
            const log = document.createElement('div');
            log.className = 'log-item';
            log.innerText = `${action} を実践した！`;
            growthLog.prepend(log);
            
            actionInput.value = '';
            updateEvolution();
            showMessage("すごい！一歩前進だね！僕も嬉しいよ！");
            
            // 跳ねるアニメーション
            charElement.style.transform = 'scale(1.2) translateY(-20px)';
            setTimeout(() => updateEvolution(), 400);
        }
    });

    // キャラクタークリックで反応
    charElement.addEventListener('click', () => {
        const reactions = ["なでなで？", "えへへ！", "頑張ろうね！", "お腹すいたかな？"];
        showMessage(reactions[Math.floor(Math.random() * reactions.length)]);
        charElement.style.transform = 'scale(1.1)';
        setTimeout(() => updateEvolution(), 200);
    });
});