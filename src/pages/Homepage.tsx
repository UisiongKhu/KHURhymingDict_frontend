import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Stats from '../components/Stats';
import { useTranslation } from 'react-i18next';

function Homepage(){     

    const [t] = useTranslation();
    const OptionsStringArray = t<'SearchBar.Homepage.Dropdown.Options', { returnObjects: true }, string[]>('SearchBar.Homepage.Dropdown.Options', { returnObjects: true }).map(v=>v);
    const getSearchBarDropdownOptions = () =>{
        return OptionsStringArray.map(optionStr => Object({value: OptionsStringArray.indexOf(optionStr)+1, text: optionStr})
        );
    }

    return(
        <>
            <div className='min-h-screen h-full not-dark:bg-main dark:bg-main-dark'>
                <Header/> 

                <div id='spacer' className='min-h-40'/>

                <div id='main-container' className='flex flex-col' >
                    <SearchBar className='' label={t('SearchBar.Homepage.Label')} placeholder={t('SearchBar.Homepage.Placeholder')}  options={getSearchBarDropdownOptions()}/>

                    <Stats className='mt-40 text-element dark:text-element-dark rounded-md border-1 border-infobd dark:border-infobd-dark w-full h-60 self-center' />
                </div>
            </div>
            
        </>
    )
}

export default Homepage;