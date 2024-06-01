import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import axios from "axios";

// createStorefrontApiClient({
//   storeDomain: "http://pastoraleflower.myshopify.com",
//   apiVersion: "2024-01",
//   publicAccessToken: "6f48029e2400d78a356c84df088b5b70",
// });

const accessToken = "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";

const client = {
  getOrders: async () => {
    return await axios.get(
      "https://pastoraleflower.myshopify.com/admin/api/2024-04/orders.json?fulfillment_status=unfulfilled",
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
        params: {
          status: "any",
          api_version: "123",
        },
      }
    );
  },
};
export default client;
