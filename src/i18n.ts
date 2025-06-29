import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LocaleFileEN from './locale/en.json';
import LocaleFileTGPOJ from './locale/tg_POJ.json';
import LocaleFileTGHJ from './locale/tg_HJ.json';

i18n
  .use(initReactI18next) // 把 i18n 實例傳入 react-i18next
  .init({
    resources: {
      // 定義你的語言資源 (Tēng-gī Lí ê Gí-giân Chu-goân)
      en: {
        translation: LocaleFileEN,
      },
      tg_POJ: {
        translation: LocaleFileTGPOJ,
      },
      tg_HJ: {
        translation: LocaleFileTGHJ,
      }
    },
    lng: 'tg_POJ', // 預設語言 (Ū-siat Gí-giân)
    fallbackLng: 'en', // 當預設語言無找到翻譯時，會回退到這个語言 (Tng ū-siat gí-giân bô chhōe-tio̍h hoan-e̍k sî, ē tòe-thè kàu chit ê gí-giân)

    interpolation: {
      escapeValue: false // React 已經有保護 XSS 的機制，所以無需要 escape
    }
  });

export default i18n;