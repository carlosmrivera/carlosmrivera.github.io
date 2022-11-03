const appendDeleteBtnServer = (tr) => {
    const deleteBtn = document.createElement('button');
    const td = document.createElement('td');
    deleteBtn.innerText = 'X';
    deleteBtn.className = 'deleteBtn';
    td.append(deleteBtn)
    tr.append(td);
    deleteBtn.addEventListener('click', deleteServer);
}

const appendDeleteBtnPayment = (tr) => {
    const deleteBtn = document.createElement('button');
    const td = document.createElement('td');
    deleteBtn.innerText = 'X';
    deleteBtn.className = 'deleteBtn';
    td.append(deleteBtn)
    tr.append(td);
    deleteBtn.addEventListener('click', deletePayment);
}

const deletePayment = (evt) => {
    const target = evt.target;
    const tr = target.closest('tr');
    const id = tr.id;
    delete allPayments[id];
    tr.remove();
    update();
}

const deleteServer = (evt) => {
    const serverId = evt.target.parentElement.parentElement.id;
    delete allServers[serverId];
    update();
}

const update = () => {
    updateServerTable();
    updateSummary();
}