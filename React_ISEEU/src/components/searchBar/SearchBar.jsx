import React from 'react';
import "./searchbar.css";
import { FaSearch } from 'react-icons/fa'; //for search icon
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([
      { id: 1, name: 'ICU' },
      { id: 2, name: 'Investigtaion' },
      { id: 3, name: 'Report' },
      // Additional data that is pages when we make it 
    ]);
 
    const handleSearch = () => {
        const filter = filteredData;

        if (filter.length > 0) {
            // If results are found, navigate to the first result da when clicked on the icon or when press enter 
            navigate(`/${filter[0].name}`);
        }  {/* else already the not found appear in result  */}
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // If Enter key is pressed, trigger search
            handleSearch();
        }
    };



    const navigate = useNavigate();
  const handleClick = (name) => {
    // Navigate to the desired page
    navigate('/${name}');
  };
    {/* handle input change y3ni lw fe ay text in the input bar "event" put it in the inputvalue varr by setvalue function*/ }
    {/** filter data take each idataitem and compare it to the input value  */}
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
  return (
    <div className='bar'>
        <div className='bar-content'>
        <FaSearch className="search-icon" onClick={handleSearch}/>
        <input  className='bar-input'
        type="text" 
        placeholder='Search...'
        onChange={handleInputChange} 
        value={inputValue}
        onKeyPress={handleKeyPress}
      />
      </div>
    

{/* if there is an input value " text in the search bar and there is an data in the filtered data , show them else if there is an input valus 
but there is no data in the filter  y3ni length =0 show not found" */}
     <div className='appear-over'>
       {inputValue&&filteredData.length > 0 ? (
                <div className="search-results">
                    {filteredData.map(item => (
                        <button key={item.id} className="result-button" onClick={()=>handleClick(item.name)}> 
                            {item.name}
                        </button>
                    ))}
                </div>
            ): (inputValue&&
                <div className='Notfound'>
        <p>Not Found!</p> 
        </div>
      )}

</div>

    </div>
    
  )
}

export default SearchBar
