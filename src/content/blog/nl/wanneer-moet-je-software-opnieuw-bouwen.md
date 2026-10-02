---
language: nl
translationKey: when-should-you-rebuild-software
slug: wanneer-moet-je-software-opnieuw-bouwen
title: Wanneer moet je software opnieuw bouwen?
description: Hoe je kiest tussen verwijderen, verbeteren en opnieuw bouwen wanneer bestaande software verandering in de weg lijkt te staan.
author:
  name: Tim Twiest
  url: https://timtwiest.nl
pubDate: 2026-10-02
tags:
  - softwarearchitectuur
  - softwareontwikkeling
  - consultancy
draft: false
---

Opnieuw beginnen voelt soms eenvoudiger dan verder werken met bestaande
software. De nieuwe versie krijgt een schonere architectuur, modernere techniek
en geen last van oude keuzes. Tenminste, dat is de belofte.

Een **rewrite**, het volledig opnieuw bouwen van een systeem, verwijdert echter
niet automatisch het moeilijkste deel: begrijpen wat de software in de praktijk
moet doen. Die kennis zit vaak verspreid over code, gegevens, gekoppelde systemen
en mensen die uitzonderingen uit hun hoofd kennen.

Voordat we over nieuwe techniek praten, moet iets anders duidelijk worden:
_waarom is dit systeem zo moeilijk te veranderen, en hoeveel moeten we werkelijk
vervangen?_

## "De software is oud" is geen diagnose

Ouderdom alleen zegt weinig. Software van tien jaar oud kan betrouwbaar en goed
te wijzigen zijn. Een toepassing van een jaar oud kan al vastlopen door
onduidelijke grenzen en sterke onderlinge afhankelijkheden.

Maak de klacht daarom concreet. Bijvoorbeeld:

- een kleine wijziging raakt steeds meerdere onderdelen;
- releases duren lang of moeten vaak worden teruggedraaid;
- fouten zijn moeilijk te vinden en keren terug;
- alleen enkele mensen begrijpen een belangrijk proces;
- de frontend kan niet veranderen zonder aanpassingen in de backend;
- gegevens hebben geen duidelijke eigenaar of spreken elkaar tegen.

Dit zijn verschillende problemen. Ze vragen niet vanzelf om dezelfde oplossing.
Een trage gebruikersinterface wordt niet opgelost door een database te vervangen.
Een onduidelijk bedrijfsproces wordt niet duidelijker door hetzelfde gedrag op
een nieuwe technische basis na te bouwen.

## Zoek waar verandering werkelijk vastloopt

Een softwarearchitectuur bewijst haar waarde wanneer onderdelen veilig en
voorspelbaar kunnen veranderen.

Kijk daarom naar het hele pad van idee tot productie:

1. Hoe lang duurt het voordat een wijziging duidelijk genoeg is om te bouwen?
2. Welke onderdelen en teams zijn ervan afhankelijk?
3. Hoe makkelijk is het gedrag automatisch te testen?
4. Hoe vaak veroorzaakt een release een incident?
5. Hoe snel kan het systeem na een fout worden hersteld?

Deze vragen maken onderscheid tussen een technisch probleem en een probleem in
besluitvorming, eigenaarschap of het releaseproces. Een nieuw systeem helpt niet
als dezelfde onduidelijkheid wordt meegenomen.

## Verwijderen, stabiliseren, isoleren of vervangen

Tussen niets doen en alles herschrijven zitten meerdere verstandige opties.

**Verwijderen.** Ongebruikte functies, dubbele gegevensstromen en achterhaalde
koppelingen hoeven niet mee naar een nieuwe oplossing. Minder gedrag betekent
minder code om te begrijpen, testen en beheren.

**Stabiliseren.** Soms is eerst zicht nodig op wat er gebeurt. Logging legt
gebeurtenissen vast, monitoring bewaakt bekende signalen en tracing volgt één
verzoek door meerdere onderdelen. Samen maken ze het interne gedrag van een
systeem zichtbaar vanuit de uitvoer. Technisch noemen we dat _observability_.

**Isoleren.** Een moeilijk onderdeel kan achter een duidelijke grens worden
gezet. De rest van het systeem gebruikt dan een afgesproken contract, zoals een
API. Dat is een technische ingang met vaste afspraken. Andere onderdelen hoeven
de interne werking dan niet te kennen. Daardoor neemt de onderlinge
afhankelijkheid af: de mate waarin een wijziging in het ene onderdeel wijzigingen
elders afdwingt. Technisch heet die afhankelijkheid **coupling**.

**Gericht vervangen.** Als één onderdeel de meeste problemen veroorzaakt, kan
dat onderdeel vaak apart worden vervangen. De rest blijft ondertussen werken.

Deze volgorde levert sneller informatie op dan een volledige rewrite. Iedere stap
laat zien of het werkelijke probleem kleiner, groter of anders is dan gedacht.

## Een voorbeeld van frontend tot database

