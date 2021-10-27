const axios = require('axios');
const { BASE_URL, API_KEY } = require('../config');

class SeatGeek {
  // Find All From API (Optional Filter)
  static async get(type, query) {
    try {
      const search = query.search || ''; // Search Query
      const queryParam = /\s/.test(search) ? search.replace(/ /g, '+') : search; // Check for Spaces
      const geoIp = search !== '' ? 'false' : 'true'; // Check for GeoIP if Query Empty
      const page = query.page || 1;
      const END_URL =
        type == 'performers'
          ? `${type}?q=${queryParam}&per_page=10&page=${page}&client_id=${API_KEY}`
          : `${type}?q=${queryParam}&per_page=10&page=${page}&geoip=${geoIp}&client_id=${API_KEY}`;
      const url = `${BASE_URL}/${END_URL}`;
      const res = await axios(url);
      return res;
    } catch (e) {
      return e;
    }
  }

  static async getPerformer(query) {
    try {
      const { performerId } = query;
      const res = await axios.get(
        `${BASE_URL}/performers/${performerId}?client_id=${API_KEY}`
      );
      return res;
    } catch (e) {
      return e;
    }
  }
}

module.exports = SeatGeek;
