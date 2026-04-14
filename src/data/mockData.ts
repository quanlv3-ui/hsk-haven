export const user = {
  name: "Minh Tuấn",
  level: "HSK 3",
  streakDays: 7,
  wordsLearned: 450,
  wordsThisWeek: 47,
  accuracy: 85,
  plan: "free" as const,
};

export const sampleCard = {
  hanzi: "学习",
  pinyin: "xué xí",
  meaning: "học tập, nghiên cứu",
  example: "我每天都学习中文。",
  exampleTranslation: "Tôi học tiếng Trung mỗi ngày.",
  context: "Thường dùng trong văn viết",
  hskLevel: 3,
  strokeCount: 8,
  nextReview: "3 ngày nữa",
};

export const flashcards = [
  { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào", example: "你好，我是小明。", exampleTranslation: "Xin chào, tôi là Tiểu Minh.", context: "Thông dụng", hskLevel: 1 },
  { hanzi: "谢谢", pinyin: "xiè xiè", meaning: "Cảm ơn", example: "谢谢你的帮助。", exampleTranslation: "Cảm ơn sự giúp đỡ của bạn.", context: "Thông dụng", hskLevel: 1 },
  { hanzi: "学习", pinyin: "xué xí", meaning: "Học tập", example: "我每天都学习中文。", exampleTranslation: "Tôi học tiếng Trung mỗi ngày.", context: "Văn viết", hskLevel: 3 },
  { hanzi: "朋友", pinyin: "péng yǒu", meaning: "Bạn bè", example: "他是我的好朋友。", exampleTranslation: "Anh ấy là bạn tốt của tôi.", context: "Thông dụng", hskLevel: 1 },
  { hanzi: "工作", pinyin: "gōng zuò", meaning: "Làm việc", example: "我在公司工作。", exampleTranslation: "Tôi làm việc ở công ty.", context: "Thông dụng", hskLevel: 2 },
  { hanzi: "电影", pinyin: "diàn yǐng", meaning: "Phim, điện ảnh", example: "我们一起去看电影吧。", exampleTranslation: "Chúng ta cùng đi xem phim nhé.", context: "Văn nói", hskLevel: 2 },
  { hanzi: "旅游", pinyin: "lǚ yóu", meaning: "Du lịch", example: "我喜欢旅游。", exampleTranslation: "Tôi thích du lịch.", context: "Thông dụng", hskLevel: 3 },
  { hanzi: "健康", pinyin: "jiàn kāng", meaning: "Sức khỏe", example: "健康最重要。", exampleTranslation: "Sức khỏe là quan trọng nhất.", context: "Thông dụng", hskLevel: 3 },
];

export const hskLevels = [
  { level: 1, words: 300, color: "#22C55E", progress: 100, unlocked: true },
  { level: 2, words: 497, color: "#3B82F6", progress: 75, unlocked: true },
  { level: 3, words: 988, color: "#8B5CF6", progress: 45, unlocked: true },
  { level: 4, words: 1978, color: "#F59E0B", progress: 0, unlocked: false },
  { level: 5, words: 3557, color: "#EF4444", progress: 0, unlocked: false },
  { level: 6, words: 5334, color: "#EC4899", progress: 0, unlocked: false },
  { level: "7-9", words: 10896, color: "#6366F1", progress: 0, unlocked: false },
];

export const sampleQuestion = {
  question: "Từ này có nghĩa là gì?",
  hanzi: "学",
  options: ["Học tập", "Ăn uống", "Ngủ nghỉ", "Làm việc"],
  correct: 0,
  explanation: '学 (xué) nghĩa là học. Thường gặp trong 学习, 学生, 大学.',
};

export const quizQuestions = [
  { question: "Từ này có nghĩa là gì?", hanzi: "你好", options: ["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"], correct: 0, explanation: "你好 (nǐ hǎo) là lời chào phổ biến nhất." },
  { question: "Từ này có nghĩa là gì?", hanzi: "谢谢", options: ["Xin lỗi", "Cảm ơn", "Tạm biệt", "Xin chào"], correct: 1, explanation: "谢谢 (xiè xiè) nghĩa là cảm ơn." },
  { question: "Từ này có nghĩa là gì?", hanzi: "朋友", options: ["Gia đình", "Đồng nghiệp", "Bạn bè", "Thầy giáo"], correct: 2, explanation: "朋友 (péng yǒu) nghĩa là bạn bè." },
  { question: "Từ này có nghĩa là gì?", hanzi: "工作", options: ["Nghỉ ngơi", "Du lịch", "Học tập", "Làm việc"], correct: 3, explanation: "工作 (gōng zuò) nghĩa là làm việc." },
  { question: "Từ này có nghĩa là gì?", hanzi: "电影", options: ["Phim", "Sách", "Nhạc", "Tranh"], correct: 0, explanation: "电影 (diàn yǐng) nghĩa là phim, điện ảnh." },
  { question: "Từ này có nghĩa là gì?", hanzi: "学习", options: ["Làm việc", "Học tập", "Chơi bời", "Ăn uống"], correct: 1, explanation: "学习 (xué xí) nghĩa là học tập." },
  { question: "Từ này có nghĩa là gì?", hanzi: "旅游", options: ["Làm việc", "Nghỉ ngơi", "Du lịch", "Ăn uống"], correct: 2, explanation: "旅游 (lǚ yóu) nghĩa là du lịch." },
  { question: "Từ này có nghĩa là gì?", hanzi: "健康", options: ["Giàu có", "Đẹp đẽ", "Thông minh", "Sức khỏe"], correct: 3, explanation: "健康 (jiàn kāng) nghĩa là sức khỏe." },
  { question: "Từ này có nghĩa là gì?", hanzi: "学", options: ["Học", "Viết", "Đọc", "Nói"], correct: 0, explanation: "学 (xué) nghĩa là học." },
  { question: "Từ này có nghĩa là gì?", hanzi: "大", options: ["Nhỏ", "To, lớn", "Cao", "Thấp"], correct: 1, explanation: "大 (dà) nghĩa là to, lớn." },
];

export const todayStats = {
  cardsDue: 20,
  newCards: 5,
  studyMinutes: 12,
  quizScore: 85,
};

export const vocabularyList = [
  { id: "1", hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào", hskLevel: 1, status: "mastered" as const },
  { id: "2", hanzi: "谢谢", pinyin: "xiè xiè", meaning: "Cảm ơn", hskLevel: 1, status: "mastered" as const },
  { id: "3", hanzi: "学习", pinyin: "xué xí", meaning: "Học tập", hskLevel: 3, status: "learning" as const },
  { id: "4", hanzi: "朋友", pinyin: "péng yǒu", meaning: "Bạn bè", hskLevel: 1, status: "mastered" as const },
  { id: "5", hanzi: "工作", pinyin: "gōng zuò", meaning: "Làm việc", hskLevel: 2, status: "learning" as const },
  { id: "6", hanzi: "电影", pinyin: "diàn yǐng", meaning: "Phim", hskLevel: 2, status: "new" as const },
  { id: "7", hanzi: "旅游", pinyin: "lǚ yóu", meaning: "Du lịch", hskLevel: 3, status: "new" as const },
  { id: "8", hanzi: "健康", pinyin: "jiàn kāng", meaning: "Sức khỏe", hskLevel: 3, status: "learning" as const },
  { id: "9", hanzi: "老师", pinyin: "lǎo shī", meaning: "Giáo viên", hskLevel: 1, status: "mastered" as const },
  { id: "10", hanzi: "医院", pinyin: "yī yuàn", meaning: "Bệnh viện", hskLevel: 2, status: "learning" as const },
];

export const achievements = [
  { id: "1", emoji: "🎯", name: "Bước đầu tiên", description: "Học từ đầu tiên", unlocked: true, category: "Cột mốc" },
  { id: "2", emoji: "📚", name: "Mọt sách", description: "Học 100 từ", unlocked: true, category: "Học tập" },
  { id: "3", emoji: "🔥", name: "Lửa 7 ngày", description: "Streak 7 ngày liên tiếp", unlocked: true, category: "Streak" },
  { id: "4", emoji: "🏆", name: "HSK 1 Master", description: "Hoàn thành HSK 1", unlocked: true, category: "Cột mốc" },
  { id: "5", emoji: "⚡", name: "Tốc độ", description: "Hoàn thành quiz dưới 3 phút", unlocked: true, category: "Quiz" },
  { id: "6", emoji: "💯", name: "Hoàn hảo", description: "Đạt 100% một bài quiz", unlocked: false, condition: "Đạt 100% quiz", category: "Quiz" },
  { id: "7", emoji: "🌟", name: "500 từ", description: "Học 500 từ vựng", unlocked: false, condition: "Học 500 từ", category: "Học tập" },
  { id: "8", emoji: "🔥", name: "Lửa 30 ngày", description: "Streak 30 ngày", unlocked: false, condition: "30 ngày liên tiếp", category: "Streak" },
  { id: "9", emoji: "✍️", name: "Thư pháp gia", description: "Viết đúng 50 chữ", unlocked: false, condition: "Viết đúng 50 chữ", category: "Viết chữ" },
  { id: "10", emoji: "🎓", name: "HSK 3 Master", description: "Hoàn thành HSK 3", unlocked: false, condition: "Hoàn thành HSK 3", category: "Cột mốc" },
  { id: "11", emoji: "💪", name: "Không bỏ cuộc", description: "Ôn lại từ sai 10 lần", unlocked: false, condition: "Ôn lại từ sai 10 lần", category: "Học tập" },
  { id: "12", emoji: "🏅", name: "HSK 2 Master", description: "Hoàn thành HSK 2", unlocked: true, category: "Cột mốc" },
];

export const recentActivities = [
  { icon: "📖", text: "Ôn tập 15 thẻ HSK 3", time: "2 giờ trước" },
  { icon: "✅", text: "Quiz HSK 2 — 90%", time: "5 giờ trước" },
  { icon: "🆕", text: "Học 5 từ mới HSK 3", time: "Hôm qua" },
];

// ===== PINYIN DATA =====
export const pinyinInitials = [
  { letter: "b", example: "爸", pinyin: "bà", meaning: "bố", audio: "ba" },
  { letter: "p", example: "怕", pinyin: "pà", meaning: "sợ", audio: "pa" },
  { letter: "m", example: "妈", pinyin: "mā", meaning: "mẹ", audio: "ma" },
  { letter: "f", example: "发", pinyin: "fā", meaning: "phát", audio: "fa" },
  { letter: "d", example: "大", pinyin: "dà", meaning: "lớn", audio: "da" },
  { letter: "t", example: "他", pinyin: "tā", meaning: "anh ấy", audio: "ta" },
  { letter: "n", example: "你", pinyin: "nǐ", meaning: "bạn", audio: "ni" },
  { letter: "l", example: "来", pinyin: "lái", meaning: "đến", audio: "lai" },
  { letter: "g", example: "哥", pinyin: "gē", meaning: "anh", audio: "ge" },
  { letter: "k", example: "看", pinyin: "kàn", meaning: "nhìn", audio: "kan" },
  { letter: "h", example: "好", pinyin: "hǎo", meaning: "tốt", audio: "hao" },
  { letter: "j", example: "家", pinyin: "jiā", meaning: "nhà", audio: "jia" },
  { letter: "q", example: "去", pinyin: "qù", meaning: "đi", audio: "qu" },
  { letter: "x", example: "小", pinyin: "xiǎo", meaning: "nhỏ", audio: "xiao" },
  { letter: "zh", example: "中", pinyin: "zhōng", meaning: "giữa", audio: "zhong" },
  { letter: "ch", example: "吃", pinyin: "chī", meaning: "ăn", audio: "chi" },
  { letter: "sh", example: "是", pinyin: "shì", meaning: "là", audio: "shi" },
  { letter: "r", example: "人", pinyin: "rén", meaning: "người", audio: "ren" },
  { letter: "z", example: "在", pinyin: "zài", meaning: "ở", audio: "zai" },
  { letter: "c", example: "从", pinyin: "cóng", meaning: "từ", audio: "cong" },
  { letter: "s", example: "三", pinyin: "sān", meaning: "ba", audio: "san" },
  { letter: "y", example: "有", pinyin: "yǒu", meaning: "có", audio: "you" },
  { letter: "w", example: "我", pinyin: "wǒ", meaning: "tôi", audio: "wo" }
];

export const pinyinFinals = [
  { group: "Vận mẫu đơn", finals: ["a", "o", "e", "i", "u", "ü"] },
  { group: "Vận mẫu kép", finals: ["ai", "ei", "ui", "ao", "ou", "iu", "ie", "üe", "er"] },
  { group: "Vận mẫu mũi", finals: ["an", "en", "in", "un", "ün", "ang", "eng", "ing", "ong"] }
];

export const pinyinTones = [
  { tone: 1, name: "Thanh 1 — Bằng", symbol: "ˉ", description: "Cao và đều, giữ nguyên", example: "mā (妈) — mẹ", color: "text-easy" },
  { tone: 2, name: "Thanh 2 — Lên", symbol: "ˊ", description: "Đi lên từ trung lên cao", example: "má (麻) — gai", color: "text-success" },
  { tone: 3, name: "Thanh 3 — Xuống lên", symbol: "ˇ", description: "Xuống thấp rồi lên lại", example: "mǎ (马) — ngựa", color: "text-warning" },
  { tone: 4, name: "Thanh 4 — Xuống", symbol: "ˋ", description: "Đi xuống nhanh và dứt khoát", example: "mà (骂) — chửi", color: "text-destructive" },
  { tone: 5, name: "Thanh nhẹ", symbol: "·", description: "Nhẹ và ngắn, không nhấn", example: "ma (吗) — (trợ từ hỏi)", color: "text-muted-foreground" },
];

// ===== RADICALS (Bộ thủ) =====
export const radicals = [
  { id: 1, radical: "人", pinyin: "rén", meaning: "người", strokeCount: 2, examples: ["你", "他", "们", "什"], category: "Con người" },
  { id: 2, radical: "口", pinyin: "kǒu", meaning: "miệng", strokeCount: 3, examples: ["吃", "喝", "吗", "呢"], category: "Cơ thể" },
  { id: 3, radical: "女", pinyin: "nǚ", meaning: "nữ, gái", strokeCount: 3, examples: ["妈", "她", "好", "姐"], category: "Con người" },
  { id: 4, radical: "水", pinyin: "shuǐ", meaning: "nước", strokeCount: 4, examples: ["河", "海", "洗", "游"], category: "Tự nhiên" },
  { id: 5, radical: "火", pinyin: "huǒ", meaning: "lửa", strokeCount: 4, examples: ["热", "烧", "灯", "炒"], category: "Tự nhiên" },
  { id: 6, radical: "木", pinyin: "mù", meaning: "cây, gỗ", strokeCount: 4, examples: ["林", "森", "树", "本"], category: "Tự nhiên" },
  { id: 7, radical: "手", pinyin: "shǒu", meaning: "tay", strokeCount: 4, examples: ["打", "拿", "找", "把"], category: "Cơ thể" },
  { id: 8, radical: "心", pinyin: "xīn", meaning: "tim, lòng", strokeCount: 4, examples: ["想", "思", "忘", "快"], category: "Cơ thể" },
  { id: 9, radical: "日", pinyin: "rì", meaning: "mặt trời, ngày", strokeCount: 4, examples: ["明", "时", "早", "晚"], category: "Tự nhiên" },
  { id: 10, radical: "月", pinyin: "yuè", meaning: "mặt trăng, tháng", strokeCount: 4, examples: ["朋", "有", "期", "肉"], category: "Tự nhiên" },
  { id: 11, radical: "土", pinyin: "tǔ", meaning: "đất", strokeCount: 3, examples: ["地", "场", "城", "在"], category: "Tự nhiên" },
  { id: 12, radical: "金", pinyin: "jīn", meaning: "vàng, kim loại", strokeCount: 8, examples: ["钱", "银", "铁", "钟"], category: "Vật liệu" },
  { id: 13, radical: "言", pinyin: "yán", meaning: "lời nói", strokeCount: 7, examples: ["说", "话", "语", "读"], category: "Giao tiếp" },
  { id: 14, radical: "走", pinyin: "zǒu", meaning: "đi bộ", strokeCount: 7, examples: ["起", "超", "越", "赶"], category: "Hành động" },
  { id: 15, radical: "食", pinyin: "shí", meaning: "thức ăn", strokeCount: 9, examples: ["饭", "饿", "馆", "饮"], category: "Đời sống" },
];

// ===== PHONETIC MATRICES (Ma trận Hình Thanh) =====
export const phoneticMatrices = [
  {
    id: "qing_matrix",
    baseRadical: "青",
    basePinyin: "qīng",
    baseMeaning: "Xanh dương/lục, tuổi trẻ",
    derivatives: [
      { character: "清", pinyin: "qīng", radical: "氵 (Thủy - Nước)", meaning: "Trong trẻo, thanh khiết (nước xanh)" },
      { character: "请", pinyin: "qǐng", radical: "讠 (Ngôn - Lời nói)", meaning: "Mời, thỉnh cầu (dùng lời)" },
      { character: "晴", pinyin: "qíng", radical: "日 (Nhật - Mặt trời)", meaning: "Trời quang, nắng (mặt trời)" },
      { character: "情", pinyin: "qíng", radical: "忄 (Tâm - Tình cảm)", meaning: "Tình cảm, tình yêu (con tim)" },
      { character: "睛", pinyin: "jīng", radical: "目 (Mục - Mắt)", meaning: "Tròng mắt, con ngươi (mắt)" },
      { character: "蜻", pinyin: "qīng", radical: "虫 (Trùng - Côn trùng)", meaning: "Con chuồn chuồn" },
      { character: "精", pinyin: "jīng", radical: "米 (Mễ - Gạo)", meaning: "Tinh túy, tinh xảo (Gạo trắng sát kỹ)" },
      { character: "猜", pinyin: "cāi", radical: "犭 (Khuyển - Chó)", meaning: "Đoán, nghi ngờ (Con chó do thám) [Biến âm]" }
    ]
  },
  {
    id: "jian_matrix",
    baseRadical: "建",
    basePinyin: "jiàn",
    baseMeaning: "Kiến (Xây dựng, thành lập)",
    derivatives: [
      { character: "健", pinyin: "jiàn", radical: "亻 (Nhân - Người)", meaning: "Khỏe mạnh (người tập thể dục)" },
      { character: "键", pinyin: "jiàn", radical: "钅 (Kim - Kim loại)", meaning: "Chìa khóa, bàn phím (làm bằng kim loại)" },
      { character: "腱", pinyin: "jiàn", radical: "月 (Nhục - Thịt/Cơ thể)", meaning: "Gân, dây chằng (chỉ cơ thể)" },
      { character: "楗", pinyin: "jiàn", radical: "木 (Mộc - Gỗ)", meaning: "Then cài cửa (bằng gỗ)" }
    ]
  },
  {
    id: "bao_matrix",
    baseRadical: "包",
    basePinyin: "bāo",
    baseMeaning: "Bao, túi, bọc",
    derivatives: [
      { character: "饱", pinyin: "bǎo", radical: "饣 (Thực - Ăn)", meaning: "No bụng (do ăn)" },
      { character: "抱", pinyin: "bào", radical: "扌 (Thủ - Tay)", meaning: "Ôm ấp (dùng tay)" },
      { character: "跑", pinyin: "pǎo", radical: "足 (Túc - Chân)", meaning: "Chạy (dùng chân) [Biến âm nhẹ]" },
      { character: "泡", pinyin: "pào", radical: "氵 (Thủy - Nước)", meaning: "Bong bóng, pha trà (có nước)" },
      { character: "炮", pinyin: "pào", radical: "火 (Hỏa - Lửa)", meaning: "Pháo, đại bác (dùng lửa)" },
      { character: "胞", pinyin: "bāo", radical: "月 (Nhục - Cơ thể)", meaning: "Tế bào, đồng bào (Cùng ruột thịt)" }
    ]
  },
  {
    id: "fang_matrix",
    baseRadical: "方",
    basePinyin: "fāng",
    baseMeaning: "Phương, vuông vức, phương hướng",
    derivatives: [
      { character: "房", pinyin: "fáng", radical: "户 (Hộ - Cửa)", meaning: "Căn phòng, nhà ở" },
      { character: "放", pinyin: "fàng", radical: "攵 (Phốc - Đánh/Hành động)", meaning: "Phóng, thả ra, đặt để" },
      { character: "防", pinyin: "fáng", radical: "阝 (Phụ - Gò đất)", meaning: "Phòng thủ, đê điều (Dùng đất đắp đê)" },
      { character: "芳", pinyin: "fāng", radical: "艹 (Thảo - Cỏ)", meaning: "Hương thơm (của hoa cỏ)" },
      { character: "访", pinyin: "fǎng", radical: "讠 (Ngôn - Lời nói)", meaning: "Phỏng vấn, thăm hỏi" },
      { character: "坊", pinyin: "fāng", radical: "土 (Thổ - Đất)", meaning: "Phường, xưởng đất" }
    ]
  },
  {
    id: "ke_matrix",
    baseRadical: "可",
    basePinyin: "kě",
    baseMeaning: "Có thể, cho phép",
    derivatives: [
      { character: "河", pinyin: "hé", radical: "氵 (Thủy - Nước)", meaning: "Dòng sông (Âm hé/ke đổi nhau)" },
      { character: "呵", pinyin: "hē", radical: "口 (Khẩu - Miệng)", meaning: "Hơi thở, chế nhạo" },
      { character: "奇", pinyin: "qí", radical: "大 (Đại - To lớn)", meaning: "Kỳ lạ, kỳ diệu (Âm qi biến thể từ ke)" },
      { character: "骑", pinyin: "qí", radical: "马 (Mã - Ngựa)", meaning: "Cưỡi ngựa" },
      { character: "椅", pinyin: "yǐ", radical: "木 (Mộc - Gỗ)", meaning: "Cái ghế ngồi (Bằng gỗ)" }
    ]
  }
];

// ===== IDEOGRAM EQUATIONS (Hội Ý / Lắp Ráp) =====
export const ideogramEquations = [
  {
    id: "ming",
    result: "明",
    pinyin: "míng",
    meaning: "Sáng sủa, rực rỡ",
    parts: [
      { character: "日", meaning: "Mặt trời" },
      { character: "月", meaning: "Mặt trăng" }
    ],
    explanation: "Khi có cả ánh sáng của mặt trời (Ban ngày) và mặt trăng (Ban đêm) hội tụ, thì tượng trưng cho sự sáng sủa tột bực."
  },
  {
    id: "hao",
    result: "好",
    pinyin: "hǎo",
    meaning: "Tốt đẹp, hay",
    parts: [
      { character: "女", meaning: "Phụ nữ/Mẹ" },
      { character: "子", meaning: "Con cái" }
    ],
    explanation: "Phụ nữ (Mẹ) mà bế đứa con trên tay, hoặc gia đình có đủ nếp đủ tẻ là niềm hạnh phúc và tốt đẹp nhất (tốt, hay)."
  },
  {
    id: "xiu",
    result: "休",
    pinyin: "xiū",
    meaning: "Nghỉ ngơi, hưu trí",
    parts: [
      { character: "亻", meaning: "Con người" },
      { character: "木", meaning: "Cái cây" }
    ],
    explanation: "Hình ảnh một người đang tựa lưng vào gốc cây để nghỉ mệt sau khi làm lụng vất vả."
  },
  {
    id: "lin",
    result: "林",
    pinyin: "lín",
    meaning: "Rừng nhỏ",
    parts: [
      { character: "木", meaning: "Cây" },
      { character: "木", meaning: "Cây" }
    ],
    explanation: "Hai cái cây đứng cạnh nhau hội ý lại tạo thành một khu rừng (Lâm)."
  },
  {
    id: "sen",
    result: "森",
    pinyin: "sēn",
    meaning: "Rừng rậm",
    parts: [
      { character: "木", meaning: "Cây" },
      { character: "木", meaning: "Cây" },
      { character: "木", meaning: "Cây" }
    ],
    explanation: "Ba cái cây đứng chồng chéo lên nhau biểu thị số lượng quá nhiều tạo thành một khu rừng rậm rạp chằng chịt (Sâm)."
  },
  {
    id: "kàn",
    result: "看",
    pinyin: "kàn",
    meaning: "Nhìn, xem",
    parts: [
      { character: "手", meaning: "Bàn tay" },
      { character: "目", meaning: "Con mắt" }
    ],
    explanation: "Đưa bàn tay (biến thể thành 龵) lên che ngang mí mắt (目) để cản chói nắng giúp ta nhìn được xa hơn."
  },
  {
    id: "nan",
    result: "男",
    pinyin: "nán",
    meaning: "Đàn ông, nam giới",
    parts: [
      { character: "田", meaning: "Ruộng đồng" },
      { character: "力", meaning: "Sức mạnh" }
    ],
    explanation: "Người dùng sức lực (力) cày cấy trên đồng ruộng (田) chính là hình ảnh đặc trưng của người đàn ông."
  },
  {
    id: "jian",
    result: "尖",
    pinyin: "jiān",
    meaning: "Nhọn (cái ngòi nhọn)",
    parts: [
      { character: "小", meaning: "Nhỏ bé" },
      { character: "大", meaning: "To lớn" }
    ],
    explanation: "Một vật có cấu trúc ở dưới to (大) ở trên dần nhỏ lại (小) thì đó chính là hình dáng của một mũi nhọn."
  },
  {
    id: " Cong",
    result: "从",
    pinyin: "cóng",
    meaning: "Theo gót, đi theo",
    parts: [
      { character: "人", meaning: "Người trước" },
      { character: "人", meaning: "Người sau" }
    ],
    explanation: "Một người đi đằng trước, một người đi ở đằng sau nối gót nhau tạo thành chữ Tòng (đi theo, tuân theo)."
  },
  {
    id: "zhong",
    result: "众",
    pinyin: "zhòng",
    meaning: "Quần chúng, đám đông",
    parts: [
      { character: "人", meaning: "Người" },
      { character: "人", meaning: "Người" },
      { character: "人", meaning: "Người" }
    ],
    explanation: "Rất nhiều người (3 chữ Nhân) tụ tập lại một chỗ tượng trưng cho đám đông, quần chúng."
  },
  {
    id: "qiu",
    result: "囚",
    pinyin: "qiú",
    meaning: "Tù nhân",
    parts: [
      { character: "囗", meaning: "Phạm vi bị nhốt" },
      { character: "人", meaning: "Con người" }
    ],
    explanation: "Một con người (人) bị nhốt kín bên trong một khoảng không/chuồng (囗) thì chính là kẻ bị bắt giam, tù nhân."
  },
  {
    id: "wei",
    result: "泪",
    pinyin: "lèi",
    meaning: "Nước mắt",
    parts: [
      { character: "氵", meaning: "Nước" },
      { character: "目", meaning: "Con mắt" }
    ],
    explanation: "Giọt nước (氵) rỉ ra từ khóe mắt (目) chính là hình ảnh tượng ý tả thực của Nước mắt."
  }
];

// ===== GRAMMAR =====
export const grammarLessons = [
  {
    id: "1",
    hskLevel: 1,
    title: "Câu khẳng định cơ bản: S + V + O",
    explanation: "Tiếng Trung có trật tự câu giống tiếng Việt: Chủ ngữ + Động từ + Tân ngữ",
    structure: "主语 + 动词 + 宾语",
    examples: [
      { chinese: "我吃饭。", pinyin: "Wǒ chī fàn.", vietnamese: "Tôi ăn cơm." },
      { chinese: "他喝水。", pinyin: "Tā hē shuǐ.", vietnamese: "Anh ấy uống nước." },
      { chinese: "她学中文。", pinyin: "Tā xué zhōngwén.", vietnamese: "Cô ấy học tiếng Trung." },
    ],
    exercises: [
      { type: "order", words: ["我", "喝", "咖啡"], correct: "我喝咖啡。", vietnamese: "Tôi uống cà phê." },
      { type: "order", words: ["她", "看", "书"], correct: "她看书。", vietnamese: "Cô ấy đọc sách." },
    ],
  },
  {
    id: "2",
    hskLevel: 1,
    title: "Câu hỏi với 吗 (ma)",
    explanation: "Thêm 吗 vào cuối câu khẳng định để tạo câu hỏi Yes/No",
    structure: "S + V + O + 吗？",
    examples: [
      { chinese: "你好吗？", pinyin: "Nǐ hǎo ma?", vietnamese: "Bạn khỏe không?" },
      { chinese: "你吃饭了吗？", pinyin: "Nǐ chī fàn le ma?", vietnamese: "Bạn ăn cơm chưa?" },
    ],
    exercises: [
      { type: "order", words: ["你", "是", "学生", "吗"], correct: "你是学生吗？", vietnamese: "Bạn là học sinh à?" },
    ],
  },
  {
    id: "3",
    hskLevel: 1,
    title: "Phủ định với 不 (bù)",
    explanation: "Đặt 不 trước động từ/tính từ để phủ định (trừ 有 dùng 没)",
    structure: "S + 不 + V + O",
    examples: [
      { chinese: "我不吃肉。", pinyin: "Wǒ bù chī ròu.", vietnamese: "Tôi không ăn thịt." },
      { chinese: "他不是老师。", pinyin: "Tā bú shì lǎoshī.", vietnamese: "Anh ấy không phải giáo viên." },
    ],
    exercises: [
      { type: "order", words: ["我", "不", "喜欢", "猫"], correct: "我不喜欢猫。", vietnamese: "Tôi không thích mèo." },
    ],
  },
  {
    id: "4",
    hskLevel: 2,
    title: "So sánh với 比 (bǐ)",
    explanation: "A 比 B + tính từ = A ... hơn B",
    structure: "A + 比 + B + Adj",
    examples: [
      { chinese: "他比我高。", pinyin: "Tā bǐ wǒ gāo.", vietnamese: "Anh ấy cao hơn tôi." },
      { chinese: "今天比昨天冷。", pinyin: "Jīntiān bǐ zuótiān lěng.", vietnamese: "Hôm nay lạnh hơn hôm qua." },
    ],
    exercises: [
      { type: "order", words: ["苹果", "比", "香蕉", "贵"], correct: "苹果比香蕉贵。", vietnamese: "Táo đắt hơn chuối." },
    ],
  },
  {
    id: "5",
    hskLevel: 2,
    title: "Đã/rồi với 了 (le)",
    explanation: "Đặt 了 sau động từ để chỉ hành động đã hoàn thành",
    structure: "S + V + 了 + O",
    examples: [
      { chinese: "我吃了饭。", pinyin: "Wǒ chī le fàn.", vietnamese: "Tôi đã ăn cơm." },
      { chinese: "他去了北京。", pinyin: "Tā qù le Běijīng.", vietnamese: "Anh ấy đã đi Bắc Kinh." },
    ],
    exercises: [
      { type: "order", words: ["我", "买", "了", "一本书"], correct: "我买了一本书。", vietnamese: "Tôi đã mua một cuốn sách." },
    ],
  },
];

// ===== HSK EXAM =====
export const hskExamSections = {
  listening: [
    {
      id: 1,
      audio: "Nǐ hǎo, qǐngwèn nǐ jiào shénme míngzì?",
      audioText: "你好，请问你叫什么名字？",
      question: "Người nói muốn biết điều gì?",
      options: ["Tên của bạn", "Tuổi của bạn", "Nghề nghiệp", "Quê quán"],
      correct: 0,
    },
    {
      id: 2,
      audio: "Jīntiān tiānqì hěn hǎo, wǒmen qù gōngyuán ba.",
      audioText: "今天天气很好，我们去公园吧。",
      question: "Người nói muốn làm gì?",
      options: ["Đi công viên", "Ở nhà", "Đi làm", "Đi mua sắm"],
      correct: 0,
    },
    {
      id: 3,
      audio: "Zhè ge cài duōshǎo qián?",
      audioText: "这个菜多少钱？",
      question: "Người nói đang hỏi gì?",
      options: ["Giá tiền", "Tên món", "Cách nấu", "Nguyên liệu"],
      correct: 0,
    },
  ],
  reading: [
    {
      id: 1,
      passage: "小明每天早上六点起床。他先洗脸，然后吃早饭。八点他去学校上课。下午三点放学后，他和朋友一起打篮球。",
      passagePinyin: "Xiǎo Míng měitiān zǎoshàng liù diǎn qǐchuáng...",
      questions: [
        { question: "小明几点起床？", options: ["五点", "六点", "七点", "八点"], correct: 1 },
        { question: "他放学后做什么？", options: ["看书", "回家", "打篮球", "上网"], correct: 2 },
      ],
    },
    {
      id: 2,
      passage: "我的妈妈是一个医生。她在医院工作。她每天很忙，但是她很喜欢她的工作。周末的时候，她喜欢做饭和看电影。",
      passagePinyin: "Wǒ de māma shì yí ge yīshēng...",
      questions: [
        { question: "妈妈的职业是什么？", options: ["老师", "医生", "护士", "厨师"], correct: 1 },
        { question: "妈妈周末喜欢做什么？", options: ["工作", "运动", "做饭和看电影", "旅游"], correct: 2 },
      ],
    },
  ],
  writing: [
    {
      id: 1,
      instruction: "Sắp xếp từ thành câu đúng ngữ pháp:",
      words: ["我", "每天", "学习", "中文"],
      correct: "我每天学习中文。",
      translation: "Tôi học tiếng Trung mỗi ngày.",
    },
    {
      id: 2,
      instruction: "Sắp xếp từ thành câu đúng ngữ pháp:",
      words: ["他", "去年", "去", "了", "北京"],
      correct: "他去年去了北京。",
      translation: "Anh ấy năm ngoái đã đi Bắc Kinh.",
    },
    {
      id: 3,
      instruction: "Sắp xếp từ thành câu đúng ngữ pháp:",
      words: ["这个", "苹果", "比", "那个", "大"],
      correct: "这个苹果比那个大。",
      translation: "Quả táo này lớn hơn quả kia。",
    },
  ],
  translation: [
    {
      id: 1,
      question: "Dịch câu sau sang Tiếng Trung:",
      source: "Cô ấy là giáo viên tiếng Trung của tôi.",
      options: ["他是我的英文老师。", "她是我的中文老师。", "她不是我的老朋友。", "他是越南人。"],
      correct: 1,
    },
    {
      id: 2,
      question: "Dịch câu sau sang Tiếng Việt:",
      source: "今天天气很好，我们去公园吧。",
      options: ["Hôm nay trời mưa, đừng ra ngoài.", "Hôm nay thời tiết rất đẹp, chúng ta đi công viên nhé.", "Ngày mai thời tiết đẹp, chúng ta đi du lịch nhé.", "Hôm qua đi công viên rất vui."],
      correct: 1,
    },
  ],
  speaking: [
    {
      id: 1,
      prompt: "Đọc to rõ ràng câu sau (Voice Record):",
      text: "欢迎光临，请问您几位？",
      pinyin: "Huānyíng guānglín, qǐngwèn nín jǐ wèi?",
    },
    {
      id: 2,
      prompt: "Trả lời câu hỏi sau bằng tiếng Trung (Voice Record):",
      text: "周末你喜欢做什么？",
      pinyin: "Zhōumò nǐ xǐhuān zuò shénme?",
    },
  ],
};

// ===== LISTENING PRACTICE =====
export const listeningExercises = [
  { id: 1, type: "word" as const, audioText: "你好", pinyin: "nǐ hǎo", options: ["你好", "你们", "他好", "她好"], correct: 0, meaning: "Xin chào" },
  { id: 2, type: "word" as const, audioText: "谢谢", pinyin: "xiè xiè", options: ["学习", "谢谢", "姐姐", "些些"], correct: 1, meaning: "Cảm ơn" },
  { id: 3, type: "word" as const, audioText: "老师", pinyin: "lǎo shī", options: ["老是", "老师", "老实", "劳动"], correct: 1, meaning: "Giáo viên" },
  { id: 4, type: "sentence" as const, audioText: "我是学生", pinyin: "wǒ shì xuéshēng", options: ["Tôi là giáo viên", "Tôi là học sinh", "Tôi là bác sĩ", "Tôi là công nhân"], correct: 1, meaning: "Tôi là học sinh" },
  { id: 5, type: "sentence" as const, audioText: "今天天气很好", pinyin: "jīntiān tiānqì hěn hǎo", options: ["Hôm nay trời đẹp", "Hôm qua trời mưa", "Ngày mai trời lạnh", "Tối nay trời tối"], correct: 0, meaning: "Hôm nay thời tiết rất tốt" },
];

// ===== MEMORY GAME =====
export const memoryGameCards = [
  { id: 1, hanzi: "大", meaning: "Lớn" },
  { id: 2, hanzi: "小", meaning: "Nhỏ" },
  { id: 3, hanzi: "好", meaning: "Tốt" },
  { id: 4, hanzi: "人", meaning: "Người" },
  { id: 5, hanzi: "中", meaning: "Giữa" },
  { id: 6, hanzi: "天", meaning: "Trời" },
  { id: 7, hanzi: "上", meaning: "Trên" },
  { id: 8, hanzi: "下", meaning: "Dưới" },
];

// ===== SCENARIOS =====
export const scenarios = [
  {
    id: "restaurant",
    title: "Đi nhà hàng 🍜",
    description: "Học cách gọi món, hỏi giá, thanh toán",
    icon: "🍜",
    phrases: [
      { chinese: "服务员！", pinyin: "Fúwùyuán!", vietnamese: "Phục vụ ơi!" },
      { chinese: "请给我菜单。", pinyin: "Qǐng gěi wǒ càidān.", vietnamese: "Cho tôi xem thực đơn." },
      { chinese: "我要一碗米饭。", pinyin: "Wǒ yào yì wǎn mǐfàn.", vietnamese: "Tôi muốn một bát cơm." },
      { chinese: "多少钱？", pinyin: "Duōshǎo qián?", vietnamese: "Bao nhiêu tiền?" },
      { chinese: "买单！", pinyin: "Mǎidān!", vietnamese: "Tính tiền!" },
    ],
  },
  {
    id: "travel",
    title: "Du lịch ✈️",
    description: "Hỏi đường, đặt khách sạn, mua vé",
    icon: "✈️",
    phrases: [
      { chinese: "请问，火车站怎么走？", pinyin: "Qǐngwèn, huǒchē zhàn zěnme zǒu?", vietnamese: "Xin hỏi, ga xe lửa đi đường nào?" },
      { chinese: "我要订一个房间。", pinyin: "Wǒ yào dìng yí ge fángjiān.", vietnamese: "Tôi muốn đặt một phòng." },
      { chinese: "一张去北京的票。", pinyin: "Yì zhāng qù Běijīng de piào.", vietnamese: "Một vé đi Bắc Kinh." },
    ],
  },
  {
    id: "shopping",
    title: "Mua sắm 🛍️",
    description: "Trả giá, hỏi size, thanh toán",
    icon: "🛍️",
    phrases: [
      { chinese: "这个多少钱？", pinyin: "Zhè ge duōshǎo qián?", vietnamese: "Cái này bao nhiêu tiền?" },
      { chinese: "太贵了！便宜一点。", pinyin: "Tài guì le! Piányi yìdiǎn.", vietnamese: "Đắt quá! Rẻ hơn chút." },
      { chinese: "可以试试吗？", pinyin: "Kěyǐ shìshì ma?", vietnamese: "Có thể thử được không?" },
    ],
  },
  {
    id: "hospital",
    title: "Khám bệnh 🏥",
    description: "Mô tả triệu chứng, hỏi bác sĩ",
    icon: "🏥",
    phrases: [
      { chinese: "我不舒服。", pinyin: "Wǒ bù shūfu.", vietnamese: "Tôi không khỏe." },
      { chinese: "我头疼。", pinyin: "Wǒ tóu téng.", vietnamese: "Tôi đau đầu." },
      { chinese: "我需要看医生。", pinyin: "Wǒ xūyào kàn yīshēng.", vietnamese: "Tôi cần gặp bác sĩ." },
    ],
  },
];

// ===== STROKE DATA (simplified for demo) =====
export const strokeData: Record<string, { strokes: string[]; medians: number[][][] }> = {
  "大": {
    strokes: ["M 350 150 L 350 650", "M 100 350 L 600 350", "M 350 350 L 150 700", "M 350 350 L 550 700"],
    medians: [[[350,150],[350,650]],[[100,350],[600,350]],[[350,350],[150,700]]]
  },
  "人": {
    strokes: ["M 350 100 L 150 700", "M 350 100 L 550 700"],
    medians: [[[350,100],[150,700]],[[350,100],[550,700]]]
  },
  "中": {
    strokes: ["M 200 200 L 500 200 L 500 600 L 200 600 L 200 200", "M 350 100 L 350 700"],
    medians: [[[200,200],[500,200],[500,600],[200,600],[200,200]],[[350,100],[350,700]]]
  },
};
