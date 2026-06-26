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

export default function CookiePolicyPage() {
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
          <span className="en-text">Cookie Policy</span>
          <span className="ar-text">سياسة ملفات الارتباط</span>
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
            Welcome to the Cookie Policy of <strong>Brandworks Advertising Company</strong>. This policy explains how and why we use cookies and similar tracking technologies when you visit our website. By continuing to browse or use our site, you agree to our use of cookies as described in this policy.
          </span>
          <span className="ar-text">
            مرحباً بكم في سياسة ملفات تعريف الارتباط الخاصة بـ <strong>شركة براندووركس للإعلان</strong>. تشرح هذه السياسة كيف ولماذا نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة عند زيارتكم لموقعنا. باستمراركم في تصفح الموقع أو استخدامه، فإنكم توافقون على استخدامنا لملفات تعريف الارتباط كما هو موضح في هذه السياسة.
          </span>
        </div>

        {/* 01 WHAT ARE COOKIES */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">01</span>
            <h2 className="section-title">
              <span className="en-text">What Are Cookies?</span>
              <span className="ar-text section-title-ar">ما هي ملفات تعريف الارتباط؟</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
            </div>
            <div className="ar-text">
              <p>ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة يتم وضعها على جهاز الكمبيوتر أو الهاتف الذكي أو أي جهاز آخر عند زيارة موقع ويب. تُستخدم على نطاق واسع من قبل أصحاب المواقع لجعل مواقعهم تعمل، أو لتعمل بكفاءة أكبر، بالإضافة إلى توفير معلومات إحصائية.</p>
            </div>
          </div>
        </section>

        {/* 02 HOW WE USE COOKIES */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">02</span>
            <h2 className="section-title">
              <span className="en-text">How We Use Cookies</span>
              <span className="ar-text section-title-ar">كيف نستخدم ملفات تعريف الارتباط</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>We use cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, while others enable us to track and target the interests of our users to enhance the experience on our site.</p>
              <ul>
                <li><strong>Strictly Necessary Cookies:</strong> These are essential for you to browse the website and use its features, such as accessing secure areas of the site.</li>
                <li><strong>Performance &amp; Analytics Cookies:</strong> These collect information about how you use our website, like which pages you visited and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized.</li>
                <li><strong>Functionality Cookies:</strong> These allow our website to remember choices you make (such as your language preference) and provide enhanced, more personal features.</li>
              </ul>
            </div>
            <div className="ar-text">
              <p>نحن نستخدم ملفات تعريف الارتباط لعدة أسباب. بعضها ضروري لأسباب فنية لكي يعمل موقعنا، في حين يمكننا البعض الآخر من تتبع اهتمامات مستخدمينا واستهدافها لتعزيز تجربتهم.</p>
              <ul>
                <li><strong>ملفات تعريف الارتباط الضرورية جداً:</strong> هذه الملفات ضرورية لتتمكن من تصفح الموقع واستخدام ميزاته، مثل الوصول إلى المناطق الآمنة.</li>
                <li><strong>ملفات الأداء والتحليلات:</strong> تجمع هذه الملفات معلومات حول كيفية استخدامك لموقعنا، مثل الصفحات التي زرتها والروابط التي نقرت عليها. لا يمكن استخدام أي من هذه المعلومات لتحديد هويتك؛ فهي مجمعة ومجهولة المصدر.</li>
                <li><strong>ملفات الوظائف:</strong> تسمح لموقعنا بتذكر الاختيارات التي تقوم بها (مثل تفضيل اللغة) وتقديم ميزات محسنة وأكثر شخصية.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 03 THIRD-PARTY COOKIES */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">03</span>
            <h2 className="section-title">
              <span className="en-text">Third-Party Cookies</span>
              <span className="ar-text section-title-ar">ملفات تعريف الارتباط للأطراف الثالثة</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website. These third parties, such as Google Analytics, may set cookies on your computer when you visit our site to help us analyze site traffic and improve performance.</p>
            </div>
            <div className="ar-text">
              <p>بالإضافة إلى ملفات تعريف الارتباط الخاصة بنا، قد نستخدم أيضاً ملفات تابعة لأطراف ثالثة للإبلاغ عن إحصائيات استخدام الموقع. قد تقوم هذه الأطراف، مثل تحليلات جوجل (Google Analytics)، بتعيين ملفات تعريف ارتباط على جهازك عند زيارة موقعنا لمساعدتنا في تحليل حركة المرور وتحسين الأداء.</p>
            </div>
          </div>
        </section>

        {/* 04 MANAGING PREFERENCES */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">04</span>
            <h2 className="section-title">
              <span className="en-text">Managing Your Preferences</span>
              <span className="ar-text section-title-ar">إدارة تفضيلاتك</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
              <p>As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.</p>
            </div>
            <div className="ar-text">
              <p>لديك الحق في اتخاذ قرار بقبول أو رفض ملفات تعريف الارتباط. يمكنك إعداد أو تعديل عناصر تحكم متصفح الويب الخاص بك لقبول أو رفض هذه الملفات. إذا اخترت الرفض، فلا يزال بإمكانك استخدام موقعنا، على الرغم من أن وصولك إلى بعض الوظائف قد يكون مقيداً.</p>
              <p>نظراً لأن الوسائل التي يمكنك من خلالها رفض ملفات تعريف الارتباط تختلف من متصفح لآخر، يجب عليك زيارة قائمة المساعدة الخاصة بمتصفحك للحصول على مزيد من المعلومات.</p>
            </div>
          </div>
        </section>

        {/* 05 UPDATES */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">05</span>
            <h2 className="section-title">
              <span className="en-text">Updates to This Policy</span>
              <span className="ar-text section-title-ar">تحديثات هذه السياسة</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies.</p>
            </div>
            <div className="ar-text">
              <p>قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من وقت لآخر لتعكس، على سبيل المثال، التغييرات في ملفات تعريف الارتباط التي نستخدمها أو لأسباب تشغيلية أو قانونية أو تنظيمية أخرى. يرجى زيارة هذه السياسة بانتظام للبقاء على اطلاع.</p>
            </div>
          </div>
        </section>

        {/* CONTACT BAND */}
        <div className="contact-band">
          <p className="cb-title">
            <span className="en-text">Need More Information?</span>
            <span className="ar-text">هل تحتاج إلى مزيد من المعلومات؟</span>
          </p>
          <p className="cb-sub">
            <span className="en-text">If you have any questions about our use of cookies or other technologies, please contact us.</span>
            <span className="ar-text">إذا كانت لديك أي أسئلة حول استخدامنا لملفات تعريف الارتباط أو التقنيات الأخرى، يرجى التواصل معنا.</span>
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
