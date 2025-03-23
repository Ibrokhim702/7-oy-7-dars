const wrapper = document.querySelector("#box");
const form = document.querySelector("#form");
const input = document.querySelector("#input");

const API_ALL = "https://restcountries.com/v3.1/all";
const API_Search = "https://restcountries.com/v3.1/name/";

async function renderFlags(url) {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Bu Country topilmadi!!!");
        }

        const data = await res.json();
        wrapper.innerHTML = ""; // Oldingi ma'lumotlarni o‘chirish

        data.forEach(element => {
            wrapper.innerHTML += `
                <div class="div1 shadow-sm mx-auto p-[10px] w-[260px] mt-10 rounded-xl h-[310px] flex flex-col text-center">
                    <img class="w-[260px] h-[160px] rounded-md" src="${element.flags.png}" alt="${element.name.common} flag">
                    <h2 class= " h2 text-white font-bold">${element.name.common}</h2>
                    <span class="h2 text-white">Capital: ${element.capital ? element.capital[0] : "Noma'lum"}</span>
                    <span class="h2 text-white">Population: ${element.population.toLocaleString()}</span>
                </div>
            `;
        });

    } catch (error) {
        wrapper.innerHTML = `<p class="text-red-500 text-xl">${error.message}</p>`;
    }
}

renderFlags(API_ALL);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.toLowerCase().trim();

    if (!value) {
        renderFlags(API_ALL);
    } else {
        renderFlags(API_Search + value);
    }
});

const btn = document.querySelector(".switch input"); // Checkboxni olish
const body = document.body;

btn.addEventListener("change", () => {
    if (btn.checked) {
        body.style.backgroundColor = "black";
        body.style.color = "white";
        document.querySelectorAll(".h2").forEach(el => el.style.color = "white");
    } else {
        body.style.backgroundColor = "white";
        body.style.color = "black";
        document.querySelectorAll(".h2").forEach(el => el.style.color = "black");
    }
});
