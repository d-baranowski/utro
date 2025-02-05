import { int } from 'drizzle-orm/mysql-core';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

interface Props extends React.PropsWithChildren<{}> {

} 


const I18Provider: React.FC<Props>= async function I18Provider(props) {
  const {children} = props;
  const messages = await getMessages();
 
  return (
    // Provide messages to the NextIntlClientProvider
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

  );
}
export default I18Provider;