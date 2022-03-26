const products = require("../data.json");

const getAll = ({ id, first_name, last_name, email, gender,ip_address }) =>
  new Promise((resolve) => {
    let result = Array.from(products);

    if (id) { result = result.filter((item) => item.id === Number (id));}

    if (first_name) { result = result.filter((item) => item.first_name === first_name);}

    if (last_name) { result = result.filter((item) => item.last_name === last_name);}

    if (email) {result = result.filter((item) => item.email === email);}
  
    if (gender) {result = result.filter((item) => item.gender === gender);}

    if (ip_address) { result = result.filter((item) => item.ip_address === Number(ip_address));}

    resolve({ code: 200, data: JSON.stringify(result) });
  });

const getById = (id) =>
  new Promise((resolve) => {
    const product = products.find((product) => product.id === id);

    if (product) {
      resolve({ code: 200, data: JSON.stringify(product) });
    } else {
      resolve({
        code: 404,
        data: { message: `No product found for id ${id}` },
      });
    }
  });

module.exports = {
  getAll,
  getById,
};