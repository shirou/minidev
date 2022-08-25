import React from 'react';

import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { langNames, LanguageName, loadLanguage } from '@uiw/codemirror-extensions-langs';

import { githubLight, githubDark } from '@uiw/codemirror-theme-github';

import { useColorMode } from '@chakra-ui/react';

type TextBoxProps = {
  language: LanguageName | undefined; // if undefined, no highlight specified
} & ReactCodeMirrorProps;

export const TextBox = (props: TextBoxProps) => {
  const { language } = props;
  const { colorMode } = useColorMode();

  const theme = colorMode == 'light' ? githubLight : githubDark;

  return <CodeMirror basicSetup={true} theme={theme} extensions={language ? [loadLanguage(language)!].filter(Boolean) : undefined} {...props} />;
};
