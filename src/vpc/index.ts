import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface IVpc {
}
export interface Props {
  availabilityZones?: string[]
  cidr?: string
  maxAzs?: number
  subnetConfiguration?: ec2.VpcProps['subnetConfiguration']
}

export class Vpc extends Construct implements IVpc {

  /**
   * Create a VPC that spans the entire region.
   */
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);
    this.vpc(scope, id, props)
  }

  private vpc(scope: Construct, id: string, props: Props) {
    const vpc = new ec2.Vpc(scope, `Vpc-${id}`, {
      vpcName: id,
      cidr: props.cidr,
      availabilityZones: props.availabilityZones,
      subnetConfiguration: props.subnetConfiguration,
      gatewayEndpoints: {
        s3: {
          service: ec2.GatewayVpcEndpointAwsService.S3,
        }
      },
      natGatewayProvider: ec2.NatProvider.gateway(),
    })
  }
}
