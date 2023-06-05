import { Card } from '@mui/material';
import { useSelector } from '../../../src/store/Store';
import { AppState } from '../../../src/store/Store';

type Props = {
  children: JSX.Element | JSX.Element[];
  sx?: any;
};

const AppCard = ({ children,sx ={} }: Props) => {
  const customizer = useSelector((state: AppState) => state.customizer);

  return (
    <Card
    id='AppCard'
    
      sx={{ display: 'flex', p: 0,height: 'inherit',
      ...sx
    
    }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  );
};

export default AppCard;
