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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("پیام شما با موفقیت ارسال شد!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className=" bg-gray-50 pb-8">
      <span className="flex justify-center mb-10" >
        <img className="h-[90vh] w-[100vw]" src={cover.src} />
        {/* <img className="h-[calc(100vw-1000px)] h-[100vw] w-[100vw]" src={cover.src} /> */}
      </span>
      <div className="container mx-auto px-4">
        <div className="w-full  mx-auto">
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