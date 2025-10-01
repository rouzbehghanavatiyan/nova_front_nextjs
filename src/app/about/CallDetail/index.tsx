import React from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const CallDetail = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold mb-6">اطلاعات تماس</h2>
        <div className="space-y-6">
          <div className="flex items-start">
            <MapPinIcon className="w-6 h-6 text-blue-600 mt-1 ml-3" />
            <div>
              <h3 className="font-semibold">آدرس</h3>
              <p className="text-gray-600">تهران، خیابان نمونه، پلاک ۱۲۳</p>
            </div>
          </div>
          <div className="flex items-start">
            <PhoneIcon className="w-6 h-6 text-blue-600 mt-1 ml-3" />
            <div>
              <h3 className="font-semibold">تلفن</h3>
              <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
              <p className="text-gray-600">۰۹۱۲-۱۲۳-۴۵۶۷</p>
            </div>
          </div>
          <div className="flex items-start">
            <EnvelopeIcon className="w-6 h-6 text-blue-600 mt-1 ml-3" />
            <div>
              <h3 className="font-semibold">ایمیل</h3>
              <p className="text-gray-600">info@store.com</p>
              <p className="text-gray-600">support@store.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold mb-3">ساعات کاری</h3>
          <div className="text-gray-600 space-y-1">
            <p>شنبه تا چهارشنبه: ۸:۰۰ - ۱۷:۰۰</p>
            <p>پنجشنبه: ۸:۰۰ - ۱۴:۰۰</p>
            <p>جمعه: تعطیل</p>
          </div>
        </div>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.367315719256!2d51.40724931449139!3d35.68807898018438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzE3LjEiTiA1McKwMjQnMzQuMCJF!5e0!3m2!1sen!2sir!4v1640000000000!5m2!1sen!2sir`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CallDetail;
