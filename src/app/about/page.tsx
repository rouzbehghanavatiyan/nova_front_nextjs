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
      transform: 'scale(4)',
      transformOrigin: `${x}% ${y}%`
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