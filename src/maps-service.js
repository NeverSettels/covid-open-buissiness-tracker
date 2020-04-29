export class MapApi {
  async getBusinesses(lng, lat, radius, keyword) {
    try {
      let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${keyword}&key=AIzaSyCSbUg4uB4qOCYnlMNg25JkcZcs8O4si0I&opennow`;
      let response = await fetch(url);
      let jsonifiedResponse;
      let openResults = [];
      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();
        jsonifiedResponse.results.forEach(result => {
          if (result.business_status === "OPERATIONAL" && result.opening_hours) {
            openResults.push(result);
          }
        });
      } else {
        jsonifiedResponse = false;
      }
     
      
      return jsonifiedResponse ? [openResults, lat, lng] : "error";
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getLocation(zip, radius, keyword) {
    try {
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=AIzaSyCSbUg4uB4qOCYnlMNg25JkcZcs8O4si0I`;
      let response = await fetch(url);
      let jsonifiedResponse;
      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();
        let { geometry: { location: { lng, lat } } } = jsonifiedResponse.results[0];
        const search = await this.getBusinesses(lng, lat, radius, keyword);
        return search;
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  
  async nextPage(token) {
    try {
      let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.523064,-122.676483&radius=40233&pagetoken=${token}&key=AIzaSyCSbUg4uB4qOCYnlMNg25JkcZcs8O4si0I`;
      console.log(token);
      let response = await fetch(url);
      let jsonifiedResponse;
      let arr = [];
      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();
        jsonifiedResponse.results.forEach(result => {
          if (result.business_status === "OPERATIONAL" && result.opening_hours) {
            arr.push(result);
          }
        });
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse ? arr : "error";
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getLocationDetails(id) {
    try {
      let url = `https://maps.googleapis.com/maps/api/place/details/json?parameters&place_id=${id}&key=AIzaSyCSbUg4uB4qOCYnlMNg25JkcZcs8O4si0I`;
      let response = await fetch(url);
      let jsonifiedResponse;
      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
   




