import { Radio, RadioProps } from '@mui/material';
import { checkOffImg, checkOnImg } from '../../assets';
import { styled } from '@mui/material/styles';

const BpIcon = styled('span')(() => ({
  borderRadius: '50%',
  width: 14,
  height: 14,
  boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
  backgroundImage: `url(${checkOffImg})`,
  
}));
const BpCheckedIcon = styled(BpIcon)({
  backgroundImage: `url(${checkOnImg})`,
});


const CustomRadio = (props: RadioProps) => {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export default CustomRadio