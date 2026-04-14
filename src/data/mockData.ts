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
