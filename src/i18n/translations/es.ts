import type { TranslationSchema } from '../types';

export const es: TranslationSchema = {
  common: {
    getStarted: 'Empezar',
    alreadyHaveAccount: 'Ya tengo una cuenta',
    signIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
    save: 'Guardar',
    cancel: 'Cancelar',
    loading: 'Cargando...',
  },
  splash: {
    appName: 'Cipher',
    tagline: 'Privado por defecto',
    encryptedNode: 'Nodo Cifrado Extremo a Extremo',
    unlockVault: 'Desbloquear Bóveda',
  },
  onboarding: {
    slide1Badge: 'Privacidad Absoluta',
    slide1Headline: 'Tus mensajes son solo tuyos',
    slide1Desc:
      'Ni siquiera los servidores pueden leer tus conversaciones. Mensajería verdaderamente privada construida con criptografía de vanguardia.',
    slide2Badge: 'Seguridad Conocimiento Cero',
    slide2Headline: 'Claves generadas en tu dispositivo',
    slide2Desc:
      'Trinquetes criptográficos garantizan que cada mensaje esté sellado con una clave única de secreto hacia adelante.',
    slide3Badge: 'Red Descentralizada',
    slide3Headline: 'Sin metadatos centrales retenidos',
    slide3Desc:
      'Sin recolección de contactos, sin rastreo y cero huellas digitales en ningún servidor.',
    getStarted: 'Empezar',
    alreadyHaveAccount: 'Ya tengo una cuenta',
  },
  auth: {
    loginTitle: 'Cipher',
    loginSubtitle: 'Introduce tus credenciales para descifrar y continuar',
    emailLabel: 'Correo o ID de Cipher',
    emailPlaceholder: 'agente@cipher.sec',
    passphraseLabel: 'Frase de paso',
    passphrasePlaceholder: '••••••••••••',
    signInBtn: 'Iniciar Sesión',
    quickDemoBtn: '⚡ Inicio Rápido de Demostración',
    noIdentityPrompt: '¿No tienes una identidad segura?',
    createIdentityLink: 'Crear Identidad',
    registerTitle: 'Nueva Identidad Cipher',
    registerSubtitle:
      'Los pares de claves criptográficas se generarán localmente en tu dispositivo',
    handleLabel: 'Alias Operativo / Nombre Completo',
    handlePlaceholder: 'ej. Alex Vance',
    emailAddressLabel: 'Correo Electrónico',
    masterPassphraseLabel: 'Frase de Paso Maestra',
    confirmPassphraseLabel: 'Confirmar Frase de Paso',
    zeroKnowledgeNotice:
      'Arquitectura de conocimiento cero. Ningún dato no cifrado se transmite jamás a nuestros servidores.',
    generateKeysBtn: 'Generar Claves y Registrarse',
    alreadyRegisteredPrompt: '¿Ya estás registrado?',
    signInLink: 'Iniciar Sesión',
  },
  home: {
    authenticatedBadge: 'PILA AUTENTICADA',
    appTitle: 'CIPHER SEGURO',
    appearanceSection: 'Modo de Apariencia',
    currentlyLabel: 'Actualmente',
    languageSection: 'Idioma',
    sessionStatusLabel: 'Estado de Sesión:',
    sessionStatusValue: 'Activo y Verificado',
    encryptionLabel: 'Cifrado:',
    encryptionValue: 'AES-256-GCM / E2EE',
    keyFingerprintLabel: 'HUELLA DIGITAL DE CLAVE',
    signOutBtn: 'Cerrar Sesión (Volver a AuthStack)',
  },
};