Stel dat een medewerker het adres van een klant wijzigt. Het ene scherm meldt dat
de wijziging is opgeslagen, maar het factuursysteem gebruikt nog het oude adres.
Achter de schermen sturen twee technische routes de wijziging naar verschillende
kopieën van dezelfde klantgegevens. Die routes behoren tot de backend: het deel
van de software dat gegevens en bedrijfsregels verwerkt. Een nachtelijk proces
probeert de verschillen te herstellen en kan daarbij zelfs het oude adres opnieuw
leidend maken.

Een nieuwe frontend kan het scherm verbeteren, maar lost de onduidelijkheid over
de brongegevens niet op. Een nieuwe backend helpt evenmin als beide routes naast
elkaar blijven bestaan.

Een gerichte aanpak begint met één leidende gegevensbron: de plek die voor een
gegeven bepaalt wat juist is. In softwarearchitectuur heet dit een **source of
truth**. Daarna krijgt de backend één duidelijk contract voor wijzigingen. De
frontend toont een wijziging pas als geslaagd wanneer de backend die via dat
contract heeft bevestigd. Automatische tests controleren vervolgens of frontend
en backend dezelfde afspraken blijven gebruiken. Zulke controles worden
contracttests genoemd.

Zo wordt niet de hele toepassing vervangen. Eerst wordt de architectonische
oorzaak aangepakt: onduidelijk eigenaarschap van gegevens en meerdere routes voor
dezelfde handeling.

## Wanneer een volledige rewrite wel logisch kan zijn

Volledig opnieuw bouwen is soms de beste keuze. Bijvoorbeeld wanneer:

- een noodzakelijk bedrijfsmodel niet betrouwbaar in de huidige structuur past;
- de gebruikte techniek niet meer veilig kan worden ondersteund;
- kritieke onderdelen niet afzonderlijk zijn te vervangen;
- de kosten en risico's van stapsgewijs herstel aantoonbaar hoger zijn;
- het bestaande gedrag voldoende is beschreven en getest om bewust te kiezen wat
  terugkomt.

Vooral dat laatste punt is belangrijk. Zonder kennis van het huidige gedrag wordt
een rewrite een ontdekkingstocht met een deadline. De oude code blijft dan langer
nodig dan gepland, terwijl het nieuwe systeem steeds meer uitzonderingen moet
overnemen.

Maak daarom vooraf ook duidelijk wanneer de nieuwe versie geslaagd is. Niet alleen
"dezelfde functies met nieuwe techniek", maar meetbare resultaten zoals kortere
doorlooptijd, minder incidenten of één aantoonbare bron voor belangrijke gegevens.

## Vervang terwijl het systeem blijft werken

Een grote overgang op één moment vergroot het risico. Vaak is het veiliger om
nieuw gedrag stap voor stap naast het bestaande systeem te zetten. Nieuwe
onderdelen nemen dan steeds meer verkeer en verantwoordelijkheid over, totdat het
oude deel kan worden uitgezet. Deze aanpak heet het **strangler pattern**.

Bij een oud klantportaal kan bijvoorbeeld eerst alleen de zoekfunctie naar een
nieuw onderdeel worden geleid. Werkt die stabiel, dan volgt het bekijken van het
klantprofiel en daarna pas het wijzigen van gegevens. Iedere stap is afzonderlijk
te controleren en zo nodig terug te draaien.

Dat vraagt om meer dan een technisch ontwerp. Iedere stap heeft nodig:

- een duidelijke grens tussen oud en nieuw;
- controle of beide kanten hetzelfde resultaat geven;
- inzicht in fouten en verschillen;
- een terugweg als de nieuwe route niet goed werkt;
- een concreet moment waarop het oude onderdeel wordt verwijderd.

Zonder dat laatste blijft tijdelijk dubbel werk permanent bestaan. Een migratie
is pas af wanneer de oude route, gegevensstroom en bijbehorende beheerlast echt
zijn verdwenen.

## Een praktische beslissing

Beantwoord vóór een rewrite ten minste deze vragen:

1. Welk waarneembaar probleem proberen we op te lossen?
2. In welk onderdeel ontstaat het werkelijk: frontend, backend, data of proces?
3. Wat kan eerst worden verwijderd of geïsoleerd?
4. Welk bestaand gedrag moet aantoonbaar behouden blijven?
5. Hoe meten we of de verandering beter is?
6. Hoe blijft het bedrijf tijdens de overgang functioneren?
7. Wanneer kunnen we het oude onderdeel definitief uitzetten?

Als deze antwoorden ontbreken, is opnieuw bouwen vooral een sprong naar een
onbekende situatie. Als ze duidelijk zijn, kan een rewrite een beheerste keuze
zijn in plaats van een hoopvolle reset.

Voor ons is dat de kern van goede architectuur: software die te begrijpen en te
veranderen blijft, zonder dat iedere wijziging het hele systeem in gevaar brengt.

Daar helpt Venturian Ecom bij. We onderzoeken waar verandering vastloopt en werken
vervolgens aan de architectuur, backend, frontend, data of integraties die dat
veroorzaken. Wat goed werkt laten we staan. Wat in de weg zit verbeteren of
vervangen we gericht.

Overweeg je een rewrite? Begin dan niet met de nieuwe techniek. Schrijf eerst op
waar het huidige systeem je belemmert en wie daar in de praktijk last van heeft.
Daar begint een zinnig gesprek.
