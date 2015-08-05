/**
 * http://dawa.aws.dk/
 */
declare namespace DAWA {
	interface Link {
		/**
		 * Objektets unikke URL.
		 */
		href: string;
	}

	interface GeneralAddress extends Link {
		/**
		 * Universel, unik identifikation af adressen af datatypen UUID. Er stabil over hele adressens levetid (ligesom et CPR-nummer) dvs. uanset om adressen evt. ændrer vejnavn, husnummer, postnummer eller kommunekode. Repræsenteret som 32 hexadecimale tegn. Eksempel: ”0a3f507a-93e7-32b8-e044-0003ba298018”.
		 */
		id: string;
		/**
		 * Sammensat nøgle for adressen. Indeholder til brug for integration til ældre systemer felter, der tilsammen identificerer adressen. Hvis det er muligt, bør adressens id eller href benyttes til identifikation.
		 */
		kvhx: string;
		
		/**
		 * Adressens status. 1 indikerer en gældende adresse, 3 indikerer en foreløbig adresse.
		 */
		status: number;
		
		/**
		 * Væsentlige tidspunkter for adressen
		 */
		historik: Historik;
	}
	
	/**
	 * En adresse er en struktureret betegnelse som angiver en særskilt adgang til et areal, en bygning eller en del af en bygning efter reglerne i adressebekendtgørelsen.
	 * 
	 * En adresse angiver en særskilt adgang til et areal, en bygning eller en del af en bygning, efter reglerne i adressebekendtgørelsen. En adresse fastsættes for at angive en bestemt adgang til
	 *  - et areal, fx. en byggegrund, et grønt område eller en sportsplads
	 *  - en bygning, herunder et andet bygværk, f.eks. et teknisk anlæg
	 *  - en del af en bygning, fx en etage eller en bolig- eller erhvervs¬enhed i en bygning
	 * 
	 * Forskellen på en adresse og en adgangsadresse er at adressen rummer eventuel etage- og/eller dørbetegnelse. Det gør adgangsadressen ikke.
	 * 
	 * http://dawa.aws.dk/adressedok#adressedata
	 */
	interface Adresse extends GeneralAddress {
		/**
		 * Etagebetegnelse. Hvis værdi angivet kan den antage følgende værdier: tal fra 1 til 99, st, kl, kl2 op til kl9.
		 */
		etage?: string;
		
		/**
		 * Dørbetegnelse. Hvis værdi angivet kan den antage følgende værdier: tal fra 1 til 9999, små og store bogstaver samt tegnene / og -.
		 */
		dør?: string;

		adressebetegnelse: string;
		
		/**
		 * Forskellen på en adresse og en adgangsadresse er at adressen rummer eventuel etage- og/eller dørbetegnelse. Det gør adgangsadressen ikke.
		 */
		adgangsadresse: AdgangsAdresse;
	}

	/**
	 * http://dawa.aws.dk/adgangsadressedok#adressedata
	 */
	interface AdgangsAdresse extends GeneralAddress {
		/**
		 * Vejstykket som adressen er knyttet til.
		 */
		vejstykke: Vejstykke;
		
		/**
		 * Husnummer der identificerer den pågældende adresse i forhold til andre adresser med samme vejnavn. Husnummeret består af et tal 1-999 evt. suppleret af et stort bogstav A..Z, og fastsættes i stigende orden, normalt med lige og ulige numre på hver side af vejen. Eksempel: "11", "12A", "187B".
		 */
		husnr?: string;
		
		/**
		 * Et supplerende bynavn – typisk landsbyens navn – eller andet lokalt stednavn, der er fastsat af kommunen for at præcisere adressens beliggenhed indenfor postnummeret. Indgår som en del af den officielle adressebetegnelse. Indtil 34 tegn. Eksempel: ”Sønderholm”.
		 */
		supplerendebynavn?: string;
		
		/**
		 * Postnummeret som adressen er beliggende i.
		 */
		postnummer?: NummerNavn;
		
