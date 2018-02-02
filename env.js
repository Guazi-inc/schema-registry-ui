var clusters = [
  {
    NAME: "dev",
    SCHEMA_REGISTRY: "http://g1-bdp-hdp-23.dns.guazi.com:18081",
    COLOR: "red", // optional
    allowGlobalConfigChanges: true, // optional
    allowSchemaDeletion: true  // Supported for Schema Registry version >= 3.3.0 
    //allowTransitiveCompatibilities: true        // if using a Schema Registry release >= 3.1.1 uncomment this line
  }
];
