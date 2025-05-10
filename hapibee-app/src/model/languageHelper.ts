import { INITIAL_STATE } from 'src/redux/reducer/initial-state';
import { loadState } from 'src/redux/storage/localStorage';

const DEFAULT_LANGUAGE = 'en';

export const ALLOWED_LANGUAGES = [
  { value: DEFAULT_LANGUAGE, isDefault: true },
  { value: 'pt', isDefault: false },
];

export function safeLanguage(): string {
  let result = DEFAULT_LANGUAGE;
  const navigatorLanguage = window.navigator.language;

  if (typeof navigatorLanguage === 'string' && navigatorLanguage.length >= 2) {
    const langCode = navigatorLanguage.substring(0, 2).toLowerCase();
    const found = ALLOWED_LANGUAGES.some((x) => x.value === langCode);
    if (found) {
      result = langCode;
    }
  }
  return result;
}

export function userLangFromStorage(): string | undefined {
  const savedState: typeof INITIAL_STATE = loadState();
  try {
    return savedState.user.language;
  } catch (error) {
    return undefined;
  }
}
