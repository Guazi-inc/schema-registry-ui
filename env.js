var clusters = [
  {
    NAME: "dev",
    SCHEMA_REGISTRY: "http://localhost:8080",
    COLOR: "red", // optional
    allowGlobalConfigChanges: true, // optional
    allowSchemaDeletion: true  // Supported for Schema Registry version >= 3.3.0 
    //allowTransitiveCompatibilities: true        // if using a Schema Registry release >= 3.1.1 uncomment this line
  }
];
