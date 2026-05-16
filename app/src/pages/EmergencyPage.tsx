import React, { useState } from 'react';
import { EmergencyType, EmergencyInfo, SupportedLanguage } from '../types';
import QRScanner from '../components/emergency/QRScanner';
import EmergencyCard from '../components/emergency/EmergencyCard';
import PageContainer from '../components/layout/PageContainer';
import './EmergencyPage.css';

const mockEmergencyData: Record<SupportedLanguage, Record<EmergencyType, EmergencyInfo>> = {
  hr: {
    fire: {
      alertType: 'fire',
      title: 'Požar - Upute za sigurnost',
      instructions: [
        'Odmah nazovite 193 ili 112.',
        'Evakuirajte se najbližim sigurnim izlazom.',
        'Ne koristite dizala.',
        'Ako je dim, krećite se nisko uz pod.'
      ],
      safetyTips: [
        'Zatvorite vrata za sobom kako biste usporili širenje vatre.',
        'Provjerite jesu li svi ukućani na sigurnom.'
      ],
      contacts: [
        { name: 'Vatrogasci', phone: '193', description: 'Hitne intervencije kod požara' },
        { name: 'DUZS', phone: '112', description: 'Jedinstveni broj za hitne službe' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    },
    bura_wind: {
      alertType: 'bura_wind',
      title: 'Jaka Bura - Upozorenje',
      instructions: [
        'Ostanite u zatvorenom prostoru.',
        'Osigurajte pokretne objekte na balkonima i terasama.',
        'Izbjegavajte kretanje uz obalu i preko mostova.'
      ],
      safetyTips: [
        'Pazite na grane drveća i crijepove koji mogu pasti.',
        'Pratite službene obavijesti o prohodnosti cesta.'
      ],
      contacts: [
        { name: 'Cestovna pomoć', phone: '1987', description: 'HAK - pomoć na cesti' },
        { name: 'Centar 112', phone: '112', description: 'Opće hitne informacije' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    },
    flood: {
      alertType: 'flood',
      title: 'Poplava - Upute',
      instructions: [
        'Premjestite se na više katove.',
        'Isključite struju i plin.',
        'Ne prelazite preko poplavljenih područja.'
      ],
      safetyTips: [
        'Pijte samo flaširanu vodu.',
        'Slušajte radio za najnovije informacije.'
      ],
      contacts: [
        { name: 'HGSS', phone: '112', description: 'Hrvatska gorska služba spašavanja' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    },
    earthquake: {
      alertType: 'earthquake',
      title: 'Potres - Postupanje',
      instructions: [
        'Sagni se, prekrij i drži.',
        'Maknite se od prozora i polica.',
        'Nakon potresa izađite na otvoreni prostor.'
      ],
      safetyTips: [
        'Ne koristite dizala nakon potresa.',
        'Budite spremni na naknadna podrhtavanja.'
      ],
      contacts: [
        { name: 'Hitna pomoć', phone: '194', description: 'Medicinska pomoć' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    },
    air_quality: {
      alertType: 'air_quality',
      title: 'Kvaliteta zraka - Upozorenje',
      instructions: [
        'Ostanite u zatvorenom.',
        'Zatvorite sve prozore i vrata.',
        'Smanjite fizičku aktivnost na otvorenom.'
      ],
      safetyTips: [
        'Koristite pročišćivače zraka ako su dostupni.',
        'Osobe s respiratornim problemima trebaju biti posebno oprezne.'
      ],
      contacts: [
        { name: 'NZJZ Split', phone: '021 401 111', description: 'Nastavni zavod za javno zdravstvo' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    },
    general: {
      alertType: 'general',
      title: 'Opća Opasnost',
      instructions: [
        'Pratite upute komunalnih redara.',
        'Ostanite pribrani i ne širite paniku.',
        'Nazovite 112 za sve hitne upite.'
      ],
      safetyTips: [
        'Pomažite starijim osobama i djeci.',
        'Čuvajte bateriju na mobilnom uređaju.'
      ],
      contacts: [
        { name: 'Centar 112', phone: '112', description: 'Glavni hitni broj' }
      ],
      language: 'hr',
      lastUpdated: new Date().toISOString()
    }
  },
  en: {
    fire: {
      alertType: 'fire',
      title: 'Fire Safety Instructions',
      instructions: [
        'Call 193 or 112 immediately.',
        'Evacuate through the nearest safe exit.',
        'Do not use elevators.',
        'Stay low to the ground if there is smoke.'
      ],
      safetyTips: [
        'Close doors behind you to slow down the fire.',
        'Check if everyone is safe at the meeting point.'
      ],
      contacts: [
        { name: 'Fire Department', phone: '193', description: 'Emergency fire services' },
        { name: 'Emergency 112', phone: '112', description: 'Universal emergency number' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    },
    bura_wind: {
      alertType: 'bura_wind',
      title: 'Strong Bura - Warning',
      instructions: [
        'Stay indoors.',
        'Secure loose objects on balconies and terraces.',
        'Avoid coastal areas and bridges.'
      ],
      safetyTips: [
        'Beware of falling branches and roof tiles.',
        'Check road closure updates.'
      ],
      contacts: [
        { name: 'Road Assistance', phone: '1987', description: 'HAK road help' },
        { name: 'Emergency 112', phone: '112', description: 'General emergency' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    },
    flood: {
      alertType: 'flood',
      title: 'Flood Instructions',
      instructions: [
        'Move to higher ground/floors.',
        'Turn off electricity and gas.',
        'Do not cross flooded areas.'
      ],
      safetyTips: [
        'Drink only bottled water.',
        'Listen to local radio for updates.'
      ],
      contacts: [
        { name: 'Rescue Service', phone: '112', description: 'HGSS Mountain Rescue' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    },
    earthquake: {
      alertType: 'earthquake',
      title: 'Earthquake Protocol',
      instructions: [
        'Drop, Cover, and Hold on.',
        'Stay away from windows and shelves.',
        'Move to an open area after the shaking stops.'
      ],
      safetyTips: [
        'Do not use elevators.',
        'Expect aftershocks.'
      ],
      contacts: [
        { name: 'Ambulance', phone: '194', description: 'Medical emergency' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    },
    air_quality: {
      alertType: 'air_quality',
      title: 'Air Quality Alert',
      instructions: [
        'Stay indoors.',
        'Close all windows and doors.',
        'Avoid outdoor physical activities.'
      ],
      safetyTips: [
        'Use air purifiers if available.',
        'Vulnerable groups should take extra care.'
      ],
      contacts: [
        { name: 'Public Health', phone: '021 401 111', description: 'Split Health Institute' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    },
    general: {
      alertType: 'general',
      title: 'General Alert',
      instructions: [
        'Follow instructions from local authorities.',
        'Stay calm and do not panic.',
        'Call 112 for any emergency.'
      ],
      safetyTips: [
        'Help elderly people and children.',
        'Conserve phone battery.'
      ],
      contacts: [
        { name: 'Emergency 112', phone: '112', description: 'Main emergency line' }
      ],
      language: 'en',
      lastUpdated: new Date().toISOString()
    }
  },
  de: {
    fire: {
      alertType: 'fire',
      title: 'Brandschutzanweisungen',
      instructions: [
        'Rufen Sie sofort 193 oder 112 an.',
        'Evakuieren Sie über den nächsten sicheren Ausgang.',
        'Benutzen Sie keine Aufzüge.',
        'Bleiben Sie bei Rauch in Bodennähe.'
      ],
      safetyTips: [
        'Schließen Sie Türen hinter sich, um das Feuer zu verlangsamen.',
        'Überprüfen Sie, ob alle am Sammelpunkt sicher sind.'
      ],
      contacts: [
        { name: 'Feuerwehr', phone: '193', description: 'Notfeuerwehr' },
        { name: 'Notruf 112', phone: '112', description: 'Allgemeiner Notruf' }
      ],
      language: 'de',
      lastUpdated: new Date().toISOString()
    },
    bura_wind: {
      alertType: 'bura_wind',
      title: 'Starker Bura - Warnung',
      instructions: [
        'Bleiben Sie in geschlossenen Räumen.',
        'Sichern Sie lose Gegenstände na Balkonen und Terrassen.',
        'Vermeiden Sie Küstengebiete und Brücken.'
      ],
      safetyTips: [
        'Achten Sie auf herabfallende Äste und Dachziegel.',
        'Informieren Sie sich über Straßensperrungen.'
      ],
      contacts: [
        { name: 'Pannenhilfe', phone: '1987', description: 'HAK Pannenhilfe' },
        { name: 'Notruf 112', phone: '112', description: 'Allgemeiner Notruf' }
      ],
      language: 'de',
      lastUpdated: new Date().toISOString()
    },
    flood: {
      alertType: 'flood',
      title: 'Anweisungen bei Hochwasser',
      instructions: [
        'Begeben Sie sich in höhere Stockwerke.',
        'Schalten Sie Strom und Gas ab.',
        'Überqueren Sie keine überfluteten Gebiete.'
      ],
      safetyTips: [
        'Trinken Sie nur Wasser iz Flaschen.',
        'Hören Sie Radio für Updates.'
      ],
      contacts: [
        { name: 'Rettungsdienst', phone: '112', description: 'Bergrettung HGSS' }
      ],
      language: 'de',
      lastUpdated: new Date().toISOString()
    },
    earthquake: {
      alertType: 'earthquake',
      title: 'Verhalten bei Erdbeben',
      instructions: [
        'Ducken, Schutz suchen, Festhalten.',
        'Halten Sie sich von Fenstern und Regalen fern.',
        'Gehen Sie nach dem Beben ins Freie.'
      ],
      safetyTips: [
        'Benutzen Sie keine Aufzüge.',
        'Rechnen Sie mit Nachbeben.'
      ],
      contacts: [
        { name: 'Krankenwagen', phone: '194', description: 'Medizinischer Notfall' }
      ],
      language: 'de',
      lastUpdated: new Date().toISOString()
    },
    air_quality: {
      alertType: 'air_quality',
      title: 'Luftqualitätswarnung',
      instructions: [
        'Bleiben Sie im Haus.',
        'Schließen Sie alle Fenster und Türen.',
        'Vermeiden Sie körperliche Aktivitäten im Freien.'
      ],
      safetyTips: [
        'Luftreiniger verwenden falls vorhanden.',
        'Risikogruppen sollten besonders vorsichtig sein.'
      ],
      contacts: [
        { name: 'Gesundheitsamt', phone: '021 401 111', description: 'Split Gesundheitsinstitut' }
      ],
      language: 'de',
      lastUpdated: new Date().toISOString()
    },
    general: {
      alertType: 'general',
      title: 'Allgemeiner Alarm',
      instructions: [
        'Folgen Sie den Anweisungen der örtlichen Behörden.',
        'Bleiben Sie ruhig.',
        'Rufen Sie 112 für jeden Notfall an.'
      ],
      safetyTips: [
        'Helfen Sie älteren Menschen und Kindern.',
        'Handyakku sparen.'
      ],
      contacts: [
        { name: 'Notruf 112', phone: '112', description: 'Hauptnotrufnummer' }
      ],
      language: 'de',
      lastUpdated: new Date().toISOString()
    }
  },
  it: {
    fire: {
      alertType: 'fire',
      title: 'Istruzioni Sicurezza Incendi',
      instructions: ['Chiamare 193 o 112.', 'Evacuare.', 'No ascensori.', 'Stare bassi.'],
      safetyTips: ['Chiudere porte.', 'Check punto raccolta.'],
      contacts: [{ name: 'Vigili del Fuoco', phone: '193', description: 'Emergenza incendi' }],
      language: 'it',
      lastUpdated: new Date().toISOString()
    },
    bura_wind: {
      alertType: 'bura_wind',
      title: 'Vento Bura - Allerta',
      instructions: ['Stare al chiuso.', 'Assicurare oggetti.', 'Evitare costa.'],
      safetyTips: ['Attenzione oggetti cadenti.'],
      contacts: [{ name: 'Emergenza 112', phone: '112', description: 'Generale' }],
      language: 'it',
      lastUpdated: new Date().toISOString()
    },
    flood: { alertType: 'flood', title: 'Alluvione', instructions: [], safetyTips: [], contacts: [], language: 'it', lastUpdated: '' },
    earthquake: { alertType: 'earthquake', title: 'Terremoto', instructions: [], safetyTips: [], contacts: [], language: 'it', lastUpdated: '' },
    air_quality: { alertType: 'air_quality', title: 'Qualità Aria', instructions: [], safetyTips: [], contacts: [], language: 'it', lastUpdated: '' },
    general: { alertType: 'general', title: 'Allerta Generale', instructions: [], safetyTips: [], contacts: [], language: 'it', lastUpdated: '' }
  },
  fr: {
    fire: {
      alertType: 'fire',
      title: 'Sécurité Incendie',
      instructions: ['Appelez le 193.', 'Évacuez.', 'Pas d\'ascenseur.'],
      safetyTips: ['Fermez les portes.'],
      contacts: [{ name: 'Pompiers', phone: '193', description: 'Urgences' }],
      language: 'fr',
      lastUpdated: new Date().toISOString()
    },
    bura_wind: { alertType: 'bura_wind', title: 'Vent Bura', instructions: [], safetyTips: [], contacts: [], language: 'fr', lastUpdated: '' },
    flood: { alertType: 'flood', title: 'Inondation', instructions: [], safetyTips: [], contacts: [], language: 'fr', lastUpdated: '' },
    earthquake: { alertType: 'earthquake', title: 'Séisme', instructions: [], safetyTips: [], contacts: [], language: 'fr', lastUpdated: '' },
    air_quality: { alertType: 'air_quality', title: 'Qualité Air', instructions: [], safetyTips: [], contacts: [], language: 'fr', lastUpdated: '' },
    general: { alertType: 'general', title: 'Alerte Générale', instructions: [], safetyTips: [], contacts: [], language: 'fr', lastUpdated: '' }
  }
};

const EmergencyPage: React.FC = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('hr');
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);

  const handleSelectType = (type: EmergencyType) => {
    setSelectedType(type);
  };

  const currentInfo = selectedType ? mockEmergencyData[language][selectedType] : null;

  return (
    <div className="emergency-page-root">
      <div className="emergency-hero-bg">
        <div className="emergency-hero-overlay"></div>
        <div className="emergency-hero-content">
          <div className="header-text">
            <span className="material-symbols-rounded emergency-hero-icon">notifications_active</span>
            <h1 className="page-title">Siren Translator</h1>
            <p className="page-subtitle">Instant safety instructions</p>
          </div>
          <div className="language-switcher-glass">
            {(['hr', 'en', 'de', 'it', 'fr'] as SupportedLanguage[]).map((lang) => (
              <button
                key={lang}
                className={`lang-pill ${language === lang ? 'active' : ''}`}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <PageContainer>
        <div className="emergency-content">
          {!selectedType ? (
            <QRScanner onSelectType={handleSelectType} selectedType={selectedType} />
          ) : (
            <div className="info-view">
              <button className="back-btn" onClick={() => setSelectedType(null)}>
                <span className="material-symbols-rounded">arrow_back</span>
                Back to Scanner
              </button>
              {currentInfo && <EmergencyCard info={currentInfo} />}
            </div>
          )}
        </div>

        <div className="emergency-footer">
          <div className="safety-badge">
            <span className="material-symbols-rounded">verified_user</span>
            <span>Official Civil Protection Protocol — City of Split</span>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default EmergencyPage;
