import { gql } from 'apollo-boost';
import { addItemToCart, removeItemFromCart, getCartItemsCount } from './cart.utils';
import { GET_CART_ITEMS, GET_CART_TOTAL } from './reducers';

//тут ToggleCartHidden с большой буквы, т.к. это определение типа мутации
//ToggleCartHidden возвращает булевое значение
//AddItemToCart возвращает массив итемов
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }
  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!,
    RemoveItemFromCart(item: Item!): [Item]!,
    ClearItemFromCart(item: Item!): [Item]!,
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_ITEMS_COUNT = gql`
  {
    itemsCount @client
  }
`;

const updateCartCounts = (cache, cartItems) => {
  const updatedCartTotal = cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  );

  cache.writeQuery({
    query: GET_CART_TOTAL,
    data: {
      cartTotal: updatedCartTotal,
    }
  });

  cache.writeQuery({
    query: GET_ITEMS_COUNT,
    data: {
      itemsCount: getCartItemsCount(cartItems),
    }
  });
};

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, _context, _info) => {
      const { cache } = _context;
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: {
          cartHidden: !cartHidden,
        }
      });

      return !cartHidden;
    },

    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      const newCartItems = addItemToCart(cartItems, item);

      updateCartCounts(cache, newCartItems);

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: newCartItems,
        }
      });

      return newCartItems;
    },

    removeItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      const newCartItems = removeItemFromCart(cartItems, item);

      updateCartCounts(cache, newCartItems);

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: newCartItems,
        }
      });

      return newCartItems;
    },

    clearItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      const newCartItems = cartItems.filter(
        cartItem => cartItem.id !== item.id
      );

      updateCartCounts(cache, newCartItems);

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: newCartItems,
        }
      });

      return newCartItems;
    }
  }
};
