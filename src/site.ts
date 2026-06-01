export const SITE_SECTIONS = [
  { label: "Usluge", href: "#usluge" },
  { label: "O nama", href: "#o-nama" },
  { label: "Galerija", href: "#galerija" },
  { label: "Utisci", href: "#utisci" },
  { label: "FAQ", href: "#faq" },
] as const;

export const FOOTER_SECTIONS = [
  { label: "Početna", href: "#hero" },
  { label: "Usluge", href: "#usluge" },
  { label: "O nama", href: "#o-nama" },
  { label: "Galerija", href: "#galerija" },
  { label: "Utisci", href: "#utisci" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const SITE_INFO = {
  businessName: "Rolo Product d.o.o.",
  brandName: "Rolo Product",
  shortBrand: "ROLO PRODUCT",
  phoneDisplay: "+382 68 119 825",
  phoneHref: "tel:+38268119825",
  email: "eosmontenegro@gmail.com",
  emailHref: "mailto:eosmontenegro@gmail.com",
  addressLine1: "Aleksandrova obala 6",
  addressLine2: "Zelenika, Herceg Novi, Crna Gora",
  fullAddress: "Aleksandrova obala 6, Zelenika, Herceg Novi, Crna Gora",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Aleksandrova+obala+6,+Zelenika,+Herceg+Novi",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Aleksandrova+obala+6,+Zelenika,+Herceg+Novi&z=16&output=embed",
  serviceArea: "Herceg Novi i šire područje Crne Gore",
} as const;

export const LEGAL_DOCUMENTS = [
  {
    id: "privacy",
    label: "Politika privatnosti",
    title: "Politika privatnosti",
    intro:
      "Ova politika objašnjava kako Rolo Product d.o.o. prikuplja, koristi i čuva podatke o ličnosti kada koristite sajt ili nas kontaktirate radi informacija, ponude, mjerenja ili izvođenja radova.",
    sections: [
      {
        title: "Rukovalac podacima",
        body: [
          `Rukovalac zbirke ličnih podataka je ${SITE_INFO.businessName}, sa sjedištem na adresi ${SITE_INFO.fullAddress}.`,
          `Za sva pitanja u vezi sa privatnošću i ostvarivanjem prava možete nas kontaktirati na ${SITE_INFO.email} ili ${SITE_INFO.phoneDisplay}.`,
        ],
      },
      {
        title: "Podaci koje obrađujemo",
        body: [
          "Kada nas kontaktirate, možemo obrađivati ime i prezime, broj telefona, e-mail adresu, adresu objekta, mjesto izvođenja radova, sadržaj upita, fotografije ili mjere koje nam dobrovoljno dostavite i podatke potrebne za pripremu ponude ili realizaciju usluge.",
          "Prilikom posjete sajtu mogu se obrađivati osnovni tehnički podaci kao što su IP adresa, tip uređaja i pregledača, vrijeme pristupa, stranice koje se otvaraju i podaci potrebni za bezbjedan rad sajta.",
          "Ne tražimo posebne kategorije ličnih podataka. Molimo vas da nam ne šaljete podatke koji nijesu potrebni za upit, ponudu ili realizaciju usluge.",
        ],
      },
      {
        title: "Svrhe i pravni osnov",
        body: [
          "Podatke obrađujemo radi odgovora na upit, pripreme ponude, zakazivanja izlaska na teren, mjerenja, izrade, isporuke, montaže, fakturisanja, reklamacija i komunikacije nakon završetka posla.",
          "Pravni osnov obrade može biti preduzimanje radnji na vaš zahtjev prije zaključenja ugovora, izvršenje ugovora, poštovanje zakonskih obaveza, vaš pristanak ili zakoniti interes za bezbjednost sajta, evidenciju komunikacije i zaštitu pravnih interesa.",
          "Ako se obrada zasniva na pristanku, pristanak možete opozvati u svakom trenutku, bez uticaja na zakonitost obrade izvršene prije opoziva.",
        ],
      },
      {
        title: "Čuvanje podataka",
        body: [
          "Podatke iz upita čuvamo onoliko dugo koliko je potrebno da odgovorimo i vodimo komunikaciju o ponudi. Podatke vezane za realizovane poslove, račune, garancije, reklamacije i poslovnu dokumentaciju čuvamo u rokovima propisanim važećim zakonima Crne Gore.",
          "Kada podaci više nijesu potrebni za svrhu zbog koje su prikupljeni, brišemo ih ili anonimizujemo, osim kada postoji zakonska obaveza čuvanja ili potreba zaštite pravnih interesa.",
        ],
      },
      {
        title: "Primaoci i prenos podataka",
        body: [
          "Lične podatke ne prodajemo. Podaci mogu biti dostupni licima koja nam pružaju tehničku podršku, hosting, e-mail usluge, računovodstvo, pravnu podršku, usluge isporuke ili montaže, samo u obimu koji je potreban za konkretnu svrhu.",
          "Podatke možemo dostaviti nadležnim organima kada je to propisano zakonom ili potrebno radi zaštite prava i pravnih interesa.",
          "Ako se podaci prenose van Crne Gore, to radimo samo kada postoji odgovarajući pravni osnov i mjere zaštite predviđene propisima o zaštiti podataka o ličnosti.",
        ],
      },
      {
        title: "Vaša prava",
        body: [
          "U skladu sa Zakonom o zaštiti podataka o ličnosti možete tražiti obavještenje o tome da li obrađujemo vaše podatke, pristup podacima, ispravku netačnih ili dopunu nepotpunih podataka, brisanje podataka kada obrada nije u skladu sa zakonom, kao i prigovor kada su ispunjeni zakonski uslovi.",
          "Zahtjev možete poslati na naše kontakt podatke. Prije postupanja po zahtjevu možemo zatražiti potvrdu identiteta radi zaštite podataka.",
          "Ako smatrate da su vaša prava povrijeđena, možete se obratiti Agenciji za zaštitu ličnih podataka i slobodan pristup informacijama Crne Gore.",
        ],
      },
    ],
  },
  {
    id: "cookies",
    label: "Politika kolačića",
    title: "Politika kolačića",
    intro:
      "Ova politika objašnjava koje kolačiće i slične tehnologije sajt može koristiti, zašto ih koristi i kako njima možete upravljati.",
    sections: [
      {
        title: "Šta su kolačići",
        body: [
          "Kolačići su male tekstualne datoteke koje pregledač čuva na vašem uređaju. Slične tehnologije mogu čuvati ili čitati informacije sa uređaja radi rada sajta, bezbjednosti, mjerenja posjećenosti ili prikaza ugrađenih sadržaja.",
        ],
      },
      {
        title: "Kolačići koje koristimo",
        body: [
          "Neophodni kolačići i tehničko skladištenje koriste se za učitavanje stranice, osnovnu funkcionalnost, sigurnost i pamćenje tehničkih podešavanja. Ovi kolačići ne zahtijevaju poseban pristanak kada su nužni za traženu uslugu.",
          "Analitički kolačići se mogu koristiti samo za mjerenje posjećenosti i poboljšanje sajta, ako su uključeni. Kada nijesu neophodni, koriste se uz vaš pristanak.",
          "Marketinške kolačiće ne koristimo za prodaju podataka. Ako u budućnosti budu uvedeni, biće jasno označeni i koristiće se samo uz odgovarajući pristanak.",
        ],
      },
      {
        title: "Ugrađeni sadržaji trećih strana",
        body: [
          "Sajt može prikazivati ugrađene sadržaje trećih strana, kao što su Google Maps mapa, video ili drugi eksterni elementi. Ti pružaoci mogu postaviti sopstvene kolačiće ili obrađivati tehničke podatke kada učitate njihov sadržaj.",
          "Za obradu podataka od strane trećih strana primjenjuju se njihove politike privatnosti i kolačića.",
        ],
      },
      {
        title: "Pristanak i upravljanje",
        body: [
          "Čuvanje ili pristup informacijama na vašem uređaju koje nije tehnički neophodno vrši se nakon što ste upoznati sa svrhom i date pristanak.",
          "Kolačiće možete obrisati ili blokirati u podešavanjima pregledača. Ako blokirate neophodne kolačiće, pojedini djelovi sajta možda neće raditi pravilno.",
          "Pristanak za kolačiće možete povući u svakom trenutku kroz dostupna podešavanja sajta ili pregledača, kada je takva opcija omogućena.",
        ],
      },
    ],
  },
  {
    id: "terms",
    label: "Uslovi korišćenja",
    title: "Uslovi korišćenja",
    intro:
      `Korišćenjem sajta ${SITE_INFO.brandName} prihvatate ove uslove korišćenja. Uslovi uređuju informativno korišćenje sajta, komunikaciju sa nama i osnovna pravila vezana za ponude i sadržaj.`,
    sections: [
      {
        title: "Podaci o trgovcu",
        body: [
          `${SITE_INFO.businessName}, ${SITE_INFO.fullAddress}.`,
          `Kontakt: ${SITE_INFO.phoneDisplay}, ${SITE_INFO.email}.`,
          "Djelatnost se odnosi na informisanje, izradu ponuda, prodaju, izradu i montažu PVC i ALU stolarije i pratećih proizvoda, u skladu sa dogovorom sa kupcem.",
        ],
      },
      {
        title: "Informacije na sajtu",
        body: [
          "Sadržaj sajta služi za opšte informisanje o proizvodima i uslugama. Fotografije, opisi, boje, dimenzije, rokovi i dostupnost mogu zavisiti od konkretnog projekta, materijala, izmjere i dogovora.",
          "Konačna specifikacija, cijena, rokovi, način plaćanja i obim radova potvrđuju se pojedinačnom ponudom, predračunom, ugovorom ili drugom pisanom komunikacijom sa kupcem.",
          "Nastojimo da informacije budu tačne i ažurne, ali zadržavamo pravo ispravke tehničkih grešaka i izmjene sadržaja sajta bez prethodne najave.",
        ],
      },
      {
        title: "Ponude, narudžbe i montaža",
        body: [
          "Upit poslat putem sajta, telefona ili e-maila ne predstavlja automatski zaključenje ugovora. Ugovorni odnos nastaje kada se ponuda ili narudžba potvrdi na način dogovoren sa kupcem.",
          "Mjere, tehnički uslovi, pristup objektu, priprema otvora, rokovi i posebni zahtjevi utvrđuju se prije realizacije ili tokom dogovorene izmjere.",
          "Kupac je dužan da dostavi tačne podatke potrebne za ponudu i realizaciju, kao i da nas blagovremeno obavijesti o okolnostima koje mogu uticati na izvođenje radova.",
        ],
      },
      {
        title: "Prava potrošača i reklamacije",
        body: [
          "Potrošači u Crnoj Gori imaju prava propisana Zakonom o zaštiti potrošača i drugim važećim propisima, uključujući pravo na tačne informacije, bezbjednost proizvoda i podnošenje prigovora.",
          `Reklamacije, pitanja ili zahtjeve možete poslati na ${SITE_INFO.email}, pozivom na ${SITE_INFO.phoneDisplay} ili na adresu ${SITE_INFO.fullAddress}.`,
          "Reklamacija treba da sadrži ime i prezime, kontakt, opis nedostatka, broj ponude, računa ili drugi dokaz o kupovini ako postoji, kao i fotografije kada mogu pomoći utvrđivanju stanja.",
        ],
      },
      {
        title: "Dozvoljeno korišćenje sajta",
        body: [
          "Nije dozvoljeno neovlašćeno kopiranje, preuzimanje ili komercijalna upotreba tekstova, fotografija, dizajna i drugih elemenata sajta bez naše prethodne dozvole.",
          "Nije dozvoljeno slanje zlonamjernog sadržaja, pokušaj narušavanja bezbjednosti sajta, zloupotreba kontakt podataka ili korišćenje sajta na način koji može prouzrokovati štetu nama, korisnicima ili trećim licima.",
        ],
      },
      {
        title: "Mjerodavno pravo",
        body: [
          "Na ove uslove i korišćenje sajta primjenjuje se pravo Crne Gore.",
          "Eventualne sporove nastojaćemo da riješimo dogovorom. Ako dogovor nije moguć, primjenjuju se nadležni organi i sudovi u skladu sa važećim propisima Crne Gore.",
        ],
      },
    ],
  },
] as const;
