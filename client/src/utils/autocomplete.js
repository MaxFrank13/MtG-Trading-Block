export const autocomplete = async (value) => {
  if (value.length > 2) {
    try {
      const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${value}`);
  
      if (!response.ok){
        throw new Error('something went wrong!');
      }

      const { data } = await response.json();
  
      console.log(data);

      return data;
      
    } catch (err) {
      console.error(err);
    }
  }
}