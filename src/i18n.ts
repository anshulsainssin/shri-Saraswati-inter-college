export type Lang = 'hi' | 'en';

export type Dict = {
  dir: 'ltr';
  nav: {
    home: string;
    about: string;
    principal: string;
    academics: string;
    facilities: string;
    gallery: string;
    notices: string;
    events: string;
    achievements: string;
    admissions: string;
    contact: string;
    cta: string;
    menu: string;
    switchTo: string;
  };
  hero: {
    name: string;
    location: string;
    tagline: string;
    about: string;
    admission: string;
    scroll: string;
  };
  quick: {
    establishedLabel: string;
    established: string;
    classesLabel: string;
    classes: string;
    boardLabel: string;
    board: string;
    mediumLabel: string;
    medium: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    factsTitle: string;
    facts: { label: string; value: string }[];
    journeyTitle: string;
    journeySubtitle: string;
    journey: { year: string; text: string }[];
  };
  principal: {
    eyebrow: string;
    title: string;
    name: string;
    role: string;
    message: string;
    photoAlt: string;
  };
  academics: {
    eyebrow: string;
    title: string;
    subtitle: string;
    board: string;
    boardValue: string;
    medium: string;
    mediumValue: string;
    classes: string[];
    streamTitle: string;
    streamSubtitle: string;
    streams: { name: string; fullName: string; desc: string }[];
  };
  facilities: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { name: string; desc: string }[];
    photoAlt: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: string[];
    empty: string;
    close: string;
    prev: string;
    next: string;
  };
  video: {
    eyebrow: string;
    title: string;
    subtitle: string;
    comingSoon: string;
  };
  notices: {
    eyebrow: string;
    title: string;
    subtitle: string;
    currentLabel: string;
    currentTitle: string;
    currentDescription: string;
    currentNote: string;
    download: string;
  };
  events: {
    eyebrow: string;
    title: string;
    subtitle: string;
    empty: string;
  };
  timings: {
    eyebrow: string;
    title: string;
    subtitle: string;
    winter: string;
    winterMonths: string;
    winterTime: string;
    summer: string;
    summerMonths: string;
    summerTime: string;
  };
  admissions: {
    eyebrow: string;
    title: string;
    subtitle: string;
    comingSoon: string;
    process: string;
    processTitle: string;
    processSteps: string[];
    eligibility: string;
    documents: string;
    documentsNote: string;
    fees: string;
    feesNote: string;
    dates: string;
    confirmedDateLabel: string;
    confirmedDate: string;
    clerkTitle: string;
    clerkName: string;
    clerkRole: string;
    clerkDesc: string;
    enquiry: string;
    enquiryBtn: string;
    enquiryTitle: string;
    enquirySubtitle: string;
    nameField: string;
    phoneField: string;
    classField: string;
    messageField: string;
    submit: string;
    success: string;
    close: string;
    selectClass: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    address: string;
    emailLabel: string;
    email: string;
    principalLabel: string;
    principal: string;
    directions: string;
    emailUs: string;
    mapTitle: string;
  };
  social: {
    facebook: string;
    facebookLabel: string;
  };
  footer: {
    school: string;
    quickLinks: string;
    contact: string;
    hours: string;
    social: string;
    hoursWinter: string;
    hoursSummer: string;
    rights: string;
    builtWith: string;
  };
  achievements: {
    eyebrow: string;
    title: string;
    subtitle: string;
    codeyogiTitle: string;
    codeyogiSubtitle: string;
    codeyogiItems: { label: string; desc: string }[];
    photoSoon: string;
  };
  scrolltop: string;
};

