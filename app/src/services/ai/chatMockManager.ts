import { ChatResponse, SupportedLanguage } from '@/types';

/**
 * Enhanced Mock Chat Response Generator
 * Provides context-aware responses for the SplitAI demo mode.
 */

interface MockResponseTemplate {
  keywords: string[];
  responses: Record<SupportedLanguage, string>;
}

const MOCK_TEMPLATES: MockResponseTemplate[] = [
  {
    keywords: ['parkiranje', 'parking', 'garaža', 'parkirati', 'park'],
    responses: {
      hr: 'U Splitu možete parkirati u uličnim zonama (A, B, C) ili u garažama poput Garaže Sukoišan ili Garaže Ruđera Boškovića. Cijena u zoni A je 1.50 €/h.',
      en: 'In Split, you can park in street zones (A, B, C) or in garages like Sukoišan Garage or Ruđer Bošković Garage. Zone A price is €1.50/h.',
      de: 'In Split können Sie in Straßenzonen (A, B, C) oder in Garagen wie der Sukoišan-Garage parken. Der Preis für Zone A beträgt 1,50 €/Std.',
      it: 'A Spalato è possibile parcheggiare nelle zone stradali (A, B, C) o in garage come Sukoišan o Ruđer Bošković. Il prezzo della zona A è di 1,50 €/ora.',
      fr: 'À Split, vous pouvez vous garer dans les zones de rue (A, B, C) ou dans des garages comme le garage Sukoišan. Le prix de la zone A est de 1,50 €/h.'
    }
  },
  {
    keywords: ['autobus', 'promet', 'linija', 'bus', 'station', 'stanica'],
    responses: {
      hr: 'Promet Split upravlja gradskim autobusima. Najčešće linije su 18, 17 i 37. Možete kupiti kartu putem mobilne aplikacije ili kod vozača.',
      en: 'Promet Split operates city buses. Most frequent lines are 18, 17, and 37. You can buy tickets via mobile app or from the driver.',
      de: 'Promet Split betreibt Stadtbusse. Die häufigsten Linien sind 18, 17 und 37. Tickets können Sie per App oder beim Fahrer kaufen.',
      it: 'Promet Split gestisce gli autobus urbani. Le linee più frequenti sono la 18, la 17 e la 37. È possibile acquistare i biglietti tramite app o dall\'autista.',
      fr: 'Promet Split exploite des bus urbains. Les lignes les plus fréquentes sont les 18, 17 et 37. Vous pouvez acheter des billets via l\'application ou auprès du chauffeur.'
    }
  },
  {
    keywords: ['prijav', 'problem', 'kvar', 'smeće', 'rupa', 'grafit', 'report', 'issue', 'broken'],
    responses: {
      hr: 'Problem možete prijaviti putem opcije "Prijavi" u donjem izborniku. Samo uslikajte problem, a moj Vision AI će ga automatski kategorizirati.',
      en: 'You can report an issue using the "Report" option in the bottom menu. Just take a photo, and my Vision AI will categorize it automatically.',
      de: 'Sie können ein Problem über die Option „Melden“ im unteren Menü melden. Machen Sie einfach ein Foto, und meine Vision AI wird es automatisch kategorisieren.',
      it: 'È possibile segnalare un problema utilizzando l\'opzione "Segnala" nel menu in basso. Basta scattare una foto e la mia Vision AI lo categorizzerà automaticamente.',
      fr: 'Vous pouvez signaler un problème via l\'option « Signaler » du menu inférieur. Prenez simplement une photo, et mon IA Vision le classera automatiquement.'
    }
  },
  {
    keywords: ['pazar', 'tržnica', 'voće', 'povrće', 'riba', 'market', 'fish', 'fruit'],
    responses: {
      hr: 'Glavni splitski Pazar radi svakodnevno od ranog jutra. Danas su hit svježe srdele na peškariji i domaće jagode iz Kaštela.',
      en: 'Split\'s main Pazar (market) is open daily from early morning. Today\'s hits are fresh sardines at the fish market and local strawberries.',
      de: 'Der Hauptmarkt von Split (Pazar) ist täglich ab dem frühen Morgen geöffnet. Die heutige Auswahl umfasst frische Sardinen und lokale Erdbeeren.',
      it: 'Il mercato principale di Spalato (Pazar) è aperto tutti i giorni dalla mattina presto. Le specialità di oggi sono sardine fresche e fragole locali.',
      fr: 'Le marché principal de Split (Pazar) est ouvert tous les jours dès le matin. Les produits phares d\'aujourd\'hui sont les sardines fraîches et les fraises locales.'
    }
  },
  {
    keywords: ['gup', 'plan', 'gradnja', 'dozvola', 'zoning', 'permit', 'building'],
    responses: {
      hr: 'GUP (Generalni urbanistički plan) grada Splita definira pravila gradnje. Za vašu zonu vrijede posebna pravila o visini objekta i zelenim površinama.',
      en: 'Split\'s GUP (General Urban Plan) defines building regulations. Specific rules for building height and green areas apply to your zone.',
      de: 'Der GUP (Generalbebauungsplan) von Split definiert die Bauvorschriften. Für Ihre Zone gelten spezifische Regeln für Gebäudehöhe und Grünflächen.',
      it: 'Il GUP (Piano Urbanistico Generale) di Spalato definisce i regolamenti edilizi. Per la vostra zona valgono regole specifiche sull\'altezza degli edifici.',
      fr: 'Le GUP (Plan d\'urbanisme général) de Split définit les règles de construction. Des règles spécifiques s\'appliquent à votre zone.'
    }
  },
  {
    keywords: ['dioklecijan', 'palača', 'palace', 'peristil', 'split', 'povijest', 'history'],
    responses: {
      hr: 'Dioklecijanova palača je srce Splita, izgrađena oko 300. godine. Danas je pod zaštitom UNESCO-a i dom je tisućama Splićana.',
      en: 'Diocletian\'s Palace is the heart of Split, built around 300 AD. Today it is a UNESCO World Heritage site and home to thousands of residents.',
      de: 'Der Diokletianpalast ist das Herz von Split, erbaut um 300 n. Chr. Heute gehört er zum UNESCO-Weltkulturerbe und ist das Zuhause von Tausenden.',
      it: 'Il Palazzo di Diocleziano è il cuore di Spalato, costruito intorno al 300 d.C. Oggi è patrimonio dell\'umanità UNESCO e casa di migliaia di residenti.',
      fr: 'Le palais de Dioclétien est le cœur de Split, construit vers 300 après J.-C. Aujourd\'hui, il est classé au patrimoine mondial de l\'UNESCO.'
    }
  }
];

