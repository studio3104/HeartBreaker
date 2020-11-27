#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import {ApiFunctionStack, ApiStack} from "../lib/stack/api";

const app = new cdk.App();
const apiFunction = new ApiFunctionStack(app, "ApiFunctionStack", {
    assetPath: "..",
    handler: "com.studio3104.heartbreaker.ApiHandler::handleRequest",
});
new ApiStack(app, "ApiStack", {
    lambda: apiFunction,
});
