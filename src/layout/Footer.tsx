"use client";
import {
  PhoneIcon,
  EnvelopeIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <ShoppingCartIcon className="w-8 h-8 ml-2" />
              <span className="text-2xl font-bold">فروشگاه نووا</span>
            </div>
            <p className="text-gray-300 mb-4">
              فروشگاه اینترنتی ما با سال‌ها تجربه در زمینه ارائه بهترین محصولات
              با کیفیت عالی در خدمت شماست.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <div className="flex items-center text-gray-300">
                <PhoneIcon className="w-5 h-5 ml-1" />
                <span>021-12345678</span>
              </div>
              <div className="flex items-center text-gray-300">
                <EnvelopeIcon className="w-5 h-5 ml-1" />
                <span>info@store.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  خانه
                </a>
              </li>
              <li>
                <a
                  href="/store"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  فروشگاه
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  درباره ما
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">خدمات مشتریان</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/shipping"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  شرایط ارسال
                </a>
              </li>
              <li>
                <a
                  href="/return"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  بازگرداندن کالا
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  حریم خصوصی
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  قوانین و مقررات
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} فروشگاه من. تمام حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
