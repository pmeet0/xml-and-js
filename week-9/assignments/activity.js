const loadData = (path) =>

  new Promise((resolve) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ({ target }) => 
    {
      if (target.readyState == 4 && target.status == 200) {
        resolve(JSON.parse(target.response));
      }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
  });

const renderTable = (data, nameTerm) => {
  const table = document.getElementById("tb");

  let source = data;

  if (nameTerm) {
    source = source.filter(({ first_name, last_name, email, gender, ip_address }) => 
    first_name.toLowerCase().includes(nameTerm) ||
    last_name.toLowerCase().includes(nameTerm) ||
    email.toLowerCase().includes(nameTerm) ||
    gender.toLowerCase().includes(nameTerm) ||
    ip_address.includes(nameTerm));
  }

  const r = source.reduce(
    (acc, {id, first_name, last_name, email, gender, ip_address }) =>
        acc +
        `<tr id="table-row-${id}">
        <td>${id}</td>
        <td>${first_name}</td>
        <td>${last_name}</td>
        <td>${email}</td>
        <td>${gender}</td>
        <td>${ip_address}</td>
        </tr>`,
        ``
        );

  table.innerHTML = r;
};


const submit = (event) => {
  event.preventDefault();

  const nameTerm = event.target.input.value;

  loadData(`./data.json`).then((data) => renderTable(data, nameTerm));
};

loadData(`./data.json`).then((data) => renderTable(data));

const Reset = () => {
  loadData(`./data.json`).then((data) => renderTable(data));
};