// HSK 1-3 Course Curriculum organized by weeks and lessons
// Each level has multiple weeks; each week has lessons with vocab, grammar, dialogue, quiz

export interface Word {
  hanzi: string;
  pinyin: string;
  meaning: string;
}

export interface GrammarPoint {
  title: string;
  pattern: string;
  explanation: string;
  examples: { cn: string; pinyin: string; vi: string }[];
}

export interface DialogueLine {
  speaker: "A" | "B";
  cn: string;
  pinyin: string;
  vi: string;
}

export interface QuizQ {
  question: string;
  options: string[];
  answer: number;
  explain?: string;
}

export interface Lesson {
  id: string;
  title: string;
  desc: string;
  vocab: Word[];
  grammar: GrammarPoint[];
  dialogue: { topic: string; lines: DialogueLine[] };
  quiz: QuizQ[];
}

export interface Week {
  week: number;
  title: string;
  goal: string;
  lessons: Lesson[];
}

export interface HskCourse {
  level: 1 | 2 | 3;
  totalWords: number;
  totalWeeks: number;
  description: string;
  color: string;
  weeks: Week[];
}

// ============ HSK 1 — 4 weeks, 8 lessons ============
const hsk1: HskCourse = {
  level: 1,
  totalWords: 150,
  totalWeeks: 4,
  description: "Nền tảng giao tiếp cơ bản",
  color: "#22c55e",
  weeks: [
    {
      week: 1,
      title: "Chào hỏi & Bản thân",
      goal: "Tự giới thiệu, chào hỏi cơ bản",
      lessons: [
        {
          id: "h1-w1-l1",
          title: "Chào hỏi",
          desc: "Lời chào, cảm ơn, xin lỗi",
          vocab: [
            { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào" },
            { hanzi: "再见", pinyin: "zài jiàn", meaning: "Tạm biệt" },
            { hanzi: "谢谢", pinyin: "xiè xie", meaning: "Cảm ơn" },
            { hanzi: "不客气", pinyin: "bú kè qi", meaning: "Không có chi" },
            { hanzi: "对不起", pinyin: "duì bu qǐ", meaning: "Xin lỗi" },
            { hanzi: "没关系", pinyin: "méi guān xi", meaning: "Không sao" },
            { hanzi: "你", pinyin: "nǐ", meaning: "Bạn" },
            { hanzi: "我", pinyin: "wǒ", meaning: "Tôi" },
          ],
          grammar: [
            {
              title: "Câu chào hỏi cơ bản",
              pattern: "Đại từ + 好",
              explanation: "Dùng 好 (hǎo) sau đại từ để chào hỏi.",
              examples: [
                { cn: "你好!", pinyin: "Nǐ hǎo!", vi: "Xin chào!" },
                { cn: "您好!", pinyin: "Nín hǎo!", vi: "Chào ngài (lịch sự)" },
              ],
            },
          ],
          dialogue: {
            topic: "Gặp nhau lần đầu",
            lines: [
              { speaker: "A", cn: "你好!", pinyin: "Nǐ hǎo!", vi: "Xin chào!" },
              { speaker: "B", cn: "你好!", pinyin: "Nǐ hǎo!", vi: "Xin chào!" },
              { speaker: "A", cn: "再见!", pinyin: "Zài jiàn!", vi: "Tạm biệt!" },
              { speaker: "B", cn: "再见!", pinyin: "Zài jiàn!", vi: "Tạm biệt!" },
            ],
          },
          quiz: [
            { question: "你好 nghĩa là gì?", options: ["Tạm biệt", "Xin chào", "Cảm ơn", "Xin lỗi"], answer: 1 },
            { question: "Cảm ơn trong tiếng Trung là?", options: ["对不起", "再见", "谢谢", "你好"], answer: 2 },
            { question: "Khi muốn nói 'không có chi' bạn nói?", options: ["不客气", "没关系", "再见", "你好"], answer: 0 },
          ],
        },
        {
          id: "h1-w1-l2",
          title: "Giới thiệu bản thân",
          desc: "Tên, quốc tịch, nghề nghiệp đơn giản",
          vocab: [
            { hanzi: "叫", pinyin: "jiào", meaning: "Gọi là" },
            { hanzi: "名字", pinyin: "míng zi", meaning: "Tên" },
            { hanzi: "什么", pinyin: "shén me", meaning: "Cái gì" },
            { hanzi: "是", pinyin: "shì", meaning: "Là" },
            { hanzi: "中国", pinyin: "Zhōng guó", meaning: "Trung Quốc" },
            { hanzi: "越南", pinyin: "Yuè nán", meaning: "Việt Nam" },
            { hanzi: "人", pinyin: "rén", meaning: "Người" },
            { hanzi: "认识", pinyin: "rèn shi", meaning: "Quen biết" },
          ],
          grammar: [
            {
              title: "Hỏi tên: 叫什么名字",
              pattern: "你叫什么名字?",
              explanation: "叫 (gọi là) + 什么 (gì) + 名字 (tên) — câu hỏi tên cơ bản.",
              examples: [
                { cn: "你叫什么名字?", pinyin: "Nǐ jiào shén me míng zi?", vi: "Bạn tên là gì?" },
                { cn: "我叫小明。", pinyin: "Wǒ jiào Xiǎo Míng.", vi: "Tôi tên là Tiểu Minh." },
              ],
            },
            {
              title: "Câu khẳng định với 是",
              pattern: "A + 是 + B",
              explanation: "是 (shì) = là. Dùng nối hai danh từ.",
              examples: [
                { cn: "我是越南人。", pinyin: "Wǒ shì Yuè nán rén.", vi: "Tôi là người Việt Nam." },
              ],
            },
          ],
          dialogue: {
            topic: "Làm quen",
            lines: [
              { speaker: "A", cn: "你叫什么名字?", pinyin: "Nǐ jiào shén me míng zi?", vi: "Bạn tên gì?" },
              { speaker: "B", cn: "我叫李明,你呢?", pinyin: "Wǒ jiào Lǐ Míng, nǐ ne?", vi: "Mình tên Lý Minh, còn bạn?" },
              { speaker: "A", cn: "我叫小红。我是越南人。", pinyin: "Wǒ jiào Xiǎo Hóng. Wǒ shì Yuè nán rén.", vi: "Mình tên Tiểu Hồng. Mình là người Việt Nam." },
              { speaker: "B", cn: "认识你很高兴!", pinyin: "Rèn shi nǐ hěn gāo xìng!", vi: "Rất vui được làm quen!" },
            ],
          },
          quiz: [
            { question: "'什么' nghĩa là gì?", options: ["Ai", "Cái gì", "Ở đâu", "Khi nào"], answer: 1 },
            { question: "Câu 'Bạn tên gì?' dịch sang Trung là?", options: ["你好吗?", "你是谁?", "你叫什么名字?", "你是哪国人?"], answer: 2 },
            { question: "'我是越南人' nghĩa là?", options: ["Tôi là người Trung Quốc", "Tôi là người Việt Nam", "Bạn là người Việt", "Tôi tên Việt"], answer: 1 },
          ],
        },
      ],
    },
    {
      week: 2,
      title: "Số đếm & Tuổi tác",
      goal: "Đếm số, hỏi tuổi, ngày tháng",
      lessons: [
        {
          id: "h1-w2-l1",
          title: "Số đếm 1-10",
          desc: "Học số 1-10 và cách hỏi số lượng",
          vocab: [
            { hanzi: "一", pinyin: "yī", meaning: "Một" },
            { hanzi: "二", pinyin: "èr", meaning: "Hai" },
            { hanzi: "三", pinyin: "sān", meaning: "Ba" },
            { hanzi: "四", pinyin: "sì", meaning: "Bốn" },
            { hanzi: "五", pinyin: "wǔ", meaning: "Năm" },
            { hanzi: "六", pinyin: "liù", meaning: "Sáu" },
            { hanzi: "七", pinyin: "qī", meaning: "Bảy" },
            { hanzi: "八", pinyin: "bā", meaning: "Tám" },
            { hanzi: "九", pinyin: "jiǔ", meaning: "Chín" },
            { hanzi: "十", pinyin: "shí", meaning: "Mười" },
          ],
          grammar: [
            {
              title: "Lượng từ 个",
              pattern: "Số + 个 + Danh từ",
              explanation: "个 (gè) là lượng từ phổ biến nhất, dùng cho người và vật.",
              examples: [
                { cn: "三个人", pinyin: "sān gè rén", vi: "Ba người" },
                { cn: "五个苹果", pinyin: "wǔ gè píng guǒ", vi: "Năm quả táo" },
              ],
            },
          ],
          dialogue: {
            topic: "Đếm số",
            lines: [
              { speaker: "A", cn: "你家有几个人?", pinyin: "Nǐ jiā yǒu jǐ gè rén?", vi: "Nhà bạn có mấy người?" },
              { speaker: "B", cn: "我家有四个人。", pinyin: "Wǒ jiā yǒu sì gè rén.", vi: "Nhà mình có 4 người." },
            ],
          },
          quiz: [
            { question: "七 là số mấy?", options: ["6", "7", "8", "9"], answer: 1 },
            { question: "Chín tiếng Trung là?", options: ["八", "九", "十", "七"], answer: 1 },
            { question: "'三个人' nghĩa là?", options: ["1 người", "2 người", "3 người", "4 người"], answer: 2 },
          ],
        },
        {
          id: "h1-w2-l2",
          title: "Tuổi & Ngày tháng",
          desc: "Hỏi tuổi, sinh nhật, ngày",
          vocab: [
            { hanzi: "岁", pinyin: "suì", meaning: "Tuổi" },
            { hanzi: "多大", pinyin: "duō dà", meaning: "Mấy tuổi" },
            { hanzi: "今天", pinyin: "jīn tiān", meaning: "Hôm nay" },
            { hanzi: "明天", pinyin: "míng tiān", meaning: "Ngày mai" },
            { hanzi: "昨天", pinyin: "zuó tiān", meaning: "Hôm qua" },
            { hanzi: "年", pinyin: "nián", meaning: "Năm" },
            { hanzi: "月", pinyin: "yuè", meaning: "Tháng" },
            { hanzi: "日", pinyin: "rì", meaning: "Ngày" },
          ],
          grammar: [
            {
              title: "Hỏi tuổi: 多大",
              pattern: "你多大?",
              explanation: "Hỏi tuổi người lớn dùng 多大. Trẻ con dùng 几岁.",
              examples: [
                { cn: "你多大?", pinyin: "Nǐ duō dà?", vi: "Bạn bao nhiêu tuổi?" },
                { cn: "我二十岁。", pinyin: "Wǒ èr shí suì.", vi: "Tôi 20 tuổi." },
              ],
            },
          ],
          dialogue: {
            topic: "Hỏi tuổi",
            lines: [
              { speaker: "A", cn: "你今年多大?", pinyin: "Nǐ jīn nián duō dà?", vi: "Năm nay bạn bao nhiêu tuổi?" },
              { speaker: "B", cn: "我今年二十二岁。", pinyin: "Wǒ jīn nián èr shí èr suì.", vi: "Mình năm nay 22 tuổi." },
            ],
          },
          quiz: [
            { question: "'多大' dùng để hỏi?", options: ["Tên", "Tuổi", "Quê quán", "Nghề nghiệp"], answer: 1 },
            { question: "今天 nghĩa là?", options: ["Hôm qua", "Hôm nay", "Ngày mai", "Tuần này"], answer: 1 },
          ],
        },
      ],
    },
    {
      week: 3,
      title: "Gia đình & Bạn bè",
      goal: "Nói về gia đình, miêu tả người",
      lessons: [
        {
          id: "h1-w3-l1",
          title: "Thành viên gia đình",
          desc: "Cha mẹ, anh chị em",
          vocab: [
            { hanzi: "爸爸", pinyin: "bà ba", meaning: "Bố" },
            { hanzi: "妈妈", pinyin: "mā ma", meaning: "Mẹ" },
            { hanzi: "哥哥", pinyin: "gē ge", meaning: "Anh trai" },
            { hanzi: "姐姐", pinyin: "jiě jie", meaning: "Chị gái" },
            { hanzi: "弟弟", pinyin: "dì di", meaning: "Em trai" },
            { hanzi: "妹妹", pinyin: "mèi mei", meaning: "Em gái" },
            { hanzi: "家", pinyin: "jiā", meaning: "Nhà / Gia đình" },
            { hanzi: "有", pinyin: "yǒu", meaning: "Có" },
          ],
          grammar: [
            {
              title: "Câu tồn tại với 有",
              pattern: "A + 有 + B",
              explanation: "有 (yǒu) = có. Phủ định dùng 没有 (chứ không dùng 不有).",
              examples: [
                { cn: "我有一个哥哥。", pinyin: "Wǒ yǒu yí gè gē ge.", vi: "Tôi có một anh trai." },
                { cn: "我没有妹妹。", pinyin: "Wǒ méi yǒu mèi mei.", vi: "Tôi không có em gái." },
              ],
            },
          ],
          dialogue: {
            topic: "Nói về gia đình",
            lines: [
              { speaker: "A", cn: "你家有几口人?", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", vi: "Nhà bạn có mấy người?" },
              { speaker: "B", cn: "我家有五口人:爸爸、妈妈、哥哥、我和妹妹。", pinyin: "Wǒ jiā yǒu wǔ kǒu rén...", vi: "Nhà mình có 5 người: bố, mẹ, anh, mình và em gái." },
            ],
          },
          quiz: [
            { question: "妈妈 là?", options: ["Bố", "Mẹ", "Chị", "Em"], answer: 1 },
            { question: "Phủ định của 有 là?", options: ["不有", "没有", "无有", "非有"], answer: 1 },
          ],
        },
        {
          id: "h1-w3-l2",
          title: "Miêu tả đơn giản",
          desc: "Tính từ thường dùng",
          vocab: [
            { hanzi: "好", pinyin: "hǎo", meaning: "Tốt" },
            { hanzi: "大", pinyin: "dà", meaning: "Lớn" },
            { hanzi: "小", pinyin: "xiǎo", meaning: "Nhỏ" },
            { hanzi: "高", pinyin: "gāo", meaning: "Cao" },
            { hanzi: "漂亮", pinyin: "piào liang", meaning: "Đẹp" },
            { hanzi: "很", pinyin: "hěn", meaning: "Rất" },
            { hanzi: "不", pinyin: "bù", meaning: "Không" },
            { hanzi: "也", pinyin: "yě", meaning: "Cũng" },
          ],
          grammar: [
            {
              title: "Câu với tính từ vị ngữ",
              pattern: "Chủ ngữ + 很 + Tính từ",
              explanation: "Tiếng Trung không cần động từ 'là' khi dùng tính từ. Thường thêm 很 để câu tự nhiên.",
              examples: [
                { cn: "我很好。", pinyin: "Wǒ hěn hǎo.", vi: "Tôi khỏe." },
                { cn: "她很漂亮。", pinyin: "Tā hěn piào liang.", vi: "Cô ấy rất xinh." },
              ],
            },
          ],
          dialogue: {
            topic: "Hỏi thăm",
            lines: [
              { speaker: "A", cn: "你好吗?", pinyin: "Nǐ hǎo ma?", vi: "Bạn khỏe không?" },
              { speaker: "B", cn: "我很好,你呢?", pinyin: "Wǒ hěn hǎo, nǐ ne?", vi: "Mình khỏe, còn bạn?" },
              { speaker: "A", cn: "我也很好。", pinyin: "Wǒ yě hěn hǎo.", vi: "Mình cũng khỏe." },
            ],
          },
          quiz: [
            { question: "很 nghĩa là?", options: ["Không", "Rất", "Cũng", "Là"], answer: 1 },
            { question: "Câu 'Cô ấy đẹp' dịch là?", options: ["她不漂亮", "她很漂亮", "她也漂亮", "她是漂亮"], answer: 1 },
          ],
        },
      ],
    },
    {
      week: 4,
      title: "Ăn uống & Mua sắm",
      goal: "Gọi món, hỏi giá, mua đồ",
      lessons: [
        {
          id: "h1-w4-l1",
          title: "Đồ ăn cơ bản",
          desc: "Cơm, nước, hoa quả",
          vocab: [
            { hanzi: "吃", pinyin: "chī", meaning: "Ăn" },
            { hanzi: "喝", pinyin: "hē", meaning: "Uống" },
            { hanzi: "米饭", pinyin: "mǐ fàn", meaning: "Cơm" },
            { hanzi: "水", pinyin: "shuǐ", meaning: "Nước" },
            { hanzi: "茶", pinyin: "chá", meaning: "Trà" },
            { hanzi: "苹果", pinyin: "píng guǒ", meaning: "Táo" },
            { hanzi: "想", pinyin: "xiǎng", meaning: "Muốn" },
            { hanzi: "什么", pinyin: "shén me", meaning: "Gì" },
          ],
          grammar: [
            {
              title: "Động từ 想 + V",
              pattern: "想 + Động từ",
              explanation: "想 (xiǎng) = muốn. Đặt trước động từ chính.",
              examples: [
                { cn: "我想喝茶。", pinyin: "Wǒ xiǎng hē chá.", vi: "Tôi muốn uống trà." },
                { cn: "你想吃什么?", pinyin: "Nǐ xiǎng chī shén me?", vi: "Bạn muốn ăn gì?" },
              ],
            },
          ],
          dialogue: {
            topic: "Trong nhà hàng",
            lines: [
              { speaker: "A", cn: "你想吃什么?", pinyin: "Nǐ xiǎng chī shén me?", vi: "Bạn muốn ăn gì?" },
              { speaker: "B", cn: "我想吃米饭,你呢?", pinyin: "Wǒ xiǎng chī mǐ fàn, nǐ ne?", vi: "Mình muốn ăn cơm, còn bạn?" },
            ],
          },
          quiz: [
            { question: "喝 dùng cho?", options: ["Ăn", "Uống", "Mua", "Đi"], answer: 1 },
            { question: "想 nghĩa là?", options: ["Có", "Là", "Muốn", "Đi"], answer: 2 },
          ],
        },
        {
          id: "h1-w4-l2",
          title: "Mua sắm & Tiền",
          desc: "Hỏi giá, trả tiền",
          vocab: [
            { hanzi: "买", pinyin: "mǎi", meaning: "Mua" },
            { hanzi: "钱", pinyin: "qián", meaning: "Tiền" },
            { hanzi: "多少", pinyin: "duō shao", meaning: "Bao nhiêu" },
            { hanzi: "块", pinyin: "kuài", meaning: "Tệ (đồng)" },
            { hanzi: "贵", pinyin: "guì", meaning: "Đắt" },
            { hanzi: "便宜", pinyin: "pián yi", meaning: "Rẻ" },
            { hanzi: "这", pinyin: "zhè", meaning: "Cái này" },
            { hanzi: "那", pinyin: "nà", meaning: "Cái kia" },
          ],
          grammar: [
            {
              title: "Hỏi giá: 多少钱",
              pattern: "... 多少钱?",
              explanation: "多少钱 = bao nhiêu tiền. Đứng cuối câu.",
              examples: [
                { cn: "这个多少钱?", pinyin: "Zhè ge duō shao qián?", vi: "Cái này bao nhiêu tiền?" },
                { cn: "十块钱。", pinyin: "Shí kuài qián.", vi: "10 tệ." },
              ],
            },
          ],
          dialogue: {
            topic: "Đi chợ",
            lines: [
              { speaker: "A", cn: "苹果多少钱一斤?", pinyin: "Píng guǒ duō shao qián yì jīn?", vi: "Táo bao nhiêu tiền 1 cân?" },
              { speaker: "B", cn: "五块钱一斤。", pinyin: "Wǔ kuài qián yì jīn.", vi: "5 tệ 1 cân." },
              { speaker: "A", cn: "我买两斤。", pinyin: "Wǒ mǎi liǎng jīn.", vi: "Tôi mua 2 cân." },
            ],
          },
          quiz: [
            { question: "'多少钱' nghĩa là?", options: ["Bao nhiêu tuổi", "Bao nhiêu tiền", "Bao nhiêu người", "Bao nhiêu cái"], answer: 1 },
            { question: "贵 trái nghĩa với?", options: ["大", "好", "便宜", "高"], answer: 2 },
          ],
        },
      ],
    },
  ],
};

// ============ HSK 2 — 5 weeks, 10 lessons ============
const hsk2: HskCourse = {
  level: 2,
  totalWords: 300,
  totalWeeks: 5,
  description: "Giao tiếp đời sống hằng ngày",
  color: "#3b82f6",
  weeks: [
    {
      week: 1,
      title: "Thời gian & Lịch trình",
      goal: "Nói giờ, lịch hẹn, thói quen",
      lessons: [
        {
          id: "h2-w1-l1",
          title: "Xem giờ",
          desc: "Giờ, phút, buổi sáng/chiều",
          vocab: [
            { hanzi: "时间", pinyin: "shí jiān", meaning: "Thời gian" },
            { hanzi: "点", pinyin: "diǎn", meaning: "Giờ" },
            { hanzi: "分", pinyin: "fēn", meaning: "Phút" },
            { hanzi: "现在", pinyin: "xiàn zài", meaning: "Bây giờ" },
            { hanzi: "早上", pinyin: "zǎo shang", meaning: "Buổi sáng" },
            { hanzi: "晚上", pinyin: "wǎn shang", meaning: "Buổi tối" },
            { hanzi: "起床", pinyin: "qǐ chuáng", meaning: "Thức dậy" },
            { hanzi: "睡觉", pinyin: "shuì jiào", meaning: "Đi ngủ" },
          ],
          grammar: [
            {
              title: "Hỏi giờ: 几点",
              pattern: "现在几点?",
              explanation: "几点 = mấy giờ. 半 = 30 phút.",
              examples: [
                { cn: "现在几点?", pinyin: "Xiàn zài jǐ diǎn?", vi: "Bây giờ mấy giờ?" },
                { cn: "现在七点半。", pinyin: "Xiàn zài qī diǎn bàn.", vi: "Bây giờ 7 giờ rưỡi." },
              ],
            },
          ],
          dialogue: {
            topic: "Lịch trình buổi sáng",
            lines: [
              { speaker: "A", cn: "你几点起床?", pinyin: "Nǐ jǐ diǎn qǐ chuáng?", vi: "Bạn mấy giờ dậy?" },
              { speaker: "B", cn: "我早上六点半起床。", pinyin: "Wǒ zǎo shang liù diǎn bàn qǐ chuáng.", vi: "Mình dậy lúc 6 giờ rưỡi sáng." },
            ],
          },
          quiz: [
            { question: "'几点' để hỏi?", options: ["Bao nhiêu", "Mấy giờ", "Khi nào", "Ở đâu"], answer: 1 },
            { question: "起床 nghĩa là?", options: ["Đi ngủ", "Thức dậy", "Tắm", "Ăn sáng"], answer: 1 },
          ],
        },
        {
          id: "h2-w1-l2",
          title: "Ngày trong tuần",
          desc: "Thứ 2 → Chủ nhật, lịch hẹn",
          vocab: [
            { hanzi: "星期", pinyin: "xīng qī", meaning: "Tuần / thứ" },
            { hanzi: "星期一", pinyin: "xīng qī yī", meaning: "Thứ 2" },
            { hanzi: "星期天", pinyin: "xīng qī tiān", meaning: "Chủ nhật" },
            { hanzi: "周末", pinyin: "zhōu mò", meaning: "Cuối tuần" },
            { hanzi: "工作", pinyin: "gōng zuò", meaning: "Làm việc" },
            { hanzi: "休息", pinyin: "xiū xi", meaning: "Nghỉ ngơi" },
            { hanzi: "见面", pinyin: "jiàn miàn", meaning: "Gặp mặt" },
            { hanzi: "一起", pinyin: "yì qǐ", meaning: "Cùng nhau" },
          ],
          grammar: [
            {
              title: "Câu hẹn: 一起 + V",
              pattern: "我们一起 + V 吧",
              explanation: "Đề nghị làm gì cùng nhau, thêm 吧 cuối câu.",
              examples: [
                { cn: "我们一起去吃饭吧!", pinyin: "Wǒ men yì qǐ qù chī fàn ba!", vi: "Chúng ta cùng đi ăn nhé!" },
              ],
            },
          ],
          dialogue: {
            topic: "Hẹn gặp",
            lines: [
              { speaker: "A", cn: "周末你有时间吗?", pinyin: "Zhōu mò nǐ yǒu shí jiān ma?", vi: "Cuối tuần bạn rảnh không?" },
              { speaker: "B", cn: "有,我们一起去看电影吧。", pinyin: "Yǒu, wǒ men yì qǐ qù kàn diàn yǐng ba.", vi: "Có, mình cùng đi xem phim nhé." },
            ],
          },
          quiz: [
            { question: "周末 nghĩa là?", options: ["Đầu tuần", "Cuối tuần", "Giữa tuần", "Tháng"], answer: 1 },
            { question: "Câu mời 'cùng đi ăn' là?", options: ["你吃饭", "一起吃饭吧", "我吃饭", "他吃饭吗"], answer: 1 },
          ],
        },
      ],
    },
    {
      week: 2,
      title: "Sở thích & Hoạt động",
      goal: "Nói về sở thích, thể thao",
      lessons: [
        {
          id: "h2-w2-l1",
          title: "Sở thích",
          desc: "Thích / không thích, các hoạt động",
          vocab: [
            { hanzi: "喜欢", pinyin: "xǐ huan", meaning: "Thích" },
            { hanzi: "音乐", pinyin: "yīn yuè", meaning: "Âm nhạc" },
            { hanzi: "电影", pinyin: "diàn yǐng", meaning: "Phim" },
            { hanzi: "唱歌", pinyin: "chàng gē", meaning: "Hát" },
            { hanzi: "跳舞", pinyin: "tiào wǔ", meaning: "Nhảy" },
            { hanzi: "看书", pinyin: "kàn shū", meaning: "Đọc sách" },
            { hanzi: "玩", pinyin: "wán", meaning: "Chơi" },
            { hanzi: "觉得", pinyin: "jué de", meaning: "Cảm thấy" },
          ],
          grammar: [
            {
              title: "喜欢 + V/N",
              pattern: "喜欢 + Động từ / Danh từ",
              explanation: "喜欢 có thể đứng trước cả động từ và danh từ.",
              examples: [
                { cn: "我喜欢看电影。", pinyin: "Wǒ xǐ huan kàn diàn yǐng.", vi: "Tôi thích xem phim." },
                { cn: "他不喜欢音乐。", pinyin: "Tā bù xǐ huan yīn yuè.", vi: "Anh ấy không thích âm nhạc." },
              ],
            },
          ],
          dialogue: {
            topic: "Hỏi sở thích",
            lines: [
              { speaker: "A", cn: "你喜欢做什么?", pinyin: "Nǐ xǐ huan zuò shén me?", vi: "Bạn thích làm gì?" },
              { speaker: "B", cn: "我喜欢唱歌和看电影。", pinyin: "Wǒ xǐ huan chàng gē hé kàn diàn yǐng.", vi: "Mình thích hát và xem phim." },
            ],
          },
          quiz: [
            { question: "喜欢 nghĩa là?", options: ["Ghét", "Thích", "Cần", "Có"], answer: 1 },
            { question: "唱歌 nghĩa là?", options: ["Nhảy", "Hát", "Đọc", "Xem"], answer: 1 },
          ],
        },
        {
          id: "h2-w2-l2",
          title: "Thể thao",
          desc: "Các môn thể thao thường gặp",
          vocab: [
            { hanzi: "运动", pinyin: "yùn dòng", meaning: "Thể thao" },
            { hanzi: "踢足球", pinyin: "tī zú qiú", meaning: "Đá bóng" },
            { hanzi: "打篮球", pinyin: "dǎ lán qiú", meaning: "Chơi bóng rổ" },
            { hanzi: "游泳", pinyin: "yóu yǒng", meaning: "Bơi" },
            { hanzi: "跑步", pinyin: "pǎo bù", meaning: "Chạy bộ" },
            { hanzi: "身体", pinyin: "shēn tǐ", meaning: "Cơ thể" },
            { hanzi: "健康", pinyin: "jiàn kāng", meaning: "Sức khỏe" },
            { hanzi: "经常", pinyin: "jīng cháng", meaning: "Thường xuyên" },
          ],
          grammar: [
            {
              title: "Trạng từ tần suất 经常",
              pattern: "Chủ ngữ + 经常 + V",
              explanation: "经常 đứng trước động từ, biểu thị tần suất 'thường xuyên'.",
              examples: [
                { cn: "他经常游泳。", pinyin: "Tā jīng cháng yóu yǒng.", vi: "Anh ấy thường xuyên bơi." },
              ],
            },
          ],
          dialogue: {
            topic: "Bàn về thể thao",
            lines: [
              { speaker: "A", cn: "你喜欢什么运动?", pinyin: "Nǐ xǐ huan shén me yùn dòng?", vi: "Bạn thích môn thể thao nào?" },
              { speaker: "B", cn: "我经常打篮球,你呢?", pinyin: "Wǒ jīng cháng dǎ lán qiú, nǐ ne?", vi: "Mình hay chơi bóng rổ, còn bạn?" },
              { speaker: "A", cn: "我喜欢游泳。", pinyin: "Wǒ xǐ huan yóu yǒng.", vi: "Mình thích bơi." },
            ],
          },
          quiz: [
            { question: "经常 nghĩa là?", options: ["Hiếm khi", "Thường xuyên", "Chưa bao giờ", "Đôi khi"], answer: 1 },
            { question: "游泳 nghĩa là?", options: ["Chạy", "Bơi", "Đi bộ", "Đá bóng"], answer: 1 },
          ],
        },
      ],
    },
    {
      week: 3,
      title: "Đi lại & Phương hướng",
      goal: "Đi xe, hỏi đường",
      lessons: [
        {
          id: "h2-w3-l1",
          title: "Phương tiện",
          desc: "Xe, tàu, máy bay",
          vocab: [
            { hanzi: "汽车", pinyin: "qì chē", meaning: "Ô tô" },
            { hanzi: "火车", pinyin: "huǒ chē", meaning: "Tàu hỏa" },
            { hanzi: "飞机", pinyin: "fēi jī", meaning: "Máy bay" },
            { hanzi: "公共汽车", pinyin: "gōng gòng qì chē", meaning: "Xe buýt" },
            { hanzi: "出租车", pinyin: "chū zū chē", meaning: "Taxi" },
            { hanzi: "坐", pinyin: "zuò", meaning: "Ngồi / đi (xe)" },
            { hanzi: "开车", pinyin: "kāi chē", meaning: "Lái xe" },
            { hanzi: "走", pinyin: "zǒu", meaning: "Đi bộ" },
          ],
          grammar: [
            {
              title: "坐 + Phương tiện + V",
              pattern: "坐 + xe + 去 + nơi đến",
              explanation: "Dùng 坐 cho việc đi bằng phương tiện công cộng.",
              examples: [
                { cn: "我坐公共汽车去学校。", pinyin: "Wǒ zuò gōng gòng qì chē qù xué xiào.", vi: "Tôi đi xe buýt đến trường." },
              ],
            },
          ],
          dialogue: {
            topic: "Đi học",
            lines: [
              { speaker: "A", cn: "你怎么去公司?", pinyin: "Nǐ zěn me qù gōng sī?", vi: "Bạn đi đến công ty bằng gì?" },
              { speaker: "B", cn: "我坐地铁去。", pinyin: "Wǒ zuò dì tiě qù.", vi: "Mình đi tàu điện ngầm." },
            ],
          },
          quiz: [
            { question: "飞机 nghĩa là?", options: ["Tàu", "Xe", "Máy bay", "Thuyền"], answer: 2 },
            { question: "坐 dùng cho động tác?", options: ["Lái xe", "Ngồi/đi xe công cộng", "Chạy", "Bay"], answer: 1 },
          ],
        },
        {
          id: "h2-w3-l2",
          title: "Hỏi đường",
          desc: "Trái, phải, thẳng",
          vocab: [
            { hanzi: "左", pinyin: "zuǒ", meaning: "Trái" },
            { hanzi: "右", pinyin: "yòu", meaning: "Phải" },
            { hanzi: "前面", pinyin: "qián miàn", meaning: "Phía trước" },
            { hanzi: "后面", pinyin: "hòu miàn", meaning: "Phía sau" },
            { hanzi: "旁边", pinyin: "páng biān", meaning: "Bên cạnh" },
            { hanzi: "怎么", pinyin: "zěn me", meaning: "Như thế nào" },
            { hanzi: "知道", pinyin: "zhī dào", meaning: "Biết" },
            { hanzi: "请问", pinyin: "qǐng wèn", meaning: "Xin hỏi" },
          ],
          grammar: [
            {
              title: "Hỏi đường: 怎么走",
              pattern: "...怎么走?",
              explanation: "Câu hỏi đường đi cơ bản.",
              examples: [
                { cn: "请问,银行怎么走?", pinyin: "Qǐng wèn, yín háng zěn me zǒu?", vi: "Xin hỏi, ngân hàng đi thế nào?" },
              ],
            },
          ],
          dialogue: {
            topic: "Hỏi đường",
            lines: [
              { speaker: "A", cn: "请问,医院怎么走?", pinyin: "Qǐng wèn, yī yuàn zěn me zǒu?", vi: "Xin hỏi, bệnh viện đi thế nào?" },
              { speaker: "B", cn: "前面右转,然后一直走。", pinyin: "Qián miàn yòu zhuǎn, rán hòu yì zhí zǒu.", vi: "Phía trước rẽ phải rồi đi thẳng." },
            ],
          },
          quiz: [
            { question: "右 nghĩa là?", options: ["Trái", "Phải", "Trước", "Sau"], answer: 1 },
            { question: "请问 dùng khi nào?", options: ["Cảm ơn", "Xin lỗi", "Lịch sự hỏi điều gì", "Tạm biệt"], answer: 2 },
          ],
        },
      ],
    },
    {
      week: 4,
      title: "Sức khỏe & Cảm xúc",
      goal: "Bệnh, cảm xúc, lời khuyên",
      lessons: [
        {
          id: "h2-w4-l1",
          title: "Bệnh & Khám bệnh",
          desc: "Triệu chứng, bệnh viện",
          vocab: [
            { hanzi: "生病", pinyin: "shēng bìng", meaning: "Bị bệnh" },
            { hanzi: "医生", pinyin: "yī shēng", meaning: "Bác sĩ" },
            { hanzi: "医院", pinyin: "yī yuàn", meaning: "Bệnh viện" },
            { hanzi: "药", pinyin: "yào", meaning: "Thuốc" },
            { hanzi: "头疼", pinyin: "tóu téng", meaning: "Đau đầu" },
            { hanzi: "感冒", pinyin: "gǎn mào", meaning: "Cảm" },
            { hanzi: "舒服", pinyin: "shū fu", meaning: "Thoải mái" },
            { hanzi: "休息", pinyin: "xiū xi", meaning: "Nghỉ ngơi" },
          ],
          grammar: [
            {
              title: "Câu khuyên: 应该",
              pattern: "应该 + V",
              explanation: "应该 (yīng gāi) = nên. Đặt trước động từ.",
              examples: [
                { cn: "你应该多休息。", pinyin: "Nǐ yīng gāi duō xiū xi.", vi: "Bạn nên nghỉ ngơi nhiều hơn." },
              ],
            },
          ],
          dialogue: {
            topic: "Khám bệnh",
            lines: [
              { speaker: "A", cn: "你怎么了?", pinyin: "Nǐ zěn me le?", vi: "Bạn bị sao vậy?" },
              { speaker: "B", cn: "我头疼,有点感冒。", pinyin: "Wǒ tóu téng, yǒu diǎn gǎn mào.", vi: "Mình đau đầu, hơi cảm." },
              { speaker: "A", cn: "你应该去医院看看。", pinyin: "Nǐ yīng gāi qù yī yuàn kàn kan.", vi: "Bạn nên đi bệnh viện xem sao." },
            ],
          },
          quiz: [
            { question: "感冒 nghĩa là?", options: ["Đau bụng", "Cảm cúm", "Sốt", "Đau lưng"], answer: 1 },
            { question: "应该 nghĩa là?", options: ["Có thể", "Nên", "Phải", "Muốn"], answer: 1 },
          ],
        },
        {
          id: "h2-w4-l2",
          title: "Cảm xúc",
          desc: "Vui, buồn, lo lắng",
          vocab: [
            { hanzi: "高兴", pinyin: "gāo xìng", meaning: "Vui" },
            { hanzi: "快乐", pinyin: "kuài lè", meaning: "Hạnh phúc" },
            { hanzi: "难过", pinyin: "nán guò", meaning: "Buồn" },
            { hanzi: "生气", pinyin: "shēng qì", meaning: "Tức giận" },
            { hanzi: "累", pinyin: "lèi", meaning: "Mệt" },
            { hanzi: "忙", pinyin: "máng", meaning: "Bận" },
            { hanzi: "为什么", pinyin: "wèi shén me", meaning: "Tại sao" },
            { hanzi: "因为", pinyin: "yīn wèi", meaning: "Bởi vì" },
          ],
          grammar: [
            {
              title: "Cấu trúc nguyên nhân: 因为...所以...",
              pattern: "因为 + lý do, 所以 + kết quả",
              explanation: "Diễn đạt nguyên nhân - kết quả.",
              examples: [
                { cn: "因为今天很忙,所以我很累。", pinyin: "Yīn wèi jīn tiān hěn máng, suǒ yǐ wǒ hěn lèi.", vi: "Vì hôm nay bận nên tôi rất mệt." },
              ],
            },
          ],
          dialogue: {
            topic: "Hỏi tâm trạng",
            lines: [
              { speaker: "A", cn: "你今天怎么了?", pinyin: "Nǐ jīn tiān zěn me le?", vi: "Hôm nay bạn sao vậy?" },
              { speaker: "B", cn: "我有点不高兴。", pinyin: "Wǒ yǒu diǎn bù gāo xìng.", vi: "Mình hơi không vui." },
            ],
          },
          quiz: [
            { question: "难过 nghĩa là?", options: ["Vui", "Buồn", "Mệt", "Bận"], answer: 1 },
            { question: "因为...所以... dùng để?", options: ["So sánh", "Nguyên nhân-kết quả", "Đối lập", "Liệt kê"], answer: 1 },
          ],
        },
      ],
    },
    {
      week: 5,
      title: "Du lịch & Khách sạn",
      goal: "Đặt phòng, du lịch",
      lessons: [
        {
          id: "h2-w5-l1",
          title: "Du lịch",
          desc: "Đặt vé, du lịch nước ngoài",
          vocab: [
            { hanzi: "旅游", pinyin: "lǚ yóu", meaning: "Du lịch" },
            { hanzi: "国家", pinyin: "guó jiā", meaning: "Quốc gia" },
            { hanzi: "城市", pinyin: "chéng shì", meaning: "Thành phố" },
            { hanzi: "票", pinyin: "piào", meaning: "Vé" },
            { hanzi: "护照", pinyin: "hù zhào", meaning: "Hộ chiếu" },
            { hanzi: "行李", pinyin: "xíng li", meaning: "Hành lý" },
            { hanzi: "机场", pinyin: "jī chǎng", meaning: "Sân bay" },
            { hanzi: "出发", pinyin: "chū fā", meaning: "Khởi hành" },
          ],
          grammar: [
            {
              title: "Cấu trúc: 打算 + V",
              pattern: "打算 + Động từ",
              explanation: "打算 = dự định, lên kế hoạch.",
              examples: [
                { cn: "我打算去中国旅游。", pinyin: "Wǒ dǎ suàn qù Zhōng guó lǚ yóu.", vi: "Tôi dự định đi du lịch Trung Quốc." },
              ],
            },
          ],
          dialogue: {
            topic: "Lên kế hoạch du lịch",
            lines: [
              { speaker: "A", cn: "暑假你打算去哪儿?", pinyin: "Shǔ jià nǐ dǎ suàn qù nǎr?", vi: "Hè bạn định đi đâu?" },
              { speaker: "B", cn: "我打算去北京旅游。", pinyin: "Wǒ dǎ suàn qù Běi jīng lǚ yóu.", vi: "Mình định đi du lịch Bắc Kinh." },
            ],
          },
          quiz: [
            { question: "护照 nghĩa là?", options: ["Vé", "Hộ chiếu", "Hành lý", "Thẻ"], answer: 1 },
            { question: "打算 nghĩa là?", options: ["Đã làm", "Đang làm", "Dự định", "Phải làm"], answer: 2 },
          ],
        },
        {
          id: "h2-w5-l2",
          title: "Khách sạn",
          desc: "Đặt phòng, dịch vụ",
          vocab: [
            { hanzi: "宾馆", pinyin: "bīn guǎn", meaning: "Khách sạn" },
            { hanzi: "房间", pinyin: "fáng jiān", meaning: "Phòng" },
            { hanzi: "预订", pinyin: "yù dìng", meaning: "Đặt trước" },
            { hanzi: "几天", pinyin: "jǐ tiān", meaning: "Mấy ngày" },
            { hanzi: "服务员", pinyin: "fú wù yuán", meaning: "Nhân viên phục vụ" },
            { hanzi: "干净", pinyin: "gān jìng", meaning: "Sạch sẽ" },
            { hanzi: "安静", pinyin: "ān jìng", meaning: "Yên tĩnh" },
            { hanzi: "需要", pinyin: "xū yào", meaning: "Cần" },
          ],
          grammar: [
            {
              title: "Câu yêu cầu lịch sự: 请...",
              pattern: "请 + V",
              explanation: "请 (xin/mời) đứng đầu câu thể hiện sự lịch sự.",
              examples: [
                { cn: "请给我一个安静的房间。", pinyin: "Qǐng gěi wǒ yí gè ān jìng de fáng jiān.", vi: "Xin cho tôi một phòng yên tĩnh." },
              ],
            },
          ],
          dialogue: {
            topic: "Check-in khách sạn",
            lines: [
              { speaker: "A", cn: "我预订了一个房间。", pinyin: "Wǒ yù dìng le yí gè fáng jiān.", vi: "Tôi đã đặt một phòng." },
              { speaker: "B", cn: "请问您住几天?", pinyin: "Qǐng wèn nín zhù jǐ tiān?", vi: "Xin hỏi anh ở mấy ngày?" },
              { speaker: "A", cn: "三天。", pinyin: "Sān tiān.", vi: "3 ngày." },
            ],
          },
          quiz: [
            { question: "预订 nghĩa là?", options: ["Hủy", "Đặt trước", "Mua", "Thuê"], answer: 1 },
            { question: "干净 nghĩa là?", options: ["Bẩn", "Sạch", "Cũ", "Mới"], answer: 1 },
          ],
        },
      ],
    },
  ],
};

// ============ HSK 3 — 6 weeks, 12 lessons ============
const hsk3: HskCourse = {
  level: 3,
  totalWords: 600,
  totalWeeks: 6,
  description: "Diễn đạt phức tạp, cuộc sống & công việc",
  color: "#f59e0b",
  weeks: [
    {
      week: 1,
      title: "Học tập & Trường lớp",
      goal: "Trường, môn học, kỳ thi",
      lessons: [
        {
          id: "h3-w1-l1",
          title: "Trường lớp",
          desc: "Lớp học, giáo viên, sinh viên",
          vocab: [
            { hanzi: "教室", pinyin: "jiào shì", meaning: "Phòng học" },
            { hanzi: "老师", pinyin: "lǎo shī", meaning: "Giáo viên" },
            { hanzi: "学生", pinyin: "xué sheng", meaning: "Học sinh" },
            { hanzi: "同学", pinyin: "tóng xué", meaning: "Bạn cùng lớp" },
            { hanzi: "校长", pinyin: "xiào zhǎng", meaning: "Hiệu trưởng" },
            { hanzi: "图书馆", pinyin: "tú shū guǎn", meaning: "Thư viện" },
            { hanzi: "练习", pinyin: "liàn xí", meaning: "Luyện tập" },
            { hanzi: "复习", pinyin: "fù xí", meaning: "Ôn tập" },
          ],
          grammar: [
            {
              title: "Bổ ngữ kết quả: V + 完",
              pattern: "Động từ + 完",
              explanation: "完 (xong) thêm sau động từ để chỉ hành động đã hoàn thành.",
              examples: [
                { cn: "我做完作业了。", pinyin: "Wǒ zuò wán zuò yè le.", vi: "Tôi đã làm xong bài tập." },
              ],
            },
          ],
          dialogue: {
            topic: "Ở thư viện",
            lines: [
              { speaker: "A", cn: "你在图书馆做什么?", pinyin: "Nǐ zài tú shū guǎn zuò shén me?", vi: "Bạn làm gì ở thư viện?" },
              { speaker: "B", cn: "我在复习汉语。", pinyin: "Wǒ zài fù xí Hàn yǔ.", vi: "Mình đang ôn tiếng Trung." },
            ],
          },
          quiz: [
            { question: "复习 nghĩa là?", options: ["Học mới", "Ôn tập", "Làm bài", "Dạy"], answer: 1 },
            { question: "V + 完 thể hiện?", options: ["Đang làm", "Sắp làm", "Đã làm xong", "Chưa làm"], answer: 2 },
          ],
        },
        {
          id: "h3-w1-l2",
          title: "Kỳ thi & Điểm số",
          desc: "Thi cử, kết quả, học bổng",
          vocab: [
            { hanzi: "考试", pinyin: "kǎo shì", meaning: "Thi" },
            { hanzi: "成绩", pinyin: "chéng jì", meaning: "Thành tích" },
            { hanzi: "通过", pinyin: "tōng guò", meaning: "Đậu / qua" },
            { hanzi: "努力", pinyin: "nǔ lì", meaning: "Cố gắng" },
            { hanzi: "提高", pinyin: "tí gāo", meaning: "Nâng cao" },
            { hanzi: "成功", pinyin: "chéng gōng", meaning: "Thành công" },
            { hanzi: "失败", pinyin: "shī bài", meaning: "Thất bại" },
            { hanzi: "重要", pinyin: "zhòng yào", meaning: "Quan trọng" },
          ],
          grammar: [
            {
              title: "Câu so sánh: 比",
              pattern: "A + 比 + B + Tính từ",
              explanation: "比 (bǐ) dùng để so sánh hai sự vật.",
              examples: [
                { cn: "他比我努力。", pinyin: "Tā bǐ wǒ nǔ lì.", vi: "Anh ấy chăm hơn tôi." },
                { cn: "今年比去年好。", pinyin: "Jīn nián bǐ qù nián hǎo.", vi: "Năm nay tốt hơn năm ngoái." },
              ],
            },
          ],
          dialogue: {
            topic: "Sau kỳ thi",
            lines: [
              { speaker: "A", cn: "考试怎么样?", pinyin: "Kǎo shì zěn me yàng?", vi: "Bài thi thế nào?" },
              { speaker: "B", cn: "还可以,我通过了。", pinyin: "Hái kě yǐ, wǒ tōng guò le.", vi: "Cũng được, mình đậu rồi." },
            ],
          },
          quiz: [
            { question: "通过 trong ngữ cảnh thi cử nghĩa là?", options: ["Trượt", "Đậu", "Hoãn", "Hủy"], answer: 1 },
            { question: "Câu so sánh dùng từ?", options: ["和", "比", "跟", "也"], answer: 1 },
          ],
        },
      ],
    },
    {
      week: 2,
      title: "Công việc & Văn phòng",
      goal: "Công ty, đồng nghiệp, họp",
      lessons: [
        {
          id: "h3-w2-l1",
          title: "Công ty",
          desc: "Đồng nghiệp, sếp, văn phòng",
          vocab: [
            { hanzi: "公司", pinyin: "gōng sī", meaning: "Công ty" },
            { hanzi: "经理", pinyin: "jīng lǐ", meaning: "Quản lý" },
            { hanzi: "同事", pinyin: "tóng shì", meaning: "Đồng nghiệp" },
            { hanzi: "办公室", pinyin: "bàn gōng shì", meaning: "Văn phòng" },
            { hanzi: "会议", pinyin: "huì yì", meaning: "Cuộc họp" },
            { hanzi: "电脑", pinyin: "diàn nǎo", meaning: "Máy tính" },
            { hanzi: "邮件", pinyin: "yóu jiàn", meaning: "Email" },
            { hanzi: "完成", pinyin: "wán chéng", meaning: "Hoàn thành" },
          ],
          grammar: [
            {
              title: "把 字句",
              pattern: "Chủ ngữ + 把 + tân ngữ + V + bổ ngữ",
              explanation: "Câu chữ 把 nhấn mạnh xử lý tân ngữ ra sao.",
              examples: [
                { cn: "请把邮件发给我。", pinyin: "Qǐng bǎ yóu jiàn fā gěi wǒ.", vi: "Vui lòng gửi email cho tôi." },
              ],
            },
          ],
          dialogue: {
            topic: "Trong văn phòng",
            lines: [
              { speaker: "A", cn: "今天的会议几点开始?", pinyin: "Jīn tiān de huì yì jǐ diǎn kāi shǐ?", vi: "Cuộc họp hôm nay mấy giờ?" },
              { speaker: "B", cn: "下午两点。", pinyin: "Xià wǔ liǎng diǎn.", vi: "2 giờ chiều." },
            ],
          },
          quiz: [
            { question: "会议 nghĩa là?", options: ["Tiệc", "Cuộc họp", "Lễ hội", "Sinh nhật"], answer: 1 },
            { question: "Câu '把' nhấn mạnh điều gì?", options: ["Thời gian", "Cách xử lý tân ngữ", "Địa điểm", "Người làm"], answer: 1 },
          ],
        },
        {
          id: "h3-w2-l2",
          title: "Phỏng vấn",
          desc: "Xin việc, kinh nghiệm",
          vocab: [
            { hanzi: "面试", pinyin: "miàn shì", meaning: "Phỏng vấn" },
            { hanzi: "工作经验", pinyin: "gōng zuò jīng yàn", meaning: "Kinh nghiệm" },
            { hanzi: "简历", pinyin: "jiǎn lì", meaning: "CV" },
            { hanzi: "能力", pinyin: "néng lì", meaning: "Năng lực" },
            { hanzi: "机会", pinyin: "jī huì", meaning: "Cơ hội" },
            { hanzi: "选择", pinyin: "xuǎn zé", meaning: "Lựa chọn" },
            { hanzi: "决定", pinyin: "jué dìng", meaning: "Quyết định" },
            { hanzi: "希望", pinyin: "xī wàng", meaning: "Hy vọng" },
          ],
          grammar: [
            {
              title: "Câu phức: 虽然...但是...",
              pattern: "虽然 A, 但是 B",
              explanation: "Tuy A nhưng B — diễn đạt sự nhượng bộ.",
              examples: [
                { cn: "虽然我没有经验,但是我很努力。", pinyin: "Suī rán wǒ méi yǒu jīng yàn, dàn shì wǒ hěn nǔ lì.", vi: "Tuy chưa có kinh nghiệm nhưng tôi rất cố gắng." },
              ],
            },
          ],
          dialogue: {
            topic: "Phỏng vấn",
            lines: [
              { speaker: "A", cn: "你为什么想来我们公司?", pinyin: "Nǐ wèi shén me xiǎng lái wǒ men gōng sī?", vi: "Tại sao bạn muốn vào công ty chúng tôi?" },
              { speaker: "B", cn: "因为这是一个很好的机会。", pinyin: "Yīn wèi zhè shì yí gè hěn hǎo de jī huì.", vi: "Vì đây là một cơ hội tốt." },
            ],
          },
          quiz: [
            { question: "面试 nghĩa là?", options: ["Họp", "Phỏng vấn", "Đào tạo", "Nghỉ phép"], answer: 1 },
            { question: "虽然...但是... biểu thị?", options: ["Nguyên nhân", "Nhượng bộ", "Điều kiện", "Lựa chọn"], answer: 1 },
          ],
        },
      ],
    },
    {
      week: 3,
      title: "Thời tiết & Môi trường",
      goal: "Nói thời tiết, các mùa",
      lessons: [
        {
          id: "h3-w3-l1",
          title: "Thời tiết",
          desc: "Nắng, mưa, gió",
          vocab: [
            { hanzi: "天气", pinyin: "tiān qì", meaning: "Thời tiết" },
            { hanzi: "晴天", pinyin: "qíng tiān", meaning: "Trời nắng" },
            { hanzi: "下雨", pinyin: "xià yǔ", meaning: "Mưa" },
            { hanzi: "下雪", pinyin: "xià xuě", meaning: "Tuyết rơi" },
            { hanzi: "刮风", pinyin: "guā fēng", meaning: "Gió thổi" },
            { hanzi: "热", pinyin: "rè", meaning: "Nóng" },
            { hanzi: "冷", pinyin: "lěng", meaning: "Lạnh" },
            { hanzi: "温度", pinyin: "wēn dù", meaning: "Nhiệt độ" },
          ],
          grammar: [
            {
              title: "Câu sắp xảy ra: 要...了",
              pattern: "要 + V + 了",
              explanation: "Diễn đạt việc sắp xảy ra.",
              examples: [
                { cn: "要下雨了。", pinyin: "Yào xià yǔ le.", vi: "Sắp mưa rồi." },
              ],
            },
          ],
          dialogue: {
            topic: "Bàn về thời tiết",
            lines: [
              { speaker: "A", cn: "今天天气怎么样?", pinyin: "Jīn tiān tiān qì zěn me yàng?", vi: "Thời tiết hôm nay thế nào?" },
              { speaker: "B", cn: "很热,要下雨了。", pinyin: "Hěn rè, yào xià yǔ le.", vi: "Rất nóng, sắp mưa rồi." },
            ],
          },
          quiz: [
            { question: "下雪 nghĩa là?", options: ["Mưa", "Tuyết rơi", "Nắng", "Gió"], answer: 1 },
            { question: "要...了 biểu thị?", options: ["Đã xong", "Đang", "Sắp xảy ra", "Hiếm khi"], answer: 2 },
          ],
        },
        {
          id: "h3-w3-l2",
          title: "Bốn mùa",
          desc: "Xuân, hạ, thu, đông",
          vocab: [
            { hanzi: "春天", pinyin: "chūn tiān", meaning: "Mùa xuân" },
            { hanzi: "夏天", pinyin: "xià tiān", meaning: "Mùa hè" },
            { hanzi: "秋天", pinyin: "qiū tiān", meaning: "Mùa thu" },
            { hanzi: "冬天", pinyin: "dōng tiān", meaning: "Mùa đông" },
            { hanzi: "季节", pinyin: "jì jié", meaning: "Mùa" },
            { hanzi: "树叶", pinyin: "shù yè", meaning: "Lá cây" },
            { hanzi: "花", pinyin: "huā", meaning: "Hoa" },
            { hanzi: "环境", pinyin: "huán jìng", meaning: "Môi trường" },
          ],
          grammar: [
            {
              title: "Cấu trúc: 越来越 + Tính từ",
              pattern: "越来越 + Tính từ",
              explanation: "Càng ngày càng...",
              examples: [
                { cn: "天气越来越冷。", pinyin: "Tiān qì yuè lái yuè lěng.", vi: "Thời tiết ngày càng lạnh." },
              ],
            },
          ],
          dialogue: {
            topic: "Mùa yêu thích",
            lines: [
              { speaker: "A", cn: "你最喜欢哪个季节?", pinyin: "Nǐ zuì xǐ huan nǎ ge jì jié?", vi: "Bạn thích mùa nào nhất?" },
              { speaker: "B", cn: "我喜欢秋天,不冷不热。", pinyin: "Wǒ xǐ huan qiū tiān, bù lěng bú rè.", vi: "Mình thích mùa thu, không lạnh không nóng." },
            ],
          },
          quiz: [
            { question: "秋天 là mùa?", options: ["Xuân", "Hạ", "Thu", "Đông"], answer: 2 },
            { question: "越来越 nghĩa là?", options: ["Hơi", "Rất", "Càng ngày càng", "Đôi khi"], answer: 2 },
          ],
        },
      ],
    },
    {
      week: 4,
      title: "Văn hóa & Lễ hội",
      goal: "Lễ tết, phong tục",
      lessons: [
        {
          id: "h3-w4-l1",
          title: "Tết & Lễ hội",
          desc: "Tết, Trung thu",
          vocab: [
            { hanzi: "节日", pinyin: "jié rì", meaning: "Lễ hội" },
            { hanzi: "春节", pinyin: "chūn jié", meaning: "Tết âm lịch" },
            { hanzi: "中秋节", pinyin: "zhōng qiū jié", meaning: "Trung thu" },
            { hanzi: "庆祝", pinyin: "qìng zhù", meaning: "Ăn mừng" },
            { hanzi: "礼物", pinyin: "lǐ wù", meaning: "Quà" },
            { hanzi: "祝", pinyin: "zhù", meaning: "Chúc" },
            { hanzi: "习惯", pinyin: "xí guàn", meaning: "Thói quen" },
            { hanzi: "传统", pinyin: "chuán tǒng", meaning: "Truyền thống" },
          ],
          grammar: [
            {
              title: "Câu mời/chúc: 祝...",
              pattern: "祝 + đối tượng + lời chúc",
              explanation: "Cấu trúc chúc cơ bản.",
              examples: [
                { cn: "祝你新年快乐!", pinyin: "Zhù nǐ xīn nián kuài lè!", vi: "Chúc bạn năm mới vui vẻ!" },
              ],
            },
          ],
          dialogue: {
            topic: "Chúc Tết",
            lines: [
              { speaker: "A", cn: "新年快乐!", pinyin: "Xīn nián kuài lè!", vi: "Chúc mừng năm mới!" },
              { speaker: "B", cn: "新年快乐!祝你身体健康!", pinyin: "Xīn nián kuài lè! Zhù nǐ shēn tǐ jiàn kāng!", vi: "Năm mới vui vẻ! Chúc bạn sức khỏe!" },
            ],
          },
          quiz: [
            { question: "春节 là lễ hội nào?", options: ["Trung thu", "Tết âm lịch", "Quốc khánh", "Noel"], answer: 1 },
            { question: "祝 nghĩa là?", options: ["Tặng", "Chúc", "Hỏi", "Cảm ơn"], answer: 1 },
          ],
        },
        {
          id: "h3-w4-l2",
          title: "Ẩm thực Trung Hoa",
          desc: "Món ăn nổi tiếng",
          vocab: [
            { hanzi: "饺子", pinyin: "jiǎo zi", meaning: "Bánh chẻo" },
            { hanzi: "面条", pinyin: "miàn tiáo", meaning: "Mì" },
            { hanzi: "包子", pinyin: "bāo zi", meaning: "Bánh bao" },
            { hanzi: "辣", pinyin: "là", meaning: "Cay" },
            { hanzi: "甜", pinyin: "tián", meaning: "Ngọt" },
            { hanzi: "酸", pinyin: "suān", meaning: "Chua" },
            { hanzi: "咸", pinyin: "xián", meaning: "Mặn" },
            { hanzi: "好吃", pinyin: "hǎo chī", meaning: "Ngon" },
          ],
          grammar: [
            {
              title: "Câu trải nghiệm: V + 过",
              pattern: "Động từ + 过",
              explanation: "过 (guò) chỉ kinh nghiệm đã từng làm.",
              examples: [
                { cn: "我吃过北京烤鸭。", pinyin: "Wǒ chī guò Běi jīng kǎo yā.", vi: "Tôi đã từng ăn vịt quay Bắc Kinh." },
              ],
            },
          ],
          dialogue: {
            topic: "Bàn về món ăn",
            lines: [
              { speaker: "A", cn: "你吃过饺子吗?", pinyin: "Nǐ chī guò jiǎo zi ma?", vi: "Bạn đã ăn bánh chẻo chưa?" },
              { speaker: "B", cn: "吃过,很好吃!", pinyin: "Chī guò, hěn hǎo chī!", vi: "Đã ăn rồi, rất ngon!" },
            ],
          },
          quiz: [
            { question: "辣 nghĩa là?", options: ["Ngọt", "Cay", "Mặn", "Chua"], answer: 1 },
            { question: "V + 过 thể hiện?", options: ["Đang làm", "Sắp làm", "Đã từng", "Phải làm"], answer: 2 },
          ],
        },
      ],
    },
    {
      week: 5,
      title: "Internet & Công nghệ",
      goal: "Mạng xã hội, điện thoại",
      lessons: [
        {
          id: "h3-w5-l1",
          title: "Điện thoại & Internet",
          desc: "Gọi điện, lên mạng",
          vocab: [
            { hanzi: "电话", pinyin: "diàn huà", meaning: "Điện thoại" },
            { hanzi: "手机", pinyin: "shǒu jī", meaning: "Di động" },
            { hanzi: "上网", pinyin: "shàng wǎng", meaning: "Lên mạng" },
            { hanzi: "网站", pinyin: "wǎng zhàn", meaning: "Trang web" },
            { hanzi: "聊天", pinyin: "liáo tiān", meaning: "Trò chuyện" },
            { hanzi: "信息", pinyin: "xìn xī", meaning: "Tin nhắn / thông tin" },
            { hanzi: "查", pinyin: "chá", meaning: "Tra cứu" },
            { hanzi: "下载", pinyin: "xià zài", meaning: "Tải về" },
          ],
          grammar: [
            {
              title: "Câu bị động: 被",
              pattern: "Tân ngữ + 被 + chủ thể + V",
              explanation: "被 (bèi) đánh dấu câu bị động.",
              examples: [
                { cn: "我的手机被弟弟拿走了。", pinyin: "Wǒ de shǒu jī bèi dì di ná zǒu le.", vi: "Điện thoại của tôi bị em trai lấy đi rồi." },
              ],
            },
          ],
          dialogue: {
            topic: "Hỏi mạng",
            lines: [
              { speaker: "A", cn: "你常常上网吗?", pinyin: "Nǐ cháng cháng shàng wǎng ma?", vi: "Bạn có hay lên mạng không?" },
              { speaker: "B", cn: "每天都上,主要是查信息。", pinyin: "Měi tiān dōu shàng, zhǔ yào shì chá xìn xī.", vi: "Ngày nào cũng lên, chủ yếu để tra thông tin." },
            ],
          },
          quiz: [
            { question: "上网 nghĩa là?", options: ["Tắt mạng", "Lên mạng", "Mua mạng", "Xem TV"], answer: 1 },
            { question: "被 dùng cho câu?", options: ["Khẳng định", "Bị động", "Phủ định", "Nghi vấn"], answer: 1 },
          ],
        },
        {
          id: "h3-w5-l2",
          title: "Mua sắm online",
          desc: "Đặt hàng, giao hàng",
          vocab: [
            { hanzi: "网购", pinyin: "wǎng gòu", meaning: "Mua online" },
            { hanzi: "快递", pinyin: "kuài dì", meaning: "Chuyển phát nhanh" },
            { hanzi: "付款", pinyin: "fù kuǎn", meaning: "Thanh toán" },
            { hanzi: "退货", pinyin: "tuì huò", meaning: "Trả hàng" },
            { hanzi: "评价", pinyin: "píng jià", meaning: "Đánh giá" },
            { hanzi: "送货", pinyin: "sòng huò", meaning: "Giao hàng" },
            { hanzi: "地址", pinyin: "dì zhǐ", meaning: "Địa chỉ" },
            { hanzi: "包裹", pinyin: "bāo guǒ", meaning: "Bưu kiện" },
          ],
          grammar: [
            {
              title: "Câu kiêm ngữ: 让/请 + ai + làm gì",
              pattern: "让 + người + V",
              explanation: "让 (ràng) = bảo, để. Người sau 让 vừa là tân ngữ vừa là chủ ngữ động từ sau.",
              examples: [
                { cn: "请让快递员把包裹放在门口。", pinyin: "Qǐng ràng kuài dì yuán bǎ bāo guǒ fàng zài mén kǒu.", vi: "Vui lòng để shipper đặt bưu kiện ở cửa." },
              ],
            },
          ],
          dialogue: {
            topic: "Mua sắm online",
            lines: [
              { speaker: "A", cn: "你常网购吗?", pinyin: "Nǐ cháng wǎng gòu ma?", vi: "Bạn có hay mua online không?" },
              { speaker: "B", cn: "常,很方便,快递两天就到。", pinyin: "Cháng, hěn fāng biàn, kuài dì liǎng tiān jiù dào.", vi: "Có, rất tiện, ship 2 ngày là tới." },
            ],
          },
          quiz: [
            { question: "快递 nghĩa là?", options: ["Tin nhắn", "Chuyển phát nhanh", "Giảm giá", "Mã giảm"], answer: 1 },
            { question: "让 nghĩa là?", options: ["Bị", "Bảo / để (ai làm gì)", "Đến", "Đi"], answer: 1 },
          ],
        },
      ],
    },
    {
      week: 6,
      title: "Tổng ôn HSK 3",
      goal: "Ôn tập tổng hợp, chuẩn bị thi",
      lessons: [
        {
          id: "h3-w6-l1",
          title: "Diễn đạt ý kiến",
          desc: "Đồng ý, phản đối, đề xuất",
          vocab: [
            { hanzi: "意见", pinyin: "yì jiàn", meaning: "Ý kiến" },
            { hanzi: "同意", pinyin: "tóng yì", meaning: "Đồng ý" },
            { hanzi: "反对", pinyin: "fǎn duì", meaning: "Phản đối" },
            { hanzi: "建议", pinyin: "jiàn yì", meaning: "Đề nghị" },
            { hanzi: "认为", pinyin: "rèn wéi", meaning: "Cho rằng" },
            { hanzi: "可能", pinyin: "kě néng", meaning: "Có thể" },
            { hanzi: "也许", pinyin: "yě xǔ", meaning: "Có lẽ" },
            { hanzi: "当然", pinyin: "dāng rán", meaning: "Đương nhiên" },
          ],
          grammar: [
            {
              title: "Câu điều kiện: 如果...就...",
              pattern: "如果 A, 就 B",
              explanation: "Nếu A thì B.",
              examples: [
                { cn: "如果明天下雨,我就不去了。", pinyin: "Rú guǒ míng tiān xià yǔ, wǒ jiù bú qù le.", vi: "Nếu mai mưa, tôi sẽ không đi." },
              ],
            },
          ],
          dialogue: {
            topic: "Thảo luận",
            lines: [
              { speaker: "A", cn: "你觉得这个计划怎么样?", pinyin: "Nǐ jué de zhè ge jì huà zěn me yàng?", vi: "Bạn thấy kế hoạch này thế nào?" },
              { speaker: "B", cn: "我同意,但是我有一个建议。", pinyin: "Wǒ tóng yì, dàn shì wǒ yǒu yí gè jiàn yì.", vi: "Mình đồng ý, nhưng có một đề nghị." },
            ],
          },
          quiz: [
            { question: "建议 nghĩa là?", options: ["Phản đối", "Đề nghị", "Câu hỏi", "Câu trả lời"], answer: 1 },
            { question: "如果...就... biểu thị?", options: ["Nguyên nhân", "Điều kiện", "Đối lập", "Kết quả"], answer: 1 },
          ],
        },
        {
          id: "h3-w6-l2",
          title: "Tổng kết HSK 3",
          desc: "Ôn tập, chuẩn bị thi HSK 3",
          vocab: [
            { hanzi: "复习", pinyin: "fù xí", meaning: "Ôn tập" },
            { hanzi: "总结", pinyin: "zǒng jié", meaning: "Tổng kết" },
            { hanzi: "汉字", pinyin: "Hàn zì", meaning: "Chữ Hán" },
            { hanzi: "词语", pinyin: "cí yǔ", meaning: "Từ ngữ" },
            { hanzi: "句子", pinyin: "jù zi", meaning: "Câu" },
            { hanzi: "语法", pinyin: "yǔ fǎ", meaning: "Ngữ pháp" },
            { hanzi: "进步", pinyin: "jìn bù", meaning: "Tiến bộ" },
            { hanzi: "继续", pinyin: "jì xù", meaning: "Tiếp tục" },
          ],
          grammar: [
            {
              title: "Cấu trúc nhấn mạnh: 是...的",
              pattern: "是 + thông tin nhấn mạnh + 的",
              explanation: "Nhấn mạnh thời gian, địa điểm, cách thức của hành động đã xảy ra.",
              examples: [
                { cn: "我是去年开始学汉语的。", pinyin: "Wǒ shì qù nián kāi shǐ xué Hàn yǔ de.", vi: "Tôi bắt đầu học tiếng Trung từ năm ngoái." },
              ],
            },
          ],
          dialogue: {
            topic: "Sau khi học xong",
            lines: [
              { speaker: "A", cn: "你的汉语进步很大!", pinyin: "Nǐ de Hàn yǔ jìn bù hěn dà!", vi: "Tiếng Trung của bạn tiến bộ nhiều!" },
              { speaker: "B", cn: "谢谢,我会继续努力。", pinyin: "Xiè xie, wǒ huì jì xù nǔ lì.", vi: "Cảm ơn, mình sẽ tiếp tục cố gắng." },
            ],
          },
          quiz: [
            { question: "进步 nghĩa là?", options: ["Lùi", "Tiến bộ", "Đứng yên", "Bỏ"], answer: 1 },
            { question: "是...的 dùng để?", options: ["Phủ định", "Nhấn mạnh", "So sánh", "Đề nghị"], answer: 1 },
          ],
        },
      ],
    },
  ],
};

export const hskCourses: HskCourse[] = [hsk1, hsk2, hsk3];

export const getCourse = (level: number) => hskCourses.find((c) => c.level === level);
export const getLesson = (lessonId: string): { lesson: Lesson; course: HskCourse; week: Week } | null => {
  for (const course of hskCourses) {
    for (const week of course.weeks) {
      const lesson = week.lessons.find((l) => l.id === lessonId);
      if (lesson) return { lesson, course, week };
    }
  }
  return null;
};
