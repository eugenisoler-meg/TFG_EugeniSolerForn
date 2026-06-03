# MEG cAPPs

Aquest repositori conté el codi per al client mòbil de **MEG cAPPs**, una aplicació Expo amb React Native desenvolupada com a part del Treball de Fi de Grau per a Minyons Escoltes i Guies de Catalunya (MEG) am títol _MEG cAPPs: desenvolupament de pila completa d'un aplicatiu mòbil per a una entitat del tercer sector_.

L'objectiu principal del projecte és crear un Producte Mínim Viable (PMV) que ajudi les caps voluntàries a navegar dades, consultar rols i gestionar activitats des d'un dispositiu mòbil.

## Context del projecte
- MEG és una organització d'escoltisme i guiatge catalana amb una forta estructura basada en el voluntariat.
- L'aplicació és part d'un procés més ampli de transformació digital l'entitat.
- L'objectiu és connectar els fluxos de treball de les voluntàries amb una experiència mòbil, respectant la privadesa de les dades i el model de permisos per rols de MEG, així com explotar l'eina de CRM de l'entitat.

## Objectius principals
- Desenvolupar una interfície mòbil per a la gestió del voluntariat de MEG.
- Consumir una capa intermèdia d'API / middleware que abstrau SinergiaCRM i protegeix la privacitat.
- Proporcionar accés basat en rols a dades d'unitats, agrupaments i equips de direcció.
- Donar suport a la visualització de dades i a la generació d'informes de mètriques de l'entitat.
- Integrar una funcionalitat d'IA generativa amb OpenAI per millorar el suport a tasques.
- Alinear la interfície mòbil amb la imatge de MEG i les pautes d'ús mòbil.

## Què fa l'aplicació?
MEG cAPPs ofereix una experiència mòbil pensada per als diferents rols de l'entitat.

- Permet iniciar sessió amb credencials i mantenir una sessió segura.
- Mostra un panell de control amb informació rellevant segons el perfil de la persona usuària.
- Accedeix a dades d'afiliats, funcions, unitats, sortides i llistes.
- Gestió d'assistència a activitats de les unitats.
- Genera documents i certificats que avalen la participació o la pertinença a una funció.
- Visualitza mètriques resumides del grup i la unitat mitjançant gràfiques i estadístiques.
- Integra una eina d'IA per generar text.

## Contingut del repositori
- `app/`: pàgines i pantalles de l'aplicació.
- `components/`: components reutilitzables d'interfície i funcionalitat.
- `constants/`: configuració de l'app, helpers d'API, lògica d'IA i models de dades.
- `assets/`: imatges i icones utilitzades per l'aplicació.

## Notes d'execució
- Aquest repositori és principalment el client mòbil; l'accés a l'API depèn d'un middleware/backend que fa de proxy de SinergiaCRM.
- Es requereixen credencials externes i endpoints d'API per accedir a la font de dades de producció.

## Desenvolupament
- L'aplicació utilitza una arquitectura de rutes basada en fitxers dins `app/`.
- Constants compartides i helpers d'API es troben a `constants/`.
- Els components d'interfície es classifiquen per funcionalitat i patrons compartits.
- El projecte utilitza eines gestionades per Expo i TypeScript.

## Llicència i crèdits
Aquest repositori forma part d'un treball de fi de grau i està mantingut per l'autor de la tesi.
Per a un context més detallat, podeu consultar la memòria del treball o contactar amb l'autor.

_Sempre a punt_