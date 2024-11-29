Object.values(document.querySelectorAll("tr")).map((item) => ({
    date: new Date(item.children[0].innerText).getTime(),
    action: item.children[1].innerText,
    cost: parseFloat(item.children[2].innerText),
}));
