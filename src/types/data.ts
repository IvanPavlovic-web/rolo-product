import type { NavItem, Service, GalleryItem, Testimonial, FAQ } from "./index";
import { GENERATED_GALLERY_ITEMS } from "../generated/gallery-images";

export const NAV_ITEMS: NavItem[] = [
  { label: "Početna", href: "#hero" },
  { label: "Usluge", href: "#usluge" },
  { label: "O nama", href: "#o-nama" },
  { label: "Galerija", href: "#galerija" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

export const SERVICES: Service[] = [
  {
    id: "prozori",
    title: "PVC Prozori",
    description:
      "Izrada PVC prozora po mjeri u različitim sistemima otvaranja, uključujući fiksne, jednokrilne, dvokrilne, klizne i okretno-nagibne varijante. Fokus na visoku termo i zvučnu izolaciju.",
    icon: "",
    features: [
      "5 i 6-komorni profili visoke energetske efikasnosti",
      "Dvostruko i trostruko izolaciono staklo",
      "Širok izbor dekora i boja",
      "Povećana sigurnost i protivprovalna zaštita",
    ],
  },
  {
    id: "vrata",
    title: "PVC Vrata",
    description:
      "Ulazna i balkonska vrata izrađena od PVC profila, prilagođena modernim standardima sigurnosti, izolacije i dugotrajnosti uz minimalno održavanje.",
    icon: "",
    features: [
      "Klasična i klizna rješenja",
      "Termoizolacioni paneli visoke gustine",
      "Višetačkasti sistem zaključavanja",
      "Potpuna prilagodba dimenzijama i dizajnu",
    ],
  },
  {
    id: "ostave",
    title: "PVC Ostave",
    description:
      "Specijalizovana izrada PVC konstrukcija za zatvaranje i organizaciju prostora na terasama, balkonima i dvorištima, uz zadržavanje estetskog i funkcionalnog kvaliteta.",
    icon: "",
    features: [
      "Izrada po tačnim mjerama prostora",
      "Otpornost na vremenske uslove",
      "Jednostavno održavanje i čišćenje",
      "Savremeni minimalistički dizajn",
    ],
  },
  {
    id: "montaza",
    title: "Stručna montaža",
    description:
      "Profesionalna ugradnja PVC stolarije na stambenim, poslovnim i apartmanskim objektima uz precizno mjerenje, pravilnu izolaciju i završnu obradu.",
    icon: "",
    features: [
      "Precizno mjerenje na objektu",
      "Iskusni i obučeni monteri",
      "Zaptivanje i termoizolaciona obrada spojeva",
      "Završno čišćenje i kontrola kvaliteta",
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = GENERATED_GALLERY_ITEMS.map((item) => ({
  ...item,
  image: {
    ...item.image,
  },
}));

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Milica Janković",
    location: "Herceg Novi",
    text: "Zamijenili smo sve prozore u kući. Razlika u toplini zimi je ogromna, a montaža je bila brza i čista. Preporučujem svima.",
    rating: 5,
  },
  {
    id: "2",
    name: "Dragan Perović",
    location: "Kotor",
    text: "Napravili su nam ostavu na terasi po mjeri. Odlično riješenje koje nismo nigdje drugdje mogli da nađemo.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ana Tomović",
    location: "Budva",
    text: "Profesionalan tim, tačni i uredni. Vrata izgledaju odlično i kvalitet je superioran u odnosu na cijenu.",
    rating: 5,
  },
];

export const FAQS: FAQ[] = [
  {
    question: "Da li dolazite na mjerenje po cijeloj Crnoj Gori?",
    answer:
      "Da, pokrivamo cijelu Crnu Goru – od Herceg Novog do Ulcinja i Podgorice. Dolazimo na mjerenje bez naknade za lokacije do 50km.",
  },
  {
    question: "Koliko traje izrada i ugradnja prozora?",
    answer:
      "Standardna narudžba se isporučuje za 7–14 radnih dana od potvrde mjere. Montaža se dogovara odmah po preuzimanju.",
  },
  {
    question: "Da li možete napraviti ostavu koja nije standardnog oblika?",
    answer:
      "Apsolutno. Svaka ostava se radi po mjeri prostora koji nam navedete. Dolazimo da izmjerimo i osmislimo optimalno rješenje.",
  },
  {
    question: "Koje boje PVC profila su dostupne?",
    answer:
      "Osim bijele, nudimo foliranje u drvo-dekor, antracit sivu, crnu i druge RAL boje po dogovoru.",
  },
  {
    question: "Da li dajete garanciju?",
    answer:
      "Da – garancija na profil i okove je 5 godina, na staklo 2 godine, a na ugradnju 1 godina.",
  },
];

export const LOCATIONS = [
  "Herceg Novi",
  "Zelenik",
  "Igalo",
  "Bijela",
  "Kotor",
  "Tivat",
  "Budva",
  "Bar",
  "Ulcinj",
  "Podgorica",
];
