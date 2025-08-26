import React, { useEffect, useState, useRef } from "react";
import { Brain, Play, FileText, ExternalLink } from "lucide-react";

const FETCH_INTERVAL = 180000;

const fetchRandomTip = async () => {
  const res = await fetch("http://localhost:4000/api/health-tips/random");
  const data = await res.json();
  return data.tip;
};

const AutocareSection: React.FC = () => {
  const [tips, setTips] = useState<string[]>(["", "", ""]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<any>(null);

  const getThreeTips = async () => {
    setLoading(true);
    const tipsSet = new Set<string>();
    let count = 0;
    while (tipsSet.size < 3 && count < 10) {
      try {
        const tip = await fetchRandomTip();
        if (tip) tipsSet.add(tip);
      } catch (_) {}
      count++;
    }
    setTips(Array.from(tipsSet));
    setLoading(false);
  };

  useEffect(() => {
    getThreeTips();
    intervalRef.current = setInterval(getThreeTips, FETCH_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Brain className="w-8 h-8 text-pink-500 mr-3" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Autocuidado y prevención
          </h2>
          <p className="text-gray-600">
            Consejos e información importante para cuidar de tu salud.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Infografía Pie Diabético
              </h3>
              <p className="text-blue-700 text-sm mb-4">
                Señales de alerta en el pie diabético
              </p>
            </div>
            <FileText className="w-8 h-8 text-blue-600 ml-4" />
          </div>

          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg mb-3">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Infografía educativa</p>
              </div>
            </div>
          </div>

          <a
            href="https://www.udocz.com/apuntes/147139/infografia-pie-diabetico"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Ver Infografía Completa
          </a>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Video Educativo
              </h3>
              <p className="text-red-700 text-sm mb-4">
                Cómo identificar síntomas tempranos
              </p>
            </div>
            <Play className="w-8 h-8 text-red-600 ml-4" />
          </div>
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <iframe
                className="w-full h-32"
                src="https://www.youtube.com/embed/Q5oM5B3G8MI"
                title="Video Autocuidado"
                allowFullScreen
              />
            </div>
          </div>
          <a
            href="https://www.youtube.com/watch?v=Q5oM5B3G8MI"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Ver en YouTube
          </a>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Consejos Diarios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading
            ? [1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-gray-100 border border-gray-200 rounded-lg p-4 animate-pulse h-24"
                />
              ))
            : tips.map((tip, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-4 border ${
                    idx === 0
                      ? "bg-green-50 border-green-200"
                      : idx === 1
                      ? "bg-blue-50 border-blue-200"
                      : "bg-purple-50 border-purple-200"
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        idx === 0
                          ? "bg-green-500"
                          : idx === 1
                          ? "bg-blue-500"
                          : "bg-purple-500"
                      }`}
                    >
                      <span className="text-white font-bold text-sm">
                        {idx + 1}
                      </span>
                    </div>
                    <h4
                      className={`ml-3 font-medium ${
                        idx === 0
                          ? "text-green-800"
                          : idx === 1
                          ? "text-blue-800"
                          : "text-purple-800"
                      }`}
                    >
                      Consejo {idx + 1}
                    </h4>
                  </div>
                  <p
                    className={`text-sm ${
                      idx === 0
                        ? "text-green-700"
                        : idx === 1
                        ? "text-blue-700"
                        : "text-purple-700"
                    }`}
                  >
                    {tip}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AutocareSection;
