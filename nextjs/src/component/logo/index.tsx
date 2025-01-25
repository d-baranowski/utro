import ButtonBase from '@mui/material/ButtonBase';
import Link from "next/link";
import Image from 'next/image'

const LogoSection = () => {
  return (
    <ButtonBase disableRipple component={Link} href={"/"}>
      <Image
        src="/logo.png"
        width={120}
        height={52}
        alt="App logo"
      />
    </ButtonBase>
  );
};

export default LogoSection;