export const translations: Record<Lang, Dict> = {
  hi: {
    dir: 'ltr',
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      principal: 'प्रधानाचार्य संदेश',
      academics: 'शैक्षणिक',
      facilities: 'सुविधाएँ',
      gallery: 'गैलरी',
      notices: 'नोटिस',
      events: 'कार्यक्रम',
      achievements: 'उपलब्धियाँ',
      admissions: 'प्रवेश',
      contact: 'संपर्क',
      cta: 'प्रवेश जानकारी',
      menu: 'मेन्यू',
      switchTo: 'English',
    },
    hero: {
      name: 'श्री सरस्वती इंटर कॉलेज',
      location: 'तीतरों, सहारनपुर',
      tagline: '“ज्ञान, संस्कार और उज्ज्वल भविष्य की ओर”',
      about: 'हमारे बारे में',
      admission: 'प्रवेश जानकारी',
      scroll: 'नीचे स्क्रॉल करें',
    },
    quick: {
      establishedLabel: 'स्थापना',
      established: 'लगभग 1954',
      classesLabel: 'कक्षाएँ',
      classes: 'कक्षा 6 – 12',
      boardLabel: 'बोर्ड',
      board: 'यूपी बोर्ड',
      mediumLabel: 'माध्यम',
      medium: 'हिंदी माध्यम',
    },
    about: {
      eyebrow: 'हमारे बारे में',
      title: 'एक शिक्षा की विरासत',
      p1: 'श्री सरस्वती इंटर कॉलेज, तीतरों, सहारनपुर, उत्तर प्रदेश, लगभग 1954 में स्थापित एक स्थापित शैक्षणिक संस्थान है। यह विद्यालय कक्षा 6 से 12 तक के विद्यार्थियों के लिए हिंदी माध्यम शिक्षा प्रदान करता है और आसपास के ग्रामीण एवं शहरी समुदाय की शैक्षणिक आवश्यकताओं को पूरा करता है।',
      p2: 'यह सह-शैक्षणिक संस्थान दशकों से अपने क्षेत्र के विद्यार्थियों को गुणवत्तापूर्ण शिक्षा, संस्कार और सम्मान प्रदान कर रहा है।',
      factsTitle: 'संस्थान की झलक',
      facts: [
        { label: 'स्थापना', value: 'लगभग 1954' },
        { label: 'स्थान', value: 'तीतरों देहात, गंगोह' },
        { label: 'जिला', value: 'सहारनपुर, उत्तर प्रदेश' },
        { label: 'बोर्ड', value: 'उत्तर प्रदेश माध्यमिक शिक्षा परिषद (यूपी बोर्ड)' },
        { label: 'कक्षाएँ', value: 'कक्षा 6 से 12' },
        { label: 'माध्यम', value: 'हिंदी माध्यम' },
        { label: 'प्रकार', value: 'सह-शैक्षणिक इंटर कॉलेज' },
        { label: 'प्रधानाचार्य', value: 'श्री प्रदीप चौहान' },
      ],
      journeyTitle: 'हमारी यात्रा',
      journeySubtitle: 'एक लंबी और सम्मानित शैक्षणिक विरासत।',
      journey: [
        { year: 'लगभग 1954', text: 'विद्यालय की स्थापना तीतरों में हुई, जिसका उद्देश्य स्थानीय समुदाय को शिक्षा प्रदान करना था।' },
        { year: 'दशकों की सेवा', text: 'विद्यालय ने लगातार ग्रामीण एवं शहरी क्षेत्र के विद्यार्थियों को शिक्षा दी।' },
        { year: 'आज', text: 'कक्षा 6 से 12 तक हिंदी माध्यम में शिक्षा प्रदान करते हुए समुदाय की सेवा जारी।' },
      ],
    },
    principal: {
      eyebrow: 'नेतृत्व',
      title: 'प्रधानाचार्य का संदेश',
      name: 'श्री प्रदीप चौहान',
      role: 'प्रधानाचार्य, श्री सरस्वती इंटर कॉलेज',
      message: 'हमारे विद्यालय का उद्देश्य विद्यार्थियों को गुणवत्तापूर्ण शिक्षा के साथ-साथ संस्कार, अनुशासन, नैतिक मूल्यों एवं जिम्मेदारी की भावना से परिपूर्ण करना है। हमारा विश्वास है कि प्रत्येक विद्यार्थी में असीम संभावनाएँ होती हैं। उचित मार्गदर्शन, निरंतर प्रयास और सकारात्मक सोच के माध्यम से वे अपने लक्ष्यों को प्राप्त कर सकते हैं।\n\nहम विद्यालय में ऐसा वातावरण प्रदान करने के लिए प्रतिबद्ध हैं, जहाँ विद्यार्थी ज्ञान के साथ-साथ रचनात्मकता, वैज्ञानिक दृष्टिकोण, तकनीकी दक्षता और सामाजिक जिम्मेदारी भी विकसित करें।\n\nआइए, हम सब मिलकर विद्यार्थियों के उज्ज्वल भविष्य और राष्ट्र के निर्माण में अपना योगदान दें।',
      photoAlt: 'श्री प्रदीप चौहान का छायाचित्र',
    },
    academics: {
      eyebrow: 'शैक्षणिक',
      title: 'कक्षाएँ और पाठ्यक्रम',
      subtitle: 'यूपी बोर्ड के अनुसार हिंदी माध्यम में शिक्षा।',
      board: 'बोर्ड',
      boardValue: 'उत्तर प्रदेश माध्यमिक शिक्षा परिषद (यूपी बोर्ड)',
      medium: 'माध्यम',
      mediumValue: 'हिंदी',
      classes: ['कक्षा 6', 'कक्षा 7', 'कक्षा 8', 'कक्षा 9', 'कक्षा 10', 'कक्षा 11', 'कक्षा 12'],
      streamTitle: 'कक्षा 11–12 विषय क्षेत्र (स्ट्रीम)',
      streamSubtitle: 'कक्षा 11वीं एवं 12वीं में निम्नलिखित विषय क्षेत्र उपलब्ध हैं:',
      streams: [
        { name: 'PCM', fullName: 'भौतिकी, रसायन विज्ञान, गणित', desc: 'विज्ञान एवं गणित पर केंद्रित — इंजीनियरिंग एवं तकनीकी क्षेत्र के लिए आधार।' },
        { name: 'BCB', fullName: 'जीव विज्ञान, रसायन विज्ञान, वनस्पति विज्ञान', desc: 'जीव विज्ञान पर केंद्रित — चिकित्सा, फार्मेसी एवं जीव विज्ञान क्षेत्र के लिए आधार।' },
        { name: 'ART', fullName: 'कला / मानविकी', desc: 'साहित्य, समाज विज्ञान एवं भाषा पर केंद्रित — सिविल सेवा एवं सामाजिक क्षेत्र के लिए आधार।' },
        { name: 'कृषि विज्ञान / Agriculture', fullName: 'कृषि विज्ञान', desc: 'कृषि एवं प्राकृतिक संसाधनों पर केंद्रित — कृषि विज्ञान एवं संबंधित क्षेत्र के लिए आधार।' },
      ],
    },
    facilities: {
      eyebrow: 'सुविधाएँ',
      title: 'हमारी सुविधाएँ',
      subtitle: 'विद्यार्थियों के सर्वांगीण विकास के लिए आधारभूत संरचना।',
      items: [
        { name: 'पुस्तकालय', desc: 'विद्यार्थियों की शैक्षणिक शिक्षा और पठन का समर्थन करने वाले पुस्तकालय संसाधन।' },
        { name: 'विज्ञान प्रयोगशाला', desc: 'विज्ञान के व्यावहारिक ज्ञान के लिए सुसज्जित प्रयोगशाला।' },
        { name: 'कंप्यूटर लैब', desc: 'कंप्यूटर-सहायित शिक्षण का समर्थन करने वाला एक समर्पित स्थान।' },
        { name: 'कक्षाएँ', desc: 'विद्यार्थियों के लिए उपयुक्त एवं आरामदायक कक्षा-कक्ष।' },
        { name: 'खेलकूद', desc: 'विद्यार्थियों की शारीरिक गतिविधियों और खेल के लिए एक मैदान।' },
        { name: 'विद्यालय परिसर', desc: 'विद्यार्थियों के सर्वांगीण विकास के लिए एक सुरक्षित एवं शांत परिसर।' },
      ],
      photoAlt: 'सुविधा फोटो',
    },
    gallery: {
      eyebrow: 'गैलरी',
      title: 'विद्यालय गैलरी',
      subtitle: 'विद्यालय के क्षणों की झलकियाँ।',
      categories: ['विद्यालय परिसर', 'प्रधानाचार्य एवं शिक्षक', 'विद्यार्थी गतिविधियाँ', 'विद्यालय कार्यक्रम', 'स्वतंत्रता दिवस', 'सांस्कृतिक गतिविधियाँ', 'रचनात्मक गतिविधियाँ', 'विद्यार्थी उपलब्धियाँ', 'समूह चित्र', 'कंप्यूटर लैब', 'पुस्तकालय', 'कक्षाएँ', 'खेलकूद'],
      empty: 'इस श्रेणी में अभी कोई फोटो उपलब्ध नहीं है।',
      close: 'बंद करें',
      prev: 'पिछली',
      next: 'अगली',
    },
    video: {
      eyebrow: 'वीडियो',
      title: 'विद्यालय वीडियो',
      subtitle: 'हमारे विद्यालय के कार्यक्रमों के वीडियो यहाँ देखें।',
      comingSoon: 'विद्यालय वीडियो जल्द आ रहा है',
    },
    notices: {
      eyebrow: 'नोटिस',
      title: 'नोटिस बोर्ड',
      subtitle: 'महत्वपूर्ण सूचनाएँ एवं घोषणाएँ।',
      currentLabel: 'नवीनतम सूचना',
      currentTitle: 'आगामी कार्यक्रम एवं सूचनाएँ',
      currentDescription: 'विद्यालय में होने वाले आगामी कार्यक्रमों एवं महत्वपूर्ण सूचनाओं की जानकारी समय-समय पर विद्यालय द्वारा दी जाएगी।',
      currentNote: '',
      download: 'डाउनलोड',
    },
    events: {
      eyebrow: 'कार्यक्रम',
      title: 'विद्यालय कार्यक्रम',
      subtitle: 'हाल में आयोजित कार्यक्रम।',
      empty: 'विद्यालय के कार्यक्रम यहाँ अपडेट किए जाएँगे।',
    },
    timings: {
      eyebrow: 'समय',
      title: 'विद्यालय समय',
      subtitle: 'शीत एवं ग्रीष्म ऋतु के अनुसार विद्यालय समय।',
      winter: 'शीतकालीन समय',
      winterMonths: 'अक्टूबर से मार्च',
      winterTime: 'सुबह 9:30 – दोपहर 3:00',
      summer: 'ग्रीष्मकालीन समय',
      summerMonths: 'अप्रैल से सितंबर',
      summerTime: 'सुबह 7:30 – दोपहर 1:30',
    },
    admissions: {
      eyebrow: 'प्रवेश',
      title: 'प्रवेश जानकारी',
      subtitle: 'नए सत्र के लिए प्रवेश संबंधी जानकारी।',
      comingSoon: 'प्रवेश की अंतिम तिथि के अतिरिक्त अन्य जानकारी उपलब्ध होने पर अपडेट की जाएगी।',
      process: 'प्रवेश प्रक्रिया',
      processTitle: 'प्रवेश कैसे प्राप्त करें',
      processSteps: [
        'विद्यार्थी admission के लिए विद्यालय में श्री राजकुमार जी (Clerk) से संपर्क कर सकते हैं।',
        'वहीं से admission के लिए आवश्यक forms और संबंधित जानकारी प्राप्त की जाती है।',
        'Admission के समय आवश्यक documents/forms की final list विद्यालय द्वारा बताई जाएगी।',
      ],
      eligibility: 'पात्रता',
      documents: 'आवश्यक दस्तावेज़',
      documentsNote: 'आवश्यक दस्तावेज़ों की अंतिम सूची admission के समय विद्यालय द्वारा बताई जाएगी।',
      fees: 'शुल्क संरचना',
      feesNote: 'शुल्क कक्षा एवं विषय/स्ट्रीम के अनुसार अलग-अलग है। वर्तमान शुल्क की जानकारी विद्यालय कार्यालय से प्राप्त करें।',
      dates: 'महत्वपूर्ण तिथियाँ',
      confirmedDateLabel: 'प्रवेश की अंतिम तिथि',
      confirmedDate: '25 अगस्त 2026',
      clerkTitle: 'प्रवेश संपर्क',
      clerkName: 'श्री राजकुमार जी',
      clerkRole: 'Clerk / लिपिक',
      clerkDesc: 'प्रवेश संबंधी forms एवं जानकारी के लिए विद्यालय कार्यालय में सहायता एवं मार्गदर्शन प्रदान करना।',
      enquiry: 'प्रवेश पूछताछ',
      enquiryBtn: 'प्रवेश पूछताछ',
      enquiryTitle: 'प्रवेश पूछताछ फ़ॉर्म',
      enquirySubtitle: 'अपनी जानकारी भरें और हम आपसे संपर्क करेंगे।',
      nameField: 'विद्यार्थी / अभिभावक का नाम',
      phoneField: 'फ़ोन नंबर',
      classField: 'अभीष्ट कक्षा',
      messageField: 'संदेश (वैकल्पिक)',
      submit: 'जमा करें',
      success: 'धन्यवाद! आपकी पूछताछ प्राप्त हुई। हम जल्द आपसे संपर्क करेंगे।',
      close: 'बंद करें',
      selectClass: 'कक्षा चुनें',
    },
    contact: {
      eyebrow: 'संपर्क',
      title: 'संपर्क करें',
      subtitle: 'हमसे संपर्क करें — हम आपकी सहायता के लिए यहाँ हैं।',
      addressLabel: 'पता',
      address: 'तीतरों देहात, गंगोह, सहारनपुर, उत्तर प्रदेश, भारत — 247343',
      emailLabel: 'ईमेल',
      email: '1060.sre@gmail.com',
      principalLabel: 'प्रधानाचार्य',
      principal: 'श्री प्रदीप चौहान',
      directions: 'रास्ता प्राप्त करें',
      emailUs: 'ईमेल करें',
      mapTitle: 'मानचित्र पर हमारा स्थान',
    },
    social: {
      facebook: 'फेसबुक पर फ़ॉलो करें',
      facebookLabel: 'Facebook',
    },
    footer: {
      school: 'विद्यालय',
      quickLinks: 'त्वरित लिंक',
      contact: 'संपर्क',
      hours: 'विद्यालय समय',
      social: 'सोशल',
      hoursWinter: 'अक्टूबर–मार्च: सुबह 9:30 – दोपहर 3:00',
      hoursSummer: 'अप्रैल–सितंबर: सुबह 7:30 – दोपहर 1:30',
      rights: 'श्री सरस्वती इंटर कॉलेज। सर्वाधिकार सुरक्षित।',
      builtWith: 'ज्ञान, संस्कार और उज्ज्वल भविष्य की ओर',
    },
    achievements: {
      eyebrow: 'उपलब्धियाँ',
      title: 'विशेष उपलब्धियाँ एवं विद्यार्थी गतिविधियाँ',
      subtitle: 'विद्यालय से संबंधित विशेष गतिविधियों एवं उपलब्धियों की झलकियाँ।',
      codeyogiTitle: 'CodeYogi से विशेष अवसर',
      codeyogiSubtitle: 'CodeYogi की ओर से विद्यालय में एक विशेष कार्यक्रम — तकनीकी अनुभव एवं छात्र उपलब्धि।',
      codeyogiItems: [
        { label: 'CodeYogi विद्यालय भ्रमण', desc: 'CodeYogi की ओर से विद्यालय में आगमन।' },
        { label: 'DM से मुलाकात', desc: 'ज़िलाधिकारी से मुलाकात का विशेष अवसर।' },
        { label: 'Laptop प्राप्ति', desc: 'उपलब्धि के रूप में Laptop प्राप्त करना।' },
        { label: 'समाचार में प्रकाशन', desc: 'Newspaper में प्रकाशित समाचार/फोटो।' },
      ],
      photoSoon: 'फोटो जल्द अपलोड किया जाएगा',
    },
    scrolltop: 'ऊपर जाएँ',
  },
  en: {
    dir: 'ltr',
    nav: {
      home: 'Home',
      about: 'About Us',
      principal: "Principal's Message",
      academics: 'Academics',
      facilities: 'Facilities',
      gallery: 'Gallery',
      notices: 'Notices',
      events: 'Events',
      achievements: 'Achievements',
      admissions: 'Admissions',
      contact: 'Contact Us',
      cta: 'Admission Info',
      menu: 'Menu',
      switchTo: 'हिंदी',
    },
    hero: {
      name: 'Shri Saraswati Inter College',
      location: 'Titron, Saharanpur',
      tagline: '“Education, Values and a Brighter Future”',
      about: 'About Us',
      admission: 'Admission Information',
      scroll: 'Scroll down',
    },
    quick: {
      establishedLabel: 'Established',
      established: 'Around 1954',
      classesLabel: 'Classes',
      classes: 'Class 6 – 12',
      boardLabel: 'Board',
      board: 'UP Board',
      mediumLabel: 'Medium',
      medium: 'Hindi Medium',
    },
    about: {
      eyebrow: 'About Us',
      title: 'A Legacy of Learning',
      p1: 'Shri Saraswati Inter College in Titron, Saharanpur, Uttar Pradesh, is a long-standing educational institution established around 1954. The school provides Hindi-medium education for students from Classes 6 to 12 and serves the educational needs of the surrounding rural and urban community.',
      p2: 'This co-educational institution has, for decades, provided its students with quality education, strong values, and a respectful learning environment.',
      factsTitle: 'At a Glance',
      facts: [
        { label: 'Established', value: 'Around 1954' },
        { label: 'Location', value: 'Titron Dehat, Gangoh' },
        { label: 'District', value: 'Saharanpur, Uttar Pradesh' },
        { label: 'Board', value: 'Uttar Pradesh Madhyamik Shiksha Parishad (UP Board)' },
        { label: 'Classes', value: 'Class 6 to 12' },
        { label: 'Medium', value: 'Hindi Medium' },
        { label: 'Type', value: 'Co-educational Intermediate School' },
        { label: 'Principal', value: 'Pradeep Chauhan' },
      ],
      journeyTitle: 'Our Journey',
      journeySubtitle: 'A long and respected educational legacy.',
      journey: [
        { year: 'Around 1954', text: 'The school was founded in Titron with the aim of providing education to the local community.' },
        { year: 'Decades of Service', text: 'The school has continually educated students from the surrounding rural and urban areas.' },
        { year: 'Today', text: 'Continuing to serve the community by providing education from Class 6 to 12 in Hindi medium.' },
      ],
    },
    principal: {
      eyebrow: 'Leadership',
      title: "Principal's Message",
      name: 'Pradeep Chauhan',
      role: 'Principal, Shri Saraswati Inter College',
      message: 'The purpose of our school is to provide students with quality education along with संस्कार, discipline, moral values, and a sense of responsibility. We believe that every student has limitless potential. With proper guidance, consistent effort, and positive thinking, they can achieve their goals.\n\nWe are committed to creating an environment where students develop creativity, a scientific outlook, technical skills, and social responsibility along with knowledge.\n\nLet us work together for the bright future of our students and contribute to the building of our nation.',
      photoAlt: 'Photograph of Pradeep Chauhan',
    },
    academics: {
      eyebrow: 'Academics',
      title: 'Classes & Curriculum',
      subtitle: 'Education in Hindi medium as per the UP Board.',
      board: 'Board',
      boardValue: 'Uttar Pradesh Madhyamik Shiksha Parishad (UP Board)',
      medium: 'Medium',
      mediumValue: 'Hindi',
      classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
      streamTitle: 'Class 11–12 Streams',
      streamSubtitle: 'The following streams are available for Class 11 and 12:',
      streams: [
        { name: 'PCM', fullName: 'Physics, Chemistry, Mathematics', desc: 'Focused on science and mathematics — foundation for engineering and technical fields.' },
        { name: 'BCB', fullName: 'Biology, Chemistry, Botany', desc: 'Focused on biological sciences — foundation for medical, pharmacy and life sciences.' },
        { name: 'ART', fullName: 'Arts / Humanities', desc: 'Focused on literature, social sciences and languages — foundation for civil services and social fields.' },
        { name: 'Agriculture', fullName: 'Agricultural Science', desc: 'Focused on agriculture and natural resources — foundation for agricultural science and related fields.' },
      ],
    },
    facilities: {
      eyebrow: 'Facilities',
      title: 'Our Facilities',
      subtitle: 'Infrastructure for the all-round development of students.',
      items: [
        { name: 'Library', desc: 'Library resources to support students’ academic learning and reading.' },
        { name: 'Science Laboratory', desc: 'A well-equipped laboratory for practical science education.' },
        { name: 'Computer Lab', desc: 'A dedicated space supporting computer-aided learning.' },
        { name: 'Classrooms', desc: 'Suitable and comfortable classrooms for students.' },
        { name: 'Sports', desc: 'A playground for students’ physical activities and sports.' },
        { name: 'School Campus', desc: 'A safe and serene campus for the all-round development of students.' },
      ],
      photoAlt: 'Facility photo',
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'School Gallery',
      subtitle: 'Glimpses of life at our school.',
      categories: ['School Campus', 'Principal & Teachers', 'Student Activities', 'School Events', 'Independence Day', 'Cultural Activities', 'Creative Activities', 'Student Achievements', 'Group Photos', 'Computer Lab', 'Library', 'Classrooms', 'Sports'],
      empty: 'No photos are available in this category yet.',
      close: 'Close',
      prev: 'Previous',
      next: 'Next',
    },
    video: {
      eyebrow: 'Video',
      title: 'School Videos',
      subtitle: 'Watch videos from our school events and activities.',
      comingSoon: 'School Video Coming Soon',
    },
    notices: {
      eyebrow: 'Notices',
      title: 'Notice Board',
      subtitle: 'Important notices and announcements.',
      currentLabel: 'Latest Notice',
      currentTitle: 'Upcoming Programs & Notices',
      currentDescription: 'Information about upcoming school programs and important notices will be provided by the school from time to time.',
      currentNote: '',
      download: 'Download',
    },
    events: {
      eyebrow: 'Events',
      title: 'School Events',
      subtitle: 'Recently held events.',
      empty: 'School events will be updated here.',
    },
    timings: {
      eyebrow: 'Timings',
      title: 'School Timings',
      subtitle: 'School timings for winter and summer seasons.',
      winter: 'Winter Schedule',
      winterMonths: 'October to March',
      winterTime: '9:30 AM – 3:00 PM',
      summer: 'Summer Schedule',
      summerMonths: 'April to September',
      summerTime: '7:30 AM – 1:30 PM',
    },
    admissions: {
      eyebrow: 'Admissions',
      title: 'Admission Information',
      subtitle: 'Admission details for the new academic session.',
      comingSoon: 'Admission details beyond the confirmed last date will be updated when available.',
      process: 'Admission Process',
      processTitle: 'How to Get Admission',
      processSteps: [
        'Students can contact Shri Rajkumar Ji (Clerk) at the school for admission.',
        'The required forms and related information can be obtained from the school office.',
        'The final list of required documents/forms will be provided by the school at the time of admission.',
      ],
      eligibility: 'Eligibility',
      documents: 'Required Documents',
      documentsNote: 'The final list of required documents will be provided by the school at the time of admission.',
      fees: 'Fee Structure',
      feesNote: 'Fees vary according to class and stream. Please contact the school office for the current fee details.',
      dates: 'Important Dates',
      confirmedDateLabel: 'Last Date for Admission',
      confirmedDate: '25 August 2026',
      clerkTitle: 'Admission Contact',
      clerkName: 'Shri Rajkumar Ji',
      clerkRole: 'Clerk / लिपिक',
      clerkDesc: 'Providing assistance and guidance for admission forms and information at the school office.',
      enquiry: 'Admission Enquiry',
      enquiryBtn: 'Admission Enquiry',
      enquiryTitle: 'Admission Enquiry Form',
      enquirySubtitle: 'Fill in your details and we will get in touch with you.',
      nameField: 'Student / Parent Name',
      phoneField: 'Phone Number',
      classField: 'Desired Class',
      messageField: 'Message (optional)',
      submit: 'Submit',
      success: 'Thank you! Your enquiry has been received. We will contact you soon.',
      close: 'Close',
      selectClass: 'Select Class',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Get in Touch',
      subtitle: 'Reach out to us — we are here to help.',
      addressLabel: 'Address',
      address: 'Titron Dehat, Gangoh, Saharanpur, Uttar Pradesh, India — 247343',
      emailLabel: 'Email',
      email: '1060.sre@gmail.com',
      principalLabel: 'Principal',
      principal: 'Pradeep Chauhan',
      directions: 'Get Directions',
      emailUs: 'Email Us',
      mapTitle: 'Our location on the map',
    },
    social: {
      facebook: 'Follow us on Facebook',
      facebookLabel: 'Facebook',
    },
    footer: {
      school: 'School',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      hours: 'School Hours',
      social: 'Social',
      hoursWinter: 'October–March: 9:30 AM – 3:00 PM',
      hoursSummer: 'April–September: 7:30 AM – 1:30 PM',
      rights: '© Shri Saraswati Inter College. All Rights Reserved.',
      builtWith: 'Education, Values and a Brighter Future',
    },
    achievements: {
      eyebrow: 'Achievements',
      title: 'Special Achievements & Student Activities',
      subtitle: 'Glimpses of special activities and achievements related to the school.',
      codeyogiTitle: 'Special Occasion with CodeYogi',
      codeyogiSubtitle: 'A special programme at the school by CodeYogi — technology exposure and student achievement.',
      codeyogiItems: [
        { label: 'CodeYogi School Visit', desc: 'Visit to the school by CodeYogi.' },
        { label: 'Meeting with DM', desc: 'A special opportunity to meet the District Magistrate.' },
        { label: 'Laptop Received', desc: 'Receiving a laptop as an achievement.' },
        { label: 'Published in News', desc: 'News/photo published in a newspaper.' },
      ],
      photoSoon: 'Photo will be uploaded soon',
    },
    scrolltop: 'Back to top',
  },
};
