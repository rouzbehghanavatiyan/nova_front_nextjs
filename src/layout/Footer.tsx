"use client";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between gap-8">
          <div className="col-span-1">
            <h3 className="text-gray-800 text-lg font13 mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-800 font-light font12 hover:text-blue-600 transition-colors"
                >
                  خانه
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-800 font-light font12 hover:text-blue-600 transition-colors"
                >
                  درباره ما
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-800 font-light font12 hover:text-blue-600 transition-colors"
                >
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-2">
            <p className="text-gray-800 font-light font12 mb-4">
              آدرس: تهران، خیابان حافظ، نرسیده به میدان حسن آباد، کوچه سید صدری،
              کوچه میرمحمدی، پلاک 4
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <div className="flex items-center text-gray-800">
                <span className="font-light font12">
                  info@novatech-tools.com
                </span>
              </div>
            </div>
          </div>

          {/* <div>
            <h3 className="text-gray-800 text-lg font13 mb-4">خدمات مشتریان</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/shipping"
                  className="text-gray-800 font-light font12 hover:text-blue-600 transition-colors"
                >
                  شرایط ارسال
                </a>
              </li>
              <li>
                <a
                  href="/return"
                  className="text-gray-800 font-light font12 hover:text-blue-600 transition-colors"
                >
                  بازگرداندن کالا
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-800 font-light font12 hover:text-blue-600 transition-colors"
                >
                  حریم خصوصی
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-800 font-light font12 hover:text-blue-600 transition-colors"
                >
                  قوانین و مقررات
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        {/* <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-800 font-light font12">
            © {new Date().getFullYear()} 
            <span className="font-light font12">
               ـ تمام حقوق محفوظ است.
            </span>
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
