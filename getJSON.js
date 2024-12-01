const daneZtabeliOwypożyczeniach = document.querySelectorAll("tr");
const wartościZtabeliOwypożyczeniach = Object.values(daneZtabeliOwypożyczeniach);

const przygotowanieDanych = wartościZtabeliOwypożyczeniach.map((item) => ({
    // data i godzina wykonanej akcji, np. 15.03.2024 16:32:11
    date: new Date(item.children[0].innerText).getTime(),
    // rodzaj akcji, np. Wypożyczenie
    action: item.children[1].innerText,
    // koszt akcji, np. -6 PLN
    cost: parseFloat(item.children[2].innerText),
}));

// wklejenie danych do twojego schowka
copy(przygotowanieDanych);
