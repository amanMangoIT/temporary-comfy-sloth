import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  //-----------------LOAD PRODUCTS Reducer -------------------------//
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_products: [action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  //--------------SORT PRODUCT Reducer---------------------------//
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }

        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
    }

    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }

    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localCompare(b.name);
      });
    }

    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localCompare(a.name);
      });
    }

    return { ...state, filtered_products: tempProducts };
  }

  //--------------UPDATE FILTER Reducer---------------------------//
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  //--------------FILTER PRODUCTS Reducer---------------------------//
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, campany, color, price, shipping } = state.filters;
    let tempProducts = [...all_products];

    //filtering
    if (text) {
      tempProducts = tempProducts.flat().filter((item) => {
        return item.name.toLowerCase().startsWith(text);
      });
    }

    // category
    if (category !== "all") {
      tempProducts = tempProducts
        .flat()
        .filter((product) => product.category == category);
    }

    // campany
    if (campany !== "all") {
      tempProducts = tempProducts
        .flat()
        .filter((product) => product.campany == campany);
    }

    // campany
    if (color !== "all") {
      tempProducts = tempProducts.flat().filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }

    //price
    tempProducts = tempProducts.flat().filter((price) => price.price <= price);

    //shipping
    if (shipping) {
      tempProducts = tempProducts
        .flat()
        .filter((product) => product.shipping === true);
    }

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  //--------------CLEAR FILTER Reducer---------------------------//

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
