import { Radio, RadioProps } from '@mui/material';
import { checkOffImg, checkOnImg } from '../../assets';

const CustomRadio = (props: RadioProps) => {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<img src={checkOnImg} style={{
        borderRadius: '50%',
        width: 14,
        height: 14,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
      }} />}
      icon={<img src={checkOffImg} style={{
        borderRadius: '50%',
        width: 14,
        height: 14,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
      }} />}
      {...props}
    />
  );
}

export default CustomRadio