		/**
		 * Evt. stormodtagerpostnummer (firmapostnummer) som er tilknyttet adressen.
		 */
		stormodtagerpostnummer?: NummerNavn;
		
		/**
		 * Kommunen som adressen er beliggende i.
		 * 
		 * kode = Kommunekoden. 4 cifre.
		 */
		kommune: KodeNavn;
		
		/**
		 * DEPRECATED. Opdateres ikke længere. Benyt "jordstykke" i stedet. Feltet indeholder den værdi der i sin tid var registreret i BBR. I dag beregnes det tilhørende jordstykke ud fra adgangspunktets placering.
		 */
		ejerlav: Ejerlav;
		
		/**
		 * DEPRECATED. Feltet opdateres ikke længere. Benyt "jordstykke" i stedet. Angiver matrikelnummeret for jordstykket, som det var registreret i BBR. Repræsenteret ved Indtil 7 tegn: max. 4 cifre + max. 3 små bogstaver. Eksempel: ”18b”.
		 */
		matrikelnr?: string;
		
		/**
		 * Identifikation af den vurderingsejendom jf. Ejendomsstamregisteret, ESR, som det matrikelnummer som adressen ligger på, er en del af. Stammer fra BBR. Repræsenteret ved op til syv cifre. Eksempel ”13606”.
		 */
		esrejendomsnr?: string;
		
		/**
		 * Væsentlige tidspunkter for adgangsadressen
		 */
		historik: Historik;
		
		/**
		 * Geografisk punkt, som angiver særskilt adgang fra navngiven vej ind på et areal eller bygning.
		 */
		adgangspunkt: Adgangspunkt;
	}
	
	/**
	 * http://dawa.aws.dk/vejedok#vejnavnedata
	 */
	interface Vejnavn {
		/**
		 * Vejnavnet
		 */
		navn: string;
		/**
		 * De postnumre, hvori der ligger en vej med dette navn.
		 */
		postnumre: NummerNavn[];
		/**
		 * Kommunen hvori der ligger en vej med dette navn.
		 * 
		 * TODO: Feltet er ikke beskrevet i dokumentationen?
		 */
		kommune: KodeNavn;
		
		/**
		 * De kommuner hvori der ligger en vej med dette navn.
		 * 
		 * kode = Kommunekoden. 4 cifre.
		 * 
		 * TODO: Servicen returner ikke dette felt? Den returnerer "kommune" i stedet for?
		 */
		kommuner: KodeNavn[];
	}
	
	/**
	 * http://dawa.aws.dk/vejedok#vejstykkedata
	 */
	interface Vejstykke extends Link {
		/**
		 * Identifikation af vejstykket. Er unikt indenfor den pågældende kommune. Repræsenteret ved fire cifre. Eksempel: I Københavns kommune er ”0004” lig ”Abel Cathrines Gade”.
		 */
		kode: string;
		
		/**
		 * Vejens navn.
		 */
		navn?: string;
		
		/**
		 * En evt. forkortet udgave af vejnavnet på højst 20 tegn, som bruges ved adressering på labels og rudekuverter og lign., hvor der ikke plads til det fulde vejnavn.
		 */
		adresseringsnavn: string;
	}
	
	/**
	 * http://dawa.aws.dk/supplerendebynavndok#supplerendebynavndata
	 */
	interface SupplerendeBy extends Link {
		/**
		 * Det supplerende bynavn. Indtil 34 tegn. Eksempel: ”Sønderholm”.
		 */
		navn: string;
		
		/**
		 * Kommuner, som det supplerende bynavn er beliggende i.
		 * 
		 * kode = Kommunekoden. 4 cifre.
		 */
		kommuner: KodeNavn[];
		
		/**
		 * Postnumre, som det supplerende bynavn er beliggende i.
		 */
		postnumre: NummerNavn[];
	}
	
