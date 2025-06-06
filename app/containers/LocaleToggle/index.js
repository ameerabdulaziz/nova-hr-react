/*
 *
 * LanguageToggle
 *
 */import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { changeDirectionAction } from 'enl-redux/actions/uiActions';
import Toggle from './Toggle';
import messages from './messages';
import { appLocales } from '../../i18n';
import changeLocale from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';

function LocaleToggle(props) {
  const { locale, onLocaleToggle, changeDirection } = props;
  const handleLocalToggle = event => {
    // Change Language
    onLocaleToggle(event);

    // Change Theme Direction
    if (event.target.value === 'ar' || event.target.value === 'arKsa') {
      document.dir = 'rtl';
      changeDirection('rtl');
    } else {
      document.dir = 'ltr';
      changeDirection('ltr');
    }
  };


  // used to change defualt direction on refresh
  useEffect(()=> {
    if(locale === "en")
    {
      document.dir = 'ltr';
    }
    else
    {
      document.dir = 'rtl';
    }
  },[])

  return (
    <Toggle
      value={locale}
      values={appLocales}
      messages={messages}
      onToggle={(e) => handleLocalToggle(e)}
    />
  );
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func.isRequired,
  changeDirection: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    changeDirection: dir => dispatch(changeDirectionAction(dir)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
