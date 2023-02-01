import { BsClipboard, BsClipboardCheck } from 'react-icons/bs';

interface CopyIconButtonProps  {
  onCopy: () => void;
  hasCopied: boolean;
}

export const CopyIconButton = (props: CopyIconButtonProps  ) => {
  const {
    onCopy,
    hasCopied,
    ...otherProps
  } = props;

  if (hasCopied) {
    return <BsClipboardCheck />;
  }
  return <BsClipboard onClick={onCopy}/>;
};