	/**
	 * http://dawa.aws.dk/postnummerdok#postnummerdata
	 */
	interface Postnumre extends NummerNavn {
		/**
		 * Hvis postnummeret er et stormodtagerpostnummer rummer feltet adresserne på stormodtageren.
		 */
		stormodtageradresser?: LinkId[];
		
		/**
		 * De kommuner hvis areal overlapper postnumeret areal.
		 * 
		 * kode = Kommunekoden. 4 cifre.
		 */
		kommuner: KodeNavn[];
	}

	interface Adgangspunkt {
		/**
		 * Adgangspunktets koordinater som array [x,y].
		 */
		koordinater?: number[];
		
		/**
		 * Kode der angiver nøjagtigheden for adressepunktet. Et tegn. ”A” betyder at adressepunktet er absolut placeret på et detaljeret grundkort, tyisk med en nøjagtighed bedre end +/- 2 meter. ”B” betyder at adressepunktet er beregnet – typisk på basis af matrikelkortet, således at adressen ligger midt på det pågældende matrikelnummer. I så fald kan nøjagtigheden være ringere en end +/- 100 meter afhængig af forholdene. ”U” betyder intet adressepunkt.
		 */
		nøjagtighed: string;
		
		/**
		 * Kode der angiver kilden til adressepunktet. Et tegn. ”1” = oprettet maskinelt fra teknisk kort; ”2” = Oprettet maskinelt fra af matrikelnummer tyngdepunkt; ”3” = Eksternt indberettet af konsulent på vegne af kommunen; ”4” = Eksternt indberettet af kommunes kortkontor o.l. ”5” = Oprettet af teknisk forvaltning."
		 */
		kilde?: number;
		
		/**
		 * Kode der angiver den specifikation adressepunktet skal opfylde. 2 tegn. ”TD” = 3 meter inde i bygningen ved det sted hvor indgangsdør e.l. skønnes placeret; ”TK” = Udtrykkelig TK-standard: 3 meter inde i bygning, midt for længste side mod vej; ”TN” Alm. teknisk standard: bygningstyngdepunkt eller blot i bygning; ”UF” = Uspecificeret/foreløbig: ikke nødvendigvis placeret i bygning."
		 */
		tekniskstandard?: string;
		
		/**
		 * Angiver en evt. retningsvinkel for adressen i ”gon” dvs. hvor hele cirklen er 400 gon og 200 er vandret. Værdier 0.00-400.00: Eksempel: ”128.34”.
		 */
		tekstretning?: number;
		
		/**
		 * Dato for sidste ændring i adressepunktet, som registreret af BBR. Eksempel: ”1998-11-17T00:00:00”
		 */
		ændret?: Date;
		
		/**
		 * Adressens placering i Det Danske Kvadratnet (DDKN).
		 */
		DDKN?: DDKN;
		
		/**
		 * Sognet som adressen er beliggende i. Beregnes udfra adgangspunktet og sogneinddelingerne fra DAGI
		 * 
		 * kode = Sognekoden. 4 cifre.
		 */
		sogn?: KodeNavn;
		
		/**
		 * Regionen som adressen er beliggende i. Beregnes udfra adgangspunktet og regionsinddelingerne fra DAGI
		 * 
		 * kode = Regionskoden. 4 cifre.
		 */
		region?: KodeNavn;
		
		/**
		 * Retskredsen som adressen er beliggende i. Beregnes udfra adgangspunktet og retskredsinddelingerne fra DAGI
		 * 
		 * kode = Retskredskoden. 4 cifre.
		 */
		retskreds?: KodeNavn;
		
		/**
		 * Politikredsen som adressen er beliggende i. Beregnes udfra adgangspunktet og politikredsinddelingerne fra DAGI
		 * 
		 * kode = Identifikation af politikredsen
		 */
		politikreds?: KodeNavn;
		
		/**
		 * Opstillingskresen som adressen er beliggende i. Beregnes udfra adgangspunktet og opstillingskredsinddelingerne fra DAGI
		 */
		opstillingskreds?: KodeNavn;
		
