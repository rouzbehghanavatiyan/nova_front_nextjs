import React from "react";

const MainTitle: React.FC = () => {
  return (
    <section className="bg-purple-50 p-6">
      <h2 className="font40 flex justify-center font-bold text-gray-800 mb-4">
        زمینه‌های تخصصی
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold font30 text-lg text-purple-700 mb-2">
            🔧 ابزارآلات دستی
          </h3>
          <p className="text-sm">انواع آچار، پیچ‌گوشتی، انبر و ابزار تخصصی</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg text-purple-700 mb-2">
            ⚡ ابزارآلات برقی
          </h3>
          <p className="text-sm">دریل، فرز، چکش تخریب و ابزار شارژی</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg text-purple-700 mb-2">
            🏭 تجهیزات صنعتی
          </h3>
          <p className="text-sm">
            جک های هیدرولیک، پمپ ها و سیستم های انتقال قدرت
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg text-purple-700 mb-2">
            🔩 ابزارآلات اندازه‌گیری
          </h3>
          <p className="text-sm">کولیس، میکرومتر، تراز و ابزار دقیق</p>
        </div>
      </div>
    </section>
  );
};

export default MainTitle;
