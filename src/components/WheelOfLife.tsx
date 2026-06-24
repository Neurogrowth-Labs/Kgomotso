import React, { useState, useMemo } from 'react';
import { WheelScores } from '../types';
import { Sparkles, RefreshCw, FileText, CheckCircle2, Bookmark, Sun, Heart, Users, Briefcase, Coins, Sprout, LucideIcon } from 'lucide-react';

interface CategoryConfig {
  key: keyof WheelScores;
  label: string;
  color: string;
  bg: string;
  border: string;
  desc: string;
  icon: LucideIcon;
}

const CATEGORIES: CategoryConfig[] = [
  { key: 'faith', label: 'Faith & Spirituality', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', desc: 'Your spiritual alignment, connection, and belief in your purpose.', icon: Sun },
  { key: 'health', label: 'Health & Wellness', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', desc: 'Your physical energy, mental wellness, and self-care routines.', icon: Heart },
  { key: 'relationships', label: 'Relationships & Sisterhood', color: 'text-pink-700', bg: 'bg-pink-50', border: 'border-pink-200', desc: 'The depth, trust, and connection in your family and friendships.', icon: Users },
  { key: 'career', label: 'Career & Calling', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', desc: 'Your professional satisfaction, goals, and feeling of impact.', icon: Briefcase },
  { key: 'finances', label: 'Finances & Stewardship', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', desc: 'Your financial stability, management, and peace of mind.', icon: Coins },
  { key: 'personalGrowth', label: 'Personal Growth', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', desc: 'Your learning, self-investment, and emotional intelligence.', icon: Sprout },
];

export default function WheelOfLife() {
  const [scores, setScores] = useState<WheelScores>({
    faith: 5,
    health: 5,
    relationships: 5,
    career: 5,
    finances: 5,
    personalGrowth: 5,
  });

  const [savedReport, setSavedReport] = useState<boolean>(false);

  const updateScore = (key: keyof WheelScores, value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
    setSavedReport(false);
  };

  const resetScores = () => {
    setScores({
      faith: 5,
      health: 5,
      relationships: 5,
      career: 5,
      finances: 5,
      personalGrowth: 5,
    });
    setSavedReport(false);
  };

  // Radar SVG Math
  const radarData = useMemo(() => {
    const center = 160;
    const maxRadius = 110;
    const numPoints = 6;
    
    // Background rings (grids)
    const rings = [2, 4, 6, 8, 10].map((level) => {
      const radius = (level / 10) * maxRadius;
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        const angle = (i * Math.PI * 2) / numPoints - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      return points.join(' ');
    });

    // Active score shape
    const activePoints: string[] = [];
    const activePointsArray: {x: number; y: number; label: string; key: string}[] = [];
    const keys: (keyof WheelScores)[] = ['faith', 'health', 'relationships', 'career', 'finances', 'personalGrowth'];
    
    keys.forEach((key, i) => {
      const score = scores[key];
      const radius = (score / 10) * maxRadius;
      const angle = (i * Math.PI * 2) / numPoints - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      activePoints.push(`${x},${y}`);
      
      // Also get labels positions (slightly further out)
      const labelRadius = maxRadius + 22;
      const lx = center + labelRadius * Math.cos(angle);
      const ly = center + labelRadius * Math.sin(angle);
      const categoryLabel = CATEGORIES.find(c => c.key === key)?.label || '';
      activePointsArray.push({ x: lx, y: ly, label: categoryLabel, key });
    });

    return { center, rings, activePath: activePoints.join(' '), labels: activePointsArray };
  }, [scores]);

  // Insight calculation based on scores
  const insights = useMemo(() => {
    const keys: (keyof WheelScores)[] = ['faith', 'health', 'relationships', 'career', 'finances', 'personalGrowth'];
    const entriesArray = keys.map(key => ({
      key,
      score: scores[key] as number
    }));
    const sorted = entriesArray.sort((a, b) => a.score - b.score);
    const lowest = sorted[0];
    const highest = sorted[sorted.length - 1];

    const categoryInfo = (key: string) => CATEGORIES.find(c => c.key === key);

    const lowCat = categoryInfo(lowest.key);
    const highCat = categoryInfo(highest.key);

    let actionAdvice = "";
    if (lowest.key === 'faith') {
      actionAdvice = "Consider starting your morning with 5 minutes of quiet gratitude, prayer, or positive affirmations before checking your phone. Carve out an intentional, small space for spiritual restoration.";
    } else if (lowest.key === 'health') {
      actionAdvice = "Nourish your body and mind this week. Start simple: hydrate deliberately, take a gentle 15-minute nature walk, or prioritize getting a restful 8 hours of sleep tonight.";
    } else if (lowest.key === 'relationships') {
      actionAdvice = "Reach out to a close friend or family member for a simple, heart-to-heart phone call. True growth flourishes in the warmth of community and sisterhood.";
    } else if (lowest.key === 'career') {
      actionAdvice = "Set aside 30 minutes to reflect on what brings you joy professionally. Focus on aligning one daily task with your unique strengths and calling, and remember that your value is not defined by production.";
    } else if (lowest.key === 'finances') {
      actionAdvice = "Gentle budget auditing can bring peace of mind. Take one small action toward tracking your expenses or opening a dedicated savings buffer, even if you start with just a small amount.";
    } else {
      actionAdvice = "Invest in yourself today. Pick up a book you love, listen to an empowering podcast, or try a reflective journaling exercise. Your personal growth is a lifelong, beautiful adventure.";
    }

    return {
      lowestName: lowCat?.label || '',
      lowestScore: lowest.score,
      highestName: highCat?.label || '',
      highestScore: highest.score,
      actionAdvice
    };
  }, [scores]);

  const handleSaveReport = () => {
    setSavedReport(true);
    // Persist scores in local storage for continuation
    localStorage.setItem('girls_talk_wheel_scores', JSON.stringify(scores));
  };

  return (
    <div id="wheel-of-life-tool" className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
      {/* Tool Header */}
      <div className="bg-brand-deep p-6 text-white text-center relative">
        <div className="absolute top-4 right-4 bg-yellow-400 text-brand-deep text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Interactive Workshop
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-medium text-amber-100 mb-2">The Wheel of Life Assessment</h3>
        <p className="text-purple-100 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Reflect and measure your current season across six key pillars. Let this tool guide you toward balance, intention, and alignment.
        </p>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <h4 className="font-serif text-lg font-medium text-brand-deep">Your Personal Reflection</h4>
            <button 
              onClick={resetScores}
              className="text-xs text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset values
            </button>
          </div>

          <div className="space-y-5">
            {CATEGORIES.map((cat) => {
              const currentVal = scores[cat.key as keyof WheelScores];
              return (
                <div key={cat.key} className={`p-4 rounded-xl border ${cat.border} ${cat.bg} transition-all duration-300`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-white/80 border ${cat.border} flex items-center justify-center shadow-3xs`}>
                        <cat.icon className={`w-4.5 h-4.5 ${cat.color}`} />
                      </div>
                      <div>
                        <span className={`font-semibold text-sm md:text-base ${cat.color}`}>{cat.label}</span>
                        <p className="text-xs text-gray-500 font-light mt-0.5">{cat.desc}</p>
                      </div>
                    </div>
                    <span className="text-base font-bold text-brand-deep bg-white px-2.5 py-1 rounded-md shadow-sm border border-purple-100/50">
                      {currentVal}/10
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentVal}
                    onChange={(e) => updateScore(cat.key as keyof WheelScores, parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-deep mt-2"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                    <span>Low Satisfaction (1)</span>
                    <span>High Satisfaction (10)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart and Results Panel */}
        <div className="lg:col-span-5 flex flex-col items-center justify-between space-y-6 bg-brand-bg/30 p-4 md:p-6 rounded-2xl border border-purple-50">
          <div className="w-full flex flex-col items-center">
            <h4 className="font-serif text-center text-lg font-medium text-brand-deep mb-4">Your Dynamic Life Wheel</h4>
            
            {/* SVG Radar Chart */}
            <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center bg-white/70 backdrop-blur-xs rounded-full p-2 border border-purple-100/50 shadow-xs">
              <svg viewBox="0 0 320 320" className="w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F5D0FE" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#C084FC" stopOpacity="0.8" />
                  </radialGradient>
                </defs>

                {/* Grid Rings */}
                {radarData.rings.map((points, index) => (
                  <polygon
                    key={index}
                    points={points}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    strokeDasharray={index === 4 ? "0" : "2,2"}
                  />
                ))}

                {/* Grid Lines */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const angle = (i * Math.PI * 2) / 6 - Math.PI / 2;
                  const x = radarData.center + 110 * Math.cos(angle);
                  const y = radarData.center + 110 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={radarData.center}
                      y1={radarData.center}
                      x2={x}
                      y2={y}
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Filled Score Polygon */}
                <polygon
                  points={radarData.activePath}
                  fill="url(#radarGrad)"
                  stroke="#3B0764"
                  strokeWidth="2.5"
                  className="transition-all duration-500 ease-out"
                />

                {/* Vertices marker dots */}
                {radarData.activePath.split(' ').map((point, i) => {
                  const [x, y] = point.split(',');
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#C5A880"
                      stroke="#3B0764"
                      strokeWidth="1.5"
                      className="transition-all duration-500 ease-out"
                    />
                  );
                })}

                {/* Labels */}
                {radarData.labels.map((item, i) => {
                  const angle = (i * Math.PI * 2) / 6 - Math.PI / 2;
                  let textAnchor = 'middle';
                  let dy = '0.35em';
                  
                  // Adjust anchor to prevent label clipping
                  if (Math.cos(angle) > 0.1) textAnchor = 'start';
                  else if (Math.cos(angle) < -0.1) textAnchor = 'end';
                  
                  if (Math.sin(angle) > 0.8) dy = '0.8em';
                  else if (Math.sin(angle) < -0.8) dy = '-0.2em';

                  return (
                    <text
                      key={i}
                      x={item.x}
                      y={item.y}
                      textAnchor={textAnchor}
                      dy={dy}
                      className="text-[10px] font-semibold fill-brand-plum uppercase tracking-wider font-sans"
                    >
                      {item.label.split(' ')[0]}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Coaching Strategy Output */}
          <div className="w-full bg-white p-5 rounded-xl border border-purple-50 shadow-2xs mt-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
              <h5 className="font-serif text-sm font-semibold text-brand-deep">Kgomotso\'s Reflective Alignment Insight</h5>
            </div>

            <div className="text-xs text-brand-text leading-relaxed space-y-2.5">
              <p>
                Dear Sister, taking this moment is itself a powerful act of intention. Looking at your wheel, your{' '}
                <span className="font-semibold text-purple-800">{insights.highestName}</span> is currently standing strong at{' '}
                <span className="font-bold">{insights.highestScore}/10</span>. Let that strength, wisdom, and joy fuel you!
              </p>
              <p>
                In this season, your{' '}
                <span className="font-semibold text-rose-700">{insights.lowestName}</span> stands at{' '}
                <span className="font-bold">{insights.lowestScore}/10</span>. Do not view this with judgment—only curiosity and kindness.
              </p>
              <p className="bg-brand-bg/50 p-3 rounded-lg italic border-l-2 border-brand-gold text-brand-text/90 font-light mt-2">
                &ldquo;{insights.actionAdvice}&rdquo;
              </p>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={handleSaveReport}
                className="flex-1 bg-brand-deep text-white text-xs font-medium py-2 px-3 rounded-lg hover:bg-brand-plum transition-colors flex items-center justify-center gap-1.5"
              >
                {savedReport ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-300" />
                    Saved Successfully!
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    Save Assessment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
