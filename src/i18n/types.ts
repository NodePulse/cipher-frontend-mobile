export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'hi';

export interface LanguageInfo {
  code: LanguageCode;
  label: string;
  nativeName: string;
  flag: string;
}

export interface TranslationSchema {
  common: {
    getStarted: string;
    alreadyHaveAccount: string;
    signIn: string;
    signUp: string;
    save: string;
    cancel: string;
    loading: string;
  };
  splash: {
    appName: string;
    tagline: string;
    encryptedNode: string;
    unlockVault: string;
  };
  onboarding: {
    slide1Badge: string;
    slide1Headline: string;
    slide1Desc: string;
    slide2Badge: string;
    slide2Headline: string;
    slide2Desc: string;
    slide3Badge: string;
    slide3Headline: string;
    slide3Desc: string;
    getStarted: string;
    alreadyHaveAccount: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    passphraseLabel: string;
    passphrasePlaceholder: string;
    signInBtn: string;
    quickDemoBtn: string;
    noIdentityPrompt: string;
    createIdentityLink: string;
    registerTitle: string;
    registerSubtitle: string;
    handleLabel: string;
    handlePlaceholder: string;
    emailAddressLabel: string;
    masterPassphraseLabel: string;
    confirmPassphraseLabel: string;
    zeroKnowledgeNotice: string;
    generateKeysBtn: string;
    alreadyRegisteredPrompt: string;
    signInLink: string;
  };
  home: {
    authenticatedBadge: string;
    appTitle: string;
    appearanceSection: string;
    currentlyLabel: string;
    languageSection: string;
    sessionStatusLabel: string;
    sessionStatusValue: string;
    encryptionLabel: string;
    encryptionValue: string;
    keyFingerprintLabel: string;
    signOutBtn: string;
  };
}

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<TranslationSchema>;

export interface LanguageContextType {
  currentLanguage: LanguageCode;
  languageInfo: LanguageInfo;
  availableLanguages: LanguageInfo[];
  setLanguage: (code: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}
