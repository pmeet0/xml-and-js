const drug = require("../data/drug");

const getAll = ({ id, company, brand, Dname } = {}) =>
  new Promise((resolve) => {
    let result = Array.from(drug);

    if (id) {
      result = result.filter(item => item.id === Number(id));
    }

    if (company) {
      result = result.filter(item => item.company === company);
    }

    if (brand) {
      result = result.filter(item => item.brand === brand);
    }

    if (Dname) {
      result = result.filter(item => item.Dname === Number(Dname));
    }

    resolve({ code: 200, data: result });
  });

const getById = (id) =>
  new Promise((resolve) => {
    const drugs = drug.find(drugs => drugs.id === id);

    if (drugs) {
      resolve({ code: 200, data: drugs });
    } else {
      resolve({
        code: 404,
        data: { message: `No drugs found for id ${id}` },
      });
    }
  });

module.exports = {
  getAll,
  getById,
};