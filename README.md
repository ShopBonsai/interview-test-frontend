# Bonsai Frontend Interview Assignment

Welcome to the Frontend interview test at [Shop Bonsai](https://www.shopbonsai.ca/). First and foremost we'd like to thank you for your time and hope you have fun while doing this assignment!

This interview test simulates an environment that is similar to working at Shop Bonsai (very similar tech stack we run today).

The current test is setup with a few basic react components: Cart, CartItem and ProductItem. Feel free to change any of these if you wish! The primary focus of the assignment should be to demonstrate your React, Typescript, Javascript and general coding proficiency!

For this assignment, please implement an add to cart feature from the list of products. We have a simple node server for you to fetch products from. It's up to you to figure out everything required to make it work including frontend data validation and preventing adding to cart for out of stock products. The product data you'll receive is the following below:

```
type Product = {
  id: string;
  name: string;
  isDiscontinued: boolean;
  variants: Variant[];
  description: string;
  defaultImage: string;
};

type Variant = {
  id: string;
  quantity: number;
  images: string[];
  isDiscontinued: boolean;
  priceCents: number;
  selectionOptions: SelectionOption[];
};

type SelectionOption = {
  type: string;
  value: string;
};
```

In this test, please use redux for state management and your preferred side effect library (redux-thunk, redux-saga, redux-observable) if needed! We strongly recommend you follow functional programming practices when it comes to how you write your code, as a result we prefer you don't use redux-toolkit since the code written resembles mutable patterns.

The following should be noted:

1. Assume that if a piece of code/function is not working, it is a bug in the app (oh no!)
2. Work with the data as if it were real. (Do not manipulate/transform the mockData files)
3. You can make additional assumptions, please note them if they are critical to understanding the way your features are implemented
4. Please document your changes well and make as many atomic commits as you feel are necessary for someone to track your changes

Of your submission, the following will be evaluated:

- Ability to work in a pre-existing React environment (front-end)
- Ability to architect features
- Ability validate potentially inconsistent data from an external api
- Completeness of feature, works as a user would expect such a feature to work
- Adopting and using best practices
- Coding style
- Attention to detail
- Clarity in communicating the feature implemented (I highly recommend taking pictures and gifs)

High scorers will be contacted via email within a week of acknowledgement of PR submission.
Thank you and good luck for everyone who applied and submitted a PR.

## Instructions

Ensure [yarn](https://yarnpkg.com/) is installed.

### Server

Start backend server with:

```sh
cd ./api
yarn start
```

Server should be running at `http://localhost:8000`
