import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
export default function Home() {
  const t = useTranslations('Home');    // for non-async function only
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-6 left-6">
        <LanguageSwitcher />
      </div>
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4 text-xl">{t('subtitle')}</p>
    </div>
  );
}