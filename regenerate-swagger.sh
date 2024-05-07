# Re Generates the client library in the frontend project

java -jar ./swagger-codegen-cli.jar generate -i ./supervisoryreportapi.yaml -l typescript-angular -o ./src/swagger --api-package "supervisoryreport" --additional-properties ngVersion=17.3.3,providedInRoot=true,supportsES6=true,modelPropertyNaming=original,npmName="supervisoryreport",sortParamsByRequiredFlag=true
./sanitize-swagger.sh