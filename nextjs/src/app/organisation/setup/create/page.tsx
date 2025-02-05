import React from 'react';
import {useTranslations} from "next-intl";
import Card from "@mui/material/Card";
import Form from '~/_section/organisation/component/form';

interface Props {

}
const Page: React.FunctionComponent<Props> = function Page(props) {
  const t = useTranslations('organisation.setup')
  return (
      <Card sx={{ padding: 1 }}>
        <Form/>
      </Card>
  );
}

  export default Page;