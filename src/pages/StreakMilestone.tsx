import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StreakMilestone = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background/80 flex items-end md:items-center justify-center">
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="bg-card rounded-t-3xl md:rounded-2xl border border-border shadow-xl p-8 w-full max-w-md text-center">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: 2 }} className="text-6xl">🔥</motion.div>
        <h1 className="text-2xl font-bold text-foreground mt-4">7 ngày liên tiếp!</h1>
        <p className="text-muted-foreground mt-2">Bạn đang học đều hơn 78% người dùng tuần này</p>
        <div className="flex gap-3 mt-6 justify-center">
          <button className="border border-primary text-primary px-6 py-3 rounded-xl font-semibold text-sm">Chia sẻ</button>
          <button onClick={() => navigate("/dashboard")} className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm">Tiếp tục</button>
        </div>
      </motion.div>
    </div>
  );
};

export default StreakMilestone;