		/**
		 * Hvilken zone adressen ligger i. "Byzone", "Sommerhusområde" eller "Landzone". Beregnes udfra adgangspunktet og zoneinddelingerne fra PlansystemDK
		 */
		zone: string;
		
		/**
		 * Jordstykket, som adressens adgangspunkt ligger på. Dette kan afvige fra det jordstykke der er registreret i BBR.
		 */
		jordstykke?: Jordstykke;
	}

	interface Jordstykke extends Link {
		/**
		 * Ejerlavet som jordstykket tilhører.
		 * 
		 * kode = Ejerlavets kode. Op til 7 cifre.
		 */
		ejerlav: KodeNavn;
		
		/**
		 * Jordstykkets matrikelnummer. Udgør sammen med ejerlavet en unik nøgle for jordstykket. Repræsenteret ved Indtil 7 tegn: max. 4 cifre + max. 3 små bogstaver. Eksempel: ”18b”
		 */
		matrikelnr: string;
		
		/**
		 * Identifikation af den vurderingsejendom jf. Ejendomsstamregisteret, ESR, som jordstykket er en del af. Repræsenteret ved op til syv cifre. Eksempel ”13606”.
		 */
		esrejendomsnr: string;
	}

	interface DDKN {
		/**
		 * Angiver betegnelsen for den 100 m celle som adressen er beliggende i. 15 tegn. Eksempel: ”100m_61768_6435”.
		 */
		m100: string;
		
		/**
		 * Angiver betegnelsen for den 1 km celle som adressen er beliggende i. 12 tegn. Eksempel: ”1km_6176_643”.
		 */
		km1: string;
		
		/**
		 * Angiver betegnelsen for den 10 km celle som adressen er beliggende i. 11 tegn. Eksempel: ”10km_617_64”.
		 */
		km10: string;
	}
	
	/**
	 * Væsentlige tidspunkter for adressen
	 */
	interface Historik {
		/**
		 * Dato og tid for adressens oprettelse, som registreret hos BBR. Eksempel: 2001-12-23T00:00:00.
		 */
		oprettet?: Date;
		/**
		 * Dato og tid hvor der sidst er ændret i adgangsadressen, som registreret hos BBR. Eksempel: 2002-04-08T00:00:00.
		 */
		ændret?: Date;
	}

	interface NummerNavn extends Link {
		/**
		 * Postnummer
		 */
		nr: string;
		
		/**
		 * Det navn der er knyttet til postnummeret, typisk byens eller bydelens navn. Repræsenteret ved indtil 20 tegn. Eksempel: ”København NV”.
		 */
		navn?: string;
	}

	interface KodeNavn extends Link {
		kode: string;
		navn?: string;
	}

	interface LinkId extends Link {
		id: string;
	}

	interface LinkKode extends Link {
		kode: string;
	}
	
	/**
	 * Deprecated
	 */
	interface Ejerlav {
		/**
		 * DEPRECATED. Feltet opdateres ikke længere. Benyt "jordstykke" i stedet. Angiver ejerlavkoden registreret i BBR. Repræsenteret ved indtil 7 cifre. Eksempel: ”170354” for ejerlavet ”Eskebjerg By, Bregninge”.
		 */
		kode?: number;
		/**
		 * Det matrikulære ”ejerlav”s navn. Eksempel: ”Eskebjerg By, Bregninge”.
		 */
		navn: string;
	}

	namespace Lister {
		interface GeneralData extends Link {
			/**
			 * Tidspunkt for seneste ændring registreret i DAWA. Opdateres ikke hvis ændringen kun vedrører geometrien (se felterne geo_ændret og geo_version).
			 */
			ændret: Date;
			/**
			 * Tidspunkt for seneste ændring af geometrien registreret i DAWA.
			 */
			geo_ændret: string;
			/**
			 * Versionsangivelse for geometrien. Inkrementeres hver gang geometrien ændrer sig i DAWA.
			 */
			geo_version: string;
			navn?: string;
		}
		
