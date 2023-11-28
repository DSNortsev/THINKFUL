const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function getAllNames() {
    axios
        .get(`${BASE_URL}/constellations`)
        .then((response) => {
            const result = response.data.map(constellation => constellation.name) ;
            console.log(result);
        })
        .catch((error) => {
            console.log(error.message);
        });
}

function getConstellationsByQuadrant(quadrant) {
    axios
        .get(`${BASE_URL}/constellations`)
        .then((response) => {
            const result = response.data.filter(constellation => constellation.quadrant === quadrant) ;
            console.log(result);
        })
        .catch((error) => {
            console.log(error.message);
        });
}

module.exports = {
    getAllNames,
    getConstellationsByQuadrant,
};
