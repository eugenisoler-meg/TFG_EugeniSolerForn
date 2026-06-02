## Índex


- Capítol 1.1 Context 1. Introducció i motivació
- Capítol 1.2 Objectius 2. Context del del treball projecte
   - 2.12.2 MinyonsProcés de Escoltes transformació i Guies digital de Catalunya de l’entitat
      - 2.2.12.2.2 SimbioTICTipologia i volumi SinergiaCRM de dades a tractar.
   - 2.32.4 NecessitatsAbast del projecte digitals en la gestió associativa.
- Capítol 3.1 Digitalització 3. Estat de l’art en el Tercer Sector
   - 3.23.3 SistemesBackend dei middleware gestió de dades i CRM.
      - 3.3.13.3.2 PatronsAnàlisi comparativaarquitectònics de frameworks
   - 3.4 Bases3.4.1 Arquitecturesde dades i modelització de dades intermèdies (ETL)
   - 3.5 Front3.4.2 Basesend de dades
      - 3.5.13.5.2 LlenguatgesLlenguatges nadiusmultiplataforma (platform-specific (cross-platform) o native).
   - 3.6 Entorn3.5.3 Aplicacions de Desenvolupament web progressives Integrat (PWA) (IDE), test i desplegament
   - 3.7 Agents3.6.1 Expo d'IA
- Capítol 4.1 Requisits 4. Requisits Funcionals del sistema
   - 4.24.3 RequisitsRestriccions No delFuncionals projecte
   - 4.44.4 CasosLimitació d’ús temporal
- Capítol 5.1 Arquitectura 5. Disseny i arquitectura general del sistema del sistema
   - 5.2 Arquitectura5.2.1 Pila tecnològica del middleware del servidor (API intermèdia)
      - 5.2.25.2.3 ConnexióModel de dadesamb el intermedi CRM
   - 5.3 Arquitectura5.2.4 Sistema del de frontendpermisos (aplicació mòbil)
      - 5.3.15.3.2 PilaIntegració tecnològica de IAG del client
      - 5.3.4 Generació de documents
- Capítol 6. Interfície d’usuari i demostració del sistema
   - 6.1 Imatge6.1.1 Estil corporativa comunicatiu
      - 6.1.26.1.2 LogotipGamma de colors
   - 6.26.3 PantallesFuncionalitats desenvolupades
   - 6.46.5 VisualitzacióFlux d’ús de l’aplicacióde dades de l’entitat
   - 6.66.7 NotificacióVerificació end’incidències dues passes
- Capítol 7.1 Prova 7. Resultats d’usabilitat i avaluació i enquesta de valoració
   - 7.27.3 BenchmarkingGrau d’assoliment dels requisits
   - 7.4 Disponibilitat7.4.1 Declaració de l’aplicaciósobre l’ús dei el IAG codi font
- Capítol 8.1 Conclusions 8. Conclusions i treball futur
   - 8.2 Properes8.2.1 Afegir passes un camp o relació a una classe del model
      - 8.2.28.2.3 AfegirAfeir un una endpoint classe alde model l’API
      - 8.2.48.2.5 AfegirAfegir unacrida funcionalitat a l’API des ade un l’aplicació rol dins l’aplicació
- Capítol 8.2.6 9. Bibliografia Afegir una gràfica a la visualització de dades
- Annex A: Principals mòduls de SinergiaCRM i relacions
- AnnexAnnexAnnex B:C:D: taulaDiagramaCrides de a rols l’API de de Gantt de nivell SinergiaCRM Agrupament. des del middleware
- AnnexAnnexAnnex E:F:G: migracióEsquemaCaptures bàsica dede taulespantalla per del a delcrear middleware Dossier una taula de campaments a SQL amb iLaravel comparativa amb MEG cAPPs
- AnnexAnnexAnnex H:I:J: Certificat Consultespantalles dededins representaciól’aplicació el middleware de l’entitatper a la visualització de dades
- AnnexAnnexAnnex K:L:M: Formulari FluxDiagrama d’ús de d’incidènciesde l’aplicació les crides dins l’aplicació
- AnnexAnnexAnnex N:O:P: ComTaulaEnquesta afegir de tasques de funcionalitats valoració de la provade la provad’usabilitat d’usabilitat
- Annex Q: Verificació en 2 passos a l’inici de sessió


# Capítol 1. Introducció

## He 1.1 sentit^ Context d’una dita^ i^ motivació popular de l’escoltisme,^ que “es pot ser i deixar de ser moltes coses, però

_d’escolta_ que formem _se_ (^) _n’és_ part (^) _tota_ del (^) moviment. _la vida”_. Penso Per als que infants, defineix al (^) principi,molt bé el el sentiment cau es limita de pertinença a dissabtes, de excursionsles persones i (^)
campaments.fetes i les experiències Però a poc aviscudes poc germina que dinsmai seues untrencarà. vincle, Ide esdevenen nostàlgia ipersones gratitud, crítiques,cap a les amistatsactives, (^)
conscientsTot aquest i compromeses procés vital (Minyons seria impensable Escoltes i (^) senseGuies unde Catalunya,agent: les 2013).caps. Gràcies (^) a la seva feina, de
maneral’aprenentatge voluntària, dels infants.es duen El a seu terme paper projectes és fonamental i activitats per a (^) lliurar-losque generen una l’impacteeducació (^) ennecessari el lleure, per sent a (^)
referentsJo he educativesestat escolta molt gran sovint part pocde la reconegudes. meva vida, i (^) ho segueixo sent. Però gràcies a les pràctiques de la
carrera,Informàtica. he tingut Resolent una novaincidències oportunitat dels deagrupaments conèixer l’entitat he pogut des conèixer del Servei les denecessitats Transformació del voluntariat Digital i (^)
dede (^) Grauprimera (TFG). mà i d’aquest joc de barrets (tècnic i voluntari) ha nascut la idea per al meu Treball de Fi
copL’aplicació es troben mésvol^ donarentrebancs.^ resposta I així,^ a^ aquestes encara quenecessitats sigui només^ i^ facilitar una micala^ tasca _“intentar_^ de^ les^ voluntàries, _deixar el món_^ que _millor_^ cada^

## de com 1.2 l’hem Objectius trobat” (Baden-Powell, del treball 1941).

aplicacióL’objectiu en l'entornprincipal mòbil,^ del^ treball basat^ ésen^ dissenyar arquitectura^ i^ implementar modular i^ elque^ **PMV** resolgui^ (Producte problemàtiques^ Mínim^ Viable) reals^ d’una de la^
baseespecífics voluntària seria deel següent: l’entitat i que permeti l’accés i visualització eficient de dades. I el llistat d’objectius

- Desenvolupar- L’aplicació un frontend està pensada mòbil. exclusivament per a clients mòbils.
- Implementar- La lògica una API de intermèdianegoci de (middleware).l’aplicació es gestionarà des del servidor de Minyons, que
    - alhoraCaldrà,^ farà per^ cridesa aconseguir-ho,^ i^ consultes modelitzara^ la^ base^ de una^ dades base^ per de^ a dades^ protegir-ne intermèdia^ la^ privacitat. per a consultes.^
- Desenvolupar-^ Definir un^ un apartat^ model de^ formal visualització^ de^ rols^ i depermisos. dades resumides.^
- Integrar-^ Aplicaruna funcionalitat^ aprenentatges basada^ de enla^ carreraIntel·ligència^ per^ a^ fer Artificial^ un^ resum (IA)^ de generativa.mètriques^ de l’entitat.^
- Validar-^ rendimentConnectar il’aplicació escalabilitat^ amb del^ models sistema.^ d’OpenAI per^ a^ resoldre^ alguna^ funcionalitat.^
    - - AproparPensar com el temps integrar de futuresresposta implementacions de l’API amb el id’altres funcionalitats aplicatius a desenvolupar. de l’entitat.


## Capítol 1.2 Objectius 2. Context del del treball projecte

Minyons **2.1**^ **Minyons** Escoltes i^ **Escoltes** Guies de Catalunya^ **i**^ **Guies**^ (MEG) **de**^ **Catalunya** és una associació^ educativa de base voluntària i