		/**
		 * http://dawa.aws.dk/listerdok#regiondata
		 */
		interface Regioner extends GeneralData {
			/**
			 * Regionskode. 4 cifre.
			 */
			kode: string;
		}
		
		/**
		 * http://dawa.aws.dk/listerdok#kommunedata
		 */
		interface Kommuner extends GeneralData {
			/**
			 * Kommunekode. 4 cifre.
			 */
			kode: string;
			/**
			 * Regionskode for den region kommunen er beliggende i. 4 cifre.
			 */
			regionskode?: string;
		}
		
		/**
		 * http://dawa.aws.dk/listerdok#sogndata
		 */
		interface Sogne extends GeneralData {
			/**
			 * Sognekode. 4 Cifre.
			 */
			kode: string;
		}
		
		/**
		 * http://dawa.aws.dk/listerdok#retskredsdata
		 */
		interface Retskredse extends GeneralData {
			/**
			 * Retskredskode. 4 cifre.
			 */
			kode: string;
		}
		
		/**
		 * http://dawa.aws.dk/listerdok#politikredsdata
		 */
		interface Politikredse extends GeneralData {
			/**
			 * Politikredskode. 4 cifre.
			 */
			kode: string;
		}
		
		/**
		 * http://dawa.aws.dk/listerdok#opstillingskredsdata
		 */
		interface Opstillingskredse extends GeneralData {
			/**
			 * Opstillingskredskode. 4 cifre.
			 */
			kode: string;
		}
		
		/**
		 * http://dawa.aws.dk/listerdok#valglandsdeldata
		 */
		interface Valglandsdele extends GeneralData {
			/**
			 * Valgslandsdelens bogstav, udgør nøglen.
			 */
			bogstav: string;
		}
		
		/**
		 * http://dawa.aws.dk/listerdok#storkredsdata
		 */
		interface Storkredse extends GeneralData {
			/**
			 * Storkredsens nummer. Heltal. Udgør nøglen.
			 */
			nummer: string;
		}
		
		/**
		 * http://dawa.aws.dk/listerdok#ejerlavdata
		 */
		interface Ejerlav extends KodeNavn {

		}
		
		/**
		 * http://dawa.aws.dk/listerdok#jordstykkedata
		 */
		interface Jordstykker extends Link {
			/**
			 * Tidspunkt for seneste ændring registreret i DAWA. Opdateres ikke hvis ændringen kun vedrører geometrien (se felterne geo_ændret og geo_version).
			 */
			ændret: Date;
			/**
			 * Tidspunkt for seneste ændring af geometrien registreret i DAWA.
			 */
			geo_ændret: string;
			/**
			 * Versionsangivelse for geometrien. Inkrementeres hver gang geometrien ændrer sig i DAWA.
			 */
			geo_version: string;
			/**
			 * Matrikelnummeret for jordstykket. Udgør sammen med ejerlavkoden en unik nøgle for jordstykket.
			 */
			matrikelnr: string;
			/**
			 * Identifikation af den vurderingsejendom jf. Ejendomsstamregisteret, ESR, som jordstykket er en del af. Repræsenteret ved op til syv cifre. Eksempel ”13606”.
			 */
			esrejendomsnr: string;
			/**
			 * SFE ejendomsnummer.
			 */
			sfeejendomsnr: string;
			/**
			 * Ejerlavet som jordstykket tilhører.
			 */
			ejerlav: KodeNavn;
			/**
			 * Kommunen som jordstykket er beliggende i.
			 */
			kommune?: LinkKode;
			/**
			 * Regionen som jordstykket er beliggende i.
			 */
			region?: LinkKode;
			/**
			 * Sognet som jordstykket er beliggende i.
			 */
			sogn?: LinkKode;
			/**
			 * Retskredsen som jordstykket er beliggende i.
			 */
			retskreds?: LinkKode;
		}
	}
}