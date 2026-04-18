export type TopicWord = {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  emoji: string;
  hskLevel: number;
};

export type Topic = {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  color: string; // tailwind class for tinted bg
  words: TopicWord[];
};

export const topics: Topic[] = [
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    name: "Gia đình",
    desc: "Thành viên trong gia đình",
    color: "bg-pink-100 dark:bg-pink-950/30",
    words: [
      { id: "fam-1", hanzi: "爸爸", pinyin: "bà ba", meaning: "Bố", emoji: "👨", hskLevel: 1 },
      { id: "fam-2", hanzi: "妈妈", pinyin: "mā ma", meaning: "Mẹ", emoji: "👩", hskLevel: 1 },
      { id: "fam-3", hanzi: "哥哥", pinyin: "gē ge", meaning: "Anh trai", emoji: "👦", hskLevel: 2 },
      { id: "fam-4", hanzi: "姐姐", pinyin: "jiě jie", meaning: "Chị gái", emoji: "👧", hskLevel: 2 },
      { id: "fam-5", hanzi: "弟弟", pinyin: "dì di", meaning: "Em trai", emoji: "🧒", hskLevel: 2 },
      { id: "fam-6", hanzi: "妹妹", pinyin: "mèi mei", meaning: "Em gái", emoji: "👶", hskLevel: 2 },
      { id: "fam-7", hanzi: "爷爷", pinyin: "yé ye", meaning: "Ông nội", emoji: "👴", hskLevel: 3 },
      { id: "fam-8", hanzi: "奶奶", pinyin: "nǎi nai", meaning: "Bà nội", emoji: "👵", hskLevel: 3 },
      { id: "fam-9", hanzi: "儿子", pinyin: "ér zi", meaning: "Con trai", emoji: "🧑", hskLevel: 1 },
      { id: "fam-10", hanzi: "女儿", pinyin: "nǚ ér", meaning: "Con gái", emoji: "👩‍🦰", hskLevel: 1 },
    ],
  },
  {
    id: "food",
    emoji: "🍜",
    name: "Đồ ăn",
    desc: "Món ăn & đồ uống",
    color: "bg-orange-100 dark:bg-orange-950/30",
    words: [
      { id: "fd-1", hanzi: "米饭", pinyin: "mǐ fàn", meaning: "Cơm", emoji: "🍚", hskLevel: 1 },
      { id: "fd-2", hanzi: "面条", pinyin: "miàn tiáo", meaning: "Mì", emoji: "🍜", hskLevel: 2 },
      { id: "fd-3", hanzi: "面包", pinyin: "miàn bāo", meaning: "Bánh mì", emoji: "🍞", hskLevel: 3 },
      { id: "fd-4", hanzi: "鸡蛋", pinyin: "jī dàn", meaning: "Trứng gà", emoji: "🥚", hskLevel: 2 },
      { id: "fd-5", hanzi: "牛奶", pinyin: "niú nǎi", meaning: "Sữa", emoji: "🥛", hskLevel: 2 },
      { id: "fd-6", hanzi: "茶", pinyin: "chá", meaning: "Trà", emoji: "🍵", hskLevel: 1 },
      { id: "fd-7", hanzi: "咖啡", pinyin: "kā fēi", meaning: "Cà phê", emoji: "☕", hskLevel: 2 },
      { id: "fd-8", hanzi: "苹果", pinyin: "píng guǒ", meaning: "Táo", emoji: "🍎", hskLevel: 1 },
      { id: "fd-9", hanzi: "西瓜", pinyin: "xī guā", meaning: "Dưa hấu", emoji: "🍉", hskLevel: 2 },
      { id: "fd-10", hanzi: "鱼", pinyin: "yú", meaning: "Cá", emoji: "🐟", hskLevel: 2 },
    ],
  },
  {
    id: "travel",
    emoji: "✈️",
    name: "Du lịch",
    desc: "Phương tiện & địa điểm",
    color: "bg-blue-100 dark:bg-blue-950/30",
    words: [
      { id: "tr-1", hanzi: "飞机", pinyin: "fēi jī", meaning: "Máy bay", emoji: "✈️", hskLevel: 1 },
      { id: "tr-2", hanzi: "火车", pinyin: "huǒ chē", meaning: "Tàu hỏa", emoji: "🚆", hskLevel: 2 },
      { id: "tr-3", hanzi: "汽车", pinyin: "qì chē", meaning: "Ô tô", emoji: "🚗", hskLevel: 2 },
      { id: "tr-4", hanzi: "出租车", pinyin: "chū zū chē", meaning: "Taxi", emoji: "🚕", hskLevel: 1 },
      { id: "tr-5", hanzi: "机场", pinyin: "jī chǎng", meaning: "Sân bay", emoji: "🛫", hskLevel: 2 },
      { id: "tr-6", hanzi: "酒店", pinyin: "jiǔ diàn", meaning: "Khách sạn", emoji: "🏨", hskLevel: 2 },
      { id: "tr-7", hanzi: "护照", pinyin: "hù zhào", meaning: "Hộ chiếu", emoji: "🛂", hskLevel: 4 },
      { id: "tr-8", hanzi: "地图", pinyin: "dì tú", meaning: "Bản đồ", emoji: "🗺️", hskLevel: 3 },
      { id: "tr-9", hanzi: "旅游", pinyin: "lǚ yóu", meaning: "Du lịch", emoji: "🧳", hskLevel: 3 },
      { id: "tr-10", hanzi: "海", pinyin: "hǎi", meaning: "Biển", emoji: "🌊", hskLevel: 3 },
    ],
  },
  {
    id: "work",
    emoji: "💼",
    name: "Công việc",
    desc: "Nghề nghiệp & văn phòng",
    color: "bg-purple-100 dark:bg-purple-950/30",
    words: [
      { id: "wk-1", hanzi: "工作", pinyin: "gōng zuò", meaning: "Làm việc", emoji: "💼", hskLevel: 2 },
      { id: "wk-2", hanzi: "公司", pinyin: "gōng sī", meaning: "Công ty", emoji: "🏢", hskLevel: 2 },
      { id: "wk-3", hanzi: "老板", pinyin: "lǎo bǎn", meaning: "Sếp", emoji: "👔", hskLevel: 4 },
      { id: "wk-4", hanzi: "同事", pinyin: "tóng shì", meaning: "Đồng nghiệp", emoji: "🧑‍💼", hskLevel: 3 },
      { id: "wk-5", hanzi: "电脑", pinyin: "diàn nǎo", meaning: "Máy tính", emoji: "💻", hskLevel: 1 },
      { id: "wk-6", hanzi: "电话", pinyin: "diàn huà", meaning: "Điện thoại", emoji: "📞", hskLevel: 1 },
      { id: "wk-7", hanzi: "会议", pinyin: "huì yì", meaning: "Cuộc họp", emoji: "📋", hskLevel: 4 },
      { id: "wk-8", hanzi: "工资", pinyin: "gōng zī", meaning: "Lương", emoji: "💰", hskLevel: 4 },
      { id: "wk-9", hanzi: "经理", pinyin: "jīng lǐ", meaning: "Quản lý", emoji: "🧑‍💻", hskLevel: 3 },
      { id: "wk-10", hanzi: "工程师", pinyin: "gōng chéng shī", meaning: "Kỹ sư", emoji: "👷", hskLevel: 4 },
    ],
  },
  {
    id: "shopping",
    emoji: "🛍️",
    name: "Mua sắm",
    desc: "Cửa hàng & giá cả",
    color: "bg-rose-100 dark:bg-rose-950/30",
    words: [
      { id: "sh-1", hanzi: "买", pinyin: "mǎi", meaning: "Mua", emoji: "💳", hskLevel: 1 },
      { id: "sh-2", hanzi: "卖", pinyin: "mài", meaning: "Bán", emoji: "🏷️", hskLevel: 2 },
      { id: "sh-3", hanzi: "钱", pinyin: "qián", meaning: "Tiền", emoji: "💵", hskLevel: 1 },
      { id: "sh-4", hanzi: "便宜", pinyin: "pián yi", meaning: "Rẻ", emoji: "🪙", hskLevel: 2 },
      { id: "sh-5", hanzi: "贵", pinyin: "guì", meaning: "Đắt", emoji: "💎", hskLevel: 2 },
      { id: "sh-6", hanzi: "商店", pinyin: "shāng diàn", meaning: "Cửa hàng", emoji: "🏪", hskLevel: 1 },
      { id: "sh-7", hanzi: "衣服", pinyin: "yī fu", meaning: "Quần áo", emoji: "👕", hskLevel: 1 },
      { id: "sh-8", hanzi: "鞋", pinyin: "xié", meaning: "Giày", emoji: "👟", hskLevel: 3 },
      { id: "sh-9", hanzi: "超市", pinyin: "chāo shì", meaning: "Siêu thị", emoji: "🛒", hskLevel: 3 },
      { id: "sh-10", hanzi: "颜色", pinyin: "yán sè", meaning: "Màu sắc", emoji: "🎨", hskLevel: 2 },
    ],
  },
  {
    id: "weather",
    emoji: "☀️",
    name: "Thời tiết",
    desc: "Nắng, mưa, mùa",
    color: "bg-yellow-100 dark:bg-yellow-950/30",
    words: [
      { id: "wt-1", hanzi: "天气", pinyin: "tiān qì", meaning: "Thời tiết", emoji: "🌤️", hskLevel: 1 },
      { id: "wt-2", hanzi: "晴天", pinyin: "qíng tiān", meaning: "Trời nắng", emoji: "☀️", hskLevel: 2 },
      { id: "wt-3", hanzi: "雨", pinyin: "yǔ", meaning: "Mưa", emoji: "🌧️", hskLevel: 1 },
      { id: "wt-4", hanzi: "雪", pinyin: "xuě", meaning: "Tuyết", emoji: "❄️", hskLevel: 2 },
      { id: "wt-5", hanzi: "风", pinyin: "fēng", meaning: "Gió", emoji: "💨", hskLevel: 3 },
      { id: "wt-6", hanzi: "热", pinyin: "rè", meaning: "Nóng", emoji: "🥵", hskLevel: 1 },
      { id: "wt-7", hanzi: "冷", pinyin: "lěng", meaning: "Lạnh", emoji: "🥶", hskLevel: 1 },
      { id: "wt-8", hanzi: "春天", pinyin: "chūn tiān", meaning: "Mùa xuân", emoji: "🌸", hskLevel: 3 },
      { id: "wt-9", hanzi: "夏天", pinyin: "xià tiān", meaning: "Mùa hè", emoji: "🌞", hskLevel: 3 },
      { id: "wt-10", hanzi: "冬天", pinyin: "dōng tiān", meaning: "Mùa đông", emoji: "⛄", hskLevel: 3 },
    ],
  },
  {
    id: "body",
    emoji: "👁️",
    name: "Cơ thể",
    desc: "Bộ phận cơ thể",
    color: "bg-green-100 dark:bg-green-950/30",
    words: [
      { id: "bd-1", hanzi: "头", pinyin: "tóu", meaning: "Đầu", emoji: "🗣️", hskLevel: 3 },
      { id: "bd-2", hanzi: "眼睛", pinyin: "yǎn jing", meaning: "Mắt", emoji: "👁️", hskLevel: 2 },
      { id: "bd-3", hanzi: "鼻子", pinyin: "bí zi", meaning: "Mũi", emoji: "👃", hskLevel: 3 },
      { id: "bd-4", hanzi: "嘴", pinyin: "zuǐ", meaning: "Miệng", emoji: "👄", hskLevel: 3 },
      { id: "bd-5", hanzi: "耳朵", pinyin: "ěr duo", meaning: "Tai", emoji: "👂", hskLevel: 3 },
      { id: "bd-6", hanzi: "手", pinyin: "shǒu", meaning: "Tay", emoji: "✋", hskLevel: 2 },
      { id: "bd-7", hanzi: "脚", pinyin: "jiǎo", meaning: "Chân", emoji: "🦶", hskLevel: 3 },
      { id: "bd-8", hanzi: "心", pinyin: "xīn", meaning: "Tim, lòng", emoji: "❤️", hskLevel: 3 },
      { id: "bd-9", hanzi: "牙齿", pinyin: "yá chǐ", meaning: "Răng", emoji: "🦷", hskLevel: 4 },
      { id: "bd-10", hanzi: "头发", pinyin: "tóu fa", meaning: "Tóc", emoji: "💇", hskLevel: 3 },
    ],
  },
  {
    id: "numbers",
    emoji: "🔢",
    name: "Số đếm",
    desc: "Số & thời gian",
    color: "bg-cyan-100 dark:bg-cyan-950/30",
    words: [
      { id: "nm-1", hanzi: "一", pinyin: "yī", meaning: "Một", emoji: "1️⃣", hskLevel: 1 },
      { id: "nm-2", hanzi: "二", pinyin: "èr", meaning: "Hai", emoji: "2️⃣", hskLevel: 1 },
      { id: "nm-3", hanzi: "三", pinyin: "sān", meaning: "Ba", emoji: "3️⃣", hskLevel: 1 },
      { id: "nm-4", hanzi: "十", pinyin: "shí", meaning: "Mười", emoji: "🔟", hskLevel: 1 },
      { id: "nm-5", hanzi: "百", pinyin: "bǎi", meaning: "Trăm", emoji: "💯", hskLevel: 2 },
      { id: "nm-6", hanzi: "千", pinyin: "qiān", meaning: "Nghìn", emoji: "🔢", hskLevel: 2 },
      { id: "nm-7", hanzi: "万", pinyin: "wàn", meaning: "Vạn", emoji: "🎰", hskLevel: 3 },
      { id: "nm-8", hanzi: "今天", pinyin: "jīn tiān", meaning: "Hôm nay", emoji: "📅", hskLevel: 1 },
      { id: "nm-9", hanzi: "明天", pinyin: "míng tiān", meaning: "Ngày mai", emoji: "🌅", hskLevel: 1 },
      { id: "nm-10", hanzi: "昨天", pinyin: "zuó tiān", meaning: "Hôm qua", emoji: "🌆", hskLevel: 1 },
    ],
  },
];

export const getTopicById = (id: string) => topics.find((t) => t.id === id);

// All topic words flattened — used for daily words
export const allTopicWords: TopicWord[] = topics.flatMap((t) => t.words);