const DEFAULT_RESPONSES: Record<SupportedLanguage, string> = {
  hr: 'Ja sam vaš splitski AI asistent. Trenutno radim u demo načinu rada, ali vam mogu pomoći s informacijama o gradu, parkiranju, prijevozu i prijavama problema!',
  en: 'I am your Split AI assistant. I am currently running in demo mode, but I can help you with information about the city, parking, transit, and reporting issues!',
  de: 'Ich bin Ihr Split AI-Assistent. Ich laufe derzeit im Demo-Modus, kann Ihnen aber mit Informationen über die Stadt, Parken, Verkehr und das Melden von Problemen helfen!',
  it: 'Sono il tuo assistente AI di Spalato. Attualmente sono in modalità demo, ma posso aiutarti con informazioni sulla città, parcheggi, trasporti e segnalazioni!',
  fr: 'Je suis votre assistant IA de Split. Je suis actuellement en mode démo, mais je peux vous aider avec des informations sur la ville, le stationnement, les transports et le signalement de problèmes !'
};

/**
 * Generates a mock chat response based on user input and language.
 */
export function generateChatMockResponse(message: string, language: SupportedLanguage = 'hr'): ChatResponse {
  const normalizedMessage = message.toLowerCase();
  
  // Find matching template
  const template = MOCK_TEMPLATES.find(t => 
    t.keywords.some(keyword => normalizedMessage.includes(keyword))
  );

  const content = template ? template.responses[language] : DEFAULT_RESPONSES[language];

  return {
    message: {
      id: crypto.randomUUID(),
      role: 'assistant',
      content,
      timestamp: new Date().toISOString(),
      language
    },
    conversationId: 'demo-conversation-' + Math.floor(Math.random() * 1000)
  };
}
