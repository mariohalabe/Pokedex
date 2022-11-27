const PokemoName = document.querySelector('.pokemon_name');
const PokemoNumber = document.querySelector('.pokemon_number');
const PokemoImg = document.querySelector('.pokemon_imge');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}


const renderPokemon = async (pokemon) => {

    PokemoName.innerHTML = 'Loading....';
    PokemoNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon)

    if (data) {
        PokemoImg.style.display = 'block' 
        PokemoName.innerHTML = data.name;
        PokemoNumber.innerHTML = data.id;
        PokemoImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else {
        PokemoImg.style.display = 'none' 
        PokemoName.innerHTML = 'Not found';
        PokemoNumber.innerHTML = '';
    }
}



form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {

    if(searchPokemon > 1){
       searchPokemon -= 1;
    renderPokemon(searchPokemon)  
    }
   
});
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});



renderPokemon('1');