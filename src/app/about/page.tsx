"use client";
import { useState } from "react";
import Link from "next/link";
import CallForm from "./CallForm";
import CallDetail from "./CallDetail";
import cover from "@/src/assets/img/mainContentCover.jpg";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [zoomStyle, setZoomStyle] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("پیام شما با موفقیت ارسال شد!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle({
      transform: "scale(4)",
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
            style={zoomStyle}
            src={cover.src}
            alt="Contact cover"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-12">
            <span className="col-span-1">
              <CallDetail />
            </span>
            <span className="col-span-1">
              <CallForm
                handleSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

// "use client";
// import { useState, useRef } from "react";
// import Link from "next/link";
// import CallForm from "./CallForm";
// import CallDetail from "./CallDetail";
// import cover from "@/src/assets/img/mainContentCover.jpg";

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const [showZoom, setShowZoom] = useState(false);
//   const imageRef = useRef<HTMLImageElement>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     alert("پیام شما با موفقیت ارسال شد!");
//     setFormData({ name: "", email: "", subject: "", message: "" });
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
//     if (!imageRef.current) return;

//     const img = imageRef.current;
//     const rect = img.getBoundingClientRect();

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     // محدود کردن موقعیت به داخل تصویر
//     const boundedX = Math.max(150, Math.min(x, rect.width - 150));
//     const boundedY = Math.max(150, Math.min(y, rect.height - 150));

//     setZoomPosition({
//       x: boundedX,
//       y: boundedY,
//     });

//     setShowZoom(true);
//   };

//   const handleMouseLeave = () => {
//     setShowZoom(false);
//   };

//   // محاسبه استایل زوم
//   const getZoomStyle = () => {
//     if (!imageRef.current || !showZoom) return {};

//     const img = imageRef.current;
//     const rect = img.getBoundingClientRect();

//     const zoomLevel = 2; // زوم 2x
//     const zoomBoxSize = 300;

//     // محاسبه موقعیت نسبی در تصویر
//     const relativeX = zoomPosition.x / rect.width;
//     const relativeY = zoomPosition.y / rect.height;

//     // محاسبه موقعیت background
//     const backgroundX = -((relativeX * img.naturalWidth * zoomLevel) - (zoomBoxSize / 2));
//     const backgroundY = -((relativeY * img.naturalHeight * zoomLevel) - (zoomBoxSize / 2));

//     return {
//       backgroundImage: `url(${cover.src})`,
//       backgroundPosition: `${backgroundX}px ${backgroundY}px`,
//       backgroundSize: `${img.naturalWidth * zoomLevel}px ${img.naturalHeight * zoomLevel}px`,
//       backgroundRepeat: "no-repeat",
//     };
//   };

//   return (
//     <div className="bg-gray-50 pb-8">
//       <div className="flex justify-center mb-10 overflow-hidden">
//         <div className="relative h-[90vh] w-[100vw] overflow-hidden">
//           {/* تصویر اصلی */}
//           <img
//             ref={imageRef}
//             className="h-full w-full object-cover cursor-crosshair"
//             src={cover.src}
//             alt="Contact cover"
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//           />

//           {/* مربع زوم */}
//           {showZoom && (
//             <>
//               {/* overlay تاریک اطراف مربع */}
//               <div
//                 className="absolute inset-0 pointer-events-none"
//                 style={{
//                   boxShadow: "inset 0 0 0 9999px rgba(0, 0, 0, 0.3)",
//                   zIndex: 10,
//                 }}
//               >
//                 {/* پنجره شفاف برای ناحیه زوم */}
//                 <div
//                   className="absolute bg-transparent"
//                   style={{
//                     width: "300px",
//                     height: "300px",
//                     left: `${zoomPosition.x - 150}px`,
//                     top: `${zoomPosition.y - 150}px`,
//                     zIndex: 11,
//                   }}
//                 />
//               </div>

//               {/* تصویر زوم شده در مربع */}
//               <div
//                 className="absolute pointer-events-none bg-cover"
//                 style={{
//                   width: "300px",
//                   height: "300px",
//                   left: `${zoomPosition.x - 150}px`,
//                   top: `${zoomPosition.y - 150}px`,
//                   zIndex: 12,
//                   ...getZoomStyle(),
//                 }}
//               />

//               {/* مرز مربع زوم */}
//               <div
//                 className="absolute border-2 border-white border-opacity-60 pointer-events-none"
//                 style={{
//                   width: "300px",
//                   height: "300px",
//                   left: `${zoomPosition.x - 150}px`,
//                   top: `${zoomPosition.y - 150}px`,
//                   zIndex: 13,
//                 }}
//               />
//             </>
//           )}
//         </div>
//       </div>

//       <div className="container mx-auto px-4">
//         <div className="w-full mx-auto">
//           <div className="grid grid-cols-2 lg:grid-cols-2 gap-12">
//             <span className="col-span-1">
//               <CallDetail />
//             </span>
//             <span className="col-span-1">
//               <CallForm
//                 handleSubmit={handleSubmit}
//                 formData={formData}
//                 setFormData={setFormData}
//               />
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;
