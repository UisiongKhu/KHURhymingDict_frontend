import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

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

                    <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
                </div>
            </div>
            
        </>
    )
}

export default Homepage;