import { Modal, ModalOverlay, ModalContent, ModalBody, Input, Text, VisuallyHidden, useDisclosure, useEventListener, Flex, Button, HStack, Kbd } from '@chakra-ui/react';
import Fuse from 'fuse.js';
import { useState, useEffect, ChangeEvent, KeyboardEventHandler } from 'react';
import ResultLink from './ResultLink';
import router from 'next/router';
import { FiSearch } from 'react-icons/fi';
import { getAllToolAsList } from '@/toolList';
import { useActionKey } from '@/utils/browser';

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeSearchResultIndex, setActiveSearchResultIndex] = useState<number>(0);
  const [actionKey] = useActionKey();

  useEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'k' && actionKey.hotkey) {
      e.preventDefault();
      isOpen ? onClose() : onOpen();
    }
  });

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      e.preventDefault();
      const activeResultItem = searchResults[activeSearchResultIndex].item;

      router.push(`/d/${activeResultItem.key}`);
      onClose();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeSearchResultIndex > 0) {
        setActiveSearchResultIndex(activeSearchResultIndex - 1);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeSearchResultIndex < searchResults.length - 1) {
        setActiveSearchResultIndex(activeSearchResultIndex + 1);
      }
    }
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fuse = new Fuse(getAllToolAsList(), {
      keys: ['title', 'key', 'description'],
    });

    const results = fuse.search(query);

    const resultsWithIndex = results.map((item, index) => {
      return {
        ...item,
        index,
      };
    });

    setSearchResults(resultsWithIndex);
  }, [query]);

  return (
    <>
      <Button
        role='search'
        alignItems='center'
        lineHeight='1.2'
        w={{ base: 180, sm: 360 }}
        mx='6'
        px='4'
        py='3'
        outline='0'
        _focus={{ shadow: 'outline' }}
        color='gray.600'
        _dark={{ bg: 'gray.700', color: 'gray.400' }}
        shadow='base'
        rounded='md'
        onClick={onOpen}
      >
        <FiSearch />
        <HStack w='full' ml='3' spacing='4px'>
          <Text textAlign='left' flex='1'>
            {'Search'}
          </Text>
          <HStack spacing='4px'>
            <VisuallyHidden>{'Press'} </VisuallyHidden>
            <Kbd rounded='2px'>{actionKey.display}</Kbd>
            <VisuallyHidden> + </VisuallyHidden>
            <Kbd rounded='2px'>K</Kbd>
          </HStack>
        </HStack>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Input
              value={query}
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
              variant='filled'
              placeholder='Search'
              _focus={{
                outline: 'none',
              }}
            />
            <Flex direction='column' mt={2}>
              {searchResults.length > 0 &&
                searchResults.map((tool) => (
                  <ResultLink key={tool.refIndex} href={`/d/${tool.item.key}/`} onClose={onClose} active={activeSearchResultIndex === tool.index}>
                    {tool.item.title}
                  </ResultLink>
                ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
