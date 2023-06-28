import Credential from '@serverless-devs/credential';
import { Command } from 'commander';
import { underline } from 'chalk';
import { emoji } from '../../../utils';
import { HandleError } from '../../../error';
import { handlerSecret } from '../utils';

const description = `You can add an account

    Example:
        $ s config add
        $ s config add --AccessKey ****** --SecretKey ******
        $ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ****** --SecurityToken ******
        $ s config add --keyList key1,key2,key3 --valueList value1,value2,value3

    Configuration parameters template for vendors:
        alibaba: AccessKeyID, AccessKeySecret
        aws: AccessKeyID, SecretAccessKey
        baidu: AccessKeyID, SecretAccessKey
        huawei: AccessKey, SecretKey
        google: PrivateKeyData
        tencent: AccountID, SecretID, SecretKey

${emoji('🧭')} How to get the key: ${underline(
  'https://github.com/Serverless-Devs/docs/tree/master/zh/others/provider-config',
)}`;

export = (program: Command) => {
  const command = program.command('add');

  command
    .usage('[options]')
    .option('--AccountID <AccountID>', 'AccountID of key information')
    .option('--AccessKeyID <AccessKeyID>', 'AccessKeyID of key information')
    .option('--AccessKeySecret <AccessKeySecret>', 'AccessKeySecret of key information')
    .option('--SecurityToken <SecurityToken>', 'SecurityToken of key information')
    .option('--SecretAccessKey <SecretAccessKey>', 'SecretAccessKey of key information')
    .option('--AccessKey <AccessKey>', 'AccessKey of key information')
    .option('--SecretKey <SecretKey>', 'SecretKey of key information')
    .option('--SecretID <SecretID>', 'SecretID of key information')
    .option('--PrivateKeyData <PrivateKeyData>', 'PrivateKeyData of key information')
    .option('--kl, --keyList <keyList>', 'Keys of key information, like: --kl key1,key2,key3')
    .option('--il, --infoList <infoList>', 'Values of key information, like: --il info1,info2,info3')
    .option('-a, --access <aliasName>', 'Specify the access alias name.')
    .option('-f', 'Mandatory overwrite key information')
    .helpOption('-h, --help', 'Display help for command')
    // .allowUnknownOption()
    .description(description)
    .action(async options => {
      try {
        const credential = new Credential();
        const result = await credential.set(options);
        if (result) {
          console.log({
            Alias: result.access,
            credential: handlerSecret(result.credential),
          });
        }
      } catch (err) {
        await HandleError(err);
      }
    });
};