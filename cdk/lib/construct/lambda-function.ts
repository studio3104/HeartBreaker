import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

interface LambdaFunctionProps extends lambda.FunctionOptions {
    handler: string,
    assetPath: string,
}

export class LambdaFunction extends lambda.Function {
    constructor(scope: cdk.Construct, id: string, props: LambdaFunctionProps) {
        const defaultProps = {
            runtime: lambda.Runtime.JAVA_11,
            code: lambda.Code.fromAsset(props.assetPath, {
                bundling: {
                    image: lambda.Runtime.JAVA_11.bundlingDockerImage,
                    command: [
                        'bash', '-c',
                        `gradle build buildAsset && cp -au ./build/asset/* /asset-output`,
                    ],
                },
            }),
            handler: props.handler,
            timeout: cdk.Duration.minutes(15),
            memorySize: 1024,
        }

        const functionProps: lambda.FunctionProps = {
            ...defaultProps,
            ...props,
        };

        super(scope, id, functionProps);
    }
}
