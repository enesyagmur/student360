import { Building } from "lucide-react";
import React from "react";

const Info = () => {
  return (
    <div className="hidden md:flex w-6/12 h-full flex-col items-center justify-center p-8 bg-color-accent text-white text-center rounded-xl">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-xl mb-6 shadow-lg">
        <Building className="w-10 h-10 text-color-accent-light" />
      </div>
      <h1 className="text-4xl font-extrabold mb-3">Öğrenci360</h1>
      <p className="text-lg font-light mb-4">
        Eğitim Yönetim Sistemine Hoş Geldiniz
      </p>
      <p className="text-sm opacity-90 leading-relaxed max-w-sm">
        Öğrenci360, yöneticiler, öğretmenler ve öğrenciler için kapsamlı bir
        okul yönetim platformudur. Kullanıcı ekleme/çıkarma, haftalık ders
        programı oluşturma, sınav planlama ve öğrenci performans takibi gibi
        birçok işlemi kolayca gerçekleştirin. Tüm eğitim süreçlerinizi tek bir
        merkezden yönetin.
      </p>
      <p className="mt-6 text-xs opacity-70">
        Daha fazlası için sistem özelliklerini keşfedin.
      </p>
    </div>
  );
};

export default Info;
