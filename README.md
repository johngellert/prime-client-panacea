# Panacea # 
![Panacea Logo](src/images/panacealogo.png))

Panacea is a mobile-first web application that allows users traveling abroad to quickly gain access to local health information, such as urgent care centers, medication translations, and emergency contact numbers.

Panacea offers a carefully compiled perspective into each city’s unique health system, thus aiding users in their search for and understanding of specific types of healthcare organizations and cultural health norms.  

An admin will be able to log into a desktop-first view and easily access the Panacea database to add new cities, organizations, and medication translations as well as search and edit existing content.

#### This version uses: ###
* React-Hooks
* Redux
* Google Maps API
* REST Countries
* Material-UI
* Express
* Passport
* PostgreSQL 
* A full list of dependencies can be found in `package.json`



## Motivation ##
Sommer Collins, the creator of Panacea, has a background in industrial and systems engineering with a focus on health system improvement.  

After 13 years of working in the Western healthcare setting as a consultant, she began to realize a need exists to help people navigate the different healthcare systems they are exposed to while traveling or relocating abroad.   

To quote Sommer:
 “...it was a new diagnosis:  
* who do we go to?  
* What’s the best way to get this health issue handled efficiently?  
* It’s the middle of the night and my daughter needs stitches while we are in Spain - where do we go?
* My son needs health testing done in Poland and they do not speak English. Will there be translators?
* Our baby has a fever, what medicine do I buy?  There has to be something easier than sifting through google. 

As a solution to these issues, Panacea helps you find healthcare you can trust wherever you are. 


## Installation ##

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)


### In Terminal: ###
1. Clone repository
2. Go into repository
3. Install dependencies
    1. npm install
4. npm run server
5. npm run client



![Panacea User](src/images/panaceauser1.gif)




```javascript
class SearchBox extends Component {

    state = {
        cities: [],
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ""
    }

    componentDidMount() {
        axios.get('/api/cities')
          .then(({ data }) => {
            this.setState({
              cities: data,
            });
          })
          .catch((error) => {
          })
      }

    onChange = e => {
        const { cities } = this.state;
        const userInput = e.currentTarget.value;

        const filteredSuggestions = cities.filter(
            suggestion =>
                suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    clearInput = e => {
        this.setState({
            userInput: "",
        });
    }

    render() {
        const {
            clearInput,
            onChange,
            state: {
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, i) => {
                            return (
                                <li onClick={clearInput} key={i}>
                                    <Link
                                        style={{ display: 'block' }}
                                        to={{
                                            pathname: `/city/${suggestion.name}`,
                                            id: suggestion.id,
                                        }}
                                    >
                                        {suggestion.name}, {suggestion.country_id}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <>
                    </>
                );
            }
        }

        return (
            <>
                <InputBase
                    type="text"
                    onChange={onChange}
                    placeholder="Find my city?"
                    style={{ width: `85%` }}
                    value={userInput}
                />
                {suggestionsListComponent}
            </>
        );
    }
}

export default SearchBox;
```



## Authors ##
* [Dayton Brock](https://github.com/daytonbrock)
* [Koua Xiong](https://github.com/amfgkzz)
* [John Gellert](https://github.com/johngellert)
* [Susannah Fujimoto Harris](https://github.com/susannahnah)

