import { Platform } from 'react-native';
import {
  check,
  checkNotifications,
  PERMISSIONS,
  request,
  requestNotifications,
  RESULTS,
  type Permission,
  type PermissionStatus,
} from 'react-native-permissions';

export type AppPermissionType =
  | 'contacts'
  | 'camera'
  | 'microphone'
  | 'photos'
  | 'location'
  | 'notifications';

export interface PermissionDefinition {
  type: AppPermissionType;
  title: string;
  description: string;
  blockedTitle: string;
  blockedDescription: string;
  iconName: 'users' | 'camera' | 'mic' | 'image' | 'map-pin' | 'bell';
  androidPermission?: Permission;
  iosPermission?: Permission;
  isNotification?: boolean;
}

export const PERMISSION_CONFIGS: Record<
  AppPermissionType,
  PermissionDefinition
> = {
  contacts: {
    type: 'contacts',
    title: 'Find Your Contacts',
    description:
      'Allow contacts access to find friends, sync encrypted contacts, and start chats easily.',
    blockedTitle: 'Enable Contacts Access',
    blockedDescription:
      'Contacts access is disabled in device settings. Enable it to find people you know on Cipher.',
    iconName: 'users',
    androidPermission: PERMISSIONS.ANDROID.READ_CONTACTS,
    iosPermission: PERMISSIONS.IOS.CONTACTS,
  },
  camera: {
    type: 'camera',
    title: 'Enable Camera Access',
    description:
      'Allow camera access to capture encrypted photos, record videos, and scan authentication QR codes.',
    blockedTitle: 'Enable Camera Access',
    blockedDescription:
      'Camera access is disabled in device settings. Enable it to take photos or start video calls.',
    iconName: 'camera',
    androidPermission: PERMISSIONS.ANDROID.CAMERA,
    iosPermission: PERMISSIONS.IOS.CAMERA,
  },
  microphone: {
    type: 'microphone',
    title: 'Enable Microphone Access',
    description:
      'Allow microphone access to send voice messages and place secure end-to-end encrypted calls.',
    blockedTitle: 'Enable Microphone Access',
    blockedDescription:
      'Microphone access is disabled in device settings. Enable it to record audio or make calls.',
    iconName: 'mic',
    androidPermission: PERMISSIONS.ANDROID.RECORD_AUDIO,
    iosPermission: PERMISSIONS.IOS.MICROPHONE,
  },
  photos: {
    type: 'photos',
    title: 'Access Photo Library',
    description:
      'Allow access to your photo library to share photos, videos, and media in encrypted chats.',
    blockedTitle: 'Enable Photos Access',
    blockedDescription:
      'Photo library access is disabled in device settings. Enable it to select and share photos.',
    iconName: 'image',
    androidPermission:
      Platform.OS === 'android' &&
      typeof Platform.Version === 'number' &&
      Platform.Version >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    iosPermission: PERMISSIONS.IOS.PHOTO_LIBRARY,
  },
  location: {
    type: 'location',
    title: 'Share Your Location',
    description:
      'Allow location access to share live or pinned locations with trusted contacts.',
    blockedTitle: 'Enable Location Access',
    blockedDescription:
      'Location access is disabled in device settings. Enable it to share location securely.',
    iconName: 'map-pin',
    androidPermission: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    iosPermission: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  },
  notifications: {
    type: 'notifications',
    title: 'Stay Informed',
    description:
      'Enable notifications to receive instant alerts for incoming secure messages and calls.',
    blockedTitle: 'Enable Notifications',
    blockedDescription:
      'Notifications are disabled in device settings. Enable them to never miss important alerts.',
    iconName: 'bell',
    isNotification: true,
  },
};

export type PermissionRequestResult = {
  status: PermissionStatus;
  granted: boolean;
  canAskAgain: boolean;
};

const createResult = (status: PermissionStatus): PermissionRequestResult => ({
  status,
  granted: status === RESULTS.GRANTED || status === RESULTS.LIMITED,
  canAskAgain: status === RESULTS.DENIED,
});

export async function checkPermission(
  androidPermissionType: Permission,
  iosPermissionType: Permission,
): Promise<PermissionRequestResult> {
  const permission = Platform.select<Permission>({
    ios: iosPermissionType,
    android: androidPermissionType,
  });

  if (!permission) {
    return createResult(RESULTS.UNAVAILABLE);
  }

  const status = await check(permission);
  return createResult(status);
}

export async function requestPermission(
  androidPermissionType: Permission,
  iosPermissionType: Permission,
): Promise<PermissionRequestResult> {
  const permission = Platform.select<Permission>({
    ios: iosPermissionType,
    android: androidPermissionType,
  });

  if (!permission) {
    return createResult(RESULTS.UNAVAILABLE);
  }

  let status = await check(permission);

  // Already granted, partially granted, or unavailable.
  if (
    status === RESULTS.GRANTED ||
    status === RESULTS.LIMITED ||
    status === RESULTS.UNAVAILABLE
  ) {
    return createResult(status);
  }

  // Permission is permanently blocked or Settings-only.
  if (status === RESULTS.BLOCKED) {
    return createResult(status);
  }

  // Ask the operating system for permission.
  if (status === RESULTS.DENIED) {
    status = await request(permission);
  }

  return createResult(status);
}

export async function checkAppPermission(
  type: AppPermissionType,
): Promise<PermissionRequestResult> {
  const config = PERMISSION_CONFIGS[type];
  if (config.isNotification) {
    const { status } = await checkNotifications();
    return createResult(status);
  }
  if (!config.androidPermission || !config.iosPermission) {
    return createResult(RESULTS.UNAVAILABLE);
  }
  return checkPermission(config.androidPermission, config.iosPermission);
}

export async function requestAppPermission(
  type: AppPermissionType,
): Promise<PermissionRequestResult> {
  const config = PERMISSION_CONFIGS[type];
  if (config.isNotification) {
    const { status } = await requestNotifications(['alert', 'badge', 'sound']);
    return createResult(status);
  }
  if (!config.androidPermission || !config.iosPermission) {
    return createResult(RESULTS.UNAVAILABLE);
  }
  return requestPermission(config.androidPermission, config.iosPermission);
}
