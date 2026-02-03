"use client";
import { useState } from "react";
import Link from "next/link";
import CallForm from "./CallForm";
import CallDetail from "./CallDetail";
import Achievements from "../home/Achievements";
import { useAppSelector } from "@/src/store/hook";
import StringHelpers from "@/src/config/StringHelpers";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const main = useAppSelector((state) => state.product);
  // const cover: any = main?.moreImages?.[0];
  // const fixCover = StringHelpers.getProfile(
  //   cover,
  //   main?.moreImages?.[0]?.fileName,
  // );

  const [zoomStyle, setZoomStyle] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("پیام شما با موفقیت ارسال شد!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle({
      transform: "scale(1.5)",
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  return (
    <div className="bg-gray-50 pb-8">
      <div className="flex justify-center mb-10 overflow-hidden">
        <div className="relative h-[90vh] w-[100vw] overflow-hidden">
          <img
            className="h-full w-full object-cover transition-transform duration-200 ease-out"
            // src={fixCover}
            alt="Contact cover"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
        <div className="absolute top-1/10 mt-3 backdrop-blur-sm rounded-xl p-6">
          <p className="text-white  leading-9 text-justify">
            آنچه ابزار نووا را متمایز می‌کند، تمرکز هم‌زمان بر کیفیت و
            دسترسی‌پذیری است. کنترل کیفیت مستمر، انتخاب مواد اولیه مناسب، تنوع
            گسترده محصولات، ارائه ارزش واقعی در برابر قیمت و خدمات پس از فروش
            گسترده و پاسخگو، از مهم‌ترین مزیت‌های رقابتی نووا به شمار می‌رود.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-12">
            {/* <span className="col-span-1">
              <CallDetail />
              </span>
              <span className="col-span-1">
              <CallForm
              handleSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              />
              </span> */}
          </div>
        </div>
      </div>
      <Achievements />
    </div>
  );
};

export default ContactPage;

//  <div className="absolute w-4/5 mt-3 bg-blue-600/40 backdrop-blur-3xl rounded-xl p-6">
//           <p className="text-white font-light leading-9 text-justify">
//             داستان نووا از سال ۱۳۸۷ و از یک ایده آغاز شد؛ ایده‌ای برای ساخت
//             ابزاری که نه تنها کار کند، بلکه قدرت بیافریند. ما با رویای روشن‌کردن
//             مسیر کسانی متولد شدیم، که می‌سازند، می‌آفرینند و آینده را شکل
//             می‌دهند؛ با باوری عمیق به اینکه هر دست، می‌تواند خالق باشد، اگر
//             ابزار درست را در اختیار داشته باشد. «نووا» نام پدیده‌ای است که در آن
//             ستاره‌ای، ناگهان نوری تازه می‌تاباند. این نام، فلسفه‌ ما را بازگو
//             می‌کند: هر تحول بزرگ، با یک جرقه آغاز می‌شود. هر ابزار، می‌تواند
//             سرآغاز یک تحول باشد. برای ما، ابزار تنها یک وسیله نیست؛ بلکه نقطه‌
//             شروعی برای ساختن آینده‌ای درخشان‌تر است. در نووا، دقت یک اصل است،
//             اعتماد یک تعهد، و نوآوری راه پیش‌رو. ما ابزارهایی می‌سازیم که قدرت
//             خلق‌کردن را در اختیار همه قرار می‌دهد؛ از صنعت‌گران بزرگترین
//             کارگاه‌ها تا نوآفرینانی که آغازگر رویاهای تازه‌اند. زیرا باور داریم
//             هر کس، با ابزار درست می‌تواند خالق شگفتی‌ها باشد. نووا، فقط نامی حک
//             شده بر روی ابزار نیست، بلکه یک تعهد است. تعهدی برای ماندگاری،
//             کارایی، و الهام‌بخشی به خالقان فردا. ما آمده‌ایم تا ساختن را
//             آسان‌تر، نتیجه را قابل‌اعتمادتر، و رویاها را دست‌یافتنی‌تر کنیم. مثل
//             نوری که در تاریکی راه می‌گشاید، نووا اینجاست تا دنیاهای فردا را
//             روشن‌تر کند.
//           </p>
//         </div>
