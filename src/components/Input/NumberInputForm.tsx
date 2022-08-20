import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInputProps, useColorModeValue } from '@chakra-ui/react';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';

export type NumberInputFormProps = NumberInputProps & {
  label: string;
};

export const NumberInputForm = (props: NumberInputFormProps) => {
  const bgColor = useColorModeValue('gray.100', 'whiteAlpha.200');

  return (
    <FormControl as='fieldset'>
      <FormLabel as='legend'>{props.label}</FormLabel>
      <NumberInput bgColor={bgColor} {...props}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};
