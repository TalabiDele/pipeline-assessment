const number = document.querySelectorAll("#number");
const gender = document.querySelectorAll("#gender");
const age = document.querySelectorAll("#age");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let isPage = true;
let url = `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84`;
let nextUrl;
let prevUrl;
let page = 1;

console.log(number);

const startApp = async () => {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);

  data.results.forEach((result) => {
    console.log(result[1]);

    let outcome = result[page];

    for (var i = 0; i < outcome.length; i++) {
      for (var i = 0; i < number.length; i++) {
        number[i].textContent = outcome[i].row;
      }

      for (var i = 0; i < gender.length; i++) {
        gender[i].textContent = outcome[i].gender;
      }

      for (var i = 0; i < age.length; i++) {
        age[i].textContent = outcome[i].age;
      }
    }

    if (page === 1) {
      prevBtn.classList.add("remove");
    }

    if (page > 1) {
      prevBtn.classList.remove("remove");
    }

    if (page < 4) {
      nextBtn.classList.remove("remove");
    }

    nextUrl = result.paging.next;
  });
};

const prevPage = async () => {
  page = page - 1;

  if (page !== 2) {
    url = prevUrl;
  }

  console.log(page);

  const res = await fetch(url);
  const data = await res.json();

  console.log(data);

  data.results.forEach((result) => {
    let outcome = result[page];

    for (var i = 0; i < outcome.length; i++) {
      for (var i = 0; i < number.length; i++) {
        number[i].textContent = outcome[i].row;
      }

      for (var i = 0; i < gender.length; i++) {
        gender[i].textContent = outcome[i].gender;
      }

      for (var i = 0; i < age.length; i++) {
        age[i].textContent = outcome[i].age;
      }
    }

    if (page < 4) {
      nextBtn.classList.remove("remove");
    }

    if (page === 1) {
      prevBtn.classList.add("remove");
    }

    nextUrl = result.paging.next;
    prevUrl = result.paging.previous;
  });

  if (page === 1) {
    startApp();
  }
};

const nextPage = async (e) => {
  // url = nextUrl;
  page++;

  if (page === 3) {
    url = nextUrl;
  }

  const res = await fetch(url);
  const data = await res.json();

  console.log(data);

  data.results.forEach((result) => {
    console.log(result);

    let outcome = result[page];

    for (var i = 0; i < outcome.length; i++) {
      for (var i = 0; i < number.length; i++) {
        number[i].textContent = outcome[i].row;
      }

      for (var i = 0; i < gender.length; i++) {
        // outcome.push(number[i].textContent);
        gender[i].textContent = outcome[i].gender;
      }

      for (var i = 0; i < age.length; i++) {
        // outcome.push(number[i].textContent);
        age[i].textContent = outcome[i].age;
      }
    }

    nextUrl = result.paging.next;
    prevUrl = result.paging.previous;
  });

  if (page > 1) {
    prevBtn.classList.remove("remove");
  }

  if (page === 4) {
    nextBtn.classList.add("remove");
  }

  console.log(url);
};

nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);
document.addEventListener("DOMContentLoaded", startApp);
