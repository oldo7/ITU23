# Stránka zobrazujúca analýzu aktivít vo videohre

Stránka bude zobrazovať informácie o vybraných aktivitách, ktoré je možné vykonávať v hre Black Desert Online, zameránych na profit ( hernej meny ). 
Momentálne je situácia taká že existujú rôzne stránky ktoré už zobrazujú informácie o aktivitách, ale ani zďaleka nepokrývajú všetky aktivity, ktorými sa hráči zaoberajú.
Tento nedostatok hráči riešia tvorením vlastných excel tabuliek a manuálnym vkladaním dát aby sa dostali k hladanému výsledku. Výsledná stránka by mala pamätať dáta od uživatelov,
ktoré sa nemenia, a tie, ktoré sa menia, by mali byť aktualizované automaticky.

### 2. ZHODLI SME SA NA NAVRHU OLIVERA

### 3. Analýza uživatelských potrieb
- Dotazník: 
- Ako si predstavuješ stránku so zoznamom akcií?
- (Po predstavení makety) Čo si myslíš že je kľúčové pri detaile a tvorbe akcie?
- Nejaké iné nápady ktoré stránka potrebuje?

- Samozrejme otázky su položené ľudským spôsobom a nie ako keby to bolo nejake korporátne interview.

Marek:
- Chronologicky zoradený zoznam akcií
- Chce založiť akciu, zobraziť akciu, vidiet kedy a kde sa akcia koná, nastaviť obrázok k akcii, vidieť kto sa zúčastní, kontaktovať organizátora, nastaviť profilovku, posielať obrázky

Ronko:
- Chcel by vidieť akcie zoradené podla času, chcel by medzi nimi vyhladávať
- Založenie akcie, zobrazenie akcie, vidieť a kontaktovať zúčastnených, chcel by mať možnosť zostať anonymný

Zhrnutie a záver:
- Zoznam akcií bude zoradený chronologicky a bude možné ho filtrovať podla času a mena akcie.
- Pravdepodobne neumožníme pridávanie obrázkov k akciám, dokážem si predstaviť že tam niekto vloží porno a monitorovať sa mi to nechce.
- Anonymitu dosahujeme +- tým, ako málo údajov ukladáme (iba meno).
- Kontakty si uživatelia môžu vymienať vo fóru.
- Profilový obrázok nieje nutný, môžeme poprípade tam nejaké dať na tvrdo dať a budú uživatelom náhodne priradené, podobne ako je to na google docs v zdielaných dokumentoch.
- lokáciu uživatel bude môcť zadať, stačí ako reťazec. 

### 4. Analýza iných aplikácií riešiacich podobný problém
Discord je populárny a často používaný komunikačný nástroj, ktorý je využívaný aj na tvorbu akcií. Akcie sú na tejto platforme buď riešené v podobe eventov, kde čas, info, a zúćastnení su pekne naformátované, alebo v podobe fóra, kde sa do titulku zmestí prehladne iba jedna informácia, a potom v podobe likov sa rieši zúčastnenie, zvyšné info je v texte. 

Výhody:
- účet na discorde je zadarmo a má ho veľa študentov
- je možne ho používať cez aplikáciu ako pre mobil tak aj pre PC alebo cez browser
Nevýhody: 
- diskusia je buď v textovom kanále niekde inde alebo je vo fóru
- Discord nie je primárne určený na tvorbu akcií, ale na komunikáciu
- Discord nemusí byť anonymný



### 6. Delba práce
- Oliver: Uvítacia stránka, stránka s info o špecifickej akcií, štylistická vízia
- Martin: Stránka s vytvorením akcií, spolupráca na Backende, Filtrácia akcií
- Matúš: Stránka na založenie profilu, návrh API, návrh databázy, spolupráca na Backende, 

7. ### MAKETA
8. ### MAZE.COM https://t.maze.co/199679636
### 7.  Zalozenie akcie
- Uzivatel moze volne zvolit meno akcie, cas, miesto, a popis akcie
- Kedze akcia ma meno, moze to byt podla neho zoradene, rovnako ako akcia ma datum, tak aj podla nej to moze byt zoradene
- Pridávanie obrázkov pravdepodobne neumozníme.
- Akcia ma popis, kam organizator moze vlozit svoj kontakt, co splnuje poziadavok o kontakt organizatora
- okrem toho akcia ma taktiez aj lokaciu, ktoru si uzivatel moze zvolit, alebo nechat prazdnu

### 8. Testovanie makety
- Maze sam o sebe podporuje metriky ako je uspesnost, cas, pocet klikov a podobne.
- bolo testovane: Zobrazenie detailu akcie (100% uspesnost), polozena otazka co by uzivatel chcel vidiet v tejto aplikacii (0 uzitocnych odpovedi :( ), nazor na dizajn od 1 - 10 (priemer 8.8)
- zaujimavou castou bolo testovanie zalozenia akcie, kde ale miesto domovskej stranky sa uzivatel nachadzal v detaile akcii a jeho ulohou bolo zalozit akciu. Uzivatela nenapadlo kliknut vysednuty text "najst akciu", co bola hlavna stranka. 
- v zivom kole testovania 2 uzivatelov na makete bola odhalena dalsia chyba, keby ma uzivatel zadat datum akcie, kde den akcie je jednociferne cislo, napriek tomu ze je vedla vypisany format DD-MM-YYYY uzivatel si bol neisty ci ma napisat 7. alebo 07.
- riesenie tychto nedostatkov je pridat domovsku stranku a odtial navigaciu do listu akcii, miesto toho aby list akcii bol domovskou strankou. Riesenim datumovej krizy je bud elaborovat na formate (miesta na stranke je dost), alebo pridat kalendar, popripade sipky, ktore by cyklovali dnami.


1.  ### ZHODLI SME SA REACT FE A PHP BE 

2.  ### nech nás boh chráni pri kostre aplikácie amen.


