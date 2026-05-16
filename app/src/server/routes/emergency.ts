import { Router, Request, Response } from 'express';
import { 
  EmergencyInfo, 
  EmergencyType, 
  SupportedLanguage, 
  APIResponse 
} from '../../types/index.js';

const router = Router();

/**
 * Multilingual emergency data for Split-specific alert types
 */
const emergencyData: Record<EmergencyType, Partial<Record<SupportedLanguage, EmergencyInfo>>> = {
  bura_wind: {
    hr: {
      alertType: 'bura_wind',
      title: 'Upozorenje: Jaka Bura',
      instructions: [
        'Zatvorite i osigurajte sve prozore i vrata.',
        'Izbjegavajte kretanje preko mostova i izloženih obalnih područja.',
        'Osigurajte predmete na balkonima i terasama.'
      ],
      safetyTips: [
        'Bura može doseći orkanske udare koji prevrću vozila.',
        'Ostanite u zatvorenom dok se vjetar ne smiri.'
      ],
      contacts: [
        { name: 'Opći hitni broj', phone: '112', description: 'Jedinstveni europski broj za hitne službe' },
        { name: 'Vatrogasci', phone: '193', description: 'Za intervencije kod srušenih stabala ili oštećenja krovova' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    },
    en: {
      alertType: 'bura_wind',
      title: 'Alert: Strong Bura Wind',
      instructions: [
        'Close and secure all windows and doors.',
        'Avoid crossing bridges and exposed coastal areas.',
        'Secure any objects on balconies or terraces.'
      ],
      safetyTips: [
        'Bura winds can reach hurricane speeds capable of overturning vehicles.',
        'Stay indoors until the wind subsides.'
      ],
      contacts: [
        { name: 'General Emergency', phone: '112', description: 'Unified European emergency number' },
        { name: 'Fire Brigade', phone: '193', description: 'For interventions regarding fallen trees or structural damage' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    },
    de: {
      alertType: 'bura_wind',
      title: 'Warnung: Starker Bura-Wind',
      instructions: [
        'Schließen und sichern Sie alle Fenster und Türen.',
        'Vermeiden Sie das Überqueren von Brücken und exponierten Küstengebieten.',
        'Sichern Sie alle Gegenstände auf Balkonen oder Terrassen.'
      ],
      safetyTips: [
        'Bura-Winde können Orkanstärken erreichen, die Fahrzeuge umkippen können.',
        'Bleiben Sie drinnen, bis der Wind nachlässt.'
      ],
      contacts: [
        { name: 'Allgemeiner Notruf', phone: '112', description: 'Einheitliche europäische Notrufnummer' },
        { name: 'Feuerwehr', phone: '193', description: 'Für Einsätze bei umgestürzten Bäumen oder Dachschäden' }
      ],
      language: 'de',
      lastUpdated: new Date().toISOString()
    }
  },
  flood: {
    hr: {
      alertType: 'flood',
      title: 'Upozorenje: Poplava',
      instructions: [
        'Pomaknite se na više katove ili povišena područja.',
        'Izbjegavajte vožnju ili hodanje kroz poplavljena područja.',
        'Isključite struju i plin ako je poplava neizbježna.'
      ],
      safetyTips: [
        'Samo 15cm brze vode može srušiti odraslu osobu.',
        'Voda može biti kontaminirana ili pod električnim naponom.'
      ],
      contacts: [
        { name: 'Opći hitni broj', phone: '112', description: 'Hitna pomoć, policija i vatrogasci' },
        { name: 'Vatrogasci', phone: '193', description: 'Za ispumpavanje vode i spašavanje' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    },
    en: {
      alertType: 'flood',
      title: 'Alert: Flash Flood',
      instructions: [
        'Move to higher floors or elevated ground.',
        'Avoid driving or walking through flooded areas.',
        'Turn off electricity and gas if flooding is imminent.'
      ],
      safetyTips: [
        'Just 15cm of fast-moving water can knock over an adult.',
        'Water may be contaminated or electrically charged.'
      ],
      contacts: [
        { name: 'General Emergency', phone: '112', description: 'Emergency medical, police, and fire' },
        { name: 'Fire Brigade', phone: '193', description: 'For water pumping and rescue' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    }
  },
  earthquake: {
    hr: {
      alertType: 'earthquake',
      title: 'Upozorenje: Potres',
      instructions: [
        'Sagni se, prekrij glavu i drži se (Drop, Cover, Hold).',
        'Ostanite podalje od stakla, vanjskih zidova i svega što može pasti.',
        'Ne koristite dizala.'
      ],
      safetyTips: [
        'Nakon prvog potresa očekujte naknadne udare.',
        'Ako ste vani, idite na otvoreni prostor dalje od zgrada.'
      ],
      contacts: [
        { name: 'Opći hitni broj', phone: '112', description: 'Sve hitne službe' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    },
    en: {
      alertType: 'earthquake',
      title: 'Alert: Earthquake',
      instructions: [
        'Drop, Cover, and Hold on.',
        'Stay away from glass, exterior walls, and anything that could fall.',
        'Do not use elevators.'
      ],
      safetyTips: [
        'Expect aftershocks after the initial quake.',
        'If outdoors, move to an open area away from buildings.'
      ],
      contacts: [
        { name: 'General Emergency', phone: '112', description: 'All emergency services' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    }
  },
  fire: {
    hr: {
      alertType: 'fire',
      title: 'Upozorenje: Požar',
      instructions: [
        'Odmah evakuirajte područje prema uputama službenih osoba.',
        'Zatvorite vrata i prozore prilikom izlaska kako biste usporili širenje.',
        'Ako je prisutan dim, krećite se nisko pri tlu.'
      ],
      safetyTips: [
        'Požari se u Dalmaciji ljeti šire izuzetno brzo zbog vjetra.',
        'Ne vraćajte se u zgradu dok ne dobijete dopuštenje vatrogasaca.'
      ],
      contacts: [
        { name: 'Vatrogasci', phone: '193', description: 'Izravna linija za vatrogasce' },
        { name: 'Opći hitni broj', phone: '112', description: 'Centar 112' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    }
  },
  air_quality: {
    hr: {
      alertType: 'air_quality',
      title: 'Obavijest: Kvaliteta zraka',
      instructions: [
        'Ograničite boravak na otvorenom, posebno osjetljive skupine.',
        'Držite prozore i vrata zatvorenima.',
        'Koristite klima uređaje s recirkulacijom zraka.'
      ],
      safetyTips: [
        'Pratite službene objave o koncentraciji čestica.',
        'U slučaju respiratornih smetnji, javite se liječniku.'
      ],
      contacts: [
        { name: 'Hitna pomoć', phone: '194', description: 'Za medicinske hitne slučajeve' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    }
  },
  general: {
    hr: {
      alertType: 'general',
      title: 'Sigurnosne Informacije',
      instructions: [
        'Pratite upute lokalnih vlasti i hitnih službi.',
        'Uvijek nosite sa sobom osobne dokumente i mobitel.',
        'Pazite na starije osobe i djecu u vašoj blizini.'
      ],
      safetyTips: [
        'SplitAI vam pruža najnovije informacije u realnom vremenu.',
        'Uvijek imajte spremljene brojeve hitnih službi.'
      ],
      contacts: [
        { name: '112 - Opći hitni broj', phone: '112', description: 'Hitna, policija, vatrogasci' },
        { name: '193 - Vatrogasci', phone: '193', description: 'Vatrogasna služba' },
        { name: '194 - Hitna pomoć', phone: '194', description: 'Medicinska pomoć' },
        { name: '195 - Spašavanje na moru', phone: '195', description: 'Traganje i spašavanje na moru' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    }
  }
};

/**
 * GET /api/emergency/:type
 * Returns multilingual emergency instructions and contacts
 */
router.get('/:type', (req: Request, res: Response) => {
  try {
    const type = req.params.type as EmergencyType;
    const lang = (req.query.lang as string) || 'hr';
    
    const alertData = emergencyData[type];

    if (!alertData) {
      const errorResponse: APIResponse<never> = {
        success: false,
        error: {
          code: 'ALERT_TYPE_NOT_FOUND',
          message: `Emergency alert type '${type}' not found.`
        },
        timestamp: new Date().toISOString()
      };
      return res.status(404).json(errorResponse);
    }

    // Determine language fallback (Target -> English -> Croatian -> First available)
    let supportedLang = lang as SupportedLanguage;
    if (!alertData[supportedLang]) {
      if (alertData['en']) supportedLang = 'en';
      else if (alertData['hr']) supportedLang = 'hr';
      else supportedLang = Object.keys(alertData)[0] as SupportedLanguage;
    }

    const data = alertData[supportedLang];

    if (!data) {
       const errorResponse: APIResponse<never> = {
        success: false,
        error: {
          code: 'LANGUAGE_NOT_SUPPORTED',
          message: `Language '${lang}' not supported for this alert type.`
        },
        timestamp: new Date().toISOString()
      };
      return res.status(404).json(errorResponse);
    }

    const response: APIResponse<EmergencyInfo> = {
      success: true,
      data: {
        ...data,
        lastUpdated: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    const errorResponse: APIResponse<never> = {
      success: false,
      error: {
        code: 'EMERGENCY_FETCH_FAILED',
        message: 'An unexpected error occurred while fetching emergency data.'
      },
      timestamp: new Date().toISOString()
    };
    res.status(500).json(errorResponse);
  }
});

export default router;
