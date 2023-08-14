import { useState, useEffect, forwardRef } from 'react';

import { IoMdClose } from 'react-icons/io';

import { useGetSearchedTagsQuery } from '../../../../app/slices/apiSlices/contentsSlice';

const TagInput = forwardRef((props, ref) => {
  TagInput.displayName = 'TagInput';
  const { tags, setTags } = props;
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data, isLoading, isSuccess, isError, error } =
    useGetSearchedTagsQuery({ tagName: inputValue });

  useEffect(() => {
    if (isSuccess) {
      setSuggestions(data?.data?.map((tag) => tag?.name));
    }
  }, [data, isSuccess]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    setShowSuggestions(inputValue !== '');
  };

  const handleInputKeyDown = (e) => {
    if (tags.length >= 3 && e.key !== 'Backspace') {
      return;
    }
    if (e.key === 'Backspace' && inputValue === '') {
      setTags(tags.slice(0, -1));
    }
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (tags.length >= 3) {
      return;
    }
    setTags([...tags, suggestion]);
    setInputValue('');
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion?.toLowerCase().includes(inputValue.toLowerCase())
  );

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  return (
    <div className="flex h-fit w-full flex-wrap gap-2 rounded-[4px] border-[1px] border-neutral-400  p-1 font-normal text-neutral-800 shadow-[0px_2px_2px_rgba(33,37,41,0.06),0px_0px_1px_rgba(33,37,41,0.08)] focus-within:border-2  focus-within:border-secondary-400 focus-within:outline-none focus-within:ring-0">
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex h-[2rem] w-fit items-center gap-1 rounded bg-neutral-300 px-1 text-[14px] transition-all duration-200 hover:bg-secondary-400 hover:text-white"
        >
          <div className="">{tag}</div>
          <IoMdClose
            size={19}
            onClick={() => removeTag(tag)}
            className="cursor-pointer"
          />
        </div>
      ))}
      <div className="relative h-fit w-full">
        <input
          ref={ref}
          type="text"
          className="h-[2rem] w-full border-none text-[14px] focus:ring-0"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleInputKeyDown(e)}
          placeholder="Enter a tag and press Enter"
        />
        {showSuggestions && (
          <ul className="absolute left-0 top-[2.2rem] flex w-fit flex-col rounded-md bg-white shadow-lg">
            {filteredSuggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full cursor-pointer px-2 py-1  transition-all duration-200 hover:bg-secondary-400 hover:text-white"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default TagInput;
