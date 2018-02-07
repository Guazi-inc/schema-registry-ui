var clusters = [
  {
    NAME: "prod",
    SCHEMA_REGISTRY: "http://g1-bdp-hdp-19.dns.guazi.com:8081", // https://schema-registry.demo.landoop.com
    COLOR: "#141414" // optional
  },

  {
    NAME: "dev",
    SCHEMA_REGISTRY: "http://g1-bdp-hdp-19.dns.guazi.com:8081",
    COLOR: "red", // optional
    allowGlobalConfigChanges: true, // optional
    allowSchemaDeletion: true  // Supported for Schema Registry version >= 3.3.0 
    //allowTransitiveCompatibilities: true        // if using a Schema Registry release >= 3.1.1 uncomment this line
  }
];
