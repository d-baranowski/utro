import {getRequestConfig} from 'next-intl/server';
import {headers, cookies} from 'next/headers';
import {Formats} from 'next-intl';
import {negotiate} from '@fastify/accept-negotiator';

export const formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  number: {
    precise: {
      maximumFractionDigits: 5
    }
  },
  list: {
    enumeration: {
      style: 'long',
      type: 'conjunction'
    }
  }
} satisfies Formats;

export default getRequestConfig(async (params) => {
  let locale = 'pl';

  const c = await cookies();
  const cloc = c.get("x-utro-locale")?.value

  if (!cloc) {
    const acceptLang = (await headers()).get("accept-language");

    if (acceptLang) {
      const hloc = negotiate(acceptLang, ['pl', 'en']);

      if (hloc) {
        locale = hloc;
      }
    }
  } else {
    locale = cloc;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

// TODO zod tranlation https://github.com/gcascio/next-intl-zod
// https://github.com/amannn/next-intl/discussions/437