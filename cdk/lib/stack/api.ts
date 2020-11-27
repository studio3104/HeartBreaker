import * as cdk from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";

import {LambdaFunction} from "../construct/lambda-function";

type ApiFunctionStackProps = {
    assetPath: string,
    handler: string,
} & cdk.StackProps;

type ApiStackProps = {
    lambda: ApiFunctionStack,
} & cdk.StackProps;

export class ApiFunctionStack extends cdk.Stack {
    public readonly function: lambda.Function;

    constructor(scope: cdk.Construct, id: string, props: ApiFunctionStackProps) {
        super(scope, id, props);

        this.function = new LambdaFunction(this, "ApiFunction", {
            assetPath: props.assetPath,
            handler: props.handler,
        });
    }
}

export class ApiStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        const api = new apigateway.RestApi(this, "Api");
        api.root.addMethod("GET", new apigateway.LambdaIntegration(props.lambda.function));
    }
}
