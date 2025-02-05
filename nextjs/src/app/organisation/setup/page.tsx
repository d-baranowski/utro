"use client"
import React from 'react';
import {useTranslations} from "next-intl";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import {getMessages} from 'next-intl/server';
import { useRouter } from 'next/navigation';

interface Props {

}

const Page: React.FunctionComponent<Props> = function Page(props) {
  const t = useTranslations('organisation.setup')
  const router = useRouter()
  return (
    <div>
      <Card sx={{ padding: 1 }}>
        <CardHeader>
          <span className={"mr-3 text-2xl"}>👋</span>
          <h1 className={"font-bold"}>{t('welcome')}</h1>
        </CardHeader>
        <Grid container spacing={1}>
          <Grid><p>{t('question')}</p></Grid>
          <Grid size={{xs: 12}}>
            <Button
              fullWidth
              variant={"contained"}
              color={"primary"}
              onClick={() => {router.push('/organisation/setup/create')}}
              endIcon={<span>🚀</span>}
            >
              {t('createBtn')}
            </Button></Grid>
          <Grid size={{xs: 12}}>
            <Button
              fullWidth
              color={"secondary"}
              endIcon={<span>💌</span>}
              // onClick={() => {}}
            >
              {t('joinBtn')}
            </Button>
          </Grid>
        </Grid>
      </Card>

    </div>
  );
}

  export default Page;