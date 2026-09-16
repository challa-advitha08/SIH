import { Language } from '../types';

export const DISTRICT_NAMES_LOCALIZED: Record<string, Record<Language, string>> = {
  Pune: {
    en: 'Pune',
    mr: 'पुणे',
    hi: 'पुणे',
    gu: 'પુણે',
    kn: 'ಪುಣೆ',
    ta: 'புனே',
    te: 'పూణే',
    bn: 'পুনে',
  },
  Mumbai: {
    en: 'Mumbai',
    mr: 'मुंबई',
    hi: 'मुंबई',
    gu: 'મુંબઈ',
    kn: 'ಮುಂಬೈ',
    ta: 'மும்பை',
    te: 'ముంబై',
    bn: 'মুম্বই',
  },
  Nashik: {
    en: 'Nashik',
    mr: 'नाशिक',
    hi: 'नासिक',
    gu: 'નાશિક',
    kn: 'ನಾಸಿಕ್',
    ta: 'நாசிக்',
    te: 'నాసిక్',
    bn: 'নাসিক',
  },
  Nagpur: {
    en: 'Nagpur',
    mr: 'नागपूर',
    hi: 'नागपुर',
    gu: 'નાગપુર',
    kn: 'ನಾಗಪುರ',
    ta: 'நாக்பூர்',
    te: 'నాగ్‌పూర్',
    bn: 'নাগপুর',
  },
  Aurangabad: {
    en: 'Aurangabad (Chh. Sambhajinagar)',
    mr: 'छत्रपती संभाजीनगर (औरंगाबाद)',
    hi: 'औरंगाबाद (छत्रपति संभाजीनगर)',
    gu: 'ઔરંગાબાદ (છ. સંભાજીનગર)',
    kn: 'ಔರಂಗಾಬಾದ್ (ಛ. ಸಂಭಾಜಿನಗರ)',
    ta: 'அவுரங்காபாத் (சம்பாஜிநகர்)',
    te: 'ఔరంగాబాద్ (శంభాజీనగర్)',
    bn: 'ঔরঙ্গাবাদ (সম্ভাজিনগর)',
  },
  Thane: {
    en: 'Thane',
    mr: 'ठाणे',
    hi: 'ठाणे',
    gu: 'થાણે',
    kn: 'ಥಾಣೆ',
    ta: 'தானே',
    te: 'థానే',
    bn: 'থানে',
  },
  Kolhapur: {
    en: 'Kolhapur',
    mr: 'कोल्हापूर',
    hi: 'कोल्हापुर',
    gu: 'કોલ્હાપુર',
    kn: 'ಕೊಲ್ಲಾಪುರ',
    ta: 'கோலாப்பூர்',
    te: 'కొల్హాపూర్',
    bn: 'কোলহাপুর',
  },
  Nanded: {
    en: 'Nanded',
    mr: 'नांदेड',
    hi: 'नांदेड़',
    gu: 'નાંદેડ',
    kn: 'ನಾಂದೇಡ್',
    ta: 'நாந்தேட்',
    te: 'నాందేడ్',
    bn: 'নান্দেদ',
  },
};

export function getLocalizedDistrictName(district: string, lang: Language): string {
  if (DISTRICT_NAMES_LOCALIZED[district] && DISTRICT_NAMES_LOCALIZED[district][lang]) {
    return DISTRICT_NAMES_LOCALIZED[district][lang];
  }
  return district;
}
