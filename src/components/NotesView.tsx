import React, { useState } from 'react';
import { BookOpen, AlertCircle, Shield, CreditCard, PiggyBank, Target, HelpCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function NotesView() {
  const [activeSubTab, setActiveSubTab] = useState<'form3' | 'form4' | 'form5' | 'form5_ch4'>('form3');
  const { lang } = useLanguage();

  const notesData = {
    form3: {
      title: lang === 'ms' 
        ? "Matematik Pengguna: Simpanan & Pelaburan, Kredit & Hutang (Tingkatan 3 Bab 3)" 
        : "Consumer Mathematics: Savings & Investments, Credit & Debt (Form 3 Chapter 3)",
      sections: [
        {
          id: "savings_type",
          title: lang === 'ms' ? "1. Jenis-jenis Akaun Simpanan" : "1. Types of Savings Accounts",
          icon: <PiggyBank className="w-5 h-5 text-emerald-600" />,
          content: lang === 'ms' ? (
            <div className="space-y-3 font-sans text-sm text-slate-600">
              <p>Simpanan merujuk kepada wang berlebihan yang disimpan di dalam peti keselamatan, laci, atau didepositkan di institusi perbankan.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <h4 className="font-semibold text-emerald-800 mb-1 text-xs">Akaun Simpanan</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-500">
                    <li>Boleh menyimpan sebarang amaun mengikut kemampuan.</li>
                    <li>Kadar faedah yang rendah.</li>
                    <li>Boleh mengeluarkan wang pada bila-bila masa menggunakan kad debit / ATM.</li>
                  </ul>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                  <h4 className="font-semibold text-amber-800 mb-1 text-xs">Akaun Simpanan Tetap</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-500">
                    <li>Menyimpan sejumlah wang tertentu untuk tempoh masa tertentu (cth: 3, 9, atau 12 bulan).</li>
                    <li>Kadar faedah lebih kompetitif daripada akaun simpanan biasa.</li>
                    <li>Wang tidak boleh dikeluarkan sebelum tarikh matang, jika tidak kadar faedah dikurangkan/dibatalkan.</li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-1 text-xs">Akaun Semasa</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-500">
                    <li>Digunakan untuk tujuan peribadi atau perniagaan.</li>
                    <li>Pembayaran boleh dibuat kepada pihak ketiga menggunakan Cek.</li>
                    <li>Biasanya tiada faedah atau dikenakan caj perkhidmatan.</li>
                    <li>Menawarkan kemudahan overdraf (mengeluarkan wang melebihi baki).</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 font-sans text-sm text-slate-600">
              <p>Savings are excess money deposited in a safe box, drawer, or banking institutions.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <h4 className="font-semibold text-emerald-800 mb-1 text-xs">Savings Account</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-500">
                    <li>Save any amount according to ability.</li>
                    <li>Low interest rate.</li>
                    <li>Withdraw at any time using a debit card / ATM.</li>
                  </ul>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                  <h4 className="font-semibold text-amber-800 mb-1 text-xs">Fixed Deposit Account</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-500">
                    <li>Save a fixed sum for a specific tenure (e.g., 3, 9, or 12 months).</li>
                    <li>More competitive interest rates than normal savings.</li>
                    <li>Cannot withdraw before maturity, or interest will be reduced/cancelled.</li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-105">
                  <h4 className="font-semibold text-blue-800 mb-1 text-xs">Current Account</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-500">
                    <li>For personal or business transactions.</li>
                    <li>Payment can be made to another party by Cheque.</li>
                    <li>Usually no interest or subject to service charges.</li>
                    <li>Offers overdraft facilities (withdrawing beyond balance).</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "interest_math",
          title: lang === 'ms' ? "2. Pengiraan Faedah Simpanan" : "2. Savings Interest Calculations",
          icon: <HelpCircle className="w-5 h-5 text-indigo-600" />,
          content: (
            <div className="space-y-4 text-sm text-slate-600">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono">
                <h5 className="font-semibold text-slate-900 mb-2 font-display">
                  {lang === 'ms' ? "A. Formula Faedah Mudah" : "A. Simple Interest Formula"}
                </h5>
                <div className="text-lg text-blue-600 font-bold mb-1">I = Prt</div>
                <p className="text-xs text-slate-500">
                  {lang === 'ms' ? (
                    <>
                      Di mana:<br />
                      <span className="font-bold">I</span> = Jumlah faedah (RM)<br />
                      <span className="font-bold">P</span> = Prinsipal / modal asal (RM)<br />
                      <span className="font-bold">r</span> = Kadar faedah tahunan (perpuluhan)<br />
                      <span className="font-bold">t</span> = Tempoh simpanan dalam tahun
                    </>
                  ) : (
                    <>
                      Where:<br />
                      <span className="font-bold">I</span> = Interest earned (RM)<br />
                      <span className="font-bold">P</span> = Principal amount (RM)<br />
                      <span className="font-bold">r</span> = Annual interest rate (as a decimal)<br />
                      <span className="font-bold">t</span> = Savings term in years
                    </>
                  )}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono">
                <h5 className="font-semibold text-slate-900 mb-2 font-display">
                  {lang === 'ms' ? "B. Formula Faedah Kompaun" : "B. Compound Interest Formula"}
                </h5>
                <div className="text-lg text-blue-600 font-bold mb-1">MV = P(1 + r/n)^(nt)</div>
                <p className="text-xs text-slate-505">
                  {lang === 'ms' ? (
                    <>
                      Di mana:<br />
                      <span className="font-bold">MV</span> = Nilai matang (Jumlah terkumpul akhir)<br />
                      <span className="font-bold">P</span> = Prinsipal simpanan asal<br />
                      <span className="font-bold">r</span> = Kadar faedah tahunan (perpuluhan)<br />
                      <span className="font-bold">n</span> = Bilangan kali faedah dikompaun setahun (n=1 tahunan, n=2 setengah tahun, n=4 suku tahunan, n=12 bulanan)<br />
                      <span className="font-bold">t</span> = Tempoh simpanan dalam tahun
                    </>
                  ) : (
                    <>
                      Where:<br />
                      <span className="font-bold">MV</span> = Matured value (Total accumulated balance)<br />
                      <span className="font-bold">P</span> = Principal savings amount<br />
                      <span className="font-bold">r</span> = Yearly interest rate (as decimal)<br />
                      <span className="font-bold">n</span> = Number of periods interest is compounded per year (n=1 yearly, n=2 semi-annually, n=4 quarterly, n=12 monthly)<br />
                      <span className="font-bold">t</span> = Savings term in years
                    </>
                  )}
                </p>
              </div>
            </div>
          )
        },
        {
          id: "investments",
          title: lang === 'ms' ? "3. Pelaburan & Pulangan Pelaburan (ROI)" : "3. Investment & Return on Investment (ROI)",
          icon: <BookOpen className="w-5 h-5 text-violet-600" />,
          content: (
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                {lang === 'ms' 
                  ? "Pelaburan merupakan langkah alternatif bagi membolehkan peningkatan modal asal melalui perolehan keuntungan modal dan pendapatan semasa."
                  : "An investment is an alternative step for holding money to yield a future return in the form of capital gains and current income."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs">
                <div className="p-3 bg-violet-50 rounded-lg">
                  <span className="font-bold text-violet-800">{lang === 'ms' ? "Saham:" : "Shares:"}</span>{" "}
                  {lang === 'ms' 
                    ? "Syarikat menerbitkan saham untuk mengumpul modal. Pulangan diperoleh dalam bentuk dividen dan keuntungan modal."
                    : "Companies issue shares to raise capital. Returns come in dividends and capital gains."}
                </div>
                <div className="p-3 bg-violet-50 rounded-lg">
                  <span className="font-bold text-violet-800">{lang === 'ms' ? "Amanah Saham:" : "Unit Trust:"}</span>{" "}
                  {lang === 'ms' 
                    ? "Diuruskan oleh pengurus dana profesional. Menyebarkan risiko pelaburan melalui pelbagai portfolio saham."
                    : "Managed by professional fund managers. Spreads risk across a diversified portfolio."}
                </div>
                <div className="p-3 bg-violet-50 rounded-lg">
                  <span className="font-bold text-violet-800">{lang === 'ms' ? "Hartanah:" : "Real Estate:"}</span>{" "}
                  {lang === 'ms' 
                    ? "Pembelian tanah, kediaman, atau bangunan komersial. Pulangan datang melalui sewa atau peningkatan harga tanah."
                    : "Purchase of land, residential, or commercial buildings. Returns come as rent or land appreciation."}
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono mt-3">
                <h5 className="font-semibold text-slate-900 mb-1 font-display">
                  {lang === 'ms' ? "Formula Pulangan Atas Pelaburan (ROI)" : "Return on Investment (ROI) Formula"}
                </h5>
                <div className="text-lg text-violet-600 font-bold mb-1">ROI = (Total Return / Value of Initial Investment) × 100%</div>
                <p className="text-xs text-slate-500">
                  {lang === 'ms' 
                    ? "Jumlah pulangan merangkumi dividen + pendapatan sewa + keuntungan modal tolak sebarang kos pemilikan/penyelenggaraan."
                    : "Total return includes dividends + rental income + capital gains minus other ownership/maintenance costs."}
                </p>
              </div>
            </div>
          )
        },
        {
          id: "credit_debt",
          title: lang === 'ms' ? "4. Pengurusan Kredit & Hutang (Bab 3.2)" : "4. Credit & Debt Management (Chapter 3.2)",
          icon: <CreditCard className="w-5 h-5 text-amber-600" />,
          content: lang === 'ms' ? (
            <div className="space-y-2 text-sm text-slate-600">
              <p>Kredit ialah suatu kemudahan penangguhan pembayaran secara kontrak. Hutang pula ialah amaun tertunggak yang perlu diselesaikan.</p>
              <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1 mb-2">
                <li><span className="font-bold text-slate-700">Kelebihan Kredit:</span> Tidak memerlukan wang tunai serta-merta, selamat untuk pembelian baki dalam talian, pengumpulan mata ganjaran/rebat.</li>
                <li><span className="font-bold text-slate-700">Kelemahan Kredit:</span> Dikenakan caj kewangan (faedah tinggi sehingga 15-18% setahun), risiko perbelanjaan berlebihan, caj bayaran lewat.</li>
              </ul>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs">
                <p className="font-bold text-amber-800 mb-1">Faedah Sama Rata vs. Faedah Atas Baki:</p>
                <p><strong>Faedah Sama Rata:</strong> Dikira berdasarkan jumlah prinsipal asal untuk seluruh tempoh pinjaman. Ansuran bulanan adalah tetap (cth: pinjaman kereta/pinjaman peribadi).</p>
                <p className="mt-1"><strong>Faedah Atas Baki Kurangan:</strong> Faedah dikira berdasarkan baki pinjaman tertunggak bulanan tersebut. Digunakan untuk pinjaman perumahan.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-slate-600">
              <p>Credit is a contractual postponement of payment facility. Debt is the remaining borrowed amount to be settled.</p>
              <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1 mb-2">
                <li><span className="font-bold text-slate-700">Advantages of Credit:</span> No cash needed, secure online usage, point rewards/rebates.</li>
                <li><span className="font-bold text-slate-700">Disadvantages:</span> Incur finance charges (interest up to 15-18% p.a.), risk of uncontrolled overspending, late penalties.</li>
              </ul>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs">
                <p className="font-bold text-amber-800 mb-1">Flat Interest vs. Interest on Balance:</p>
                <p><strong>Flat Interest:</strong> Calculated on the original principal amount for the full term. Monthly installments are fixed (e.g., car loans/personal loans).</p>
                <p className="mt-1"><strong>Reducing Balance Interest:</strong> Interest calculated based on the remaining loan balance of that current month. Used for housing and flexible mortgages.</p>
              </div>
            </div>
          )
        }
      ]
    },
    form4: {
      title: lang === 'ms' 
        ? "Perancangan & Pengurusan Kewangan (Tingkatan 4 Bab 10)" 
        : "Financial Planning & Management (Form 4 Chapter 10)",
      sections: [
        {
          id: "five_steps",
          title: lang === 'ms' ? "1. Lima Langkah dalam Pengurusan Kewangan" : "1. Five Steps in Financial Management",
          icon: <Target className="w-5 h-5 text-sky-600" />,
          content: lang === 'ms' ? (
            <div className="space-y-2 text-sm text-slate-600">
              <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-500">
                <li><strong className="text-slate-800">Menetapkan matlamat kewangan:</strong> Menentukan matlamat khusus (Jangka Pendek: &lt; 1 tahun; Jangka Panjang: &gt; 5 tahun).</li>
                <li><strong className="text-slate-800">Menilai kedudukan kewangan:</strong> Mengukur aset berbanding liabiliti untuk mengetahui aliran tunai bersih.</li>
                <li><strong className="text-slate-800">Mewujudkan pelan kewangan:</strong> Alokasi pendapatan, simpanan, perbelanjaan tetap, dan perbelanjaan tidak tetap.</li>
                <li><strong className="text-slate-800">Melaksanakan pelan kewangan:</strong> Menukarkan pelan kepada tindakan berbelanja mengikut bajet.</li>
                <li><strong className="text-slate-800">Mengkaji semula dan menyemak kemajuan:</strong> Memastikan sasaran simpanan bulanan dipatuhi secara berkala.</li>
              </ol>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-slate-600">
              <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-500">
                <li><strong className="text-slate-800">Setting goals:</strong> Prioritize specific goals (Short-Term: &lt; 1 year; Long-Term: &gt; 5 years).</li>
                <li><strong className="text-slate-800">Evaluating financial status:</strong> Benchmark assets against liabilities to check net cash flows.</li>
                <li><strong className="text-slate-800">Creating financial plan:</strong> Income, savings, fixed expenses, and variable expenses.</li>
                <li><strong className="text-slate-800">Carrying out financial plan:</strong> Transition plans into budget execution.</li>
                <li><strong className="text-slate-800">Reviewing and revising progress:</strong> Regularly check that savings targets are positive and achievable.</li>
              </ol>
            </div>
          )
        },
        {
          id: "smart_framework",
          title: lang === 'ms' ? "2. Konsep Matlamat Kewangan SMART" : "2. The SMART Goals Concept",
          icon: <CheckCircle className="w-5 h-5 text-sky-600" />,
          content: lang === 'ms' ? (
            <div className="space-y-2 text-sm text-slate-600">
              <p>Matlamat kewangan yang dibina mestilah mematuhi kriteria konsep SMART:</p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2">
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">S</div>
                  <div className="text-xs font-semibold text-slate-700">Specific (Khusus)</div>
                  <div className="text-[10px] text-slate-400">Sasaran barangan yang khusus.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">M</div>
                  <div className="text-xs font-semibold text-slate-700">Measurable (Boleh diukur)</div>
                  <div className="text-[10px] text-slate-400">Kos/Amaun yang tepat.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">A</div>
                  <div className="text-xs font-semibold text-slate-700 font-sans">Attainable (Boleh dicapai)</div>
                  <div className="text-[10px] text-slate-400">Mampu dilaksanakan dari segi tunai.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">R</div>
                  <div className="text-xs font-semibold text-slate-700">Realistic (Realistik)</div>
                  <div className="text-[10px] text-slate-400 font-sans">Sesuai dengan punca pendapatan.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">T</div>
                  <div className="text-xs font-semibold text-slate-700 font-sans">Time-bound (Tempoh masa)</div>
                  <div className="text-[10px] text-slate-400">Menetapkan tempoh sasaran bulan/tahun.</div>
                </div>
              </div>
              <p className="text-xs text-rose-500 font-semibold mt-2">✨ Tip Utama: Belanjawan mestilah mendahulukan simpanan sekurang-kurangnya 10% daripada jumlah pendapatan sebelum merangka perbelanjaan fixed atau variable.</p>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-slate-600">
              <p>Financial goals set should adhere strictly to the SMART concept criteria:</p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2">
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">S</div>
                  <div className="text-xs font-semibold text-slate-700 font-sans">Specific</div>
                  <div className="text-[10px] text-slate-400">Aim for an exact item.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">M</div>
                  <div className="text-xs font-semibold text-slate-700 font-sans">Measurable</div>
                  <div className="text-[10px] text-slate-400">Exact cost/amount.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">A</div>
                  <div className="text-xs font-semibold text-slate-700 font-sans">Achievable</div>
                  <div className="text-[10px] text-slate-400">Financially possible.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">R</div>
                  <div className="text-xs font-semibold text-slate-700 font-sans">Realistic</div>
                  <div className="text-[10px] text-slate-400">Fits your income.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">T</div>
                  <div className="text-xs font-semibold text-slate-700 font-sans">Time-bound</div>
                  <div className="text-[10px] text-slate-400">Clear end month.</div>
                </div>
              </div>
              <p className="text-xs text-rose-500 font-semibold mt-2">✨ Rule of Thumb: Budget to save at least 10% of total income first prior to allocating any fixed or variable expenses.</p>
            </div>
          )
        }
      ]
    },
    form5: {
      title: lang === 'ms' 
        ? "Risiko dan Perlindungan Insurans (Tingkatan 5 Bab 3)" 
        : "Risk and Insurance Coverage (Form 5 Chapter 3)",
      sections: [
        {
          id: "insurance_types",
          title: lang === 'ms' ? "1. Definisi & Jenis Insurans (Hayat & Am)" : "1. What is Insurance / Life & General",
          icon: <Shield className="w-5 h-5 text-rose-600" />,
          content: lang === 'ms' ? (
            <div className="space-y-4 text-sm text-slate-600">
              <p>Insurans berfungsi memindahkan risiko daripada individu kepada organisasi insurans di bawah kontrak bertulis (polisi). Pemegang polisi membayar premium, dan syarikat berjanji memberikan ganti rugi (indemniti) sekiranya berlaku kerugian.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100">
                  <h4 className="font-semibold text-rose-800 text-xs mb-1">Insurans Hayat</h4>
                  <p className="text-[11px] text-slate-500 mb-2">Menjamin pembayaran faedah kewangan sekiranya berlaku: kematian, penyakit kritikal, atau hilang keupayaan kekal menyeluruh.</p>
                  <div className="bg-white p-2 rounded border border-rose-100 font-mono text-[10px]">
                    <strong>Formula Pengiraan Premium:</strong><br />
                    Premium = (Nilai Muka Polisi / RM x) × (Kadar Premium per RM x)
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-semibold text-slate-800 text-xs mb-1">Insurans Am</h4>
                  <ul className="list-disc pl-4 text-[11px] text-slate-500 space-y-1">
                    <li><strong>Motor:</strong> Melindungi kecederaan pihak ketiga, kerosakan harta benda, atau kerosakan kenderaan sendiri.</li>
                    <li><strong>Kebakaran:</strong> Melindungi risiko harta benda/kediaman akibat kebakaran tidak sengaja atau letupan.</li>
                    <li><strong>Perubatan & Kesihatan:</strong> Meliputi kos rawatan hospital dan pembedahan bagi penyakit kritikal.</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-sm text-slate-600">
              <p>Insurance transfers risk from an individual to an insurance organization under a signed contract. The policyholder pays a premium, and the company promises indemnity (pre-loss restoration) if losses occur.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100">
                  <h4 className="font-semibold text-rose-800 text-xs mb-1">Life Insurance</h4>
                  <p className="text-[11px] text-slate-500 mb-2">Guarantees payment of stated benefits in event of: death, critical illness, or permanent loss of ability.</p>
                  <div className="bg-white p-2 rounded border border-rose-100 font-mono text-[10px]">
                    <strong>Premium Calculation Formula:</strong><br />
                    Premium = (Face Value of Policy / RM x) × (Rate per RM x)
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-semibold text-slate-800 text-xs mb-1">General Insurance</h4>
                  <ul className="list-disc pl-4 text-[11px] text-slate-500 space-y-1">
                    <li><strong>Motor:</strong> Coverage of third-party injury, property loss, or own vehicle damage.</li>
                    <li><strong>Fire:</strong> Protection for residential or commercial property due to accidental fire/explosions.</li>
                    <li><strong>Medical & Health:</strong> Coverage for hospitalization & surgical costs, or critical illness bills.</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "coinsurance",
          title: lang === 'ms' ? "2. Ko-insurans / Deduktibel" : "2. Co-insurance / Deductibles",
          icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
          content: lang === 'ms' ? (
            <div className="space-y-3 text-sm text-slate-600">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900 leading-relaxed">
                <strong>Deduktibel:</strong> Amaun yang WAJIB ditanggung oleh pemegang polisi sendiri terlebih dahulu sebelum melayakkan mereka menerima tuntutan bayaran daripada syarikat insurans.
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-xs">
                <h5 className="font-semibold text-slate-900 mb-2 font-display">A. Ko-insurans dalam Insurans Harta (Hartanah)</h5>
                <p className="text-slate-500 mb-1">Jumlah Insurans Diperlukan = Peratusan Ko-insurans (cth: 80%) × Nilai Boleh Diinsuranskan Harta</p>
                <div className="space-y-2 mt-2 font-sans text-xs text-slate-500">
                  <p><strong>Kes 1 (Diinsuranskan &ge; Diperlukan):</strong> Bayaran Ganti Rugi = Jumlah Kerugian - Deduktibel (bila kerugian &lt; nilai polisi)</p>
                  <p><strong>Kes 2 (Diinsuranskan &lt; Diperlukan):</strong> Bayaran Ganti Rugi = (Nilai Diinsuranskan / Nilai Diperlukan × Kerugian) - Deduktibel</p>
                  <p><strong>Kes 3 (Kerugian Menyeluruh):</strong> Bayaran Ganti Rugi = Jumlah Diinsuranskan - Deduktibel</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-xs">
                <h5 className="font-semibold text-slate-900 mb-1 font-display">B. Ko-insurans dalam Insurans Kesihatan</h5>
                <p className="text-slate-500 font-sans">Nisbah perkongsian kos tetap (cth: 80/20). Syarikat insurans membayar 80% dan pemegang polisi menanggung 20% kos tuntutan selepas potongan deduktibel.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-slate-600">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs leading-relaxed text-amber-900">
                <strong>Deductible:</strong> The amount that MUST be borne by the policyholder first before they can claim from the insurance company.
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-xs">
                <h5 className="font-semibold text-slate-900 mb-2 font-display">A. Co-insurance in Property Insurance</h5>
                <p className="text-slate-500 mb-1">Amount of Required Insurance = Percentage of Co-insurance (e.g. 80%) × Insurable Value of Property</p>
                <div className="space-y-2 mt-2">
                  <p><strong>Case 1 (Insured &ge; Required):</strong> Compensation = Loss - Deductible (if loss &lt; insured purchased amount)</p>
                  <p><strong>Case 2 (Insured &lt; Required):</strong> Compensation = (Purchased / Required × Loss) - Deductible</p>
                  <p><strong>Case 3 (Total Loss):</strong> Compensation = Insurance Purchased - Deductible</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-xs">
                <h5 className="font-semibold text-slate-900 mb-1 font-display">B. Co-insurance in Health Insurance</h5>
                <p className="text-slate-500 font-sans">Stipulated sharing split (e.g., 80/20). Insurance pays 80% and the policyholder pays 20% of the claimable balance (after deductible has been subtracted).</p>
              </div>
            </div>
          )
        }
      ]
    },
    form5_ch4: {
      title: lang === 'ms' 
        ? "Matematik Pengguna: Percukaian (Tingkatan 5 Bab 4)" 
        : "Consumer Mathematics: Taxation (Form 5 Chapter 4)",
      sections: [
        {
          id: "tax_intro",
          title: lang === 'ms' ? "1. Tujuan Percukaian" : "1. Purpose of Taxation",
          icon: <BookOpen className="w-5 h-5 text-blue-600" />,
          content: lang === 'ms' ? (
            <div className="space-y-2 text-sm text-slate-600">
              <p><strong>Percukaian</strong> ialah satu proses pemungutan hasil (wang) daripada individu atau syarikat untuk kegunaan pembangunan negara dengan menyediakan pelbagai kemudahan dan keselamatan demi rakyat.</p>
              <h4 className="font-semibold text-slate-800 text-xs mt-2 uppercase text-blue-900">Tujuan-tujuan Utama Percukaian:</h4>
              <ul className="list-decimal pl-5 space-y-1 text-xs text-slate-500">
                <li><strong className="text-slate-705">Sumber Hasil Kerajaan:</strong> Untuk mentadbir negara, membiayai infrastruktur pembangunan, serta merapatkan jurang kemiskinan.</li>
                <li><strong className="text-slate-705">Alat Pelaksanaan Polisi Kerajaan:</strong> Contohnya pelepasan cukai perubatan untuk memupuk komuniti penyayang, atau Cukai Keuntungan Tanah Nyata (CKTN) untuk mengawal spekulasi hartanah.</li>
                <li><strong className="text-slate-705">Kawalan Penjualan Barang:</strong> Mengenakan cukai tinggi pada barangan tertentu seperti tembakau, judi, atau alkohol untuk mengekang pengambilan.</li>
                <li><strong className="text-slate-705">Penstabil Kewangan:</strong> Mengawal kestabilan permintaan dan membendung inflasi mengikut edaran ekonomi.</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-slate-600">
              <p><strong>Taxation</strong> is a process of revenue (money) collection from individuals or companies for use in the country's development by providing various facilities and safety measures for all citizens.</p>
              <h4 className="font-semibold text-slate-800 text-xs mt-2 uppercase text-blue-900">Key Purposes of Taxation:</h4>
              <ul className="list-decimal pl-5 space-y-1 text-xs text-slate-500">
                <li><strong className="text-slate-700">Source of Government Revenue:</strong> To govern the country, fund development infrastructure, and distribute wealth inequalities.</li>
                <li><strong className="text-slate-700">Government Policy Implementation Tool:</strong> Examples include medical reliefs to cultivate a caring community, or Real Property Gains Tax (RPGT) to control property bubbles.</li>
                <li><strong className="text-slate-700">Control of Sales:</strong> Imposing high taxes on certain goods like tobacco, gambling, or alcohol to discourage intake.</li>
                <li><strong className="text-slate-700">Financial Stabilizer:</strong> In some economic states, tax variations stabilize demand and manage inflation rates.</li>
              </ul>
            </div>
          )
        },
        {
          id: "tax_types",
          title: lang === 'ms' ? "2. Lima Jenis Cukai Terbitan di Malaysia" : "2. Five Types of Taxes in Malaysia",
          icon: <AlertCircle className="w-5 h-5 text-blue-600" />,
          content: lang === 'ms' ? (
            <div className="space-y-3 text-sm text-slate-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="font-bold text-blue-800">1. Cukai Pendapatan:</span> 
                  <p className="mt-0.5 text-slate-500">Dikenakan atas keuntungan individu/syarikat bekerja. Dikutip oleh <strong>LHDN</strong> (Lembaga Hasil Dalam Negeri).</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="font-bold text-blue-800">2. Cukai Jalan:</span> 
                  <p className="mt-0.5 text-slate-500">Dikenakan kepada pemilik kenderaan mengikut kapasiti injin (cc). Dikutip oleh <strong>JPJ</strong> (Jabatan Pengangkutan Jalan).</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="font-bold text-blue-800">3. Cukai Pintu (Taksiran):</span> 
                  <p className="mt-0.5 text-slate-500">Dikenakan atas pemilik premis kediaman/kedai untuk membiayai perkhidmatan perbandaran (kutipan sampah, rawatan longkang). Dikutip oleh <strong>Pihak Berkuasa Tempatan (PBT)</strong>.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="font-bold text-blue-800">4. Cukai Tanah (Quit Rent):</span> 
                  <p className="mt-0.5 text-slate-500">Dikenakan ke atas pemilik tanah mengikut kawasan luas unit tanah. Dikutip oleh <strong>Pejabat Tanah Negeri</strong>.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl col-span-1 md:col-span-2">
                  <span className="font-bold text-blue-800">5. Cukai Jualan & Perkhidmatan (SST):</span> 
                  <p className="mt-0.5 text-slate-500">Cukai penggunaan. Cukai perkhidmatan ialah <strong>6%</strong> secara am (cth: hotel, restoren, pelancongan). Cukai jualan ialah 5% atau 10%. Dikutip oleh <strong>JKDM</strong> (Kastam DiRaja Malaysia).</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-slate-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="font-bold text-blue-800">1. Income Tax:</span> 
                  <p className="mt-0.5 text-slate-500">Imposed on earnings of individuals or companies. Collected by <strong>LHDN</strong> (Inland Revenue Board/Lembaga Hasil Dalam Negeri).</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="font-bold text-blue-800">2. Road Tax:</span> 
                  <p className="mt-0.5 text-slate-500">Levied on vehicle owners. Road tax matches engine capacity (cc). Collected by <strong>JPJ</strong> (Road Transport Dept).</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="font-bold text-blue-800">3. Property Assessment Tax:</span> 
                  <p className="mt-0.5 text-slate-500">Imposed on properties (houses, shops) to maintain municipal cleaning, rubbish clearance, and parks. Collected by <strong>Local Authorities</strong>.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="font-bold text-blue-800">4. Quit Rent:</span> 
                  <p className="mt-0.5 text-slate-500">Tax levied on land owners based on total land area. Collected by <strong>State Land Offices</strong>.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl col-span-1 md:col-span-2">
                  <span className="font-bold text-blue-800">5. Sales & Service Tax (SST):</span> 
                  <p className="mt-0.5 text-slate-500">A consumption-based tax. Service tax is general rate <strong>6%</strong> (e.g., hotels, credit cards). Sales tax stands at 5% or 10% on manufactures. Collected by <strong>JKDM</strong> (Customs).</p>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "tax_math",
          title: lang === 'ms' ? "3. Formula Matematik Cukai Pendapatan & PCB" : "3. Income Tax Math & Deductions (PCB)",
          icon: <HelpCircle className="w-5 h-5 text-blue-600" />,
          content: lang === 'ms' ? (
            <div className="space-y-3 text-sm text-slate-600">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-xs space-y-2">
                <div>
                  <strong>Formula Pendapatan Bercukai:</strong><br />
                  <span className="text-blue-600 font-bold">Pendapatan Bercukai = Jumlah Pendapatan Tahunan &minus; Pengecualian Cukai &minus; Pelepasan Cukai</span>
                </div>
                <div className="border-t border-slate-200 pt-2 font-sans text-xs">
                  <strong>Cukai Pendapatan Perlu Dibayar:</strong><br />
                  <span className="text-blue-600 font-bold">Cukai Perlu Dibayar = Cukai Kasar (daripada jadual kadar) &minus; Rebat Cukai</span>
                </div>
              </div>
              <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1">
                <li><strong>Pengecualian Cukai:</strong> Sumbangan kepada perpustakaan, pusat kesihatan, atau badan kebajikan terakreditasi kerajaan.</li>
                <li><strong>Pelepasan Cukai:</strong> Caruman KWSP, insurans hayat/perubatan, rawatan perubatan ibu bapa, pemeriksaan gaya hidup peribadi/pasangan.</li>
                <li><strong>Rebat Cukai:</strong> Rebat <strong>RM 400</strong> diberikan kepada pembayar cukai sekiranya pendapatan bercukai tidak melebihi <strong>RM 35,000</strong>, berserta jumlah bayaran zakat / fitrah yang ditunjukkan resit resmi.</li>
                <li><strong>Perbandingan PCB:</strong> PCB dibayar setiap bulan secara potongan gaji. Sekiranya <code>Cukai Perlu Dibayar &gt; PCB</code>, pembayar cukai perlu membayar <em>baki kurang bayar</em> ke LHDN. Sekiranya <code>Cukai Perlu Dibayar &lt; PCB</code>, LHDN akan <em>memulangkan lebihan cukai</em> kepada mereka.</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-slate-600">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-xs space-y-2">
                <div>
                  <strong>Chargeable Income Formula:</strong><br />
                  <span className="text-blue-600 font-bold">Chargeable Income = Total Income &minus; Tax Exemptions &minus; Tax Reliefs</span>
                </div>
                <div className="border-t border-slate-200 pt-2 font-sans text-xs">
                  <strong>Malaysian Tax Payable:</strong><br />
                  <span className="text-blue-600 font-bold">Payable Tax = (Income Tax computed from Brackets Table) &minus; Tax Rebates</span>
                </div>
              </div>
              <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1">
                <li><strong>Tax Exemption:</strong> Donations to library, approved trust charity funds, state medical/culture.</li>
                <li><strong>Tax Relief:</strong> EPF contributions, life/medical insurance, medical cure for parents, personal/spouse, tertiary education.</li>
                <li><strong>Tax Rebate:</strong> Rebate of <strong>RM 400</strong> is granted if chargeable income does not exceed <strong>RM 35,000</strong>, plus any <strong>Zakat / Fitrah</strong> payment receipts.</li>
                <li><strong>PCB comparison:</strong> Monthly PCB pays tax advance. If <code>Tax Payable &gt; PCB</code>, student calculates <em>shortfall</em> (taxpayer pays shortfall to LHDN). If <code>Tax Payable &lt; PCB</code>, taxpayer receives an <em>excess refund</em>.</li>
              </ul>
            </div>
          )
        }
      ]
    }
  };

  const selectedNotes = notesData[activeSubTab];

  return (
    <div id="notes-view-root" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar selectors */}
      <div className="lg:col-span-1 space-y-2">
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-101">
          <h3 className="font-display font-bold text-slate-800 text-sm mb-3 uppercase tracking-wider">
            {lang === 'ms' ? "Bab Silibus" : "Syllabus Chapters"}
          </h3>
          <div className="flex flex-col space-y-1.5">
            <button
              id="btn-form3"
              onClick={() => setActiveSubTab('form3')}
              className={`p-3 text-left text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-2.5 ${
                activeSubTab === 'form3'
                  ? 'bg-blue-600 text-white shadow-blue-100 shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <PiggyBank className="w-4 h-4" />
              {lang === 'ms' ? "Tingkatan 3 Bab 3" : "Form 3 Chapter 3"}
            </button>
            <button
              id="btn-form4"
              onClick={() => setActiveSubTab('form4')}
              className={`p-3 text-left text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-2.5 ${
                activeSubTab === 'form4'
                  ? 'bg-blue-600 text-white shadow-blue-100 shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Target className="w-4 h-4" />
              {lang === 'ms' ? "Tingkatan 4 Bab 10" : "Form 4 Chapter 10"}
            </button>
            <button
              id="btn-form5"
              onClick={() => setActiveSubTab('form5')}
              className={`p-3 text-left text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-2.5 ${
                activeSubTab === 'form5'
                  ? 'bg-blue-600 text-white shadow-blue-100 shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Shield className="w-4 h-4" />
              {lang === 'ms' ? "Tingkatan 5 Bab 3" : "Form 5 Chapter 3"}
            </button>
            <button
              id="btn-form5-ch4"
              onClick={() => setActiveSubTab('form5_ch4')}
              className={`p-3 text-left text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-2.5 ${
                activeSubTab === 'form5_ch4'
                  ? 'bg-blue-600 text-white shadow-blue-100 shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {lang === 'ms' ? "Tingkatan 5 Bab 4" : "Form 5 Chapter 4"}
            </button>
          </div>
        </div>

        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-[11px] text-blue-800 leading-relaxed">
          <span className="font-semibold block mb-1">
            {lang === 'ms' ? "👩‍🏫 Tip Pendidikan" : "👩‍🏫 Educational Tip"}
          </span>
          {lang === 'ms' 
            ? "Minda Pembelajaran mendedahkan rumusan formula eksplisit berserta tafsirannya mengikut acuan Kementerian Pendidikan Malaysia (KPM) bilamana anda mengulang kaji mata pelajaran Matematik Pengguna!" 
            : "These learning notes explicitly summarize the exact formulas and definitions required by the Ministry of Education Malaysia (KPM) syllabus for SPM candidates! Use them side-by-side with the Calculators to study the equations."}
        </div>
      </div>

      {/* Main content display */}
      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100">
          <div className="border-b border-slate-101 pb-4 mb-4">
            <span className="text-[10px] bg-blue-50 text-blue-700 rounded-full font-bold px-2.5 py-1 tracking-wide uppercase border border-blue-100">
              {lang === 'ms' ? "Meja Study Interaktif" : "Interactive Study Desk"}
            </span>
            <h2 className="font-display font-bold text-slate-800 text-lg sm:text-xl mt-1.5">{selectedNotes.title}</h2>
          </div>

          <div className="space-y-6">
            {selectedNotes.sections.map((sec, index) => (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="border border-slate-100/80 rounded-xl p-4 bg-slate-50/50"
              >
                <div className="flex items-center gap-3 mb-3 border-b border-slate-100 pb-2">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    {sec.icon}
                  </div>
                  <h3 className="font-display font-bold text-slate-800 text-sm">{sec.title}</h3>
                </div>
                {sec.content}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
