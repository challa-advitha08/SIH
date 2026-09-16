// SkillMesh Client-Side Application JavaScript

// Audio guide speech synthesis for low literacy
function speakText() {
  if (!('speechSynthesis' in window)) {
    alert('Text-to-Speech is not supported in this browser.');
    return;
  }

  const langSelect = document.getElementById('langSelect');
  const lang = langSelect ? langSelect.value : 'en';
  
  let msgText = "Welcome to SkillMesh. This platform compares vocational training courses with real-time industry demands across Maharashtra. High skill gaps are highlighted in red.";
  let voiceLang = 'en-IN';

  if (lang === 'mr') {
    msgText = "स्किलमेश मध्ये आपले स्वागत आहे. हे व्यासपीठ महाराष्ट्रातील व्यवसायिक अभ्यासक्रमांची तुलना थेट उद्योगांमधील नोकऱ्यांच्या मागणीशी करते. मोठा कौशल्याचा फरक लाल रंगात दर्शविला आहे.";
    voiceLang = 'mr-IN';
  } else if (lang === 'hi') {
    msgText = "स्किलमेश में आपका स्वागत है। यह प्लेटफॉर्म व्यावसायिक प्रशिक्षण पाठ्यक्रमों की तुलना सीधे उद्योगों की मांग से करता है। कौशल में बड़ा अंतर लाल रंग में दर्शाया गया है।";
    voiceLang = 'hi-IN';
  } else if (lang === 'gu') {
    msgText = "સ્કિલમેશમાં આપનું સ્વાગત છે. આ પ્લેટફોર્મ વ્યવસાયિક તાલીમ અભ્યાસક્રમોની તુલના ઉદ્યોગની વાસ્તવિક માંગ સાથે કરે છે.";
    voiceLang = 'gu-IN';
  } else if (lang === 'kn') {
    msgText = "ಸ್ಕಿಲ್‌ಮೆಶ್‌ಗೆ ಸುಸ್ವಾಗತ. ಈ ವೇದಿಕೆಯು ವೃತ್ತಿಪರ ತರಬೇತಿ ಕೋರ್ಸ್‌ಗಳನ್ನು ನೈಜ ಕೈಗಾರಿಕಾ ಬೇಡಿಕೆಯೊಂದಿಗೆ ಹೋಲಿಸುತ್ತದೆ.";
    voiceLang = 'kn-IN';
  } else if (lang === 'ta') {
    msgText = "ஸ்கில்மெஷிற்கு வருக. இந்த தளம் தொழிற்கல்வி படிப்புகளை தொழில்துறை தேவைகளுடன் ஒப்பிடுகிறது.";
    voiceLang = 'ta-IN';
  } else if (lang === 'te') {
    msgText = "స్కిల్‌మెష్‌కి స్వాగతం. ఈ ప్లాట్‌ఫారమ్ ఒకేషనల్ కోర్సులను రియల్ టైమ్ పరిశ్రమ డిమాండ్‌తో పోలుస్తుంది.";
    voiceLang = 'te-IN';
  } else if (lang === 'bn') {
    msgText = "স্কিলমেশ-এ স্বাগতম। এই প্ল্যাটফর্মটি বৃত্তিমূলক প্রশিক্ষণ কোর্সের সাথে শিল্পের বাস্তব চাহিদার তুলনা করে।";
    voiceLang = 'bn-IN';
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(msgText);
  utterance.lang = voiceLang;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

// Global language switcher change listener
document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      const helpText = document.getElementById('helpText');
      if (helpText) {
        if (selected === 'mr') {
          helpText.textContent = "स्किलमेश मध्ये आपले स्वागत आहे. हे व्यासपीठ महाराष्ट्रातील व्यवसायिक अभ्यासक्रमांची तुलना थेट उद्योगांमधील नोकऱ्यांच्या मागणीशी करते. अभ्यासक्रमातील बदल पाहण्यासाठी कोर्सवर क्लिक करा.";
        } else if (selected === 'hi') {
          helpText.textContent = "स्किलमेश में आपका स्वागत है। यह प्लेटफॉर्म व्यावसायिक पाठ्यक्रमों की तुलना उद्योग की वास्तविक मांग से करता है। लाल रंग बड़े कौशल अंतर को दर्शाता है।";
        } else {
          helpText.textContent = "Welcome to SkillMesh. This platform compares vocational courses with live industry jobs. Red highlights indicate high skill gaps requiring immediate curriculum upgrades.";
        }
      }
    });
  }
});
