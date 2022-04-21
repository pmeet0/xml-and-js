const { getAll } = require("./api/drug.js");

const form = document.querySelector('form');

const renderTable = data => {
  const tableBody = document.getElementById("table-body");

  if (!tableBody) {
    throw new Error("No table element found");
  }

  let source = data;

  const rows = source.reduce(
    (acc, { id, company, brand, name }) =>
      acc + `<tr id="table-row-${id}"><td>${id}</td><td>${company}</td><td>${brand}</td><td>${name}</td></tr>`,
    ``
  );

  tableBody.innerHTML = rows;
};

getAll().then(({ data }) => renderTable(data));

const onSubmit = event => {
  event.preventDefault();

  const id = event.target.id.value;
  const company = event.target.company.value;
  const brand = event.target.brand.value;
  const name = event.target.name.value;

  console.log(id, company, brand, name);

  getAll({id: id, company: company, brand: brand, name: name}).then(({ data }) => renderTable(data));
};

const onReset = () => {
  getAll().then(({ data }) => renderTable(data));
};

form.onsubmit = onSubmit;
form.onreset = onReset;