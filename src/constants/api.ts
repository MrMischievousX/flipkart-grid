const baseUrl = 'https://a2cf-210-212-97-172.ngrok-free.app';

export const searchQuery = async (query: string) => {
  try {
    const response = await fetch(`${baseUrl}/search_item?item_name=${query}`);
    const result = await response.json();

    return result.results.result;
  } catch (error) {
    return [];
  }
};
export const getNewArrivals = async () => {
  try {
    const response = await fetch(`${baseUrl}/new_arrivals`);
    const result = await response.json();
    return result.results.result;
  } catch (error) {
    return [];
  }
};
export const getSimilars = async () => {
  try {
    const response = await fetch(`${baseUrl}/similar_items`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};
export const getCloset = async () => {
  try {
    const response = await fetch(`${baseUrl}/get_closet`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};
export const getInitialRecommendations = async () => {
  try {
    const response = await fetch(`${baseUrl}/wardrobe_recommended_outfits`);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};
export const getOutfits = async () => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    season: 'Summer',
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    const response = await fetch(`${baseUrl}/generate_outfit`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};

export const getMyOutfit = async (data: any) => {
  var formdata = new FormData();
  formdata.append('image', data);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await fetch(`${baseUrl}/add_clothing`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};
export const getSuggestedOutfit = async (data: any) => {
  var formdata = new FormData();
  formdata.append('image', data);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await fetch(`${baseUrl}/suggest_outfits`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return [];
  }
};
