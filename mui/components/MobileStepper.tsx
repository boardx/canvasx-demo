import { styled } from '@mui/system';
import MobileStepper from '@mui/material/MobileStepper';

const StyledMobileStepper = styled(MobileStepper)`
  padding: 0;

  & .MuiLinearProgress-barColorPrimary {
    background-color: #f21d6b;
  }

  & .MuiLinearProgress-colorPrimary {
    background-color: #ebebeb;
    width: 100%;
    height: 10px;
  }
`;

export default StyledMobileStepper;
