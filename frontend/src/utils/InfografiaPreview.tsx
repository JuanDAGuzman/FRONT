import React from "react";

const INFOGRAFIA_IMG =
  "https://img.udocz.com/files/image/0/a8/7b/7cba4cd8e0554350a721e753728fb3a8.jpg";
const INFOGRAFIA_LINK =
  "https://www.udocz.com/apuntes/147139/infografia-pie-diabetico";

const InfografiaPreview: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col h-full">
      <div className="flex items-center mb-2">
        <span className="text-blue-700 text-2xl mr-2">
          <svg width={26} height={26} fill="none" viewBox="0 0 24 24">
            <rect x={2} y={2} width={20} height={20} rx={4} fill="#3b82f6" opacity={0.15}/>
            <path d="M8 9h8M8 13h5M6 21h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" stroke="#3b82f6" strokeWidth={2}/>
          </svg>
        </span>
        <div>
          <div className="text-blue-800 font-bold text-lg">
            Infografía Pie Diabético
          </div>
          <div className="text-blue-600 text-xs">
            Señales de alerta en el pie diabético
          </div>
        </div>
      </div>
      <div
        className="flex-grow bg-white rounded-lg shadow-inner border border-blue-100 my-3 flex items-center justify-center overflow-hidden"
        style={{ minHeight: 120, cursor: "pointer" }}
        title="Vista previa infografía"
        onClick={() => window.open(INFOGRAFIA_LINK, "_blank")}
      >
        <img
          src={INFOGRAFIA_IMG}
          alt="Vista previa infografía pie diabético"
          className="w-full h-40 object-cover rounded-lg transition hover:scale-105"
          style={{ objectFit: "cover" }}
        />
      </div>
      <a
        href={INFOGRAFIA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold flex items-center justify-center gap-2 transition text-base"
      >
        <svg width={20} height={20} fill="none" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Ver Infografía Completa
      </a>
    </div>
  );
};

export default InfografiaPreview;
