'use client';

import { useState } from 'react';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import '../terms-and-conditions/terms.css';
import Link from 'next/link';

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700'], 
  variable: '--font-display' 
});

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500'], 
  variable: '--font-body' 
});

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  return (
    <div className={`terms-wrapper ${lang === 'ar' ? 'ar-active' : 'en-active'} ${playfair.variable} ${dmSans.variable}`}>
      
      {/* HEADER */}
      <header className="terms-header">
        <Link href="/" className="logo-block" style={{ textDecoration: 'none' }}>
          <span className="logo-name">Brandworks</span>
          <span className="logo-sub">Advertising Company · Kuwait</span>
        </Link>
        <div className="lang-toggle">
          <button 
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
            onClick={() => setLang('en')}
          >
            English
          </button>
          <button 
            className={`lang-btn ${lang === 'ar' ? 'active' : ''}`} 
            onClick={() => setLang('ar')}
          >
            عربي
          </button>
        </div>
      </header>

      {/* HERO */}
      <div className="hero-band">
        <div className="hero-ornament">
          <span></span>
          <div className="hero-ornament-dot"></div>
          <span></span>
        </div>
        <p className="hero-label">
          <span className="en-text">Legal &nbsp;·&nbsp; Brandworks Advertising Company</span>
          <span className="ar-text">قانوني &nbsp;·&nbsp; شركة براندووركس للإعلان</span>
        </p>
        <h1 className="hero-title">
          <span className="en-text">Privacy Policy</span>
          <span className="ar-text">سياسة الخصوصية</span>
        </h1>
        <p className="hero-version">
          <span className="en-text">Effective Date: {new Date().getFullYear()} &nbsp;|&nbsp; Governed by the Laws of Kuwait</span>
          <span className="ar-text">تاريخ السريان: {new Date().getFullYear()} &nbsp;|&nbsp; خاضع لقوانين دولة الكويت</span>
        </p>
      </div>

      <main className="page-wrap">
        {/* INTRO */}
        <div className="intro-card">
          <span className="en-text">
            Welcome to the Privacy Policy of <strong>Brandworks Advertising Company</strong>. We are committed to protecting your privacy and ensuring that your personal data is handled in a safe and responsible manner. This policy outlines how we collect, use, and protect your information when you interact with our website or engage our services. By using our services, you consent to the data practices described in this policy.
          </span>
          <span className="ar-text">
            مرحباً بكم في سياسة الخصوصية الخاصة بـ <strong>شركة براندووركس للإعلان</strong>. نحن ملتزمون بحماية خصوصيتكم وضمان التعامل مع بياناتكم الشخصية بطريقة آمنة ومسؤولة. توضح هذه السياسة كيف نقوم بجمع واستخدام وحماية معلوماتكم عند تفاعلكم مع موقعنا أو الاستفادة من خدماتنا. باستخدامكم لخدماتنا، فإنكم توافقون على الممارسات الموضحة في هذه السياسة.
          </span>
        </div>

        {/* 01 INFORMATION WE COLLECT */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">01</span>
            <h2 className="section-title">
              <span className="en-text">Information We Collect</span>
              <span className="ar-text section-title-ar">المعلومات التي نجمعها</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>We collect information that helps us deliver and improve our services. The types of personal information we may collect include:</p>
              <ul>
                <li><strong>Contact Information:</strong> Name, email address, phone number, and physical address provided via forms or direct communication.</li>
                <li><strong>Business Information:</strong> Company name, job title, and project requirements.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on the site.</li>
              </ul>
            </div>
            <div className="ar-text">
              <p>نحن نجمع المعلومات التي تساعدنا في تقديم وتحسين خدماتنا. تشمل أنواع المعلومات الشخصية التي قد نجمعها:</p>
              <ul>
                <li><strong>معلومات الاتصال:</strong> الاسم، عنوان البريد الإلكتروني، رقم الهاتف، والعنوان الفعلي المقدم عبر النماذج أو التواصل المباشر.</li>
                <li><strong>معلومات العمل:</strong> اسم الشركة، المسمى الوظيفي، ومتطلبات المشروع.</li>
                <li><strong>بيانات الاستخدام:</strong> معلومات حول تفاعلك مع موقعنا، بما في ذلك عنوان IP، نوع المتصفح، الصفحات التي تمت زيارتها، والوقت المستغرق في الموقع.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 02 HOW WE USE YOUR INFO */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">02</span>
            <h2 className="section-title">
              <span className="en-text">How We Use Your Information</span>
              <span className="ar-text section-title-ar">كيف نستخدم معلوماتك</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>The information we collect is used in the following ways:</p>
              <ul>
                <li>To provide, operate, and maintain our services effectively.</li>
                <li>To process and respond to your inquiries, quotations, and requests.</li>
                <li>To communicate with you regarding project updates, billing, and support.</li>
                <li>To improve website functionality and user experience through analytics.</li>
                <li>To comply with legal obligations under the laws of the State of Kuwait.</li>
              </ul>
            </div>
            <div className="ar-text">
              <p>تُستخدم المعلومات التي نجمعها بالطرق التالية:</p>
              <ul>
                <li>لتقديم خدماتنا وتشغيلها وصيانتها بفعالية.</li>
                <li>لمعالجة والرد على استفساراتكم وعروض الأسعار والطلبات.</li>
                <li>للتواصل معكم بخصوص تحديثات المشروع والفواتير والدعم.</li>
                <li>لتحسين وظائف الموقع وتجربة المستخدم من خلال التحليلات.</li>
                <li>للامتثال للالتزامات القانونية بموجب قوانين دولة الكويت.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 03 DATA SHARING */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">03</span>
            <h2 className="section-title">
              <span className="en-text">Data Sharing &amp; Disclosure</span>
              <span className="ar-text section-title-ar">مشاركة البيانات والإفصاح عنها</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>Brandworks Advertising Company respects your privacy and <strong>does not sell or rent</strong> your personal information to third parties. However, we may share information in the following circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> We may share data with trusted third-party vendors who assist in operating our website, conducting our business, or servicing you, provided they agree to keep this information confidential.</li>
                <li><strong>Legal Compliance:</strong> We may disclose information when required to do so by law, or to protect our rights, property, or safety.</li>
              </ul>
            </div>
            <div className="ar-text">
              <p>تحترم شركة براندووركس للإعلان خصوصيتك و<strong>لا تقوم ببيع أو تأجير</strong> معلوماتك الشخصية لأطراف ثالثة. ومع ذلك، قد نشارك المعلومات في الحالات التالية:</p>
              <ul>
                <li><strong>مزودو الخدمات:</strong> قد نشارك البيانات مع موردين موثوقين يساعدوننا في تشغيل موقعنا، أو تسيير أعمالنا، أو تقديم الخدمات لك، شريطة التزامهم بسرية هذه المعلومات.</li>
                <li><strong>الامتثال القانوني:</strong> قد نفصح عن المعلومات عندما يُطلب منا ذلك بموجب القانون، أو لحماية حقوقنا وممتلكاتنا وسلامتنا.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 04 DATA SECURITY */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">04</span>
            <h2 className="section-title">
              <span className="en-text">Data Security</span>
              <span className="ar-text section-title-ar">أمن البيانات</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>We implement a variety of security measures to maintain the safety of your personal information. While we strive to use commercially acceptable means to protect your data, please be aware that no method of transmission over the Internet or electronic storage is 100% secure.</p>
            </div>
            <div className="ar-text">
              <p>نحن نطبق مجموعة من الإجراءات الأمنية للحفاظ على سلامة معلوماتك الشخصية. وفي حين أننا نسعى جاهدين لاستخدام وسائل مقبولة تجارياً لحماية بياناتك، يرجى إدراك أنه لا توجد طريقة نقل عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة 100%.</p>
            </div>
          </div>
        </section>

        {/* 05 COOKIES */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">05</span>
            <h2 className="section-title">
              <span className="en-text">Cookies &amp; Tracking Technologies</span>
              <span className="ar-text section-title-ar">ملفات تعريف الارتباط وتكنولوجيا التتبع</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>Our website may use cookies to enhance user experience. Cookies are small files stored on your device that help us analyze site traffic and remember your preferences. You can choose to disable cookies through your browser settings, though this may affect the functionality of certain parts of our site.</p>
            </div>
            <div className="ar-text">
              <p>قد يستخدم موقعنا ملفات تعريف الارتباط لتعزيز تجربة المستخدم. ملفات تعريف الارتباط هي ملفات صغيرة تخزن على جهازك وتساعدنا في تحليل حركة المرور وتذكر تفضيلاتك. يمكنك اختيار تعطيلها من خلال إعدادات المتصفح، ولكن ذلك قد يؤثر على عمل بعض أجزاء الموقع.</p>
            </div>
          </div>
        </section>

        {/* 06 CHANGES */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">06</span>
            <h2 className="section-title">
              <span className="en-text">Changes to This Policy</span>
              <span className="ar-text section-title-ar">التغييرات على هذه السياسة</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>Brandworks Advertising Company reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.</p>
            </div>
            <div className="ar-text">
              <p>تحتفظ شركة براندووركس للإعلان بالحق في تحديث سياسة الخصوصية هذه في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة مع تاريخ سريان محدث. نشجعك على مراجعة هذه السياسة بشكل دوري للتعرف على كيفية حماية معلوماتك.</p>
            </div>
          </div>
        </section>

        {/* CONTACT BAND */}
        <div className="contact-band">
          <p className="cb-title">
            <span className="en-text">Questions About Your Privacy?</span>
            <span className="ar-text">استفسارات حول خصوصيتك؟</span>
          </p>
          <p className="cb-sub">
            <span className="en-text">If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us directly.</span>
            <span className="ar-text">إذا كان لديك أي أسئلة أو استفسارات أو طلبات بخصوص سياسة الخصوصية هذه أو بياناتك الشخصية، يرجى التواصل معنا مباشرة.</span>
          </p>
          <div className="contact-grid">
            <div className="contact-item">
              <p className="ci-label">
                <span className="en-text">Email</span>
                <span className="ar-text">البريد الإلكتروني</span>
              </p>
              <p className="ci-val">info@brandworkskwt.com</p>
            </div>
            <div className="contact-item">
              <p className="ci-label">
                <span className="en-text">Phone</span>
                <span className="ar-text">رقم الهاتف</span>
              </p>
              <p className="ci-val">+965 507 27586</p>
            </div>
            <div className="contact-item">
              <p className="ci-label">
                <span className="en-text">Address</span>
                <span className="ar-text">العنوان</span>
              </p>
              <p className="ci-val">Street 22, near Naif Poultry, Shuwaikh Industrial Area 2, Kuwait</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
