import { useState, useEffect } from 'react';

type ClientOSType = 'Apple' | 'Windows';

export const useClientOS = () => {
  const [os, setOS] = useState('Windows' as ClientOSType);

  useEffect(() => {
    if (/(Mac|iPhone|iPad)/i.test(navigator.userAgent)) {
      setOS('Apple');
    }
  }, []);

  return [os];
};

type ActionKey = {
  display: string;
  title: string;
  hotkey: string;
  isMac: boolean;
};

const ActionKeyWindows = {
  display: 'Ctrl',
  title: 'Control',
  hotkey: 'ctrlKey',
  isMac: false,
};
const ActionKeyMac = {
  display: '⌘',
  title: 'Command',
  hotkey: 'metaKey',
  isMac: true,
};

export const useActionKey = () => {
  const [actionKey, setActionKey] = useState<ActionKey>(ActionKeyWindows);
  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
    if (isMac) {
      setActionKey(ActionKeyMac);
    }
  }, []);

  return [actionKey];
};