vessantadaptada comunitari, del Mètode sense Escolta ànim i Guiade lucre ideat i declarada per Robert d'utilitat Baden-Powell, pública. Até través com a de missió la proposta educar educativaescoltes i (^)
guiesL’organigrama per a la transformació del voluntariat social arreues divideix del territori segons català. l’impacte (^) territorial. Cada divisió emula la
mateixadecisió esestructura constitueix però en a elun Consell nivell mésde Caps. ampli. Els En representants l’àmbit local de parlem cada consell, d’agrupaments, l’Equip d’Agrupament on l’òrgan de (^)
(EA),s’aproven es reuneixena les Assemblees a les Taules de Demarcació de Demarcació Ordinàries respectives (ADO). per Al aseu organitzar torn, els irepresentants prendre acords de cadaque (^)
demarcació,transmetre les els necessitats Equips de i (^) prendreDemarcació acords (ED), i decisions es reuneixen que s’aproven als Espais a lesGenerals Assemblees (EEGG) Generals per a (^)
OrdinàriesGenerals, dels (AGO), quals on la (^) Taulasón convocades Executiva (TaEx)totes les n’és sòcies la representació (voluntàries). jurídica Els representants de l’entitat, (^) coordinendels Espais i (^)
dinamitzenEnguany les són accions més d’11.800 de l’associació. infants (^) els que participen del moviment, gràcies a l’esforç de 2.
voluntàries.diferents serveis Per acentralitzats donar-los suport, amb seu l’entitat a Valldoreix, disposa i d’unaSecretaries Oficina Tècniques de Serveis (ST) Generals repartides (OSG) a les ambseus (^)
de cada **2.2** demarcació. **Procés** (^) **de transformació digital de l’entitat**
treballarEn^ el Plaés Estratègicel de Transformació^ (Minyons^ Escoltes Digital.^ i^ GuiesFins^ deara,^ Catalunya, MEG comptava^ 2019)^ de l’entitat,amb aplicatius^ un^ dels blocspropis^ a^
(desenvolupatsEn podem destacarper informàtics el programa de l’oficina) d’afiliacions, per a la gestióque guardava de les dades. dades (^) des del curs 1996-97, i el
programajurídica). Totper ai gestionarque al principi la comptabilitat eren solucions (ja que adientstots els agrupamentsal moment, lacomparteixen manca d’actualitzacions NIF i personalitat i de (^)
documentacióÉs per això de que codi el hancurs fet 2022-2023 que cada culminacop siguin el menysprimer sostenibles,procés (amb fregant una rebuda l’obsolescència. i valoració positiva)
del’entitat digitalització: perquè, d’una el _Dossier_ banda, _de_ externalitza _campaments_ el. (^) desenvolupamentIntrodueix canvis (garantint significatius el manteniment) en la digitalització i a través de (^)
d’unEl procés mateix participatiu curs (Minyons adapta Escoltes l’aplicatiu i Guies per dea una Catalunya, tasca nova. 2023, (^) 13) s'inicia un procés semblant, però
ambel seu un sistema objectiu d’afiliacions més ambiciós. a un MEG nou CRMs’acull (per al Projecteevitar redundància SimbioTIC parlarem amb l’objectiu del CRM de migrarper a referir-nos i adaptar (^)
al90.000 programari persones de gestió i unes de dades,250.000 no alfuncions, concepte peròrelacional). que a Estemmés haviaparlant d’incloure d’una base informacióde dades d’unes dels (^)
Agrupaments **2.2.1** i l’Escola **SimbioTIC** de Formació. **i SinergiaCRM** (^)
de ElM4Social^ projecte i^ SimbiòTICl’Associació^ (Taula SinergiaTIC^ d'entitats que^ del ha^ Tercer facilitat,^ Sector entre^ Social 2023 de i 2025,^ Catalunya, acompanyament^ 2026)^ és^ un i recursosprojecte^


(^) per a l’adopció de SinergiaCRM a més de 80 entitats i federacions sense ànim de lucre. La majoria
tenenespecífiques menys deadaptades 50 treballadores al context i unade cada part entitatdel projecte per a hacrear estat conjuntament el desenvolupament una eina de de funcionalitats la qual totes (^)
se’nSinergiaTIC puguin beneficiar. és qui hi ha darrere del desenvolupament d’aquest CRM, una associació que des del
(^2013) estratègic predica i responsable a favor de lade sobiraniala tecnologia tecnològica, i les dades, és a totdir, apostant crear i difondre pel codi una obert cultura (SinergiaTIC, compartida 2025). d’ús (^)
Ofereixmillores acompanyament,futures. MEG es consultoriamarca com ia suportobjectiu en que tot elel nouprocés CRM d’adaptació estigui disponible i possibles el curs incidències 2024-25, oi (^)
quePerò la campanya per incompatibilitat de noves afiliacions amb la base es faci de dadesamb el i problemesnou aplicatiu. de configuració (^) des de l’OSG, la versió
quedemocratitzar es presenta més mostra l’eina forçai ser-ne errors més partícips.i la base Desprésvoluntària de vorademana, un any a l’AGOi mig de de treball, Manresa s’han de resolt 2024, la (^)
majoriaaportacions d’incidències de la resta ientitats. seguim adaptant el nostre CRM gràcies a la col·laboració de SinergiaTIC i les
DigitalL’estabilització i Informàtica^ d’aquest ha obert^ aplicatiu la porta^ és al^ undesenvolupament^ dels^ eixos^ del^ curs d’altres^ i^ objectius aplicatius,^ del^ Serveija que^ deSinergiaTIC^ Transformació posa^
aaquesta l’abast eina una (SinergiaTIC,extensa documentació 2026). Aquest de l’aplicatiu, context ha un estat fòrum clau de per suport al desenvolupament i anima a les entitats del treball. a utilitzar
accedeixTambé mitjançant^ per^ aquest usuaris,^ motiu, delsla^ base quals^ de n’hemdades^ (elcreat^ _backend_ un (únicament)^ queda^ forade lectura)de^ l’abast per^ dela podertreball. fer^ S’hi les^
crides amb l’API. **2.2.2** (^) **Tipologia i volum de dades a tractar.**
crear-neSinergiaCRM de propis,^ estructura tot i que^ de^ maneras’aconsella^ modular adaptar-ne^ les^ seves els^ dades. existents^ Hi^ ha canviant^ mòduls^ pernoms^ defecte i creant^ i^ l’opció camps^ de^
personalitzats. Aquesta taula presenta registres totals dels principals mòduls:
**Mòdul** Afiliats (^) **Registres totals (01/04/2026)** (^) 98.
FuncionsUnitats 270.7461. (^)
AgrupamentsEntorn personal (^) 2.096 (^238)
CursosInscripcions (^) 34.3101. (^)
principalsEl^ CRM mòdul^ utilitza que^ un ha^ esquema adaptat^ relacionalMEG i també^ SQL comque^ eses^ potrelacionen.^ veure^ en Aquestl’ **Annex** esquema^ **A** ,^ on^ hi és^ ha flexible,^ un^ llistat ja^ delsque^
comactivament hem dit per es podena afegir afegir funcionalitats relacions i campssegons mitjançant les necessitats la configuració. i demanda SinergiaTIC de les entitats també amb treballa qui (^)
col·labora. 3


(^) **2.3 Necessitats digitals en la gestió associativa.**
informacióTal^ com d’una^ diu^ SinergiaTIC,manera eficient^ estem afecta^ en tant^ un l’encert^ moment com^ en la^ què rapidesa^ saber de^ utilitzar la presa^ tant de decisions.les^ eines com^ la^
l’úsComencen eficaç de^ atecnologies^ aparèixer^ endins^ molts l’entitat^ projectes es torna^ de^ unacurs necessitat.les^ paraules Si^ dades,no, es^ digitalització,genera una escletxa^ actualitzar... digital^
entred’aquests els aplicatiusaplicatius quesembli ofereix imposat, l’entitat i descontenta a les sòcies l’usuari. i les Aquesta alternatives escletxa del (^) esmercat nota moltque (^) mésfa que en l’úsuna (^)
entitattecnologies. juvenil com MEG, ja que parlem d’un perfil de voluntariat jove, acostumat a les noves
instantàniaUn^ exemple s’ha obertque^ molts’ha^ decomprovat pas en la^ durantmanera^ l’estada com es^ comuniquende^ pràctiques voluntariat^ és^ el^ fet i^ OSG,que^ la enfront^ missatgeria de les^
clàssiquestenen un telèfon (i sovint propi més amb eficients) WhatsApp trucades d’empresa. i correus. El formatMEG s’ha mòbil, obert doncs, un canal s’ha convertitde Telegram en un i lessuport ST (^)
queformat quasi escriptori. sempre tenen a sobre, accessible i immediat, i comença a desfasar l’aplicació d’ordinador en
escletxaL'ús^ d'IAdigital,^ també ja que^ ha no^ començat està integrada^ a^ estendre's ni aprofitada^ entre^ aquesten cap^ delsvoluntariat, aplicatius^ i^ separa de MEG.^ encara més^ aquesta^
Per **2.4** a ser^ **Abast** coherents^ **del**^ **projecte** amb la limitació^ temporal del TFG, aquest projecte se centra únicament a
desenvoluparFormació. Per lestant, parts en queden corresponents fora els nivells a usuaris de “Demarcació” amb rol de i nivell“Generals”. d'“Agrupament” i Equips de
nomésLa^ resta des delde^ funcionalitatspunt de vista dees^ reservenmodel, per^ per aa poder^ una^ possible adaptar^ actualitzacióràpidament l’aplicatiu^ o^ treball^ futur, i no sobreposar-sei^ es^ treballaran a^
les que sí que es tractaran.


# Capítol 3. Estat de l’art

pròpiaEn^ aquesten comptes^ capítol d’adaptar^ s’exposen una^ els opció^ motius existent.^ pels^ qualsL’estudi^ s’ha de^ optat les diferentsper^ un^ desenvolupament opcions actuals i^ d’aplicacióquina resol^

millorentitats el sense problema ànim s’hade lucrefet a itravés voluntariat d’articles i s’exposa recents enque les estudien següents l’impacte pàgines de prenent la digitalització com a base en (^)
l’estructura del programari: context general, backend, middleware, frontend i incorporació d’IA.

## Entrem 3.1^ Digitalització en un model de negoci^ en^ el en^ Tercer què la presa^ Sector de decisions^ és cada cop més important, i requereix

immediatesaeficient l’empresa, i fonaments. però hi Normalment,ha tot un conjunt aquestes d’entitats decisions socials sempre Sense responenÀnim de (^) Lucrea fer més(SAL) rendible amb un i (^)
paradigmaSAL (Berret, diferent. 2022), (^) elTot Tercer i que Sectorinvertir sol en presentar tecnologia més millora reticències l’eficiència a aquesta i l’impacte digitalització. també en entitats
d’aquestesSegons^ unentitats^ estudi té^ sobreun grau^ la^ bretxa de digitalització^ impulsat^ per avançat.^ M4Social Una^ (Cuenca, de les raons2022), que^ indica descriuen^ que^ només Godefroid^ un^ 27% et^
al.(normalment (2023) és bénsla por escassos) de desviar-se a mantenir de la omissió desenvolupar de l’entitat, una centrarnova eina. recursos, Tot i personalaixò, Berret o formació (2022) (^)
mostraelevada, que tot lai que inversió en aquests i la millora casos laestan proporció directament és menor. relacionats Com s’ha fins explicat i tot quan al capítol la despesa 2, MEG pugui fa unsser (^)
anysUna que altra té la de transformació les raons que digital destaca com Godefroid a eix de curs, et al. per (2023) això és ha la donat manca suport de solucions a aquest treball.adequades (^) a la
tasca.d’organitzacions Ja que molts del sector dels (^) niproblemes per altres (^) empresesamb què i,es per troben tant, el només han comú estat són d’interèsaquests dos per escenaris: a la resta
- Existeixpoc adequada una solució o s’estan estàndard, matant però mosques no és aprou canonades. perfilada Sovint, o té massa les solucions funcionalitats, estàndard per tant, venen és (^)
acompanyadesimplementació. d’una manca d’assessorament i suport que fa tirar enrere la seva

- Noviable existeix seguir cap amb solució el model estàndard, analògic) i esi si pot aquesta arribar arribarà a entrar “construint en el debat o de comprant”. si és necessària (o és
se’nPer puguin^ a^ resoldre nodrir^ aquests totes^ neguits,les entitats^ SinergiaTIC participants^ proposa (SinergiaTIC,^ un^ projecte 2025).^ associatiu, Aquest^ fet treballa^ mida voli^ del també^ qual^

contribuirAltres estudisa aquesta també filosofia. apunten (^) cap a la centralització d’aplicatius com a tendència en les entitats
SAL,(Mato (^) ‐sobretotSantiso (^) eten al.,la 2023).manera D’aquí de comunicar-se neix la voluntat entre del voluntaris treball de i recollirentitat: elsl’anomenat directoris, omnicanal i d’oferir (^)
tantes funcionalitats **3.2 Sistemes** com **de** sigui **gestió** possible **de** (^) dins **dades** l’aplicació. **i CRM.** (^)
forminUn^ CRMpart (o^ és potencials)^ un^ sistema i^ ontotes^ una les^ entitat seves^ relacionscentralitza perquè^ totes^ lespuguin^ dades gestionar-les^ disponibles elsde diferentspersones queserveis^ en^
de l’entitatUn dels en principals un sol programari, avantatges sense d’un dependreCRM (Nwabekee d’altres aplicatius. et al., 2024) (Vázquez, és la capacitat 2026) (^) de recollir i fer
seguiment d’aquestes interaccions que té una persona afiliada (“client”) amb l’entorn que modela


(^) l’eina (funcions, cursos, agrupaments...) alhora que s’estableix un vincle amb l’entitat. A més, un
CRMqualsevol ha detipus permetre de dades, recollir sinó la (^) col·lecciódades i interaccionar que permet i amba l’entitat elles (^) prendrede manera decisions ràpida eficients. i fàcil, però no
agregar-se,Totes^ les veure^ relacions tendències^ que^ es iregistren fer previsions^ són^ importants sobre “el^ permercat”^ si^ soles, (Specchia,^ però^ també 2022),^ permeten és a dir,^ a dinàmiquesl’entitat,^ en^
socials **3.3** dels **_Backend_** pobles i ciutats **i** **_middleware_** on MEG té impacte.
**RESTful3.3.1 API**^ **Patrons** : una API^ **arquitectònics** ( _Application_^ _Programming Interface_ ) es considera que compleix
ambrecursos els requisitsa través RESTd’interaccions ( _Representational_ (crides a (^) l’API) _State_ (^) _Transfer_ de manera) quan reconeixible, permet la estandarditzada transferència de i (^)
sense2025). dependre Es poden d’uncridar llenguatge fent servir dellibreries programació i eines (^) aconcret l’abast (Glossarydels desenvolupadors. of Web Terms | MDN,
En **MVC** aquest: són treball les sigles es treballa de Model-V amb l’APIiew-Co dentroller SinergiaCRM., i fa referència (^) a un patró de disseny que
permetmanera implementarindependent. l’estructuraLa separació de de dades, conceptes la seva fa quevisualització tasques dei lamanteniment lògica de controli millores de (^)
siguinTerms més| MDN, senzilles 2025). perquè Una de canvis les tendències en una part en aplicacionsno haurien d’afectarweb és delegar la resta part (Glossary de la lògica of Web de (^)
negocidades actualitzades. a la part del client, i no tota al servidor, emprant Ajax (crides asíncrones) per a tenir
d’ _Enginyeria_ És^ també^ el _de_^ model _Softwar_^ base _e per_^ a^ partir _a Aplicacions_^ del^ qual^ _Web_ s’ensenya (Martínez,^ a^ programar O. 2024)^ l’aplicació i el que s’ha^ a^ l’assignatura escollit per^
a desenvolupar **Modularitat** l’aplicació.: la modularitat (^) en una pràctica de disseny és una tècnica de disseny del
programariintercanviables, que talemfasitza que cadascun separar conté la funcionalitat tot el necessari d'un per programa a executar a nomésmòduls un independents, aspecte de la (^)
funcionalitatSeparar la desitjada lògica de(Contributors negoci i lesto Wikimedia funcionalitats projects, en 2025b“mòduls”). (^) facilita el manteniment i
desenvolupamentclasses en altres seccions de cada del mòdul programa, de manera la correcció independent, d’errors la en reusabilitat aïllament i dela (^) gestiócomponents de cada i (^)
mòdul sense **3.3.2** alterar **Anàlisi** la resta **comparativa** del programa **de frameworks** (Ricciardi, 2024).
es connectinActualment, a un^ hi servidorha^ diferents web^ alternatives i l’elecció influiràper^ a^ desenvolupadors en el rendiment,^ que l’escalabilitat^ volen^ dissenyar i el mantenimentaplicacions^ que de^
lacom mateixa a principals (Paula opcions et al., 2025). i es justifica En aquest l’elecció apartat de (^) laes darreradescriuen per iadequació comparen alDjango, projecte. Node.js i Laravel
de **Node.js** la gestió:^ ésde^ uncodi^ entorn asíncron),^ que^ executa té un _JavaScript_ ecosistema,^ permetampli i^ connexions un repositori^ concurrents de paquets^ (amb que^ l’inconvenient dona accés a^
milers de llibreries. El principal inconvenient és la corba d’aprenentatge.


(^) **Django** : és un framework basat en _Python_ que prioritza el desenvolupament de codi i les bones
pràctiques,(autenticació, té (^) sessions,integrades seguretat...). característiques Basa quela seva ajuden arquitectura a fer tasques en el comunesMVC i té al una desenvolupament comunitat activa. web
capa **Laravel** d’extracció:^ utilitza a través^ _PHP_ d’i^ _Eloquent_ proporciona _ORM_^ un^ conjunt(que simplifica^ d’eines lade sintaxi^ gestió dede SQL)dades i comdesenvolupament^ migracions,^ una de^
plantillesd’una manera amb molt _Blade_ clara,. Basa cosa la queseva es arquitectura tradueix en (^) unaen elcorba patró d’aprenentatge MVC i organitza més ràpida.el codi de l’aplicació
baseCom de^ quedades^ les intermèdia,connexions noamb s’espera^ l’API^ deun^ SinergiaCRM creixement horitzontal^ es^ basen^ en de^ _PHP_ l’aplicació,^ cal^ gestionar i la gestió^ i^ crear de^ una la^
seguretatD’altra dels banda, webs MEG a MEG ja estàha utilitzatexternalitzada, aquest **Laravel** framework és unper framework a desenvolupar molt adient altres peraplicacions al projecte. que (^)
connectin **3.4** amb **Bases** l’API **de** de **dades** SinergiaCRM **i modelització** i estudiant-ne el codi es poden trobar exemples.
Una _ETL_ **3.4.1** (Extract,^ **Arquitectures** Transform^ **de** and^ **dades** Load)^ **intermèdies** és un procés^ **(ETL)** de^ tres fases com a part d’un procés de
tractament2025a). Inclouen de dades rebre entre les unadades, o mésnetejar-les fonts d’entrada i adaptar-les i de persortida a enviar. (Contributors to Wikimedia projects,
(APIAquest de SinergiaCRM),^ disseny^ és^ el lesque modela^ segueix a^ eltravés^ middleware de _Eloquent_^ del^ projecte, _ORM_ (Object^ ja^ que Relational^ demana^ unes Model)^ dades de Laravela^ la^ font ,^
i les adapta a (^) **3.4.2** un format **Bases** llegible **de dades** i útil per al frontend.
PodemEl **model** dividir **relacional** les bases o **SQL** de dades **(** **_Structured_** en dos principals **_Query Language_** models, relacionals **)** és el model i no més relacionals. comú i tradicional (^) de
basemodel de (esquema dades. Tot tabular), i que esunes pot regles modificar, i unes elrelacions. seu comportament En canvi, els depèn **models** de (^) **no-relacionals** la definició estricta o **NoSQL** d’un (^)
**(Not** problemes. **only** (^) **SQL)** (Khan (^) presentenet al., 2023a) un esquema dinàmic, al qual es pot afegir informació o camps sense
tracten,El^ model mentre^ relacional el no-relacional^ permet^ ésinsistir més ràpiden^ una en^ consistènciano haver de^ feri^ estandardització aquestes comprovacions.^ de^ les^ dades Per^ aixòque^ esel^
modeld’accés no-relacional a discs durs (Amazons’escull (^) Webtambé Services, quan es n.d.). vol prioritzar el rendiment, ja que elimina la latència
ellsEl (Khan^ primer et^ al.,es^ fa 2023a),^ servir comper^ aés^ emmagatzemar el cas per a l’aplicació^ taules^ de d’aquestdades^ i^ registres projecte.^ que El segonestan^ relacionatsés més útil^ entreper a^
casoscap de més les funcionalitatsconcrets, com que taules es preveuende Clau-Valor, desenvolupar. Grafs o Documents, que de moment no són presents en
perKhan al projecte^ et^ al.^ (2023b) que desenvolupa,^ conclou^ també ja^ queque^ una el empresacost de^ potcanviar^ escollir el^ eltipus^ model de^ queservidor^ li^ sigui o^ mésforçar^ adient els^
desenvolupadorsllenguatge estàndard a canviar i poden el aparèixer tipus de incompatibilitats.llenguatge i entorn poden ser elevats, pel fet que no hi ha un


(^) **3.5** **_Front end_**
mòbilsL’ús encada empreses^ cop^ més sigui^ estès unai^ l’alta necessitat^ disponibilitat creixent^ dels i quetelèfons marca^ intel·ligents una diferència^ fa^ que significativa.^ les^ aplicacions El^
desenvolupamenttecnològica de l’usuari, d’una dissenyadesaplicació haamb estat funcionalitats històricament específiques lligat al de sistemacada plataforma, operatiu (^) cosade la que pila fa (^)
quemés mostrinampli neixen una integració llenguatges i rendiment multiplataforma, elevats. Darrerament,que permeten amb arribar la voluntata més clients d’arribar sense a unhaver públic de (^)
mantenir codi **3.5.1** en múltiples **Llenguatges** llenguatges **nadius** (^) i **(** intentant **_platform-specific_** mantenir (^) **o** l’eficiència **_native_** **).** (Ramachandrappa, 2024).
aplicacions.Cada^ sistema En el^ operatiu cas d **'iOS**^ té^ un parlem^ llenguatge de _Swift_^ de^ programació(o _Objective-C_^ propi) i en^ amb cas^ el d'^ qual **Android**^ estan^ parlemdesenvolupades de _Kotlin_^ les (o^
_Java_ (StatCounter). Aquests Global dos (^) Stats,sistemes n.d.). operatius WhatsApp, formen Spotify el 99,75%o Google de Maps l’ecosistema són aplicacions de plataformes natives (Schmitt, mòbils (^)
2022).Els (^) avantatges de desenvolupar aplicacions natives inclouen un rendiment alt, ja que s’aprofiten
totesles interfícies les característiques també es desenvolupen i recursos del tenint sistema en operatiucompte la i unaplataforma. UX ( _User_ Així _eXperience_ i tot, això) suposaintuïtiva, també ja que un (^)
costmantenir més elevatper separat tant de(Kotlin, temps n.d.). de desenvolupament com de contractació, ja que els projectes s’han de
Amb l’objectiu **3.5.2**^ **Llenguatges** de dirigir-se^ **multiplataforma** a usuaris amb^ **(** **_cross-platform_** qualsevol dispositiu, **)**^ neixen els llenguatges de
programacióAPI unificada, multiplataforma, cosa que permet que accedirutilitzen a _SDK_ funcionalitats ( _Software_ d’ambdues _Development_ plataformes _Kits_ ) específics (Schmitt, des 2022).d’una (^)
AlgunsL’avantatge exemples dels d’aplicacions llenguatges multiplataforma multiplataforma serien és Instagram, que redueixen Alibaba elso Skype. costos (^) i el temps de
desenvolupament,base de codi). Per elcontra, codi ésno mésofereix fàcil tanta de mantenir consistència i es poten reusarla UX (jai costa que estàmés centralitataccedir a funcionalitatsen una única (^)
específiquesJavaScript), **Flutter** del dispositiu (Google, (Kotlin,basat en n.d.)Dart) (^) iEls **.NET** més **MAUI** populars (Microsoft, són **React** basat (^) **Native** en C#). (Meta, basat en
programadorsReact,^ JavaScript que els^ altresi^ TypeScript competidors^ segueixen (Stack^ sentOverflow,^ opcions 2025).^ més El^ popularsfrontend^ dei^ utilitzadesla nostra aplicació^ entre^ els es^
desenvoluparà **3.5.3** amb **Aplicacions** aquests frameworks **web progressives** i llenguatges. **(** **_PWA_** (^) **)**
PWAUna intenten^ alternativa imitar^ creixent l’experiència^ a^ dissenyar de les^ una aplicacions^ aplicació natives^ mòbil^ són aprofitant^ les^ aplicacions les opcions^ web del^ progressives. navegador webLes^
iqualsevol llenguatges plataforma com JavaScript, i fàcils de distribuir,CSS o HTML,ja que només sent d’aquestacal publicar-les manera en (^) líniatambé (MDN, accessibles 2025). des de
d’aquestaLes^ PWA aproximació^ ofereixen^ mésés que^ simplicitat, moltes derapidesa les funcionalitats^ i^ costos^ més del^ eficients, sistema^ però operatiu^ la^ mancança encara estantprincipal en^
desenvolupamentexperiència a l’usuari, i no tot són i que del la (^) bretxatot aprofitables. de funcionalitats Les aplicacionspodria tancar-se natives si lesofereixen API web una i el millorsuport (^)
dels navegadors augmenta (Seeni, 2023).


(^) **3.6 Entorn de Desenvolupament Integrat (** **_IDE_** **), test i desplegament**
triarUn un^ cop IDE.^ escollits La pila^ els tecnològica^ llenguatges tantde^ programaciódels ordinadors^ per dea^ les l’oficina^ diferents com^ parts ordinadors^ del^ projecte, portàtils^ cal^ tambéés de^
Windows,consecutiu ii l’IDEel més escollitdesitjat seràentre Visual els programadors Studio Code, (Stack que haOverflow, estat el 2025). més utilitzat A més deper disponibilitat cinquè any (^)
d’extensions (^) **3.6.1** i facilitats **Expo** en la programació amb eines com Copilot.
específiques,Donat^ que Hutri^ el^ frontend (2023) recomana^ es^ desenvoluparà fer servir^ laen cadena^ React d’einesNative d’i^ **_Expo_** no^ hi, jahaurà que permetfuncionalitats desenvolupar^ molt^
aplicacionsAndroid Studio només o ambXCode), TypeScript instal·lar (superconjunt llibreries des de deJavaScript, la línia deperò comandaments tipat), sense IDE( **_Expo_** nadius **_CLI_** (com), un (^)
enrutamentsense connexions. senzill dins l’aplicació i actualitzacions de codi _OTA_ ( _Over The Air_ és a dir, a l’instant i
l’aplicacióTambé^ comptaen qualsevol^ amb dispositiuun^ entorn a^ lade xarxa^ desplegament, mitjançant^ l’escaneig **_Expo_**^ **_Go_** , d’unque codipermet QR,^ compilaro fins i tot^ i deexecutar fora la^
xarxaprojecte amb de (^) nou.tunelització. Aquest mateix entorn fa les actualitzacions OTA i no cal compilar tot el
Els **3.7** agents^ **Agents** d'IA encara^ **d'IA**^ no són habituals i la majoria dels desenvolupadors no utilitzen agents o
s'adhereixenen tasques de a desenvolupament eines d'IA més senzilles de software. (Stack Overflow, 2025). La majoria d’agents d’IA es fan servir
augmentenUtilitzar-los, la productivitat,^ però,^ té^ impactes mentre^ positius que la majoriareducció de^ del desenvolupadors^ temps^ dedicat^ a coincideixen^ desenvolupament en el^ i,fet^ per que^ tant, no^
ha2025). ajudat (i en alguns casos empitjorat) la col·laboració dins de l’equip de treball (Stack Overflow,
o simplifiquiPer^ a^ aquest una^ treball tasca^ es volconcreta.^ integrar Les^ una funcions^ funcionalitat escollides^ desenvolupada preferiblement^ amb^ un són^ agent el d'IAprocessament^ que^ redueixi de^
llenguatgehan estat els i (^) GPTla integració d'OpenAI, amb tot API i que (Stack hi ha Overflow,una tendència 2025) creixent i models entre més Claude emprats (45%). (82%) l’últim any
token.Els agents^ d'OpenAI^ estan^ disponibles^ via^ API^ per^ a^ desenvolupadors,^ tot^ i^ que^ tenen^ un^ cost^ per^


## Capítol 4.1 Requisits 4. Requisits Funcionals del sistema

```
Codi4.1 Requisits^ Funcionals^ Requisit Funcional Prioritat
RF-01 Inici ambde verificació^^ les de^^ seves sessió^ d’identitatcredencials:^ Els^ usuaris per^ dins^ han garantir^ elde^ CRM.^ poder la privacitat^ Caliniciar^ incloure^ sessió de lesalgun^ i^ serdades.^ identificatsmecanisme ALTA
RF-02 Permisos: ocultarsistema^ informacióde^ permisos.L’aplicació^ i^ accions ha^ de^ segonsllegir^ els^ aquests.^ rols^ actius^ Cal^ implementarde^ l’usuari^ i^ mostraraquest^ o^ ALTA
RF-03 Estructura queestructura^ permeti intermèdia.^^ de la^^ gestió dades^ :eficient El^ sistema^ i^ l’escalabilitat.^ ha^ de^ tenir^ un^ Cal^ disseny^ dissenyar^ intern^ aquesta^ de^ dades^ ALTA
RF-04 Visualització mostrari els seus^ informació infants.^ de^ dades^ de^ l’agrupament^1 :^ L’aplicació^ o^ hala^ unitatd’incorporar^ a^ la^ qual^ una^ pertany^ pestanya^ l’usuari,^ on^ MITJA
RF-05 Visualització gràfic, un resum^ de^ de dades la informació^1 :^ L’usuari clau^ ha^ dedels^ poder totals^ consultar, de l’entitat.^ en^ format^ MITJA
RF-06 Funcionalitat unitat, l’agrupament^ 1:^ La^ interfíciei la demarcació.^ ha^ d’integrar un^ calendari^ de^ curs^ de^ la^ BAIXA
RF-07 Funcionalitat l’assistència dels^ 2:^ infantsL’usuari de^ ha la^ de unitat^ poder on^ crear participi.^ esdeveniments i^ controlar^ BAIXA
RF-08 Funcionalitat s’utilitzi alguna^ 3: eina^ L’aplicació d’IA generativa^ ha^ d’incorporar o per a automatitzaruna^ funcionalitat processos.^ on^ BAIXA
RF-09 Funcionalitat acreditin la pertinença^ 4:^ L’aplicació a l’entitat.^ ha^ de permetre^ generar^ documents^ que^ BAIXA
4.2 Requisits No Funcionals
Codi Requisit No Funcional Prioritat
RNF-01 Plataforma mòbils.middleware^ Ha^ de :s’allotjarà^ L’aplicació^ ser^ compatible als^ ha servidors^ de^ tant^ tenir^ amb^ webuna^ Android^ interfície de MEG.^ com^ adaptada en^ iOS.^ a^ Eldispositius^ ALTA
RNF-02 Estructura quemòduls.^ permeti D’aquesta^^ modular escalar manerafuncionalitats,:^ L’aplicació la resta^ ha siguide^ de l’aplicatiu^ presentarafegint,^ modificantno^ una es^ estructuraveu afectat.^ o^ eliminant^ modular ALTA
```

```
RNF-03 Practicabilitat ded’altres l’aplicació. aplicatius Per:^ El dea^ temps valorar-ho l’entitat^ de^ resposta que ho escompararem consideren^ no^ ha^ de^ comprometre ambestables. els temps la d’execució^ practicitat^ ALTA
RNF-04 Procés necessitats^ participatiu específiques:^ El deprojecte les caps^ ha dinsde^ tenir de l’organització.^ en^ compte^ la^ realitat i^ les^ MITJA
RNF-05 Imatge l’aplicacióMEG.^ corporativa^ ha^ d’alinear-se:^ L’estil^ amb^ (font,^ la^ resta^ gamma^ d’aplicatius^ de^ colors,^ desenvolupats^ icones...)^ de^ per^ BAIXA
4.3 Restriccions del projecte
Codi Restricció
R-01 Disponibilitat habilitatcredencials^ per són^ l’administrador^ de privades,^ les^ dades la :^ qual^ dePer^ MEG^ cosaa^ accedir^ olimita^ l’usuari^ al reproduirCRM^ de^ lectura.de^ SinergiaTICalgunes^ Per partsseguretat,^ cal de^ tenirl’aplicatiu.^ aquestes^ un^ compte^
R-
```
**Disponibilitat** middleware i backend. **del codi** (^) Per **i altres** accedir **recursos** a la base: L’aplicatiu de dades secal separa un usuari en (^3) proporcionat blocs: frontend, per
MEG.descriuran Les funcionsen aquest de projecte l’API intermèdia(igual que l’estructuras’allotjaran intermèdiaal servidor dede (^) dades),MEG, i funcionarantot i que es (^)
com una caixa negra. El frontend que fa peticions a l’API estarà penjat a GitHub.
Com **4.4** s’ha^ **Casos** dit en^ **d’ús** el capítol^ 2, en aquest projecte es limita el desenvolupament de funcionalitats als
rolsveure que en esla tauladesenvolupin de l’ **Annex** en (^) l’àmbit **B** i, per d’Agrupament.tant, es poden resumir Aquest els paraigua casos d’úsinclou amb les la funcions següent quetaula: es poden
**InfantsRol**^ Sense accés a l’aplicatiu. **Casos**^ **d’ús**^
**Cap de branca (actiu)** VeureCRUDCRUD^ llistat assistènciaconvocatòries^ d’infants a caus^ iper^ equip (^) a excursions^ (unitat)^ AprovarVeureGenerar^ detall certificatsactes^ d’infants
**Equip d’Agrupament** VeureCRUDPenjar^ llistat actesconvocatòries^ d’infantsper a aprovar^ ia^ equipsConsells (totes de Caps^ les^ unitats) Generar certificats
**Intendència** Veure llista d’al·lèrgies i intoleràncies
**TOTS** VeureVeureVeure^ informaciódadescalendari de l’entitat^ de^ l’Agrupament EnllaçosVeure perfil^ a^ altres aplicatius^


(^) **4.4 Limitació temporal**
d’entregaCal^ tenir marcada^ en^ compte per a mitjansque^ aquest de juny,^ projecte per tant^ compta s’ha dividit^ amb^ unael projecte^ limitació en^ lestemporal. següents^ Hi fases:^ ha^ una data^

- - **IniciPlanificació** : definició: definició del projecte, de l’abast pluja id’idees, calendarització. justificació i objectius.

- - **ExecucióTancament** : fase: presentació de programació de l’MVP, lliurable, prova prototipatge d’usabilitat, i avaluacióproves. (^) dels resultats
Les-^ fases **Memòria:** s’han repartitdocumentació segons^ delel diagrama^ projecte^ ide^ redacció Gantt de^ del l’^ treball. **Annex**^ **C**.


## Capítol 5.1 Arquitectura 5. Disseny i arquitectura general del sistema del sistema

L’arquitectura **5.1**^ **Arquitectura** global de les^ **general** peticions^ **del** es mostra^ **sistema** en el^ diagrama de l’ **Annex C** , tenint en compte les

opcionsEl client de disseny fa accions que s’handins l’aplicació,explicat al **Capítol** que poden **3** i elsfer requisits una crida que al hamiddleware. d’integrar delAquest **Capítol** està (^4) muntat. (^)
sobredades uni objectes framework del **model** MVC. (o Els fan **controladors** crides a l’API de de Laravel SinergiaCRM). en PHP tracten i apliquen funcions sobre les
actualitzadesAquest^ model s’encapsulen^ encapsula dins^ les una^ crides “ **vista**^ de”,^ MySQLque acaba^ de sent^ la^ unbase objecte^ de^ dades JSON,^ del que^ servidor. després^ Unés moltcop^
fàcilD’una de manipular manera similar,dins l’aplicació el mateix perquè controlador està desenvolupada es connecta a enles ReactAPI de (TypeScript). Sinergia i OpenAI. (^)
Per **5.2** a fer^ **Arquitectura** l’API s’ha habilitat^ **del** el^ **middleware** subdomini: testapi.escoltesiguies.cat^ **(API**^ **intermèdia)**. Per^ a començar, des de Plesk
s’has’està muntat muntant l’esquelet un middleware de l’aplicació i no una de aplicació, Laravel. (^) nomésAixò genera es llisten un elsarbre que de se’ls carpetes, ha donat tot utilitat:i que com que
**app:** - En **Http** aquesta **>** (^) carpeta **Controllers** hi ha tot (^) **:** el Comrelacionat hem ambexplicat, l’aplicació en aquesta i la interacció carpeta amb s’hi el han client: creat (^) tots els
controladorsgestiona totes necessaris. les accions Per relacionades defecte n’hi amb ha la (^) classe.un per Elsa cada mètodes classe s’han del declaratmodel, (^) estàtics,que és quino (^)

- cal **Models**^ instanciar-les. **:** En aquesta^ carpeta s’organitzen totes les classes del model. Cada una té els seus
    atributs,les funcionalitats constructors, de **Eloquent** regles de **ORM** validació,. claus primàries i relacions entre classes utilitzant

- **Services** que és una **:** classeEn aquesta que segueix carpeta un s’hi model han (^) deposat _singleton_ dos fitxers., ja que El només primer volem és **APIService.php** fer una connexió, (^)
ambencapsula l’API lade lògica SinergiaCRM de connexió, i evitar i serà reconnexions un atribut comúsi dos que usuaris tindran entren tots alhora. els controladors Aquesta classe per a (^)
ferfitxer peticions. **APIClient.php** A més, té (SinergiaTIC, un atribut que 2022), és el que client és quide (^) finalmentl’API, que fa és les la cridesclasse externes. definida en el
**database** s’han de preparar **> migrations** uns arxius **:** de Per migració. a passar En de aquests, les classes s’ha deespecificat Eloquent l’ordre a la configuració de creació dede les MySQL taules (^)
per **resources** a crear les (^) **>** relacions **views** (^) **:** també En aquesta de manera carpeta ordenada. hi ha (^) les plantilles de Blade, un llenguatge que permet
generarcondicionals. HTML d’una manera similar a JSP. Permet inserir variables, fer iteracions i operar amb


```
PHP
```
```
PHP
```
(^) **routes > web.php:** L'enrutament amb Laravel es gestiona dins aquest fitxer i és també molt
senzill, ja que per a crear un nou _endpoint_ només cal afegir la següent línia de codi:
<?phpuseRoute::get( Illuminate\Support\Facades\Route; // CREAR'/ruta/al-nou-endpoint' UN NOU ENDPOINT DEL (^) ,MIDDLEWARE
D’aquesta[ClasseControlador:: manera, en accedir classa l’URL,^ 'funcio_del_controlador' **testapi.escoltesiguies.cat** ]);^ **/ruta/al-nou-endpoint**
amb **ClasseControlador** una petició **GET**. Aquesta, s’executaria funció lahauria funció de retornar **funcio_del_controlador** alguna cosa (un HTTP definida Response), dins (^) quela classe en el (^)
cas (^) Perd’aquest a peticions middleware **POST** és, queun objecte desin informacióJSON. (^) a la base de dades, també se segueix la mateixa
dinàmica. **storage** (^) **> logs:** Per a fer registres d’execució i traçabilitat d’errors. S’han configurat com a
registres diaris. Per a fer un Log cal afegir la següent línia de codi:
<?phpuse Illuminate\Support\Facades\Log; // FER UN 'LOG' SENZILL A LA CONSOLA
**public** Log::info( **:** en aquesta"Text carpetaa^ registrar hi ha totsa^ laels^ consola"arxius accessibles);^ des del web, però en aquest cas tots els
arxius i la lògica **5.2.1** de **Pila** negoci **tecnològica** pot estar (^) **del** amagada. **servidor** (^)
SinergiaCRMEl^ servidor té^ unon nuclis’allotja de 4 CPUl’API amb^ intermèdia 8 GB de^ RAMque^ gestionarà i 300 GB d’espailes^ crides d’emmagatzemament^ a^ l’AcontPI^ REST SSD.^ de
usuariTal icom contrasenya^ s’explica **5.2.2**^ **Connexió** (emmagatzematen^ la^^ seva **amb**^^ Wiki **el**^ **CRM** dins^ (SinergiaTIC,^ les variables^ 2026), d’entorn^ a^ banda de l’API),^ del^ servidor i que s’ha^ web configurat^ cal^ també a^ un la^
instànciade tots els de registres CRM de dels l’entitat. mòduls S’ha que intervindrancreat un nou amb rol (APIl’aplicació. Lectura) que només té permisos de lectura
bàsicanovesLes consultes^ tindriafuncions l’estructura i dea partir^ _login_ de^ isegüent^ _logout_ les que^ deesja (^) disposavapotla^ sessió veure^ venenl’entitat.en l’ **Annex**^ definides **D**. Peren^ ela^ fitxeraquest^ d’exemple. treball s’han^ Una dissenyat^ petició^
auxiliarscontroladors.En^ el mateixper a encapsularannex^ podem la^ veurelògica^ l’estructura de crear objectesdels^ objectes a partir^ de^ lad’aquestes^ resposta.^ S’hanestructures^ creat funcionsdins els^
seguintEn^ l’ la **Annex** lògica **5.2.3**^ **E** de^^ **Model** es les^ pot dades^^ **de** veure^ **dades** dins^ un el^^ diagrama **intermedi** CRM, l’estructura^ relacional^ dede l’entitatles^ taules i les^ SQL funcionalitats^ de^ la^ nostra a^ baseimplementar.^ de^ dades,
S’ajudas’hanCom de de hemdefinir la^ explicat,classe totes abstracta les^ Laravel accions permet **Migration** que esfer faran^ migracions, que durant té dues^ dela classesfuncions:migració^ del i **up()** quemodel altereni **down()** a^ la^ basela .base Dins^ de dedades de dades, la^ MySQL. primera i dins^
la segona totes aquelles accions necessàries per a revertir el procés de creació (Laravel, 2026).


(^) Cal definir els noms dels camps, el tipus, la clau de la taula i les relacions. Les funcions per a
fer-hounataula. sintaxi L’execuciósón a més la documentació, senzilla. de la migració En l’ (^) **Annex** i intentenes fa (^) mitjançant **F** esimitar mostra el terminal lèxicun fragment i encapsularamb la per comanda ala fer lògica la **php** migració del **artisan** llenguatge bàsica **migrate** SQLper a amb (^) .una
s’hadaPer de restringir,^ a^ regular **5.2.4**^ **Sistema**^ queles^ accionsl’API^ **de** pot^^ **permisos** que retornar^ l’usuari^ s’ha^ pot ideat^ fer,^ les un^ vistessistema^ que de^ es permisos^ poden^ retornar amb bits.^ i^ la Tota^ informació la lògica^ que de^
permisosLa seqüència s’executa comença en el seu demanant propi controlador les funcions i es cridaactives durant de l’usuari l’inici deal sessió.CRM. (^) Després s’executa un
bucleatribut(que està per de totes (^) relacionatla taula les funcionsd’usuaris. amb la itaula es Així, marquen d’usuaris), a cada uns petició bitsi extreu segons que el rebi camp el rol l’API, calculat, i el grup.l’aplicació que El númerono demanavaria final mentre l’ID es desatéde la l’afiliat comsessió a (^)
iniciada.molt baixa. Com L’execució que aquesta és òptima, informació ja que està el desadatemps ésa lalineal base ( de𝒪( (^) 𝑛dades,)). és una consulta amb una latència
siguipermisosD’aquesta molt calculats eficient,^ manera i jaels^ també quepermisos noméss’aconsegueix teòrics cal fer que queuna hauria^ decidirconjunció de^ sitenir^ es binària^ potper^ retornara (^) accedir.sobre elsinformació Aquesta bits (bitwise operació^ d’aquella AND) és^ petició també dels^
molt ràpida **5.3 Arquitectura** i permet calcular (^) conjunts **del frontend** de rols en **(aplicació** temps d’execució **mòbil)** constant (𝒪( 1 )).
**Native** Com^ (TypeScript),s’ha **5.3.1**^ comentat^ **Pila** ja^^ **tecnològica** al que^ Capítol és un^ 3,^ **del** l’aplicaciósuperset^ **client**^ de^ s’ha JavaScript^ construït (idealutilitzant per^ com a gestionar^ a^ llibreria les^ principal respostes^ **React** del^
middleware)Android sense i haveres tracta d’adaptar d’un (^) elllenguatge codi. multiplataforma que s’executarà correctament en iOS i
d’intel·ligènciaUna^ de^ **5.3.2** les artificialparts^ **Integració**^ innovadores generativa^ **de**^ **IAG**^ dinsd’aquest^ de l’aplicacióprojecte^ ésper^ laa^ d’investigarfacilitar alguna^ com tasca^ integrar quotidiana^ un^ agent dels^
voluntaris.l’entitat i és Això una líniaobre d’estudi la porta futur a futures interessant. integracions i automatitzacions dins la resta d’aplicatius de
proposarperòDe que^ jornades éses (^) potla de automatitzarde redacció^ pluja^ d’idees de amb missatges l’aplicació.que^ es de^ van text Tot^ fer per i^ noa aprincipi teniremail una o^ degrups estètica^ curs, de^ fixa,unafamílies.^ desovint^ les És^ tenen tasquesuna feina trets^ que senzilla,similars^ es^ va^
i tenenLa comintegració a objectiu es serfa clarsa partir i comunicatius. de peticions (^) a un controlador, que gestiona totes les rutes
**/ai/[petició]** (d’OpenAI,https://github.com/openai-php/laravel que es, (^) potdesprés fer des (^) deld'instal·lar panell). https://platform.openai.com/api-keys (^) Tambéamb cal **PHP** demanar **Composer** una clau (^) perl’extensió. a accedir de amb GitHub l’API (^)
resposta.processats.L’ús^ dels El Per^ modelsmodel posar-ho d’OpenAIque enhem context, ésescollit^ un tot^ cost, (^) i( **gpt-5.4-mini** que^ segons la petició^ el^ model, depèn) gasta^ que de^ va (^) la4,50 $ llargada^ en^ funció per de delscadal’entrada^ tokens milió (prompt)^ d’entradade tokens que^ i^
és important optimitzar. Un exemple podria ser el següent:
ets cap d'un cau, escriu **Entrada** missatge^ curt WhatsApp **Sortida**^
catalàproper,informal,natural.Normes:emoticonesamb text,no per informar inventis,redacta. de l'excursió Hora a lesinici famílies.To: dissabte, acords 16
de maig, 15:30,hora fi dissabte, 16 de maig,
*Hola (^) *Dissabte famílies! 16 de 👋maig** (^) farem excursió de cau ⛰
*Hora*Hora d’inici:*de fi:* 18:30 15:


```
PHP
```
```
HTML
```
(^) 18:30,ubi Montserrat,descr: Quedem a Can Maçana
per(coneixençaRetorna fer cau només conjunt i cohesió) missatge amb i lapujar format Salut la dewhatsappRoca Viladordis Foradada.
(negreta,salts de línia,emoticones).
*Lloc:*󰣰 󰣯 *Montserrat* — quedem a *Can Maçana*
FaremferForadada* *coneixença *cau 🪨 conjunt i cohesió* amb la 🤝Salut✨ de i pujarem Viladordis* la *Roca per (^)
(^) *Gràcies!* 😊
Això vol dir que^155 amb^ **tokens** 1$^ es poden fer entre 750 i 800 peticions.^130 El^ **tokens** cost, tot^ i dependre de la
demandaperfectament i ús assumible. que se’n fes de l’aplicació, s’estima que no passaria d’uns pocs euros anuals,
Una altra **5.3.4** de les^ **Generació** funcionalitats^ **de**^ **documents** que facilitaria^ molt la tasca a les persones voluntàries és la generació
depersonalitat documents. jurídica Aquesta amb demanda els 158 neixagrupaments. derivada d’unaAixò volsituació dir que singular es disposa que és d’un que MEGmateix comparteix NIF, però (^)
quanesdeveniments...) cal fer tràmits de manera (sol·licitud telemàtica, de subvencions, el certificat ocupaciódigital de del’entitat via pública,només elvenda té la junta.al carrer, Cal, (^)
doncs,representants una maneradel seu (^) agrupament.de certificar que les sol·licitants, que sovint són la base voluntària, són
d’Agrupament,Dins^ l’aplicació que podens’ha^ descarregardesenvolupat un^ PDFaquesta amb^ funcionalitatles seves dades^ per i un^ a codi^ les demembres verificació^ de que^ l’Equip es pot^
validarcom a “vista”des d’un a retornar, altre controlador. ja que són Hocodi fa HTML mitjançant que incorpora les plantilles elements, Blade. variables Normalment, i atributs es PHP,fan servir però (^)
aquest **views/pdf/certificat_funcio.blade.php** mateix codi HTML es pot desar (^) esi (^) generadescarregar de la (^) següentcom a manera:fitxer. Per exemple, la vista
use$pdf Barryvdh\DomPDF\Facade\Pdf; = Pdf::loadView('pdf.certificat_funcio' (^) , [ var, ..., ] ); // variables
Els atributs que es passen es renderitzen amb Blade així:
<div><p>Variable **var** : {{ **var** }}</p></div>


## Capítol 6. Interfície d’usuari i demostració del sistema

Un **6.1** dels^ **Imatge** requisits^ proposats **corporativa** per a aquest^ treball (RNF-05) era alinear l’estil de l’aplicació amb el de

laté restal’objectiu d’aplicatius de facilitar de MEG, la pernavegació començar i l’ús,a buscar ja queuna imatgepermet corporativaals usuaris semblant recordar a l’experiènciatot arreu. Això i (^)
reproduirl’entitat i -la.del TambéPla Estratègic aporta (^) (Minyonsun sentiment Escoltes de pertinença, i Guies de que Catalunya, forma part 2019). també dels objectius de curs de
la Adel^ l’ **Annex** _Dossier_^ **G** _de_^ es^ _campaments_ troben^ dues^ :figures el logotip^ on^ es sobreveuen elles formulari,^ semblances. la Laredacció^ pantalla del^ d’inici títol,^ deel^ sessióformat^ imita del^
formularien compte i quel’enllaç moltes per caps a notificar estan afiliades incidències. amb aquestS’ha afegit document. en el literal del camp l’opció de NIE, tenint
l’aplicatiu,També^ s’hael nom^ imitat de l’usuaril’estil^ deque^ pantalla ha iniciat^ principal, sessió i botonsamb^ una grans^ capçalera mostrant^ amb les opcionsel^ logotip disponibles.^ i^ el^ nom^ Ende^
elequivalents. cas del _Dossier_ En el _de_ cas _campaments_ de l’aplicació,, es mostren es mostren més o (^) sempremenys botons 3 botons segons (que les apareixen funcions iactivats permisos o (^)
desactivats),encara més. Perque a corresponenfacilitar la navegació al nivell des’han les afegitfuncions, la resta i que de dirigeixensubmenús aal un peu. segon menú on es filtren
També s’ha **6.1.1** seguit^ **Estil** l’estil^ **comunicatiu** que marca^ el Pla de Comunicació Externa de l’entitat. L’estil comunicatiu
demanael femení utilitzar genèric sempre ( _les caps_ que). esTambé pugui es nomenclatura respecta si al neutra registre ( _Equip_ del CRM _de Caps,_ de les (^) _Consell,_ persones _Càrrec..._ que es mostren), o bé (^)
obase inicien de dades sessió i es s’ha mostra indicat arreu. que utilitzen un nom sentit. En aquest cas, aquest és el que es desa a la
Un dels **6.1.2** elements^ **Logotip** que^ s’ha incorporat és el logotip de l’entitat i s’ha utilitzat com a icona
representativaadient argumentant de l’aplicació, que un dels ja queobjectius no hi tambéha hagut és tempsel de crear de crear-ne un omnicanal un de propi.(Capítol Tot 3) i això,que sigui es veu la (^)
via(amb d’entrada la seva imatgeper a centralitzar a part), sinó i enllaçar de l’aplicació amb la deresta MEG d’aplicatius. (amb la imatgeNo parlar pròpia **d’una** de (^) l’entitat),aplicació dedes MEG d’on (^)
accedir a les altres. **6.1.2 Gamma** (^) **de colors**
de Lales^ gammabranques,^ de segonscolors queel mètode^ és^ més escolta^ present i guia.a^ l’aplicació Es tracta^ és de^ la taronjaque^ correspon, groc, blauals^ colors, vermell^ de^ lesi verd^ camises per a^
lesrespectivament. branques de TambéCastors/Llúdrigues, quan es parla Llops/Daines,de titulacions deRàngers/Noies lleure, es fa servir Guia, el Pioners/Caravel·les, verd per a monitoratge i Truc i el (^)
grocJoventut per (DGJ)a direcció, de la ja Generalitat. que correspon Aquest amb codi els decolors colors dels que carnets reconeix que les emet branques la Direcció i estila General els carnets de (^)
és dins l’arxiu **constants/styles.ts** (la constant **BRANCA_COLORS** ):
**C/LL LL/D R/NG P/C Truc Monitoratge Direcció**
#f6b26b #ffd966 #6d9eeb #e06666 #93c47d (^) lletra:#77DD77 #077807^ lletra:#FDFD96 #5F5F^


(^) **6.2 Pantalles**
TrobareuEn^ aquest captures^ apartat d’aquestes^ es^ descriuen pantalles^ els enelements, el mateix^ dades ordre^ ia^ objectiul’ **Annex**^ de **H**.^ cada^ pantalla^ desenvolupada.^
deixi **1.**^ de **Error** funcionar,:^ Si^ alguna mostra^ de queles^ peticionshi ha hagut^ retorna un error,^ un^ error el text^ o^ hide^ ha l’excepció^ alguna^ funció i dos^ queenllaços:^ fa^ que per^ l’aplicatiu tornar a^
iniciar **2. Càrrega** sessió i a: unmentre formulari es fan per peticions a notificar asíncrones la incidència. o es carreguen dades, es mostra una pantalla de
càrregaentre els perquè de les cincl’usuari branques) s’esperi. i una Aquesta frase, queinclou s’escull el logotip, entre (^) elsun indicador 10 punts de d’activitat la llei escolta. (de color aleatori
navegar **3.**^ **En**^ entre **desenvolupament** les pantalles,: haper estat^ a^ poder molt^ ferútil^ una la creacióaplicació d’una^ més funcióimaginable que retornai^ col·locar una^ botonspantalla^ per per^ a^
defectenavegar ambenrere. un text explicant que el codi d’aquell apartat està en manteniment, i un enllaç per a
**4.5. TítolInici** : (^) **de** Pàgina **sessió** d'aterrament: Pàgina amb de unl’aplicació, formulari on d’inici només de hi sessió ha el logotip(amb usuari i un enllaç i data ade l’inici naixement), de sessió. un (^)
botól’inici per de asessió). enviar i un enllaç al formulari d’incidències (per a gestionar incidències relacionades amb
contingut **6.**^ **Menú** es^ mostra **principal** a l’interior.^ **(inici)** :^ a^ partir^ d’aquí,^ totes^ les^ pàgines^ tenen^ una^ capçalera^ i^ un^ peu,^ i^ el^
queA ha^ la iniciatcapçalera sessió^ hi^ haa lael dretalogotip (clicar^ i^ el^ nom sobre^ de ell’aplicació nom dirigeix^ a^ l’esquerra, al perfil^ aixíi clicar^ com sobre^ el^ nom l’aplicació,^ de^ la^ persona a la^
pàginaEl peud’inici). té el (^) menú d’enllaços (que desplega un directori amb opcions d’anar a altres webs i
aplicatiusque retorna de a MEG),aquesta un mateixa menú depàgina l’entitat i un (quebotó desplegaque porta opcions al perfil i (^) iinformació l’opció de referenttancar sessió. a MEG), un botó
i queDins estan^ l’àrea disponibles^ de^ contingut, en funció^ es^ mostren dels rols^ tres de^ botons l’usuari.^ que corresponen^ als^ nivells^ de^ les^ funcions^ actives,^
de **7.** contacte^ **Perfil** : iel un^ perfil text^ s’estructura que informa^ per que^ targetes. si alguna^ Hi^ hadada^ una és^ targeta errònia,^ que s’ha^ fa^ de de^ capçalera modificar^ amb dins^ informació el CRM.^
TambéSeguidament, es mostra informacióhi ha un referentmenú aamb la titulació targetes en queel lleure. mostren (^) els anys que ha passat l’usuari
desenvolupanttaules, la primera funcions amb tot com l’historial a infant, com cap a infant,i EA, ii laclicant-hi segona amb es desplega tota la part el currículumde voluntariat. escolta: dues
etiquetes,Per^ a^ visualitzarhi ha el diccionari^ les^ etiquetes a mitges^ cal auna l’arxiu^ relació **constants/styles.ts**^ de^ tots^ els^ noms^ lògics (la^ del constant^ CRM **MAP_LABELS** amb^ les^ seves).^
AquestsHi ha camps un segon poden menú variar amb i se’n el títol poden de afegir.cursos, (^) que no mostra res, ja que no s’han arribat a importar
elsque cursos demani i lesla informació inscripcions. al CRM,Les taules ni s’ha del fet model la bolcada estan (^) manualmentpreparades, però encara. no hi ha una crida de l’API


(^) **8-9. Agrupaments** : en aquesta pestanya es mostra el llistat, amb targetes que tenen camps de
contactellistat del deconsell. tots els agrupaments on es tenen funcions actives. Des d’aquí també es pot accedir al
de l’agrupament, **10.**^ **Consell** :^ un mostrant^ llistat^ en la^ format data d’inici,^ de^ taules el nom^ de^ les i la^ funcions unitat o^ activesel càrrec^ de que^ caps ocupa.^ i^ de^ l’equip d’agrupament^
consultes **11.**^ **L’entitat** a la base^ **en**^ **xifres** de dades:^ en internaaquesta ipantalla retorna^ esun^ faobjecte^ una^ crida JSON^ al ambmiddleware, tota la informacióque^ fa^ recomptes i dades^ i^
necessàriesfins ara a MEG per ano fer hi unesha l’opció gràfiques com dea voluntari totals a l’entitat,de visualitzar amb diferentsles dades paràmetres.de totals en Tottemps i ser quasi senzilles, real, i (^)
aperspectiva la prova ha l’impacte estat molt de ben cada rebut. voluntari. Ajuda Se’n a donar parla una més perspectiva en detall ade l’apartat col·lectiu **6.4** i. d’entitat, i de posar en
funcions **12-13.**^ actives **Funcions** separades^ **actives** :^ endins tres^ de lesblocs:^ funcions les funcions^ d’agrupament, de cap^ hide^ ha branca,^ aquesta Equip^ pàgina d’Agrupament^ que^ mostra^ les i^
d'intendència,A cada bloc que s’hi són arriba les funcions lliscant pero amb les lesquals fletxes s’ha delpensat títol. alguna Al principi funcionalitat. apareix desactivat, però quan
seun seleccionasegon menú una de funció,lliscament es mostren horitzontal les perfuncionalitats a encabir-ho disponibles tot a la mateixa per a (^) pàgina.aquesta. Estan agrupades en
unitat **14.**^ que **La**^ **meva** l’usuari.^ **unitat** De :les^ llistat caps^ complet es mostra^ (infants el DNI^ i^ caps)i el número^ de^ les^ persones de carnet^ amb (direcció^ funció o^ activa monitoratge),^ a^ la^ mateixa que^
són **15.** les (^) **Sortides** dades necessàries **de la unitat** per a: feres unamostren notificació totes les d’activitat sortides acreades la DGJ. i un botó a baix a la dreta per a
crear-nedates i una de breunoves. descripció. De cada targeta de sortida es mostra el títol (“Sortida a” + Ubicació indicada), les
demana **16.**^ **Crea/Edita** un títol (la^ ubicació **sortida** :de^ el la^ mateix sortida),^ formulari una breu^ descripcióde^ creació i permetla data i tambéhora d’inici^ editar i^ fiuna de^ sortida.la sortida.^ Es
Avui **17.** mostra^ **Llistes** tots:^ en els^ aquesta esdeveniments^ pantalla enes quèmostren la data^ les coincideix^ llistes^ d’assistència amb l’actual,^ dividides Caus i sortides^ en^ tres mostrencategories. les^
llistesperden que rellevància s’han indicat es vanamb amagant. aquesta tipologia. Cada targeta S’ordenen de llista de més mostra recent la a mésdata, antiga, un botó per pertant, a lespassar que (^)
l’assistència **18. Crea** (^) i **llista** un comptador: el formulari del percentatgede creació ésd’infants molt senzill, assistents només aquell demana dia. (^) data i tipus d’activitat. Un
copmoment es desa, de la es creació. crea una llista a la base de dades interna amb una entrada per cada infant afiliat en el
(assistència **19.**^ **Passa** confirmada,^ **assistència** pendent:^ aquesta de^ darrera confirmar^ pantalla o no-assistent).^ mostra^ tots A^ els mesura^ noms quedels es^ infants, marquen^ i^ tresles opcions,opcions^
s’actualitzales assistències. també un comptador i es canvia l’estil del nom de l’infant. Després de desar, s'actualitzen
de laAquests funció,^ llistats per tant,^ són dues^ compartits caps d’una^ amb mateixa^ l’equip unitat^ de^ caps, veuran^ ja^ que i editaran^ tenen^ com els^ amateixos^ registre registres.relacionat la^ unitat^


(^) **6.3 Funcionalitats desenvolupades**
De les quatre funcionalitats proposades a l’apartat **4.1** , se n’han desenvolupat completament tres.
**RF-06
Funcionalitat** i la demarcació. **1:** La interfície ha d’integrar un calendari de curs de la unitat, l’agrupament
**No** tempsEn **s’ha** els ha (^) esprints **arribat** impedit (^) , **a** s’haque **desenvolupar.** estiguiprioritzat disponible arreglar (^) perels errorsa les proves de les ialtres la presentació funcionalitats, del treball. i la manca de
positivamentTot^ i^ que^ hi d’incloure.^ ha^ alternatives com^ _Google_^ _Calendar_ ,^ és^ una^ demanda^ que^ es^ valorava^
**RF-07
Funcionalitat** infants de la unitat **2:** L’usuari on participi. ha de poder crear esdeveniments i controlar l’assistència dels
**S’ha** assistències,S’ha **desenvolupat** comprovat i els canvis (^) que **correctament.** (^) s’actualitzendues caps (^) d’una al moment. mateixa unitat veuen i validen les mateixes
visualitzenLaA no-assistèncial’ **Annex** per^ **H** a^ hivalidarjustificada^ ha^ imatges l’assistència. es pot^ de interpretarcom Hi^ esha^ creentres de (^) maneresopcions:^ les^ llistes diferentsassistent,^ (figures segons justificat^17 al’agrupament.^ 19) i injustificat.^ i^ com^ es
**RF-08
Funcionalitat** d’IA generativa **3:** o (^) agentsL’aplicació d’IA (^) perha d’incorporara automatitzar una processos. funcionalitat on s’utilitzi alguna eina
**S’ha** deCom missatge **desenvolupat** s’ha explicatper a grups (^) **correctament.** a l’apartat de famílies, **5.3.2** (^) , laconvocant tasca que a s’ha una automatitzathora i lloc concretsha estat laper de a redacció fer una (^)
excursió.WhatsAppEl text Esgenerat (la pot IAG veure es li (^) dona (^) desaun exemple elal format porta-retalls de per crida al missatge). endel el dispositiumateix apartat. i està (^) llest per a enganxar a

### RF-09

```
Funcionalitat a l’entitat. 4: L’aplicació ha de permetre generar documents que acreditin la pertinença
```
**S’ha** bàsicaTal **desenvolupat** com de pertinença s’explica **correctament.** (^) aa l’entitatl’apartat i generen **5.3.4** (^) , l’aplicació un codi de generaverificació. uns certificats amb informació
comsónDins entersa^ elargument^ mateix de 128 certificatun bitstoken codificats^ s’adjuntaque es genera comun^ QR acom quecadenes a^ porta UUID de^ a^ l’enllaç(Universallytext en queformat^ valida Unique hexadecimals.^ el Identifier),certificat. AixòPren que^
minimitzatravésAquesta d’un funcionalitat laURL. possibilitat (^) estalvia de duplicat temps i tantpermet a les a capsqualsevol com alusuari personal validar de l’oficina,correctament ja que a (^)
no **I** .Podeu Unha decop veureser dins des unl’aplicació, de certificat l’OSG on esd’exemple esgestiona generin iel deaquests certificat com escertificats. mostra amb les la (^) llibreriespàgina de **"expo-file-system"** validació a l’ **Annex** i (^)
**AsyncStorage**.^


(^) **6.4 Visualització de dades de l’entitat**
dades:Els^ requisits^ de^ l’apartat^ **4.2**^ també^ demanaven^ desenvolupar^ dos^ apartats^ de^ visualització^ de^

### RF-04

**Visualització** de l’agrupament **de** (^) o **dades** la unitat **1** : L’aplicació a la qual pertany ha d’incorporar l’usuari, i unaels seuspestanya infants. on mostrar informació
**S’ha** A l’ **desenvolupatAnnex H** , figura **parcialment.** 8, es mostra (^) com es visualitza la informació relativa a l’agrupament
(nom,A l’ (^) **Annex** adreça, (^) **H** contacte, figura i 9 coordenades i 10, es mostra amb laun informació enllaç a Google referent Maps). a les (^) funcions de totes les
capsd’agrupament). de l’agrupament (separades per branques, en aquest cas es mostra l’equip
unitatA^ l’ **Annex** en el cas^ **H** ,que^ figura es tracti^ 14,^ es d’un^ mostra cap decom branca.^ es^ visualitza la^ informació^ relativa^ a^ la^ mateixa^
l’APIFalta que^ desenvolupar retorni la informació^ l’apartat^ d’informació necessària. Eldetallada curs vinent^ de^ cada canvien^ infant, les^ no fitxes^ hi^ ha d’inscripció^ cap^ consulta i laa^
informacióinconsistents que i hi eshagi demana camps (^) buitsde cada que (^) noinfant. es podrien Això (^) mostrar.fa que els registres al CRM siguin

### RF-05

```
Visualització informació clau de dels dades totals 1 : L’usuaride l’entitat. ha de poder consultar, en format gràfic, un resum de la
```
**S’ha** En (^) un **desenvolupat** dels controladors **correctament.** s’ha definit (^) una consulta que calcula els totals agregats de les
funcions.però assumint Aquest que recompte les dades ess’han fa des actualitzat de la base per (^) últimde dades cop (^) enintermèdia, iniciar sessió, per reduir i que, latència,per tant, (^)
tenenLa informacióconsistència. s’envia També enes permetuna resposta l’actualització compacta lliscant amb avall. com (^) un objecte JSON i es
renderitzenA l’ **Annex** les **J** gràfiqueses mostren dins la consultal’aplicació del amb controlador la llibreria amb **"react-native-gifted-charts"** el model de Eloquent ORM .i (^) els
campscensos definitsde l’entitat. així com els gràfics resultants. La informació és correcta i concorda amb els
(^) **6.5 Flux d’ús de l’aplicació**
estàA dissenyat^ l’ **Annex** el^ **K** flux^ es^ pot des^ veure de la pantallaun^ diagrama d’inici^ amb fins^ les a qualsevolpantalles^ ide^ els les^ elements funcionalitats^ de^ tota dissenyades.^ l’aplicació^ i^ com^
clics.Per Un^ a^ arribarcop arribats^ a^ la^ pantalles a les pantalla^ amb demés funcions^ connexions, actives,^ els el^ camins moviment^ són^ entreforça pantallescurts^ i^ s’hi és^ arribacurt i ràpid,amb^ pocs i es^
trobenEl ràpidamentdisseny per les als funcionalitats. nivells de Demarcació (^) i Generals no està desenvolupat, però replicaria
l’estructurafuncionalitats, dels que d’agrupament: apareixen en ununa lliscador pantalla horitzontal de funcions i es onpoden cada afegir funció o modificar.et permet (o no) realitzar


(^) **6.6 Notificació d’incidències**
ajudaEn l’equipla^ pantalla tècnic^ d’error i desenvolupadors^ s’ha^ adjuntat a^ resoldreun^ enllaç els^ a^ errorsun^ formulari que apareguin^ per^ a^ notificar als usuaris.^ la^ incidència. Això^
CRMAquest de l’entitat.^ formulari Un^ s’hadels^ mòdulscreat^ també permet^ utilitzant crear el^ l’einaformulari^ de^ Formularisi un altre gestiona^ Web^ Avançats les respostes.^ dins^ Enel^ mateixenviar^
elal formularipersonal tècnic es crea per un a gestionar-la.registre de les Aquesta respostes, plantilla es mostra de correu un resum també per s’ha a l’usuaricreat per i (^) als’envia treball. un correu
🔗https://escoltesiguies.sinergiacrm.org/index.php?entryPoint=stic_AWF_renderForm&id=00000f97-dcEnllaç al formulari:
5f-8d9f-ea9c-69fc4ff8f538L’ **Annex L** mostra el formulari, (^) la pantalla de resum en enviar, el registre creat dins el mòdul de
respostesfase de desplegament, del CRM i el escorreu podrien rebut crear per tiquetsl’equip ende suport.un aplicatiu Si s’iniciés com Trello una possible (amb la fase seva pilot API o iuna un (^)
_webhook_ incidència) ocreant Jira (^) elsamb rols les de respostes la persona que i fent anessin registres arribant. durant Les les dadescrides. facilitades permeten simular la
(retornaLa^ majoria un error^ dels que^ errors no es^ que pot^ s’han llegir^ detectat com a objecteeren^ provocats JSON) oper per^ o lesbé^ dadesles^ respostes del CRM^ del (es^ middleware duplica o^
s’elimina algun registre, i no es pot actualitzar ni iniciar sessió).
Una **6.7** de^ **Verificació** les eleccions^ de **en** disseny^ **dues**^ **passes** de l’aplicació^ ha estat eliminar tant el **registre d’usuaris** (per a
tenirrecullen accés en aafiliar-es) l’aplicació i la cal **gestió** tenir **de** funcions **contrasenyes** actives ena l’entitat,l’inici de i sessió.per tant Per les a dades la resta de d’aplicatius la persona dees (^)
MEG,impossibilitat una de deles recuperar incidències la contrasenya, més recurrents s’ha que considerat arriben positiude part desfer dels usuarisaquesta éspassa. la pèrdua d’accés i
suficientsEn^ una per^ primera a identificar^ versió una^ només persona^ es^ demanavaafiliada, però^ el^ davantDNI^ i^ d’unla^ data atac^ de de^ naixement. suplantació^ Són per^ duesforça^ dadesbruta,^
sid’aproximadamanent: comptem les possibles 𝑁= (^) #combinacions,𝐷𝑁𝐼·#𝐷𝐴𝑇𝐸 (^) 𝑆trobem=( 10 8 que· 2 3 el) (^) ·número( 365 · 5 possible 0 )≈ 4. 2 de· 1 combinacions 013. és
lletraNo ambcaldria una^ multiplicar operació deper mòdul,^23 (número i el 50 de^ lletres),és una^ jaaproximació^ que^ el^ propi del^ número rang d’edat,del^ DNI però^ determina com que^ la^
l’aplicacióel rang podria està ser pensada més petit. per aPerò voluntaris serveix majors de cota d’edat superior. i els afiliats actius solen tenir fins a 30-40 anys,
( _NVIDIA_ Les^ GPU _Tesla_^ d’avui _P100,_^ dia^ 2026)tenen^ ,una és apotència dir 101 2 de 𝐹𝐿^ l’ordre𝑂𝑃𝑆, per^ dels tant^ Tera en _FLOPS_ pocs segons^ (Floating haurien^ Point resolt^ Operations) totes les^
combinacionsS’ha optat iper enganyat afegir l’API.un segon (^) factor d’identificació: un OTP (One-Time Password) enviat per
correusuplantar electrònic. una persona. Es tracta A més, d’un s’han codi limitat de 6 dígits,aquest fettipus que d’intents augmenta per enforça (^10 6) bruta. les combinacions El nou flux d’inici per a (^)
de sessió es mostra en l’ **Annex Q**.


(^) Altres mesures que s’han pres durant la implementació del segon factor per a mitigar el risc de
suplantació- **Limitació** per força **temporal** bruta han **per** estat **dispositiu** les següents:: cada (^) OTP és vàlid durant 10 minuts. Durant aquest
temps,atacant l’aplicacióhauria d’endevinar no genera aquestnous codis mateix per codi al mateix fins que usuari deixés i dispositiu, de ser vàlid. per tant Un un cop possible passa (^)

- aquest **Limitació**^ temps, **d’intents**^ es^ pot^ sol·licitar **per challenge**^ un^ nou: cada^ codi. OTP^ només es pot intentar introduir 3 vegades. Per
    tant,intents/dispositiu. l’atacant té un límit d’intents per a cada challenge, que suposa una ràtio limitada de 3

- **Limitació** usuari cada **d’assignacions** 15 minuts, per **de** tant **dispositius** un atacant: l’aplicació només podria té també emmascarar un límit 5 aquest nous dispositiuscomportament per (^)

- amb **Verificació**^ aquesta^ **per** ràtio. **UUID**^ : tant els challenges com els dispositius s’identifiquen per UUID, que

sónaquests cadenes dos identificadors,de text de (^128) que bits es que validen assigna a la l’API. banda Per del aservidor. iniciar sessióAixò pràcticamentcorrectament obligacalen (^)
elsinstància, atacants ja seguirque haurien el flux d’endevinar d’inici de unsessió, enter i deno 2 forçar (^256) 𝑏𝑖𝑡 (^) 𝑠brutament≈ 1 , 16 ·el 1 challenge 077 , que és en 60 primera ordres (^)
Combinantde^ magnitud tots aquests^ més factors,^ alt^ que es^ l’inici redueix^ de^ sessiódràsticament^ de^ la^ versió l’eficàcia^ de^ desenvolupament. d’aquest tipus d’atacs.^


# Capítol 7. Resultats i avaluació

## Per 7.1 a poder^ Prova valorar^ d’usabilitat l’experiència^ i^ enquesta que ofereix^ de el^ valoracióPMV s’ha fet^ una prova d’usabilitat entre el

personalva haver 16 de (^) participants,l’oficina el (^13) que de van maig respondre de 2026. el Primerformulari: es va https://forms.gle/2i1sMSbetcVz6qwD7 demanar voluntàriament la participació.. Hi
agrupamentEl^ dia^ de ola equip^ prova, de^ per caps.^ a^ donar Se’ls^ context,va demanar^ es^ va que^ simular no es comuniquessinque^ les^ participants i fessin^ formaven les tasques^ part^ deldescrites^ mateix a^
ladades taula que de mostraval’ **Annex** (^) **N** l’aplicació, segons el eren tipus compartides de rol que tenienper a unassignat. mateix Així equip, van especialment poder comprovar en el quecas lesde (^)
passarmarcava llista: les baixes.una de les membres havia de crear l’esdeveniment, l’altra validava l’assistència i l’altra
l’ **Annex** En^ acabada **O** (respostes^ la^ prova, adjuntes^ es^ va^ demanaral mateix^ a annex).les^ participants El perfil^ respondre enquestat^ el representava^ qüestionari^ deun^ valoraciógrup d’edat^ de^
lleugeramentvoluntàries (13 per de sobre 16), della majoriapúblic objectiucom a cap de l’aplicació.i EA, que són També els rols la gran que majorias’han provat. van fer La una majoria etapa dede (^)
participantsLa majoria han de pogut participants acomplir veurien les tasques, amb bonssi bé ullsdurant la implementacióla prova van saltar d’una alguns aplicació errors. per (^) a caps com
aútils projecte i còmodes. de l’entitat, De la imateixa creuen queprova les es funcionalitats van trobar alguns de passar errors llista no idetectats generar elque text es ambvan IAGresoldre, són (^)
detallats **7.2** a (^) l’apartat **Benchmarking 8.1**. (^)
comprometreEn^ el^ requisit la seva^ no usabilitat.funcional **RNF-03** ,^ es^ diu^ que^ els^ temps^ de^ resposta^ de^ l’aplicació^ no^ poden^
**RNF-03 Practicabilitat** ded’altres^ l’aplicació. aplicatius^ Per:^ El dea^ temps^ valorar-ho l’entitat^ de^ resposta que^ ho escompararem consideren^ no^ ha^ de^ comprometre^ ambestables.^ els^ temps la^ d’execució^ practicitat^ ALTA
desenvolupamentUn^ dels^ aplicatius i la seva^ més integració^ consolidats amb^ ésl’API^ el^ dedel CRM,^ _Dossier_ s’ha^ _de_ vist^ _campaments_ que el coll d’ampolla.^ Durant^ mésles^ fasesgran quede^
esms troben de mitjana, són les i la crides. crida alL’execució CRM per dea recuperar l’inici de un sessió afiliat en triga el _Dossier_ uns 1500 _de_ (^) ms. _campaments_ està en els 2000
l’aplicacióL’inici^ deés^ sessióde l’ordre^ de^ MEG dels^ cAPPs500ms^ es(se’n^ fa^ entrefan 4),^2500 mentre^ ms^ i^ que^3000 un^ ms. cop^ La la^ latència informació^ de^ cadaes recull,^ crida lesen^
funcionsAquest a executarcoll d’ampolla triguen s’accentuade l’ordre delsmés 20-50 en el ms.nostre (^) cas, ja que s’ha de garantir una actualització
delsS’ha rolsfet uni les _benchmark_ dades dels per afiliats, veure que quins es mostrenparàmetres constantment afecten més i fan el quetemps canviïn d’execució. els permisos Cada itipus el flux. de (^)
cridacamps, s’ha el nombreexecutat de (^5) registresvegades, a els recuperar, temps que la midaes mostren de les sóncrides una ( _chunks_ mitjana.). S’ha modificat el nombre de


(^) - Una manera que s’ha trobat per a reduir el temps crides és reduint el nombre de relacions dels
registresregistres (^) desi (^) cadaaquests consulta. registres estan creats i es poden deduir. També es limita el nombre de
- Lesinici consultes de sessió d’actualització exitós de qualsevol es fan usuari. només Això sobre fa els que registres el trànsit modificats de dades després (les respostes de l’últim de (^)

- l’APIEs valorarà^ són^ objectes reduir^ forçael nombre^ grans) siguide crides^ el^ menor. a 4, demanant en una sola crida l’usuari amb les
Amb tot,funcions el **RNF-03**^ en^ comptes es valora^ de comfer-ho a **assolit** en^ seqüència. **parcialment**^. Si bé els resultats de l’enquesta (pregunta
13)es creu diuen que que un noestudi s’experimenten més extensiu retards de les cridesi que l’inicia l’API de podria sessió optimitzar-les. normalment no genera inconvenients,
deuTant connexions^ el^ benchmark concurrents.^ com^ la Perprova a acabard’usabilitat de validar^ s’han aquestsrealitzat resultats^ en^ entorns caldria^ controlats, reforçar-lo^ simulant amb^ unesmés^
execucionsconclusions i,sobre sobretot, rendiment alguna i escalabilitat. prova pilot amb usuaris concurrents reals, per donar més pes a les

Dels **7.3** requisits^ **Grau**^ descrits **d’assoliment** al **Capítol**^ **dels 4** , amb^ **requisits** la informació^ extreta de l’enquesta i la valoració del
Servei de Transformació Digital i Informàtica es repassa l’assoliment:
**Codi Requisit Funcional
RF-01 Assoliment** dinsl’usuari,^ el^ CRM. i s’ha^ **complet.**^ S’ha desenvolupat^ eliminat^ L’inici^ la unde^ gestió segonsessió^ de factorfunciona^ contrasenyes de verficaciósense^ a^ errors^ la^ banda (més^ i^ identifica detalldel^ servidor a l’apartatles^ afiliades^ i^ de **6.7**^ )
**RF-02 Assoliment** bits.restringeix^ A^ cada segons^^ **complet.** inici^ de aquests^ sessió^ S’ha permisos.esdesenvolupat^ recalculen Més^ elsun detall^ sistemapermisos a l’apartat^ de^ dels^ permisos^ usuaris **5.2.4**.^ segons^ i^ cada^ marcatgeconsulta^ feta^ de^ es^
**RF-03 Assoliment** minimització^ **complet.** de dades^ S’ha sol·licitades.^ dissenyat Més^ una^ detallbase^ de a l’apartatdades^ tenint **5.2.3**^ en i^ comptel’ **Annex**^ criteris **E**. de^
**RF-04RF-05 AssolimentAssoliment**^ **parcial.complet.**^ Més Més^ detall detall^ a al’apartat l’apartat^ **6.4 6.4**^ i il’ l’ **AnnexAnnex**^ **H J** ..^
**RF-06RF-07 NoAssoliment**^ **assolit.**^ Més **complet.**^ detall Mésa^ l’apartat detall **6.3** a l’apartat.^ **6.3**.
**RF-08RF-08 AssolimentAssoliment**^ **complet.complet.**^ MésMés^ detalldetall^ aa^ l’apartatl’apartat^ **6.36.3** ..^


(^)
**Codi Requisit No Funcional
RNF-01 Assoliment** operatius. TypeScript^ **complet.** Enés un^ la^ llenguatgeprova^ d’usabilitat multiplataforma.^ hi^ havia^ dispositius dels^ dos^ sistemes^
**RNF-02 Assoliment** lafacilita^ base^ deel seguimentdades^ **complet.**^ i^ el^ middleware.d’incidències^ L’aplicació^ S’has’estructura i la milloraaconseguit^ pero addició^ pàginesuna^ separació de^ i funcionalitatscarpetes^ de^ responsabilitats^ (mòduls), igual^ que^ que^
**RNF-03 Assoliment**^ **parcial.**^ Repassat^ a^ l’apartat^ **7.2**.^
**RNF-04 Assoliment** Taulesagafar ideesde^ Demarcació^ **complet.** i recollir sensacionsPer^ de^ laa^ laCatalunya^ fase sobre^ inicial^ Central,si unade^ pluja aplicació^ parlant^ d’idees^ directamentmòbil^ es^ va seria^ portar benamb^ un rebuda.^ voluntaris^ prototip a^ per^ les^ a^
**RNF-05 Assoliment** icolors^ això,^ s’hande les^^ **parcial.** incorporatbranques,^ Els ielements estilresultats comunicatiu^ dede^ l’imaginaril’enquesta de l’entitat.^ mostrenescolta Més^ com^ neutralitat detall^ els^ punts al^ respecte punt^ de^ la **6.1**^ Llei,^ al. tema.^ logo^ Tot^ i^
(^) **7.4 Disponibilitat de l’aplicació i el codi font**
el formatEl^ codi i^ dels’han^ middleware donat exemples^ és^ privat de icrides^ està^ allotjat a l’apartat^ als^ servidors **5.2** i els **Annexos**^ de^ MEG, **D**^ però i **F**.^ s’ha^ descrit^ extensament^
https://github.com/eugenisoler-meg/TFG_EugeniSolerForn/tree/reverse-versions/MEG_cAPPsEl^ codi^ de^ l’aplicació,^ que^ fa^ ús^ d’aquesta^ API,^ es^ pot^ trobar^ al^ repositori^ públic^ de^ GitHub:.
L’entitat no **7.4.1** ha^ **Declaració** posat inconvenients^ **sobre**^ **l’ús** en^ **de** què^ **IAG** la^ part de programació fos assistida per intel·ligència
artificial,accelerat jamolt que el és procés. una eina S’ha que emprat s’utilitza _ChatGPT_ sovint ali _GitHub_ servei de _Copilot_ Transformació (com a extensió Digital i deInformàtica _Visual Studio_ i ha (^)
_Code_ - ), i (^) **Refactorització** l’ús es pot desglossar **de codi** en (^) les **del** següents **middleware** tasques:: creació (^) del model de Eloquent ORM (validant-ho
ambSinergiaCRM consultes (testejant a la documentació i validant les de propostes Laravel), amb reestructuració consultes de (^) prova)les crides i optimització a l’API dede (^)

- funcions **Generació**^ per **de**^ a^ reduir **codi base**^ els^ temps: s’han^ de demanat^ l’aplicació. esquelets^ TypeScript de les pantalles, posteriorment
- adaptant-los **Resolució i**^ a **comprensió**^ la^ seva^ funcionalitat **d’errors**^ específica: quan els^ i^ aregistres^ la^ resposta d’errors^ retornada eren^ pel llargs^ middleware. o sobtats,^ s’ha

demanatfont. Si l’explicacióuna explicació tenia a l’eina,sentit iaixí s’adeia com ambpasses la perlògica a resoldre-ho de l’aplicació, tenint aleshores en compte s’escollia el codi (^)

- l’opció **Suport**^ més **en**^ adient **l’elecció**^ i^ es **de**^ provava. **patrons**^ **de disseny** : quan s’ha hagut de fer una tria respecte a
    l’arquitectura,millor opció, la el més model viable de odades alternatives o els patronsd’allò que de esdisseny volia implementar.s’ha consultat la IA demanant la


(^) - **Estil global** : un cop les funcionalitats estaven desenvolupades i les constants d’estil definides,
esamb demanava la resta de a l’aplicació.la IA que integrés l’estil dins la pàgina, i donés una aparença que concordés
- **Adaptació** amb els camps **de** (^) **plantilles** i el text del: per document a les plantilles original de emès Blade per, (^) MEG,un cop s’ha s’aconseguia demanat a lala concordançaIA que estili (^)
el document HTML per a assemblar-s’hi.


## Capítol 8.1 Conclusions 8. Conclusions i treball futur

Les **8.1** conclusions^ **Conclusions** més significatives^ extretes i els canvis derivats de les respostes a l’enquesta
d’usabilitatsegüent taula: ( **Annex O** ) i la revisió amb els directors tècnics del treball han estat els descrits en la
**Pregunta Conclusió i modificació Implementació
10** elEliminarAls flux enquestats de l’aplicació.una^ de els^ les ha^ pestanyes costat trobar^ per^ ala^ apropar pàgina^ lesper^ funcionalitats a crear llistes.^ dins Pendenttermini^ a^ curt

```
14
```
frontend,middlewareMillorar però^ el entext seria funcions^ i^ l’explicació interessant que sovint^ delsafegir^ errors.donin blocs problemes,^ Ara de **try{}** mateix (^) sobretot^ es **catch()**^ tracten les^ al alde^
lecturaJSONAixò que (^) arreglariai edició no es de potel la fet parsejar,base que de quan dades.el missatge el middleware (^) d’error retorna no sigui un sempre objecte el (^)
mateix.d’incidències.D’aquesta (^) manera també seria més àgil la comunicació i resolució
Pendenttermini a mitjà
(^15) a Millorarnotificar^ l’estèticala incidència.^ de^ la pàgina^ d’error,^ fent^ més^ visible^ el^ text^ per^ realitzadaMillora^
**17, 20**
dispositiusHiS’ha^ havia factoritzat^ un que^ error feia el^ de quecodi^ visualització el i fettext que es veiésels^ en colors^ el negre^ Mode de sobre l’escalaClar fons^ d’alguns de negre. grisos^
siguindesantsistema enen esculli Modevariables una Fosc opcióglobals per defecteinadequada. aquesta (text gamma blanc de i fons colors negres i evitant i grisos), que el realitzadaMillora^
**18**
funcionalitats.baseAfegir quines^ més són^ eines Caldria les^ de funcionalitats^ IA tornar^ dins al’aplicació fases prioritàries anteriors^ per^ a (^) iper^ abordarinvestigar a consultar^ més altres^ amb la
opcionsfactures,Es podria d’agents titulacions, investigar que memòries, puguinen la línia oferir autoritzacions...)de lespujada capacitats i anàlisi demanades. incorporant d’arxius (actes, (^) eines (^)
com agents de IA (com n8n), i no només IAG.
Pendenttermini a llarg
(^21) deParlar les pàgines^ amb^ el i^ Servei intentar^ de alinear-les^ Comunicació encara^ de^ mésMEG a^ perl’estil^ a^ millorar corporatiu.^ l’estil Pendenttermini^ a^ curt
**23, 25 24,** valoralíniaSortimEl projecte, de positivament treball^ satisfets tot futur ide que l’esforçlainteressant, necessitaprova. i^ L’aplicacióhores algunesamb dedicades. un millores,ventall^ ha^ agradat (^) d’opcions es^ veuriamolt^ al a amb investigar.personal bons^ deulls l’oficina i com una^ i^ es
extensaEl^ desenvolupament per a un possible^ integral projecte^ d’aquesta semblant^ aplicacióo amb objectius^ permet similars,a^ MEG aprofitantdisposar^ d’unales eines^ documentació de les quals^
disposabase associativa i treballant amb per l’objectiu a perfilar de les facilitar-ne funcionalitats la tasca. dels seus aplicatius, adaptant-les a l’ús que en fa la


(^) **8.2 Properes passes**
vulguinEn^ aquest integrar.^ apartat Això^ s’explica aporta documentacióel^ procediment útil,^ per resumida^ a^ modificar i pràctica^ l’aplicatiu per asegons una possible^ els^ canvis adaptació,^ que^ es^
millora o llançament **8.2.1 Afegir** de **un** l’aplicació, **camp o relació** deixant **a** (^) a **una** MEG **classe** i als **del** agrupaments **model** la feina més fàcil.
**app/Models** Per^ a^ afegir i definir-lo^ un^ camp (dins^ (o^ relació) la variable^ a^ un **$fillable** objecte,^ cal).^ modificarPer a sincronitzar-ho^ dins^ l’arxiu ambcorresponent l’estructura^ de dela^ carpetala base^
de **make:migration** dades, es pot (^) **afegir_columna_a_taula** afegir amb comandes SQL **--table=taula** o creant un (^) )nou com arxiu es mostra de migració a l’ **Annex** ( **php P**. **artisan**
requereixinAquesta^ mésoperació informació.^ és^ bàsica però^ necessària^ per^ a^ desenvolupar^ noves^ funcionalitats^ que^
perquèCal^ tambéel retorni^ afegir i dinsa^ la^ consultael controlador^ a^ l’API corresponent^ de^ SinergiaCRM modificar^ (consulta la funció^ model quea^ l’ **Annex** crea una^ **J** )^ aquestinstància^ camp de^
l’objecte a **8.2.2** partir **Afegir** de la (^) resposta **una classe** perquè **al model** el tingui en compte.
**make:model** Per^ a^ afegir **Objecte**^ un^ objecte. Això^ nou genera^ al^ model, un arxiu^ es^ pot **Objecte.php**^ cridar^ dins dins^ el^ terminalde la carpeta^ la^ funció **app/Models**^ **php**^ **artisan** amb^
l’estructuradels dos fitxers bàsica. resultants Després a l’ cal **Annex** també **F** (^) .fer una migració de la taula i les seves relacions. Hi ha exemple
Codi funcional **8.2.3**^ **Afeir** descrit^ **un**^ **endpoint** a l’apartat^ **de**^ **5.2l’API** ( **routes**^ **> web.php** ). Afegir aquesta línia de codi fa que la
novacontrolador ruta sigui amb accessibleels paràmetres des delproporcionats. navegador, i s’hi puguin fer crides **GET** que executin la funció del
Per a afegir **8.2.4**^ **Afegir** una funcionalitat^ **una**^ **funcionalitat** a un rol,^ **a**^ per **un**^ **rol** exemple^ **dins**^ **l’aplicació** el d' **Intendència**^ , de nivell **Agrupament** , cal
anar **<ActionContainer** al fitxer **MEG_cAPPs/components/aeig/accions-botons.tsx>** i llistar-hi el nom lògic del rol (si no se sap es (^) poti modificarconsultar (^) dinsel componentel CRM o (^)
registrantel component la resposta **<ActionButton** de l’API en **>**. algunamb lapunt. funció Després, que vulguem s’ha de crear executar una novao la funciópàgina peron alens rol, vulguem afegint (^)
dirigir.Es pot (^) veure un exemple concret, amb els canvis fets per a afegir la funcionalitat de veure infants i
caps de la (^) **8.2.5** unitat **Afegir** per a (^) la **crida** funció **a l’API** _Intendència_ **des de** (^) a **l’aplicació** l’ **Annex P**.
un Percontrolador^ a^ comunicar-se que funciona^ amb^ l’API, a l’endpoint^ sobretot^ per **testapi.escoltesiguies.cat/fetch**^ a^ demanar^ informació^ de^ la^ base^ de^ .dades, Se l’hi^ s’ha han^ creat de^
passarDins obligatòriament l’aplicació hi ha dos funcions paràmetre: auxiliars **afiliat** que **_id** faciliten i **q** ( _query_ aquestes). (^) crides reduint la verbositat.
veureUn a^ exemple l’ **Annex**^ amb **P**. la^ crida^ i^ de^ les^ funcions^ auxiliars^ per^ a^ la^ consulta^ de^ l’apartat^ anterior^ es^ pot^


```
TypeScript
```
(^) **8.2.6 Afegir una gràfica a la visualització de dades**
retornades,Per^ a^ afegir i afegir-la^ una^ novaal tipus^ gràfica **DataQuery**^ cal^ primer del fitxer^ pensar **MEG_cAPPs/app/(app)/data.tsx**^ quina^ serà^ l’estructura^ de^ les. Després,noves^ dades dins^
latext...) funció amb **DataScreen** mètodes **()** funcionals cal treballar-les de llenguatge i adaptar-les JavaScript. per a crear Per un als component gràfics de (gràfic, barres, indicador s’ha creat clau, un (^)
component **<BarChart>** (^) deauxiliar la llibreria al fitxer **"react-native-gifted-charts" ./components/data/BarGraph.tsx** ; : que utilitza el component
importconst **BRANCA_ORDRE** { **BarChart** } (^) =from { CiLL: "react-native-gifted-charts" 1 , LLiD: 2 , RiNG: 3 , PiC:; (^4) , Truc: 5 , Suport: 6 ,
} (^) export as { [key:default string function]: number **GraficBarres** }; // Constant({ **DATA** (^) ,auxiliar }: { per ordenar les barres
(^) }) **DATA** { : { value: number; label: string; frontColor: string }[];
//constDATA Extreu =max DATA.sort((a, el= DATA.sort((a,màxim per b) a =>estilar b) // => Ordena b.valueel gràfic les - barres (^) a.value).map((e)correctament => e.value)[ 0 ];
//BRANCA_ORDRE[a.label] (^) ?Constant BRANCA_ORDRE[a.label] definida en && el BRANCA_ORDRE[b.label] - mateix BRANCA_ORDRE[b.label] fitxer (^)
(^) return); : (a.label.localeCompare(b.label), // Estila i retorna el BarChart (^)
< **BarChart** data={barWidth={DATA. **DATA** (^) } (^) length > 6? 100 : 40 }
spacing={noOfSections={maxstepValue={max 5 } (^) > 1250 > (^3000)? 500? (^7) :: max 5 } (^) > 750? 200 : max > 500? 150 : 100 }
xAxisThickness={xAxisLabelTextStyle={{yAxisThickness={ 11 }} (^) color: 'white' }}
yAxisTextStyle={{topLabelTextStyle={{ color: color: 'white' 'white' }} (^) }}
(^) );/> showValuesAsTopLabel={ true}
Aquest}^ component s’haurà de passar com a paràmetre dins de l’objecte auxiliar **<DataCard>** , i
afegir-lo **./components/data/DataCard.tsx** a la **<DataGrid>** de la pàgina). Els (definits **DataCard** als tenen arxius un **./components/data/DataGrid.tsx** títol i una icona que es mostren en i (^)
formatd’una sola targeta, columna i un (^) percomponent a mostrar-ho que es tot desplega seguit i iamb s’oculta una mica en clicar de separació. i el **DataGrid** és només una graella
L’exemple concret amb el retorn del total d’infants per branques es pot veure a l’ **Annex P**.


# Capítol 9. Bibliografia

AmazonBaden-Powell, Web Services R. (1941). (n.d.). _Last_ ¿Qué _message_ es NoSQL? _to scouts_ https://aws.amazon.com/es/nosql/. Wikisource.

Berrett,https://en.wikisource.org/wiki/Last_message_to_scouts J. L. (2022). Linking overhead expenses and nonprofit^ effectiveness: Evidence from Habitat
forhttps://doi.org/10.1002/nml.21492 Humanity. Nonprofit Management and Leadership, 32(4), 509-530.
Cabothttp://hdl.handle.net/10230/71456 Agustin, G. (2025). Estrelles del futur: anàlisi i predicció de talent futbolístic.
Cuenca,Taulahttps://www.tercersector.cat/sites/default/files/2022-02/t3s_2022-02-03_informe_estat_digitalitza A d’Entitats(2022) Estudi del Tercersobre l'estatSector de Social la digitalització de Catalunya. al Tercer Sector. Informe elaborat per a la

Contributorscio_tercer_sector.pdf to Wikimedia^ projects. (2025a, agost). Extreure, transformar, carregar. Viquipèdia,
ContributorsL’enciclopèdia to Wikimedia^ Lliure.^ https://ca.wikipedia.org/wiki/Extraure,_transformar,_carregarprojects. (2025b, novembre). Programació modular. Viquipèdia,^
Godefroid,L’enciclopèdia M., Plattfaut,^ Lliure. R.,^ https://ca.wikipedia.org/wiki/Programaci%C3%B3_modular#cite_note-1 & Niehaves, B. (2023). Identifying key barriers to nonprofit
organizations’35(1), 237–259. adoption https://doi.org/10.1002/nml.21609 of technology innovations. Nonprofit Management and Leadership,
MatononprofitManagement‐Santiso, organizations:V., Reyand ‐Leadership,García, Key M., antecedents 34(2), & Sanzo 433–463.‐Pérez, and implications https://doi.org/10.1002/nml.21579 M. J. (2023). for Volunteer management. omnichannel Nonprofit behavior in
GlossaryHutri, H. of(2023). web termsComparison | MDN. of (2025, React juliol) Native https://developer.mozilla.org/en-US/docs/Glossary and Expo. Lappeenranta–Lahti University of

Specchia,Technology A. (2022).^ LUT. Customer^ https://lutpub.lut.fi/handle/10024/165256 relationship management (CRM)^ for medium and small enterprises:
Vázquez,How C.to^ find(2026,^ the febrer).^ right^ solution CRM: Quéfor^ effectively es, Para Qué^ connecting Sirve y Cómo^ with^ your Elegir^ customers. el Mejor^ Productivity[2026]. Clientify.^ Press.
Khan,https://clientify.com/blog/crm/que-es-para-que-sirve-crm M. Z., Zaman, F. U., Adnan, M., Imroz, A., Rauf, M. A.,^ & Phul, Z. (2023a). Comparative case
study:Software An Engineering, evaluation of 1 performance (2), 14-23. computation between SQL and NoSQL database. Journal of

Khan,softwareData W., andKumar, architectureCognitive T., Zhang, Computing, performance C., Raj, 7 K., (2),analysis Roy, 97. A. and M., assessments—a & Luo, B. (2023b). systematic SQL and literature NoSQL review. database Big (^)
Kotlin,https://kotlinlang.org/docs/multiplatform/native-and-cross-platform.html#takeaways (n.d.) Cross-platform and native app development: How do you choose? (^)
Laravelhttps://laravel.com/docs/13.x/migrations (2026) Database: Migrations | Laravel 13.x - The clean stack for Artisans and agents.


(^) Minyons Escoltes i Guies de Catalunya. (2013). Missió, visió i valors.
Minyonswww.escoltesiguies.cat/qui-som Escoltes i Guies de Catalunya^ (2019). Pla Estratègic.
Minyonswww.escoltesiguies.cat/qui-som/pla-estrategic Escoltes i Guies de Catalunya. (2023). Impulsem^ la transformació digital. Memòria de curs
NVIDIA2022-2023. Tesla P100:^ https://issuu.com/minyons/docs/mem_ria_de_curs_2022_-_2023_meg_ El acelerador para centros de datos más avanzado de la historia. (2026).^
Nwabekee,NVIDIA. U.^ S.,https://www.nvidia.com/es-la/data-center/tesla-p100/ Abdul-Azeez, O. Y., Agu, E. E., & Ijomah, T. I. (2024).^ Digital transformation in
marketingResearch in strategies: Science and The Technology, role of data 3(2),analytics 055-072. and CRM tools. International Journal of Frontline
Paula,Servidor:403-414. G. E., Collaguazo, Caso de Estudio L. Q., Node Guaman, JS, Django A. C., & y Alvarez,Laravel. 593 S. L. Digital (2025). Publisher Frameworks CEIT, del 10(1), lado del
Ramachandrappa,development. N.International C. (2024). JournalA comparative of Computer analysis Trends of native and Technology vs. React Native (IJCTT), mobile 72(9), app 33-37. (^)
Ricciardi,Omegapy.https://www.alexomegapy.com/post/modular-programming-benefits-challenges-and-modern-appl A. (2024, setembre). Modular programming: benefits, challenges, and modern applications.
Seeni,ications S. M. (2023).^ Progressive Web Apps vs. Native Apps: Evaluating User Experience and
Schmitt,Resource J. (2022,^ Efficiency agost).^ inNative^ Mobile-First vs. cross-platform^ Design.^ mobile app development. CircleCI.
Stackhttps://circleci.com/blog/native-vs-cross-platform-mobile-dev/ Overflow, (2025) 2025 Developer Survey. https://survey.stackoverflow.co/2025/^
StatCounterStats. https://gs.statcounter.com/os-market-share/mobile/worldwide Global Stats (n.d.) Mobile Operating system market share worldwide. StatCounter Global
SinergiaTIC.APIhttps://github.com/SinergiaTIC/SinergiaCRM-API-Examples/ examples (2022). for GitHub SinergiaCRM. - SinergiaTIC/SinergiaCRM-API-Examples: Consultat el gener de 2026. GitHub. Repository with different
SinergiaTIC.https://www.sinergiatic.org/ (2025, setembre). Associació SinergiaTIC. Consultat el març de 2026:
SinergiaTIC.https://wiki.sinergiatic.org/index.php/Acceso_al_CRM_v%C3%ADa_API/ca (2026, febrer). Accés al CRM via API. Wiki SinergiaTIC. Consultat el març de 2026:
TaulaConsultat d'entitats eldel març Tercer de 2026:Sector https://m4social.org/projecte-simbiotic/ Social de Catalunya. (2026, febrer). Projecte SimbiòTIC. M4social.
Whathttps://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app is a progressive web app? - Progressive web apps | MDN. (2025, desembre).


## Annex A: Principals mòduls de SinergiaCRM i relacions

```
En el diagrama es mostra l’etiqueta i el nom lògic de SinergiaCRM dels diferents mòduls.
```
Es (^) - mostren, **Afiliats** a dalt, les ( **blauFuncions** i **groc** ),que els mòdulsrealitzen relacionats a l’entitat, amb les les relacions afiliacions: d’ (^) **Entorn Personal** i els

- **Documents** Els **Agrupaments**^ que^ tenen (i Demarcacions)^ assignats.^ i les **Unitats** d’infants en què es dividexen.

Més- a (^) **Formacions** baix es mostren que ( **taronja** s’impateixen,) els mòduls **Cursos** relacionats programats, amb l’Escola **Sessions** de Formació:en què es (^) divideixen els
Al finalcursos, de tot^ **Inscripcions** veiem ( **verd**^ i^ **Assistències** ) un conjunt.^ Els de^ últims mòduls^ es^ relacionenno relacionats^ també però^ amb queel^ mòdul permeten^ **d’Afiliats** altres.^
funcionalitats- Generar dins l’eina **Informes** de SinergiaCRM:, executar **Fluxos** (^) **de treball** , definir **Grups de seguretat** per a la
visualització dels registres, enviar **Correus** i descarregar **Plantilles PDF**.


(^) **Annex B: taula de rols de nivell Agrupament.
NIVELL FUNCIÓ GRUP/S CAS D'ÚS
AGRUPAMENT**
Infant CastorsLlopsRàngersPionersTrucs i^ Daines ii i Llúdrigues (^) Caravel·lesNoies^ Guia^ Inf (NA)
Cap
CastorsLlopsRàngers i Dainesi iLlúdrigues Noies (^) Guia (^)
PionersTrucsSuport i Caravel·les CdB^
ResponsableCap (^) Tresoreriad'Agrupament de Pedagogia
SecretariaConsiliari Equip^ d'Agrupament^ EA^
Intendència
CastorsLlopsRàngers i Dainesi iLlúdrigues Noies (^) Guia (^)
PionersTrucsSuport i Caravel·les I^
AnimacióCol·laboració de l'espiritualitat^ externa^ SuportEspiritualitat^ NANA^
Vetlladoria^ NA^
**Inf** : Infant. **NA** : No accés. **CdB** : Cap de Branca. **EA** : Equip d'Agrupament. **I** : Intendència


(^) **Annex C: Diagrama de Gantt
Inici**^ **Planificació**^ **Execució**^ **Tancament**^ **Memòria**^
**Setembre**^ Plantejament i
**Octubre** pluja^ d’idees^ Planificació, i
**Novembre**^ metodològicarecerca^
(^)
**Desembre**^ _Sprint 1_^
**Gener**^
**Febrer**^ _Sprint 2_^
**Març**^
**Abril**^ _Sprint_^3^
**Maig**^ milloresd’usabilitatEnquesta finals^ i^
Redaccióla memòria de
**Juny**^


```
PHP
```
(^) **Annex D: Crides a l’API de SinergiaCRM des del middleware**
<?php **$args** 'session' //= arrayQUERY( =>PER $ID_SESSIÓ, RECUPERAR REGISTRE // Variable SABENT L'IDdesada (^) de la funció login()
'module_name''id''select_fields' => $ID_Registre, => =>$NOM_MÒDUL, array (^) ( ... // //), Nom Variable del// mòdul Campscalculada (extret (noms (^) lògicsdel CRM) del (^) CRM)
'link_name_to_fields_array'arrayarray( (^) ( 'name' => ... => , array// Mòdul( // relacionatRelacions del(nom CRM lògic (^) del CRM)
(^) ), (^) array'value'( ... ), => array( ... ), // Camps del mòdul relacionat
),'max_results''deleted' (^) => false,=> 1 , //// LímitNo mostris de resultats els registres retornats eliminats (^)
(^) ); 'query''related_module_query' => $QUERY // Consulta => $REL_QUERY, en SQL per // filtrarConsulta els sobre registres mòduls (^) relacionats
//// **$result** FuncióEl primer = auxiliar$this->restRequest( argument per ésa encapsularel mètode'get_entry' dela lacrida. (^) ,petició, **$args** (^) ); el segon els arguments.
/* **$result** EL"entry_list" FORMAT = array:2 DE LA => (^) [RESPOSTA▼ array:2 ÉS[▼ EL SEGÜENT:
0 =>"id""module_name" array:3 => _ID_REGISTRE_ [▼ (^) => _NOM_MÒDUL_ (^)
"name_value_list"] "NOM_CAMP" => =>_VALOR_CAMP_ array: [▼ (^) , ...
] 1 => array:3 [▶ ...], ... // TANTS REGISTRES COM S'HAGIN TROBAT
]"relationship_list" (^0) => array:1 [▼ => array: [▶
0 => (^) "name""records"array: =>[▼ _NOM_RELACIÓ_=>// array:TANTES [RELACIONS▼ // REGISTRES COM A RELACIONATSLA PETICIÓ (^)
(^0) ] => (^) "NOM_CAMP"array: [▼ (^) => _VALOR_CAMP_// CAMPS RELACIONATS , ...
(^) ] ] ]
(^) ] 1 ] => array:1 [▶ ... ], ,,, // TANTS REGISTRES COM S'HAGIN TROBAT
*/


(^) **Annex E: Esquema de taules del middleware**
Fet^ amb^ https://dbdiagram.io/^


```
PHP PHP
```
```
PHP
```
(^) **Annex F: migració bàsica per a crear una taula a SQL amb Laravel**
Exemple^ de^ fitxers^ d’objectes^ del^ Model^ ( **Afiliat.php**^ i^ **Funcio.php** )^
<?phpnamespaceuse Illuminate\Database\Eloquent\Model; (^) App\Models; (^)
class //protected AfiliatNom de la$tableextends taula = Modela'afiliats' la base{ (^) de; dades
//protected// ClauDeclara primària $primaryKey que la (si clau no = primàriaés'afiliat_id' 'id' perés textdefecte);
//protectedpublic i no $incrementingés $keyTypeautoincremental = 'string'= false; (defecte);
////public Desactiva'created_at' $timestamps les ivariables 'updated_at' = false; automàtiques
protected]; 'afiliat_id' $fillable, 'nom' = [, //'dni' Columnes,
publicreturn (^) $this->hasMany(function funcions() // Relació { (^) 1:N
(^) } Funcio::'afiliat_id'class);, 'afiliat_id',
}^
<?phpnamespaceuse Illuminate\Database\Eloquent\Model; (^) App\Models; (^)
class protectedprotected Funcio extends$table$primaryKey =Model 'funcions' = {'funcio_id' (^) ; (^) ;
protectedpublicpublic $incrementing$timestamps $keyType == 'string'=false; false; ;
protected'funcio_id''data_inici' $fillable, (^) ,'afiliat_id' 'data_fi' = [ (^) , ,
];protected (^) 'data_inici' $casts =>= ['date' // Verificació, de tipus
];public (^) return function $this->belongsTo( afiliat() { (^) // Relació N:1
(^) );Afiliat:: 'afiliat_id'class, (^) , 'afiliat_id'
}^ }^
Fitxer de la migració:
<?phpuseuse Illuminate\Database\Migrations\Migration;Illuminate\Database\Schema\Blueprint; (^)
usereturn publicIlluminate\Support\Facades\Schema; new functionclass extends up(): Migrationvoid { {
Schema::create($table->string($table->string('afiliats''afiliat_id''nom');, function)->primary(); (Blueprint// Columan // $table)Clau de primària tipus { (^) "string" (^)
(^) });Schema::create( $table->string('funcions''dni')->nullable;, function (Blueprint// Columna $table) que admet { valosr NULL
$table->string($table->string($table->date('data_inici''funcio_id''afiliat_id');)->primary();); //// FuturaCamp de clau tipus forana data
$table->foreign(->references(->onDelete('cascade''afiliat_id''afiliat_id'); ))->on(//^ Política'afiliats'//^ Definició en eliminar) //^ deColumna^ claula referència^ foranareferenciada^
}public });^ function down(): void {
(^) } Schema::dropIfExists(Schema::dropIfExists('funcions''afiliats');); // Eliminar primer les taules no referenciades
};


(^) **Annex G: Captures de pantalla del** **_Dossier de campaments_** **i comparativa
amb MEGFigura cAPPs 1** : pantalla (^) d’inici de sessió.
**Figura 2** : pantalla principal (escriptori i mòbil) després de l’inici de sessió.^


(^) **Annex H: pantalles de l’aplicació**


^


(^) **Annex I: Certificat de representació de l’entitat**
RespostaSi el certificatde validació (UUID) del codi és devàlid, certificat: és a dir, (^) és present a la base de dades, retorna un missatge de
validació amb la informació de la funció, l’afiliar i la data a la qual fa referència.
baseSi de^ el dades,^ codi^ del retormna^ certificat un^ nomissatge^ és^ vàlid d’error^ o^ el^ certificat^ s’elimina^ o^ es^ deixa^ de^ marcar^ com^ a^ vàlid^ a^ la^
^


```
PHP
```
(^) **Annex J: Consultes dins el middleware per a la visualització de dades**
/*public Funcióreturn static d'ajudaFuncio::query() function per extreure getFuncionsActives(){ totes les funcions actives a l'entitat */
->whereNull(->where(->select('funcions.data_inici''funcions.*''funcions.data_fi'); ,) '<' , now()) ////// FuncionsTotsFuncions els sensecampsja iniciades datade la de funció fi (^)
} (^) $infants (^) = self::getFuncionsActives() // Funcions actives
->where(->pluck('rol''afiliat_id', 'infant')->unique()->count();) // amb rol d'infant // (^) Afiliats únics
(^) $caps = self::getFuncionsActives()->where('rol', 'cap_grups' (^) )
(^) $agrupaments =->pluck( self::getFuncionsActives()'afiliat_id')->unique()->count(); //^ Caps^ actius^
'funcions.agrupament_id'->where(->join('agrupaments'nivell',^ )'agrupament' // Ajuntaas^ agr'amb)^ ,la^ taula'agr.agrupament_id' d'agrupaments ,^ '=',^
->where(->pluck('agr.nom''agrupament_id',^ 'not^ )->unique()->count();like',^ 'TEST%')^ //^ Exclou^ //^ Agrupaments^ proves^ actius^
$grupCounts = (^) ->select(->groupBy(self::getFuncionsActives()'grup''grup', (^) )->get();DB::raw('COUNT(DISTINCT // (^) Funcions actives afiliat_id) per grup as total'))
(^) $demarcacioCounts->join( = self::getFuncionsActives()'agrupaments as agr' (^) , 'agr.agrupament_id', '=',
'funcions.agrupament_id'->join('agrupaments) (^) as dem', 'dem.agrupament_id', '=',
'agr.demarcacio_id'->where(->where('agr.nom''funcions.nivell') // (^) ,Ajunta 'not like'amb, '<>' la, 'TEST%',seva 'meg' demarcació)) (^) // Exclou (^) generals
->select( (^) ->groupBy(DB::raw('dem.nom'dem.nom''COUNT(DISTINCT as)->get(); demarcacio' // funcions.afiliat_id) ,Agrupa (^) per demarcació as total'))
//$data_query Resposta (^) = ['totalInfants' => $infants,
'totalVoluntaris''totalCaps''totalAgrupaments' => $caps, => => $voluntaris, (^) $agrupaments, (^)
(^) /* L'aplicació 'grupCounts''demarcacioCounts' inclou un tipus => $grupCounts, per => a$demarcacioCounts, parsejar (^) aquesta estructura]; (^) */
return response()->json(['success' => $data_query,]);


(^) Gràfiques resultants:

- Infants (total i per branques):
- Caps (total i per branques):
- Agrupaments actius:
- Afiliats actius per demarcacions (lliscable)


(^) **Annex K: Flux d’ús de l’aplicació
Llegenda:**^
- - **GrisLila** :: botó,pantalla text o o element icona seleccionable. (^)
- - **Blau** _Subratllat_ : menú _i_ (^) _cursiva_ flotant (^) : enllaç a un web extern.
- - **BlancVermell** : element: en desenvolupament. extern. (^)

- **Fletxes** → Navegació


(^) **Annex L: Formulari d’incidències**

**- Formulari:**


(^) **- Pantalla de resum en enviar el formulari:**

**- Registre creat al CRM:**^


(^) **- Correu enviat a l’equip de suport**
^


(^) **Annex M: Diagrama de les crides dins l’aplicació**


(^) **Annex N: Taula de tasques de la prova d’usabilitat
IntendènciaRol**^ Consultar el llistat d’infants **Tasques** i cocaps de^ la unitat.
**Cap de branca**
ConsultarConsultarPassar llista elllistat dellistat l’últim de d’infantscaps cau del (escolliu-ne conselli cocaps de una):la unitat.
- -- CrearValidarMarcar l’assistència assistèniaque 3 infants de (^3) no infants. van venir. (^)
CrearGenerar una un excursió text per pera enviar la setmana pel grup que de ve. famílies. (^)
**Equip d’Agrupament** ConsultarGenerar certificat^ llistat^ de de^ caps pertinença^ del^ consell a l’EA^ per fer un tràmit
**Tothom** AnarDes-Consultar de^ alMapa^ l’app,perfil quants |^ obrirComptacaui^ revisar infants^ un^ d’aquestsles hi |funcions. Dossierha a l’entitat.portals: (^)


(^) **Annex O: Enquesta de valoració de la prova d’usabilitat**
Preguntes:


(^) **Respostes:**


```
SQL PHP
```
```
TypeScript
```
(^) **Annex P: Com afegir funcionalitats**
8.2.1^ Afegir^ un^ camp^ o^ relació^ a^ una^ classe^ del^ model^
#ALTERADD Afegir COLUMN TABLE camp columnataula (^) [tipus];
(^) #ALTER Afegir TABLE relació taula (^)
ADDFOREIGNREFERENCES CONSTRAINT KEY forana(id);(forana_id) fk_Forana
Schema::table( (^) //function Afegir camp(Blueprint'taula' , (^) $taula) {
$table->[tipus](// Afegir relació'columna' );
$table->foreign(->references(->on('forana''forana_id''id'); ) )
});^
8.2.4 Afegir una funcionalitat a un rol dins l’aplicació
export (^) let{ page, Actiondefault selected = function<ThemedText }: {ActionContainer( page: type any="default", selected: (^) >No hiMODEL.Funcio ha accions...</ThemedText>; | null }) { (^)
if(selected){switchcase(selected.rol){ "cap_grups" // Si s'ha: seleccionat una acció
(^) // (^) **case** RestaAction **"intendencia"** de = rols...<ActionButtonCapBranca (^) **:** // Rol a afegir funcio={selected} />; break;
(^) default **Action** : (^) **=** Action **<ActionButtonIntendencia** = <Text style={{ color: **funcio={selected}** STYLES.GRAY }}> **/>; break;**
(^) } } Funció sense funcionalitats...</Text>;
return);<View ( style={styles.actions}>// Si no s'ha seleccionat ... res <View> encara
}
export{onPress, const function buttonStyle title, ActionButton( style}: = Array.isArray(style) { onPress: // Component () => void auxiliar? Object.assign({},, title: (^) string , ...style)style?: any : }) {
(^) returnstyle// Botó (|| (^) amb{}; un// callbackL'estil és opcional
<TouchableOpacity<Text{title style={buttonStyle.actionBtnText ?? ""} style={buttonStyle}// Títol de la funcionalitat onPress={onPress}> ?? styles.actionBtnText}>
(^) );</TouchableOpacity> </Text> (^)
}


```
TypeScript
```
```
TypeScript
```
export //return Lliscador function (<ScrollView horitzontalActionButtonIntendencia({funcio}: horizontal per si showsHorizontalScrollIndicator={cal afegir més d'una{ funcio: funcionalitat MODEL.Funcio})true (^) }> {
<ActionButton//// Funciócas es quedirigeix (^) es crida a la en pàgina apretar de ella botóUnitat de ambla funcionalitatels paràmetres (en requerits aquest (^)
onPress={()router.push({params:{unitat_id: => pathname: (^) funcio.unitat_id?? "/(app)/(aeig)/(unitat)/unitat"'', funcio: JSON.stringify(funcio), (^) }
(^) //} }) (^) Títol (^) de la funcionalitat
(^) ]}/>title={funcio.unitat_idstyle={...} // Estil que? "Lase limeva vulgui unitat" donar:"Funció al botó sense unitat"}
(^) } </ScrollView>);
(^) 8.2.5 Afegir crida a l’API des de l’aplicació
////// Fitxer **Funció** /fetch?q=[query (^) ./constants/utils.ts **auxiliar** :] cridaamb paràmetres a l'endpoint (^) dins de l'array l'API (^) params (inclou **afiliat_id** )
export =>const { const url = **fetchQuery** new URL(`${API}/fetch` = async (query:); string, params: Record<string, string>)
url.searchParams.append(Object.keys(params).forEach(keyurl.searchParams.append(key,"q", query); params[key]));=> //// AfegeixAfegeix ella paràmetreresta de paràmetresquery (^)
constreturn{method: response await "GET" cleanResponse(response); = (^) ,await headers: fetch(url. {"Content-Type"toString // (),funció: "application/json"// Fetchauxiliar a la URL (^) },});
};^
//// FitxerCrida a./constants/database.ts l'endpoint de l'API /fetch?q=getUnitatById (^)
//export fetchQuery(amb paràmetresconst **getUnitatByID'unitatByID'** afiliat_id, (^) = **{** (^) **'afiliat_id'** iasync unitat_id (afiliat_id: (^) **: afiliat_id,** string, (^) **'unitat_id'** unitat_id: (^) **:** string **unitat_id}** ) => (^) );


```
PHP
```
```
TypeScript
```
(^) El controlador ( **./app/Http/Controllers/Database/DBFetchController.php** ) que gestiona les
peticionscas al **switch** a **/fetch** : té la següent estructura. Per a definir una nova consulta només cal afegir un nou
**public** //if (^) (!Per (^) isset **function** a saber($request->afiliat_id)) **fetch(Request** quin afiliat (^) **$request)** ha fetreturn la (^) **{** consulta: (^) response()->json(DBErrors::NoLogin()); (^)
$userif (!$user) = self::GetUserLoggedIn($request->afiliat_id); return response()->json(DBErrors::NoLogin()); // Funció auxiliar
//if (!Miraisset que($request->q)) hi hagi una queryreturn indicada response()->json(DBErrors::NoQuery()); (^)
//$permisosif (^) (PermisController::getInstance()->noPermisos($permisos))Calcula =permisos $user->permisos; de l'usuari que consulta (^)
(^) **switch($request->q)** return^ response()->json(DBErrors::NoPermissionApp()); **{**^
casereturnbreak "..."; response()->json(...);: // Resta de consultes
(^) **caseif(!PermisController::isAgrupament($permisos)) "unitatByID":** // Definim la query (^) // Comprova permisos
(^) **if(!issetreturnreturn($request->unitat_id)) response()->json(DBErrors::InvalidQuery());response()->json(DBErrors::InvalidQuery());** // Camps requerits, sinó (^) Error
// **return** (^) **[** Retorna **'success' response()->json(** la (^) **=>** unitat **Unitat::findOrFail($request->unitat_id)->toJson()]);** (^) (^)
(^) **break** // Si **;** (^) la consulta no coincideixamb cap, error:
default return:^ response()->json(DBErrors::InvalidQuery());
} }^ break;^
(^) 8.2.6 Afegir una gràfica a la visualització de dades
//type Estrutura **DataQuery** de (^) =dades { // retornadesAfegim més (ambatributs mateixos si és noms) necessari pel controlador
}; **totalInfantsgrupCounts** ?:?:^ {^ numbergrup:^ ;string^ //^ Indicador;^ total:^ claunumber^ }[]^ |^ [];^ //^ Totals^ agrupats^
export default function DataScreen() {


const//.filter((c) **InfantsTotals** Filtrem els => counts(c.grup = **data?.grupCounts?** d'infants? c.grup.startsWith( (^) "infant_") : false))
.map((item, value:label: item.total,MAP_LABELS[item.grup], i) => ({ // Mapegem cada objecte (^) // Etiqueta (^) // Total de grupcalculat
frontColor:topLabelComponent:<Text style={{ BRANCA_COLORS[item.grup], color: () => "darkGray"( // Text (^) ,d'etiqueta fontSize: // sobre 12 Color, marginBottom: lesde labarres Barra (^4) }}>
(^) ),</Text> {item.total} // Total de cada branca
(^) const})); (^) **InfantsComponent** = (
<View<ThemedText style={{{ **data?.totalInfants** width:type="subtitle" "100%" || }}>"test" style={{ (^) } //Total textAlign: d'infants "center" }}>
</ThemedText><GraficBarresDATA={[ // Gràfic amb els totals per branques
...(]),{ **InfantsTotals** label: "NO DATA" ?? [, (^) value: 0 , frontColor: LIGHT },
(^) </View>/> ]}
);return (^) (<ScrollView // Scroll vertical amb totes les gràfiques
style={styles.container}refreshControl={<RefreshControl (^) refreshing={refreshing} (^) onRefresh={onRefresh} />
(^) <ThemedText< **DataGrid** }> (^) > type="title">MEG ja som...</ThemedText> // Títol
(^) (^) </ScrollView></ **DataGrid<DataCard** > **icon="person" title="Infants" content={InfantsComponent} />**
(^) } );
(^)


## Annex Q: Verificació en 2 passos a l’inici de sessió

```
Noves taules per a verificar (Challenge i Dispositiu) i les seves relacions:
```
```
Flux d’interaccions per a un inici de sessió normal a l’aplicació:^
```

