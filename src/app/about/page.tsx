"use client";
import { useState } from "react";
import Link from "next/link";
import CallForm from "./CallForm";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import CallDetail from "./CallDetail";
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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
