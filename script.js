const baseURL = "https://dummyjson.com";

/* ---------------------------- getting elements ---------------------------- */
const hamburger = document.querySelector(".hamburger");
const listCon = document.querySelector(".lists");
const navLinks = document.querySelectorAll("#click");
const like = document.querySelector(".liked");

console.log("like: ", like);

let sectionDiv = document.querySelector("#product");
console.log("sectionDiv: ", sectionDiv);

/* --------------------------- hamburger function --------------------------- */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  listCon.classList.toggle("show-list");
  
});
/* --------------------------- remove class when click link --------------------------- */
navLinks.forEach(function (clickers) {
  clickers.addEventListener("click", () => {
    listCon.classList.remove("show-list");
    hamburger.classList.remove("active");
  });
});

// Products APIs
// fetch proucts by categories
const fetchProducts = async (category) => {
  let results = [];
  let categories = [];
  let productsDiv = "";

  sectionDiv.innerHTML = "";

  switch (category) {
    case "shoes":
      categories = ["mens-shoes", "womens-shoes"];
      break;
    case "watches":
      categories = ["mens-watches", "womens-watches"];
      break;
    case "accessories":
      categories = ["womens-bags", "womens-jewellery", "sunglasses"];
      break;

    default:
      break;
  }

  categories.forEach(async (cat) => {
    const res = await fetch(`${baseURL}/products/category/${cat}`);
    const json = await res.json();

    // Push each product object to the results array
    const products = json.products.flatMap((p) => p);
    results.push(...products);
    console.log('results: ', results);

    if (results.length > 5) {
      results.forEach((product) => {
        console.log(product)
        productsDiv += `
          <div id="product" class="h-[15%] w-[18%] bg-[#f1f5e6] p-[18px] rounded-lg">
              <div class="relative h-[300%]">
                  <img
                    class="rounded-md object-contain h-[60%] w-[200%]"
                    src=${product.thumbnail}
                    alt=""
                  />
                </div>
                <div>
                  <h3 class="text-[11px] font-bold capitalize">
                    ${product.title}
                  </h3>
                  <span>
                    ${handleRating(product.rating)}
                  </span>
                  <p>$${product.price}</p>
                  <section class="flex justify-between items-center">
                    <div class="flex gap-3 items-center justify-center">
                      <span
                        class="cursor-pointer bg-white w-[30px] h-[30px] p-[.5em] rounded-full flex justify-center items-center"
                        ><ion-icon name="add-outline"></ion-icon
                      ></span>
                      <p>0</p>
                      <span
                        class="cursor-pointer bg-white w-[30px] h-[30px] p-[.5em] rounded-full flex justify-center items-center"
                        ><ion-icon name="remove-outline"></ion-icon>
                      </span>
                    </div>
                    <div>
                      <span
                        class="bg-white px-[1.5em] py-[.5em] flex items-center justify-center rounded-2xl hover:bg-[#ffbf00] hover:text-gray-800 duration-200 ease-in cursor-pointer to-cart"
                        ><ion-icon name="bag-add-outline"></ion-icon
                      ></span>
                    </div>
                  </section>
              </div>
            </div>
            `;
      })
    };

    // Insert into HTML
    sectionDiv.innerHTML = productsDiv;
  });
};

// fetch a single product
const fetchSingle = async (id) => {
  const res = await fetch(`${baseURL} /products/${id} `);
  const json = await res.json();
  console.log(json);
};


// handle clicks function
const handleClickCategories = (category) => {
  // e.preventDefault();
  showProducts(category);
};

const handleRating = (rating) => {

  // Round down rating 
  const fullStars = Math.floor(rating);

  // Get remainder for half star
  const halfStar = rating % 1 !== 0;

  let starsHTML = '';

  // Loop to generate full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<ion-icon class="text-[#FFD700]" name="star"></ion-icon>`;
  }

  // Add half star if needed
  if (halfStar) {
    starsHTML += `<ion-icon class="text-[#FFD700]" name="star-half"></ion-icon>`;
  }

  // Insert stars HTML
  return starsHTML
}

const showProducts = async (category) => {
  await fetchProducts(category);
};

