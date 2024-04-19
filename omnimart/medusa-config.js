const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  {
    resolve: `medusa-plugin-algolia`,
    options: {
      applicationId: process.env.ALGOLIA_APP_ID,
      adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
      settings: {
        // index settings...
        products: {
          indexSettings: {
            searchableAttributes : ["title", "description"],
            attributesToRetrieve: [
              "id",
              "title",
              "description",
              "handle",
              "thumbnail",
              // "variants",
              // "variant_sku",
              // "options",
              // "collection_title",
              // "collection_handle",
              // "images",
            ],
          },
          transformer: (product) => { 
            return {
              objectID: product.id,
              title: product.title,
              handle: product.handle,
              thumbnail:  product.thumbnail,
              //subtitle: product.subtitle,
              //tags: product.tags,
              description:  product.description,
              //material: product.material,
              //metadata: product.metadata, // Keep the original metadata as well if needed
              //collection_title: product.collection ? item.collection.title : "", // Adjusted to avoid potential undefined access
              //collection_handle: product.collection ? item.collection.handle : "", // Adjusted to avoid potential undefined access
            }
          },
        },
      },
    },
  },
  {
    resolve: `medusa-plugin-sendgrid`,
    options: {
      api_key: process.env.SENDGRID_API_KEY,
      from: process.env.SENDGRID_FROM,
      order_placed_template: 
        process.env.SENDGRID_ORDER_PLACED_ID,
      localization: {
        "de-DE": { // locale key
          order_placed_template:
            process.env.SENDGRID_ORDER_PLACED_ID_LOCALIZED,
        },
      },
    },
  },
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },
  {
    resolve: `medusa-fulfillment-manual`,
  },
  {
    resolve: `@medusajs/file-local`,
    options: {
      // optional ( and will be stored in uploads/images folder )
    },
  },
  {
    resolve: `medusa-plugin-ip-lookup`,
    options: {
      access_token: process.env.IPSTACK_ACCESS_KEY,
    },
  },
  {
    resolve: `medusa-plugin-wishlist`,
  },
];

const modules = {
  // eventBus: {
  //   resolve: "@medusajs/event-bus-redis",
  //   options: {
  //     redisUrl: REDIS_URL
  //   }
  // },
  // cacheService: {
  //   resolve: "@medusajs/cache-redis",
  //   options: {
  //     redisUrl: REDIS_URL
  //   }
  // },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  // redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules:{
    eventBus: {
      resolve: "@medusajs/event-bus-local",
    }
  },
  featureFlags: {
    product_categories: true,
  },
};