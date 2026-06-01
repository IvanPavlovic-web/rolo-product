import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Grainient from "../components/Grainient";
import "./FAQ.css";

const FAQ_DATA = [
  {
    question: "Koje vrste stolarije izrađujete?",
    answer:
      "Radimo PVC i ALU stolariju. Prozori, klizna i ulazna vrata, roletne, komarnici. Sve po mjeri, sa garancijom na kvalitet.",
  },
  {
    question: "Da li radite prozore po mjeri?",
    answer:
      "Da, svaki otvor izmjerimo i izrađujemo tačno prema dimenzijama. Nema gotovih rješenja, sve se radi po vašim mjerama.",
  },
  {
    question: "Koliko se čeka na isporuku i montažu?",
    answer:
      "Uglavnom 4 do 6 sedmica od potvrde narudžbe. Zavisi od obima posla i sezone, ali se trudimo da se rokova pridržavamo. Tačan rok ćete znati prije potpisivanja ugovora.",
  },
  {
    question: "Kako mogu dobiti ponudu?",
    answer:
      "Pozovite nas ili pošaljite upit putem kontakt forme. Dogovorimo se da izađemo na lice mjesta, izmjerimo i damo vam ponudu sa specifikacijama i cijenom. Bez obaveza.",
  },
  {
    question: "Kakva je garancija na proizvode?",
    answer:
      "Dajemo 5 godina garancije na profile i okove. Plus garancija na samu ugradnju. Ako se nešto pojavi u tom periodu, dolazimo i rješavamo.",
  },
  {
    question: "Da li vi vršite montažu?",
    answer:
      "Da, naš tim radi montažu na terenu. Dolazimo na vašu adresu, ugrađujemo, čistimo za sobom. Ne morate nikog drugog da zovete.",
  },
  {
    question: "Može li se dogovoriti izlazak na teren prije ponude?",
    answer:
      "Može. Izlazimo da izmjerimo i procijenimo situaciju. Nakon toga dobijate tačnu ponudu sa svim detaljima i rokom isporuke.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      {/* Animirana pozadina */}
      <div className="faq__background">
        <Grainient color1="#2f7cff" color2="#f4f6fa" color3="#2467e8" />
      </div>

      <div className="faq__inner">
        <div className="section-header animate-in faq__header">
          <span className="section-tag faq__tag">Česta pitanja</span>
          <h2 id="faq-title" className="section-title faq__title">
            Odgovori na najčešća pitanja
            <br />o našoj stolariji i uslugama.
          </h2>
        </div>

        <div className="faq__accordion" role="list">
          {FAQ_DATA.map((item, index) => (
            <motion.div
              key={index}
              className={`faq__accordion-item ${
                index !== FAQ_DATA.length - 1
                  ? "faq__accordion-item--divider"
                  : ""
              }`}
              role="listitem"
            >
              <button
                type="button"
                className="faq__accordion-trigger"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => toggleItem(index)}
              >
                <Plus
                  className={`faq__accordion-icon ${
                    activeIndex === index ? "faq__accordion-icon--open" : ""
                  }`}
                  size={20}
                  aria-hidden="true"
                />
                <span>{item.question}</span>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: 0.1,
                    }}
                    className="faq__accordion-panel"
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                  >
                    <p className="faq__accordion-answer">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
