import React from "react";

const CompanyRecords: React.FC = () => {
  return (
    <div className=" flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full  p-8 ">
        <div className="prose prose-lg max-w-none text-justify text-gray-700 leading-8">
          <p className="font40 font-semibold text-black mb-6">
            ابزارآلات صنعتی <span className="text-blue-600">نووا</span> با بیش
            از دو دهه تجربه درخشان
          </p>
          <div className="space-y-6">
            <section className="p-6 border-r-4 border-blue-600">
              <p className="font20">
                شرکت ما در سال <strong>۱۳۸۰</strong> با هدف ارائه ابزارآلات
                صنعتی با کیفیت تأسیس شد و از آن زمان تاکنون به عنوان یکی از
                پیشگامان این صنعت در کشور شناخته می‌شود.
              </p>
            </section>
            {/* <section className="bg-purple-50 p-6 rounded-xl border-r-4 border-purple-600">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">زمینه‌های تخصصی</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">🔧 ابزارآلات دستی</h3>
                  <p className="text-sm">انواع آچار، پیچ‌گوشتی، انبر و ابزار تخصصی</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">⚡ ابزارآلات برقی</h3>
                  <p className="text-sm">دریل، فرز، چکش تخریب و ابزار شارژی</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">🏭 تجهیزات صنعتی</h3>
                  <p className="text-sm">جک های هیدرولیک، پمپ ها و سیستم های انتقال قدرت</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">🔩 ابزارآلات اندازه‌گیری</h3>
                  <p className="text-sm">کولیس، میکرومتر، تراز و ابزار دقیق</p>
                </div>
              </div>
            </section> */}
          </div>
          {/* <div className="mt-8 p-6 bg-gradient-to-l from-gray-900 to-white text-white text-center">
            <h3 className="text-2xl font-bold mb-2">همکاری با ما</h3>
            <p className="text-lg">
              برای دریافت مشاوره رایگان و اطلاع از محصولات با ما در تماس باشید
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <span className="bg-white text-gray-600 px-4 py-2  font-bold">تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</span>
              <span className="bg-white text-gray-600 px-4 py-2  font-bold">ایمیل: info@company.com</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CompanyRecords;
