import { EmergencyInfo, EmergencyType, SupportedLanguage } from '../../types/index.js';

/**
 * Multilingual emergency data for Split-specific alert types.
 * Mirrored from app/src/server/routes/emergency.ts
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
    }
  },
  flood: {
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
    en: {
      alertType: 'fire',
      title: 'Alert: Wildfire',
      instructions: [
        'Immediately evacuate the area as directed by officials.',
        'Close windows and doors when leaving to slow the spread.',
        'If smoke is present, stay low to the ground.'
      ],
      safetyTips: [
        'Dalmatian wildfires spread extremely fast in summer due to wind.',
        'Do not return to the building until given permission by firefighters.'
      ],
      contacts: [
        { name: 'Fire Brigade', phone: '193', description: 'Direct line to firefighters' },
        { name: 'General Emergency', phone: '112', description: '112 Center' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    }
  },
  air_quality: {
    en: {
      alertType: 'air_quality',
      title: 'Notice: Air Quality',
      instructions: [
        'Limit outdoor activities, especially for sensitive groups.',
        'Keep windows and doors closed.',
        'Use air conditioners with air recirculation.'
      ],
      safetyTips: [
        'Monitor official particle concentration announcements.',
        'In case of respiratory issues, contact a doctor.'
      ],
      contacts: [
        { name: 'Emergency Medical', phone: '194', description: 'For medical emergencies' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    }
  },
  general: {
    en: {
      alertType: 'general',
      title: 'Safety Information',
      instructions: [
        'Follow instructions from local authorities and emergency services.',
        'Always carry personal documents and a mobile phone.',
        'Watch over elderly people and children in your vicinity.'
      ],
      safetyTips: [
        'SplitAI provides you with the latest information in real-time.',
        'Always have emergency service numbers saved.'
      ],
      contacts: [
        { name: '112 - General Emergency', phone: '112', description: 'Emergency, police, fire' },
        { name: '193 - Fire Brigade', phone: '193', description: 'Fire service' },
        { name: '194 - Emergency Medical', phone: '194', description: 'Medical help' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    }
  }
};

/**
 * Tool handler for 'get_emergency_info'.
 * Returns multilingual emergency instructions and contacts for Split.
 * 
 * @param args - { alertType: string, language?: string }
 * @returns Promise<Record<string, unknown>>
 */
export async function getEmergencyInfo(args: Record<string, unknown>): Promise<Record<string, unknown>> {
  const { alertType, language = 'en' } = args;

  if (!alertType || typeof alertType !== 'string') {
    return { error: "Missing required argument: 'alertType' (string)." };
  }

  const type = alertType as EmergencyType;
  const alertData = emergencyData[type];

  if (!alertData) {
    return { error: `Emergency alert type '${alertType}' not found. Available types: ${Object.keys(emergencyData).join(', ')}` };
  }

  // Determine language fallback
  let targetLang = (language as string).toLowerCase() as SupportedLanguage;
  if (!alertData[targetLang]) {
    targetLang = 'en'; // Fallback to English
  }

  const data = alertData[targetLang];

  if (!data) {
    // If even English is missing (unlikely based on mock data above), take first available
    const firstLang = Object.keys(alertData)[0] as SupportedLanguage;
    return alertData[firstLang] as unknown as Record<string, unknown>;
  }

  return {
    ...data,
    lastUpdated: new Date().toISOString()
  } as unknown as Record<string, unknown>;
}
