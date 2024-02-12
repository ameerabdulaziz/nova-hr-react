import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import useStyles from './search-jss';
import messages from './messages'

function SearchUi(props) {
  const { intl } = props;

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const dataMenu = useSelector((state) => state.authReducer.usermenu);
  const locale = useSelector((state) => state.language.locale);
  const [menu, setMenu] = useState([]);

  const { classes } = useStyles();

  const flattenMenu = useCallback(() => {
    const links = [];

    function traverse(menuItems) {
      menuItems.forEach((item) => {
        if (item.link) {
          links.push(item);
        }

        if (item.child) {
          traverse(item.child);
        }
      });
    }

    traverse(dataMenu);

    return links;
  }, [dataMenu]);

  useEffect(() => {
    if (dataMenu) {
      setMenu(flattenMenu());
    }
  }, [dataMenu]);

  function renderInput(inputProps) {
    const { ref, ...rest } = inputProps;

    return (
      <TextField
        variant='standard'
        className='input-header'
        fullWidth
        InputProps={{
          inputRef: ref,
          ...rest,
        }}
        autoComplete='off'
      />
    );
  }

  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const name = locale === 'en' ? suggestion.name : suggestion.arname;

    const matches = match(name, query);
    const parts = parse(name, matches);

    return (
      <MenuItem
        selected={isHighlighted}
        component={NavLink}
        to={suggestion.link}
      >
        <div>
          {parts.map((part, index) => (part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 700 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ))
          )}
        </div>
      </MenuItem>
    );
  }

  function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;
    return <Paper {...containerProps}>{children}</Paper>;
  }

  function getSuggestionValue(suggestion) {
    console.log(suggestion);
    return locale === 'en' ? suggestion.name : suggestion.arname;
  }

  const getSuggestions = useCallback(
    (value) => {
      const inputValue = value.trim().toLowerCase();

      if (inputValue.length === 0) {
        return [];
      }

      return menu.filter(
        (suggestion) => suggestion.name.toLowerCase().includes(inputValue)
          || suggestion.arname.toLowerCase().includes(inputValue)
      );
    },
    [menu]
  );

  const handleSuggestionsFetchRequested = (e) => {
    setSuggestions(getSuggestions(e.value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const handleSuggestionSelected = (event, { suggestion, method }) => {
    const { history } = props;
    if (method === 'enter') {
      history.push(suggestion.link);
    }
  };

  return (
    <Autosuggest
      theme={{
        container: classes.containerSearch,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderInputComponent={renderInput}
      suggestions={suggestions}
      onSuggestionsFetchRequested={(e) => handleSuggestionsFetchRequested(e)}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getSuggestionValue}
      onSuggestionSelected={handleSuggestionSelected}
      renderSuggestion={renderSuggestion}
      className={classes.autocomplete}
      inputProps={{
        placeholder: intl.formatMessage(messages.search),
        value,
        onChange: handleChange,
      }}
    />
  );
}

SearchUi.propTypes = {
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SearchUi);
