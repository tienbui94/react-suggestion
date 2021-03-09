import './App.css';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMON_INFO } from './graphql';
import AutoSuggest from 'react-autosuggest';
function App() {
    const { data, loading, error } = useQuery(GET_POKEMON_INFO);
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (data) {
            setCountries(data);
        }
    }, [data]);

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0
            ? []
            : countries.Country.filter(
                  (country) => country.name.toLowerCase().slice(0, inputLength) === inputValue
              );
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        return setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        return setSuggestions([]);
    };

    const getSuggestionValue = (suggestions) => suggestions.name;

    const renderSuggestion = (suggestions) => {
        // console.log('render', suggestions);
        return <div>{suggestions.name}</div>;
    };

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const inputProps = {
        placeholder: 'Type a Country name',
        style: { boxShadow: '1px 1px 1px 2px lightgrey', width: '80%', height: 20 },
        value,
        onChange: onChange
    };
    console.log(suggestions, '?');
    return (
        <>
            {error && <div>Error Page!</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='App'>
                    <AutoSuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
            )}
        </>
    );
}

export default App;
