'use client';

import { useState } from 'react';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './terms.css';
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

export default function TermsPage() {
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
          <span className="en-text">Terms &amp; Conditions</span>
          <span className="ar-text">الشروط والأحكام</span>
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
            Welcome to <strong>Brandworks Advertising Company</strong>. By accessing our website, requesting a quotation, or engaging our services, you agree to be bound by these Terms &amp; Conditions. Please read them carefully before proceeding. These terms govern the relationship between Brandworks Advertising Company (<strong>&quot;the Company&quot;</strong>, <strong>&quot;we&quot;</strong>, <strong>&quot;us&quot;</strong>) and any client, visitor, or party (<strong>&quot;the Client&quot;</strong>, <strong>&quot;you&quot;</strong>) who accesses this website or enters into a business relationship with us. Brandworks Advertising Company is a registered entity operating in Kuwait, offering a comprehensive range of advertising, fabrication, signage, digital display, and related services across Kuwait and the wider Gulf region.
          </span>
          <span className="ar-text">
            مرحباً بكم في <strong>شركة براندووركس للإعلان</strong>. بالدخول إلى موقعنا الإلكتروني، أو طلب عرض أسعار، أو التعاقد على خدماتنا، فإنكم توافقون على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل المتابعة. تنظّم هذه الشروط العلاقة بين شركة براندووركس للإعلان (<strong>&quot;الشركة&quot;</strong>) وأي عميل أو زائر أو طرف يدخل إلى الموقع أو يتعامل معنا تجارياً.
          </span>
        </div>

        {/* 01 ABOUT */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">01</span>
            <h2 className="section-title">
              <span className="en-text">About Brandworks Advertising Company</span>
              <span className="ar-text section-title-ar">نبذة عن شركة براندووركس للإعلان</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>Brandworks Advertising Company is a leading advertising and fabrication solutions provider headquartered in Kuwait. With years of proven industry experience, we deliver innovative, high-quality solutions across a broad spectrum of services including:</p>
              <ul>
                <li><strong>Window Displays</strong> – Captivating visual displays designed to attract foot traffic and draw customers into retail spaces.</li>
                <li><strong>Mall Pop-Ups</strong> – Custom-built temporary retail spaces and kiosks that maximise brand presence in high-traffic areas.</li>
                <li><strong>Exhibition Stands</strong> – Striking, custom-designed booths that make brands stand out at trade shows and events across Kuwait and the region.</li>
                <li><strong>Graphics &amp; Signage</strong> – High-impact indoor and outdoor signage engineered to capture attention and direct footfall.</li>
                <li><strong>Carpentry &amp; Acrylic Works</strong> – Precision woodworking and custom acrylic fabrication for bespoke retail fixtures and displays.</li>
                <li><strong>Digital &amp; LED Screens</strong> – State-of-the-art digital displays and LED screens for dynamic, eye-catching visual communication.</li>
                <li><strong>Laser Cutting</strong> – High-precision laser cutting for acrylic and metal, enabling intricate designs and perfect finishes.</li>
                <li><strong>Maintenance Services</strong> – Comprehensive maintenance and repair services to keep all installations looking pristine year-round.</li>
                <li><strong>MEP &amp; CCTV Services</strong> – Mechanical, Electrical, Plumbing, and security system solutions as part of our complete service offering.</li>
              </ul>
              <p>Our skilled team is committed to fostering business growth and delivering exceptional results through lasting client relationships. We serve clients across retail, hospitality, corporate, and events sectors throughout Kuwait.</p>
            </div>
            <div className="ar-text">
              <p>تُعدّ شركة براندووركس للإعلان من الشركات الرائدة في تقديم حلول الإعلان والتصنيع في الكويت. وتشمل خدماتنا: عروض الواجهات، والمتاجر المؤقتة في المجمعات التجارية، وأجنحة المعارض، والجرافيك واللافتات، وأعمال النجارة والأكريليك، والشاشات الرقمية وLED، والقطع بالليزر، وخدمات الصيانة، وخدمات MEP والكاميرات الأمنية.</p>
              <p>يلتزم فريقنا المتخصص بتقديم نتائج استثنائية تُسهم في نمو أعمال عملائنا من خلال علاقات مهنية راسخة.</p>
            </div>
          </div>
        </section>

        {/* 02 ACCEPTANCE OF TERMS */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">02</span>
            <h2 className="section-title">
              <span className="en-text">Acceptance of Terms</span>
              <span className="ar-text section-title-ar">القبول بالشروط</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>By accessing this website or engaging Brandworks Advertising Company for any service, you unconditionally accept these Terms &amp; Conditions in their entirety. If you do not agree with any part of these terms, you must refrain from using this website or engaging our services.</p>
              <p>For corporate clients, acceptance is further confirmed by the issuance of a Local Purchase Order (LPO), a signed quotation, or any written or electronic communication authorising the commencement of work.</p>
              <p>Brandworks Advertising Company reserves the right to amend these Terms &amp; Conditions at any time. The most current version will always be published on this page with the effective date noted.</p>
            </div>
            <div className="ar-text">
              <p>بالدخول إلى هذا الموقع أو التعامل مع شركة براندووركس للإعلان، فإنكم تقبلون هذه الشروط والأحكام بالكامل. وفيما يخص العملاء من الشركات، يُعدّ إصدار أمر الشراء المحلي أو التوقيع على عرض الأسعار تأكيداً للقبول.</p>
              <p>تحتفظ الشركة بحقها في تعديل هذه الشروط في أي وقت، وسيُنشر النسخة المحدّثة دائماً على هذه الصفحة.</p>
            </div>
          </div>
        </section>

        {/* 03 QUOTATIONS & LPO */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">03</span>
            <h2 className="section-title">
              <span className="en-text">Quotations, LPO &amp; Commencement of Work</span>
              <span className="ar-text section-title-ar">عروض الأسعار وأوامر الشراء وبدء العمل</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>All quotations issued by Brandworks Advertising Company are valid for a period of <strong>30 days</strong> from the date of issue, unless otherwise stated in writing. The Company reserves the right to revise or withdraw any quotation after this period.</p>
              <ul>
                <li>A duly authorised <strong>Local Purchase Order (LPO)</strong> must be issued and received by the Company <strong>prior to the commencement of any work</strong>. No work shall begin without a confirmed LPO on record.</li>
                <li>All prices quoted are as per the stated specification provided at the time of quotation. Any deviation from the original specifications may result in a revised price.</li>
                <li>Any additions, modifications, or variations to the agreed scope of work must be <strong>discussed and agreed separately in writing</strong> before implementation. Verbal instructions alone shall not constitute authorisation for variations.</li>
                <li>Payment is due upon completion of the project, unless alternative payment terms have been explicitly agreed in writing by both parties.</li>
                <li>In the event that the Company requires an advance payment — at its sole discretion — the Client will be notified formally, and a <strong>50% advance payment</strong> of the total project value shall be required prior to commencement of work. The remaining balance will be settled upon project completion.</li>
              </ul>
              <div className="highlight-box">
                <strong>Note:</strong> All prices are exclusive of any applicable government fees, municipality charges, or permit costs unless explicitly stated in the quotation. Such costs, if applicable, shall be borne by the Client.
              </div>
            </div>
            <div className="ar-text">
              <p>تُعدّ جميع عروض الأسعار الصادرة عن الشركة سارية لمدة <strong>30 يوماً</strong> من تاريخ إصدارها، ما لم يُنص على خلاف ذلك كتابياً.</p>
              <ul>
                <li>يجب إصدار <strong>أمر شراء محلي (LPO)</strong> معتمد واستلامه من قِبل الشركة <strong>قبل بدء أي عمل</strong>.</li>
                <li>جميع الأسعار المقدَّمة تعتمد على المواصفات المحددة وقت إعداد العرض.</li>
                <li>أي إضافات أو تعديلات على نطاق العمل يجب <strong>الاتفاق عليها كتابياً</strong> قبل التنفيذ.</li>
                <li>يستحق السداد عند اكتمال المشروع، ما لم يُتفق على شروط دفع مغايرة كتابياً.</li>
                <li>في حال طلبت الشركة دفعة مقدمة وفق تقديرها المطلق، يُطلب من العميل سداد <strong>50% مقدماً</strong> من إجمالي قيمة المشروع.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 04 PAYMENT TERMS */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">04</span>
            <h2 className="section-title">
              <span className="en-text">Payment Terms &amp; Late Payment</span>
              <span className="ar-text section-title-ar">شروط الدفع والتأخر في السداد</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>All invoices issued by Brandworks Advertising Company are payable within <strong>30 days</strong> of the invoice date unless alternative terms have been agreed in writing. The Company reserves the right to charge interest on overdue amounts in accordance with Kuwaiti commercial law.</p>
              <ul>
                <li>In the event of non-payment, the Company reserves the right to suspend or terminate services and/or retain completed work or materials until full payment is received.</li>
                <li>Any bank transfer fees, exchange rate differences, or transaction charges are to be borne solely by the Client.</li>
                <li>Disputed invoices must be raised in writing within <strong>7 days</strong> of receipt. Failure to dispute within this period shall be deemed acceptance of the invoice.</li>
                <li>The Company reserves the right to refer any unpaid debts to a collections agency or pursue legal action under the applicable laws of Kuwait.</li>
              </ul>
            </div>
            <div className="ar-text">
              <p>تُستحق جميع الفواتير الصادرة خلال <strong>30 يوماً</strong> من تاريخ الإصدار. يحق للشركة تعليق الخدمات في حال التأخر عن السداد.</p>
              <ul>
                <li>يجب الاعتراض على أي فاتورة كتابياً خلال <strong>7 أيام</strong> من استلامها، وإلا اعتُبر ذلك قبولاً ضمنياً.</li>
                <li>رسوم التحويل البنكي وفروق العملة تقع على عاتق العميل.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 05 INTELLECTUAL PROPERTY */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">05</span>
            <h2 className="section-title">
              <span className="en-text">Intellectual Property Rights</span>
              <span className="ar-text section-title-ar">حقوق الملكية الفكرية</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>All creative works, designs, concepts, drawings, digital files, renderings, and artwork produced by Brandworks Advertising Company remain the <strong>exclusive intellectual property of the Company</strong> until full and final payment has been received from the Client.</p>
              <ul>
                <li>Upon receipt of full payment, the Client is granted a non-exclusive licence to use the delivered work for its intended commercial purpose.</li>
                <li>The Client may not reproduce, resell, sub-licence, or distribute any design, artwork, or creative output produced by the Company without prior written consent.</li>
                <li>All content on this website — including but not limited to text, graphics, logos, images, and design elements — is the exclusive property of Brandworks Advertising Company and is protected under Kuwaiti intellectual property law and applicable international conventions.</li>
                <li>Unauthorised use, copying, or reproduction of any content from this website or from any project deliverable is strictly prohibited and may result in legal action.</li>
                <li>The Company reserves the right to use images of completed projects for its own portfolio, marketing materials, and promotional purposes, unless the Client expressly requests otherwise in writing.</li>
              </ul>
            </div>
            <div className="ar-text">
              <p>تظل جميع الأعمال الإبداعية والتصاميم الملكيةَ الحصريةَ للشركة حتى استلام كامل المبلغ المستحق. بعد السداد الكامل، يُمنح العميل ترخيصاً غير حصري لاستخدام العمل المُسلَّم لأغراضه التجارية المقصودة.</p>
              <ul>
                <li>لا يحق للعميل إعادة إنتاج أو بيع أي تصميم أو عمل فني دون موافقة كتابية مسبقة.</li>
                <li>جميع محتويات الموقع محمية بموجب قانون الملكية الفكرية الكويتي.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 06 CONFIDENTIALITY */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">06</span>
            <h2 className="section-title">
              <span className="en-text">Strict Confidentiality &amp; Non-Disclosure</span>
              <span className="ar-text section-title-ar">السرية التامة وعدم الإفصاح</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <div className="sub-clause">
                <p>Brandworks Advertising Company maintains a <strong>strict and unwavering policy of confidentiality</strong> with respect to all client information, project details, commercial data, and business communications.</p>
                <p>Both parties agree that all information exchanged in connection with any project — including but not limited to design briefs, budgets, business strategies, client identities, product information, pricing structures, and technical specifications — shall be treated as <strong>strictly confidential</strong>.</p>
                <p style={{marginBottom: 0}}>The Company shall not:</p>
              </div>
              <ul>
                <li>Disclose any confidential client information to third parties without prior written consent from the Client.</li>
                <li>Use any client data, project information, or proprietary material for purposes other than delivering the agreed services.</li>
                <li>Share client details with competitors, media, or any external party without explicit written authorisation.</li>
              </ul>
              <p>This confidentiality obligation shall survive the termination of any agreement between the parties and shall remain in force indefinitely unless expressly released in writing by the disclosing party.</p>
              <p>Clients are equally bound by this confidentiality obligation and must not disclose any proprietary processes, pricing structures, supplier information, or trade secrets belonging to Brandworks Advertising Company.</p>
              <p>Any breach of confidentiality by either party may result in legal proceedings and a claim for damages under the applicable laws of the State of Kuwait.</p>
            </div>
            <div className="ar-text">
              <div className="sub-clause">
                <p>تلتزم شركة براندووركس للإعلان بسياسة <strong>سرية صارمة وثابتة</strong> فيما يتعلق بجميع معلومات العملاء وتفاصيل المشاريع والبيانات التجارية والمراسلات.</p>
                <p style={{marginBottom: 0}}>يتعهد كلا الطرفين بمعاملة جميع المعلومات المتبادلة المتعلقة بأي مشروع — بما في ذلك الميزانيات والاستراتيجيات والأسعار والمواصفات التقنية — باعتبارها معلومات <strong>سرية تامة</strong>.</p>
              </div>
              <ul>
                <li>لا تُفصح الشركة عن أي معلومات سرية لأطراف ثالثة دون موافقة كتابية مسبقة.</li>
                <li>يسري الالتزام بالسرية حتى بعد انتهاء أي اتفاقية بين الطرفين.</li>
                <li>أي إخلال بالسرية قد يُفضي إلى إجراءات قانونية بموجب قوانين دولة الكويت.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 07 WARRANTY & LIABILITY */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">07</span>
            <h2 className="section-title">
              <span className="en-text">Warranty &amp; Limitation of Liability</span>
              <span className="ar-text section-title-ar">الضمان وحدود المسؤولية</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>Brandworks Advertising Company takes great pride in the quality of its workmanship. We stand behind our work and offer the following warranties:</p>
              <ul>
                <li>All fabrication and installation work is warranted against defects in materials and workmanship for a period of <strong>three (3) months</strong> from the date of project completion and handover, unless otherwise stated in the quotation.</li>
                <li>Warranty coverage applies only to defects directly attributable to the Company&apos;s workmanship or materials. It does not cover damage caused by misuse, third-party modifications, extreme weather conditions, vandalism, or negligence by the Client.</li>
                <li>Digital and LED screen products are subject to manufacturer warranties, the terms of which will be communicated separately.</li>
              </ul>
              <p>To the fullest extent permitted by applicable Kuwaiti law, Brandworks Advertising Company shall not be liable for:</p>
              <ul>
                <li>Any indirect, incidental, special, or consequential damages arising from the use of our services or products.</li>
                <li>Loss of revenue, loss of business, or loss of profit resulting from any delay, defect, or failure in delivery.</li>
                <li>Delays caused by circumstances beyond our reasonable control, including but not limited to supply chain disruptions, utility failures, government-imposed restrictions, or force majeure events.</li>
              </ul>
              <p>In any event, the Company&apos;s maximum liability shall not exceed the total value paid by the Client for the specific project in question.</p>
            </div>
            <div className="ar-text">
              <p>تضمن الشركة جميع أعمال التصنيع والتركيب ضد العيوب لمدة <strong>ثلاثة (3) أشهر</strong> من تاريخ الاستلام. لا يشمل الضمان الأضرار الناتجة عن سوء الاستخدام أو التعديل من قِبل طرف ثالث.</p>
              <ul>
                <li>لا تتحمل الشركة المسؤولية عن أي أضرار غير مباشرة أو خسائر في الأرباح.</li>
                <li>لا تتجاوز المسؤولية القصوى للشركة القيمة الإجمالية المدفوعة من قِبل العميل للمشروع المعني.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 08 KUWAIT LAW & COMPLIANCE */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">08</span>
            <h2 className="section-title">
              <span className="en-text">Governing Law &amp; Kuwait Regulatory Compliance</span>
              <span className="ar-text section-title-ar">القانون الحاكم والامتثال للأنظمة الكويتية</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>These Terms &amp; Conditions are governed by and construed in accordance with the <strong>laws of the State of Kuwait</strong>, including but not limited to:</p>
              <ul>
                <li><strong>Kuwait Commercial Law (Law No. 68 of 1980)</strong> – Governing commercial transactions, contracts, and business obligations between parties.</li>
                <li><strong>Kuwait Civil Law</strong> – Governing contractual rights and obligations.</li>
                <li><strong>Kuwait Labour Law (Law No. 6 of 2010)</strong> – All works are carried out in compliance with Kuwaiti labour regulations.</li>
                <li><strong>Kuwait Municipality Regulations</strong> – All outdoor signage, installations, and structures are subject to applicable Kuwait Municipality permits and approvals. The Client is responsible for obtaining all necessary permits unless otherwise agreed in writing.</li>
                <li><strong>Consumer Protection Law (Law No. 39 of 2014)</strong> – Brandworks Advertising Company is committed to fair and transparent commercial practices.</li>
              </ul>
              <p>Any dispute arising out of or in connection with these Terms &amp; Conditions shall first be referred to amicable negotiation. If unresolved within <strong>30 days</strong>, the dispute shall be submitted to the competent courts of the <strong>Hawally Governorate, Kuwait</strong>, which shall have exclusive jurisdiction.</p>
              <p>All prices quoted are in <strong>Kuwaiti Dinars (KWD)</strong> unless otherwise stated. All contracts, invoices, and communications may be conducted in both Arabic and English; in the event of any discrepancy, the <strong>Arabic version shall prevail</strong> as per Kuwaiti legal requirements.</p>
            </div>
            <div className="ar-text">
              <p>تخضع هذه الشروط والأحكام لقوانين <strong>دولة الكويت</strong>، بما في ذلك:</p>
              <ul>
                <li><strong>قانون التجارة الكويتي (رقم 68 لسنة 1980)</strong> – يحكم المعاملات والعقود التجارية.</li>
                <li><strong>قانون العمل الكويتي (رقم 6 لسنة 2010)</strong> – تُنفَّذ جميع الأعمال وفق اللوائح العمالية الكويتية.</li>
                <li><strong>لوائح بلدية الكويت</strong> – تخضع اللافتات والتركيبات الخارجية لتصاريح بلدية الكويت. العميل مسؤول عن استخراج التصاريح اللازمة.</li>
              </ul>
              <p>تُحال أي نزاعات إلى التفاوض الودي أولاً، وإن لم تُحسم خلال <strong>30 يوماً</strong> فتُرفع إلى المحاكم المختصة في <strong>محافظة حولي، الكويت</strong>. وفي حال الخلاف بين النصين، <strong>تُقدَّم النسخة العربية</strong>.</p>
            </div>
          </div>
        </section>

        {/* 09 WEBSITE USE */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">09</span>
            <h2 className="section-title">
              <span className="en-text">Website Use &amp; Digital Content</span>
              <span className="ar-text section-title-ar">استخدام الموقع والمحتوى الرقمي</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>This website is operated by Brandworks Advertising Company to provide information about our services, portfolio, and contact details. By browsing this website, you agree to the following:</p>
              <ul>
                <li>All content on this website — including service descriptions, project images, design concepts, and written material — is the property of Brandworks Advertising Company and is protected under applicable copyright law.</li>
                <li>You may not reproduce, copy, distribute, or commercially exploit any content from this website without prior written permission from the Company.</li>
                <li>The Company is not liable for any inaccuracies, technical errors, or outdated information on this website. We endeavour to keep all content current and accurate but make no guarantees.</li>
                <li>Links to third-party websites are provided for convenience only. Brandworks Advertising Company does not endorse or take responsibility for the content of external websites.</li>
                <li>The Company reserves the right to modify, suspend, or discontinue any part of this website at any time without prior notice.</li>
              </ul>
            </div>
            <div className="ar-text">
              <p>يُشغِّل هذا الموقع شركةُ براندووركس للإعلان لتقديم معلومات عن خدماتنا. بتصفح هذا الموقع، توافق على الشروط التالية:</p>
              <ul>
                <li>لا يحق إعادة نشر أو توزيع أي محتوى من هذا الموقع دون إذن كتابي مسبق.</li>
                <li>لا تتحمل الشركة مسؤولية أي معلومات غير دقيقة أو أخطاء تقنية في الموقع.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 10 FORCE MAJEURE */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">10</span>
            <h2 className="section-title">
              <span className="en-text">Force Majeure</span>
              <span className="ar-text section-title-ar">القوة القاهرة</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>Brandworks Advertising Company shall not be held liable or responsible for any failure or delay in performing its obligations under any agreement where such failure or delay results from circumstances beyond our reasonable control, including but not limited to:</p>
              <ul>
                <li>Acts of God, natural disasters, pandemics, or epidemics.</li>
                <li>War, civil unrest, terrorism, or government-imposed restrictions.</li>
                <li>Supply chain disruptions, material shortages, or port closures.</li>
                <li>Power outages, infrastructure failures, or extreme weather conditions.</li>
              </ul>
              <p>In such circumstances, the Company will notify the Client as soon as practicable and will use reasonable efforts to resume performance at the earliest opportunity. Both parties may agree to revise project timelines or terms accordingly.</p>
            </div>
            <div className="ar-text">
              <p>لا تتحمل الشركة أي مسؤولية عن التأخير أو الإخفاق في الأداء الناجم عن ظروف خارجة عن إرادتها، كالكوارث الطبيعية والأوبئة وقرارات الجهات الحكومية.</p>
              <p>ستُخطر الشركة العميل في أقرب وقت ممكن وستبذل قصارى جهدها لاستئناف العمل في أول فرصة.</p>
            </div>
          </div>
        </section>

        {/* 11 AMENDMENTS */}
        <section className="tc-section">
          <div className="section-header">
            <span className="section-num">11</span>
            <h2 className="section-title">
              <span className="en-text">Amendments &amp; Severability</span>
              <span className="ar-text section-title-ar">التعديلات وقابلية الفصل</span>
            </h2>
          </div>
          <div className="tc-body">
            <div className="en-text">
              <p>Brandworks Advertising Company reserves the right to amend, update, or revise these Terms &amp; Conditions at any time without prior notice. The revised version will be published on this page with an updated effective date. Your continued use of this website or engagement of our services following any such amendment constitutes your acceptance of the updated terms.</p>
              <p>If any provision of these Terms &amp; Conditions is found to be invalid, unlawful, or unenforceable under Kuwaiti law, such provision shall be severed and the remaining provisions shall continue in full force and effect.</p>
            </div>
            <div className="ar-text">
              <p>تحتفظ الشركة بحقها في تعديل هذه الشروط في أي وقت. استمرار استخدامك للموقع بعد التعديل يُعدّ قبولاً للشروط المحدَّثة.</p>
              <p>إذا تبيّن أن أي بنود غير قابلة للتطبيق بموجب القانون الكويتي، تظل البنود الأخرى سارية المفعول.</p>
            </div>
          </div>
        </section>

        {/* CONTACT BAND */}
        <div className="contact-band">
          <p className="cb-title">
            <span className="en-text">Questions About These Terms?</span>
            <span className="ar-text">استفسارات حول هذه الشروط؟</span>
          </p>
          <p className="cb-sub">
            <span className="en-text">If you have any doubts, questions, or concerns regarding these Terms &amp; Conditions, a quotation, or any ongoing or prospective work, please do not hesitate to contact Brandworks Advertising Company directly. Our team is ready to assist you.</span>
            <span className="ar-text">إذا كان لديكم أي استفسارات أو شكوك بشأن هذه الشروط أو أي عرض أسعار أو عمل جارٍ أو محتمل، يُرجى التواصل مع شركة براندووركس للإعلان مباشرةً. فريقنا مستعد لمساعدتكم.</span>
          </p>
          <div className="contact-grid">
            <div className="contact-item">
              <p className="ci-label">
                <span className="en-text">Company</span>
                <span className="ar-text">الشركة</span>
              </p>
              <p className="ci-val">Brandworks Advertising Company</p>
            </div>
            <div className="contact-item">
              <p className="ci-label">
                <span className="en-text">Address</span>
                <span className="ar-text">العنوان</span>
              </p>
              <p className="ci-val">Brand Works International Company LLC, Street 22, near Naif Poultry, Shuwaikh Industrial Area 2, Kuwait</p>
            </div>
            <div className="contact-item">
              <p className="ci-label">
                <span className="en-text">Jurisdiction</span>
                <span className="ar-text">الاختصاص القضائي</span>
              </p>
              <p className="ci-val">
                <span className="en-text">Hawally Governorate Courts, State of Kuwait</span>
                <span className="ar-text">محاكم محافظة حولي، دولة الكويت</span>
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
