import React from "react";

const CompanyRecords: React.FC = () => {
  return (
    <div className=" flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full  p-8 ">
        <div className="prose prose-lg max-w-none text-justify text-gray-700 leading-8">
          <p className="font40 font-semibold text-black mb-6">
            ابزارآلات صنعتی <span className="text-blue-main">نووا</span> با بیش
            از دو دهه تجربه درخشان
          </p>
          <div className="space-y-6">
            <section className="p-6 border-r-1 border-blue-main ">
              <p className="font20">
                شرکت ما در سال <strong>۱۳۸۰</strong> با هدف ارائه ابزارآلات
                صنعتی با کیفیت تأسیس شد و از آن زمان تاکنون به عنوان یکی از
                پیشگامان این صنعت در کشور شناخته می‌شود.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRecords;
