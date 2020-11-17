# Dokumentasjon - Prosjekt 4

## Hvordan å kjøre prosjektet

**NB! For å kjøre prosjektet, så må du sørge for at du har expo installert.**

1. klon prosjektet fra Gitlab
   _ SSH:
   `git clone git@gitlab.stud.idi.ntnu.no:nicolaad/prosjekt-4-lettmelk.git`
   _ HTTPS:
   `git clone https://gitlab.stud.idi.ntnu.no/nicolaad/prosjekt-4-lettmelk.git`

2. gå inn i client mappen til prosjektet
   `cd prosjekt-4-lettmelk/client`
3. Start expo
   `expo start`
4. Kjør som normalt!

Du trenger ikke å sette opp noe backend, da denne kjøres på NTNU sine VM'er. Om Applikasjonen ikke skulle fungere optimalt (E.g at dataen ikke lastes) så kan man prøve å kjøre det med NTNU sin VPN. Om du har trøbbel med å kjøre prosjektet på egen mobil, så anbefaler jeg fra egen erfaring å kjøre expo med tunnel mode.

## Hva er egentlig dette prosjektet?

Kort forklart, så er dette en frontend bomstasjonssøkemotor skrevet i React Native. Den lar deg søke på bomstasjoner, basert på et par parametere. Man kan derretter scrolle forbi dem, og om man ønsker - så kan de også sorteres etter taksttype, både stigende og synkende. Det er også mulig å se mer om en bomstasjon med å trykke på en av bomkortene. Dette vil vise et modalvindu med litt ekstra informasjon, som nettside og eieren av bomstasjonen.

## Innhold of funksjonalitet

### Søkemotor

Søkemotoren er komponentet SearchBox, som består av et inputfelt, 3 checkbokser og en knapp. Når brukeren interagerer med inputfeltet, eller checkboksene, så lagres dette i en Redux slice. Det er først når brukeren trykker submitt, at han blir tatt til en resultatsiden. Jeg valgte å splitte søkesiden fra resultatsiden, ettersom det ga meg en god grunn til å lære mer om react navigation.

### Resultatsettet

Resultatsiden (ResultDisplay komponentet) leser fra Redux staten kaller en query med en Apollo client. Jeg valgte å bruke Apollo, ettersom den ble beskrevet som lettvint å sette opp med minimal konfigurasjon. I tillegg sørger den for automatisk caching og tilrettelegger for pagination.

Resultatet fra Queryen lastes som BomCard komponenter, og lastes ned i grupper på 10 og 10. Om man scroller neders vil man kunne trykke seg til neste side, gitt det er flere resultater.

### Rafinering av resultat

Øverst på resultatsiden vil man finne to knappegrupper. Disse lar deg sortere bomstasjonene basert på taksttype og om den er stigende eller synkende. Rafineringen vil gjøre en query med Apollo, men det er fordi jeg ikke så noen god måte å implementere det på uten å fjerne dynamisk nedlasting. For hvem vil sortere noe basert på de 10 første resultatene? Merk at tidligere querys blir lagret i cache av Apollo, og vil kunne lastes inn uten en ny spørring.

### Teknologier

Prosjektet er skrevet utelukket med typescript, hvor expo init er brukt for å sette opp prosjektet.

#### liste over biblioteker

- Komponenter
  - React native elemets
  - React native modal
- Navigasjon
  - React Navigation
- State
  - Redux (m/ toolkit)
  - Apollo Client (for caching)
- Graphql
  - Apollo Client

Jeg prøvde først å finne ferdiglagde komponenter for å raskere kunne utvikle siden. Noen ganger måtte jeg bruke de vanlige react native elementene, som inputfield, ettersom alternativene var for vansklige å style og ga feil assosiasjoner. Jeg fant i midlertid en stor fordel med react native elements, nemlig at de var like på både IOS og Android. I kontrast til noen komponenter som f.eks React native buttons, som bare viste en klikkbar tekst framfor en knapp når jeg testet på en Iphone 8. Dette er den største grunnen til at jeg har brukt tredjepartskomponenter, gitt der det var nødvendig.

Jeg brukte Redux til å lagre søkestaten, ettersom jeg viste den vskulel bli brukt på en annen side. Dette gjorde det lett å flytte stat, og vil også gjøre det lettere å skalere appen om jeg skulle ønske ting som sorteringskanppene i et annet vindu.

### Testing

Utviklingen har for det meste foregått med en Android mobil, men jeg fikk også muligheten til å teste funksjonalitetetn på Iphone. I tillegg til å klikke gjennom alt av funksjonalitet som jeg har lagt til, så lagde jeg også en mer formel manuell test, som er illustrert i bunnen av Readme'en med bilder.

#### Ende til ende test

Dette er en test som går over hovedfunskjonene og sjekker at det ser ut til å stemme.

Målet er å finne eieren av den dyreste bommstasjonen for trucker i Stavanger kommune (finnøytunnellen). Bildene illustrerer resutatet etter å ha utført oppgaven.

0. Åpne siden
   <img src="./client/test/images/1.png" height="400"/>
1. Skriver Stavanger i Søkefeltet og huker av kommune
   ![Test 1](./test/images/1.png)
2. Trykker på "Søk!" knappen
   ![Test 2](./test/images/2.png)
3. Trykker på "Truck" og "Synkende"
   ![Test 3](./test/images/3.png)
4. Klikke på det første bomkortet
   ![Test 4](./test/images/4.png)
5. Se navnet til eieren i modalen
   ![Test 5](./test/images/5.png)
6. Klikke ut av modalen
   ![Test 6](./test/images/6.png)
7. Scroll nederst og klikk neste side. Scroll øverst, se at det er den 11 dyreste øverst. Trykk tilbake. Se at man er tilbake til før steg 4
   ![Test 7](.client/tests/images/7.jpg)

Denne testen ble utført både på en Android (samsung A70) og en Iphone 8. Da oppdaget jeg at knappene fra react native ikke var like på begge enhetene, som gjorde at jeg benyttet meg mer av react native elements, som sørget for en likhet mellom systemene.
