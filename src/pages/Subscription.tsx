import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Free", price: "$0", period: "", features: [
      { text: "HSK 1-3", included: true }, { text: "SRS không giới hạn", included: true },
      { text: "Audio phát âm", included: false }, { text: "Viết chữ", included: false },
    ],
    cta: "Plan hiện tại", disabled: true,
  },
  {
    name: "Plus", price: "$7.99", yearPrice: "$4.99", period: "/tháng", popular: true, features: [
      { text: "HSK 1-6", included: true }, { text: "Audio phát âm", included: true },
      { text: "Stats nâng cao", included: true }, { text: "Viết chữ", included: false },
    ],
    cta: "Dùng thử 7 ngày", disabled: false,
  },
  {
    name: "Pro", price: "$12.99", yearPrice: "$7.99", period: "/tháng", features: [
      { text: "HSK 1-9", included: true }, { text: "Viết chữ", included: true },
      { text: "Custom decks", included: true }, { text: "Chế độ offline", included: true },
    ],
    cta: "Dùng thử 7 ngày", disabled: false,
  },
];

const Subscription = () => {
  const navigate = useNavigate();
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-3xl py-6 space-y-6">
        <div className="text-center">
          <span className="inline-block bg-muted text-muted-foreground px-4 py-1.5 rounded-full text-sm font-medium">Plan hiện tại: Free</span>
        </div>

        <div className="flex justify-center">
          <div className="flex bg-muted rounded-xl p-1 text-sm">
            <button onClick={() => setYearly(false)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${!yearly ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>Tháng</button>
            <button onClick={() => setYearly(true)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${yearly ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>Năm <span className="text-success text-xs">-37%</span></button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div key={p.name} className={`bg-card rounded-2xl border-2 p-5 relative ${p.popular ? "border-primary shadow-lg" : "border-border"}`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Phổ biến nhất</span>}
              <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
              <div className="mt-1">
                <span className="text-3xl font-extrabold text-foreground">{yearly && p.yearPrice ? p.yearPrice : p.price}</span>
                <span className="text-muted-foreground text-sm">{p.period}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {p.features.map((f) => (
                  <li key={f.text} className={`flex items-center gap-2 text-sm ${f.included ? "text-foreground" : "text-muted-foreground line-through"}`}>
                    <Check size={14} className={f.included ? "text-success" : "text-muted"} /> {f.text}
                  </li>
                ))}
              </ul>
              <button disabled={p.disabled} className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm min-h-[44px] ${p.disabled ? "bg-muted text-muted-foreground" : p.popular ? "bg-primary text-primary-foreground" : "border border-primary text-primary"}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
